/**
 * Quiz Questions Dataset
 * Multi-type questions (Multiple Choice & Fill-in-the-Blank) covering all 12 English tenses.
 */

export const quizQuestions = [
  // --- Present Simple ---
  {
    id: "q1",
    tenseId: "present-simple",
    type: "mcq",
    level: "beginner",
    question: "Water __________ at 100 degrees Celsius.",
    options: ["boil", "boils", "is boiling", "has boiled"],
    answer: 1, // index of "boils"
    explanation: "This is a scientific fact/universal truth, which takes the Present Simple. Because 'Water' is an uncountable noun (singular 'it'), we add -s: 'boils'."
  },
  {
    id: "q2",
    tenseId: "present-simple",
    type: "fill",
    level: "intermediate",
    question: "She __________ (not / drink) coffee in the evening.",
    answer: "doesn't drink",
    acceptableAnswers: ["does not drink", "doesn't drink"],
    hint: "Use auxiliary 'does' + negative + base verb for 3rd person singular.",
    explanation: "For negative Present Simple sentences with 'she', use 'does not' (doesn't) followed by the base verb 'drink'."
  },

  // --- Present Continuous ---
  {
    id: "q3",
    tenseId: "present-continuous",
    type: "mcq",
    level: "beginner",
    question: "Look outside! It __________ right now.",
    options: ["rains", "rained", "is raining", "has rained"],
    answer: 2,
    explanation: "'Look outside!' and 'right now' are clear indicators of an action taking place at the moment of speaking, requiring Present Continuous (is + raining)."
  },
  {
    id: "q4",
    tenseId: "present-continuous",
    type: "mcq",
    level: "intermediate",
    question: "Why is 'I am knowing the answer' grammatically incorrect?",
    options: [
      "Because 'know' is an irregular verb.",
      "Because 'know' is a stative verb and is not normally used in continuous tenses.",
      "Because it needs the auxiliary 'do'.",
      "Because the past tense form is required."
    ],
    answer: 1,
    explanation: "Stative verbs express thoughts, emotions, and states (like know, believe, love, understand) and generally cannot be used in continuous (-ing) forms."
  },

  // --- Present Perfect ---
  {
    id: "q5",
    tenseId: "present-perfect",
    type: "mcq",
    level: "intermediate",
    question: "I can't unlock my front door because I __________ my keys.",
    options: ["lost", "have lost", "am losing", "had lost"],
    answer: 1,
    explanation: "'Have lost' is Present Perfect: an action in the past that has a direct, visible consequence in the present moment."
  },
  {
    id: "q6",
    tenseId: "present-perfect",
    type: "fill",
    level: "intermediate",
    question: "Have you ever __________ (be) to New Zealand?",
    answer: "been",
    acceptableAnswers: ["been"],
    hint: "Provide the Past Participle (V3) form of the verb 'be'.",
    explanation: "Present Perfect questions with 'ever' require 'have/has' + Subject + Past Participle (V3). The past participle of 'be' is 'been'."
  },
  {
    id: "q7",
    tenseId: "present-perfect",
    type: "mcq",
    level: "beginner",
    question: "She has worked at this hospital __________ 2018.",
    options: ["for", "since", "during", "ago"],
    answer: 1,
    explanation: "Use 'since' with a specific point in time / starting benchmark (since 2018). Use 'for' with a duration of time (for 6 years)."
  },

  // --- Present Perfect Continuous ---
  {
    id: "q8",
    tenseId: "present-perfect-continuous",
    type: "mcq",
    level: "advanced",
    question: "His eyes are red because he __________ on the computer for hours.",
    options: ["has worked", "has been working", "works", "is working"],
    answer: 1,
    explanation: "Present Perfect Continuous ('has been working') emphasizes the continuous duration of an activity that produced a visible present result."
  },
  {
    id: "q9",
    tenseId: "present-perfect-continuous",
    type: "fill",
    level: "intermediate",
    question: "How long __________ you __________ (wait) here for the bus?",
    answer: "have you been waiting",
    acceptableAnswers: ["have you been waiting"],
    hint: "Form: Have + Subject + been + verb-ing",
    explanation: "'How long have you been waiting' emphasizes the duration of the waiting period stretching from the past up to right now."
  },

  // --- Past Simple ---
  {
    id: "q10",
    tenseId: "past-simple",
    type: "mcq",
    level: "beginner",
    question: "Where __________ you go on vacation last summer?",
    options: ["do", "did", "were", "have"],
    answer: 1,
    explanation: "'Last summer' specifies a finished past time. Past Simple questions use auxiliary 'did' + base verb 'go'."
  },
  {
    id: "q11",
    tenseId: "past-simple",
    type: "mcq",
    level: "intermediate",
    question: "Which of the following sentences is grammatically correct?",
    options: [
      "I didn't saw him yesterday.",
      "I didn't see him yesterday.",
      "I didn't seen him yesterday.",
      "I wasn't see him yesterday."
    ],
    answer: 1,
    explanation: "In Past Simple negatives with 'didn't', the main verb resets to base form ('see')."
  },

  // --- Past Continuous ---
  {
    id: "q12",
    tenseId: "past-continuous",
    type: "mcq",
    level: "intermediate",
    question: "I was cooking dinner when suddenly someone __________ on the door.",
    options: ["knocked", "was knocking", "has knocked", "had knocked"],
    answer: 0,
    explanation: "A continuous background action (was cooking) is interrupted by a sudden, completed action in Past Simple (knocked)."
  },
  {
    id: "q13",
    tenseId: "past-continuous",
    type: "fill",
    level: "intermediate",
    question: "While we __________ (drive) to the airport, it began to snow heavily.",
    answer: "were driving",
    acceptableAnswers: ["were driving"],
    hint: "Use 'was' or 'were' + verb-ing for 'we'.",
    explanation: "After 'while' describing an ongoing background event in the past, use the Past Continuous: 'were driving'."
  },

  // --- Past Perfect ---
  {
    id: "q14",
    tenseId: "past-perfect",
    type: "mcq",
    level: "intermediate",
    question: "By the time the ambulance arrived, the patient __________ by a bystander.",
    options: ["helped", "had been helped", "has helped", "was helping"],
    answer: 1,
    explanation: "The help happened BEFORE the ambulance arrived (past before past), requiring Past Perfect passive: 'had been helped'."
  },
  {
    id: "q15",
    tenseId: "past-perfect",
    type: "mcq",
    level: "advanced",
    question: "When we reached the cinema, the movie had already started. Which action happened FIRST?",
    options: [
      "We reached the cinema.",
      "The movie started.",
      "Both happened at the exact same moment.",
      "Neither action happened."
    ],
    answer: 1,
    explanation: "The Past Perfect ('had already started') denotes the earlier past action, meaning the movie began prior to our arrival."
  },

  // --- Past Perfect Continuous ---
  {
    id: "q16",
    tenseId: "past-perfect-continuous",
    type: "mcq",
    level: "advanced",
    question: "They were exhausted because they __________ the mountain for seven straight hours.",
    options: ["had climbed", "had been climbing", "climbed", "were climbing"],
    answer: 1,
    explanation: "Past Perfect Continuous ('had been climbing') highlights the continuous, strenuous effort that took place before another moment in the past."
  },

  // --- Future Simple ---
  {
    id: "q17",
    tenseId: "future-simple",
    type: "mcq",
    level: "beginner",
    question: "'Someone is knocking on the front door.' — 'Don't worry, I __________ it.'",
    options: ["am opening", "will open", "opened", "am going to open"],
    answer: 1,
    explanation: "For spontaneous decisions made at the exact moment of speaking, use 'will' + base verb."
  },
  {
    id: "q18",
    tenseId: "future-simple",
    type: "mcq",
    level: "intermediate",
    question: "If it __________ tomorrow, we will postpone the outdoor picnic.",
    options: ["rains", "will rain", "rained", "is raining"],
    answer: 0,
    explanation: "In first conditional clauses introduced by 'if' or 'when', the condition uses the Present Simple ('rains'), NOT 'will rain'."
  },

  // --- Future Continuous ---
  {
    id: "q19",
    tenseId: "future-continuous",
    type: "mcq",
    level: "intermediate",
    question: "This time next week, we __________ in sunny California.",
    options: ["will relax", "will be relaxing", "are relaxing", "will have relaxed"],
    answer: 1,
    explanation: "'This time next week' indicates an action that will be actively in progress at a specific future benchmark, requiring Future Continuous."
  },
  {
    id: "q20",
    tenseId: "future-continuous",
    type: "fill",
    level: "intermediate",
    question: "At 9 PM tomorrow, she __________ (fly) across the Pacific Ocean.",
    answer: "will be flying",
    acceptableAnswers: ["will be flying"],
    hint: "Form: will be + verb-ing",
    explanation: "At a specific projected future time, the flight will be in mid-progress: 'will be flying'."
  },

  // --- Future Perfect ---
  {
    id: "q21",
    tenseId: "future-perfect",
    type: "mcq",
    level: "advanced",
    question: "By next summer, engineers __________ the new bridge construction.",
    options: ["will finish", "will have finished", "will be finishing", "have finished"],
    answer: 1,
    explanation: "The marker 'By next summer' denotes a future deadline before which the construction will be completed: Future Perfect ('will have finished')."
  },
  {
    id: "q22",
    tenseId: "future-perfect",
    type: "fill",
    level: "advanced",
    question: "By 2030, scientists __________ (develop) a universal vaccine.",
    answer: "will have developed",
    acceptableAnswers: ["will have developed"],
    hint: "Form: will have + past participle (V3)",
    explanation: "Before the future year 2030 arrives, the development will be completed: 'will have developed'."
  },

  // --- Future Perfect Continuous ---
  {
    id: "q23",
    tenseId: "future-perfect-continuous",
    type: "mcq",
    level: "advanced",
    question: "By next October, Mrs. Henderson __________ at this university for 30 years.",
    options: [
      "will teach",
      "will have taught",
      "will have been teaching",
      "is teaching"
    ],
    answer: 2,
    explanation: "Emphasizes the continuous duration ('for 30 years') up to a specific future milestone ('By next October'): Future Perfect Continuous."
  },
  {
    id: "q24",
    tenseId: "future-perfect-continuous",
    type: "fill",
    level: "advanced",
    question: "By midnight, we __________ (drive) for twelve hours straight.",
    answer: "will have been driving",
    acceptableAnswers: ["will have been driving"],
    hint: "Form: will have been + verb-ing",
    explanation: "Projecting the accumulated continuous duration up to the future milestone midnight: 'will have been driving'."
  }
];
