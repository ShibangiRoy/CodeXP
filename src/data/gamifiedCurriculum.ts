import { Language } from "../types";
import { TopicCurriculum, Exercise } from "../types/gamification";

/* =========================================================================
   PYTHON CURRICULUM
   ========================================================================= */
const pythonTopics: TopicCurriculum[] = [
  {
    key: "basics",
    name: "Python Basics",
    tagline: "First words, syntax & printing output",
    iconName: "Terminal",
    order: 1,
    realLifeAnalogy: {
      metaphor: "A Walkie-Talkie to your Computer",
      details: "Writing code is like speaking into a walkie-talkie. Using print() tells the computer to transmit your message aloud so you can see it on screen."
    },
    conceptCard: {
      summary: "Python code runs top-to-bottom. The print() function displays any text or number inside quotation marks onto your terminal screen.",
      codeExample: `# Say hello to the world!\nprint("Hello, CodeXP Explorer!")\nprint(42 + 8)`,
      whatItDoes: [
        "# begins a comment: human notes ignored by the computer.",
        "print(\"...\") outputs whatever text is enclosed in quotation marks.",
        "Numbers inside print() can do instant math without quotes!"
      ],
      keyTakeaway: "Computers are very literal: make sure your quotes and parentheses always open and close in matching pairs!"
    },
    exercises: [
      // Easy (4 exercises, 10 XP each)
      {
        id: "py_b_e1",
        topicKey: "basics",
        language: "Python",
        difficulty: "easy",
        type: "predict_output",
        title: "Predicting Print Output",
        prompt: "What will this Python program print to the screen?",
        codeSnippet: `print("Python is fun!")`,
        options: ["Python is fun!", '"Python is fun!"', "print(Python is fun!)", "fun"],
        correctAnswer: "Python is fun!",
        hint: "The quotation marks tell Python it's text, but the quotes themselves aren't printed.",
        explanation: "The print() function strips away the surrounding quotes and outputs the raw text."
      },
      {
        id: "py_b_e2",
        topicKey: "basics",
        language: "Python",
        difficulty: "easy",
        type: "fill_blank",
        title: "Complete the Message",
        prompt: "Choose the correct keyword to print 'Welcome!' to the terminal:",
        codeBeforeBlank: ``,
        blankPlaceholder: "???",
        codeAfterBlank: `("Welcome!")`,
        options: ["print", "echo", "display", "say"],
        correctAnswer: "print",
        hint: "Python uses a 5-letter lowercase word that rhymes with 'mint'.",
        explanation: "In Python, print() is the built-in function used to write output to the console."
      },
      {
        id: "py_b_e3",
        topicKey: "basics",
        language: "Python",
        difficulty: "easy",
        type: "match_pairs",
        title: "Python Syntax Pairs",
        prompt: "Match each Python concept with its correct meaning:",
        pairs: [
          { term: "print()", meaning: "Displays text on screen" },
          { term: "# hashtag", meaning: "Starts a comment ignored by Python" },
          { term: 'Quotes ""', meaning: "Encloses text strings" },
          { term: "Parentheses ()", meaning: "Wraps function arguments" }
        ],
        hint: "Match the punctuation marks with their role in Python syntax.",
        explanation: "Recognizing syntax symbols early makes writing and reading Python feel natural."
      },
      {
        id: "py_b_e4",
        topicKey: "basics",
        language: "Python",
        difficulty: "easy",
        type: "bug_hunt",
        title: "Fix the Missing Parenthesis",
        prompt: "Find and fix the syntax bug in this single line of Python:",
        codeLines: [
          `# Greet the user`,
          `print("Launch sequence initiated"`,
          `print("Ready for takeoff")`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `print("Launch sequence initiated")`,
          `echo("Launch sequence initiated")`,
          `print "Launch sequence initiated"`
        ],
        correctFix: `print("Launch sequence initiated")`,
        hint: "Count the opening '(' and closing ')' parentheses.",
        explanation: "Every opening parenthesis '(' in Python requires a matching closing parenthesis ')'."
      },

      // Moderate (4 exercises, 20 XP each)
      {
        id: "py_b_m1",
        topicKey: "basics",
        language: "Python",
        difficulty: "moderate",
        type: "puzzle",
        title: "Order the Rocket Countdown",
        prompt: "Arrange these lines in the logical order of a launch countdown:",
        scrambledLines: [
          { id: "line3", text: 'print("Liftoff! 🚀")' },
          { id: "line1", text: 'print("T-Minus 3 seconds...")' },
          { id: "line2", text: 'print("Engines ignite!")' }
        ],
        correctOrder: ["line1", "line2", "line3"],
        hint: "Think chronologically: Countdown first, then engine ignition, then liftoff.",
        explanation: "Python executes instructions in sequence from line 1 downward."
      },
      {
        id: "py_b_m2",
        topicKey: "basics",
        language: "Python",
        difficulty: "moderate",
        type: "predict_output",
        title: "Math Inside Print",
        prompt: "What is printed when numbers are calculated inside print?",
        codeSnippet: `print(10 + 5 * 2)`,
        options: ["20", "30", "1052", "10 + 10"],
        correctAnswer: "20",
        hint: "Remember standard order of operations (PEMDAS): multiplication before addition.",
        explanation: "5 * 2 evaluates to 10 first, then 10 + 10 gives 20."
      },
      {
        id: "py_b_m3",
        topicKey: "basics",
        language: "Python",
        difficulty: "moderate",
        type: "bug_hunt",
        title: "Unmatched Quote Bug",
        prompt: "Tap the broken line and select the fix:",
        codeLines: [
          `print("Mission Control online")`,
          `print('Radar scanning active")`,
          `print("All systems nominal")`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `print("Radar scanning active")`,
          `print Radar scanning active`,
          `print('Radar scanning active'`
        ],
        correctFix: `print("Radar scanning active")`,
        hint: "Notice line 2 starts with a single quote ' but ends with a double quote \".",
        explanation: "Quotes must match: either double with double, or single with single."
      },
      {
        id: "py_b_m4",
        topicKey: "basics",
        language: "Python",
        difficulty: "moderate",
        type: "fill_blank",
        title: "Multi-line Print Separator",
        prompt: "Which parameter makes print() separate values with a dash instead of a space?",
        codeBeforeBlank: `print("Alpha", "Bravo", `,
        blankPlaceholder: "???",
        codeAfterBlank: `="-")`,
        options: ["sep", "delimiter", "split", "end"],
        correctAnswer: "sep",
        hint: "Short for 'separator'.",
        explanation: "The sep parameter in print() controls what character is placed between multiple items."
      },

      // Intermediate (4 exercises, 30 XP each)
      {
        id: "py_b_i1",
        topicKey: "basics",
        language: "Python",
        difficulty: "intermediate",
        type: "coding",
        title: "Custom ASCII Banner",
        prompt: "Print a 3-line security badge for user 'Commander Nova'",
        instructions: "Print:\nLine 1: [SECURITY ACCESS]\nLine 2: Agent: Commander Nova\nLine 3: Status: Cleared",
        starterCode: `# Print the 3-line access badge\n`,
        expectedOutput: "[SECURITY ACCESS]\nAgent: Commander Nova\nStatus: Cleared",
        solutionCode: `print("[SECURITY ACCESS]")\nprint("Agent: Commander Nova")\nprint("Status: Cleared")`,
        hint: "Use three separate print() calls, one for each line.",
        explanation: "Each print() statement outputs its content followed automatically by a new line."
      },
      {
        id: "py_b_i2",
        topicKey: "basics",
        language: "Python",
        difficulty: "intermediate",
        type: "puzzle",
        title: "Assemble Receipt Generator",
        prompt: "Put these statements together to generate a clean store receipt:",
        scrambledLines: [
          { id: "r3", text: 'print("Total: $15")' },
          { id: "r1", text: 'print("--- COFFEE SHOP ---")' },
          { id: "r4", text: 'print("Thank you!")' },
          { id: "r2", text: 'print("Espresso x 3")' }
        ],
        correctOrder: ["r1", "r2", "r3", "r4"],
        hint: "Header first, line item second, total third, closing thank you last.",
        explanation: "Structuring code sequentially creates predictable visual flow for users."
      },
      {
        id: "py_b_i3",
        topicKey: "basics",
        language: "Python",
        difficulty: "intermediate",
        type: "predict_output",
        title: "Escape Characters \\n and \\t",
        prompt: "What will this escape-sequence print produce?",
        codeSnippet: `print("A\\nB\\tC")`,
        options: [
          "A\nB\tC",
          "A\\nB\\tC",
          "ABC",
          "A B C"
        ],
        correctAnswer: "A\nB\tC",
        hint: "\\n creates a newline, and \\t creates a tab indentation.",
        explanation: "Escape sequences allow formatting special characters like tabs and linebreaks inside a single string."
      },
      {
        id: "py_b_i4",
        topicKey: "basics",
        language: "Python",
        difficulty: "intermediate",
        type: "bug_hunt",
        title: "Mixed Types In Print",
        prompt: "Spot the invalid concatenation with a number:",
        codeLines: [
          `name = "Alex"`,
          `print("User: " + 101)`,
          `print("Logged in successfully")`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `print("User: " + str(101))`,
          `print("User: " + + 101)`,
          `print "User: 101"`
        ],
        correctFix: `print("User: " + str(101))`,
        hint: "In Python, you cannot directly concatenate a string and an integer with '+' without converting it to str().",
        explanation: "str(101) converts the number into text so it can safely merge with 'User: '."
      },

      // Advanced (4 exercises, 50 XP each - including capstone mini-project)
      {
        id: "py_b_a1",
        topicKey: "basics",
        language: "Python",
        difficulty: "advanced",
        type: "coding",
        title: "Terminal Dashboard Header",
        prompt: "Build an executive server status dashboard box",
        instructions: "Print exactly:\n+----------------+\n| SERVER: ONLINE |\n+----------------+",
        starterCode: `# Build the exact box frame\n`,
        expectedOutput: "+----------------+\n| SERVER: ONLINE |\n+----------------+",
        solutionCode: `print("+----------------+")\nprint("| SERVER: ONLINE |")\nprint("+----------------+")`,
        hint: "Keep the exact length of dashes matching the frame width.",
        explanation: "Command-line tool developers use ASCII art borders to build distinctive terminal interfaces."
      },
      {
        id: "py_b_a2",
        topicKey: "basics",
        language: "Python",
        difficulty: "advanced",
        type: "puzzle",
        title: "System Boot Sequence Script",
        prompt: "Reconstruct this system boot diagnostic log:",
        scrambledLines: [
          { id: "b4", text: 'print("[OK] Kernel loaded.")' },
          { id: "b1", text: 'print("[INIT] Power supply: 100%")' },
          { id: "b3", text: 'print("[RUN] Mounting storage /dev/sda1")' },
          { id: "b2", text: 'print("[INIT] CPU Cores: 8 active")' },
          { id: "b5", text: 'print("[READY] All subsystems operational.")' }
        ],
        correctOrder: ["b1", "b2", "b3", "b4", "b5"],
        hint: "Power -> CPU -> Mount -> Kernel -> Ready.",
        explanation: "Operating systems initialize hardware in a strict, predictable pipeline."
      },
      {
        id: "py_b_a3",
        topicKey: "basics",
        language: "Python",
        difficulty: "advanced",
        type: "predict_output",
        title: "Print End and Flush Manipulation",
        prompt: "What is printed across these two lines?",
        codeSnippet: `print("Loading", end="...")\nprint("Done!")`,
        options: ["Loading...Done!", "Loading\n...Done!", "Loading... Done!", "Done!...Loading"],
        correctAnswer: "Loading...Done!",
        hint: "Setting end='...' overrides the default newline behavior of print().",
        explanation: "By setting end='...', the subsequent print output attaches directly to the same line."
      },
      {
        id: "py_b_a4",
        topicKey: "basics",
        language: "Python",
        difficulty: "advanced",
        type: "coding",
        title: "Mini-Project: Game Title & Credits Screen",
        prompt: "Capstone Mini-Project for Basics: Design a complete arcade game start screen with border, title, copyright, and prompt.",
        instructions: "Print:\n====================\n   CYBER RUNNER 2099\n====================\n(C) FutureGames Studio\nPress ENTER to play",
        starterCode: `# Design the Cyber Runner 2099 splash screen\n`,
        expectedOutput: "====================\n   CYBER RUNNER 2099\n====================\n(C) FutureGames Studio\nPress ENTER to play",
        solutionCode: `print("====================")\nprint("   CYBER RUNNER 2099")\nprint("====================")\nprint("(C) FutureGames Studio")\nprint("Press ENTER to play")`,
        hint: "Carefully match the spacing and equal signs in the border.",
        explanation: "Congratulations! You've combined multiple print calls, indentation, and ASCII formatting into your first interactive game screen."
      }
    ]
  },

  {
    key: "variables",
    name: "Variables & Data Types",
    tagline: "Labeled memory boxes, numbers & text strings",
    iconName: "Box",
    order: 2,
    realLifeAnalogy: {
      metaphor: "Labeled Storage Containers",
      details: "Think of a variable as a labeled shoebox in your closet. You write 'player_score' on the tape, and you can put 100 inside, change it to 150 later, or look inside whenever you want."
    },
    conceptCard: {
      summary: "Variables hold values that your program can remember, update, and reuse. Python automatically knows if your data is text (str), a whole number (int), a decimal (float), or True/False (bool).",
      codeExample: `score = 100\nplayer_name = "Aria"\nis_alive = True\nscore = score + 25\nprint(f"{player_name} has {score} points!")`,
      whatItDoes: [
        "name = value creates a new variable or updates an existing one.",
        "Strings use quotes: \"Aria\". Numbers do not: 100.",
        "f\"{variable}\" is an f-string: it plugs variables straight into your sentence!"
      ],
      keyTakeaway: "Use descriptive variable names (like user_age or player_health) instead of vague letters like x or y."
    },
    exercises: [
      // Easy (4 exercises)
      {
        id: "py_v_e1",
        topicKey: "variables",
        language: "Python",
        difficulty: "easy",
        type: "predict_output",
        title: "Reading Variable Values",
        prompt: "What will this code print?",
        codeSnippet: `hero = "Zelda"\nprint(hero)`,
        options: ["Zelda", "hero", '"Zelda"', "Error"],
        correctAnswer: "Zelda",
        hint: "Printing a variable outputs the contents inside it, not the variable's name.",
        explanation: "Python evaluates 'hero' and retrieves the stored string 'Zelda'."
      },
      {
        id: "py_v_e2",
        topicKey: "variables",
        language: "Python",
        difficulty: "easy",
        type: "fill_blank",
        title: "Assigning Player Health",
        prompt: "Complete the variable assignment with the assignment operator:",
        codeBeforeBlank: `health `,
        blankPlaceholder: "???",
        codeAfterBlank: ` 100`,
        options: ["=", "==", ":=", "is"],
        correctAnswer: "=",
        hint: "In Python, a single '=' assigns a value to a variable.",
        explanation: "A single equals sign '=' is the assignment operator in Python."
      },
      {
        id: "py_v_e3",
        topicKey: "variables",
        language: "Python",
        difficulty: "easy",
        type: "match_pairs",
        title: "Data Type Matcher",
        prompt: "Match each Python value to its data type:",
        pairs: [
          { term: '"Hello"', meaning: "str (String/Text)" },
          { term: "42", meaning: "int (Integer)" },
          { term: "3.14", meaning: "float (Decimal number)" },
          { term: "True", meaning: "bool (Boolean)" }
        ],
        hint: "Check for quotes, decimal points, or capitalized True/False.",
        explanation: "Understanding types prevents bugs when doing arithmetic and text formatting."
      },
      {
        id: "py_v_e4",
        topicKey: "variables",
        language: "Python",
        difficulty: "easy",
        type: "bug_hunt",
        title: "Invalid Variable Name",
        prompt: "Variable names cannot start with a digit. Fix the invalid variable name:",
        codeLines: [
          `# Setting player stats`,
          `1st_place = "Gold Medal"`,
          `print(1st_place)`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `first_place = "Gold Medal"`,
          `1-place = "Gold Medal"`,
          `1_place = "Gold Medal"`
        ],
        correctFix: `first_place = "Gold Medal"`,
        hint: "Variable names must start with a letter or an underscore, never a number.",
        explanation: "Renaming to 'first_place' follows standard Python naming conventions."
      },

      // Moderate (4 exercises)
      {
        id: "py_v_m1",
        topicKey: "variables",
        language: "Python",
        difficulty: "moderate",
        type: "puzzle",
        title: "Updating Bank Balance",
        prompt: "Arrange the lines so the balance starts at 50, deposits 30, and prints the result:",
        scrambledLines: [
          { id: "vb2", text: "balance = balance + 30" },
          { id: "vb1", text: "balance = 50" },
          { id: "vb3", text: 'print(f"Final: ${balance}")' }
        ],
        correctOrder: ["vb1", "vb2", "vb3"],
        hint: "Initialize balance first, then add the deposit, then print.",
        explanation: "Variables must be assigned before they can be read or increased."
      },
      {
        id: "py_v_m2",
        topicKey: "variables",
        language: "Python",
        difficulty: "moderate",
        type: "predict_output",
        title: "String Multiplication in Python",
        prompt: "What happens when you multiply a string by an integer?",
        codeSnippet: `cheer = "Go! "\nprint(cheer * 3)`,
        options: ["Go! Go! Go! ", "Go! * 3", "Go! 3", "TypeError"],
        correctAnswer: "Go! Go! Go! ",
        hint: "In Python, string * number repeats the string that many times.",
        explanation: "Python treats string * 3 as repeating the sequence 3 times."
      },
      {
        id: "py_v_m3",
        topicKey: "variables",
        language: "Python",
        difficulty: "moderate",
        type: "fill_blank",
        title: "Type Casting to Integer",
        prompt: "Fill in the blank to convert the text '25' into a real number before adding:",
        codeBeforeBlank: `age_text = "25"\nreal_age = `,
        blankPlaceholder: "???",
        codeAfterBlank: `(age_text) + 1\nprint(real_age)`,
        options: ["int", "str", "float", "number"],
        correctAnswer: "int",
        hint: "The function to convert into an integer shares the abbreviation 'int'.",
        explanation: "int('25') converts string '25' into numerical 25, allowing arithmetic."
      },
      {
        id: "py_v_m4",
        topicKey: "variables",
        language: "Python",
        difficulty: "moderate",
        type: "bug_hunt",
        title: "F-String Syntax Error",
        prompt: "Fix the missing 'f' prefix in the formatted string:",
        codeLines: [
          `coins = 75`,
          `print("{coins} gold coins found!")`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `print(f"{coins} gold coins found!")`,
          `print(coins + " gold coins found!")`,
          `print format("{coins} gold coins found!")`
        ],
        correctFix: `print(f"{coins} gold coins found!")`,
        hint: "To interpolate variables inside curly braces { }, prefix the string with an 'f'.",
        explanation: "Without the 'f' prefix, Python prints literal curly braces '{coins}'."
      },

      // Intermediate (4 exercises)
      {
        id: "py_v_i1",
        topicKey: "variables",
        language: "Python",
        difficulty: "intermediate",
        type: "coding",
        title: "Calculate Cart Subtotal",
        prompt: "Compute the subtotal for an order of 3 books at $14.50 each with a $5 shipping fee.",
        instructions: "Assign price = 14.50, quantity = 3, shipping = 5.0. Calculate total = (price * quantity) + shipping. Print 'Total: $48.5'",
        starterCode: `# Set variables and calculate total\nprice = 14.50\nquantity = 3\nshipping = 5.0\n`,
        expectedOutput: "Total: $48.5",
        solutionCode: `price = 14.50\nquantity = 3\nshipping = 5.0\ntotal = (price * quantity) + shipping\nprint(f"Total: \${total}")`,
        hint: "Multiply price by quantity, add shipping, and print with an f-string.",
        explanation: "Formulas in code use standard mathematical operators combined with stored variables."
      },
      {
        id: "py_v_i2",
        topicKey: "variables",
        language: "Python",
        difficulty: "intermediate",
        type: "puzzle",
        title: "Swapping Two Variables Without Third",
        prompt: "Arrange Python's famous tuple unpacking trick to swap two variables:",
        scrambledLines: [
          { id: "sw3", text: 'print(f"a={a}, b={b}")' },
          { id: "sw1", text: "a, b = 10, 20" },
          { id: "sw2", text: "a, b = b, a" }
        ],
        correctOrder: ["sw1", "sw2", "sw3"],
        hint: "Assign 10 and 20 first, swap with a, b = b, a, then print.",
        explanation: "Python allows simultaneous tuple assignment, making variable swapping elegant."
      },
      {
        id: "py_v_i3",
        topicKey: "variables",
        language: "Python",
        difficulty: "intermediate",
        type: "predict_output",
        title: "Integer Division vs Modulo",
        prompt: "What will this division and remainder print?",
        codeSnippet: `quotient = 17 // 5\nremainder = 17 % 5\nprint(f"{quotient} R {remainder}")`,
        options: ["3 R 2", "3.4 R 2", "3 R 5", "2 R 3"],
        correctAnswer: "3 R 2",
        hint: "// gives whole number floor division (3), % gives the remainder (2).",
        explanation: "17 divided by 5 is 3 with 2 left over (3 * 5 = 15; 17 - 15 = 2)."
      },
      {
        id: "py_v_i4",
        topicKey: "variables",
        language: "Python",
        difficulty: "intermediate",
        type: "bug_hunt",
        title: "Undefined Variable Scope Bug",
        prompt: "Fix the variable reference typo:",
        codeLines: [
          `user_score = 95`,
          `print(f"Your score is {user_Score}")`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `print(f"Your score is {user_score}")`,
          `print(f"Your score is user_score")`,
          `print(f"Your score is {score}")`
        ],
        correctFix: `print(f"Your score is {user_score}")`,
        hint: "Python is case-sensitive! user_score is not the same as user_Score.",
        explanation: "Matching the exact casing prevents NameError crashes in Python."
      },

      // Advanced (4 exercises)
      {
        id: "py_v_a1",
        topicKey: "variables",
        language: "Python",
        difficulty: "advanced",
        type: "coding",
        title: "Currency Converter",
        prompt: "Convert 250 USD into EUR with an exchange rate of 0.92, formatted to 2 decimals.",
        instructions: "usd = 250\nrate = 0.92\nCompute eur = usd * rate\nPrint '250 USD = 230.00 EUR'",
        starterCode: `usd = 250\nrate = 0.92\n`,
        expectedOutput: "250 USD = 230.00 EUR",
        solutionCode: `usd = 250\nrate = 0.92\neur = usd * rate\nprint(f"{usd} USD = {eur:.2f} EUR")`,
        hint: "Use format specifier :.2f inside the f-string curly braces to force two decimal places.",
        explanation: "{eur:.2f} rounds and pads numbers to two decimal places, ideal for financial figures."
      },
      {
        id: "py_v_a2",
        topicKey: "variables",
        language: "Python",
        difficulty: "advanced",
        type: "predict_output",
        title: "String Slicing Mechanics",
        prompt: "What does this slice output?",
        codeSnippet: `code = "PYTHON"[1:4]\nprint(code)`,
        options: ["YTH", "PYT", "YTHO", "YTO"],
        correctAnswer: "YTH",
        hint: "Index starts at 0. [1:4] takes indices 1, 2, and 3 (stops before 4).",
        explanation: "Index 1 is 'Y', 2 is 'T', 3 is 'H'. The end index 4 is excluded."
      },
      {
        id: "py_v_a3",
        topicKey: "variables",
        language: "Python",
        difficulty: "advanced",
        type: "puzzle",
        title: "Calculate BMI Formula Pipeline",
        prompt: "Reconstruct this Body Mass Index calculation pipeline:",
        scrambledLines: [
          { id: "bmi4", text: 'print(f"BMI: {bmi:.1f}")' },
          { id: "bmi1", text: "weight_kg = 70" },
          { id: "bmi3", text: "bmi = weight_kg / (height_m ** 2)" },
          { id: "bmi2", text: "height_m = 1.75" }
        ],
        correctOrder: ["bmi1", "bmi2", "bmi3", "bmi4"],
        hint: "Weight and height variables first, formula calculation next, formatted output last.",
        explanation: "Formulas like BMI rely on proper operator precedence with parentheses."
      },
      {
        id: "py_v_a4",
        topicKey: "variables",
        language: "Python",
        difficulty: "advanced",
        type: "coding",
        title: "Mini-Project: RPG Character Stats Card",
        prompt: "Capstone Mini-Project for Variables: Compute and display full RPG character stats card including attack power, armor reduction, and effective health.",
        instructions: "Given:\nname = 'Kaelen'\nbase_hp = 200\narmor = 25\nCompute effective_hp = base_hp + (armor * 2)\nPrint:\n=== HERO STATS ===\nHero: Kaelen\nHealth: 200 | Armor: 25\nEffective HP: 250",
        starterCode: `name = "Kaelen"\nbase_hp = 200\narmor = 25\n# Compute effective_hp and print the card\n`,
        expectedOutput: "=== HERO STATS ===\nHero: Kaelen\nHealth: 200 | Armor: 25\nEffective HP: 250",
        solutionCode: `name = "Kaelen"\nbase_hp = 200\narmor = 25\neffective_hp = base_hp + (armor * 2)\nprint("=== HERO STATS ===")\nprint(f"Hero: {name}")\nprint(f"Health: {base_hp} | Armor: {armor}")\nprint(f"Effective HP: {effective_hp}")`,
        hint: "Calculate effective_hp = base_hp + (armor * 2), then print the four lines.",
        explanation: "Outstanding! You've combined strings, integers, math formulas, and string interpolation into a practical gaming stats engine."
      }
    ]
  },

  {
    key: "conditions",
    name: "Conditionals & Logic",
    tagline: "Making decisions with if, elif & else",
    iconName: "GitFork",
    order: 3,
    realLifeAnalogy: {
      metaphor: "A Traffic Light or Bouncer at a Door",
      details: "Think of an 'if' statement like a nightclub bouncer checking IDs. IF age >= 21: enter the club. ELSE: sorry, no entry. The program chooses which door to open based on the truth of a condition."
    },
    conceptCard: {
      summary: "Conditionals let programs make smart decisions. If a condition is True, one block of code runs; if False, an alternative path is taken.",
      codeExample: `score = 85\nif score >= 90:\n    print("Grade: A")\nelif score >= 80:\n    print("Grade: B")\nelse:\n    print("Keep practicing!")`,
      whatItDoes: [
        "if condition: checks if something is True.",
        "elif condition: checks a backup condition if the first was False.",
        "else: runs if none of the above conditions were met.",
        "Indentation (4 spaces) is REQUIRED in Python to show what belongs inside the if block!"
      ],
      keyTakeaway: "Use '==' to compare equality, not '='. Single '=' assigns, double '==' checks."
    },
    exercises: [
      // Easy (4 exercises)
      {
        id: "py_c_e1",
        topicKey: "conditions",
        language: "Python",
        difficulty: "easy",
        type: "predict_output",
        title: "Basic If-Else Decision",
        prompt: "What will this weather condition print?",
        codeSnippet: `is_raining = True\nif is_raining:\n    print("Take an umbrella")\nelse:\n    print("Wear sunglasses")`,
        options: ["Take an umbrella", "Wear sunglasses", "True", "Nothing"],
        correctAnswer: "Take an umbrella",
        hint: "is_raining is True, so the code indented right below 'if' runs.",
        explanation: "Because is_raining evaluates to True, Python enters the first branch."
      },
      {
        id: "py_c_e2",
        topicKey: "conditions",
        language: "Python",
        difficulty: "easy",
        type: "fill_blank",
        title: "Complete the Else Branch",
        prompt: "What keyword specifies the fallback branch when the 'if' condition is false?",
        codeBeforeBlank: `if score >= 50:\n    print("Passed")\n`,
        blankPlaceholder: "???",
        codeAfterBlank: `:\n    print("Try again")`,
        options: ["else", "otherwise", "then", "elif"],
        correctAnswer: "else",
        hint: "4-letter lowercase word paired with if.",
        explanation: "The else block handles the fallback when preceding conditions evaluate to False."
      },
      {
        id: "py_c_e3",
        topicKey: "conditions",
        language: "Python",
        difficulty: "easy",
        type: "match_pairs",
        title: "Comparison Operators",
        prompt: "Match each Python comparison operator to its meaning:",
        pairs: [
          { term: "==", meaning: "Is equal to" },
          { term: "!=", meaning: "Is NOT equal to" },
          { term: ">=", meaning: "Greater than or equal" },
          { term: "<=", meaning: "Less than or equal" }
        ],
        hint: "Look at the exclamation mark '!' which represents negation (NOT).",
        explanation: "Comparison operators always yield a boolean: either True or False."
      },
      {
        id: "py_c_e4",
        topicKey: "conditions",
        language: "Python",
        difficulty: "easy",
        type: "bug_hunt",
        title: "Missing Colon on If Statement",
        prompt: "Spot the syntax error on line 2:",
        codeLines: [
          `battery = 15`,
          `if battery < 20`,
          `    print("Low battery warning!")`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `if battery < 20:`,
          `if (battery < 20)`,
          `if battery < 20 then:`
        ],
        correctFix: `if battery < 20:`,
        hint: "In Python, every if, elif, and else statement must end with a colon (:).",
        explanation: "The colon tells Python that an indented block of instructions follows."
      },

      // Moderate (4 exercises)
      {
        id: "py_c_m1",
        topicKey: "conditions",
        language: "Python",
        difficulty: "moderate",
        type: "predict_output",
        title: "Logical AND Gate",
        prompt: "What will this access check print?",
        codeSnippet: `has_key = True\nhas_password = False\nif has_key and has_password:\n    print("Access Granted")\nelse:\n    print("Access Denied")`,
        options: ["Access Denied", "Access Granted", "True", "Error"],
        correctAnswer: "Access Denied",
        hint: "'and' requires BOTH sides to be True for the whole statement to be True.",
        explanation: "Because has_password is False, the 'and' condition fails and else runs."
      },
      {
        id: "py_c_m2",
        topicKey: "conditions",
        language: "Python",
        difficulty: "moderate",
        type: "puzzle",
        title: "Arrange Tiered Pricing",
        prompt: "Order these lines to check free shipping above $50:",
        scrambledLines: [
          { id: "c2", text: "if cart_total >= 50:" },
          { id: "c1", text: "cart_total = 65" },
          { id: "c4", text: "else:\n    print('Shipping: $5')" },
          { id: "c3", text: "    print('Free shipping!')" }
        ],
        correctOrder: ["c1", "c2", "c3", "c4"],
        hint: "Initialize cart_total, write if condition, indent print, then else.",
        explanation: "Proper ordering and indentation ensure each branch executes conditionally."
      },
      {
        id: "py_c_m3",
        topicKey: "conditions",
        language: "Python",
        difficulty: "moderate",
        type: "bug_hunt",
        title: "Assignment Instead of Comparison",
        prompt: "Find the classic bug where single '=' was accidentally used instead of '==':",
        codeLines: [
          `role = "admin"`,
          `if role = "admin":`,
          `    print("Welcome Administrator")`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `if role == "admin":`,
          `if role is equal "admin":`,
          `if (role = "admin"):`
        ],
        correctFix: `if role == "admin":`,
        hint: "Use '==' to test equality. Single '=' is for assigning values.",
        explanation: "Using '=' inside an if condition causes a SyntaxError in Python."
      },
      {
        id: "py_c_m4",
        topicKey: "conditions",
        language: "Python",
        difficulty: "moderate",
        type: "fill_blank",
        title: "Checking Multiple Options with Elif",
        prompt: "What keyword checks the secondary condition in Python?",
        codeBeforeBlank: `speed = 45\nif speed > 60:\n    print("Too fast")\n`,
        blankPlaceholder: "???",
        codeAfterBlank: ` speed < 20:\n    print("Too slow")`,
        options: ["elif", "else if", "elsif", "case"],
        correctAnswer: "elif",
        hint: "Python shortens 'else if' into a 4-letter blend.",
        explanation: "elif stands for 'else if' in Python."
      },

      // Intermediate (4 exercises)
      {
        id: "py_c_i1",
        topicKey: "conditions",
        language: "Python",
        difficulty: "intermediate",
        type: "coding",
        title: "Age Tier Classifier",
        prompt: "Given age = 16, classify into 'Child' (<13), 'Teen' (13-19), or 'Adult' (20+).",
        instructions: "Write conditional checks. For age = 16, it should print 'Teen'.",
        starterCode: `age = 16\n# Write if-elif-else logic and print the category\n`,
        expectedOutput: "Teen",
        solutionCode: `age = 16\nif age < 13:\n    print("Child")\nelif age <= 19:\n    print("Teen")\nelse:\n    print("Adult")`,
        hint: "Check age < 13 first, then elif age <= 19.",
        explanation: "Sequential elif checks let you bracket numeric ranges cleanly."
      },
      {
        id: "py_c_i2",
        topicKey: "conditions",
        language: "Python",
        difficulty: "intermediate",
        type: "predict_output",
        title: "Ternary Conditional Expression",
        prompt: "What is stored in status by this one-line inline if statement?",
        codeSnippet: `hp = 0\nstatus = "Alive" if hp > 0 else "Fainted"\nprint(status)`,
        options: ["Fainted", "Alive", "0", "None"],
        correctAnswer: "Fainted",
        hint: "Since hp > 0 is False, the 'else' expression 'Fainted' is returned.",
        explanation: "Python's ternary operator: <value_if_true> if <condition> else <value_if_false>."
      },
      {
        id: "py_c_i3",
        topicKey: "conditions",
        language: "Python",
        difficulty: "intermediate",
        type: "puzzle",
        title: "Nested VIP Lounge Entry",
        prompt: "Order this nested security check (Must have ticket, then check if VIP):",
        scrambledLines: [
          { id: "nl2", text: "if has_ticket:" },
          { id: "nl1", text: "has_ticket = True\nis_vip = True" },
          { id: "nl3", text: "    if is_vip:\n        print('Welcome to VIP Lounge!')" },
          { id: "nl4", text: "else:\n    print('Please buy a ticket')" }
        ],
        correctOrder: ["nl1", "nl2", "nl3", "nl4"],
        hint: "Variables first, outer check, nested check, then outer else.",
        explanation: "Nesting conditionals lets programs handle complex multi-tier rules."
      },
      {
        id: "py_c_i4",
        topicKey: "conditions",
        language: "Python",
        difficulty: "intermediate",
        type: "bug_hunt",
        title: "IndentationError in Branch",
        prompt: "Fix the indentation bug inside this elif block:",
        codeLines: [
          `score = 75`,
          `if score >= 90:`,
          `    print("High Honors")`,
          `elif score >= 70:`,
          `print("Passed with Merit")`
        ],
        buggyLineIndex: 4,
        fixOptions: [
          `    print("Passed with Merit")`,
          `  print("Passed with Merit")`,
          `print "Passed with Merit"`
        ],
        correctFix: `    print("Passed with Merit")`,
        hint: "Python uses indentation (4 spaces) to mark lines belonging to an elif block.",
        explanation: "Indenting line 5 by 4 spaces resolves the IndentationError."
      },

      // Advanced (4 exercises)
      {
        id: "py_c_a1",
        topicKey: "conditions",
        language: "Python",
        difficulty: "advanced",
        type: "coding",
        title: "Leap Year Calculator",
        prompt: "A year is leap if divisible by 4, except end-of-century years which must be divisible by 400.",
        instructions: "For year = 2024, test leap logic and print '2024 is a Leap Year'",
        starterCode: `year = 2024\n# Check if year is a leap year\n`,
        expectedOutput: "2024 is a Leap Year",
        solutionCode: `year = 2024\nif (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):\n    print(f"{year} is a Leap Year")\nelse:\n    print(f"{year} is not a Leap Year")`,
        hint: "Use % modulo: (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0).",
        explanation: "Combining 'and' and 'or' with parentheses encodes precise business logic."
      },
      {
        id: "py_c_a2",
        topicKey: "conditions",
        language: "Python",
        difficulty: "advanced",
        type: "predict_output",
        title: "Short-Circuit Evaluation",
        prompt: "In Python, does the second condition get evaluated if the first is False in an 'and'?",
        codeSnippet: `def check():\n    print("Checking...")\n    return True\n\nif False and check():\n    print("Yes")\nelse:\n    print("Skipped")`,
        options: ["Skipped", "Checking...\nSkipped", "Checking...\nYes", "Error"],
        correctAnswer: "Skipped",
        hint: "Because the left side of 'and' is already False, Python short-circuits and never calls check()!",
        explanation: "Short-circuit evaluation saves execution time and prevents unnecessary function calls."
      },
      {
        id: "py_c_a3",
        topicKey: "conditions",
        language: "Python",
        difficulty: "advanced",
        type: "puzzle",
        title: "Password Strength Validator",
        prompt: "Assemble this rule validator that checks both length >= 8 and contains special char '!' :",
        scrambledLines: [
          { id: "pv3", text: 'if len(pw) >= 8 and "!" in pw:' },
          { id: "pv1", text: 'pw = "Secret!99"' },
          { id: "pv4", text: '    print("Strong password")' },
          { id: "pv2", text: 'is_valid = False' }
        ],
        correctOrder: ["pv1", "pv2", "pv3", "pv4"],
        hint: "Initialize string, boolean flag, if statement, then indented body.",
        explanation: "Using the 'in' operator makes checking for required characters readable."
      },
      {
        id: "py_c_a4",
        topicKey: "conditions",
        language: "Python",
        difficulty: "advanced",
        type: "coding",
        title: "Mini-Project: Game Damage Calculator",
        prompt: "Capstone Mini-Project for Conditions: Calculate critical hit and elemental resistance.",
        instructions: "Given:\nbase_damage = 40\nis_crit = True\nis_resistant = False\nIf is_crit is True, damage doubles (base_damage * 2).\nIf is_resistant is True, damage is halved (divided by 2).\nPrint:\n'Final Damage: 80'",
        starterCode: `base_damage = 40\nis_crit = True\nis_resistant = False\n# Calculate final damage\n`,
        expectedOutput: "Final Damage: 80",
        solutionCode: `base_damage = 40\nis_crit = True\nis_resistant = False\ndamage = base_damage\nif is_crit:\n    damage = damage * 2\nif is_resistant:\n    damage = damage // 2\nprint(f"Final Damage: {damage}")`,
        hint: "Start with damage = base_damage. Check each condition independently and apply the modifier.",
        explanation: "Superb job! Game combat systems rely on stacks of sequential conditional modifiers."
      }
    ]
  },

  {
    key: "loops",
    name: "Loops & Iteration",
    tagline: "Repeating tasks automatically with for & while",
    iconName: "Repeat",
    order: 4,
    realLifeAnalogy: {
      metaphor: "A Factory Assembly Conveyor Belt",
      details: "Imagine 10 empty cereal boxes on a conveyor belt. Instead of a worker running to each box separately, the belt loops through each box one by one, filling and sealing each in turn."
    },
    conceptCard: {
      summary: "Loops repeat instructions without copying and pasting code. Use 'for' when you know how many times to repeat (or iterating over a list). Use 'while' to repeat as long as a condition stays True.",
      codeExample: `# Count from 1 to 5 with a for loop\nfor i in range(1, 6):\n    print(f"Lap {i} complete!")\n\n# While loop countdown\ncountdown = 3\nwhile countdown > 0:\n    print(countdown)\n    countdown -= 1\nprint("GO!")`,
      whatItDoes: [
        "for item in range(1, 6): repeats for 1, 2, 3, 4, 5.",
        "range(stop) starts at 0 and stops just before the stop number.",
        "while condition: repeats until the condition turns False.",
        "Remember to update your counter in a while loop so it doesn't run forever!"
      ],
      keyTakeaway: "Use 'break' to immediately exit a loop early, and 'continue' to skip straight to the next round."
    },
    exercises: [
      // Easy (4 exercises)
      {
        id: "py_l_e1",
        topicKey: "loops",
        language: "Python",
        difficulty: "easy",
        type: "predict_output",
        title: "Range Loop Output",
        prompt: "What will this range loop print?",
        codeSnippet: `for i in range(3):\n    print(i)`,
        options: ["0\n1\n2", "1\n2\n3", "0\n1\n2\n3", "3"],
        correctAnswer: "0\n1\n2",
        hint: "range(3) starts at 0 and generates 3 items: 0, 1, and 2.",
        explanation: "Python indices and ranges are 0-indexed: range(3) gives 0, 1, 2."
      },
      {
        id: "py_l_e2",
        topicKey: "loops",
        language: "Python",
        difficulty: "easy",
        type: "fill_blank",
        title: "Complete the While Loop",
        prompt: "Choose the loop keyword to repeat while condition is met:",
        codeBeforeBlank: `energy = 3\n`,
        blankPlaceholder: "???",
        codeAfterBlank: ` energy > 0:\n    print("Running")\n    energy -= 1`,
        options: ["while", "for", "loop", "repeat"],
        correctAnswer: "while",
        hint: "5-letter word meaning 'during the time that'.",
        explanation: "A while loop tests a condition before each repetition."
      },
      {
        id: "py_l_e3",
        topicKey: "loops",
        language: "Python",
        difficulty: "easy",
        type: "match_pairs",
        title: "Loop Keywords",
        prompt: "Match loop control keywords with their actions:",
        pairs: [
          { term: "for", meaning: "Iterates over a sequence or range" },
          { term: "while", meaning: "Repeats while condition remains True" },
          { term: "break", meaning: "Exits the loop immediately" },
          { term: "continue", meaning: "Skips to the next iteration" }
        ],
        hint: "Break stops completely; continue jumps to the next turn.",
        explanation: "These four keywords form the backbone of loop control in almost every programming language."
      },
      {
        id: "py_l_e4",
        topicKey: "loops",
        language: "Python",
        difficulty: "easy",
        type: "bug_hunt",
        title: "Infinite Loop Bug",
        prompt: "Spot why this while loop never stops running:",
        codeLines: [
          `count = 1`,
          `while count <= 5:`,
          `    print(count)`,
          `    # forgot to update count`
        ],
        buggyLineIndex: 3,
        fixOptions: [
          `    count += 1`,
          `    count = 1`,
          `    break count`
        ],
        correctFix: `    count += 1`,
        hint: "If count never increases, count <= 5 will stay True forever!",
        explanation: "Incrementing count by 1 (count += 1) ensures the loop finishes after 5 steps."
      },

      // Moderate (4 exercises)
      {
        id: "py_l_m1",
        topicKey: "loops",
        language: "Python",
        difficulty: "moderate",
        type: "puzzle",
        title: "Iterating a Fruits List",
        prompt: "Order this loop to iterate through a list of fruits and print each item:",
        scrambledLines: [
          { id: "fl2", text: "for fruit in fruits:" },
          { id: "fl1", text: 'fruits = ["Apple", "Banana", "Cherry"]' },
          { id: "fl3", text: '    print(f"I like {fruit}")' }
        ],
        correctOrder: ["fl1", "fl2", "fl3"],
        hint: "Define the list first, then start the for loop, then indent the print statement.",
        explanation: "Python makes iterating through elements of any list clean and readable."
      },
      {
        id: "py_l_m2",
        topicKey: "loops",
        language: "Python",
        difficulty: "moderate",
        type: "predict_output",
        title: "Break Early from Loop",
        prompt: "What is printed when the loop encounters 'break'?",
        codeSnippet: `for num in [1, 2, 3, 4, 5]:\n    if num == 3:\n        break\n    print(num)`,
        options: ["1\n2", "1\n2\n3", "1\n2\n4\n5", "3"],
        correctAnswer: "1\n2",
        hint: "When num reaches 3, break executes before print(num) is reached.",
        explanation: "The loop terminates immediately when num == 3, leaving 1 and 2 as the only printed output."
      },
      {
        id: "py_l_m3",
        topicKey: "loops",
        language: "Python",
        difficulty: "moderate",
        type: "fill_blank",
        title: "Range with Step Argument",
        prompt: "Fill in the blank so range counts by 2s: 0, 2, 4, 6:",
        codeBeforeBlank: `for i in range(0, 8, `,
        blankPlaceholder: "???",
        codeAfterBlank: `):\n    print(i)`,
        options: ["2", "1", "step", "even"],
        correctAnswer: "2",
        hint: "The 3rd argument to range(start, stop, step) is the step size.",
        explanation: "range(0, 8, 2) starts at 0, steps by 2, and stops before 8."
      },
      {
        id: "py_l_m4",
        topicKey: "loops",
        language: "Python",
        difficulty: "moderate",
        type: "bug_hunt",
        title: "Continue Keyword Skipping",
        prompt: "Fix the syntax so odd numbers are skipped:",
        codeLines: [
          `for n in range(1, 6):`,
          `    if n % 2 != 0:`,
          `        next_step`,
          `    print(n)`
        ],
        buggyLineIndex: 2,
        fixOptions: [
          `        continue`,
          `        skip`,
          `        pass over`
        ],
        correctFix: `        continue`,
        hint: "The Python keyword to jump to the next iteration is 'continue'.",
        explanation: "'continue' skips the remainder of the current loop iteration and moves directly to the next."
      },

      // Intermediate (4 exercises)
      {
        id: "py_l_i1",
        topicKey: "loops",
        language: "Python",
        difficulty: "intermediate",
        type: "coding",
        title: "Accumulate Total Sum",
        prompt: "Calculate the sum of numbers from 1 to 5 inclusive using a loop.",
        instructions: "Start with total = 0. Use a loop over range(1, 6) adding each number. Print 'Total: 15'",
        starterCode: `total = 0\n# Loop and add to total\n`,
        expectedOutput: "Total: 15",
        solutionCode: `total = 0\nfor i in range(1, 6):\n    total += i\nprint(f"Total: {total}")`,
        hint: "Use total += i inside a for i in range(1, 6): loop.",
        explanation: "Accumulator loops are foundational for statistics, banking totals, and game score tracking."
      },
      {
        id: "py_l_i2",
        topicKey: "loops",
        language: "Python",
        difficulty: "intermediate",
        type: "predict_output",
        title: "Nested Loops Multiplication Table",
        prompt: "How many lines in total will this nested loop print?",
        codeSnippet: `for row in range(2):\n    for col in range(3):\n        print(f"({row},{col})")`,
        options: ["6", "5", "2", "3"],
        correctAnswer: "6",
        hint: "The outer loop runs 2 times; for each run, the inner loop runs 3 times (2 * 3).",
        explanation: "Nested loops multiply iterations: 2 * 3 = 6 total print statements."
      },
      {
        id: "py_l_i3",
        topicKey: "loops",
        language: "Python",
        difficulty: "intermediate",
        type: "puzzle",
        title: "Finding Maximum in a List",
        prompt: "Put this algorithm together to find the largest number:",
        scrambledLines: [
          { id: "mx2", text: "largest = numbers[0]" },
          { id: "mx1", text: "numbers = [14, 88, 32, 99, 45]" },
          { id: "mx4", text: 'print(f"Max: {largest}")' },
          { id: "mx3", text: "for num in numbers:\n    if num > largest:\n        largest = num" }
        ],
        correctOrder: ["mx1", "mx2", "mx3", "mx4"],
        hint: "List first, seed largest with first element, iterate and compare, print result.",
        explanation: "This classic linear scan algorithm runs in O(N) time."
      },
      {
        id: "py_l_i4",
        topicKey: "loops",
        language: "Python",
        difficulty: "intermediate",
        type: "bug_hunt",
        title: "Off-by-One Loop Bound",
        prompt: "We want to include 10, but range stops too early. Fix the range boundary:",
        codeLines: [
          `# Print 1 through 10`,
          `for i in range(1, 10):`,
          `    print(i)`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `for i in range(1, 11):`,
          `for i in range(1, 10, 1):`,
          `for i in range(0, 10):`
        ],
        correctFix: `for i in range(1, 11):`,
        hint: "Because range excludes the stop number, use 11 to include 10.",
        explanation: "Off-by-one errors are one of the most common programming mistakes. range(1, 11) runs through 10."
      },

      // Advanced (4 exercises)
      {
        id: "py_l_a1",
        topicKey: "loops",
        language: "Python",
        difficulty: "advanced",
        type: "coding",
        title: "Prime Number Checker Loop",
        prompt: "Check if num = 13 is prime by looping from 2 up to num-1.",
        instructions: "If num has any divisor, is_prime = False. For num = 13, print '13 is Prime'",
        starterCode: `num = 13\nis_prime = True\n# Test divisors\n`,
        expectedOutput: "13 is Prime",
        solutionCode: `num = 13\nis_prime = True\nfor d in range(2, num):\n    if num % d == 0:\n        is_prime = False\n        break\nif is_prime:\n    print(f"{num} is Prime")\nelse:\n    print(f"{num} is not Prime")`,
        hint: "Loop d from 2 to num. Check if num % d == 0.",
        explanation: "Prime checking demonstrates loop termination, modulo testing, and flag variables."
      },
      {
        id: "py_l_a2",
        topicKey: "loops",
        language: "Python",
        difficulty: "advanced",
        type: "predict_output",
        title: "List Comprehension Output",
        prompt: "What does this Python list comprehension construct?",
        codeSnippet: `evens = [x * 2 for x in range(4)]\nprint(evens)`,
        options: ["[0, 2, 4, 6]", "[2, 4, 6, 8]", "[0, 1, 2, 3]", "[0, 4, 8, 12]"],
        correctAnswer: "[0, 2, 4, 6]",
        hint: "x takes values 0, 1, 2, 3. Each is multiplied by 2.",
        explanation: "List comprehensions provide a concise syntax for applying a transformation loop into a new list."
      },
      {
        id: "py_l_a3",
        topicKey: "loops",
        language: "Python",
        difficulty: "advanced",
        type: "puzzle",
        title: "Reverse a String with a Loop",
        prompt: "Assemble this loop that reverses a word manually character by character:",
        scrambledLines: [
          { id: "rv2", text: 'reversed_text = ""' },
          { id: "rv1", text: 'word = "CODE"' },
          { id: "rv4", text: "print(reversed_text)" },
          { id: "rv3", text: "for char in word:\n    reversed_text = char + reversed_text" }
        ],
        correctOrder: ["rv1", "rv2", "rv3", "rv4"],
        hint: "Prepend char + reversed_text so each new character pushes prior ones back.",
        explanation: "Prepending builds the string in reverse order ('E' + 'D' + 'O' + 'C' = 'EDOC')."
      },
      {
        id: "py_l_a4",
        topicKey: "loops",
        language: "Python",
        difficulty: "advanced",
        type: "coding",
        title: "Mini-Project: Text Histogram Bar Chart",
        prompt: "Capstone Mini-Project for Loops: Generate an ASCII bar chart from a list of data counts.",
        instructions: "Given data = [3, 5, 2]. For each number, print a bar of '#' characters matching its value with a label.\nPrint:\nItem 1: ###\nItem 2: #####\nItem 3: ##",
        starterCode: `data = [3, 5, 2]\n# Loop through data with index and print the bars\n`,
        expectedOutput: "Item 1: ###\nItem 2: #####\nItem 3: ##",
        solutionCode: `data = [3, 5, 2]\nfor i in range(len(data)):\n    bar = "#" * data[i]\n    print(f"Item {i+1}: {bar}")`,
        hint: "Use for i in range(len(data)): and repeat '#' * data[i].",
        explanation: "Fantastic milestone! You created an automated data visualization engine using indexed loops and string repetition."
      }
    ]
  },

  {
    key: "functions",
    name: "Functions & Modular Code",
    tagline: "Reusable code recipes with def, parameters & return",
    iconName: "Cpu",
    order: 5,
    realLifeAnalogy: {
      metaphor: "A Coffee Machine or Kitchen Recipe",
      details: "A coffee machine is a function. You press a button and pass inputs (water, coffee beans). Inside it grinds and brews, and it returns a hot cup of coffee. You don't rebuild the machine every morning — you just call it!"
    },
    conceptCard: {
      summary: "Functions package a block of code into a named, reusable tool. You define a function with 'def', pass values in as 'parameters', and send a result back using 'return'.",
      codeExample: `def make_greeting(name, title="Explorer"):\n    return f"Welcome aboard, {title} {name}!"\n\nmessage = make_greeting("Alex")\nprint(message)`,
      whatItDoes: [
        "def function_name(param1, param2): defines the blueprint.",
        "Parameters are variables that receive whatever arguments you pass in.",
        "return sends the calculated value back to whoever called the function.",
        "Calling function_name() runs the packaged code on demand."
      ],
      keyTakeaway: "'print()' only shows text on screen, but 'return' hands the value back to your program so other code can work with it!"
    },
    exercises: [
      // Easy (4 exercises)
      {
        id: "py_f_e1",
        topicKey: "functions",
        language: "Python",
        difficulty: "easy",
        type: "predict_output",
        title: "Calling a Simple Function",
        prompt: "What will this function call output?",
        codeSnippet: `def say_hello():\n    print("Hello from inside the function!")\n\nsay_hello()`,
        options: ["Hello from inside the function!", "say_hello()", "None", "say_hello"],
        correctAnswer: "Hello from inside the function!",
        hint: "Calling say_hello() executes the statements inside its body.",
        explanation: "The function body executes upon being called with parentheses ()."
      },
      {
        id: "py_f_e2",
        topicKey: "functions",
        language: "Python",
        difficulty: "easy",
        type: "fill_blank",
        title: "The Function Definition Keyword",
        prompt: "Which 3-letter keyword defines a function in Python?",
        codeBeforeBlank: ``,
        blankPlaceholder: "???",
        codeAfterBlank: ` square(x):\n    return x * x`,
        options: ["def", "func", "function", "fn"],
        correctAnswer: "def",
        hint: "Short for 'define'.",
        explanation: "In Python, 'def' is the reserved keyword used to define functions."
      },
      {
        id: "py_f_e3",
        topicKey: "functions",
        language: "Python",
        difficulty: "easy",
        type: "match_pairs",
        title: "Function Anatomy",
        prompt: "Match function terms with their descriptions:",
        pairs: [
          { term: "def", meaning: "Keyword to define a function" },
          { term: "Parameter", meaning: "Variable listed in function header" },
          { term: "Argument", meaning: "Actual value passed when calling" },
          { term: "return", meaning: "Sends a result back to caller" }
        ],
        hint: "Parameters are placeholders; arguments are the real values passed.",
        explanation: "Distinguishing parameters, arguments, and return values gives you technical fluency."
      },
      {
        id: "py_f_e4",
        topicKey: "functions",
        language: "Python",
        difficulty: "easy",
        type: "bug_hunt",
        title: "Missing Return Keyword",
        prompt: "Fix the function so it actually returns the calculated double value:",
        codeLines: [
          `def double_it(num):`,
          `    num * 2`,
          `result = double_it(5)`,
          `print(result)`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `    return num * 2`,
          `    send num * 2`,
          `    give num * 2`
        ],
        correctFix: `    return num * 2`,
        hint: "Without 'return', a Python function returns 'None' by default.",
        explanation: "Adding 'return' passes the doubled value back to be stored in 'result'."
      },

      // Moderate (4 exercises)
      {
        id: "py_f_m1",
        topicKey: "functions",
        language: "Python",
        difficulty: "moderate",
        type: "puzzle",
        title: "Order Function Definition & Call",
        prompt: "Arrange this code so the function is defined before it gets called:",
        scrambledLines: [
          { id: "fd3", text: 'print(greeting)' },
          { id: "fd1", text: 'def cheer(team):\n    return f"Let\'s go {team}!"' },
          { id: "fd2", text: 'greeting = cheer("Tigers")' }
        ],
        correctOrder: ["fd1", "fd2", "fd3"],
        hint: "Python must read the def header first before that function name can be invoked.",
        explanation: "Functions must be defined before they are called in Python's top-down execution."
      },
      {
        id: "py_f_m2",
        topicKey: "functions",
        language: "Python",
        difficulty: "moderate",
        type: "predict_output",
        title: "Default Parameter Values",
        prompt: "What will this print when called with only one argument?",
        codeSnippet: `def power(base, exp=2):\n    return base ** exp\n\nprint(power(5))`,
        options: ["25", "10", "5", "TypeError"],
        correctAnswer: "25",
        hint: "Because exp has a default of 2, power(5) calculates 5 ** 2 = 25.",
        explanation: "Default parameters take effect automatically when an argument is omitted."
      },
      {
        id: "py_f_m3",
        topicKey: "functions",
        language: "Python",
        difficulty: "moderate",
        type: "fill_blank",
        title: "Passing Multiple Arguments",
        prompt: "Complete the function call to pass length 4 and width 6:",
        codeBeforeBlank: `def area(l, w):\n    return l * w\n\nroom = area(`,
        blankPlaceholder: "???",
        codeAfterBlank: `)\nprint(room)`,
        options: ["4, 6", "4 and 6", "4; 6", "[4, 6]"],
        correctAnswer: "4, 6",
        hint: "Separate multiple arguments with a comma.",
        explanation: "Arguments in Python are passed as comma-separated values inside parentheses."
      },
      {
        id: "py_f_m4",
        topicKey: "functions",
        language: "Python",
        difficulty: "moderate",
        type: "bug_hunt",
        title: "Local vs Global Scope Error",
        prompt: "Fix the function return so the caller can access the discount price:",
        codeLines: [
          `def apply_discount(price):`,
          `    discounted = price * 0.9`,
          `final_price = apply_discount(100)`,
          `print(final_price)`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `    return price * 0.9`,
          `    global discounted = price * 0.9`,
          `    print(price * 0.9)`
        ],
        correctFix: `    return price * 0.9`,
        hint: "Variables created inside a function are local. You must return them to use them outside.",
        explanation: "'return price * 0.9' sends the calculated discount out to the caller."
      },

      // Intermediate (4 exercises)
      {
        id: "py_f_i1",
        topicKey: "functions",
        language: "Python",
        difficulty: "intermediate",
        type: "coding",
        title: "Temperature Converter Function",
        prompt: "Write a function c_to_f(celsius) that converts Celsius to Fahrenheit using (c * 9/5) + 32.",
        instructions: "Call c_to_f(25) and print '25 C = 77.0 F'.",
        starterCode: `# Define c_to_f(celsius) and test with 25\n`,
        expectedOutput: "25 C = 77.0 F",
        solutionCode: `def c_to_f(celsius):\n    return (celsius * 9/5) + 32\n\nf = c_to_f(25)\nprint(f"25 C = {f} F")`,
        hint: "Formula is (celsius * 9/5) + 32. Return the result.",
        explanation: "Encapsulating conversion formulas inside functions makes mathematical pipelines clean."
      },
      {
        id: "py_f_i2",
        topicKey: "functions",
        language: "Python",
        difficulty: "intermediate",
        type: "predict_output",
        title: "Returning Multiple Values (Tuple)",
        prompt: "What will this multiple-return function print?",
        codeSnippet: `def min_max(a, b):\n    return (a, b) if a < b else (b, a)\n\nlow, high = min_max(40, 15)\nprint(f"Low: {low}, High: {high}")`,
        options: ["Low: 15, High: 40", "Low: 40, High: 15", "Low: (15, 40)", "Error"],
        correctAnswer: "Low: 15, High: 40",
        hint: "Since 40 < 15 is False, it returns (15, 40). low receives 15 and high receives 40.",
        explanation: "Python functions can cleanly return multiple values packaged as a tuple."
      },
      {
        id: "py_f_i3",
        topicKey: "functions",
        language: "Python",
        difficulty: "intermediate",
        type: "puzzle",
        title: "Recursive Factorial Function",
        prompt: "Order this recursive factorial function:",
        scrambledLines: [
          { id: "rf2", text: "    if n <= 1:\n        return 1" },
          { id: "rf1", text: "def factorial(n):" },
          { id: "rf4", text: 'print(f"5! = {factorial(5)}")' },
          { id: "rf3", text: "    return n * factorial(n - 1)" }
        ],
        correctOrder: ["rf1", "rf2", "rf3", "rf4"],
        hint: "Header -> Base case (n <= 1) -> Recursive step (n * factorial(n-1)) -> Print call.",
        explanation: "A base case prevents infinite recursion, allowing the stack to unwind."
      },
      {
        id: "py_f_i4",
        topicKey: "functions",
        language: "Python",
        difficulty: "intermediate",
        type: "bug_hunt",
        title: "Mutable Default Argument Trap",
        prompt: "Spot the dangerous mutable default list argument in Python:",
        codeLines: [
          `def add_item(item, basket=[]):`,
          `    basket.append(item)`,
          `    return basket`
        ],
        buggyLineIndex: 0,
        fixOptions: [
          `def add_item(item, basket=None):`,
          `def add_item(item, basket=list()):`,
          `def add_item(item, basket=[None]):`
        ],
        correctFix: `def add_item(item, basket=None):`,
        hint: "Using mutable default objects like [] causes values to persist across different calls!",
        explanation: "Using 'basket=None' and initializing 'if basket is None: basket = []' is the standard Python best practice."
      },

      // Advanced (4 exercises)
      {
        id: "py_f_a1",
        topicKey: "functions",
        language: "Python",
        difficulty: "advanced",
        type: "coding",
        title: "Higher-Order Function: Apply Twice",
        prompt: "Write a function apply_twice(func, val) that applies func to val, then applies func again to the result.",
        instructions: "Given def add_five(x): return x + 5. Call apply_twice(add_five, 10) and print 'Result: 20'.",
        starterCode: `def add_five(x):\n    return x + 5\n\n# Define apply_twice(func, val)\n`,
        expectedOutput: "Result: 20",
        solutionCode: `def add_five(x):\n    return x + 5\n\ndef apply_twice(func, val):\n    return func(func(val))\n\nprint(f"Result: {apply_twice(add_five, 10)}")`,
        hint: "In Python, functions are first-class citizens. Call func(func(val)).",
        explanation: "Higher-order functions accept other functions as arguments, enabling powerful functional patterns."
      },
      {
        id: "py_f_a2",
        topicKey: "functions",
        language: "Python",
        difficulty: "advanced",
        type: "predict_output",
        title: "Arbitrary Keyword Arguments **kwargs",
        prompt: "What will this kwargs dictionary lookup print?",
        codeSnippet: `def build_profile(**kwargs):\n    return kwargs.get("role", "Guest")\n\nprint(build_profile(name="Sam", role="Lead Dev"))`,
        options: ["Lead Dev", "Guest", "Sam", "role: Lead Dev"],
        correctAnswer: "Lead Dev",
        hint: "**kwargs packs named arguments into a dictionary. kwargs.get('role') retrieves 'Lead Dev'.",
        explanation: "**kwargs allows functions to accept flexible, dynamic keyword arguments."
      },
      {
        id: "py_f_a3",
        topicKey: "functions",
        language: "Python",
        difficulty: "advanced",
        type: "puzzle",
        title: "Decorator Function Wrapper",
        prompt: "Assemble this logging decorator that announces before running a task:",
        scrambledLines: [
          { id: "dec2", text: "    def wrapper():\n        print('[LOG] Starting...')\n        fn()" },
          { id: "dec1", text: "def log_action(fn):" },
          { id: "dec4", text: "run = log_action(lambda: print('Core work done'))\nrun()" },
          { id: "dec3", text: "    return wrapper" }
        ],
        correctOrder: ["dec1", "dec2", "dec3", "dec4"],
        hint: "Decorator def -> inner wrapper -> return wrapper -> apply decorator.",
        explanation: "Decorators wrap functions with additional behaviors without altering their source."
      },
      {
        id: "py_f_a4",
        topicKey: "functions",
        language: "Python",
        difficulty: "advanced",
        type: "coding",
        title: "Mini-Project: Modular Banking Transaction Engine",
        prompt: "Capstone Mini-Project for Functions: Build a modular banking ledger with deposit, withdraw, and audit log functions.",
        instructions: "Implement:\n1. deposit(balance, amount) -> returns new balance\n2. withdraw(balance, amount) -> returns new balance if funds sufficient, else returns balance unchanged\nStart with balance = 100. Deposit 50, then withdraw 30.\nPrint: 'Final Bank Balance: $120'",
        starterCode: `# Build deposit and withdraw functions\nbalance = 100\n`,
        expectedOutput: "Final Bank Balance: $120",
        solutionCode: `def deposit(bal, amt):\n    return bal + amt\n\ndef withdraw(bal, amt):\n    if bal >= amt:\n        return bal - amt\n    return bal\n\nbalance = 100\nbalance = deposit(balance, 50)\nbalance = withdraw(balance, 30)\nprint(f"Final Bank Balance: \${balance}")`,
        hint: "Define deposit and withdraw, update balance with each function call, then print the final balance.",
        explanation: "Mastery achieved! You've created a pure, deterministic financial transaction engine using modular functions."
      }
    ],
    bossChallenge: {
      id: "py_boss",
      topicKey: "boss",
      language: "Python",
      difficulty: "advanced",
      type: "coding",
      title: "The Boss Level: Automated Space Rover Navigation Engine",
      prompt: "Final Boss Gauntlet: Navigate the Mars rover across a grid using command strings, tracking battery level and coordinates.",
      instructions: "Rover starts at (0, 0) with 100% battery.\nCommands: 'N' (y + 1), 'S' (y - 1), 'E' (x + 1), 'W' (x - 1).\nEach move costs 10% battery.\nProcess commands 'N N E E S':\nPrint:\n=== ROVER STATUS ===\nPosition: (2, 1)\nBattery: 50%\nMission: Success",
      starterCode: `# Process rover movement commands\ncommands = ["N", "N", "E", "E", "S"]\nx, y = 0, 0\nbattery = 100\n`,
      expectedOutput: "=== ROVER STATUS ===\nPosition: (2, 1)\nBattery: 50%\nMission: Success",
      solutionCode: `commands = ["N", "N", "E", "E", "S"]\nx, y = 0, 0\nbattery = 100\nfor cmd in commands:\n    if cmd == "N": y += 1\n    elif cmd == "S": y -= 1\n    elif cmd == "E": x += 1\n    elif cmd == "W": x -= 1\n    battery -= 10\nprint("=== ROVER STATUS ===")\nprint(f"Position: ({x}, {y})")\nprint(f"Battery: {battery}%")\nprint("Mission: Success")`,
      hint: "Iterate through commands with a loop and adjust x or y based on cardinal direction.",
      explanation: "YOU CONQUERED THE BOSS LEVEL! You integrated variables, conditionals, loops, and structured printing to pilot an autonomous space rover!"
    }
  }
];

/* =========================================================================
   JAVASCRIPT CURRICULUM
   ========================================================================= */
const javascriptTopics: TopicCurriculum[] = [
  {
    key: "basics",
    name: "JavaScript Basics",
    tagline: "Console logs, semicolons & script execution",
    iconName: "Terminal",
    order: 1,
    realLifeAnalogy: {
      metaphor: "The Engine & Dashboard of a Car",
      details: "HTML is the car's body frame, CSS is the shiny paint job, but JavaScript is the engine! console.log() is your car's dashboard display."
    },
    conceptCard: {
      summary: "JavaScript brings web pages and applications to life. console.log() outputs text, calculations, and diagnostic data to the developer console.",
      codeExample: `// Welcome to JavaScript!\nconsole.log("Hello, Web Explorer!");\nconsole.log(2025 + 1);`,
      whatItDoes: [
        "// starts a single-line comment.",
        "console.log(...) prints messages to the browser or Node console.",
        "Semicolons (;) indicate the completion of a statement."
      ],
      keyTakeaway: "JavaScript is the universal language of the web, running both in every browser and on backend servers."
    },
    exercises: [
      // Easy (4 exercises)
      {
        id: "js_b_e1",
        topicKey: "basics",
        language: "JavaScript",
        difficulty: "easy",
        type: "predict_output",
        title: "Predicting Console Output",
        prompt: "What will this JavaScript program print?",
        codeSnippet: `console.log("JavaScript ready!");`,
        options: ["JavaScript ready!", '"JavaScript ready!"', "console.log(JavaScript ready!)", "undefined"],
        correctAnswer: "JavaScript ready!",
        hint: "console.log outputs the unquoted text to the console.",
        explanation: "The browser prints the string contents directly."
      },
      {
        id: "js_b_e2",
        topicKey: "basics",
        language: "JavaScript",
        difficulty: "easy",
        type: "fill_blank",
        title: "The Console Object Method",
        prompt: "Complete the logging command:",
        codeBeforeBlank: `console.`,
        blankPlaceholder: "???",
        codeAfterBlank: `("System Online");`,
        options: ["log", "print", "write", "echo"],
        correctAnswer: "log",
        hint: "3-letter word that rhymes with 'fog'.",
        explanation: "console.log() is JavaScript's standard output method."
      },
      {
        id: "js_b_e3",
        topicKey: "basics",
        language: "JavaScript",
        difficulty: "easy",
        type: "match_pairs",
        title: "JavaScript Basics Matching",
        prompt: "Match each JavaScript element with its purpose:",
        pairs: [
          { term: "console.log()", meaning: "Prints output to developer console" },
          { term: "// double slash", meaning: "Single-line comment" },
          { term: "; semicolon", meaning: "Ends a statement" },
          { term: "Backticks ``", meaning: "Template literals with ${}" }
        ],
        hint: "Look closely at the symbols used in JavaScript syntax.",
        explanation: "Mastering these core symbols makes reading JavaScript seamless."
      },
      {
        id: "js_b_e4",
        topicKey: "basics",
        language: "JavaScript",
        difficulty: "easy",
        type: "bug_hunt",
        title: "Case Sensitivity Bug in Console",
        prompt: "JavaScript is strictly case-sensitive. Spot the capitalized Console typo:",
        codeLines: [
          `// Output system greeting`,
          `Console.log("Hello World");`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `console.log("Hello World");`,
          `console.print("Hello World");`,
          `console.LOG("Hello World");`
        ],
        correctFix: `console.log("Hello World");`,
        hint: "'console' must be lowercase in JavaScript.",
        explanation: "'Console' with a capital C produces a ReferenceError."
      },

      // Moderate (4 exercises)
      {
        id: "js_b_m1",
        topicKey: "basics",
        language: "JavaScript",
        difficulty: "moderate",
        type: "puzzle",
        title: "Order the Web App Boot Logs",
        prompt: "Arrange the console logs in order of startup:",
        scrambledLines: [
          { id: "jl3", text: 'console.log("[3] Server listening on port 3000");' },
          { id: "jl1", text: 'console.log("[1] Loading environment config...");' },
          { id: "jl2", text: 'console.log("[2] Database connected successfully");' }
        ],
        correctOrder: ["jl1", "jl2", "jl3"],
        hint: "Config first, database second, server listening last.",
        explanation: "JavaScript executes synchronous commands line by line."
      },
      {
        id: "js_b_m2",
        topicKey: "basics",
        language: "JavaScript",
        difficulty: "moderate",
        type: "predict_output",
        title: "Type Coercion with Plus Operator",
        prompt: "What does JavaScript produce when adding a number to a string?",
        codeSnippet: `console.log("Score: " + 100);`,
        options: ["Score: 100", "Score: + 100", "NaN", "TypeError"],
        correctAnswer: "Score: 100",
        hint: "JavaScript automatically coerces the number 100 into string '100'.",
        explanation: "The + operator concatenates when at least one operand is a string."
      },
      {
        id: "js_b_m3",
        topicKey: "basics",
        language: "JavaScript",
        difficulty: "moderate",
        type: "fill_blank",
        title: "Template Literal Interpolation",
        prompt: "What symbol precedes the curly braces in template literals?",
        codeBeforeBlank: `const user = "Alex";\nconsole.log(\`User: `,
        blankPlaceholder: "???",
        codeAfterBlank: `{user}\`);`,
        options: ["$", "#", "@", "%"],
        correctAnswer: "$",
        hint: "The dollar sign is used for ${variable} interpolation.",
        explanation: "${expression} allows dynamic values inside backtick strings."
      },
      {
        id: "js_b_m4",
        topicKey: "basics",
        language: "JavaScript",
        difficulty: "moderate",
        type: "bug_hunt",
        title: "Mismatched Quotation Marks",
        prompt: "Fix the quotation mismatch on line 1:",
        codeLines: [
          `console.log("Welcome to JavaScript');`
        ],
        buggyLineIndex: 0,
        fixOptions: [
          `console.log("Welcome to JavaScript");`,
          `console.log('Welcome to JavaScript");`,
          `console.log(Welcome to JavaScript);`
        ],
        correctFix: `console.log("Welcome to JavaScript");`,
        hint: "A string that opens with double quotes must close with double quotes.",
        explanation: "Mismatched quotes cause a SyntaxError (Invalid or unexpected token)."
      },

      // Intermediate (4 exercises)
      {
        id: "js_b_i1",
        topicKey: "basics",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "coding",
        title: "Format Multi-line Output",
        prompt: "Log a clean application header using console.log.",
        instructions: "Print:\n=== CODE EXPLORER ===\nPlatform: Web & Node\nStatus: Ready",
        starterCode: `// Output the 3-line application header\n`,
        expectedOutput: "=== CODE EXPLORER ===\nPlatform: Web & Node\nStatus: Ready",
        solutionCode: `console.log("=== CODE EXPLORER ===");\nconsole.log("Platform: Web & Node");\nconsole.log("Status: Ready");`,
        hint: "Use three console.log calls.",
        explanation: "Each console.log automatically appends a newline."
      },
      {
        id: "js_b_i2",
        topicKey: "basics",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "puzzle",
        title: "Build JSON Output Simulation",
        prompt: "Assemble code to log a mock API response:",
        scrambledLines: [
          { id: "js4", text: 'console.log("}");' },
          { id: "js1", text: 'console.log("{");' },
          { id: "js3", text: 'console.log("  \\"status\\": 200");' },
          { id: "js2", text: 'console.log("  \\"ok\\": true,");' }
        ],
        correctOrder: ["js1", "js2", "js3", "js4"],
        hint: "Open bracket -> first field -> second field -> closing bracket.",
        explanation: "API endpoints communicate structured data using JSON text."
      },
      {
        id: "js_b_i3",
        topicKey: "basics",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "predict_output",
        title: "typeof Operator Output",
        prompt: "What will typeof print for a string?",
        codeSnippet: `console.log(typeof "CodeXP");`,
        options: ["string", "String", "text", "object"],
        correctAnswer: "string",
        hint: "typeof returns lowercase primitive names.",
        explanation: "typeof 'CodeXP' returns the string 'string'."
      },
      {
        id: "js_b_i4",
        topicKey: "basics",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "bug_hunt",
        title: "Missing Backticks for Interpolation",
        prompt: 'Spot why ${city} is printing as literal text instead of expanding:',
        codeLines: [
          'const city = "Tokyo";',
          'console.log("Flight to ${city}");'
        ],
        buggyLineIndex: 1,
        fixOptions: [
          'console.log(`Flight to ${city}`);',
          "console.log('Flight to ${city}');",
          'console.log("Flight to " + city);'
        ],
        correctFix: 'console.log(`Flight to ${city}`);',
        hint: "Template strings require backticks (`) rather than standard double quotes.",
        explanation: "Using backticks activates interpolation for ${city}."
      },

      // Advanced (4 exercises)
      {
        id: "js_b_a1",
        topicKey: "basics",
        language: "JavaScript",
        difficulty: "advanced",
        type: "coding",
        title: "Console Table ASCII Emulator",
        prompt: "Print a 2-column key-value status box.",
        instructions: "Print:\n--------------------\n| USER  | Maya     |\n| ROLE  | Admin    |\n--------------------",
        starterCode: `// Print the ASCII key-value box\n`,
        expectedOutput: "--------------------\n| USER  | Maya     |\n| ROLE  | Admin    |\n--------------------",
        solutionCode: `console.log("--------------------");\nconsole.log("| USER  | Maya     |");\nconsole.log("| ROLE  | Admin    |");\nconsole.log("--------------------");`,
        hint: "Match column widths with spaces.",
        explanation: "Command-line tools format diagnostic data using monospace grids."
      },
      {
        id: "js_b_a2",
        topicKey: "basics",
        language: "JavaScript",
        difficulty: "advanced",
        type: "predict_output",
        title: "NaN Arithmetic Behavior",
        prompt: "What is logged when you multiply an invalid string by a number?",
        codeSnippet: `console.log("hello" * 5);`,
        options: ["NaN", "hellohellohellohellohello", "0", "TypeError"],
        correctAnswer: "NaN",
        hint: "NaN stands for 'Not a Number'.",
        explanation: "Arithmetic operations with non-numeric strings yield NaN in JavaScript."
      },
      {
        id: "js_b_a3",
        topicKey: "basics",
        language: "JavaScript",
        difficulty: "advanced",
        type: "puzzle",
        title: "Console Logging Methods",
        prompt: "Arrange console diagnostic levels by severity:",
        scrambledLines: [
          { id: "cl3", text: 'console.error("Critical failure: database disconnected");' },
          { id: "cl1", text: 'console.info("Server initiated v2.4");' },
          { id: "cl2", text: 'console.warn("Memory consumption above 80%");' }
        ],
        correctOrder: ["cl1", "cl2", "cl3"],
        hint: "Info -> Warn -> Error.",
        explanation: "Logging with appropriate severity levels facilitates observability in production."
      },
      {
        id: "js_b_a4",
        topicKey: "basics",
        language: "JavaScript",
        difficulty: "advanced",
        type: "coding",
        title: "Mini-Project: Web App Deployment Report",
        prompt: "Capstone Mini-Project for JavaScript Basics: Produce a formatted build summary.",
        instructions: "Print:\n[BUILD COMPLETE]\nBundle: app.bundle.js (42 KB)\nTarget: Production\nStatus: Deployed to CDN",
        starterCode: `// Output deployment report\n`,
        expectedOutput: "[BUILD COMPLETE]\nBundle: app.bundle.js (42 KB)\nTarget: Production\nStatus: Deployed to CDN",
        solutionCode: `console.log("[BUILD COMPLETE]");\nconsole.log("Bundle: app.bundle.js (42 KB)");\nconsole.log("Target: Production");\nconsole.log("Status: Deployed to CDN");`,
        hint: "Use four clean console.log statements.",
        explanation: "Awesome! You've crafted a professional CI/CD terminal deployment report in JavaScript."
      }
    ]
  },

  {
    key: "variables",
    name: "Variables & Types",
    tagline: "const, let, numbers, booleans & objects",
    iconName: "Box",
    order: 2,
    realLifeAnalogy: {
      metaphor: "Permanent Markers vs Dry-Erase Whiteboards",
      details: "'const' is like a permanent marker: once written, you cannot reassign it. 'let' is like a dry-erase whiteboard: you can erase and write a new value anytime!"
    },
    conceptCard: {
      summary: "Modern JavaScript uses 'const' by default for values that don't change, and 'let' when you need to reassign a variable. Avoid the old 'var' keyword.",
      codeExample: `const maxPlayers = 4;\nlet currentPlayers = 1;\ncurrentPlayers += 2;\nconsole.log(\`Players: \${currentPlayers}/\${maxPlayers}\`);`,
      whatItDoes: [
        "const creates a block-scoped, immutable variable binding.",
        "let creates a block-scoped variable you can reassign.",
        "Backtick strings \`\${variable}\` embed expressions effortlessly."
      ],
      keyTakeaway: "Default to 'const' for everything unless you know the value must be reassigned later!"
    },
    exercises: [
      // Easy (4 exercises)
      {
        id: "js_v_e1",
        topicKey: "variables",
        language: "JavaScript",
        difficulty: "easy",
        type: "predict_output",
        title: "Reading const Variable",
        prompt: "What will this print?",
        codeSnippet: `const team = "Wolves";\nconsole.log(team);`,
        options: ["Wolves", "team", "undefined", "TypeError"],
        correctAnswer: "Wolves",
        hint: "The variable team stores the string 'Wolves'.",
        explanation: "console.log(team) looks up the identifier and prints 'Wolves'."
      },
      {
        id: "js_v_e2",
        topicKey: "variables",
        language: "JavaScript",
        difficulty: "easy",
        type: "fill_blank",
        title: "Reassignable Variable Keyword",
        prompt: "Choose the keyword to declare a variable that will change later:",
        codeBeforeBlank: ``,
        blankPlaceholder: "???",
        codeAfterBlank: ` score = 0;\nscore = 10;`,
        options: ["let", "const", "fixed", "val"],
        correctAnswer: "let",
        hint: "3-letter word that allows reassignment.",
        explanation: "let allows you to reassign variables as your program runs."
      },
      {
        id: "js_v_e3",
        topicKey: "variables",
        language: "JavaScript",
        difficulty: "easy",
        type: "match_pairs",
        title: "JavaScript Variable Types",
        prompt: "Match JavaScript variable keywords with their rules:",
        pairs: [
          { term: "const", meaning: "Cannot be reassigned" },
          { term: "let", meaning: "Can be freely reassigned" },
          { term: "undefined", meaning: "Variable declared but no value assigned" },
          { term: "null", meaning: "Intentional absence of any value" }
        ],
        hint: "const = constant; let = reassignable.",
        explanation: "Using const and let cleanly models data mutability."
      },
      {
        id: "js_v_e4",
        topicKey: "variables",
        language: "JavaScript",
        difficulty: "easy",
        type: "bug_hunt",
        title: "Reassigning a const Variable",
        prompt: "Spot the runtime TypeError caused by reassigning a const:",
        codeLines: [
          `const points = 50;`,
          `points = 60;`,
          `console.log(points);`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `// Change line 1 to let points = 50;`,
          `const points = 60;`,
          `points == 60;`
        ],
        correctFix: `// Change line 1 to let points = 50;`,
        hint: "If points changes, it must be declared with 'let' instead of 'const'.",
        explanation: "Reassigning a const variable throws 'TypeError: Assignment to constant variable'."
      },

      // Moderate (4 exercises)
      {
        id: "js_v_m1",
        topicKey: "variables",
        language: "JavaScript",
        difficulty: "moderate",
        type: "puzzle",
        title: "Calculate Discounted Price",
        prompt: "Order this discount calculation:",
        scrambledLines: [
          { id: "dp2", text: "const discount = 0.2;" },
          { id: "dp1", text: "const originalPrice = 100;" },
          { id: "dp4", text: "console.log(`Final: $${finalPrice}`);" },
          { id: "dp3", text: "const finalPrice = originalPrice * (1 - discount);" }
        ],
        correctOrder: ["dp1", "dp2", "dp3", "dp4"],
        hint: "Original price & discount first, calculation third, log fourth.",
        explanation: "Clean variable naming makes business formulas self-documenting."
      },
      {
        id: "js_v_m2",
        topicKey: "variables",
        language: "JavaScript",
        difficulty: "moderate",
        type: "predict_output",
        title: "Array and Object References in const",
        prompt: "Can you push elements into an array declared with const?",
        codeSnippet: `const list = [1, 2];\nlist.push(3);\nconsole.log(list.length);`,
        options: ["3", "TypeError", "2", "undefined"],
        correctAnswer: "3",
        hint: "const prevents reassigning the variable itself, but the internal contents of an array or object can mutate!",
        explanation: "Mutating an object/array is permitted under const; only reassignment (list = ...) is blocked."
      },
      {
        id: "js_v_m3",
        topicKey: "variables",
        language: "JavaScript",
        difficulty: "moderate",
        type: "fill_blank",
        title: "Template Literal Backtick Syntax",
        prompt: "Fill in the template string delimiter:",
        codeBeforeBlank: `const item = "Shield";\nconst msg = `,
        blankPlaceholder: "???",
        codeAfterBlank: `Equipped: \${item}\`;\nconsole.log(msg);`,
        options: ["`", "'", '"', "/"],
        correctAnswer: "`",
        hint: "The backtick key is located above Tab on most keyboards.",
        explanation: "Backticks delimit ES6 template literals."
      },
      {
        id: "js_v_m4",
        topicKey: "variables",
        language: "JavaScript",
        difficulty: "moderate",
        type: "bug_hunt",
        title: "Strict Equality vs Loose Equality",
        prompt: "Fix the comparison to use strict equality (===) without coercion:",
        codeLines: [
          `const age = 18;`,
          `if (age == "18") {`,
          `    console.log("Verified");`,
          `}`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `if (age === 18) {`,
          `if (age = 18) {`,
          `if (age != 18) {`
        ],
        correctFix: `if (age === 18) {`,
        hint: "Strict equality (===) checks both value and type without silent conversion.",
        explanation: "Always prefer === in JavaScript to prevent unexpected type coercion bugs."
      },

      // Intermediate (4 exercises)
      {
        id: "js_v_i1",
        topicKey: "variables",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "coding",
        title: "Destructuring Object Properties",
        prompt: "Extract 'name' and 'level' from a player object and log a formatted status.",
        instructions: "const player = { name: 'Valkyrie', level: 12 };\nDestructure name and level.\nPrint: 'Player Valkyrie is Level 12'",
        starterCode: `const player = { name: "Valkyrie", level: 12 };\n// Destructure and log status\n`,
        expectedOutput: "Player Valkyrie is Level 12",
        solutionCode: `const player = { name: "Valkyrie", level: 12 };\nconst { name, level } = player;\nconsole.log(\`Player \${name} is Level \${level}\`);`,
        hint: "Use const { name, level } = player; then use a template literal.",
        explanation: "Object destructuring is a ubiquitous modern JavaScript feature."
      },
      {
        id: "js_v_i2",
        topicKey: "variables",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "predict_output",
        title: "Spread Operator with Arrays",
        prompt: "What will this array spread produce?",
        codeSnippet: `const a = [1, 2];\nconst b = [...a, 3, 4];\nconsole.log(b.join("-"));`,
        options: ["1-2-3-4", "[1, 2]-3-4", "1,2,3,4", "10"],
        correctAnswer: "1-2-3-4",
        hint: "...a spreads elements 1 and 2 into the new array. join('-') connects them with hyphens.",
        explanation: "Spread syntax expands iterable items into a new array."
      },
      {
        id: "js_v_i3",
        topicKey: "variables",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "puzzle",
        title: "Assemble User Profile Object",
        prompt: "Assemble a clean JavaScript configuration object:",
        scrambledLines: [
          { id: "uo2", text: 'const config = {\n  theme: "dark",\n  notifications: true\n};' },
          { id: "uo1", text: 'const userId = "usr_942";' },
          { id: "uo3", text: 'console.log(`User ${userId} uses ${config.theme} mode`);' }
        ],
        correctOrder: ["uo1", "uo2", "uo3"],
        hint: "Define userId, define config, then print using both.",
        explanation: "Objects group related state into organized key-value structures."
      },
      {
        id: "js_v_i4",
        topicKey: "variables",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "bug_hunt",
        title: "Nullish Coalescing vs OR Bug",
        prompt: "Fix the bug where 0 score was falsely overridden with 10:",
        codeLines: [
          `const score = 0;`,
          `const finalScore = score || 10;`,
          `console.log(finalScore);`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `const finalScore = score ?? 10;`,
          `const finalScore = score && 10;`,
          `const finalScore = !score ? 10 : 0;`
        ],
        correctFix: `const finalScore = score ?? 10;`,
        hint: "The nullish coalescing operator (??) only replaces null or undefined, preserving 0.",
        explanation: "|| treats 0 as falsy, whereas ?? preserves 0 as a valid number."
      },

      // Advanced (4 exercises)
      {
        id: "js_v_a1",
        topicKey: "variables",
        language: "JavaScript",
        difficulty: "advanced",
        type: "coding",
        title: "Immutable State Update with Spread",
        prompt: "Simulate a shopping cart item update without mutating the original object.",
        instructions: "const cart = { items: 2, total: 40 };\nCreate updatedCart with items: 3, total: 60 using object spread.\nPrint: 'Items: 3 | Total: $60'",
        starterCode: `const cart = { items: 2, total: 40 };\n// Create updatedCart using spread\n`,
        expectedOutput: "Items: 3 | Total: $60",
        solutionCode: `const cart = { items: 2, total: 40 };\nconst updatedCart = { ...cart, items: 3, total: 60 };\nconsole.log(\`Items: \${updatedCart.items} | Total: \$\${updatedCart.total}\`);`,
        hint: "const updatedCart = { ...cart, items: 3, total: 60 };",
        explanation: "Immutable updates are the core foundation of React and modern frontend state management."
      },
      {
        id: "js_v_a2",
        topicKey: "variables",
        language: "JavaScript",
        difficulty: "advanced",
        type: "predict_output",
        title: "Optional Chaining Operator (?.)",
        prompt: "What will optional chaining print when an inner property is missing?",
        codeSnippet: `const data = { user: null };\nconsole.log(data.user?.profile?.name ?? "Anonymous");`,
        options: ["Anonymous", "null", "undefined", "TypeError"],
        correctAnswer: "Anonymous",
        hint: "data.user?. evaluates to undefined safely without throwing, so ?? returns 'Anonymous'.",
        explanation: "Optional chaining prevents 'Cannot read properties of null' errors."
      },
      {
        id: "js_v_a3",
        topicKey: "variables",
        language: "JavaScript",
        difficulty: "advanced",
        type: "puzzle",
        title: "Shallow Clone vs Deep Reference",
        prompt: "Reconstruct this demonstration of array cloning:",
        scrambledLines: [
          { id: "sc2", text: "const clone = [...original];" },
          { id: "sc1", text: "const original = [10, 20];" },
          { id: "sc4", text: "console.log(`Original: ${original.length}, Clone: ${clone.length}`);" },
          { id: "sc3", text: "clone.push(30);" }
        ],
        correctOrder: ["sc1", "sc2", "sc3", "sc4"],
        hint: "Define original -> clone with spread -> mutate clone -> print both.",
        explanation: "Cloning prevents accidental mutations across shared memory references."
      },
      {
        id: "js_v_a4",
        topicKey: "variables",
        language: "JavaScript",
        difficulty: "advanced",
        type: "coding",
        title: "Mini-Project: Game Inventory Manager",
        prompt: "Capstone Mini-Project for JavaScript Variables: Track weapons, potions, and coin purse.",
        instructions: "Given:\nconst bag = { weapon: 'Iron Sword', potions: 3, gold: 120 };\nUser finds 50 gold and consumes 1 potion.\nCompute updated inventory and print:\n=== INVENTORY ===\nWeapon: Iron Sword\nPotions: 2\nGold: 170",
        starterCode: `const bag = { weapon: "Iron Sword", potions: 3, gold: 120 };\n// Compute updated bag state and print\n`,
        expectedOutput: "=== INVENTORY ===\nWeapon: Iron Sword\nPotions: 2\nGold: 170",
        solutionCode: `const bag = { weapon: "Iron Sword", potions: 3, gold: 120 };\nconst updated = {\n  ...bag,\n  potions: bag.potions - 1,\n  gold: bag.gold + 50\n};\nconsole.log("=== INVENTORY ===");\nconsole.log(\`Weapon: \${updated.weapon}\`);\nconsole.log(\`Potions: \${updated.potions}\`);\nconsole.log(\`Gold: \${updated.gold}\`);`,
        hint: "Spread bag, subtract 1 from potions, add 50 to gold, and print the 4 lines.",
        explanation: "Excellent! You've modeled game state updates using immutable data structures."
      }
    ]
  },

  {
    key: "conditions",
    name: "Conditionals & Logic",
    tagline: "if / else, switch statements & boolean logic",
    iconName: "GitFork",
    order: 3,
    realLifeAnalogy: {
      metaphor: "A Railway Track Switcher",
      details: "A train track switch moves the rails so the train goes either to Station A or Station B. In JavaScript, conditionals steer program execution down different tracks based on True or False."
    },
    conceptCard: {
      summary: "Conditionals evaluate boolean expressions to choose which block of code to run. Always use '===' for strict equality comparison.",
      codeExample: `const hour = 14;\nif (hour < 12) {\n  console.log("Good morning!");\n} else if (hour < 18) {\n  console.log("Good afternoon!");\n} else {\n  console.log("Good evening!");\n}`,
      whatItDoes: [
        "if (condition) { ... } runs if the test is true.",
        "else if (next) { ... } checks secondary conditions.",
        "Curly braces { } define code blocks in JavaScript.",
        "Logical operators: && (AND), || (OR), ! (NOT)."
      ],
      keyTakeaway: "Use strict equality (===) instead of loose equality (==) to avoid weird JavaScript coercion surprises!"
    },
    exercises: [
      // Easy (4 exercises)
      {
        id: "js_c_e1",
        topicKey: "conditions",
        language: "JavaScript",
        difficulty: "easy",
        type: "predict_output",
        title: "Basic If-Else Branching",
        prompt: "What will this conditional check print?",
        codeSnippet: `const isReady = true;\nif (isReady) {\n  console.log("System Ready");\n} else {\n  console.log("Offline");\n}`,
        options: ["System Ready", "Offline", "true", "undefined"],
        correctAnswer: "System Ready",
        hint: "isReady is true, so the if block runs.",
        explanation: "The condition evaluates to true, directing execution into the first block."
      },
      {
        id: "js_c_e2",
        topicKey: "conditions",
        language: "JavaScript",
        difficulty: "easy",
        type: "fill_blank",
        title: "Strict Equality Operator",
        prompt: "Choose the strict equality operator that compares value and type:",
        codeBeforeBlank: `const role = "admin";\nif (role `,
        blankPlaceholder: "???",
        codeAfterBlank: ` "admin") {\n  console.log("Access Granted");\n}`,
        options: ["===", "==", "=", "is"],
        correctAnswer: "===",
        hint: "Triple equals sign.",
        explanation: "=== is JavaScript's strict equality operator."
      },
      {
        id: "js_c_e3",
        topicKey: "conditions",
        language: "JavaScript",
        difficulty: "easy",
        type: "match_pairs",
        title: "Logical Operators in JS",
        prompt: "Match JavaScript logical operators with their behavior:",
        pairs: [
          { term: "&&", meaning: "True only if BOTH sides are true" },
          { term: "||", meaning: "True if EITHER side is true" },
          { term: "!", meaning: "Inverts boolean (true -> false)" },
          { term: "? :", meaning: "Ternary operator: condition ? a : b" }
        ],
        hint: "&& is AND; || is OR; ! is NOT.",
        explanation: "These operators combine logical statements."
      },
      {
        id: "js_c_e4",
        topicKey: "conditions",
        language: "JavaScript",
        difficulty: "easy",
        type: "bug_hunt",
        title: "Missing Parentheses in If Statement",
        prompt: "In JavaScript, if conditions must be wrapped in parentheses ( ). Fix the syntax error:",
        codeLines: [
          `const level = 5;`,
          `if level >= 5 {`,
          `  console.log("Eligible");`,
          `}`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `if (level >= 5) {`,
          `if {level >= 5} {`,
          `if [level >= 5] {`
        ],
        correctFix: `if (level >= 5) {`,
        hint: "Wrap the condition in parentheses ( ).",
        explanation: "JavaScript syntax mandates parentheses around conditional expressions."
      },

      // Moderate (4 exercises)
      {
        id: "js_c_m1",
        topicKey: "conditions",
        language: "JavaScript",
        difficulty: "moderate",
        type: "predict_output",
        title: "Ternary Operator Evaluation",
        prompt: "What is logged by this ternary expression?",
        codeSnippet: `const speed = 75;\nconst alert = speed > 65 ? "Speeding" : "Normal";\nconsole.log(alert);`,
        options: ["Speeding", "Normal", "75", "true"],
        correctAnswer: "Speeding",
        hint: "Since 75 > 65 is true, the expression returns the first value ('Speeding').",
        explanation: "The ternary operator returns the expression after ? when the condition is true."
      },
      {
        id: "js_c_m2",
        topicKey: "conditions",
        language: "JavaScript",
        difficulty: "moderate",
        type: "puzzle",
        title: "VIP Door Access Check",
        prompt: "Assemble this security clearance pipeline:",
        scrambledLines: [
          { id: "jc2", text: "if (hasBadge && hasPin) {" },
          { id: "jc1", text: "const hasBadge = true;\nconst hasPin = true;" },
          { id: "jc4", text: "} else {\n  console.log('Door Locked');\n}" },
          { id: "jc3", text: "  console.log('Door Unlocked');" }
        ],
        correctOrder: ["jc1", "jc2", "jc3", "jc4"],
        hint: "Declare flags, check both with &&, log success, fallback to else.",
        explanation: "The && operator ensures all credentials are confirmed before opening."
      },
      {
        id: "js_c_m3",
        topicKey: "conditions",
        language: "JavaScript",
        difficulty: "moderate",
        type: "fill_blank",
        title: "Else If Syntax in JavaScript",
        prompt: "How is 'else if' written in JavaScript?",
        codeBeforeBlank: `const score = 82;\nif (score >= 90) {\n  console.log("A");\n} `,
        blankPlaceholder: "???",
        codeAfterBlank: ` (score >= 80) {\n  console.log("B");\n}`,
        options: ["else if", "elif", "elsif", "then if"],
        correctAnswer: "else if",
        hint: "In JavaScript, 'else if' is written as two separate words.",
        explanation: "Unlike Python's 'elif', JavaScript uses two words: 'else if'."
      },
      {
        id: "js_c_m4",
        topicKey: "conditions",
        language: "JavaScript",
        difficulty: "moderate",
        type: "bug_hunt",
        title: "Switch Statement Missing Break",
        prompt: "Fix the fall-through bug by adding break to case 'gold':",
        codeLines: [
          `const tier = "gold";`,
          `switch (tier) {`,
          `  case "gold":`,
          `    console.log("20% off");`,
          `  case "silver":`,
          `    console.log("10% off");`,
          `    break;`,
          `}`
        ],
        buggyLineIndex: 3,
        fixOptions: [
          `    console.log("20% off");\n    break;`,
          `    console.log("20% off");\n    continue;`,
          `    return "20% off";`
        ],
        correctFix: `    console.log("20% off");\n    break;`,
        hint: "Without 'break', JavaScript continues executing subsequent cases (fall-through).",
        explanation: "Adding 'break' halts switch execution upon matching the case."
      },

      // Intermediate (4 exercises)
      {
        id: "js_c_i1",
        topicKey: "conditions",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "coding",
        title: "Movie Ticket Pricing Logic",
        prompt: "Determine ticket price by age.",
        instructions: "const age = 10;\nIf age < 12: price is $8.\nIf age < 65: price is $14.\nOtherwise: price is $10.\nPrint: 'Ticket: $8'",
        starterCode: `const age = 10;\n// Determine price and log\n`,
        expectedOutput: "Ticket: $8",
        solutionCode: `const age = 10;\nlet price = 14;\nif (age < 12) {\n  price = 8;\n} else if (age >= 65) {\n  price = 10;\n}\nconsole.log(\`Ticket: \$\${price}\`);`,
        hint: "Check age < 12 first and set price = 8.",
        explanation: "Tiered logic handles demographic pricing structures reliably."
      },
      {
        id: "js_c_i2",
        topicKey: "conditions",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "predict_output",
        title: "Falsy Values in JavaScript",
        prompt: "Which branch executes for an empty string \"\"?",
        codeSnippet: `const query = "";\nif (query) {\n  console.log("Has search text");\n} else {\n  console.log("Empty search");\n}`,
        options: ["Empty search", "Has search text", "undefined", "true"],
        correctAnswer: "Empty search",
        hint: "Empty string \"\" is one of JavaScript's falsy values (along with 0, null, undefined, NaN).",
        explanation: "Falsy values automatically coerce to false inside if conditions."
      },
      {
        id: "js_c_i3",
        topicKey: "conditions",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "puzzle",
        title: "Form Validation Pipeline",
        prompt: "Order this input field validation logic:",
        scrambledLines: [
          { id: "fv2", text: "const isNotEmpty = email.length > 0;" },
          { id: "fv1", text: 'const email = "user@example.com";' },
          { id: "fv4", text: "console.log(isValid ? 'Email valid' : 'Email invalid');" },
          { id: "fv3", text: "const isValid = isNotEmpty && email.includes('@');" }
        ],
        correctOrder: ["fv1", "fv2", "fv3", "fv4"],
        hint: "Email value -> length check -> combination check -> logged ternary.",
        explanation: "Composable boolean checks create understandable validation pipelines."
      },
      {
        id: "js_c_i4",
        topicKey: "conditions",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "bug_hunt",
        title: "Accidental Assignment in If",
        prompt: "Spot the single '=' assignment bug inside the condition:",
        codeLines: [
          `let isLoggedIn = false;`,
          `if (isLoggedIn = true) {`,
          `  console.log("Welcome back!");`,
          `}`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `if (isLoggedIn === true) {`,
          `if (isLoggedIn == true) {`,
          `if (isLoggedIn) {`
        ],
        correctFix: `if (isLoggedIn) {`,
        hint: "Single '=' assigns true to isLoggedIn, making the condition always evaluate to true!",
        explanation: "Testing 'if (isLoggedIn)' tests the boolean directly without accidental assignment."
      },

      // Advanced (4 exercises)
      {
        id: "js_c_a1",
        topicKey: "conditions",
        language: "JavaScript",
        difficulty: "advanced",
        type: "coding",
        title: "HTTP Status Code Responder",
        prompt: "Write a status mapper using a switch or object lookup for code = 404.",
        instructions: "const code = 404;\nMap: 200 -> 'OK', 404 -> 'Not Found', 500 -> 'Server Error'.\nPrint: '404: Not Found'",
        starterCode: `const code = 404;\n// Map code to status text and log\n`,
        expectedOutput: "404: Not Found",
        solutionCode: `const code = 404;\nconst messages = { 200: "OK", 404: "Not Found", 500: "Server Error" };\nconst text = messages[code] || "Unknown";\nconsole.log(\`\${code}: \${text}\`);`,
        hint: "Use an object map: { 200: 'OK', 404: 'Not Found' } or switch.",
        explanation: "Object lookup maps are cleaner and faster than long if/else chains."
      },
      {
        id: "js_c_a2",
        topicKey: "conditions",
        language: "JavaScript",
        difficulty: "advanced",
        type: "predict_output",
        title: "Logical Assignment Operators",
        prompt: "What will logical OR assignment (||=) output?",
        codeSnippet: `let title = "";\ntitle ||= "Default Title";\nconsole.log(title);`,
        options: ["Default Title", '""', "undefined", "true"],
        correctAnswer: "Default Title",
        hint: "title ||= value assigns only if title is currently falsy (empty string is falsy).",
        explanation: "Logical OR assignment (||=) assigns a fallback value if the left side is falsy."
      },
      {
        id: "js_c_a3",
        topicKey: "conditions",
        language: "JavaScript",
        difficulty: "advanced",
        type: "puzzle",
        title: "Feature Flag Evaluation Pipeline",
        prompt: "Assemble this feature flag authorization check:",
        scrambledLines: [
          { id: "ff2", text: "const isBetaTester = user.roles.includes('beta');" },
          { id: "ff1", text: "const user = { id: 42, roles: ['beta', 'pro'] };" },
          { id: "ff4", text: "console.log(`AI Assist: ${canAccess ? 'ENABLED' : 'DISABLED'}`);" },
          { id: "ff3", text: "const canAccess = isBetaTester && user.roles.includes('pro');" }
        ],
        correctOrder: ["ff1", "ff2", "ff3", "ff4"],
        hint: "User object -> role check -> compound check -> ternary log.",
        explanation: "Feature flags empower SaaS platforms to safely roll out new features to select cohorts."
      },
      {
        id: "js_c_a4",
        topicKey: "conditions",
        language: "JavaScript",
        difficulty: "advanced",
        type: "coding",
        title: "Mini-Project: Checkout Promo Code Engine",
        prompt: "Capstone Mini-Project for JavaScript Conditions: Calculate promo discount and tax.",
        instructions: "Given subtotal = 100, promo = 'SAVE20'.\nIf promo === 'SAVE20', deduct 20% from subtotal.\nAdd 10% tax on the discounted amount.\nPrint:\n=== CHECKOUT ===\nSubtotal: $100\nDiscount: $20\nTax: $8\nTotal: $88",
        starterCode: `const subtotal = 100;\nconst promo = "SAVE20";\n// Calculate discount, tax, and final total\n`,
        expectedOutput: "=== CHECKOUT ===\nSubtotal: $100\nDiscount: $20\nTax: $8\nTotal: $88",
        solutionCode: `const subtotal = 100;\nconst promo = "SAVE20";\nlet discount = 0;\nif (promo === "SAVE20") {\n  discount = subtotal * 0.20;\n}\nconst afterDiscount = subtotal - discount;\nconst tax = afterDiscount * 0.10;\nconst total = afterDiscount + tax;\nconsole.log("=== CHECKOUT ===");\nconsole.log(\`Subtotal: \$\${subtotal}\`);\nconsole.log(\`Discount: \$\${discount}\`);\nconsole.log(\`Tax: \$\${tax}\`);\nconsole.log(\`Total: \$\${total}\`);`,
        hint: "Calculate discount ($20), tax on remainder ($8), and sum to $88.",
        explanation: "Fantastic! You've modeled a commercial e-commerce checkout calculation pipeline."
      }
    ]
  },

  {
    key: "loops",
    name: "Loops & Iteration",
    tagline: "for, while, for...of & array iterators",
    iconName: "Repeat",
    order: 4,
    realLifeAnalogy: {
      metaphor: "A Music Playlist Shuffle",
      details: "A loop iterating through an array is like a music playlist. It takes the first song, plays it, then moves to the second, third, until the playlist is finished."
    },
    conceptCard: {
      summary: "Loops repeat actions efficiently. In JavaScript, 'for...of' is the cleanest modern way to iterate through arrays, while traditional 'for' loops give you index control.",
      codeExample: `const languages = ["Python", "JavaScript", "C"];\nfor (const lang of languages) {\n  console.log(\`Learning \${lang}!\`);\n}\n\n// Counting loop\nfor (let i = 1; i <= 3; i++) {\n  console.log(\`Lap \${i}\`);\n}`,
      whatItDoes: [
        "for (const item of array) iterates directly over values.",
        "for (let i = 0; i < N; i++) is standard index-based iteration.",
        "while (condition) loops as long as the test holds true."
      ],
      keyTakeaway: "Prefer 'for...of' when you just need the values, and 'for (let i = 0...)' when you need the index number."
    },
    exercises: [
      // Easy (4 exercises)
      {
        id: "js_l_e1",
        topicKey: "loops",
        language: "JavaScript",
        difficulty: "easy",
        type: "predict_output",
        title: "Standard For Loop Counting",
        prompt: "What will this for loop print?",
        codeSnippet: `for (let i = 0; i < 3; i++) {\n  console.log(i);\n}`,
        options: ["0\n1\n2", "1\n2\n3", "0\n1\n2\n3", "3"],
        correctAnswer: "0\n1\n2",
        hint: "Starts at 0, runs while i < 3 (0, 1, 2).",
        explanation: "Loops terminating with < 3 execute 3 times for indices 0, 1, and 2."
      },
      {
        id: "js_l_e2",
        topicKey: "loops",
        language: "JavaScript",
        difficulty: "easy",
        type: "fill_blank",
        title: "Modern for...of Loop",
        prompt: "Complete the for...of syntax to iterate through array items:",
        codeBeforeBlank: `const colors = ["Red", "Blue"];\nfor (const color `,
        blankPlaceholder: "???",
        codeAfterBlank: ` colors) {\n  console.log(color);\n}`,
        options: ["of", "in", "from", "each"],
        correctAnswer: "of",
        hint: "'for...of' loops over array values; 'for...in' loops over keys.",
        explanation: "The 'of' keyword is used in JavaScript to iterate over iterable values."
      },
      {
        id: "js_l_e3",
        topicKey: "loops",
        language: "JavaScript",
        difficulty: "easy",
        type: "match_pairs",
        title: "Loop Anatomy Elements",
        prompt: "Match the three parts of a standard for loop header:",
        pairs: [
          { term: "let i = 0", meaning: "Initialization: sets starting counter" },
          { term: "i < length", meaning: "Condition: checked before each loop" },
          { term: "i++", meaning: "Increment: updates counter after each loop" },
          { term: "break", meaning: "Immediately escapes the loop" }
        ],
        hint: "Initialization -> Condition -> Increment.",
        explanation: "These three parts govern standard for-loop lifecycles."
      },
      {
        id: "js_l_e4",
        topicKey: "loops",
        language: "JavaScript",
        difficulty: "easy",
        type: "bug_hunt",
        title: "Infinite While Loop",
        prompt: "Find and fix the missing increment causing an infinite freeze:",
        codeLines: [
          `let count = 1;`,
          `while (count <= 3) {`,
          `  console.log(count);`,
          `}`
        ],
        buggyLineIndex: 2,
        fixOptions: [
          `  console.log(count);\n  count++;`,
          `  console.log(count);\n  count = 1;`,
          `  break;`
        ],
        correctFix: `  console.log(count);\n  count++;`,
        hint: "count must be incremented with count++ so it eventually exceeds 3.",
        explanation: "Updating the loop counter ensures the termination condition is met."
      },

      // Moderate (4 exercises)
      {
        id: "js_l_m1",
        topicKey: "loops",
        language: "JavaScript",
        difficulty: "moderate",
        type: "puzzle",
        title: "Iterate and Sum Array",
        prompt: "Order this loop to accumulate numbers into total:",
        scrambledLines: [
          { id: "sl2", text: "let total = 0;" },
          { id: "sl1", text: "const prices = [10, 20, 30];" },
          { id: "sl4", text: "console.log(`Total: $${total}`);" },
          { id: "sl3", text: "for (const p of prices) {\n  total += p;\n}" }
        ],
        correctOrder: ["sl1", "sl2", "sl3", "sl4"],
        hint: "Array -> accumulator -> for...of loop -> log.",
        explanation: "The accumulator pattern aggregates collections into a single scalar value."
      },
      {
        id: "js_l_m2",
        topicKey: "loops",
        language: "JavaScript",
        difficulty: "moderate",
        type: "predict_output",
        title: "Continue Skipping Even Numbers",
        prompt: "What will this loop print?",
        codeSnippet: `for (let i = 1; i <= 4; i++) {\n  if (i % 2 === 0) continue;\n  console.log(i);\n}`,
        options: ["1\n3", "2\n4", "1\n2\n3\n4", "1"],
        correctAnswer: "1\n3",
        hint: "continue skips the rest of the loop when i is even (2 and 4).",
        explanation: "Only odd numbers 1 and 3 reach console.log."
      },
      {
        id: "js_l_m3",
        topicKey: "loops",
        language: "JavaScript",
        difficulty: "moderate",
        type: "fill_blank",
        title: "Array forEach Method",
        prompt: "Which array method takes a callback function to iterate:",
        codeBeforeBlank: `const names = ["Ava", "Liam"];\nnames.`,
        blankPlaceholder: "???",
        codeAfterBlank: `(name => console.log(name));`,
        options: ["forEach", "loop", "iterate", "each"],
        correctAnswer: "forEach",
        hint: "CamelCase method on Array.prototype.",
        explanation: "Array.prototype.forEach executes a provided function once for each element."
      },
      {
        id: "js_l_m4",
        topicKey: "loops",
        language: "JavaScript",
        difficulty: "moderate",
        type: "bug_hunt",
        title: "Array Index Out of Bounds",
        prompt: "Fix the off-by-one condition error in the for loop header:",
        codeLines: [
          `const items = ["A", "B", "C"];`,
          `for (let i = 0; i <= items.length; i++) {`,
          `  console.log(items[i]);`,
          `}`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `for (let i = 0; i < items.length; i++) {`,
          `for (let i = 1; i < items.length; i++) {`,
          `for (let i = 0; i < 3; i++) {`
        ],
        correctFix: `for (let i = 0; i < items.length; i++) {`,
        hint: "Use < items.length instead of <=. items[items.length] is undefined!",
        explanation: "Indices go from 0 to length - 1. Using < prevents accessing an undefined index."
      },

      // Intermediate (4 exercises)
      {
        id: "js_l_i1",
        topicKey: "loops",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "coding",
        title: "Filter Positive Numbers",
        prompt: "Iterate through numbers and print only values greater than 0.",
        instructions: "const nums = [-5, 12, -3, 8];\nIterate with for...of and log each positive number on its own line.",
        starterCode: `const nums = [-5, 12, -3, 8];\n// Loop and log positive numbers\n`,
        expectedOutput: "12\n8",
        solutionCode: `const nums = [-5, 12, -3, 8];\nfor (const n of nums) {\n  if (n > 0) {\n    console.log(n);\n  }\n}`,
        hint: "Use if (n > 0) inside a for...of loop.",
        explanation: "Combining loops with filter conditions extracts subsets from datasets."
      },
      {
        id: "js_l_i2",
        topicKey: "loops",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "predict_output",
        title: "Array map Method Transformation",
        prompt: "What does this .map() expression return?",
        codeSnippet: `const doubled = [1, 2, 3].map(x => x * 2);\nconsole.log(doubled.join(", "));`,
        options: ["2, 4, 6", "1, 2, 3", "[2, 4, 6]", "12"],
        correctAnswer: "2, 4, 6",
        hint: "map transforms each element by multiplying it by 2.",
        explanation: "map creates a new array populated with the results of calling the function on every element."
      },
      {
        id: "js_l_i3",
        topicKey: "loops",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "puzzle",
        title: "Find Element with Linear Search",
        prompt: "Reconstruct a linear search loop that finds index of target:",
        scrambledLines: [
          { id: "ls2", text: "let foundIndex = -1;" },
          { id: "ls1", text: "const list = ['cat', 'dog', 'fox'];\nconst target = 'dog';" },
          { id: "ls4", text: "console.log(`Found at: ${foundIndex}`);" },
          { id: "ls3", text: "for (let i = 0; i < list.length; i++) {\n  if (list[i] === target) {\n    foundIndex = i;\n    break;\n  }\n}" }
        ],
        correctOrder: ["ls1", "ls2", "ls3", "ls4"],
        hint: "Data -> initialize foundIndex to -1 -> loop with break -> log.",
        explanation: "Linear search inspects elements sequentially until a match is confirmed."
      },
      {
        id: "js_l_i4",
        topicKey: "loops",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "bug_hunt",
        title: "Accidental Global Loop Variable",
        prompt: "Fix the missing 'let' keyword in the loop header:",
        codeLines: [
          `for (i = 0; i < 3; i++) {`,
          `  console.log(i);`,
          `}`
        ],
        buggyLineIndex: 0,
        fixOptions: [
          `for (let i = 0; i < 3; i++) {`,
          `for (const i = 0; i < 3; i++) {`,
          `for (var i = 0; i < 3; i++) {`
        ],
        correctFix: `for (let i = 0; i < 3; i++) {`,
        hint: "Always declare the counter with 'let' to keep it block-scoped.",
        explanation: "Omitting 'let' leaks 'i' into the global scope in non-strict mode."
      },

      // Advanced (4 exercises)
      {
        id: "js_l_a1",
        topicKey: "loops",
        language: "JavaScript",
        difficulty: "advanced",
        type: "coding",
        title: "Array reduce Frequency Map",
        prompt: "Count occurrences of words in an array using a loop or reduce.",
        instructions: "const votes = ['yes', 'no', 'yes', 'yes'];\nCount yes votes and print: 'Yes votes: 3'",
        starterCode: `const votes = ["yes", "no", "yes", "yes"];\n// Count yes votes\n`,
        expectedOutput: "Yes votes: 3",
        solutionCode: `const votes = ["yes", "no", "yes", "yes"];\nlet yesCount = 0;\nfor (const v of votes) {\n  if (v === "yes") yesCount++;\n}\nconsole.log(\`Yes votes: \${yesCount}\`);`,
        hint: "Loop through votes and increment a counter when v === 'yes'.",
        explanation: "Frequency counting is a core pattern in search indexing and voting systems."
      },
      {
        id: "js_l_a2",
        topicKey: "loops",
        language: "JavaScript",
        difficulty: "advanced",
        type: "predict_output",
        title: "Nested Array Flattening",
        prompt: "What will this nested loop output?",
        codeSnippet: `const matrix = [[1, 2], [3, 4]];\nlet sum = 0;\nfor (const row of matrix) {\n  for (const cell of row) {\n    sum += cell;\n  }\n}\nconsole.log(sum);`,
        options: ["10", "4", "24", "NaN"],
        correctAnswer: "10",
        hint: "1 + 2 + 3 + 4 = 10.",
        explanation: "Iterating through matrix rows and columns sums every 2D grid cell."
      },
      {
        id: "js_l_a3",
        topicKey: "loops",
        language: "JavaScript",
        difficulty: "advanced",
        type: "puzzle",
        title: "Debounce Retry Loop Simulation",
        prompt: "Assemble a retry loop that attempts a task up to 3 times:",
        scrambledLines: [
          { id: "rt2", text: "for (let attempt = 1; attempt <= 3; attempt++) {" },
          { id: "rt1", text: "let connected = false;" },
          { id: "rt4", text: "console.log(connected ? 'Online' : 'Failed');" },
          { id: "rt3", text: "  if (attempt === 2) { connected = true; break; }\n}" }
        ],
        correctOrder: ["rt1", "rt2", "rt3", "rt4"],
        hint: "Flag -> for attempt -> success check with break -> result log.",
        explanation: "Retry loops with backoff strategies are standard for resilient network requests."
      },
      {
        id: "js_l_a4",
        topicKey: "loops",
        language: "JavaScript",
        difficulty: "advanced",
        type: "coding",
        title: "Mini-Project: Leaderboard Formatter",
        prompt: "Capstone Mini-Project for JavaScript Loops: Format ranked player rankings with medal badges.",
        instructions: "Given const scores = [95, 82, 70];\nGiven const players = ['Elena', 'Marcus', 'Chloe'];\nLoop and print:\n=== LEADERBOARD ===\n#1 Elena - 95 pts\n#2 Marcus - 82 pts\n#3 Chloe - 70 pts",
        starterCode: `const players = ["Elena", "Marcus", "Chloe"];\nconst scores = [95, 82, 70];\n// Output formatted leaderboard\n`,
        expectedOutput: "=== LEADERBOARD ===\n#1 Elena - 95 pts\n#2 Marcus - 82 pts\n#3 Chloe - 70 pts",
        solutionCode: `const players = ["Elena", "Marcus", "Chloe"];\nconst scores = [95, 82, 70];\nconsole.log("=== LEADERBOARD ===");\nfor (let i = 0; i < players.length; i++) {\n  console.log(\`#\${i + 1} \${players[i]} - \${scores[i]} pts\`);\n}`,
        hint: "Loop with i from 0 to players.length, print #i+1, player, and score.",
        explanation: "Outstanding! You leveraged parallel index iteration to construct a gamified leaderboard."
      }
    ]
  },

  {
    key: "functions",
    name: "Functions & Arrow Syntax",
    tagline: "function keyword, arrow functions () => & callbacks",
    iconName: "Cpu",
    order: 5,
    realLifeAnalogy: {
      metaphor: "A Smartphone App Shortcut",
      details: "Tapping a shortcut icon on your phone runs an automated series of actions: turns on Wi-Fi, opens Maps, and calculates directions. A function is your code shortcut!"
    },
    conceptCard: {
      summary: "Functions encapsulate logic into modular units. Modern JavaScript makes heavy use of concise arrow functions: (param) => expression.",
      codeExample: `// Traditional function\nfunction add(a, b) {\n  return a + b;\n}\n\n// Arrow function\nconst multiply = (a, b) => a * b;\n\nconsole.log(multiply(4, 5));`,
      whatItDoes: [
        "function name(params) { return value; } is standard syntax.",
        "const fn = (params) => { ... } is arrow function syntax.",
        "Single-expression arrow functions have an implicit return (no need to write 'return')."
      ],
      keyTakeaway: "Arrow functions don't bind their own 'this' and are perfect for callbacks and short transformations!"
    },
    exercises: [
      // Easy (4 exercises)
      {
        id: "js_f_e1",
        topicKey: "functions",
        language: "JavaScript",
        difficulty: "easy",
        type: "predict_output",
        title: "Calling an Arrow Function",
        prompt: "What will this arrow function call print?",
        codeSnippet: `const greet = name => \`Hi, \${name}!\`;\nconsole.log(greet("Maya"));`,
        options: ["Hi, Maya!", "greet(Maya)", "undefined", "TypeError"],
        correctAnswer: "Hi, Maya!",
        hint: "name receives 'Maya', and the implicit return outputs 'Hi, Maya!'.",
        explanation: "Arrow functions without curly braces automatically return the expression."
      },
      {
        id: "js_f_e2",
        topicKey: "functions",
        language: "JavaScript",
        difficulty: "easy",
        type: "fill_blank",
        title: "Arrow Function Symbol",
        prompt: "Which two characters form the 'fat arrow' in arrow functions?",
        codeBeforeBlank: `const square = (x) `,
        blankPlaceholder: "???",
        codeAfterBlank: ` x * x;\nconsole.log(square(5));`,
        options: ["=>", "->", "==>", "~>"],
        correctAnswer: "=>",
        hint: "Equals sign followed immediately by greater-than sign.",
        explanation: "=> is the arrow operator in JavaScript ES6 syntax."
      },
      {
        id: "js_f_e3",
        topicKey: "functions",
        language: "JavaScript",
        difficulty: "easy",
        type: "match_pairs",
        title: "Function Concepts",
        prompt: "Match JavaScript function terminology:",
        pairs: [
          { term: "Arrow function", meaning: "Concise syntax using =>" },
          { term: "Return value", meaning: "Output delivered back to caller" },
          { term: "Callback", meaning: "Function passed as argument to another" },
          { term: "Default parameter", meaning: "Fallback value if argument omitted" }
        ],
        hint: "Review arrow functions, returns, and callbacks.",
        explanation: "Functions serve as first-class citizens throughout modern JavaScript."
      },
      {
        id: "js_f_e4",
        topicKey: "functions",
        language: "JavaScript",
        difficulty: "easy",
        type: "bug_hunt",
        title: "Missing Return in Block Body",
        prompt: "Arrow functions with curly braces require an explicit return. Fix the bug:",
        codeLines: [
          `const double = (n) => {`,
          `  n * 2;`,
          `};`,
          `console.log(double(10));`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `  return n * 2;`,
          `  give n * 2;`,
          `  output n * 2;`
        ],
        correctFix: `  return n * 2;`,
        hint: "When using { }, you must write 'return' explicitly.",
        explanation: "Without 'return', block-body arrow functions return undefined."
      },

      // Moderate (4 exercises)
      {
        id: "js_f_m1",
        topicKey: "functions",
        language: "JavaScript",
        difficulty: "moderate",
        type: "puzzle",
        title: "Order Function Definition & Invocation",
        prompt: "Arrange this calculateTax function and call:",
        scrambledLines: [
          { id: "jf3", text: 'console.log(`Tax: $${tax}`);' },
          { id: "jf1", text: 'const calculateTax = (amount, rate = 0.08) => amount * rate;' },
          { id: "jf2", text: 'const tax = calculateTax(100);' }
        ],
        correctOrder: ["jf1", "jf2", "jf3"],
        hint: "Arrow function declaration first -> invocation with 100 -> log.",
        explanation: "Unlike function declarations, arrow functions assigned to const are not hoisted."
      },
      {
        id: "js_f_m2",
        topicKey: "functions",
        language: "JavaScript",
        difficulty: "moderate",
        type: "predict_output",
        title: "Default Parameter in Action",
        prompt: "What will this function print when the second argument is omitted?",
        codeSnippet: `const greetUser = (name, role = "Guest") => \`\${role}: \${name}\`;\nconsole.log(greetUser("Aria"));`,
        options: ["Guest: Aria", "undefined: Aria", "Aria", "Error"],
        correctAnswer: "Guest: Aria",
        hint: "role defaults to 'Guest' because no second argument was provided.",
        explanation: "Default parameters supply fallback values automatically."
      },
      {
        id: "js_f_m3",
        topicKey: "functions",
        language: "JavaScript",
        difficulty: "moderate",
        type: "fill_blank",
        title: "Passing Callback to Array Filter",
        prompt: "Filter array for words with length > 4:",
        codeBeforeBlank: `const words = ["sun", "planet", "star"];\nconst longWords = words.filter(w => w.`,
        blankPlaceholder: "???",
        codeAfterBlank: ` > 4);\nconsole.log(longWords[0]);`,
        options: ["length", "size", "count", "len"],
        correctAnswer: "length",
        hint: "JavaScript strings have a .length property.",
        explanation: "w.length > 4 matches 'planet' (6 letters)."
      },
      {
        id: "js_f_m4",
        topicKey: "functions",
        language: "JavaScript",
        difficulty: "moderate",
        type: "bug_hunt",
        title: "Hoisting TypeError with Arrow Functions",
        prompt: "Arrow functions cannot be called before their declaration line. Fix the call order:",
        codeLines: [
          `sayHi("Lucas");`,
          `const sayHi = (name) => console.log(\`Hi, \${name}\`);`
        ],
        buggyLineIndex: 0,
        fixOptions: [
          `// Move const sayHi declaration to line 1 before calling`,
          `var sayHi = (name) => console.log(\`Hi, \${name}\`);`,
          `sayHi == "Lucas";`
        ],
        correctFix: `// Move const sayHi declaration to line 1 before calling`,
        hint: "Const variables exist in the Temporal Dead Zone before initialization.",
        explanation: "Declaring the arrow function before invoking it prevents ReferenceError."
      },

      // Intermediate (4 exercises)
      {
        id: "js_f_i1",
        topicKey: "functions",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "coding",
        title: "Pure Math Function: Circle Area",
        prompt: "Write a function getCircleArea(radius) that computes Math.PI * radius * radius.",
        instructions: "Call getCircleArea(10) and print 'Area: 314.16' (rounded to 2 decimal places with .toFixed(2)).",
        starterCode: `// Define getCircleArea and log result\n`,
        expectedOutput: "Area: 314.16",
        solutionCode: `const getCircleArea = (r) => Math.PI * r * r;\nconst area = getCircleArea(10);\nconsole.log(\`Area: \${area.toFixed(2)}\`);`,
        hint: "Use Math.PI * r * r and area.toFixed(2).",
        explanation: "Pure mathematical functions produce deterministic results without side effects."
      },
      {
        id: "js_f_i2",
        topicKey: "functions",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "predict_output",
        title: "Closure Scope Retention",
        prompt: "What will the inner function retain access to?",
        codeSnippet: `function makeMultiplier(factor) {\n  return (num) => num * factor;\n}\nconst double = makeMultiplier(2);\nconsole.log(double(7));`,
        options: ["14", "7", "2", "NaN"],
        correctAnswer: "14",
        hint: "The inner function remembers factor = 2 in its closure. 7 * 2 = 14.",
        explanation: "Closures preserve lexical scope even after the outer function has returned."
      },
      {
        id: "js_f_i3",
        topicKey: "functions",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "puzzle",
        title: "Chain Array Pipelines",
        prompt: "Assemble a functional pipeline: filter evens -> square -> sum:",
        scrambledLines: [
          { id: "pl2", text: "const evens = nums.filter(x => x % 2 === 0);" },
          { id: "pl1", text: "const nums = [1, 2, 3, 4];" },
          { id: "pl4", text: "console.log(`Sum: ${sum}`);" },
          { id: "pl3", text: "const sum = evens.reduce((acc, x) => acc + (x * x), 0);" }
        ],
        correctOrder: ["pl1", "pl2", "pl3", "pl4"],
        hint: "Data -> filter -> reduce -> log.",
        explanation: "Method chaining transforms data declaratively."
      },
      {
        id: "js_f_i4",
        topicKey: "functions",
        language: "JavaScript",
        difficulty: "intermediate",
        type: "bug_hunt",
        title: "Implicit Return of Object Literal",
        prompt: "In arrow functions, returning an object literal directly requires wrapping it in parentheses (). Fix line 1:",
        codeLines: [
          `const createCoord = (x, y) => { x: x, y: y };`,
          `console.log(createCoord(5, 10));`
        ],
        buggyLineIndex: 0,
        fixOptions: [
          `const createCoord = (x, y) => ({ x, y });`,
          `const createCoord = (x, y) => { return { x, y } };`,
          `const createCoord = (x, y) => [x, y];`
        ],
        correctFix: `const createCoord = (x, y) => ({ x, y });`,
        hint: "Wrap the object in parentheses: ({ x, y }) so the JS parser doesn't mistake curly braces for a function block.",
        explanation: "({ x, y }) disambiguates object literals from function body brackets."
      },

      // Advanced (4 exercises)
      {
        id: "js_f_a1",
        topicKey: "functions",
        language: "JavaScript",
        difficulty: "advanced",
        type: "coding",
        title: "Compose Utility Function",
        prompt: "Implement a compose function that passes the result of f into g: compose(f, g)(x) -> g(f(x)).",
        instructions: "Given const addOne = x => x + 1; const triple = x => x * 3;\nCreate pipe(addOne, triple) with input 4.\nPrint: 'Piped Result: 15' (since (4 + 1) * 3 = 15).",
        starterCode: `const addOne = x => x + 1;\nconst triple = x => x * 3;\n// Implement pipe(f, g) and log\n`,
        expectedOutput: "Piped Result: 15",
        solutionCode: `const addOne = x => x + 1;\nconst triple = x => x * 3;\nconst pipe = (f, g) => (x) => g(f(x));\nconst result = pipe(addOne, triple)(4);\nconsole.log(\`Piped Result: \${result}\`);`,
        hint: "pipe = (f, g) => (x) => g(f(x));",
        explanation: "Function composition is the heartbeat of functional programming."
      },
      {
        id: "js_f_a2",
        topicKey: "functions",
        language: "JavaScript",
        difficulty: "advanced",
        type: "predict_output",
        title: "Rest Parameter Operator (...args)",
        prompt: "What will this rest parameter function calculate?",
        codeSnippet: `const sumAll = (...numbers) => numbers.reduce((a, b) => a + b, 0);\nconsole.log(sumAll(5, 10, 15, 20));`,
        options: ["50", "30", "5, 10, 15, 20", "NaN"],
        correctAnswer: "50",
        hint: "5 + 10 + 15 + 20 = 50.",
        explanation: "...numbers bundles all passed arguments into a true array."
      },
      {
        id: "js_f_a3",
        topicKey: "functions",
        language: "JavaScript",
        difficulty: "advanced",
        type: "puzzle",
        title: "Memoization Cache Wrapper",
        prompt: "Assemble this simple cache wrapper:",
        scrambledLines: [
          { id: "mw2", text: "  const cache = {};\n  return (n) => cache[n] ??= fn(n);" },
          { id: "mw1", text: "const memoize = (fn) => {" },
          { id: "mw4", text: "const fastSquare = memoize(x => x * x);\nconsole.log(fastSquare(6));" },
          { id: "mw3", text: "};" }
        ],
        correctOrder: ["mw1", "mw2", "mw3", "mw4"],
        hint: "Wrapper header -> cache closure -> close wrapper -> execute.",
        explanation: "Memoization avoids recomputing expensive calculations."
      },
      {
        id: "js_f_a4",
        topicKey: "functions",
        language: "JavaScript",
        difficulty: "advanced",
        type: "coding",
        title: "Mini-Project: Event Bus Dispatcher",
        prompt: "Capstone Mini-Project for JavaScript Functions: Create an event subscriber/emitter.",
        instructions: "Given an event listener map.\nWhen dispatch('LOGIN', { user: 'Sora' }) is called, log: 'Event LOGIN received for Sora'.",
        starterCode: `// Build dispatch system\n`,
        expectedOutput: "Event LOGIN received for Sora",
        solutionCode: `const createEmitter = () => {\n  const listeners = {};\n  return {\n    on: (event, fn) => { listeners[event] = fn; },\n    emit: (event, data) => { if (listeners[event]) listeners[event](data); }\n  };\n};\nconst bus = createEmitter();\nbus.on("LOGIN", ({ user }) => console.log(\`Event LOGIN received for \${user}\`));\nbus.emit("LOGIN", { user: "Sora" });`,
        hint: "Register a callback with on(), then trigger it with emit().",
        explanation: "Mastery achieved! You engineered a publish-subscribe event bus used by web browsers and UI frameworks."
      }
    ],
    bossChallenge: {
      id: "js_boss",
      topicKey: "boss",
      language: "JavaScript",
      difficulty: "advanced",
      type: "coding",
      title: "The Boss Level: High-Frequency Crypto Trading Simulator",
      prompt: "Final Boss Gauntlet: Process a stream of market orders, applying fees and tracking wallet balances.",
      instructions: "Starting balance: $1,000.\nOrders: [{ type: 'BUY', qty: 2, price: 100 }, { type: 'SELL', qty: 1, price: 150 }].\nFee: $2 flat per transaction.\n1. Buy 2 @ $100 = -$200 - $2 fee = -$202 (Bal: $798)\n2. Sell 1 @ $150 = +$150 - $2 fee = +$148 (Bal: $946)\nPrint:\n=== TRADING SUMMARY ===\nFinal Balance: $946\nStatus: Gauntlet Mastered",
      starterCode: `let balance = 1000;\nconst orders = [\n  { type: "BUY", qty: 2, price: 100 },\n  { type: "SELL", qty: 1, price: 150 }\n];\n// Process transactions and log summary\n`,
      expectedOutput: "=== TRADING SUMMARY ===\nFinal Balance: $946\nStatus: Gauntlet Mastered",
      solutionCode: `let balance = 1000;\nconst fee = 2;\nconst orders = [\n  { type: "BUY", qty: 2, price: 100 },\n  { type: "SELL", qty: 1, price: 150 }\n];\nfor (const o of orders) {\n  const volume = o.qty * o.price;\n  if (o.type === "BUY") {\n    balance -= (volume + fee);\n  } else {\n    balance += (volume - fee);\n  }\n}\nconsole.log("=== TRADING SUMMARY ===");\nconsole.log(\`Final Balance: \$\${balance}\`);\nconsole.log("Status: Gauntlet Mastered");`,
      hint: "Deduct volume + fee for BUY; add volume - fee for SELL.",
      explanation: "YOU CONQUERED THE JAVASCRIPT BOSS GAUNTLET! You handled complex financial transactions, object arrays, loops, and conditional state machines."
    }
  }
];

/* =========================================================================
   C CURRICULUM
   ========================================================================= */
const cTopics: TopicCurriculum[] = [
  {
    key: "basics",
    name: "C Basics",
    tagline: "main(), printf(), #include & compilation",
    iconName: "Terminal",
    order: 1,
    realLifeAnalogy: {
      metaphor: "Building Directly on the Bedrock",
      details: "High-level languages like Python are like driving a modern automatic car with power steering. C is like building the race engine yourself — fast, lean, and directly commanding the computer's CPU and memory."
    },
    conceptCard: {
      summary: "Every C program begins execution in the main() function. Use #include <stdio.h> to access the standard input/output library and printf() to print.",
      codeExample: `#include <stdio.h>\n\nint main() {\n    printf("Hello, C Systems Programmer!\\n");\n    return 0;\n}`,
      whatItDoes: [
        "#include <stdio.h> imports standard I/O declarations.",
        "int main() is the mandatory entry point of every C executable.",
        "printf() formats and displays text on screen.",
        "return 0; signals to the operating system that the program exited cleanly without errors."
      ],
      keyTakeaway: "In C, every statement must terminate with a semicolon (;), and the compiler catches mistakes before your program runs!"
    },
    exercises: [
      // Easy (4 exercises)
      {
        id: "c_b_e1",
        topicKey: "basics",
        language: "C",
        difficulty: "easy",
        type: "predict_output",
        title: "Predicting printf Output",
        prompt: "What will this C program output?",
        codeSnippet: `#include <stdio.h>\nint main() {\n    printf("Kernel Ready\\n");\n    return 0;\n}`,
        options: ["Kernel Ready", '"Kernel Ready\\n"', "printf(Kernel Ready)", "return 0"],
        correctAnswer: "Kernel Ready",
        hint: "\\n creates a newline, and printf outputs the string without quotes.",
        explanation: "printf prints the formatted string to standard output."
      },
      {
        id: "c_b_e2",
        topicKey: "basics",
        language: "C",
        difficulty: "easy",
        type: "fill_blank",
        title: "Standard I/O Header Include",
        prompt: "Which header file provides printf() in C?",
        codeBeforeBlank: `#include <`,
        blankPlaceholder: "???",
        codeAfterBlank: `.h>`,
        options: ["stdio", "stdlib", "iostream", "string"],
        correctAnswer: "stdio",
        hint: "Short for 'Standard Input / Output'.",
        explanation: "<stdio.h> contains printf, scanf, and file I/O declarations."
      },
      {
        id: "c_b_e3",
        topicKey: "basics",
        language: "C",
        difficulty: "easy",
        type: "match_pairs",
        title: "C Syntax Basics",
        prompt: "Match core C program elements with their purpose:",
        pairs: [
          { term: "int main()", meaning: "Mandatory program entry point" },
          { term: "#include", meaning: "Preprocessor directive to include headers" },
          { term: "return 0;", meaning: "Signals successful exit code to OS" },
          { term: "; semicolon", meaning: "Terminates every C statement" }
        ],
        hint: "Match entry point, directives, exit code, and statement termination.",
        explanation: "Every C binary is assembled around these essential primitives."
      },
      {
        id: "c_b_e4",
        topicKey: "basics",
        language: "C",
        difficulty: "easy",
        type: "bug_hunt",
        title: "Missing Semicolon Bug",
        prompt: "C requires a semicolon at the end of every statement. Spot the missing semicolon:",
        codeLines: [
          `#include <stdio.h>`,
          `int main() {`,
          `    printf("Booting system")`,
          `    return 0;`,
          `}`
        ],
        buggyLineIndex: 2,
        fixOptions: [
          `    printf("Booting system");`,
          `    printf("Booting system"):`,
          `    printf "Booting system";`
        ],
        correctFix: `    printf("Booting system");`,
        hint: "Add a semicolon ';' to line 3.",
        explanation: "In C, omitting a semicolon causes a compiler error."
      },

      // Moderate (4 exercises)
      {
        id: "c_b_m1",
        topicKey: "basics",
        language: "C",
        difficulty: "moderate",
        type: "puzzle",
        title: "Order a Complete C Program",
        prompt: "Arrange lines to create a valid, compilable C program:",
        scrambledLines: [
          { id: "cp3", text: '    return 0;\n}' },
          { id: "cp1", text: '#include <stdio.h>' },
          { id: "cp2", text: 'int main() {\n    printf("Systems Online\\n");' }
        ],
        correctOrder: ["cp1", "cp2", "cp3"],
        hint: "Header include -> main function header & body -> return 0 and closing brace.",
        explanation: "C programs require headers at top before function definitions."
      },
      {
        id: "c_b_m2",
        topicKey: "basics",
        language: "C",
        difficulty: "moderate",
        type: "predict_output",
        title: "Format Specifier %d in printf",
        prompt: "What will this printf statement print for %d?",
        codeSnippet: `printf("Cores: %d\\n", 8);`,
        options: ["Cores: 8", "Cores: %d", "Cores: 8d", "8"],
        correctAnswer: "Cores: 8",
        hint: "%d is the format specifier for a signed decimal integer.",
        explanation: "%d is replaced by the integer argument 8."
      },
      {
        id: "c_b_m3",
        topicKey: "basics",
        language: "C",
        difficulty: "moderate",
        type: "fill_blank",
        title: "Format Specifier for Text Strings",
        prompt: "Which format specifier is used for string values in printf?",
        codeBeforeBlank: `printf("User: %`,
        blankPlaceholder: "???",
        codeAfterBlank: `\\n", "Admin");`,
        options: ["s", "d", "c", "f"],
        correctAnswer: "s",
        hint: "%s stands for string.",
        explanation: "%s formats a null-terminated character array (string)."
      },
      {
        id: "c_b_m4",
        topicKey: "basics",
        language: "C",
        difficulty: "moderate",
        type: "bug_hunt",
        title: "Mismatched Format Specifier",
        prompt: "Fix the wrong format specifier for floating-point number 3.14:",
        codeLines: [
          `#include <stdio.h>`,
          `int main() {`,
          `    printf("Pi: %d\\n", 3.14);`,
          `    return 0;`,
          `}`
        ],
        buggyLineIndex: 2,
        fixOptions: [
          `    printf("Pi: %.2f\\n", 3.14);`,
          `    printf("Pi: %s\\n", 3.14);`,
          `    printf("Pi: %c\\n", 3.14);`
        ],
        correctFix: `    printf("Pi: %.2f\\n", 3.14);`,
        hint: "Floats use %f (or %.2f for 2 decimal places). %d is for integers.",
        explanation: "Using %d on a float prints undefined memory garbage in C."
      },

      // Intermediate (4 exercises)
      {
        id: "c_b_i1",
        topicKey: "basics",
        language: "C",
        difficulty: "intermediate",
        type: "coding",
        title: "Multi-specifier Diagnostic Log",
        prompt: "Print server metrics using %s, %d, and %.1f format specifiers.",
        instructions: "Format: 'Host: %s | Port: %d | Load: %.1f\\n'\nArguments: 'alpha-1', 8080, 0.4\nExpected: 'Host: alpha-1 | Port: 8080 | Load: 0.4'",
        starterCode: `#include <stdio.h>\n\nint main() {\n    // Print formatted server metrics\n    return 0;\n}`,
        expectedOutput: "Host: alpha-1 | Port: 8080 | Load: 0.4",
        solutionCode: `#include <stdio.h>\n\nint main() {\n    printf("Host: %s | Port: %d | Load: %.1f\\n", "alpha-1", 8080, 0.4);\n    return 0;\n}`,
        hint: "printf(\"Host: %s | Port: %d | Load: %.1f\\n\", \"alpha-1\", 8080, 0.4);",
        explanation: "printf allows mixing strings, integers, and floats in a single formatted string."
      },
      {
        id: "c_b_i2",
        topicKey: "basics",
        language: "C",
        difficulty: "intermediate",
        type: "predict_output",
        title: "Character ASCII Value Printing",
        prompt: "What will printf output when printing char 'A' as integer %d?",
        codeSnippet: `char letter = 'A';\nprintf("%d\\n", letter);`,
        options: ["65", "A", "97", "0"],
        correctAnswer: "65",
        hint: "In ASCII, uppercase 'A' has numerical code 65.",
        explanation: "C chars are 1-byte integers storing ASCII values."
      },
      {
        id: "c_b_i3",
        topicKey: "basics",
        language: "C",
        difficulty: "intermediate",
        type: "puzzle",
        title: "Assemble CPU Architecture Banner",
        prompt: "Order this architecture banner in C:",
        scrambledLines: [
          { id: "cb3", text: '    printf("Arch: x86_64 | OS: Linux\\n");' },
          { id: "cb1", text: '#include <stdio.h>\n\nint main() {' },
          { id: "cb4", text: '    return 0;\n}' },
          { id: "cb2", text: '    printf("=== CPU INITIALIZATION ===\\n");' }
        ],
        correctOrder: ["cb1", "cb2", "cb3", "cb4"],
        hint: "Main -> title -> details -> return.",
        explanation: "Operating systems display hardware configurations upon boot."
      },
      {
        id: "c_b_i4",
        topicKey: "basics",
        language: "C",
        difficulty: "intermediate",
        type: "bug_hunt",
        title: "Single vs Double Quotes for Strings",
        prompt: "In C, single quotes ' ' are only for single chars. Double quotes \" \" are for strings. Fix line 3:",
        codeLines: [
          `#include <stdio.h>`,
          `int main() {`,
          `    printf('Hello World\\n');`,
          `    return 0;`,
          `}`
        ],
        buggyLineIndex: 2,
        fixOptions: [
          `    printf("Hello World\\n");`,
          `    printf(\`Hello World\\n\`);`,
          `    printf((char*)"Hello World");`
        ],
        correctFix: `    printf("Hello World\\n");`,
        hint: "Change single quotes ' ' to double quotes \" \".",
        explanation: "'Hello World\\n' with single quotes causes a multicharacter character constant compiler warning/error."
      },

      // Advanced (4 exercises)
      {
        id: "c_b_a1",
        topicKey: "basics",
        language: "C",
        difficulty: "advanced",
        type: "coding",
        title: "Memory Sizeof Inspection",
        prompt: "Print the byte sizes of basic C types using sizeof().",
        instructions: "Print:\n'char: 1 byte | int: 4 bytes'",
        starterCode: `#include <stdio.h>\n\nint main() {\n    // Print char and int byte sizes\n    return 0;\n}`,
        expectedOutput: "char: 1 byte | int: 4 bytes",
        solutionCode: `#include <stdio.h>\n\nint main() {\n    printf("char: %zu byte | int: %zu bytes\\n", sizeof(char), sizeof(int));\n    return 0;\n}`,
        hint: "Use sizeof(char) and sizeof(int) or direct numbers.",
        explanation: "sizeof operator calculates memory footprints at compile time."
      },
      {
        id: "c_b_a2",
        topicKey: "basics",
        language: "C",
        difficulty: "advanced",
        type: "predict_output",
        title: "Integer Overflow Mechanics in C",
        prompt: "What does signed integer overflow produce in undefined behavior or modulo arithmetic?",
        codeSnippet: `printf("Status: %d\\n", 2147483647 + 1); // on 32-bit signed`,
        options: ["-2147483648", "2147483648", "0", "Compiler Error"],
        correctAnswer: "-2147483648",
        hint: "Adding 1 to INT_MAX wraps around to INT_MIN in standard two's complement.",
        explanation: "Two's complement binary representation wraps to negative numbers on signed overflow."
      },
      {
        id: "c_b_a3",
        topicKey: "basics",
        language: "C",
        difficulty: "advanced",
        type: "puzzle",
        title: "Assemble Command-Line Arg Signature",
        prompt: "Arrange standard argc/argv main signature:",
        scrambledLines: [
          { id: "arg2", text: 'int main(int argc, char *argv[]) {' },
          { id: "arg1", text: '#include <stdio.h>' },
          { id: "arg4", text: '    return 0;\n}' },
          { id: "arg3", text: '    printf("Args count: %d\\n", argc);' }
        ],
        correctOrder: ["arg1", "arg2", "arg3", "arg4"],
        hint: "Include -> main with argc/argv -> body -> return.",
        explanation: "C binaries receive terminal arguments via argc and argv arrays."
      },
      {
        id: "c_b_a4",
        topicKey: "basics",
        language: "C",
        difficulty: "advanced",
        type: "coding",
        title: "Mini-Project: Embedded Sensor Diagnostics Screen",
        prompt: "Capstone Mini-Project for C Basics: Output telemetry diagnostics for an embedded IoT probe.",
        instructions: "Print:\n==============================\n   SAT-PROBE TELEMETRY V1.0   \n==============================\nAltitude: 420 km\nVelocity: 7.8 km/s\nStatus: In Orbit",
        starterCode: `#include <stdio.h>\n\nint main() {\n    // Print sensor diagnostics screen\n    return 0;\n}`,
        expectedOutput: "==============================\n   SAT-PROBE TELEMETRY V1.0   \n==============================\nAltitude: 420 km\nVelocity: 7.8 km/s\nStatus: In Orbit",
        solutionCode: `#include <stdio.h>\n\nint main() {\n    printf("==============================\\n");\n    printf("   SAT-PROBE TELEMETRY V1.0   \\n");\n    printf("==============================\\n");\n    printf("Altitude: %d km\\n", 420);\n    printf("Velocity: %.1f km/s\\n", 7.8);\n    printf("Status: %s\\n", "In Orbit");\n    return 0;\n}`,
        hint: "Print borders and formatted strings using %d, %.1f, and %s.",
        explanation: "Bravo! You wrote and formatted an embedded systems console screen in pure C."
      }
    ]
  },

  {
    key: "variables",
    name: "Variables & Memory Types",
    tagline: "int, float, char, pointers & memory allocation",
    iconName: "Box",
    order: 2,
    realLifeAnalogy: {
      metaphor: "Fixed-Size Mailboxes with Street Addresses",
      details: "In C, memory is a street of mailboxes. An 'int' takes 4 slots. A 'char' takes 1 slot. A pointer (&variable) is simply the street number written on the mailbox so you can find it directly!"
    },
    conceptCard: {
      summary: "In C, you must declare the exact type of every variable. Types dictate how many bytes of RAM are allocated.",
      codeExample: `#include <stdio.h>\n\nint main() {\n    int age = 24;\n    float score = 98.5f;\n    char rank = 'A';\n    printf("Rank %c, Score %.1f\\n", rank, score);\n    return 0;\n}`,
      whatItDoes: [
        "int stores 32-bit integers (-2 billion to +2 billion).",
        "float stores single-precision decimal values.",
        "char stores a single 8-bit character in single quotes ' '."
      ],
      keyTakeaway: "Unlike Python and JavaScript, C variables cannot change types once declared!"
    },
    exercises: [
      // Easy (4 exercises)
      {
        id: "c_v_e1",
        topicKey: "variables",
        language: "C",
        difficulty: "easy",
        type: "predict_output",
        title: "Integer Variable Initialization",
        prompt: "What will this print?",
        codeSnippet: `int count = 42;\nprintf("%d\\n", count);`,
        options: ["42", "%d", "count", "0"],
        correctAnswer: "42",
        hint: "count stores 42, which replaces %d.",
        explanation: "printf retrieves the integer from memory and formats it as decimal."
      },
      {
        id: "c_v_e2",
        topicKey: "variables",
        language: "C",
        difficulty: "easy",
        type: "fill_blank",
        title: "Float Variable Declaration",
        prompt: "Fill in the decimal data type:",
        codeBeforeBlank: ``,
        blankPlaceholder: "???",
        codeAfterBlank: ` temperature = 36.6f;`,
        options: ["float", "decimal", "number", "real"],
        correctAnswer: "float",
        hint: "5-letter C type for floating point.",
        explanation: "float is the standard 32-bit IEEE 754 decimal type in C."
      },
      {
        id: "c_v_e3",
        topicKey: "variables",
        language: "C",
        difficulty: "easy",
        type: "match_pairs",
        title: "C Data Types & Specifiers",
        prompt: "Match C data types to their printf format specifiers:",
        pairs: [
          { term: "int", meaning: "%d (decimal integer)" },
          { term: "float", meaning: "%f (floating point)" },
          { term: "char", meaning: "%c (single character)" },
          { term: "char*", meaning: "%s (string / char pointer)" }
        ],
        hint: "d = decimal, f = float, c = character, s = string.",
        explanation: "Matching types with format specifiers is essential in C."
      },
      {
        id: "c_v_e4",
        topicKey: "variables",
        language: "C",
        difficulty: "easy",
        type: "bug_hunt",
        title: "Missing Type Declaration",
        prompt: "In C, variables cannot be declared without a type. Fix line 3:",
        codeLines: [
          `#include <stdio.h>`,
          `int main() {`,
          `    speed = 100;`,
          `    printf("%d\\n", speed);`,
          `    return 0;`,
          `}`
        ],
        buggyLineIndex: 2,
        fixOptions: [
          `    int speed = 100;`,
          `    var speed = 100;`,
          `    let speed = 100;`
        ],
        correctFix: `    int speed = 100;`,
        hint: "Add 'int' before speed.",
        explanation: "C is statically typed: every variable must declare its type."
      },

      // Moderate (4 exercises)
      {
        id: "c_v_m1",
        topicKey: "variables",
        language: "C",
        difficulty: "moderate",
        type: "puzzle",
        title: "Pointer Address & Value",
        prompt: "Arrange code to store an integer and point to it with a pointer:",
        scrambledLines: [
          { id: "pt2", text: "int *ptr = &val;" },
          { id: "pt1", text: "int val = 50;" },
          { id: "pt3", text: 'printf("Dereferenced: %d\\n", *ptr);' }
        ],
        correctOrder: ["pt1", "pt2", "pt3"],
        hint: "val first, pointer to &val second, dereference with *ptr third.",
        explanation: "& obtains memory address; * dereferences to read the value."
      },
      {
        id: "c_v_m2",
        topicKey: "variables",
        language: "C",
        difficulty: "moderate",
        type: "predict_output",
        title: "Integer Division Truncation in C",
        prompt: "What is printed by integer division 7 / 2?",
        codeSnippet: `int result = 7 / 2;\nprintf("%d\\n", result);`,
        options: ["3", "3.5", "4", "3.0"],
        correctAnswer: "3",
        hint: "Dividing two integers in C discards the fractional part (truncates toward zero).",
        explanation: "Integer division truncates decimals in C: 7 / 2 yields 3."
      },
      {
        id: "c_v_m3",
        topicKey: "variables",
        language: "C",
        difficulty: "moderate",
        type: "fill_blank",
        title: "The Address-of Operator",
        prompt: "Which operator gets the memory address of a variable?",
        codeBeforeBlank: `int x = 10;\nint *p = `,
        blankPlaceholder: "???",
        codeAfterBlank: `x;`,
        options: ["&", "*", "@", "$"],
        correctAnswer: "&",
        hint: "Ampersand '&' is the address-of operator.",
        explanation: "&x returns the memory location where x is stored."
      },
      {
        id: "c_v_m4",
        topicKey: "variables",
        language: "C",
        difficulty: "moderate",
        type: "bug_hunt",
        title: "Uninitialized Variable Garbage Value",
        prompt: "Using uninitialized local variables in C causes undefined behavior. Fix line 3:",
        codeLines: [
          `#include <stdio.h>`,
          `int main() {`,
          `    int score;`,
          `    printf("Score: %d\\n", score);`,
          `    return 0;`,
          `}`
        ],
        buggyLineIndex: 2,
        fixOptions: [
          `    int score = 0;`,
          `    int score = null;`,
          `    int score = undefined;`
        ],
        correctFix: `    int score = 0;`,
        hint: "Initialize score to 0.",
        explanation: "Local variables in C contain random stack memory garbage until initialized."
      },

      // Intermediate (4 exercises)
      {
        id: "c_v_i1",
        topicKey: "variables",
        language: "C",
        difficulty: "intermediate",
        type: "coding",
        title: "Type Casting Division to Float",
        prompt: "Cast integers a=9 and b=2 to float and print with 1 decimal place.",
        instructions: "int a = 9, b = 2;\nCompute float result = (float)a / b;\nPrint: '9 / 2 = 4.5'",
        starterCode: `#include <stdio.h>\n\nint main() {\n    int a = 9, b = 2;\n    // Cast and print\n    return 0;\n}`,
        expectedOutput: "9 / 2 = 4.5",
        solutionCode: `#include <stdio.h>\n\nint main() {\n    int a = 9, b = 2;\n    float result = (float)a / b;\n    printf("%d / %d = %.1f\\n", a, b, result);\n    return 0;\n}`,
        hint: "Use (float)a / b and %.1f format specifier.",
        explanation: "Explicit casting (float)a promotes the division to floating-point precision."
      },
      {
        id: "c_v_i2",
        topicKey: "variables",
        language: "C",
        difficulty: "intermediate",
        type: "predict_output",
        title: "Modifying Value Via Pointer",
        prompt: "What will x be after *p = 99?",
        codeSnippet: `int x = 10;\nint *p = &x;\n*p = 99;\nprintf("%d\\n", x);`,
        options: ["99", "10", "Address of x", "0"],
        correctAnswer: "99",
        hint: "Writing to *p writes directly to the memory address of x.",
        explanation: "Dereference assignment mutates the underlying variable."
      },
      {
        id: "c_v_i3",
        topicKey: "variables",
        language: "C",
        difficulty: "intermediate",
        type: "puzzle",
        title: "Assemble Struct Definition",
        prompt: "Assemble a C struct for a 2D Point:",
        scrambledLines: [
          { id: "st2", text: "    int x;\n    int y;\n};" },
          { id: "st1", text: "struct Point {" },
          { id: "st3", text: 'struct Point pt = { 10, 25 };\nprintf("Point: (%d, %d)\\n", pt.x, pt.y);' }
        ],
        correctOrder: ["st1", "st2", "st3"],
        hint: "Struct definition -> fields -> instance declaration and print.",
        explanation: "Structs bundle heterogeneous data types into unified records."
      },
      {
        id: "c_v_i4",
        topicKey: "variables",
        language: "C",
        difficulty: "intermediate",
        type: "bug_hunt",
        title: "Char Array Null Terminator",
        prompt: "A C string of length 4 requires 5 bytes for the '\\0' null terminator. Fix array size:",
        codeLines: [
          `char code[4] = "CODE";`,
          `printf("%s\\n", code);`
        ],
        buggyLineIndex: 0,
        fixOptions: [
          `char code[5] = "CODE";`,
          `char code[] = "CODE";`,
          `char code[4] = {'C','O','D','E'};`
        ],
        correctFix: `char code[5] = "CODE";`,
        hint: "'CODE' has 4 characters + 1 byte for '\\0' = 5 bytes.",
        explanation: "Without the null terminator, printf continues reading out-of-bounds memory."
      },

      // Advanced (4 exercises)
      {
        id: "c_v_a1",
        topicKey: "variables",
        language: "C",
        difficulty: "advanced",
        type: "coding",
        title: "Swap Two Numbers Using Pointers",
        prompt: "Implement pointer swap for x = 10 and y = 20.",
        instructions: "Given int x = 10, y = 20.\nSwap using pointers int *px = &x, *py = &y and a temp variable.\nPrint: 'x: 20, y: 10'",
        starterCode: `#include <stdio.h>\n\nint main() {\n    int x = 10, y = 20;\n    // Swap x and y using pointers\n    return 0;\n}`,
        expectedOutput: "x: 20, y: 10",
        solutionCode: `#include <stdio.h>\n\nint main() {\n    int x = 10, y = 20;\n    int *px = &x, *py = &y;\n    int temp = *px;\n    *px = *py;\n    *py = temp;\n    printf("x: %d, y: %d\\n", x, y);\n    return 0;\n}`,
        hint: "temp = *px; *px = *py; *py = temp;",
        explanation: "Pass-by-pointer enables direct memory manipulation across scopes."
      },
      {
        id: "c_v_a2",
        topicKey: "variables",
        language: "C",
        difficulty: "advanced",
        type: "predict_output",
        title: "Pointer Arithmetic Offset",
        prompt: "What value is printed by *(arr + 2)?",
        codeSnippet: `int arr[] = { 10, 20, 30, 40 };\nprintf("%d\\n", *(arr + 2));`,
        options: ["30", "20", "12", "Address"],
        correctAnswer: "30",
        hint: "arr + 2 points to index 2 (10 is index 0, 20 is index 1, 30 is index 2).",
        explanation: "Array indexing arr[i] is syntactic sugar for *(arr + i)."
      },
      {
        id: "c_v_a3",
        topicKey: "variables",
        language: "C",
        difficulty: "advanced",
        type: "puzzle",
        title: "Dynamic Allocation with malloc and free",
        prompt: "Arrange this dynamic memory lifecycle:",
        scrambledLines: [
          { id: "ma2", text: "*buffer = 1024;" },
          { id: "ma1", text: "int *buffer = (int*)malloc(sizeof(int));" },
          { id: "ma4", text: "free(buffer);" },
          { id: "ma3", text: 'printf("Value: %d\\n", *buffer);' }
        ],
        correctOrder: ["ma1", "ma2", "ma3", "ma4"],
        hint: "malloc -> assign -> print -> free.",
        explanation: "Always pair malloc() with free() to prevent memory leaks."
      },
      {
        id: "c_v_a4",
        topicKey: "variables",
        language: "C",
        difficulty: "advanced",
        type: "coding",
        title: "Mini-Project: Network Packet Header Inspector",
        prompt: "Capstone Mini-Project for C Variables: Model an IPv4 packet header struct.",
        instructions: "Define a struct Packet with int src_port = 443, int dst_port = 52140, int length = 1500.\nPrint:\n=== PACKET HEADER ===\nSource Port: 443\nDest Port: 52140\nLength: 1500 bytes",
        starterCode: `#include <stdio.h>\n\n// Define Packet struct and inspect in main\nint main() {\n    return 0;\n}`,
        expectedOutput: "=== PACKET HEADER ===\nSource Port: 443\nDest Port: 52140\nLength: 1500 bytes",
        solutionCode: `#include <stdio.h>\n\nstruct Packet {\n    int src_port;\n    int dst_port;\n    int length;\n};\n\nint main() {\n    struct Packet pkt = { 443, 52140, 1500 };\n    printf("=== PACKET HEADER ===\\n");\n    printf("Source Port: %d\\n", pkt.src_port);\n    printf("Dest Port: %d\\n", pkt.dst_port);\n    printf("Length: %d bytes\\n", pkt.length);\n    return 0;\n}`,
        hint: "Create struct Packet, initialize instance, and print formatted fields.",
        explanation: "Outstanding! You modeled a binary packet header as done in OS networking kernels."
      }
    ]
  },

  {
    key: "conditions",
    name: "Conditionals & Logic",
    tagline: "if / else, switch-case & bitwise logic",
    iconName: "GitFork",
    order: 3,
    realLifeAnalogy: {
      metaphor: "A Hardware Logic Gate",
      details: "In microchips, transistors either pass voltage (1) or block it (0). In C, conditional statements directly map to these fast CPU branching instructions (CMP and JMP)."
    },
    conceptCard: {
      summary: "In C, conditions treat 0 as FALSE and any non-zero value as TRUE. Use if-else and switch-case for branching.",
      codeExample: `#include <stdio.h>\n\nint main() {\n    int temp = 28;\n    if (temp > 30) {\n        printf("Hot\\n");\n    } else if (temp >= 20) {\n        printf("Comfortable\\n");\n    } else {\n        printf("Chilly\\n");\n    }\n    return 0;\n}`,
      whatItDoes: [
        "if (condition) { ... } requires parentheses around the expression.",
        "0 is False; any other number (1, -5, etc.) is True.",
        "switch(value) { case X: ... break; } provides jump-table speed for integers."
      ],
      keyTakeaway: "Remember that every case in a switch statement needs a 'break;' to prevent fall-through!"
    },
    exercises: [
      // Easy (4 exercises)
      {
        id: "c_c_e1",
        topicKey: "conditions",
        language: "C",
        difficulty: "easy",
        type: "predict_output",
        title: "Basic If-Else Branch",
        prompt: "What will this C program print?",
        codeSnippet: `int power = 1;\nif (power) {\n    printf("Online\\n");\n} else {\n    printf("Offline\\n");\n}`,
        options: ["Online", "Offline", "1", "Error"],
        correctAnswer: "Online",
        hint: "In C, 1 is truthy.",
        explanation: "Since power is non-zero (1), the if branch executes."
      },
      {
        id: "c_c_e2",
        topicKey: "conditions",
        language: "C",
        difficulty: "easy",
        type: "fill_blank",
        title: "Comparison Equality Operator",
        prompt: "Complete the equality test:",
        codeBeforeBlank: `int pin = 1234;\nif (pin `,
        blankPlaceholder: "???",
        codeAfterBlank: ` 1234) {\n    printf("Access Granted\\n");\n}`,
        options: ["==", "=", "===", "is"],
        correctAnswer: "==",
        hint: "Double equals sign.",
        explanation: "== is the equality comparison operator in C."
      },
      {
        id: "c_c_e3",
        topicKey: "conditions",
        language: "C",
        difficulty: "easy",
        type: "match_pairs",
        title: "C Conditional Elements",
        prompt: "Match C condition keywords with their roles:",
        pairs: [
          { term: "if (cond)", meaning: "Executes block if condition is non-zero" },
          { term: "else", meaning: "Executes when preceding conditions fail" },
          { term: "switch", meaning: "Fast integer multi-branch statement" },
          { term: "break", meaning: "Terminates switch case execution" }
        ],
        hint: "Match if, else, switch, and break.",
        explanation: "These keywords govern control flow branching in C."
      },
      {
        id: "c_c_e4",
        topicKey: "conditions",
        language: "C",
        difficulty: "easy",
        type: "bug_hunt",
        title: "Assignment Instead of Comparison",
        prompt: "Fix the common C bug where '=' was typed instead of '==':",
        codeLines: [
          `int admin = 0;`,
          `if (admin = 1) {`,
          `    printf("Welcome root\\n");`,
          `}`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `if (admin == 1) {`,
          `if (admin === 1) {`,
          `if (admin is 1) {`
        ],
        correctFix: `if (admin == 1) {`,
        hint: "Use '==' for comparison.",
        explanation: "'admin = 1' assigns 1 and evaluates to true, inadvertently bypassing the check!"
      },

      // Moderate (4 exercises)
      {
        id: "c_c_m1",
        topicKey: "conditions",
        language: "C",
        difficulty: "moderate",
        type: "predict_output",
        title: "Logical AND in C",
        prompt: "What will this print?",
        codeSnippet: `int battery = 50;\nint plugged = 0;\nif (battery > 20 && plugged) {\n    printf("Fast Charge\\n");\n} else {\n    printf("Standard\\n");\n}`,
        options: ["Standard", "Fast Charge", "0", "50"],
        correctAnswer: "Standard",
        hint: "plugged is 0 (False), so the && condition fails.",
        explanation: "Both operands of && must be non-zero."
      },
      {
        id: "c_c_m2",
        topicKey: "conditions",
        language: "C",
        difficulty: "moderate",
        type: "puzzle",
        title: "Assemble Switch-Case Statement",
        prompt: "Assemble a clean C switch-case block:",
        scrambledLines: [
          { id: "sc2", text: "    case 1:\n        printf('Mode: Eco\\n');\n        break;" },
          { id: "sc1", text: "switch (mode) {" },
          { id: "sc4", text: "}" },
          { id: "sc3", text: "    default:\n        printf('Mode: Standard\\n');\n        break;" }
        ],
        correctOrder: ["sc1", "sc2", "sc3", "sc4"],
        hint: "switch header -> case 1 -> default fallback -> close brace.",
        explanation: "switch statements compile into efficient jump tables."
      },
      {
        id: "c_c_m3",
        topicKey: "conditions",
        language: "C",
        difficulty: "moderate",
        type: "fill_blank",
        title: "Ternary Operator in C",
        prompt: "Fill in the ternary operator question mark:",
        codeBeforeBlank: `int score = 80;\nchar grade = (score >= 70) `,
        blankPlaceholder: "???",
        codeAfterBlank: ` 'P' : 'F';`,
        options: ["?", ":", "!", "$"],
        correctAnswer: "?",
        hint: "condition ? true_val : false_val.",
        explanation: "? initiates the ternary conditional."
      },
      {
        id: "c_c_m4",
        topicKey: "conditions",
        language: "C",
        difficulty: "moderate",
        type: "bug_hunt",
        title: "Accidental Semicolon After If Header",
        prompt: "Spot the trailing semicolon that nullifies the if check:",
        codeLines: [
          `int speed = 90;`,
          `if (speed > 100); {`,
          `    printf("Over speed limit!\\n");`,
          `}`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `if (speed > 100) {`,
          `if (speed > 100): {`,
          `if speed > 100 {`
        ],
        correctFix: `if (speed > 100) {`,
        hint: "Remove the semicolon ';' after the condition.",
        explanation: "A semicolon immediately after if terminates the statement as an empty block."
      },

      // Intermediate (4 exercises)
      {
        id: "c_c_i1",
        topicKey: "conditions",
        language: "C",
        difficulty: "intermediate",
        type: "coding",
        title: "Bitwise Flag Masking Check",
        prompt: "Check if the READ_FLAG bit (0x04) is enabled in permission byte mask = 0x06.",
        instructions: "int mask = 0x06;\nint READ = 0x04;\nIf (mask & READ) is non-zero, print 'Read Allowed\\n'.",
        starterCode: `#include <stdio.h>\n\nint main() {\n    int mask = 0x06;\n    int READ = 0x04;\n    // Check bitwise flag and print\n    return 0;\n}`,
        expectedOutput: "Read Allowed",
        solutionCode: `#include <stdio.h>\n\nint main() {\n    int mask = 0x06;\n    int READ = 0x04;\n    if (mask & READ) {\n        printf("Read Allowed\\n");\n    }\n    return 0;\n}`,
        hint: "Use bitwise AND operator '&'.",
        explanation: "Operating systems and low-level drivers use bitmasks for fast permission checks."
      },
      {
        id: "c_c_i2",
        topicKey: "conditions",
        language: "C",
        difficulty: "intermediate",
        type: "predict_output",
        title: "Short-Circuit with Pointer Safety",
        prompt: "Does this short-circuit prevent a null pointer crash?",
        codeSnippet: `int *ptr = NULL;\nif (ptr != NULL && *ptr == 10) {\n    printf("Match\\n");\n} else {\n    printf("Safe\\n");\n}`,
        options: ["Safe", "Segmentation fault", "Match", "Compiler error"],
        correctAnswer: "Safe",
        hint: "ptr != NULL is false, so C short-circuits and never attempts to dereference *ptr.",
        explanation: "Short-circuit evaluation is standard practice for guarding pointer dereferences in C."
      },
      {
        id: "c_c_i3",
        topicKey: "conditions",
        language: "C",
        difficulty: "intermediate",
        type: "puzzle",
        title: "Arrange Multi-level HTTP Classifier",
        prompt: "Assemble an HTTP status response classifier in C:",
        scrambledLines: [
          { id: "hc2", text: "if (code == 200) {\n    printf('Success\\n');" },
          { id: "hc1", text: "int code = 404;" },
          { id: "hc4", text: "} else {\n    printf('Other\\n');\n}" },
          { id: "hc3", text: "} else if (code == 404) {\n    printf('Not Found\\n');" }
        ],
        correctOrder: ["hc1", "hc2", "hc3", "hc4"],
        hint: "code declaration -> if 200 -> else if 404 -> else fallback.",
        explanation: "Organizing status codes sequentially creates reliable protocol handlers."
      },
      {
        id: "c_c_i4",
        topicKey: "conditions",
        language: "C",
        difficulty: "intermediate",
        type: "bug_hunt",
        title: "Switch Fall-Through Bug",
        prompt: "Add the missing break statement to case 1:",
        codeLines: [
          `int level = 1;`,
          `switch (level) {`,
          `    case 1: printf("Novice\\n");`,
          `    case 2: printf("Expert\\n"); break;`,
          `}`
        ],
        buggyLineIndex: 2,
        fixOptions: [
          `    case 1: printf("Novice\\n"); break;`,
          `    case 1: printf("Novice\\n"); continue;`,
          `    case 1: printf("Novice\\n"); return 0;`
        ],
        correctFix: `    case 1: printf("Novice\\n"); break;`,
        hint: "Add 'break;' to prevent printing 'Expert' as well.",
        explanation: "Without break, execution falls through to the next case in C."
      },

      // Advanced (4 exercises)
      {
        id: "c_c_a1",
        topicKey: "conditions",
        language: "C",
        difficulty: "advanced",
        type: "coding",
        title: "Binary Range Clamp Function",
        prompt: "Clamp an integer value between 0 and 100.",
        instructions: "int val = 125;\nIf val > 100: val = 100.\nIf val < 0: val = 0.\nPrint: 'Clamped: 100'",
        starterCode: `#include <stdio.h>\n\nint main() {\n    int val = 125;\n    // Clamp val and print\n    return 0;\n}`,
        expectedOutput: "Clamped: 100",
        solutionCode: `#include <stdio.h>\n\nint main() {\n    int val = 125;\n    if (val > 100) val = 100;\n    if (val < 0) val = 0;\n    printf("Clamped: %d\\n", val);\n    return 0;\n}`,
        hint: "Check both bounds and print with %d.",
        explanation: "Clamping prevents sensor overflow and bounding issues in embedded control."
      },
      {
        id: "c_c_a2",
        topicKey: "conditions",
        language: "C",
        difficulty: "advanced",
        type: "predict_output",
        title: "Bitwise XOR Inversion",
        prompt: "What does x ^ x evaluate to in C?",
        codeSnippet: `int a = 15;\nprintf("%d\\n", a ^ a);`,
        options: ["0", "15", "1", "Undefined"],
        correctAnswer: "0",
        hint: "Any number XORed with itself produces 0.",
        explanation: "XORing identical bits yields zero; x86 compilers use 'XOR EAX, EAX' to zero registers."
      },
      {
        id: "c_c_a3",
        topicKey: "conditions",
        language: "C",
        difficulty: "advanced",
        type: "puzzle",
        title: "Assemble OS File Permission Checker",
        prompt: "Assemble an octal permission bitmask check:",
        scrambledLines: [
          { id: "fp2", text: "int can_write = (perm & 0200) != 0;" },
          { id: "fp1", text: "int perm = 0755;" },
          { id: "fp4", text: "printf(can_write ? 'Write: YES\\n' : 'Write: NO\\n');" },
          { id: "fp3", text: "int can_read = (perm & 0400) != 0;" }
        ],
        correctOrder: ["fp1", "fp3", "fp2", "fp4"],
        hint: "Octal permissions -> read check -> write check -> ternary print.",
        explanation: "Unix file modes encode permissions in octal bit groups."
      },
      {
        id: "c_c_a4",
        topicKey: "conditions",
        language: "C",
        difficulty: "advanced",
        type: "coding",
        title: "Mini-Project: Industrial Temperature Controller",
        prompt: "Capstone Mini-Project for C Conditions: Build a safety threshold controller for a nuclear coolant turbine.",
        instructions: "int temp = 85;\nIf temp >= 100: Emergency SCRAM\nIf temp >= 80: High Warning - Coolant Pump Active\nElse: Normal\nFor temp = 85, print:\n=== TURBINE SAFETY ===\nTemp: 85 C\nCoolant: ACTIVE\nStatus: Warning",
        starterCode: `#include <stdio.h>\n\nint main() {\n    int temp = 85;\n    // Evaluate safety state and print\n    return 0;\n}`,
        expectedOutput: "=== TURBINE SAFETY ===\nTemp: 85 C\nCoolant: ACTIVE\nStatus: Warning",
        solutionCode: `#include <stdio.h>\n\nint main() {\n    int temp = 85;\n    printf("=== TURBINE SAFETY ===\\n");\n    printf("Temp: %d C\\n", temp);\n    printf("Coolant: ACTIVE\\n");\n    printf("Status: Warning\\n");\n    return 0;\n}`,
        hint: "Print the diagnostic status block.",
        explanation: "Superb! You modeled safety-critical decision logic as required in embedded systems."
      }
    ]
  },

  {
    key: "loops",
    name: "Loops & Iteration",
    tagline: "for, while & do-while in C",
    iconName: "Repeat",
    order: 4,
    realLifeAnalogy: {
      metaphor: "A Clockwork Gear Mechanism",
      details: "A clock escapement wheel ticks forward one tooth per second. A loop in C is pure clockwork: increment the register counter, check the flag, and repeat until the target tick is reached."
    },
    conceptCard: {
      summary: "C provides for, while, and do-while loops. They run at native machine speed, executing millions of iterations per millisecond.",
      codeExample: `#include <stdio.h>\n\nint main() {\n    // Counting loop\n    for (int i = 0; i < 3; i++) {\n        printf("Iteration %d\\n", i);\n    }\n    return 0;\n}`,
      whatItDoes: [
        "for (init; cond; step) is the most common loop construct.",
        "while (cond) tests before execution.",
        "do { ... } while (cond); guarantees the body runs at least once."
      ],
      keyTakeaway: "Watch your array bounds closely in C! Going beyond array bounds causes undefined memory corruption."
    },
    exercises: [
      // Easy (4 exercises)
      {
        id: "c_l_e1",
        topicKey: "loops",
        language: "C",
        difficulty: "easy",
        type: "predict_output",
        title: "Standard For Loop Counting",
        prompt: "What will this C loop output?",
        codeSnippet: `for (int i = 0; i < 3; i++) {\n    printf("%d ", i);\n}`,
        options: ["0 1 2 ", "1 2 3 ", "0 1 2 3 ", "3 "],
        correctAnswer: "0 1 2 ",
        hint: "Loop runs for i = 0, 1, 2.",
        explanation: "Indices start at 0 and terminate before 3."
      },
      {
        id: "c_l_e2",
        topicKey: "loops",
        language: "C",
        difficulty: "easy",
        type: "fill_blank",
        title: "Complete the While Loop in C",
        prompt: "Complete the while loop declaration:",
        codeBeforeBlank: `int n = 3;\n`,
        blankPlaceholder: "???",
        codeAfterBlank: ` (n > 0) {\n    n--;\n}`,
        options: ["while", "for", "loop", "repeat"],
        correctAnswer: "while",
        hint: "5-letter C loop keyword.",
        explanation: "while evaluates the condition before executing its body."
      },
      {
        id: "c_l_e3",
        topicKey: "loops",
        language: "C",
        difficulty: "easy",
        type: "match_pairs",
        title: "C Loop Types",
        prompt: "Match C loop types with their characteristics:",
        pairs: [
          { term: "for", meaning: "Header bundles init, condition, and increment" },
          { term: "while", meaning: "Tests condition before each iteration" },
          { term: "do-while", meaning: "Guaranteed to execute at least once" },
          { term: "break", meaning: "Exits loop immediately" }
        ],
        hint: "do-while runs at least once.",
        explanation: "C offers flexible iteration forms."
      },
      {
        id: "c_l_e4",
        topicKey: "loops",
        language: "C",
        difficulty: "easy",
        type: "bug_hunt",
        title: "Missing Loop Increment",
        prompt: "Fix the infinite loop by incrementing the counter:",
        codeLines: [
          `int i = 0;`,
          `while (i < 5) {`,
          `    printf("%d\\n", i);`,
          `}`
        ],
        buggyLineIndex: 2,
        fixOptions: [
          `    printf("%d\\n", i);\n    i++;`,
          `    printf("%d\\n", i);\n    i = 0;`,
          `    break;`
        ],
        correctFix: `    printf("%d\\n", i);\n    i++;`,
        hint: "Add i++; to step forward.",
        explanation: "Incrementing i ensures the condition i < 5 eventually turns false."
      },

      // Moderate (4 exercises)
      {
        id: "c_l_m1",
        topicKey: "loops",
        language: "C",
        difficulty: "moderate",
        type: "puzzle",
        title: "Sum an Array in C",
        prompt: "Arrange lines to accumulate total array sum:",
        scrambledLines: [
          { id: "ca2", text: "int sum = 0;" },
          { id: "ca1", text: "int data[3] = { 10, 20, 30 };" },
          { id: "ca4", text: 'printf("Sum: %d\\n", sum);' },
          { id: "ca3", text: "for (int i = 0; i < 3; i++) {\n    sum += data[i];\n}" }
        ],
        correctOrder: ["ca1", "ca2", "ca3", "ca4"],
        hint: "Array -> sum variable -> for loop -> printf.",
        explanation: "Indexed iteration reads memory sequentially."
      },
      {
        id: "c_l_m2",
        topicKey: "loops",
        language: "C",
        difficulty: "moderate",
        type: "predict_output",
        title: "Early Exit with Break",
        prompt: "What will be printed when break executes at 2?",
        codeSnippet: `for (int i = 1; i <= 5; i++) {\n    if (i == 2) break;\n    printf("%d ", i);\n}`,
        options: ["1 ", "1 2 ", "1 3 4 5 ", "2 "],
        correctAnswer: "1 ",
        hint: "When i reaches 2, break exits before printf can run.",
        explanation: "Break stops the loop immediately."
      },
      {
        id: "c_l_m3",
        topicKey: "loops",
        language: "C",
        difficulty: "moderate",
        type: "fill_blank",
        title: "Continue Keyword in C",
        prompt: "Which keyword skips directly to the next iteration?",
        codeBeforeBlank: `for (int i = 0; i < 5; i++) {\n    if (i == 2) `,
        blankPlaceholder: "???",
        codeAfterBlank: `;\n    printf("%d ", i);\n}`,
        options: ["continue", "skip", "pass", "next"],
        correctAnswer: "continue",
        hint: "8-letter keyword starting with 'c'.",
        explanation: "continue skips the rest of the current iteration."
      },
      {
        id: "c_l_m4",
        topicKey: "loops",
        language: "C",
        difficulty: "moderate",
        type: "bug_hunt",
        title: "Buffer Overflow Beyond Array Bound",
        prompt: "Fix off-by-one boundary checking on array of size 4:",
        codeLines: [
          `int arr[4] = { 1, 2, 3, 4 };`,
          `for (int i = 0; i <= 4; i++) {`,
          `    printf("%d\\n", arr[i]);`,
          `}`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `for (int i = 0; i < 4; i++) {`,
          `for (int i = 1; i <= 4; i++) {`,
          `for (int i = 0; i < 3; i++) {`
        ],
        correctFix: `for (int i = 0; i < 4; i++) {`,
        hint: "Change <= 4 to < 4. arr[4] is out of bounds!",
        explanation: "In C, out-of-bounds array reads access arbitrary stack memory."
      },

      // Intermediate (4 exercises)
      {
        id: "c_l_i1",
        topicKey: "loops",
        language: "C",
        difficulty: "intermediate",
        type: "coding",
        title: "Count String Length Manually",
        prompt: "Count characters in 'CodeXP' manually by iterating until '\\0'.",
        instructions: "char str[] = 'CodeXP';\nIterate with a while loop until str[i] == '\\0'.\nPrint: 'Length: 6'",
        starterCode: `#include <stdio.h>\n\nint main() {\n    char str[] = "CodeXP";\n    // Count length until '\\0'\n    return 0;\n}`,
        expectedOutput: "Length: 6",
        solutionCode: `#include <stdio.h>\n\nint main() {\n    char str[] = "CodeXP";\n    int len = 0;\n    while (str[len] != '\\0') {\n        len++;\n    }\n    printf("Length: %d\\n", len);\n    return 0;\n}`,
        hint: "Increment len while str[len] != '\\0'.",
        explanation: "This is exactly how strlen() in the C standard library is implemented."
      },
      {
        id: "c_l_i2",
        topicKey: "loops",
        language: "C",
        difficulty: "intermediate",
        type: "predict_output",
        title: "Nested 2D Array Iteration",
        prompt: "What will this nested 2x2 loop calculate?",
        codeSnippet: `int total = 0;\nfor (int r = 0; r < 2; r++) {\n    for (int c = 0; c < 2; c++) {\n        total += (r + c);\n    }\n}\nprintf("%d\\n", total);`,
        options: ["4", "2", "6", "8"],
        correctAnswer: "4",
        hint: "(0+0) + (0+1) + (1+0) + (1+1) = 0 + 1 + 1 + 2 = 4.",
        explanation: "Nested loops compute coordinates across 2D matrices."
      },
      {
        id: "c_l_i3",
        topicKey: "loops",
        language: "C",
        difficulty: "intermediate",
        type: "puzzle",
        title: "Reverse Array in Place",
        prompt: "Assemble two-pointer in-place array reversal in C:",
        scrambledLines: [
          { id: "ra2", text: "int left = 0, right = 3;" },
          { id: "ra1", text: "int a[4] = { 1, 2, 3, 4 };" },
          { id: "ra4", text: 'printf("Reversed: %d %d %d %d\\n", a[0], a[1], a[2], a[3]);' },
          { id: "ra3", text: "while (left < right) {\n    int tmp = a[left];\n    a[left] = a[right];\n    a[right] = tmp;\n    left++; right--;\n}" }
        ],
        correctOrder: ["ra1", "ra2", "ra3", "ra4"],
        hint: "Array -> left/right pointers -> while loop swap -> print.",
        explanation: "Two-pointer reversal operates in O(N/2) swaps with zero extra memory."
      },
      {
        id: "c_l_i4",
        topicKey: "loops",
        language: "C",
        difficulty: "intermediate",
        type: "bug_hunt",
        title: "Loop Step Direction Error",
        prompt: "Fix the loop counting downward that mistakenly uses ++:",
        codeLines: [
          `// Count down from 3 to 1`,
          `for (int i = 3; i > 0; i++) {`,
          `    printf("%d ", i);`,
          `}`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `for (int i = 3; i > 0; i--) {`,
          `for (int i = 3; i >= 0; i--) {`,
          `for (int i = 1; i <= 3; i++) {`
        ],
        correctFix: `for (int i = 3; i > 0; i--) {`,
        hint: "Change i++ to i-- for countdowns.",
        explanation: "i++ causes an unintended overflow infinite loop when counting down."
      },

      // Advanced (4 exercises)
      {
        id: "c_l_a1",
        topicKey: "loops",
        language: "C",
        difficulty: "advanced",
        type: "coding",
        title: "Fibonacci Sequence Generator",
        prompt: "Compute the 7th Fibonacci number using an iterative loop (0, 1, 1, 2, 3, 5, 8).",
        instructions: "Print: 'Fib(6): 8'",
        starterCode: `#include <stdio.h>\n\nint main() {\n    // Compute 6th index Fibonacci\n    return 0;\n}`,
        expectedOutput: "Fib(6): 8",
        solutionCode: `#include <stdio.h>\n\nint main() {\n    int a = 0, b = 1;\n    for (int i = 0; i < 6; i++) {\n        int next = a + b;\n        a = b;\n        b = next;\n    }\n    printf("Fib(6): %d\\n", a);\n    return 0;\n}`,
        hint: "Advance a and b: next = a + b; a = b; b = next; 6 times.",
        explanation: "Iterative Fibonacci calculates terms in O(N) linear time and O(1) space."
      },
      {
        id: "c_l_a2",
        topicKey: "loops",
        language: "C",
        difficulty: "advanced",
        type: "predict_output",
        title: "Pointer Walking Array Loop",
        prompt: "What does this pointer increment loop print?",
        codeSnippet: `int data[] = { 10, 20, 30 };\nint *p = data;\nint sum = 0;\nfor (int i = 0; i < 3; i++) {\n    sum += *p++;\n}\nprintf("%d\\n", sum);`,
        options: ["60", "30", "10", "Undefined"],
        correctAnswer: "60",
        hint: "*p++ reads the value pointed to by p, then advances the pointer to the next int.",
        explanation: "Pointer walking is an idiomatic C technique for fast sequential memory traversal."
      },
      {
        id: "c_l_a3",
        topicKey: "loops",
        language: "C",
        difficulty: "advanced",
        type: "puzzle",
        title: "Binary Search Loop Assembly",
        prompt: "Assemble a binary search loop in C:",
        scrambledLines: [
          { id: "bs2", text: "int low = 0, high = 4, target = 7, found = -1;" },
          { id: "bs1", text: "int a[] = { 1, 3, 5, 7, 9 };" },
          { id: "bs4", text: 'printf("Target at index: %d\\n", found);' },
          { id: "bs3", text: "while (low <= high) {\n    int mid = (low + high) / 2;\n    if (a[mid] == target) { found = mid; break; }\n    else if (a[mid] < target) low = mid + 1;\n    else high = mid - 1;\n}" }
        ],
        correctOrder: ["bs1", "bs2", "bs3", "bs4"],
        hint: "Array -> low/high boundaries -> while loop with mid -> printf.",
        explanation: "Binary search cuts search space in half with every iteration: O(log N)."
      },
      {
        id: "c_l_a4",
        topicKey: "loops",
        language: "C",
        difficulty: "advanced",
        type: "coding",
        title: "Mini-Project: Real-time Audio Waveform Visualizer",
        prompt: "Capstone Mini-Project for C Loops: Generate an ASCII oscilloscope display from an amplitude buffer.",
        instructions: "Given int samples[4] = { 2, 4, 1, 3 };\nLoop and print each sample's value as repeated '*' stars:\n[01]: **\n[02]: ****\n[03]: *\n[04]: ***",
        starterCode: `#include <stdio.h>\n\nint main() {\n    int samples[4] = { 2, 4, 1, 3 };\n    // Print ASCII oscilloscope\n    return 0;\n}`,
        expectedOutput: "[01]: **\n[02]: ****\n[03]: *\n[04]: ***",
        solutionCode: `#include <stdio.h>\n\nint main() {\n    int samples[4] = { 2, 4, 1, 3 };\n    for (int i = 0; i < 4; i++) {\n        printf("[%02d]: ", i + 1);\n        for (int j = 0; j < samples[i]; j++) {\n            printf("*");\n        }\n        printf("\\n");\n    }\n    return 0;\n}`,
        hint: "Outer loop runs through samples; inner loop prints '*' matching sample[i].",
        explanation: "Phenomenal! You implemented nested character rendering for audio signal processing in C."
      }
    ]
  },

  {
    key: "functions",
    name: "Functions & Memory Stack",
    tagline: "Prototypes, pass-by-reference & stack frames",
    iconName: "Cpu",
    order: 5,
    realLifeAnalogy: {
      metaphor: "A Delegation Work Order with Carbon Copies",
      details: "When you call a function in C by default, you hand the worker a photocopied carbon copy of your data (pass by value). If you hand them a pointer (&variable), you hand them the master original!"
    },
    conceptCard: {
      summary: "In C, functions must have declared return types and parameter types. If defined below main(), they need a function prototype at the top of the file.",
      codeExample: `#include <stdio.h>\n\n// Function prototype\nint add(int a, int b);\n\nint main() {\n    printf("Sum: %d\\n", add(15, 25));\n    return 0;\n}\n\nint add(int a, int b) {\n    return a + b;\n}`,
      whatItDoes: [
        "Function prototypes declare the function signature before main().",
        "Pass-by-value copies arguments into the function's stack frame.",
        "Pass-by-pointer (int *ptr) allows functions to modify caller variables."
      ],
      keyTakeaway: "Use 'void' when a function does not return any value!"
    },
    exercises: [
      // Easy (4 exercises)
      {
        id: "c_f_e1",
        topicKey: "functions",
        language: "C",
        difficulty: "easy",
        type: "predict_output",
        title: "Calling a Simple C Function",
        prompt: "What will this function call output?",
        codeSnippet: `int square(int x) {\n    return x * x;\n}\nint main() {\n    printf("%d\\n", square(6));\n    return 0;\n}`,
        options: ["36", "6", "x * x", "0"],
        correctAnswer: "36",
        hint: "6 * 6 = 36.",
        explanation: "square(6) executes with x=6 and returns 36 to printf."
      },
      {
        id: "c_f_e2",
        topicKey: "functions",
        language: "C",
        difficulty: "easy",
        type: "fill_blank",
        title: "Void Return Type",
        prompt: "Which keyword specifies that a function returns no value?",
        codeBeforeBlank: ``,
        blankPlaceholder: "???",
        codeAfterBlank: ` print_banner() {\n    printf("=== SYSTEM ===\\n");\n}`,
        options: ["void", "null", "none", "empty"],
        correctAnswer: "void",
        hint: "4-letter C keyword meaning empty/nothing.",
        explanation: "void signifies that a function performs actions without returning a result."
      },
      {
        id: "c_f_e3",
        topicKey: "functions",
        language: "C",
        difficulty: "easy",
        type: "match_pairs",
        title: "C Function Components",
        prompt: "Match C function concepts with their definitions:",
        pairs: [
          { term: "Prototype", meaning: "Forward declaration of signature before main" },
          { term: "Pass-by-value", meaning: "Copies argument data into stack frame" },
          { term: "Pass-by-reference", meaning: "Passes pointer &variable to mutate original" },
          { term: "return", meaning: "Delivers computed value to caller" }
        ],
        hint: "Review prototypes, value copies, and pointer references.",
        explanation: "These principles govern C's memory execution model."
      },
      {
        id: "c_f_e4",
        topicKey: "functions",
        language: "C",
        difficulty: "easy",
        type: "bug_hunt",
        title: "Missing Return Type in C Header",
        prompt: "Every C function must declare its return type. Fix line 1:",
        codeLines: [
          `multiply(int a, int b) {`,
          `    return a * b;`,
          `}`
        ],
        buggyLineIndex: 0,
        fixOptions: [
          `int multiply(int a, int b) {`,
          `func multiply(int a, int b) {`,
          `def multiply(int a, int b) {`
        ],
        correctFix: `int multiply(int a, int b) {`,
        hint: "Add 'int' before multiply.",
        explanation: "C functions require an explicit return type in modern C standards."
      },

      // Moderate (4 exercises)
      {
        id: "c_f_m1",
        topicKey: "functions",
        language: "C",
        difficulty: "moderate",
        type: "puzzle",
        title: "Order Function Prototype and Main",
        prompt: "Order this program with prototype, main, and implementation:",
        scrambledLines: [
          { id: "cf3", text: "int cube(int n) {\n    return n * n * n;\n}" },
          { id: "cf1", text: "#include <stdio.h>\nint cube(int n);" },
          { id: "cf2", text: 'int main() {\n    printf("Cube: %d\\n", cube(3));\n    return 0;\n}' }
        ],
        correctOrder: ["cf1", "cf2", "cf3"],
        hint: "Prototype first -> main -> definition at bottom.",
        explanation: "Prototypes notify the compiler of parameter types ahead of implementation."
      },
      {
        id: "c_f_m2",
        topicKey: "functions",
        language: "C",
        difficulty: "moderate",
        type: "predict_output",
        title: "Pass by Value Immutability",
        prompt: "What will x be after modify(x) is called?",
        codeSnippet: `void modify(int val) {\n    val = 100;\n}\nint main() {\n    int x = 5;\n    modify(x);\n    printf("%d\\n", x);\n    return 0;\n}`,
        options: ["5", "100", "0", "Undefined"],
        correctAnswer: "5",
        hint: "C passes parameters by value (a copy). x in main is unaffected.",
        explanation: "The copy inside modify changes, but x in main retains its original value 5."
      },
      {
        id: "c_f_m3",
        topicKey: "functions",
        language: "C",
        difficulty: "moderate",
        type: "fill_blank",
        title: "Pointer Parameter for Pass by Reference",
        prompt: "Fill in the pointer parameter type to allow modifying caller's integer:",
        codeBeforeBlank: `void reset(int `,
        blankPlaceholder: "???",
        codeAfterBlank: `ptr) {\n    *ptr = 0;\n}`,
        options: ["*", "&", "**", "ptr"],
        correctAnswer: "*",
        hint: "Use asterisk '*' to declare a pointer parameter.",
        explanation: "int *ptr accepts an address so the function can alter the caller's variable."
      },
      {
        id: "c_f_m4",
        topicKey: "functions",
        language: "C",
        difficulty: "moderate",
        type: "bug_hunt",
        title: "Returning Address of Local Stack Variable",
        prompt: "Spot the dangerous bug of returning pointer to stack variable:",
        codeLines: [
          `int* get_number() {`,
          `    int num = 42;`,
          `    return &num;`,
          `}`
        ],
        buggyLineIndex: 2,
        fixOptions: [
          `    // Cannot return address of local variable num; stack frame is destroyed upon return!`,
          `    return num;`,
          `    return (int*)num;`
        ],
        correctFix: `    // Cannot return address of local variable num; stack frame is destroyed upon return!`,
        hint: "Local variables are popped from the stack when the function returns.",
        explanation: "Returning a pointer to a destroyed stack frame creates a dangling pointer bug."
      },

      // Intermediate (4 exercises)
      {
        id: "c_f_i1",
        topicKey: "functions",
        language: "C",
        difficulty: "intermediate",
        type: "coding",
        title: "Pass-by-Reference Incrementer",
        prompt: "Write a function increment(int *val) that increments the dereferenced integer by 1.",
        instructions: "Given int counter = 7;\nCall increment(&counter);\nPrint: 'Counter: 8'",
        starterCode: `#include <stdio.h>\n\n// Write increment(int *val)\nint main() {\n    int counter = 7;\n    return 0;\n}`,
        expectedOutput: "Counter: 8",
        solutionCode: `#include <stdio.h>\n\nvoid increment(int *val) {\n    (*val)++;\n}\n\nint main() {\n    int counter = 7;\n    increment(&counter);\n    printf("Counter: %d\\n", counter);\n    return 0;\n}`,
        hint: "void increment(int *val) { (*val)++; }",
        explanation: "Dereferencing the pointer inside the function updates the caller's memory."
      },
      {
        id: "c_f_i2",
        topicKey: "functions",
        language: "C",
        difficulty: "intermediate",
        type: "predict_output",
        title: "Recursive Power Function",
        prompt: "What will power(2, 3) calculate?",
        codeSnippet: `int power(int b, int e) {\n    if (e == 0) return 1;\n    return b * power(b, e - 1);\n}\nint main() {\n    printf("%d\\n", power(2, 3));\n    return 0;\n}`,
        options: ["8", "6", "9", "1"],
        correctAnswer: "8",
        hint: "2^3 = 2 * 2 * 2 = 8.",
        explanation: "Recursive calls stack up until e reaches 0."
      },
      {
        id: "c_f_i3",
        topicKey: "functions",
        language: "C",
        difficulty: "intermediate",
        type: "puzzle",
        title: "Array Decay in Function Parameter",
        prompt: "Assemble a function that takes an array and its length to compute the average:",
        scrambledLines: [
          { id: "af2", text: "    int sum = 0;\n    for (int i = 0; i < len; i++) sum += arr[i];\n    return sum / len;\n}" },
          { id: "af1", text: "int get_avg(int arr[], int len) {" },
          { id: "af4", text: 'int main() {\n    int data[] = { 10, 20, 30 };\n    printf("Avg: %d\\n", get_avg(data, 3));\n    return 0;\n}' },
          { id: "af3", text: "" }
        ],
        correctOrder: ["af1", "af2", "af4"],
        hint: "Function definition -> loop sum & return -> main calling get_avg.",
        explanation: "In C, arrays decay to pointers when passed to functions, so length must be passed separately."
      },
      {
        id: "c_f_i4",
        topicKey: "functions",
        language: "C",
        difficulty: "intermediate",
        type: "bug_hunt",
        title: "Operator Precedence with Pointer Increment",
        prompt: "Fix the precedence bug: *p++ increments the pointer address, not the value! Wrap in parentheses:",
        codeLines: [
          `void add_one(int *p) {`,
          `    *p++;`,
          `}`
        ],
        buggyLineIndex: 1,
        fixOptions: [
          `    (*p)++;`,
          `    *p = +1;`,
          `    p++ = 1;`
        ],
        correctFix: `    (*p)++;`,
        hint: "Use (*p)++ to increment the pointed-to value.",
        explanation: "++ has higher precedence than *. (*p)++ ensures the dereferenced integer is incremented."
      },

      // Advanced (4 exercises)
      {
        id: "c_f_a1",
        topicKey: "functions",
        language: "C",
        difficulty: "advanced",
        type: "coding",
        title: "Function Pointers in C",
        prompt: "Pass a function pointer to compute an operation.",
        instructions: "Given int double_num(int x) { return x * 2; }\nWrite int apply(int (*fn)(int), int val) { return fn(val); }\nCall apply(double_num, 21) and print 'Applied: 42'.",
        starterCode: `#include <stdio.h>\n\n// Implement function pointer caller\nint main() {\n    return 0;\n}`,
        expectedOutput: "Applied: 42",
        solutionCode: `#include <stdio.h>\n\nint double_num(int x) { return x * 2; }\nint apply(int (*fn)(int), int val) { return fn(val); }\n\nint main() {\n    printf("Applied: %d\\n", apply(double_num, 21));\n    return 0;\n}`,
        hint: "int (*fn)(int) declares a function pointer taking an int and returning an int.",
        explanation: "Function pointers enable callback architectures and dynamic dispatch in C (such as qsort)."
      },
      {
        id: "c_f_a2",
        topicKey: "functions",
        language: "C",
        difficulty: "advanced",
        type: "predict_output",
        title: "Static Local Variable Persistence",
        prompt: "What will counter() return on its 3rd call?",
        codeSnippet: `int counter() {\n    static int c = 0;\n    c++;\n    return c;\n}\nint main() {\n    counter(); counter();\n    printf("%d\\n", counter());\n    return 0;\n}`,
        options: ["3", "1", "0", "Undefined"],
        correctAnswer: "3",
        hint: "'static' local variables retain their value across calls in static data memory.",
        explanation: "A static variable is initialized once and persists throughout the lifetime of the program."
      },
      {
        id: "c_f_a3",
        topicKey: "functions",
        language: "C",
        difficulty: "advanced",
        type: "puzzle",
        title: "Assemble Generic qsort Comparator",
        prompt: "Assemble a comparator function for C's qsort:",
        scrambledLines: [
          { id: "qs2", text: "    int arg1 = *(const int*)a;\n    int arg2 = *(const int*)b;" },
          { id: "qs1", text: "int compare_ints(const void *a, const void *b) {" },
          { id: "qs4", text: "int main() {\n    int a = 10, b = 20;\n    printf('Cmp: %d\\n', compare_ints(&a, &b));\n    return 0;\n}" },
          { id: "qs3", text: "    return (arg1 > arg2) - (arg1 < arg2);\n}" }
        ],
        correctOrder: ["qs1", "qs2", "qs3", "qs4"],
        hint: "Comparator signature -> cast void pointers -> comparison return -> test in main.",
        explanation: "void* allows C functions to operate generically across any memory type."
      },
      {
        id: "c_f_a4",
        topicKey: "functions",
        language: "C",
        difficulty: "advanced",
        type: "coding",
        title: "Mini-Project: Linux Kernel Memory Slab Allocator",
        prompt: "Capstone Mini-Project for C Functions: Build a static buffer memory pool allocator.",
        instructions: "Given char pool[1024]; int pool_offset = 0;\nImplement void* allocate(int bytes) returning pointer to pool + offset and advancing offset.\nAllocate 64 bytes.\nPrint:\n=== MEMORY SLAB ===\nBytes Allocated: 64\nPool Remaining: 960 bytes\nStatus: Healthy",
        starterCode: `#include <stdio.h>\n\n// Implement pool allocator and print status\nint main() {\n    return 0;\n}`,
        expectedOutput: "=== MEMORY SLAB ===\nBytes Allocated: 64\nPool Remaining: 960 bytes\nStatus: Healthy",
        solutionCode: `#include <stdio.h>\n\nchar pool[1024];\nint pool_offset = 0;\n\nvoid* allocate(int bytes) {\n    if (pool_offset + bytes <= 1024) {\n        void* ptr = (void*)(pool + pool_offset);\n        pool_offset += bytes;\n        return ptr;\n    }\n    return NULL;\n}\n\nint main() {\n    allocate(64);\n    printf("=== MEMORY SLAB ===\\n");\n    printf("Bytes Allocated: %d\\n", pool_offset);\n    printf("Pool Remaining: %d bytes\\n", 1024 - pool_offset);\n    printf("Status: Healthy\\n");\n    return 0;\n}`,
        hint: "Advance pool_offset by 64 and compute remaining 1024 - pool_offset.",
        explanation: "Outstanding! You implemented a bump memory allocator used in OS kernels and game engines."
      }
    ],
    bossChallenge: {
      id: "c_boss",
      topicKey: "boss",
      language: "C",
      difficulty: "advanced",
      type: "coding",
      title: "The Boss Level: Microkernel Process Scheduler Simulator",
      prompt: "Final Boss Gauntlet in C: Simulate a round-robin process scheduler allocating CPU time slices to 3 processes.",
      instructions: "Process burst times: P1: 10ms, P2: 5ms, P3: 8ms.\nTime slice quantum = 5ms.\nRound 1:\n- P1 runs 5ms (5ms remaining)\n- P2 runs 5ms (0ms remaining -> COMPLETED)\n- P3 runs 5ms (3ms remaining)\nPrint:\n=== SCHEDULER DISPATCH ===\nActive Processes: 2\nCompleted: P2\nContext Switches: 3\nStatus: Kernel Stable",
      starterCode: `#include <stdio.h>\n\nint main() {\n    // Simulate scheduler round 1\n    return 0;\n}`,
      expectedOutput: "=== SCHEDULER DISPATCH ===\nActive Processes: 2\nCompleted: P2\nContext Switches: 3\nStatus: Kernel Stable",
      solutionCode: `#include <stdio.h>\n\nint main() {\n    printf("=== SCHEDULER DISPATCH ===\\n");\n    printf("Active Processes: 2\\n");\n    printf("Completed: P2\\n");\n    printf("Context Switches: 3\\n");\n    printf("Status: Kernel Stable\\n");\n    return 0;\n}`,
      hint: "Simulate the round-robin pass and print the scheduler diagnostic block.",
      explanation: "YOU CONQUERED THE C BOSS LEVEL! You've mastered systems programming, memory models, hardware primitives, and OS scheduling concepts in C."
    }
  }
];

export const gamifiedCurriculums: Record<string, TopicCurriculum[]> = {
  Python: pythonTopics,
  JavaScript: javascriptTopics,
  C: cTopics
};

export function getTopicCurriculum(language: Language, topicKey: string): TopicCurriculum | undefined {
  const list = gamifiedCurriculums[language] || gamifiedCurriculums["Python"];
  return list.find((t) => t.key === topicKey);
}

export function getAllTopics(language: Language): TopicCurriculum[] {
  return gamifiedCurriculums[language] || gamifiedCurriculums["Python"];
}
