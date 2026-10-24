interface DuckAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  state?: "idle" | "thinking" | "speaking" | "proud";
  className?: string;
}

export function DuckAvatar({ size = "md", state = "idle", className = "" }: DuckAvatarProps) {
  const dimension = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
    xl: "w-28 h-28",
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center flex-none ${dimension} ${className}`}>
      {/* Glow / Backdrop for interactive duck */}
      <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
        state === "thinking"
          ? "bg-[#FFE79A]/60 animate-ping"
          : state === "speaking"
          ? "bg-[#F4C84B]/40 animate-pulse"
          : "bg-[#FDF0CD]/40"
      }`} />

      {/* SVG Duck Art */}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full relative z-10 drop-shadow-sm transition-transform duration-200 ${
          state === "thinking" ? "animate-bounce" : ""
        }`}
      >
        <defs>
          <linearGradient id="duckBodyGrad" x1="20" y1="20" x2="100" y2="105" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE066" />
            <stop offset="0.6" stopColor="#F4C84B" />
            <stop offset="1" stopColor="#E5B22A" />
          </linearGradient>
          <linearGradient id="duckBeakGrad" x1="10" y1="50" x2="45" y2="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF8533" />
            <stop offset="1" stopColor="#E65C00" />
          </linearGradient>
          <linearGradient id="glassesGrad" x1="30" y1="40" x2="80" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2A3029" />
            <stop offset="1" stopColor="#181C18" />
          </linearGradient>
        </defs>

        {/* Duck Tail & Body */}
        <path
          d="M102 70 C108 58, 114 55, 110 52 C103 52, 94 62, 90 66 C80 55, 65 52, 50 56 C35 60, 24 72, 26 86 C28 98, 40 106, 62 106 C85 106, 98 90, 102 70 Z"
          fill="url(#duckBodyGrad)"
        />

        {/* Wing with feather accent */}
        <path
          d="M52 70 C65 68, 80 72, 86 82 C88 86, 78 92, 64 92 C50 92, 42 84, 52 70 Z"
          fill="#DFAB23"
          opacity="0.85"
        />
        <path
          d="M58 75 C68 74, 76 77, 80 84"
          stroke="#C49013"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Duck Head */}
        <circle cx="55" cy="42" r="26" fill="url(#duckBodyGrad)" />

        {/* Cute Cheek Blush */}
        <circle cx="68" cy="52" r="6" fill="#F87171" opacity="0.45" />

        {/* Developer Glasses Frame */}
        <rect
          x="34"
          y="35"
          width="18"
          height="14"
          rx="4"
          fill="#F5F9F6"
          fillOpacity="0.8"
          stroke="url(#glassesGrad)"
          strokeWidth="3"
        />
        <rect
          x="58"
          y="35"
          width="18"
          height="14"
          rx="4"
          fill="#F5F9F6"
          fillOpacity="0.8"
          stroke="url(#glassesGrad)"
          strokeWidth="3"
        />
        {/* Glasses Bridge & Temples */}
        <path d="M52 42 L58 42" stroke="#181C18" strokeWidth="3" strokeLinecap="round" />
        <path d="M76 41 L82 39" stroke="#181C18" strokeWidth="2.5" strokeLinecap="round" />

        {/* Eyes inside glasses */}
        <circle cx="43" cy="42" r="3" fill="#181C18" />
        <circle cx="44.2" cy="41" r="1" fill="white" />
        <circle cx="67" cy="42" r="3" fill="#181C18" />
        <circle cx="68.2" cy="41" r="1" fill="white" />

        {/* Duck Beak / Bill */}
        <path
          d="M34 46 C20 46, 12 52, 14 56 C16 59, 24 62, 36 60 C38 56, 38 50, 34 46 Z"
          fill="url(#duckBeakGrad)"
        />
        {/* Smile on bill */}
        <path
          d="M17 55 C22 56, 30 56, 35 53"
          stroke="#B34700"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Little Feather Tuft on Top */}
        <path
          d="M54 16 C53 10, 58 8, 60 12 C62 8, 67 10, 65 17"
          fill="#F4C84B"
          stroke="#DFAB23"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Floating Code symbols or Speech badge */}
        {state === "speaking" && (
          <g className="animate-pulse">
            <rect x="78" y="10" width="36" height="22" rx="8" fill="#20251F" />
            <text x="84" y="25" fill="#F4C84B" fontSize="10" fontFamily="monospace" fontWeight="bold">QUACK</text>
            <polygon points="86,32 92,32 88,38" fill="#20251F" />
          </g>
        )}

        {state === "thinking" && (
          <g>
            <circle cx="86" cy="18" r="4" fill="#3D7A55" />
            <circle cx="96" cy="12" r="6" fill="#3D7A55" />
            <text x="93" y="15" fill="white" fontSize="9" fontFamily="monospace" fontWeight="bold">?</text>
          </g>
        )}
      </svg>
    </div>
  );
}
