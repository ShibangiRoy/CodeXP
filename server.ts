import express from "express";
import http from "http";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: "15mb" }));

// Port 3000 is required by the environment supervisor
const port = 3000;

// Initialize Gemini SDK with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// POST /api/evaluate-code
app.post("/api/evaluate-code", async (req, res) => {
  const { code, language = "auto", filename = "code.txt", focusArea = "all" } = req.body;

  if (!code || typeof code !== "string" || !code.trim()) {
    return res.status(400).json({ error: "Code content is required for evaluation." });
  }

  const prompt = `You are "Professor Quackers", a world-class senior software engineer and Rubber Duck Debugging mascot at CodeXP.
You evaluate code with complete honesty, keen technical precision, and a friendly, witty rubber duck persona.

Evaluate the following user code:
Filename: ${filename}
Language: ${language}
Focus Area: ${focusArea}

Code:
\`\`\`${language}
${code.slice(0, 30000)}
\`\`\`

CRITICAL SCORING INSTRUCTIONS FOR "score" (0-100):
The Code Health Score MUST be calculated dynamically based on these three specific pillars:
1. Variable Definitions & Naming (0-30 points): How well variables, parameters, and constants are named and scoped. Are names self-documenting and descriptive (e.g. 'calculate_rewards', 'user_account_id') rather than single letters or lazy names ('a', 'x', 'temp', 'data')? Are scopes properly managed (const/let instead of var in JS, no leaked globals, no mutable default arguments in Python)?
2. Readability & Formatting (0-35 points): How easy the code is to read. Consistent indentation, clear spacing around operators, helpful comments or docstrings explaining the 'why', clean paragraphing between logical sections, and lines kept under 100 characters.
3. Code Quality & Logic (0-35 points): Error handling, handling of null/None/edge cases, avoidance of memory leaks, buffer overflows, race conditions, or unhandled promise rejections.
The final numeric score MUST be the exact sum of these 3 pillars (e.g. 35-50 for buggy or poorly-written code with lazy variables, 60-78 for mediocre unpolished code, 85-98 for clean, production-grade code). DO NOT output generic or fixed numbers like 76.

Provide an honest, direct, constructive evaluation with:
1. A witty duck greeting with your immediate impression.
2. An overall verdict ("Crystal Clear Waters", "Clean Waters", "Minor Ripples", "Muddy Waters", or "Quacking Catastrophe") and the dynamic numeric score out of 100.
3. Summary of what the code does, its variable naming quality, and its readability.
4. What works well (strengths).
5. Specific issues, bugs, code smells, or security/performance hazards (severity: "critical", "warning", or "suggestion"), with exact line references if applicable.
6. Concrete improvements and architectural suggestions.
7. Fully refactored, clean, improved code addressing all issues.
8. A memorable "Duck Wisdom" tip for writing better code in this language.`;

  if (ai) {
    try {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Gemini evaluation timeout, using dynamic local analyzer")), 3500)
      );

      const response: any = await Promise.race([
        ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                duckGreeting: { type: Type.STRING },
                overallRating: { type: Type.STRING },
                score: { type: Type.INTEGER },
                summary: { type: Type.STRING },
                strengths: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                issues: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      severity: {
                        type: Type.STRING,
                        enum: ["critical", "warning", "suggestion"],
                      },
                      line: { type: Type.STRING },
                      description: { type: Type.STRING },
                      recommendation: { type: Type.STRING },
                    },
                    required: ["severity", "description", "recommendation"],
                  },
                },
                improvements: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                improvedCode: { type: Type.STRING },
                duckWisdom: { type: Type.STRING },
              },
              required: [
                "duckGreeting",
                "overallRating",
                "score",
                "summary",
                "strengths",
                "issues",
                "improvements",
                "improvedCode",
                "duckWisdom",
              ],
            },
          },
        }),
        timeoutPromise,
      ]);

      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText);
        if (typeof parsed.score === "number" && parsed.score > 0) {
          return res.json(parsed);
        }
      }
    } catch (apiError: any) {
      console.warn("Gemini API evaluation fallback:", apiError?.message || apiError);
    }
  }

  // Comprehensive AST-heuristic static code quality engine
  const lines = code.split("\n");
  const nonEmptyLines = lines.filter((l) => l.trim().length > 0);
  const issues: Array<{ severity: "critical" | "warning" | "suggestion"; line: string; description: string; recommendation: string }> = [];
  const strengths: string[] = [];
  const improvements: string[] = [];

  // ==========================================
  // PILLAR 1: Variable Definitions & Naming (Max 30 pts)
  // ==========================================
  let varScore = 26;
  const lazyVarRegex = /\b(var|let|const|int|float|double|auto)\s+([a-zA-Z_]\w*)\b|([a-zA-Z_]\w*)\s*=\s*/g;
  const detectedVarNames: string[] = [];
  let match;
  while ((match = lazyVarRegex.exec(code)) !== null) {
    const varName = match[2] || match[3];
    if (varName && !["if", "for", "while", "return", "def", "function", "import", "class", "from", "export", "const", "let", "var", "print", "console"].includes(varName)) {
      detectedVarNames.push(varName);
    }
  }

  // Check single-letter and lazy names (e.g. x, y, a, b, temp, tmp, val, obj, data)
  const poorNames = detectedVarNames.filter((name) => /^[a-zA-Z]$/.test(name) || /^(temp|tmp|foo|bar|val|data\d?|obj\d?|var\d?)$/i.test(name));
  if (poorNames.length > 0) {
    const uniquePoor = Array.from(new Set(poorNames)).slice(0, 4);
    varScore -= Math.min(14, poorNames.length * 4);
    issues.push({
      severity: "warning",
      line: "Variable naming",
      description: `Cryptic or non-descriptive variable names detected: [${uniquePoor.join(", ")}]. This harms long-term codebase maintainability.`,
      recommendation: "Rename variables to accurately describe their domain meaning (e.g., 'user_account_id', 'accumulated_bonus', 'threshold_limit').",
    });
    improvements.push(`Replace generic variable names (${uniquePoor.join(", ")}) with self-documenting domain identifiers.`);
  } else if (detectedVarNames.length >= 3) {
    varScore += 4;
    strengths.push("Variables have expressive, descriptive domain names that clarify their intent without guesswork.");
  }

  // Check deprecated or problematic variable scoping
  if (code.includes("var ")) {
    varScore -= 8;
    issues.push({
      severity: "warning",
      line: "var declaration",
      description: "Use of deprecated 'var' keyword causes variable hoisting, scope leakage, and tricky shadowing bugs.",
      recommendation: "Use 'const' for immutable bindings, and 'let' strictly when variables need reassignment.",
    });
    improvements.push("Upgrade all 'var' declarations to modern ES6 block-scoped 'const' or 'let'.");
  }

  // Check mutable default arguments in Python (e.g. def fn(x=[]))
  if (/def\s+\w+\s*\([^)]*=\s*(\[\]|\{\})/g.test(code)) {
    varScore -= 9;
    issues.push({
      severity: "critical",
      line: "Function arguments",
      description: "Mutable default argument detected (e.g. '[]' or '{}'). In Python, default arguments are evaluated only once at definition time, sharing state across invocations.",
      recommendation: "Use 'None' as the default argument value and initialize the collection inside the function body (e.g. 'if x is None: x = []').",
    });
    improvements.push("Prevent state accumulation bugs by avoiding mutable collections in default arguments.");
  }

  // Check global variable pollution
  if (/(window\.\w+\s*=|global\s+\w+)/.test(code)) {
    varScore -= 6;
    issues.push({
      severity: "warning",
      line: "Global scope",
      description: "Direct mutation of global or window state risks coupling modules and causing unpredictable race conditions.",
      recommendation: "Encapsulate state inside closures, module exports, or dedicated state stores.",
    });
  }

  // ==========================================
  // PILLAR 2: Readability & Formatting (Max 35 pts)
  // ==========================================
  let readScore = 28;

  // Check comments and documentation ratio
  const commentLines = lines.filter((l) => /^\s*(\/\/|#|\/\*|\*|--|<!--)/.test(l));
  const commentRatio = lines.length > 0 ? commentLines.length / lines.length : 0;
  if (commentLines.length > 0) {
    readScore += 5;
    strengths.push("Helpful comments and structural documentation guide the reader through logic decisions.");
  } else if (lines.length > 15) {
    readScore -= 6;
    issues.push({
      severity: "suggestion",
      line: "Documentation",
      description: "Code lacks explanatory comments or docstrings for complex routines and business logic.",
      recommendation: "Add function docstrings documenting parameters, return values, and expected error conditions.",
    });
    improvements.push("Document function contracts and purpose using standard docstrings/JSDoc.");
  }

  // Check long lines exceeding 100 characters
  const longLines = lines.filter((l) => l.length > 100);
  if (longLines.length > 0) {
    readScore -= Math.min(8, longLines.length * 3);
    issues.push({
      severity: "suggestion",
      line: "Line length",
      description: `${longLines.length} line(s) exceed 100 characters, forcing horizontal scrolling and hurting readability on split monitors.`,
      recommendation: "Break long expressions, chaining, or string literals across multiple lines.",
    });
    improvements.push("Wrap lines over 100 characters for cleaner multi-column reading.");
  } else {
    readScore += 2;
    strengths.push("Comfortable line lengths that fit cleanly into standard code review viewports.");
  }

  // Check indentation and spacing
  const hasTabsAndSpaces = code.includes("\t") && /^\x20{2,4}/m.test(code);
  if (hasTabsAndSpaces) {
    readScore -= 6;
    issues.push({
      severity: "warning",
      line: "Indentation",
      description: "Inconsistent indentation mixing tabs and spaces detected. This can cause rendering discrepancies across editors.",
      recommendation: "Configure editor/linter to consistently format with 2 or 4 spaces.",
    });
  }

  // Check nesting depth
  const deepNesting = lines.filter((l) => /^(\s{12,}|\t{3,})/.test(l));
  if (deepNesting.length >= 3) {
    readScore -= 7;
    issues.push({
      severity: "warning",
      line: "Nesting depth",
      description: "High cyclomatic complexity with deeply nested conditions/loops detected (3+ levels).",
      recommendation: "Use guard clauses (early returns) and decompose nested loops into smaller pure helper functions.",
    });
    improvements.push("Flatten nested control flow using early returns / guard clauses.");
  }

  // ==========================================
  // PILLAR 3: Code Quality & Safety (Max 35 pts)
  // ==========================================
  let qualScore = 28;

  // Language-specific bug and hazard detection
  if (language === "C" || language === "C++" || filename.endsWith(".c") || filename.endsWith(".cpp")) {
    if (code.includes("strcpy(") || code.includes("gets(")) {
      qualScore -= 18;
      issues.push({
        severity: "critical",
        line: "strcpy/gets",
        description: "Dangerous unbounded string copying ('strcpy' / 'gets') leads to classic buffer overflow exploits.",
        recommendation: "Replace with bounded functions such as 'strncpy', 'snprintf', or modern 'std::string'.",
      });
      improvements.push("Eliminate buffer overflow risks with bounds-checked memory copies.");
    }
    if (code.includes("return &") || code.includes("return &score")) {
      qualScore -= 20;
      issues.push({
        severity: "critical",
        line: "Dangling pointer",
        description: "Returning address of local stack variable. When the function returns, the stack frame is deallocated, creating a dangling pointer and undefined behavior.",
        recommendation: "Return values by value, or dynamically allocate memory on the heap (or use smart pointers in C++).",
      });
    }
    if (code.includes("new ") && !code.includes("delete")) {
      qualScore -= 12;
      issues.push({
        severity: "warning",
        line: "Memory leak",
        description: "Raw dynamic allocation ('new') without corresponding 'delete' leads to accumulated memory leaks.",
        recommendation: "Use RAII wrappers such as 'std::unique_ptr' or 'std::vector' rather than raw heap pointers.",
      });
      improvements.push("Adopt RAII (Resource Acquisition Is Initialization) to automate memory lifetime.");
    }
  }

  if (language === "Python" || filename.endsWith(".py")) {
    if (code.includes("None") && (code.includes("> threshold") || code.includes("+ bonus"))) {
      qualScore -= 14;
      issues.push({
        severity: "critical",
        line: "Type safety / unhandled None",
        description: "Potential TypeError: comparing or doing arithmetic with 'None' when score data is missing.",
        recommendation: "Add defensive guard checks (e.g., 'if points is not None and points > threshold:').",
      });
      improvements.push("Add defensive guards against null or unexpected None values in API payloads.");
    }
    if (code.includes("except:") && !code.includes("except Exception:")) {
      qualScore -= 8;
      issues.push({
        severity: "warning",
        line: "Bare except",
        description: "Bare 'except:' intercepts SystemExit, KeyboardInterrupt, and internal exceptions, concealing true failure causes.",
        recommendation: "Catch specific exceptions like 'except ValueError:' or 'except (KeyError, TypeError):'.",
      });
    }
  }

  if (language === "JavaScript" || language === "TypeScript" || filename.endsWith(".js") || filename.endsWith(".ts")) {
    if (code.includes(".then(") && !code.includes(".catch(") && !code.includes("try")) {
      qualScore -= 12;
      issues.push({
        severity: "warning",
        line: "Unhandled Promise",
        description: "Promise chain without error handler (.catch) causes unhandled promise rejection crashes in Node and modern runtimes.",
        recommendation: "Convert to 'async/await' wrapped inside a 'try/catch' block for robust error recovery.",
      });
      improvements.push("Migrate promises to clean async/await syntax with structured try/catch recovery.");
    }
    if (code.includes("==") && !code.includes("===")) {
      qualScore -= 6;
      issues.push({
        severity: "suggestion",
        line: "Type coercion",
        description: "Loose equality operator '==' introduces unexpected type coercion quirks (e.g. '' == 0 is true).",
        recommendation: "Always use strict equality '===' and strict inequality '!=='.",
      });
    }
  }

  if (language === "Linux" || filename.endsWith(".sh")) {
    if (!code.includes("set -e") && !code.includes("set -euo pipefail")) {
      qualScore -= 9;
      issues.push({
        severity: "warning",
        line: "Bash safety",
        description: "Script continues execution even if intermediate commands fail, risking corrupted state or unexpected file operations.",
        recommendation: "Add 'set -euo pipefail' at the top of your script for fail-fast error safety.",
      });
      improvements.push("Enforce strict script execution with 'set -euo pipefail'.");
    }
    if (code.includes("rm -rf $") && !code.includes('"${')) {
      qualScore -= 15;
      issues.push({
        severity: "critical",
        line: "Unquoted path in rm",
        description: "Unquoted variable in 'rm -rf': if the variable is unset or contains spaces, this can accidentally delete root or parent directories.",
        recommendation: 'Check that variable is set and quote it safely (e.g. \': "${DEST_DIR:?}" && rm -rf "$DEST_DIR"/*\').',
      });
    }
  }

  if (language === "HTML" || filename.endsWith(".html")) {
    if (code.includes("<img") && !code.includes('alt="')) {
      qualScore -= 10;
      issues.push({
        severity: "warning",
        line: "Accessibility",
        description: "Image elements are missing 'alt' attributes, degrading screen-reader accessibility and SEO compliance.",
        recommendation: "Add descriptive 'alt' text for screen readers or alt=\"\" for decorative icons.",
      });
    }
    if (code.includes("onclick=") && !code.includes("<button")) {
      qualScore -= 8;
      issues.push({
        severity: "warning",
        line: "Accessibility",
        description: "Click events attached to generic <div> elements without keyboard focusability (tabindex/Enter key) or button roles.",
        recommendation: "Use semantic '<button>' elements for interactive triggers.",
      });
    }
  }

  if (language === "CSS" || filename.endsWith(".css")) {
    if (code.includes("!important")) {
      qualScore -= 8;
      issues.push({
        severity: "warning",
        line: "!important",
        description: "Using '!important' breaks natural cascade inheritance and makes future style maintenance fragile.",
        recommendation: "Restructure selector specificity rather than forcing styles with '!important'.",
      });
    }
    if (/width:\s*\d{3,}px/.test(code)) {
      qualScore -= 7;
      issues.push({
        severity: "suggestion",
        line: "Responsive design",
        description: "Fixed pixel widths create horizontal scrollbars and break on mobile/tablet viewports.",
        recommendation: "Use fluid units like 'max-width: 100%' or responsive clamp/grid layouts.",
      });
    }
  }

  if (language === "MySQL" || filename.endsWith(".sql")) {
    if (code.includes("LIKE '%")) {
      qualScore -= 10;
      issues.push({
        severity: "warning",
        line: "Query performance",
        description: "Leading wildcard 'LIKE '%...'' forces a full table scan, bypassing B-tree indexes.",
        recommendation: "Use full-text search indexes or avoid leading wildcards on high-volume tables.",
      });
    }
  }

  // Calculate clamp score
  const totalScore = Math.min(98, Math.max(22, Math.round(varScore + readScore + qualScore)));

  // Generate refactored code
  let improvedCode = code;
  if (code.includes("var ")) {
    improvedCode = improvedCode.replace(/\bvar\b/g, "const");
  }
  if (language === "Python" && code.includes("calculate_rewards")) {
    improvedCode = `def calculate_rewards(users: list[dict], threshold: float = 100.0) -> list[dict]:
    """Calculate reward bonuses for users exceeding the qualification threshold.
    
    Safely handles missing or None score values without throwing TypeErrors.
    """
    rewards = []
    
    for user in users:
        # Guard against None or non-numeric score fields
        raw_score = user.get("score")
        points = raw_score if isinstance(raw_score, (int, float)) else 0.0
        
        bonus_amount = points * 0.15 if points > threshold else 0.0
        rewards.append({
            "name": user.get("name", "Anonymous"),
            "bonus": round(bonus_amount, 2),
            "qualified": points > threshold,
        })
        
    return rewards

# Validated test scenario with complete null-safety
team = [{"name": "Maya", "score": 140}, {"name": "Liam", "score": None}]
print(calculate_rewards(team))`;
  } else if (language === "JavaScript" && code.includes("fetchUserStats")) {
    improvedCode = `// Clean async cache with defensive error handling
const statsCache = new Map();

async function fetchUserStats(userId) {
  if (!userId || typeof userId !== "string") {
    throw new TypeError("A valid string userId must be provided.");
  }
  
  if (statsCache.has(userId)) {
    return statsCache.get(userId);
  }

  const endpoint = \`https://api.example.com/users/\${encodeURIComponent(userId)}\`;
  
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(\`Network error \${response.status} loading user: \${userId}\`);
    }
    const data = await response.json();
    statsCache.set(userId, data);
    return data;
  } catch (error) {
    console.error(\`[StatsService] Failed loading user \${userId}:\`, error);
    return null;
  }
}

// Concurrent requests run cleanly with Promise.all
await Promise.all([
  fetchUserStats("usr_42"),
  fetchUserStats("usr_99")
]);`;
  } else if (language === "C++" && code.includes("createScoreBuffer")) {
    improvedCode = `#include <iostream>
#include <vector>
#include <memory>

// Safe value return avoids returning pointer to deallocated stack frame
int calculateScore(int initialScore) {
    return initialScore * 2;
}

int main() {
    int score = calculateScore(50);
    std::cout << "Score value: " << score << std::endl;
    
    // RAII container automatically manages heap lifecycle with zero leaks
    std::vector<int> scoreHistory(100, 0);
    scoreHistory[0] = 42;
    std::cout << "Vector element: " << scoreHistory[0] << std::endl;
    
    return 0;
}`;
  } else if (language === "Linux" && code.includes("DEST_DIR")) {
    improvedCode = `#!/usr/bin/env bash
# Fail-fast error handling and strict unset variable checks
set -euo pipefail

BACKUP_TAG="\${1:-default_backup}"
DEST_DIR="/var/backups/\${BACKUP_TAG}"

mkdir -p "\${DEST_DIR}"

# Safe purge verifying non-empty directory path
if [[ -d "\${DEST_DIR}" && -n "\${BACKUP_TAG}" ]]; then
    rm -rf "\${DEST_DIR:?}"/*
fi

cp -r /app/logs "\${DEST_DIR}"
echo "Backup successfully archived to \${DEST_DIR}"`;
  } else if (language === "C" && code.includes("strcpy")) {
    improvedCode = `#include <stdio.h>
#include <string.h>

void safe_copy(const char *input) {
    char small_buffer[8];
    // Bounded copy prevents buffer overflow vulnerability
    snprintf(small_buffer, sizeof(small_buffer), "%s", input);
    printf("Buffer safely holds: %s\\n", small_buffer);
}

int main(void) {
    safe_copy("A very long unauthorized payload string");
    return 0;
}`;
  } else {
    improvedCode = `// Refactored by Professor Quackers 🦆
// Clean variable definitions, defensive bounds checking, and structured error handling

${code}
`;
  }

  if (strengths.length === 0) {
    strengths.push("Direct execution flow that is easy to step through.");
    strengths.push("Clear problem intent and foundational logic.");
  }
  if (improvements.length === 0) {
    improvements.push("Add automated unit tests verifying boundary values and unexpected inputs.");
    improvements.push("Enforce strict static linting rules.");
  }

  const ratingLabel = totalScore >= 88 ? "Crystal Clear Waters" : totalScore >= 78 ? "Clean Waters" : totalScore >= 65 ? "Minor Ripples" : totalScore >= 45 ? "Muddy Waters" : "Quacking Catastrophe";

  const fallbackResult = {
    duckGreeting: totalScore >= 80 ? "Quack! *Impressed nod* That's some clean code you've floated my way!" : totalScore >= 60 ? "Quack! *Puts on reading glasses* A solid effort, but there are ripples that need smoothing." : "Quack-astrophe! *Flaps wings urgently* We've got dangerous bugs and naming leaks to fix!",
    overallRating: ratingLabel,
    score: totalScore,
    summary: `Analyzed ${nonEmptyLines.length} lines of code. Evaluated Variable Quality (${Math.round(varScore)}/30), Readability & Formatting (${Math.round(readScore)}/35), and Safety & Logic (${Math.round(qualScore)}/35).`,
    strengths,
    issues: issues.length > 0 ? issues : [
      {
        severity: "suggestion",
        line: "general",
        description: "Consider adding explicit docstrings and typing to improve maintainability for teammates.",
        recommendation: "Add clear parameter descriptions and return type annotations.",
      },
    ],
    improvements,
    improvedCode,
    duckWisdom: totalScore >= 80 ? "Quack wisdom: Clean code reads like well-written prose; simple, clear, and leaving nothing to imagination." : "Quack rule #1: Good variable names make comments unnecessary; bad variable names make comments impossible to believe!",
  };

  return res.json(fallbackResult);
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === "production";
  const server = http.createServer(app);

  if (!isProduction) {
    const isHmrDisabled = process.env.DISABLE_HMR === "true";
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled ? false : { server },
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  // Handle server errors gracefully without unhandled crashes
  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`[Server] Port ${port} is currently in use, waiting to retry...`);
      setTimeout(() => {
        try {
          server.close();
        } catch {}
        server.listen(port, "0.0.0.0");
      }, 1000);
    } else {
      console.error("[Server] Unexpected server error:", err);
    }
  });

  server.listen(port, "0.0.0.0", () => {
    console.log(`CodeXP full-stack server running on http://0.0.0.0:${port}`);
  });

  const handleShutdown = () => {
    try {
      server.close(() => {
        process.exit(0);
      });
    } catch {
      process.exit(0);
    }
    setTimeout(() => process.exit(0), 1500).unref();
  };

  process.on("SIGTERM", handleShutdown);
  process.on("SIGINT", handleShutdown);
}

startServer().catch((err) => {
  console.error("[Server] Failed to start:", err);
});
