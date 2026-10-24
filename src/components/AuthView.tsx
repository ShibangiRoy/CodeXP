import { FormEvent, useState } from "react";
import { auth, db, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { validateEmail, generateVerificationCode } from "../utils/emailValidation";
import { AlertCircle, CheckCircle2, UserPlus, LogIn, Sparkles, ShieldCheck } from "lucide-react";

interface AuthViewProps {
  onAuthSuccess: (user: any, verificationCode: string) => void;
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`logo-mark ${light ? "bg-[#F4C84B] text-[#1F251F]" : "bg-[#1F251F] text-[#F4C84B]"}`}>
        <span>&lt;</span><i /><span>/&gt;</span>
      </div>
      <span className={`text-2xl font-bold tracking-[-0.06em] ${light ? "text-white" : ""}`}>CodeXP</span>
    </div>
  );
}

export function AuthView({ onAuthSuccess }: AuthViewProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [suggestSignup, setSuggestSignup] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);
    setSuggestSignup(false);

    // Validate email format and check against disposable domains
    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      setError(emailCheck.error || "Please enter a valid, permanent email address.");
      return;
    }

    if (mode === "signup") {
      if (!name.trim()) {
        setError("Please enter your name.");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setLoading(true);

    if (mode === "login") {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
        const user = userCredential.user;

        // Generate a 6-digit code in case email needs verification
        const code = generateVerificationCode();
        if (!user.emailVerified) {
          try {
            await sendEmailVerification(user);
          } catch (e) {
            console.warn("Could not resend email verification automatically:", e);
          }
        }

        onAuthSuccess(user, code);
      } catch (err: any) {
        const code = err?.code;
        if (code === "auth/user-not-found" || code === "auth/invalid-credential") {
          setError("No account found with this email address. If you're new to CodeXP, please create an account.");
          setSuggestSignup(true);
        } else if (code === "auth/wrong-password") {
          setError("Incorrect password. Please verify and try again.");
        } else if (code === "auth/too-many-requests") {
          setError("Too many unsuccessful login attempts. Please reset your password or try again later.");
        } else {
          setError(err?.message || "Failed to sign in. Please verify your details.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      // Sign up mode
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        const user = userCredential.user;

        // Set user display name
        await updateProfile(user, {
          displayName: name.trim(),
        });

        const code = generateVerificationCode();

        // Create user document in Firestore
        try {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: name.trim(),
            emailVerified: false,
            createdAt: new Date().toISOString(),
          });
        } catch (dbErr) {
          console.warn("Firestore user creation note:", dbErr);
        }

        // Send real email verification
        try {
          await sendEmailVerification(user);
        } catch (emailErr) {
          console.warn("Verification email dispatch notice:", emailErr);
        }

        onAuthSuccess(user, code);
      } catch (err: any) {
        if (err?.code === "auth/email-already-in-use") {
          setError("An account already exists with this email address. Please sign in instead.");
          setSuggestSignup(false);
        } else if (err?.code === "auth/weak-password") {
          setError("Password is too weak. Please use at least 8 characters with a mix of numbers and letters.");
        } else {
          setError(err?.message || "Failed to create account. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Ensure user document exists
      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "Learner",
            emailVerified: true,
            createdAt: new Date().toISOString(),
          });
        }
      } catch (e) {
        console.warn("Google Firestore sync notice:", e);
      }

      onAuthSuccess(user, "GOOGLE_AUTH");
    } catch (err: any) {
      if (err?.code !== "auth/popup-closed-by-user") {
        setError(err?.message || "Google sign-in could not be completed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError("Please type your email address into the email field first.");
      return;
    }
    const check = validateEmail(email);
    if (!check.isValid) {
      setError(check.error || "Please enter a valid email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setInfoMessage(`Password reset link sent to ${email.trim()}. Please check your inbox.`);
      setError(null);
    } catch (err: any) {
      setError(err?.message || "Unable to send password reset email.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F5EF] lg:grid lg:grid-cols-[38.2fr_61.8fr]">
      {/* Left Showcase Banner */}
      <section className="relative hidden min-h-screen overflow-hidden bg-[#20261F] p-12 text-white lg:flex lg:flex-col xl:p-16">
        <Logo light />
        <div className="relative z-10 my-auto max-w-md">
          <p className="eyebrow text-[#F4C84B]">Learn by doing</p>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.055em] xl:text-6xl">
            Your ideas deserve to be built.
          </h1>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-[#B9C0B6]">
            Master a new language through short lessons, real code, and instant feedback.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-4 text-sm text-[#B9C0B6]">
          <div className="flex -space-x-2">
            {["AM", "SK", "JD"].map((user, index) => (
              <span key={user} className={`avatar ${["bg-[#8CC8AC]", "bg-[#9CAFEF]", "bg-[#F19B78]"][index]}`}>
                {user}
              </span>
            ))}
          </div>
          <span>Join 12,000+ curious builders</span>
        </div>
        <div className="code-orbit">
          <span>function grow() {"{"}</span>
          <span>confidence++;</span>
          <span>{"}"}</span>
        </div>
      </section>

      {/* Right Form Section */}
      <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-[480px]">
          <div className="mb-12 lg:hidden">
            <Logo />
          </div>

          <div className="flex items-center justify-between mb-2">
            <p className="eyebrow text-[#71766E]">
              {mode === "login" ? "Welcome to CodeXP" : "Start your path"}
            </p>
            <span className="flex items-center gap-1 text-[11px] font-bold text-[#356146] bg-[#E1EEE5] px-2.5 py-0.5 rounded-full">
              <ShieldCheck className="h-3 w-3" />
              Verified Accounts
            </span>
          </div>

          <h2 className="mt-1 text-3xl sm:text-4xl font-semibold tracking-[-0.05em] text-[#20251F]">
            {mode === "login" ? "Sign in to continue." : "Create your account."}
          </h2>
          <p className="mt-2 text-sm text-[#70746D]">
            {mode === "login"
              ? "Access your personalized learning tracks and playground."
              : "Set up your credentials with a genuine email to verify ownership."}
          </p>

          {/* Error & Info Alerts */}
          {error && (
            <div className="mt-6 rounded-2xl bg-[#FDF2F2] p-4 text-xs sm:text-sm text-[#992222] border border-[#F5C2C2] space-y-2">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 flex-none text-[#C53030] mt-0.5" />
                <p className="leading-relaxed">{error}</p>
              </div>

              {suggestSignup && (
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setError(null);
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-[#20251F] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#344036]"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>Create account with this email →</span>
                </button>
              )}
            </div>
          )}

          {infoMessage && (
            <div className="mt-6 flex items-start gap-2.5 rounded-2xl bg-[#EDF7F1] p-4 text-xs sm:text-sm text-[#276B41] border border-[#CDE5D6]">
              <CheckCircle2 className="h-4 w-4 flex-none text-[#276B41] mt-0.5" />
              <p>{infoMessage}</p>
            </div>
          )}

          {/* Mode Switcher Tabs */}
          <div className="mt-6 grid grid-cols-2 rounded-2xl bg-[#EBECE7] p-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
                setSuggestSignup(false);
              }}
              className={`rounded-xl py-2.5 transition-all ${
                mode === "login" ? "bg-white text-[#20251F] shadow-sm" : "text-[#62685F] hover:text-[#20251F]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError(null);
                setSuggestSignup(false);
              }}
              className={`rounded-xl py-2.5 transition-all ${
                mode === "signup" ? "bg-white text-[#20251F] shadow-sm" : "text-[#62685F] hover:text-[#20251F]"
              }`}
            >
              Create Account
            </button>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <label className="block">
                <span className="field-label">Your name</span>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Miller"
                  className="field"
                />
              </label>
            )}

            <label className="block">
              <span className="field-label">Email address</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="field"
              />
              <span className="mt-1 block text-[11px] text-[#7A8077]">
                Permanent email address required for verification.
              </span>
            </label>

            <label className="block">
              <div className="mb-2 flex justify-between">
                <span className="field-label !mb-0">Password</span>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs font-semibold text-[#4E745F] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "signup" ? "At least 8 characters" : "Enter your password"}
                className="field"
              />
            </label>

            {mode === "signup" && (
              <label className="block">
                <span className="field-label">Confirm password</span>
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="field"
                />
              </label>
            )}

            <button
              disabled={loading}
              className="primary-button w-full disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
            >
              {loading ? (
                "Processing..."
              ) : mode === "login" ? (
                <>
                  Continue to CodeXP <span>→</span>
                </>
              ) : (
                <>
                  Create Account & Verify Email <span>→</span>
                </>
              )}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4 text-xs uppercase tracking-[0.14em] text-[#999B95]">
            <span className="h-px flex-1 bg-[#DDDDD6]" />
            or
            <span className="h-px flex-1 bg-[#DDDDD6]" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="secondary-button w-full flex items-center justify-center gap-2 hover:bg-[#F9FAF7]"
          >
            <span className="font-bold text-[#4285F4]">G</span>
            <span>Continue with Google</span>
          </button>

          <p className="mt-8 text-center text-sm text-[#777A73]">
            {mode === "login" ? (
              <>
                New to CodeXP?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setError(null);
                  }}
                  className="font-bold text-[#20261F] hover:underline"
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError(null);
                  }}
                  className="font-bold text-[#20261F] hover:underline"
                >
                  Sign in instead
                </button>
              </>
            )}
          </p>
        </div>
      </section>
    </main>
  );
}
