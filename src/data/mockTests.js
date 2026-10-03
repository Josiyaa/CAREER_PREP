// Mock Tests Database for Placement Prep

export const mockTestsData = [
  {
    id: "aptitude-101",
    title: "Quantitative Aptitude Speed Challenge",
    category: "Quantitative Aptitude",
    difficulty: "Medium",
    durationMinutes: 15,
    totalQuestions: 5,
    questions: [
      {
        id: "q1",
        question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
        options: ["120 metres", "150 metres", "180 metres", "324 metres"],
        correctIndex: 1,
        formula: "Distance = Speed × Time (Convert km/hr to m/s by multiplying with 5/18)",
        explanation: "Speed in m/s = 60 × (5/18) = 50/3 m/s.\nTime taken = 9 seconds.\nLength of train = Distance = (50/3) × 9 = 150 metres."
      },
      {
        id: "q2",
        question: "A, B and C can do a piece of work in 20, 30 and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?",
        options: ["12 days", "15 days", "16 days", "18 days"],
        correctIndex: 1,
        formula: "Work done in 3-day cycle = (3 × A's 1-day work) + B's 1-day work + C's 1-day work",
        explanation: "A's 1 day work = 1/20.\nWork done by A in 2 days = 2/20 = 1/10.\nWork done by A, B, C on 3rd day = (1/20 + 1/30 + 1/60) = 6/60 = 1/10.\nTotal work done in 3 days = 1/10 + 1/10 = 1/5.\nTotal cycles required = 5. Total days = 5 × 3 = 15 days."
      },
      {
        id: "q3",
        question: "The average age of a class of 30 students is 15 years. If the teacher's age is included, the average increases by 1 year. What is the teacher's age?",
        options: ["40 years", "46 years", "45 years", "50 years"],
        correctIndex: 1,
        formula: "New Value = New Average + (Original Count × Increase in Average)",
        explanation: "Original total age = 30 × 15 = 450.\nNew total age (31 people) = 31 × 16 = 496.\nTeacher's age = 496 - 450 = 46 years."
      },
      {
        id: "q4",
        question: "A trader marks his goods 20% above the cost price and allows a discount of 10% on the marked price. What is his profit percentage?",
        options: ["8%", "10%", "12%", "15%"],
        correctIndex: 0,
        formula: "Effective Percentage = A + B + (AB / 100) where A = +20, B = -10",
        explanation: "Let Cost Price (CP) = ₹100.\nMarked Price (MP) = ₹120.\nSelling Price (SP) = 120 - 10% of 120 = 120 - 12 = ₹108.\nProfit % = ((108 - 100) / 100) × 100 = 8%."
      },
      {
        id: "q5",
        question: "Two pipes A and B can fill a tank in 12 hours and 18 hours respectively. If both pipes are opened together, how long will it take to fill the tank completely?",
        options: ["6.2 hours", "7.2 hours", "8.0 hours", "9.5 hours"],
        correctIndex: 1,
        formula: "Time = (A × B) / (A + B)",
        explanation: "Combined 1-hour work = (1/12) + (1/18) = (3 + 2)/36 = 5/36.\nTotal time taken = 36/5 = 7.2 hours (7 hours 12 minutes)."
      }
    ]
  },
  {
    id: "logical-102",
    title: "Logical & Analytical Reasoning Mastery",
    category: "Logical Reasoning",
    difficulty: "Medium",
    durationMinutes: 15,
    totalQuestions: 5,
    questions: [
      {
        id: "l1",
        question: "In a certain code language, 'COMPUTER' is written as 'RFUVQNPC'. How is 'MEDICINE' written in that code?",
        options: ["EOJDEJFM", "MFEJDJOE", "EOJDJEFM", "EOJEJDFM"],
        correctIndex: 2,
        formula: "Reverse the letters and add +1 to intermediate characters",
        explanation: "1. Reverse the string: COMPUTER -> RETUPMOC.\n2. Keep first & last character exchange: C <-> R.\n3. Add +1 to each middle letter: E->F, T->U, U->V, P->Q, M->N, O->P.\nApplying same logic to MEDICINE:\nReverse: ENICIDEM -> First/Last stay position: E....M.\nShift middle letters (+1): N->O, I->J, C->D, I->J, D->E, E->F => EOJDJEFM."
      },
      {
        id: "l2",
        question: "Looking at a portrait, a man said, 'I have no brother or sister, but that man's father is my father's son.' Whose portrait was he looking at?",
        options: ["His own portrait", "His son's portrait", "His father's portrait", "His nephew's portrait"],
        correctIndex: 1,
        formula: "Break down relations backwards",
        explanation: "'My father's son' = The speaker himself (since he has no brother or sister).\n'That man's father' = The speaker.\nTherefore, the portrait is of his son."
      },
      {
        id: "l3",
        question: "Statement: All Mangoes are Golden. All Golden things are Sweet.\nConclusions:\n1. All Mangoes are Sweet.\n2. Some Sweet things are Golden.",
        options: ["Only Conclusion 1 follows", "Only Conclusion 2 follows", "Both Conclusions 1 & 2 follow", "Neither Conclusion follows"],
        correctIndex: 2,
        formula: "Syllogism Rules: A + A = A (All A are B + All B are C => All A are C)",
        explanation: "All Mangoes are Golden (A) + All Golden are Sweet (A) => All Mangoes are Sweet (A). Conclusion 1 is valid.\nConversion of 'All Golden are Sweet' gives 'Some Sweet are Golden'. Conclusion 2 is valid."
      },
      {
        id: "l4",
        question: "If 1st January 2024 was a Monday, what day of the week was 1st January 2025?",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        correctIndex: 1,
        formula: "Leap Year adds 2 odd days",
        explanation: "2024 is a leap year (366 days).\n366 % 7 = 2 odd days.\nMonday + 2 days = Wednesday. Therefore, 1st Jan 2025 is Wednesday."
      },
      {
        id: "l5",
        question: "Find the missing number in the series: 4, 9, 25, 49, 121, ?",
        options: ["144", "169", "196", "225"],
        correctIndex: 1,
        formula: "Series of squares of consecutive prime numbers",
        explanation: "4 = 2², 9 = 3², 25 = 5², 49 = 7², 121 = 11².\nThe numbers being squared are prime numbers: 2, 3, 5, 7, 11.\nThe next prime number is 13.\n13² = 169."
      }
    ]
  },
  {
    id: "verbal-103",
    title: "Verbal Ability & Grammar Assessment",
    category: "Verbal Ability",
    difficulty: "Easy",
    durationMinutes: 10,
    totalQuestions: 4,
    questions: [
      {
        id: "v1",
        question: "Choose the word most nearly OPPOSITE in meaning to 'EPHEMERAL':",
        options: ["Transient", "Permanent", "Fleeting", "Evanescent"],
        correctIndex: 1,
        formula: "Vocabulary Synonym/Antonym mapping",
        explanation: "'Ephemeral' means lasting for a very short time.\nOpposite (Antonym) is 'Permanent'. 'Transient' and 'Fleeting' are synonyms."
      },
      {
        id: "v2",
        question: "Identify the grammatically correct sentence:",
        options: [
          "Neither of the candidates have submitted their resume.",
          "Neither of the candidates has submitted his or her resume.",
          "Neither of the candidate has submitted their resume.",
          "Neither of candidates have submitted resume."
        ],
        correctIndex: 1,
        formula: "Subject-Verb Agreement: 'Neither' takes a singular verb ('has')",
        explanation: "'Neither of the + Plural Noun' takes a singular verb ('has'). Option B correctly uses 'has' and singular pronoun agreement."
      },
      {
        id: "v3",
        question: "Fill in the blank: The committee ________ arrived at a unanimous decision after hours of deliberation.",
        options: ["have", "has", "are", "were"],
        correctIndex: 1,
        formula: "Collective Noun acting as a single unit takes a singular verb",
        explanation: "When a collective noun ('committee') acts as a unified body, it requires a singular verb ('has')."
      },
      {
        id: "v4",
        question: "Choose the correct idiom meaning for 'To burn the candle at both ends':",
        options: [
          "To waste money recklessly",
          "To work extremely hard from early morning to late at night",
          "To create a romantic ambiance",
          "To ruin a friendship"
        ],
        correctIndex: 1,
        formula: "Idiomatic Expression context",
        explanation: "'To burn the candle at both ends' means to exhaust oneself by doing too much work and sleeping very little."
      }
    ]
  },
  {
    id: "technical-104",
    title: "Core CS & Coding Fundamentals",
    category: "Technical Skills",
    difficulty: "Hard",
    durationMinutes: 20,
    totalQuestions: 5,
    questions: [
      {
        id: "t1",
        question: "What is the worst-case time complexity of QuickSort?",
        options: ["O(N log N)", "O(N)", "O(N²)", "O(2ⁿ)"],
        correctIndex: 2,
        formula: "QuickSort Recurrence in Worst Case: T(N) = T(N-1) + O(N) = O(N²)",
        explanation: "QuickSort has a worst-case time complexity of O(N²) when the pivot chosen is always the smallest or largest element (e.g. sorted array with first element pivot)."
      },
      {
        id: "t2",
        question: "Which Data Structure is best suited for implementing a LRU (Least Recently Used) Cache?",
        options: ["Array + Stack", "Doubly Linked List + Hash Map", "Binary Search Tree", "Queue + Heap"],
        correctIndex: 1,
        formula: "Hash Map for O(1) lookup + Doubly Linked List for O(1) node removal & insertion at head",
        explanation: "A Hash Map provides O(1) key lookups, while a Doubly Linked List allows O(1) removal of the least recently used node from the tail and insertion of newly accessed items at the head."
      },
      {
        id: "t3",
        question: "In Relational Databases, which Normal Form eliminates Transitive Dependency?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correctIndex: 2,
        formula: "3NF Condition: X -> A implies X is super key OR A is prime attribute (no X -> Y -> Z transitive dependency)",
        explanation: "3rd Normal Form (3NF) requires a table to be in 2NF and ensures that non-prime attributes do not depend transitively on the primary key."
      },
      {
        id: "t4",
        question: "What is the primary condition required for a Deadlock to occur in Operating Systems?",
        options: ["Mutual Exclusion", "Hold and Wait", "No Preemption & Circular Wait", "All of the above"],
        correctIndex: 3,
        formula: "Coffman Conditions for Deadlock",
        explanation: "All four Coffman conditions (Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait) must hold simultaneously for a deadlock to occur."
      },
      {
        id: "t5",
        question: "In HTTP, what does a status code of 403 Forbidden indicate?",
        options: ["Resource not found on server", "Server failed to process request", "Client is authenticated but lacks access permissions", "Unauthorized due to missing login token"],
        correctIndex: 2,
        formula: "HTTP 4xx Client Error semantics",
        explanation: "HTTP 403 Forbidden means the server understands the request but refuses to authorize it (authenticated user lacks permissions). 401 is Unauthenticated."
      }
    ]
  }
];
