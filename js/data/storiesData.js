/**
 * Stories & Situational Telling Dataset
 * Interactive narrative scenarios where learners master tenses by telling and continuing stories.
 */

export const storiesData = [
  {
    id: "detective-mystery",
    title: "The Midnight Museum Mystery",
    subtitle: "Master Past Simple, Past Continuous & Past Perfect",
    targetTenses: ["Past Simple", "Past Continuous", "Past Perfect"],
    icon: "🕵️‍♂️",
    color: "#6366f1",
    intro: "It was a stormy November midnight at the Royal Art Museum. Detective Miller arrived at the scene. Help tell what happened by choosing or speaking the correct tense.",
    scenes: [
      {
        id: "s1",
        narrationBefore: "Detective Miller stepped into the grand gallery. Rain beat against the stained glass windows.",
        prompt: "While the security guard __________ in the lobby, the burglar silently cut through the glass roof.",
        options: ["was snoozing", "snoozed", "had snoozed", "has snoozed"],
        correctIndex: 0,
        acceptedPhrases: ["was snoozing", "snoozing"],
        tenseUsed: "Past Continuous",
        tenseReason: "We use Past Continuous ('was snoozing') for the longer ongoing background activity that was taking place when the sudden event occurred.",
        fullSentence: "While the security guard was snoozing in the lobby, the burglar silently cut through the glass roof."
      },
      {
        id: "s2",
        narrationBefore: "Miller examined the empty marble pedestal where the 300-year-old diamond had been placed.",
        prompt: "By the time the museum alarm sounded, the thief __________ with the priceless jewel.",
        options: ["had vanished", "vanished", "was vanishing", "has vanished"],
        correctIndex: 0,
        acceptedPhrases: ["had vanished", "vanished"],
        tenseUsed: "Past Perfect",
        tenseReason: "The vanishing happened *before* the alarm sounded (past before past), which requires the Past Perfect ('had vanished').",
        fullSentence: "By the time the museum alarm sounded, the thief had vanished with the priceless jewel."
      },
      {
        id: "s3",
        narrationBefore: "Miller crouched down and discovered a wet footprint near the fire escape.",
        prompt: "Suddenly, Miller __________ a mysterious gold key lying under the antique velvet curtain.",
        options: ["noticed", "was noticing", "had noticed", "notices"],
        correctIndex: 0,
        acceptedPhrases: ["noticed", "notice"],
        tenseUsed: "Past Simple",
        tenseReason: "A sudden, completed chronological event in a narrative uses Past Simple ('noticed'). 'Notice' is also a perception verb rarely used continuously.",
        fullSentence: "Suddenly, Miller noticed a mysterious gold key lying under the antique velvet curtain."
      },
      {
        id: "s4",
        narrationBefore: "With the key in hand, Miller dashed toward the basement vault.",
        prompt: "The suspect was exhausted because he __________ heavy antique statues down the stairs for over an hour.",
        options: ["had been hauling", "was hauling", "hauled", "has hauled"],
        correctIndex: 0,
        acceptedPhrases: ["had been hauling", "been hauling"],
        tenseUsed: "Past Perfect Continuous",
        tenseReason: "Focuses on the continuous duration ('for over an hour') of the physical effort that caused his past exhaustion.",
        fullSentence: "The suspect was exhausted because he had been hauling heavy antique statues down the stairs for over an hour."
      }
    ],
    conclusion: "Case closed! With your expert storytelling and sharp tense selection, Detective Miller caught the thief red-handed before sunrise!"
  },

  {
    id: "mars-expedition",
    title: "Mission to Mars 2045",
    subtitle: "Master Future Simple, Future Continuous & Future Perfect",
    targetTenses: ["Future Simple", "Future Continuous", "Future Perfect", "Future Perfect Continuous"],
    icon: "🚀",
    color: "#f97316",
    intro: "Humans are about to become a multi-planetary species. Follow Commander Sarah and the Ares VII crew as they journey toward the red planet.",
    scenes: [
      {
        id: "m1",
        narrationBefore: "Ground Control initiates the launch countdown in Houston.",
        prompt: "Don't worry Commander, our propulsion system __________ automatically if pressure rises.",
        options: ["will recalibrate", "recalibrates", "will be recalibrating", "will have recalibrated"],
        correctIndex: 0,
        acceptedPhrases: ["will recalibrate", "recalibrate"],
        tenseUsed: "Future Simple",
        tenseReason: "Expresses a reassuring promise/prediction with 'will' + base verb.",
        fullSentence: "Don't worry Commander, our propulsion system will recalibrate automatically if pressure rises."
      },
      {
        id: "m2",
        narrationBefore: "The spacecraft enters the interplanetary transfer orbit.",
        prompt: "This time next month, the Ares VII crew __________ through deep space toward Mars.",
        options: ["will be cruising", "will cruise", "cruises", "will have cruised"],
        correctIndex: 0,
        acceptedPhrases: ["will be cruising", "be cruising"],
        tenseUsed: "Future Continuous",
        tenseReason: "'This time next month' indicates an action that will be actively in mid-progress in the future.",
        fullSentence: "This time next month, the Ares VII crew will be cruising through deep space toward Mars."
      },
      {
        id: "m3",
        narrationBefore: "Sarah checks the mission timeline display on the cockpit glass.",
        prompt: "By October 2046, the robotic rovers __________ the subterranean water reservoir.",
        options: ["will have mapped", "will map", "will be mapping", "have mapped"],
        correctIndex: 0,
        acceptedPhrases: ["will have mapped", "have mapped"],
        tenseUsed: "Future Perfect",
        tenseReason: "'By October 2046' is a future deadline benchmark before which the mapping will be 100% completed.",
        fullSentence: "By October 2046, the robotic rovers will have mapped the subterranean water reservoir."
      },
      {
        id: "m4",
        narrationBefore: "After years of scientific research, the first permanent dome colony is established.",
        prompt: "By the fifth anniversary of landing, the botanists __________ vegetables inside the biodome for five full years.",
        options: ["will have been growing", "will grow", "will be growing", "are growing"],
        correctIndex: 0,
        acceptedPhrases: ["will have been growing", "have been growing"],
        tenseUsed: "Future Perfect Continuous",
        tenseReason: "Measures the accumulated duration ('for five full years') up to that future milestone.",
        fullSentence: "By the fifth anniversary of landing, the botanists will have been growing vegetables inside the biodome for five full years."
      }
    ],
    conclusion: "Spectacular flight! You told the story of humankind's greatest adventure using accurate future tense grammar!"
  },

  {
    id: "daily-tokyo",
    title: "A Day in Tokyo with Kenji",
    subtitle: "Master Present Simple, Present Continuous & Present Perfect",
    targetTenses: ["Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous"],
    icon: "🗾",
    color: "#06b6d4",
    intro: "Step into the vibrant streets of Shibuya, Tokyo. Tell the story of Kenji, a game designer navigating his daily routine and latest game launch.",
    scenes: [
      {
        id: "t1",
        narrationBefore: "The morning sun rises over the neon towers of Shinjuku.",
        prompt: "Every weekday morning, Kenji __________ matcha tea and catches the 7:15 AM commuter train.",
        options: ["sips", "is sipping", "has sipped", "sip"],
        correctIndex: 0,
        acceptedPhrases: ["sips", "sip"],
        tenseUsed: "Present Simple",
        tenseReason: "'Every weekday morning' describes a regular habitual routine, which takes Present Simple (3rd person -s: 'sips').",
        fullSentence: "Every weekday morning, Kenji sips matcha tea and catches the 7:15 AM commuter train."
      },
      {
        id: "t2",
        narrationBefore: "He arrives at his gaming studio. Colleagues are gathered around the central projection screen.",
        prompt: "Look! The lead artist __________ the character animations right now on the big monitor.",
        options: ["is testing", "tests", "tested", "has tested"],
        correctIndex: 0,
        acceptedPhrases: ["is testing", "testing"],
        tenseUsed: "Present Continuous",
        tenseReason: "'Look!' and 'right now' denote an active event currently happening right before our eyes.",
        fullSentence: "Look! The lead artist is testing the character animations right now on the big monitor."
      },
      {
        id: "t3",
        narrationBefore: "The director walks in with news about international pre-orders.",
        prompt: "Over 500,000 players __________ our demo version so far!",
        options: ["have downloaded", "downloaded", "are downloading", "download"],
        correctIndex: 0,
        acceptedPhrases: ["have downloaded", "downloaded"],
        tenseUsed: "Present Perfect",
        tenseReason: "'So far' indicates a quantity accumulated from the past up to the present moment.",
        fullSentence: "Over 500,000 players have downloaded our demo version so far!"
      },
      {
        id: "t4",
        narrationBefore: "Evening settles as the team celebrates at a cozy ramen restaurant.",
        prompt: "Kenji is smiling proudly because he __________ on this virtual reality world for three years.",
        options: ["has been working", "works", "is working", "worked"],
        correctIndex: 0,
        acceptedPhrases: ["has been working", "been working"],
        tenseUsed: "Present Perfect Continuous",
        tenseReason: "Highlights the ongoing continuous duration ('for three years') connecting right into the present moment.",
        fullSentence: "Kenji is smiling proudly because he has been working on this virtual reality world for three years."
      }
    ],
    conclusion: "Subarashii! You brought Kenji's Tokyo day to life with vivid present tense storytelling!"
  }
];

export const tellingPrompts = [
  {
    id: "p1",
    title: "Tell Your Morning Story",
    tensesRequired: ["Past Simple", "Past Continuous", "Present Simple"],
    guide: "Tell 3 sentences: (1) One action in progress when something happened, (2) What happened next, and (3) What you always do every morning.",
    sample: "I was drinking coffee when my cat knocked over a vase. I cleaned it up quickly. Now I always keep my cups on the desk."
  },
  {
    id: "p2",
    title: "Tell Your 2030 Future Story",
    tensesRequired: ["Future Simple", "Future Continuous", "Future Perfect"],
    guide: "Tell 3 sentences: (1) A spontaneous prediction, (2) What you will be doing on an ordinary day in 2030, (3) What you will have achieved by then.",
    sample: "I think technology will cure many diseases. In 2030, I will be living by the ocean. By then, I will have written my first book."
  },
  {
    id: "p3",
    title: "Tell a Life Milestone Story",
    tensesRequired: ["Present Perfect", "Past Simple", "Present Perfect Continuous"],
    guide: "Tell 3 sentences: (1) A country or experience you have done in your life, (2) When you did it, (3) A hobby you have been practicing for years.",
    sample: "I have visited France twice. In 2022, I climbed the Eiffel Tower. I have been studying French for four years."
  }
];
