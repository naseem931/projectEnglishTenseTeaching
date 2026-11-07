/**
 * Complete English Tenses Educational Dataset
 * Contains all 12 English tenses with formulas, usages, signal words, common mistakes, and timeline data.
 */

export const tensesData = [
  // ==================== PRESENT TENSES ====================
  {
    id: "present-simple",
    name: "Present Simple",
    category: "present",
    aspect: "simple",
    tagline: "Habits, general truths, routines, and permanent situations",
    color: "#3b82f6", // blue
    badge: "Most Common",
    timeline: {
      type: "repeating",
      label: "Happens repeatedly across past, present, and future",
      position: "center"
    },
    formulas: {
      affirmative: "Subject + Base Verb (V1) [add -s/-es for he/she/it]",
      negative: "Subject + do not / does not (don't/doesn't) + Base Verb",
      interrogative: "Do / Does + Subject + Base Verb?"
    },
    formulaExamples: {
      affirmative: "She plays the piano brilliantly.",
      negative: "They do not live in New York.",
      interrogative: "Do you enjoy learning languages?"
    },
    rules: [
      "Add -s or -es to the verb when subject is 3rd person singular (he, she, it).",
      "Verbs ending in -ch, -sh, -ss, -x, -o take -es (watches, washes, fixes, goes).",
      "Consonant + y changes to -ies (carry -> carries), but vowel + y just adds -s (play -> plays).",
      "Auxiliary verb 'do/does' absorbs the 3rd person -s in negatives and questions."
    ],
    usages: [
      {
        title: "Habits and Daily Routines",
        example: "I drink two glasses of water every morning.",
        explanation: "Actions that are repeated regularly as a daily habit."
      },
      {
        title: "Universal Truths & Scientific Facts",
        example: "Water boils at 100 degrees Celsius.",
        explanation: "Timeless facts that are always true."
      },
      {
        title: "Permanent States / Situations",
        example: "Maya lives in London and speaks French fluently.",
        explanation: "Situations not expected to change quickly."
      },
      {
        title: "Timetables & Fixed Schedules",
        example: "The train departs at 7:30 PM tonight.",
        explanation: "Official future schedules often use Present Simple."
      }
    ],
    signalWords: [
      "always", "usually", "often", "sometimes", "rarely", "never",
      "every day", "on Mondays", "once a week", "normally", "seldom"
    ],
    commonMistakes: [
      {
        wrong: "He go to school every day.",
        right: "He goes to school every day.",
        reason: "Third-person singular (he/she/it) requires adding -s or -es to the verb."
      },
      {
        wrong: "Does she likes chocolate?",
        right: "Does she like chocolate?",
        reason: "In questions with 'Does', the main verb stays in base form (no -s)."
      },
      {
        wrong: "I am agree with you.",
        right: "I agree with you.",
        reason: "'Agree' is a verb, not an adjective. Do not use 'am' before it."
      }
    ],
    quickTip: "Remember: 'He, She, It, verbs love -s!' But whenever 'Does' steps in, the -s flies away."
  },

  {
    id: "present-continuous",
    name: "Present Continuous",
    category: "present",
    aspect: "continuous",
    tagline: "Actions happening right now, temporary states, and fixed future plans",
    color: "#06b6d4", // cyan
    badge: "In Progress",
    timeline: {
      type: "spanning",
      label: "Active right now (started before, continuing after)",
      position: "center"
    },
    formulas: {
      affirmative: "Subject + am / is / are + Verb-ing (Present Participle)",
      negative: "Subject + am / is / are + not + Verb-ing",
      interrogative: "Am / Is / Are + Subject + Verb-ing?"
    },
    formulaExamples: {
      affirmative: "Lucas is writing a new article right now.",
      negative: "We are not watching television at the moment.",
      interrogative: "Are you listening to this podcast?"
    },
    rules: [
      "Use 'am' with I; 'is' with he/she/it; 'are' with you/we/they.",
      "Drop final silent -e before adding -ing (make -> making, write -> writing).",
      "Double final consonant if single vowel precedes it in 1-syllable word (run -> running, sit -> sitting).",
      "Stative verbs (like, know, believe, understand) are rarely used in continuous form."
    ],
    usages: [
      {
        title: "Happening at this Exact Moment",
        example: "Look outside! It is raining heavily.",
        explanation: "Actions taking place at the moment of speaking."
      },
      {
        title: "Temporary Situations",
        example: "I am staying with my brother this week while renovating.",
        explanation: "Not permanent; limited in duration."
      },
      {
        title: "Trends & Changing Situations",
        example: "Electric cars are becoming more affordable.",
        explanation: "Gradual changes and developing trends."
      },
      {
        title: "Definite Arranged Future Plans",
        example: "We are meeting the CEO tomorrow at 10 AM.",
        explanation: "Personal arrangements already agreed upon."
      }
    ],
    signalWords: [
      "now", "right now", "at the moment", "currently", "these days",
      "Listen!", "Look!", "this week", "today"
    ],
    commonMistakes: [
      {
        wrong: "I am knowing the answer.",
        right: "I know the answer.",
        reason: "'Know' is a state verb expressing mental state, so it shouldn't be continuous."
      },
      {
        wrong: "He is come here now.",
        right: "He is coming here now.",
        reason: "Continuous tense requires the -ing form of the main verb."
      }
    ],
    quickTip: "Think of continuous as a live video camera recording what is unfolding."
  },

  {
    id: "present-perfect",
    name: "Present Perfect",
    category: "present",
    aspect: "perfect",
    tagline: "Connecting past actions with present results or life experiences",
    color: "#8b5cf6", // purple
    badge: "Past to Present Bridge",
    timeline: {
      type: "bridge",
      label: "Past event connected directly to the present moment",
      position: "left-to-center"
    },
    formulas: {
      affirmative: "Subject + have / has + Past Participle (V3)",
      negative: "Subject + have / has + not (haven't/hasn't) + Past Participle (V3)",
      interrogative: "Have / Has + Subject + Past Participle (V3)?"
    },
    formulaExamples: {
      affirmative: "I have finished all my assignments.",
      negative: "She has not received the confirmation email yet.",
      interrogative: "Have you ever visited Japan?"
    },
    rules: [
      "Use 'has' with he/she/it; use 'have' with I/you/we/they.",
      "Must use the 3rd verb form (Past Participle, e.g., eat -> eaten, see -> seen).",
      "Do NOT use with specific past time indicators like 'yesterday', 'in 2010', or 'ago'."
    ],
    usages: [
      {
        title: "Life Experience (Indefinite Time)",
        example: "I have travelled to six different continents.",
        explanation: "It matters that it happened in the person's lifetime, not exactly when."
      },
      {
        title: "Past Action with a Present Result",
        example: "I have lost my house keys (so I can't open the door right now).",
        explanation: "The consequence is affecting the present situation."
      },
      {
        title: "Unfinished Time Period",
        example: "I have drunk three cups of tea this morning (morning isn't over yet).",
        explanation: "The timeframe is still ongoing."
      },
      {
        title: "Recent Actions (Just / Already / Yet)",
        example: "The plane has just landed on runway 2.",
        explanation: "Completed moments before speaking."
      }
    ],
    signalWords: [
      "already", "yet", "just", "ever", "never",
      "so far", "recently", "lately", "for", "since"
    ],
    commonMistakes: [
      {
        wrong: "I have seen that movie yesterday.",
        right: "I saw that movie yesterday.",
        reason: "Specific past time markers (yesterday, last week) require Past Simple, not Present Perfect."
      },
      {
        wrong: "She has lived here since five years.",
        right: "She has lived here for five years. / since 2019.",
        reason: "Use 'for' with duration (5 years) and 'since' with a starting point (2019)."
      }
    ],
    quickTip: "'Since' = Starting point of time. 'For' = Duration / quantity of time."
  },

  {
    id: "present-perfect-continuous",
    name: "Present Perfect Continuous",
    category: "present",
    aspect: "perfect-continuous",
    tagline: "Actions started in the past, continuing now, with focus on duration",
    color: "#ec4899", // pink
    badge: "Duration Focus",
    timeline: {
      type: "duration-to-now",
      label: "Started in the past and still rolling right into now",
      position: "left-through-center"
    },
    formulas: {
      affirmative: "Subject + have / has + been + Verb-ing",
      negative: "Subject + have / has + not + been + Verb-ing",
      interrogative: "Have / Has + Subject + been + Verb-ing?"
    },
    formulaExamples: {
      affirmative: "They have been studying for the exam for three hours.",
      negative: "He has not been sleeping well lately.",
      interrogative: "How long have you been waiting for us?"
    },
    rules: [
      "Subject + have/has + been + verb with -ing.",
      "Emphasizes the duration and continuity of an ongoing activity.",
      "If the action is completely done and you want to state the final quantity, use Present Perfect Simple instead."
    ],
    usages: [
      {
        title: "Ongoing Action Emphasizing Duration",
        example: "She has been practicing the violin since 8:00 AM.",
        explanation: "Shows how long the action has been going on continuously."
      },
      {
        title: "Action Recently Stopped with Visible Evidence",
        example: "The ground is wet because it has been raining.",
        explanation: "The process just ended, but the physical signs are clearly visible."
      }
    ],
    signalWords: [
      "how long", "for", "since", "all day", "all morning", "lately", "recently"
    ],
    commonMistakes: [
      {
        wrong: "I am waiting for you since 2 PM.",
        right: "I have been waiting for you since 2 PM.",
        reason: "When stating how long an action has been happening up to now, use Present Perfect Continuous."
      },
      {
        wrong: "I have been knowing him for ten years.",
        right: "I have known him for ten years.",
        reason: "Stative verbs (like 'know') cannot be used in continuous forms; use Present Perfect Simple."
      }
    ],
    quickTip: "Ask 'How long?' -> Present Perfect Continuous! Ask 'How many times / how much?' -> Present Perfect Simple!"
  },

  // ==================== PAST TENSES ====================
  {
    id: "past-simple",
    name: "Past Simple",
    category: "past",
    aspect: "simple",
    tagline: "Completed actions at a specific time in the past",
    color: "#f59e0b", // amber
    badge: "Completed Past",
    timeline: {
      type: "point-past",
      label: "Single completed event in the past (finished story)",
      position: "left"
    },
    formulas: {
      affirmative: "Subject + Past Form of Verb (V2) [-ed or irregular]",
      negative: "Subject + did not (didn't) + Base Verb",
      interrogative: "Did + Subject + Base Verb?"
    },
    formulaExamples: {
      affirmative: "We visited the Louvre Museum last summer.",
      negative: "He did not call me back yesterday.",
      interrogative: "Did you watch the match last night?"
    },
    rules: [
      "Regular verbs add -ed (work -> worked, call -> called).",
      "Irregular verbs change forms completely (go -> went, buy -> bought, see -> saw).",
      "In negatives and questions, 'did' is used and the main verb resets to BASE form!"
    ],
    usages: [
      {
        title: "Finished Action at a Specific Time",
        example: "Shakespeare wrote 'Hamlet' around 1600.",
        explanation: "Action happened and concluded at a definite past time."
      },
      {
        title: "Series of Consecutive Past Events",
        example: "He woke up, brushed his teeth, and made coffee.",
        explanation: "Sequential actions in a narrative or story."
      },
      {
        title: "Past Habits (no longer true)",
        example: "When I was young, I played outside until sunset.",
        explanation: "Old habits or states in the past (often with 'used to')."
      }
    ],
    signalWords: [
      "yesterday", "last night", "last year", "in 1999", "two days ago",
      "the other day", "when I was younger", "in the past"
    ],
    commonMistakes: [
      {
        wrong: "Did you went to the supermarket?",
        right: "Did you go to the supermarket?",
        reason: "'Did' already carries the past tense. The main verb must be base form."
      },
      {
        wrong: "I didn't saw him.",
        right: "I didn't see him.",
        reason: "After 'didn't', always use the base form of the verb."
      }
    ],
    quickTip: "Golden Rule: 'Did' and 'V2' never share the same clause! Once 'did' enters, the verb stays base."
  },

  {
    id: "past-continuous",
    name: "Past Continuous",
    category: "past",
    aspect: "continuous",
    tagline: "Actions in progress at a specific past moment, often interrupted",
    color: "#10b981", // emerald
    badge: "Past in Progress",
    timeline: {
      type: "span-past",
      label: "In progress during a past time frame; often interrupted by a sudden event",
      position: "left"
    },
    formulas: {
      affirmative: "Subject + was / were + Verb-ing",
      negative: "Subject + was / were + not (wasn't/weren't) + Verb-ing",
      interrogative: "Was / Were + Subject + Verb-ing?"
    },
    formulaExamples: {
      affirmative: "I was cooking dinner when the phone rang.",
      negative: "They were not paying attention during the lecture.",
      interrogative: "What were you doing at 9:00 PM yesterday?"
    },
    rules: [
      "Use 'was' with I, he, she, it.",
      "Use 'were' with you, we, they.",
      "Frequently paired with Past Simple using 'while' and 'when'."
    ],
    usages: [
      {
        title: "Interrupted Action in Past",
        example: "I was sleeping when the alarm suddenly sounded.",
        explanation: "The longer background action is continuous; the interrupting action is Past Simple."
      },
      {
        title: "Parallel Simultaneous Actions",
        example: "While mom was cooking, dad was washing the dishes.",
        explanation: "Two actions happening at the exact same time in the past."
      },
      {
        title: "Atmosphere / Scene Setting",
        example: "The birds were singing and the sun was rising over the hill.",
        explanation: "Setting the background mood in stories."
      }
    ],
    signalWords: [
      "while", "as", "when", "at that moment", "at 8 PM yesterday", "all evening"
    ],
    commonMistakes: [
      {
        wrong: "While I walked home, it started raining.",
        right: "While I was walking home, it started raining.",
        reason: "The continuous background action requires Past Continuous after 'while'."
      },
      {
        wrong: "We was having dinner.",
        right: "We were having dinner.",
        reason: "'We' takes 'were', not 'was'."
      }
    ],
    quickTip: "Usually: 'While' + Past Continuous (longer event) and 'When' + Past Simple (shorter event)."
  },

  {
    id: "past-perfect",
    name: "Past Perfect",
    category: "past",
    aspect: "perfect",
    tagline: "The 'earlier past' – an action completed before another past event",
    color: "#6366f1", // indigo
    badge: "Past Before Past",
    timeline: {
      type: "past-before-past",
      label: "Happened before another past milestone",
      position: "far-left"
    },
    formulas: {
      affirmative: "Subject + had + Past Participle (V3)",
      negative: "Subject + had not (hadn't) + Past Participle (V3)",
      interrogative: "Had + Subject + Past Participle (V3)?"
    },
    formulaExamples: {
      affirmative: "When we arrived at the cinema, the film had already started.",
      negative: "She had not visited that city before last year.",
      interrogative: "Had you eaten lunch before the meeting began?"
    },
    rules: [
      "'Had' is used for ALL subjects (I, you, he, she, it, we, they).",
      "Pair with another past event to show which of the two happened earlier in chronological order.",
      "Event 1 (earlier) = Past Perfect; Event 2 (later) = Past Simple."
    ],
    usages: [
      {
        title: "Clarifying Chronological Order",
        example: "I realized I had left my wallet at the restaurant.",
        explanation: "First, I left the wallet. Later, I realized it."
      },
      {
        title: "Unfulfilled Past Desires / Regrets",
        example: "If I had known about the traffic, I would have taken the train.",
        explanation: "Third conditional structure describing hypothetical past outcomes."
      }
    ],
    signalWords: [
      "already", "before", "by the time", "after", "never... before", "until that day"
    ],
    commonMistakes: [
      {
        wrong: "The train left before I had reached the station.",
        right: "The train had left before I reached the station.",
        reason: "The train leaving happened FIRST, so it gets 'had left'. Reaching happened second."
      }
    ],
    quickTip: "Imagine a past time machine: Past Simple takes you back. Past Perfect takes you back even further!"
  },

  {
    id: "past-perfect-continuous",
    name: "Past Perfect Continuous",
    category: "past",
    aspect: "perfect-continuous",
    tagline: "Ongoing past action leading up to another point in the past",
    color: "#14b8a6", // teal
    badge: "Past Duration",
    timeline: {
      type: "span-to-past-point",
      label: "Duration continued up to a specific past milestone",
      position: "far-left-to-left"
    },
    formulas: {
      affirmative: "Subject + had + been + Verb-ing",
      negative: "Subject + had not + been + Verb-ing",
      interrogative: "Had + Subject + been + Verb-ing?"
    },
    formulaExamples: {
      affirmative: "He had been running for an hour before he took a break.",
      negative: "They had not been working there long when the company merged.",
      interrogative: "Had you been waiting long before the bus arrived?"
    },
    rules: [
      "Subject + had + been + verb with -ing for all subjects.",
      "Emphasizes the duration of an activity before another past event took place."
    ],
    usages: [
      {
        title: "Past Action Ongoing Up to Another Past Event",
        example: "She was exhausted because she had been studying all night.",
        explanation: "The ongoing effort caused the past condition (exhaustion)."
      },
      {
        title: "Cause of a Past State",
        example: "The streets were soaked because it had been raining heavily.",
        explanation: "Explains the physical reason for a past result."
      }
    ],
    signalWords: [
      "for", "since", "before", "all day", "how long"
    ],
    commonMistakes: [
      {
        wrong: "He was tired because he was driving all night.",
        right: "He was tired because he had been driving all night.",
        reason: "Use Past Perfect Continuous to express the ongoing action that preceded and caused the past state."
      }
    ],
    quickTip: "Focus on the DURATION before something in the past: Had + Been + -ing."
  },

  // ==================== FUTURE TENSES ====================
  {
    id: "future-simple",
    name: "Future Simple",
    category: "future",
    aspect: "simple",
    tagline: "Instant decisions, predictions, promises, and future facts",
    color: "#f97316", // orange
    badge: "Future Intent",
    timeline: {
      type: "point-future",
      label: "A future event or decision",
      position: "right"
    },
    formulas: {
      affirmative: "Subject + will + Base Verb (or be going to + Base Verb)",
      negative: "Subject + will not (won't) + Base Verb",
      interrogative: "Will + Subject + Base Verb?"
    },
    formulaExamples: {
      affirmative: "I will help you with your luggage.",
      negative: "They will not (won't) disclose the results until Friday.",
      interrogative: "Will you come to the celebration tomorrow?"
    },
    rules: [
      "Modal 'will' is invariable (does not change for he/she/it).",
      "Followed directly by the BASE verb (infinitive without 'to').",
      "Use 'will' for spontaneous decisions, 'be going to' for prior plans/intentions."
    ],
    usages: [
      {
        title: "Spontaneous Decision Made at the Moment",
        example: "The doorbell is ringing. I will answer it!",
        explanation: "Decision formulated right on the spot."
      },
      {
        title: "Predictions Based on Belief / Opinion",
        example: "I think artificial intelligence will transform education.",
        explanation: "Personal opinion or prediction about the future."
      },
      {
        title: "Promises, Offers, and Threats",
        example: "I will never reveal your secret, I promise.",
        explanation: "Expressing commitment or willingness."
      },
      {
        title: "Future Facts",
        example: "Next month will be our fifth anniversary.",
        explanation: "Unchangeable calendar truth."
      }
    ],
    signalWords: [
      "tomorrow", "next week", "in 2030", "soon", "probably", "I think", "I hope"
    ],
    commonMistakes: [
      {
        wrong: "I will going to call him tomorrow.",
        right: "I will call him tomorrow. / I am going to call him tomorrow.",
        reason: "Never combine 'will' and 'going to' in the same clause."
      },
      {
        wrong: "If it will rain, we will stay inside.",
        right: "If it rains, we will stay inside.",
        reason: "In conditional clauses with 'if' or 'when', use Present Simple for the condition, not 'will'."
      }
    ],
    quickTip: "Instant decision right now? Use 'will'. Planned yesterday for tomorrow? Use 'be going to'."
  },

  {
    id: "future-continuous",
    name: "Future Continuous",
    category: "future",
    aspect: "continuous",
    tagline: "Actions that will be in progress at a specific time in the future",
    color: "#0284c7", // light blue
    badge: "Future In Progress",
    timeline: {
      type: "span-future",
      label: "Active and ongoing during a future point in time",
      position: "right"
    },
    formulas: {
      affirmative: "Subject + will be + Verb-ing",
      negative: "Subject + will not (won't) be + Verb-ing",
      interrogative: "Will + Subject + be + Verb-ing?"
    },
    formulaExamples: {
      affirmative: "This time next week, I will be relaxing on a beach.",
      negative: "She won't be using her car this weekend, so we can borrow it.",
      interrogative: "Will you be attending the seminar tomorrow?"
    },
    rules: [
      "Subject + will + be + verb with -ing.",
      "Applies when projecting yourself into a future moment and visualizing the ongoing action."
    ],
    usages: [
      {
        title: "Action In Progress at a Specific Future Moment",
        example: "At 8:00 PM tonight, we will be flying over the Atlantic.",
        explanation: "The flight will have started before 8:00 and continue after 8:00."
      },
      {
        title: "Polite Inquiries About Someone's Plans",
        example: "Will you be passing by the post office later today?",
        explanation: "A polite way to ask if someone's plans allow a small favor."
      }
    ],
    signalWords: [
      "this time tomorrow", "at [time] tomorrow", "in a few years", "during the weekend"
    ],
    commonMistakes: [
      {
        wrong: "At 10 PM tomorrow I will sleep.",
        right: "At 10 PM tomorrow I will be sleeping.",
        reason: "To express you will be in the middle of sleeping at that specific point, use Future Continuous."
      }
    ],
    quickTip: "Picture yourself in a future movie scene: what will be happening on the screen?"
  },

  {
    id: "future-perfect",
    name: "Future Perfect",
    category: "future",
    aspect: "perfect",
    tagline: "Actions that will be completed before a specific future deadline",
    color: "#a855f7", // violet
    badge: "Future Deadline",
    timeline: {
      type: "future-before-deadline",
      label: "Completed prior to a specified future deadline",
      position: "far-right"
    },
    formulas: {
      affirmative: "Subject + will have + Past Participle (V3)",
      negative: "Subject + will not (won't) have + Past Participle (V3)",
      interrogative: "Will + Subject + have + Past Participle (V3)?"
    },
    formulaExamples: {
      affirmative: "By 2028, she will have completed her medical degree.",
      negative: "I will not have finished the report by lunch time.",
      interrogative: "Will they have arrived before the ceremony begins?"
    },
    rules: [
      "Subject + will + have + Past Participle (V3).",
      "Almost always paired with a time expression starting with 'by' (by next month, by Friday, by the time...)."
    ],
    usages: [
      {
        title: "Action Completed Before a Future Deadline",
        example: "By midnight, we will have packed all the moving boxes.",
        explanation: "The packing will be 100% complete before 12:00."
      },
      {
        title: "Projected Duration Up to a Future Point",
        example: "Next month, they will have been married for 25 years.",
        explanation: "Reaching a milestone at a specific future benchmark."
      }
    ],
    signalWords: [
      "by", "by the time", "by tomorrow", "by next year", "before", "in two years' time"
    ],
    commonMistakes: [
      {
        wrong: "By next week I will finish the book.",
        right: "By next week I will have finished the book.",
        reason: "Whenever 'by' indicates a future deadline, use Future Perfect (will have + V3)."
      }
    ],
    quickTip: "Look for the magic word 'BY' + future time! That is the hallmark of the Future Perfect tense."
  },

  {
    id: "future-perfect-continuous",
    name: "Future Perfect Continuous",
    category: "future",
    aspect: "perfect-continuous",
    tagline: "Ongoing action continuing up until a future milestone with duration",
    color: "#059669", // emerald dark
    badge: "Future Duration",
    timeline: {
      type: "duration-to-future-point",
      label: "Duration continues up until a target date in the future",
      position: "center-to-far-right"
    },
    formulas: {
      affirmative: "Subject + will have been + Verb-ing",
      negative: "Subject + will not have been + Verb-ing",
      interrogative: "Will + Subject + have been + Verb-ing?"
    },
    formulaExamples: {
      affirmative: "By December, he will have been teaching here for 10 years.",
      negative: "She won't have been driving long enough to feel fully confident.",
      interrogative: "Will you have been living abroad for five years by next May?"
    },
    rules: [
      "Subject + will have been + Verb-ing.",
      "Combines a future deadline ('by...') and a duration ('for X years/months')."
    ],
    usages: [
      {
        title: "Emphasizing Future Duration to a Target Date",
        example: "By 6:00 PM, I will have been working continuously for nine hours.",
        explanation: "Highlights the ongoing endurance of an activity up to that future time."
      }
    ],
    signalWords: [
      "by... for", "by the time", "by next year", "for [duration]"
    ],
    commonMistakes: [
      {
        wrong: "Next year I will be working here for ten years.",
        right: "Next year I will have been working here for ten years.",
        reason: "When stating how long you will have been doing something by a future date, use Future Perfect Continuous."
      }
    ],
    quickTip: "Form: 'Will have been + -ing'. It measures the time accumulated by the time you reach that future date."
  }
];

export const categories = [
  { id: "all", name: "All Tenses", count: 12 },
  { id: "present", name: "Present (4)", count: 4, desc: "Current reality, habits, ongoing states & recent bridge" },
  { id: "past", name: "Past (4)", count: 4, desc: "Historical facts, finished events, interrupted stories & background" },
  { id: "future", name: "Future (4)", count: 4, desc: "Predictions, scheduled arrangements, upcoming milestones & deadlines" }
];
