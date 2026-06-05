import type { Scenario } from "./types"

export const officeScenarios: Scenario[] = [
  {
    id: "office-1",
    level: 1,
    title: "Proactive Ownership",
    principle: "1 — Own",
    description:
      "You are leading an operational project when a sudden, unpredictable supply chain disruption delays your core materials by two weeks. Your client is highly sensitive to deadlines, and your team is starting to panic.",
    sceneMetadata: {
      environment:
        "Modern open-plan office. Large project dashboard on a wall screen. Shipment warning notification flashing red.",
      cameraAngle: "Slight isometric perspective from above with slow floating movement.",
      characters: [
        {
          id: "pm",
          name: "Project Manager",
          position: "center",
          emotion: "Focused but concerned",
          animation: "idle",
          isPlayer: true,
          tone: "primary",
        },
        {
          id: "team",
          name: "Team Member",
          position: "left",
          emotion: "Nervous",
          animation: "fidget",
          tone: "rose",
        },
        {
          id: "client",
          name: "Client",
          position: "background",
          emotion: "Concerned",
          animation: "pulse",
          tone: "sky",
        },
      ],
      dialogues: [
        {
          speakerId: "team",
          type: "shout",
          lines: ["The materials are delayed by TWO WEEKS! How are we going to meet the deadline?!"],
        },
        {
          speakerId: "client",
          type: "broadcast",
          lines: ["Our launch date cannot move. We need a solution immediately."],
        },
        {
          speakerId: "pm",
          type: "thought",
          lines: ["Stay calm. Focus on what can still be controlled."],
        },
      ],
    },
    choices: [
      {
        key: "A",
        points: 10,
        text: "You immediately analyze alternative local vendors, draft an adjusted two-week workflow using assets you already have, and present this backup plan to the client along with your findings.",
      },
      {
        key: "B",
        points: 5,
        text: "You flag the delay to your client immediately, stating the facts clearly and asking them how they would like to adjust the timeline or budget.",
        feedback:
          "Sub-optimal: While honest, you are passing the burden of problem-solving back to the client. True ownership means presenting actionable solutions alongside the problem.",
      },
      {
        key: "C",
        points: 0,
        text: "You wait out the week to see if the original vendor can expedite shipping, hoping the problem resolves itself without a difficult conversation.",
        feedback:
          "Passive: This is a reactive 'wait-and-see' approach. You surrender your initiative to external circumstances and lose valuable time.",
      },
      {
        key: "D",
        points: -5,
        text: "You send an angry email to the vendor blaming them for breaching the timeline, and tell your team the project failure is entirely out of your hands.",
        feedback:
          "Worst: This shifts entirely into external blame. Venting energy on things you cannot control paralyzes your team and destroys your professional credibility.",
      },
    ],
  },
  {
    id: "office-2",
    level: 2,
    title: "Prioritization",
    principle: "2 — Prioritize",
    description:
      "It is Tuesday morning. Your primary project roadmap is due by 5:00 PM. Suddenly your inbox floods with minor notifications, and a colleague stops by for a casual, lengthy chat about an upcoming holiday party.",
    sceneMetadata: {
      environment: "Busy office desk. Multiple pop-up notifications floating in 3D space. Calendar showing a deadline countdown.",
      cameraAngle: "Medium desk-level perspective.",
      characters: [
        {
          id: "player",
          name: "You",
          position: "center",
          emotion: "Concentrated",
          animation: "idle",
          isPlayer: true,
          tone: "primary",
        },
        {
          id: "colleague",
          name: "Friendly Colleague",
          position: "right",
          emotion: "Relaxed and smiling",
          animation: "bob",
          tone: "amber",
        },
      ],
      dialogues: [
        {
          speakerId: "colleague",
          type: "speech",
          lines: ["Hey! Have you heard about the holiday party plans?"],
        },
        {
          speakerId: "player",
          type: "thought",
          lines: ["Roadmap first. Everything else can wait."],
        },
        {
          speakerId: "colleague",
          type: "broadcast",
          lines: ["12 New Emails", "5 Chat Messages", "Reminder: Submit Expense Report"],
        },
      ],
    },
    choices: [
      {
        key: "A",
        points: 10,
        text: "You pause notifications, set your status to 'Focused Work', block the next four hours for the roadmap, and schedule a brief afternoon slot for admin tasks and your colleague.",
      },
      {
        key: "B",
        points: 5,
        text: "You answer the incoming notifications first to clear your desk, chat with your colleague for 20 minutes, then rush through the roadmap in a high-stress scramble after lunch.",
        feedback:
          "Sub-optimal: You are letting short-term noise dictate your morning. You prioritize small, loud tasks over the truly impactful, quiet work.",
      },
      {
        key: "C",
        points: 0,
        text: "You try to multi-task: writing the roadmap, replying to notifications as they pop up, and carrying on the casual conversation simultaneously.",
        feedback:
          "Inefficient: Multi-tasking divides focus. It lowers the quality of your critical strategic output and drastically increases your stress levels.",
      },
      {
        key: "D",
        points: -5,
        text: "You feel overwhelmed, so you spend the morning organizing your digital archives, cleaning your workspace, and color-coding your email filters.",
        feedback:
          "Worst: This is productive procrastination. You use minor busywork to mentally escape high-priority responsibilities that require deep thought.",
      },
    ],
  },
  {
    id: "office-3",
    level: 3,
    title: "Mutual Benefit",
    principle: "3 — Collaborate",
    description:
      "You are negotiating an agreement with an independent content producer. They demand a major change to the project specifications that will require significantly more hours from you, but they cannot increase their budget.",
    sceneMetadata: {
      environment: "Meeting room with a negotiation table. Contract documents displayed holographically. A floating scales icon hovers between the two.",
      cameraAngle: "Face-to-face conversational perspective.",
      characters: [
        {
          id: "player",
          name: "You",
          position: "left",
          emotion: "Composed",
          animation: "idle",
          isPlayer: true,
          tone: "primary",
        },
        {
          id: "producer",
          name: "Content Producer",
          position: "right",
          emotion: "Slightly demanding",
          animation: "lean",
          tone: "amber",
        },
      ],
      dialogues: [
        {
          speakerId: "producer",
          type: "speech",
          lines: ["We need additional deliverables, but our budget cannot increase."],
        },
        {
          speakerId: "player",
          type: "thought",
          lines: ["There must be a solution that works for both of us."],
        },
      ],
    },
    choices: [
      {
        key: "A",
        points: 10,
        text: "You propose: 'I want to provide this extra value. Let's extend delivery by two weeks so I can fit it into my gaps, or keep the deadline and select a smaller batch of priority deliverables.'",
      },
      {
        key: "B",
        points: 5,
        text: "You agree to do all the extra work for free to keep the relationship smooth, but secretly feel exploited and rush the quality of the final assets.",
        feedback:
          "Sub-optimal: This is an imbalanced dynamic where you sacrifice your own sustainability. It breeds resentment and ultimately hurts both parties long-term.",
      },
      {
        key: "C",
        points: 0,
        text: "You stand your ground, refuse to adjust any parameters, quote your original terms rigidly, and tell them to take it or leave it.",
        feedback:
          "Inflexible: You protect your boundaries but destroy a valuable relationship instead of seeking a creative, mutually beneficial alternative.",
      },
      {
        key: "D",
        points: -5,
        text: "You write an aggressive message criticizing their professional boundaries, threaten to terminate the contract, and intentionally delay their current files.",
        feedback:
          "Worst: Driven entirely by ego, you ensure both your professional reputation and the shared project are completely ruined.",
      },
    ],
  },
  {
    id: "office-4",
    level: 4,
    title: "Active Listening",
    principle: "4 — Listen",
    description:
      "A team member comes into your office visibly distressed, drops their notebook on the desk, and sighs: 'I cannot stand how disorganized our project communication is. I feel completely disconnected and unsupported!'",
    sceneMetadata: {
      environment: "Private office. Laptop open on desk. Papers scattered. Soft lighting.",
      cameraAngle: "Intimate over-the-desk perspective.",
      characters: [
        {
          id: "member",
          name: "Distressed Team Member",
          position: "foreground",
          emotion: "Frustrated",
          animation: "fidget",
          tone: "rose",
        },
        {
          id: "player",
          name: "You",
          position: "center",
          emotion: "Attentive",
          animation: "idle",
          isPlayer: true,
          tone: "primary",
        },
      ],
      dialogues: [
        {
          speakerId: "member",
          type: "shout",
          lines: [
            "I cannot stand how disorganized our communication is!",
            "I feel completely disconnected and unsupported!",
          ],
        },
        {
          speakerId: "player",
          type: "thought",
          lines: ["Don't solve. Listen first."],
        },
        {
          speakerId: "player",
          type: "speech",
          lines: ["It sounds like you're feeling overwhelmed."],
        },
      ],
    },
    choices: [
      {
        key: "A",
        points: 10,
        text: "You close your laptop, look at them, and mirror their sentiment: 'It sounds like you feel incredibly overwhelmed and isolated right now. Is that what's happening?'",
      },
      {
        key: "B",
        points: 5,
        text: "You listen briefly, then interject: 'I understand. The exact same thing happened to me last year. Let me tell you how I solved my communication issues back then...'",
        feedback:
          "Sub-optimal: This is an autobiographical response. You filter their unique frustration through your own past, shifting the focus back to yourself.",
      },
      {
        key: "C",
        points: 0,
        text: "You immediately offer a technical fix: 'You need to adjust your notification filters, create a shared dashboard, and set up a morning sync meeting.'",
        feedback:
          "Premature Advice: You offer solutions before the person feels heard or validated. They want understanding and safety first, not a lecture on mechanics.",
      },
      {
        key: "D",
        points: -5,
        text: "You get defensive: 'We all have heavy workloads. I dealt with an escalation this morning too, but you don't see me getting upset about our tools.'",
        feedback:
          "Worst: You completely invalidate their experience, turning the interaction into a competition about who has it harder, which destroys psychological safety.",
      },
    ],
  },
  {
    id: "office-5",
    level: 5,
    title: "Continuous Renewal",
    principle: "5 — Recharge",
    description:
      "You have spent four consecutive weeks working overtime to prepare for an intense regulatory audit. You notice you are retaining less data, making simple errors, and experiencing physical exhaustion.",
    sceneMetadata: {
      environment: "Office late at night. Empty desks. Dim lighting. Clock showing 11:47 PM. Floating coffee cups and a draining energy bar.",
      cameraAngle: "Static, slightly low and heavy perspective to communicate fatigue.",
      characters: [
        {
          id: "player",
          name: "You",
          position: "center",
          emotion: "Exhausted",
          animation: "slump",
          isPlayer: true,
          tone: "primary",
        },
      ],
      dialogues: [
        {
          speakerId: "player",
          type: "thought",
          lines: ["I can't focus anymore.", "Why am I making so many mistakes?"],
        },
        {
          speakerId: "player",
          type: "broadcast",
          lines: ["Audit Preparation Deadline Tomorrow"],
        },
        {
          speakerId: "player",
          type: "whisper",
          lines: ["You need rest...", "Slow down..."],
        },
      ],
    },
    choices: [
      {
        key: "A",
        points: 10,
        text: "You design a strict renewal plan: a firm sleep window, 30 minutes of daily physical movement, and one hour completely disconnected from tech to recharge your mental baseline.",
      },
      {
        key: "B",
        points: 5,
        text: "You reduce your working hours slightly to watch television passively, but maintain poor sleeping habits and rely on convenience foods.",
        feedback:
          "Sub-optimal: This is passive distraction, not active recovery. It doesn't holistically restore your physical, mental, or cognitive health.",
      },
      {
        key: "C",
        points: 0,
        text: "You decide to push through the exhaustion. You increase your caffeine intake, buy productivity tools, and commit to studying even later into the night.",
        feedback:
          "Burnout Track: This is working harder instead of smarter. Cutting a tree with a blunt blade only results in total physical exhaustion.",
      },
      {
        key: "D",
        points: -5,
        text: "You feel overwhelmed, miss your next milestones without notice, and spend the entire weekend scrolling social media while avoiding all responsibilities.",
        feedback:
          "Worst: You swing from extreme overexertion to absolute self-abandonment, discarding long-term objectives due to a temporary lack of energy management.",
      },
    ],
  },
]

export const homeScenarios: Scenario[] = [
  {
    id: "home-1",
    level: 1,
    title: "Emotional Recovery",
    principle: "1 — Own",
    description:
      "After a grueling day at work, the Husband returns home visibly exhausted and completely silent. The Wife notices the tension and immediately starts asking questions to help, but he pulls away, wanting to be left alone in silence.",
    sceneMetadata: {
      environment: "Cozy living room at sunset. Briefcase near the entrance. Warm ambient lighting. Quiet atmosphere.",
      cameraAngle: "Slight 3D side perspective focused on the entryway and sofa area.",
      characters: [
        {
          id: "husband",
          name: "Husband",
          position: "left",
          emotion: "Exhausted, drained",
          animation: "slump",
          tone: "slate",
        },
        {
          id: "wife",
          name: "Wife",
          position: "center",
          emotion: "Concerned and caring",
          animation: "idle",
          isPlayer: true,
          tone: "primary",
        },
      ],
      dialogues: [
        {
          speakerId: "wife",
          type: "speech",
          lines: ["Hey, are you okay?", "Something happened at work?"],
        },
        {
          speakerId: "husband",
          type: "whisper",
          lines: ["I just need some quiet...", "Please, not right now."],
        },
        {
          speakerId: "husband",
          type: "thought",
          lines: ["My brain is completely overloaded.", "I need time to recover first."],
        },
      ],
    },
    choices: [
      {
        key: "A",
        points: 10,
        text: "Wife says, 'I see you had a rough day. I'm here if you want to talk, but I'll give you some space now,' while Husband promises to connect after an hour of quiet time.",
      },
      {
        key: "B",
        points: 5,
        text: "Wife stops asking questions but feels hurt and rejected, assuming the silence means the relationship is in trouble, while Husband stays isolated all night.",
        feedback:
          "Sub-optimal: You avoided a fight, but lack of understanding creates unnecessary anxiety. One needs solo processing time, while the other needs reassurance.",
      },
      {
        key: "C",
        points: 0,
        text: "Wife follows Husband around the house, demanding they open up and talk about their feelings, causing Husband to become entirely unresponsive.",
        feedback:
          "Passive: Forcing verbal expression on someone who needs internal processing causes them to retreat deeper into isolation.",
      },
      {
        key: "D",
        points: -5,
        text: "Wife screams that Husband is selfish and emotionally cold, prompting Husband to storm out of the house completely.",
        feedback:
          "Worst: Misinterpreting a need for quiet recovery as a personal attack triggers a severe cycle of pursuit and withdrawal.",
      },
    ],
  },
  {
    id: "home-2",
    level: 2,
    title: "The Art of Listening",
    principle: "2 — Prioritize",
    description:
      "The Wife comes home stressed about a difficult conflict with a coworker. As she explains the unfair situation, the Husband immediately interrupts with a step-by-step logical strategy to solve the workplace issue.",
    sceneMetadata: {
      environment: "Kitchen table during evening dinner. Coffee mugs on table. Rain visible outside the window.",
      cameraAngle: "Face-to-face conversational perspective.",
      characters: [
        {
          id: "wife",
          name: "Wife",
          position: "left",
          emotion: "Frustrated and hurt",
          animation: "fidget",
          tone: "rose",
        },
        {
          id: "husband",
          name: "Husband",
          position: "right",
          emotion: "Solution-oriented",
          animation: "lean",
          isPlayer: true,
          tone: "primary",
        },
      ],
      dialogues: [
        {
          speakerId: "wife",
          type: "speech",
          lines: ["My coworker took credit for my work again.", "Nobody even listened to my side."],
        },
        {
          speakerId: "husband",
          type: "speech",
          lines: ["Here's what you should do...", "First, document everything."],
        },
        {
          speakerId: "wife",
          type: "thought",
          lines: ["I don't need a solution right now.", "I just want someone to understand."],
        },
      ],
    },
    choices: [
      {
        key: "A",
        points: 10,
        text: "Husband stops offering advice, hugs Wife, and says, 'That sounds incredibly frustrating, tell me more,' validating the feelings first.",
      },
      {
        key: "B",
        points: 5,
        text: "Husband listens quietly but looks restless, waiting for Wife to finish talking so he can suggest a quick, practical fix.",
        feedback:
          "Sub-optimal: You offered physical presence, but your mental impatience shows you value fixing problems over connecting emotionally.",
      },
      {
        key: "C",
        points: 0,
        text: "Husband says, 'You are overreacting, just ignore the coworker and do your job,' dismissing the emotional distress completely.",
        feedback:
          "Passive: Minimizing someone's emotional experience makes them feel invalidated, isolated, and unheard in their own home.",
      },
      {
        key: "D",
        points: -5,
        text: "Husband blames Wife for the conflict, explaining exactly what she did wrong to cause the situation.",
        feedback:
          "Worst: Offering unsolicited criticism when your partner seeks empathy changes your role from a supportive ally to an adversary.",
      },
    ],
  },
  {
    id: "home-3",
    level: 3,
    title: "Healthy Independence",
    principle: "3 — Collaborate",
    description:
      "The relationship has been wonderful, but suddenly the Husband becomes distant and needs emotional distance. The Wife immediately feels a drop in self-esteem, panics, and tries to force deep intimacy.",
    sceneMetadata: {
      environment: "Modern home. Husband reading quietly on the balcony while Wife remains inside looking worried.",
      cameraAngle: "Wide split-scene showing emotional distance between both characters.",
      characters: [
        {
          id: "husband",
          name: "Husband",
          position: "right",
          emotion: "Reflective",
          animation: "idle",
          tone: "slate",
        },
        {
          id: "wife",
          name: "Wife",
          position: "left",
          emotion: "Anxious",
          animation: "fidget",
          isPlayer: true,
          tone: "primary",
        },
      ],
      dialogues: [
        {
          speakerId: "wife",
          type: "speech",
          lines: ["Have I done something wrong?", "Why are you pulling away?"],
        },
        {
          speakerId: "husband",
          type: "whisper",
          lines: ["I just need some space.", "It isn't about you."],
        },
        {
          speakerId: "wife",
          type: "thought",
          lines: ["What if they don't love me anymore?"],
        },
      ],
    },
    choices: [
      {
        key: "A",
        points: 10,
        text: "Wife maintains her own hobbies and friends, allowing Husband space to pull away and naturally spring back with renewed affection.",
      },
      {
        key: "B",
        points: 5,
        text: "Wife asks for reassurance once, then anxiously waits around the house for Husband to return to normal behavior.",
        feedback:
          "Sub-optimal: You gave physical space, but internal panic prevents you from living your life independently during your partner's natural cycle.",
      },
      {
        key: "C",
        points: 0,
        text: "Wife punishes the distance by acting cold and distant in return, creating a wall of silent resentment between both people.",
        feedback:
          "Passive: Tit-for-tat emotional withdrawal creates artificial distance, blocking the natural urge to snap back together.",
      },
      {
        key: "D",
        points: -5,
        text: "Wife demands to know why the love has changed, accuses Husband of cheating, and tracks their every move.",
        feedback:
          "Worst: Chasing someone who needs temporary distance pushes them away permanently and destroys the foundational trust of the relationship.",
      },
    ],
  },
  {
    id: "home-4",
    level: 4,
    title: "Understanding Communication Styles",
    principle: "4 — Listen",
    description:
      "Planning a home renovation, the Wife exclaims, 'We never finish anything on time, and our house is a total disaster zone!' The Husband takes this literally, gets highly defensive, and pulls out past completion receipts.",
    sceneMetadata: {
      environment: "Home renovation area. Paint cans, tools, unfinished shelves, and renovation plans spread across a table.",
      cameraAngle: "Slightly elevated perspective focusing on both partners and the renovation mess.",
      characters: [
        {
          id: "wife",
          name: "Wife",
          position: "center",
          emotion: "Overwhelmed",
          animation: "fidget",
          tone: "rose",
        },
        {
          id: "husband",
          name: "Husband",
          position: "right",
          emotion: "Defensive",
          animation: "lean",
          isPlayer: true,
          tone: "primary",
        },
      ],
      dialogues: [
        {
          speakerId: "wife",
          type: "shout",
          lines: ["We NEVER finish anything on time!", "This house is a disaster zone!"],
        },
        {
          speakerId: "husband",
          type: "speech",
          lines: ["That's not true.", "Look at these receipts."],
        },
        {
          speakerId: "wife",
          type: "thought",
          lines: ["I don't mean it literally.", "I'm just overwhelmed."],
        },
      ],
    },
    choices: [
      {
        key: "A",
        points: 10,
        text: "Husband realizes this is a dramatic expression of current overwhelm, ignores the literal words, and says, 'I know it feels chaotic right now, let's take a break.'",
      },
      {
        key: "B",
        points: 5,
        text: "Husband stays quiet but logs the comment as an unfair accusation, feeling deeply unappreciated for the hard work he has done.",
        feedback:
          "Sub-optimal: You avoided an argument, but taking emotional hyperbole literally breeds internal resentment and silent anger.",
      },
      {
        key: "C",
        points: 0,
        text: "Husband corrects the facts immediately, saying, 'That is a lie, we finished the kitchen exactly on schedule last year.'",
        feedback:
          "Passive: Debating literal facts during an emotional venting session makes your partner feel dismissed and completely misunderstood.",
      },
      {
        key: "D",
        points: -5,
        text: "Husband snaps back, 'If the house is a disaster, it's because you waste money and cannot manage your time properly!'",
        feedback:
          "Worst: Turning an expression of emotional stress into a personal scoreboard argument escalates a simple complaint into an all-out war.",
      },
    ],
  },
  {
    id: "home-5",
    level: 5,
    title: "Clear Requests & Cooperation",
    principle: "5 — Recharge",
    description:
      "The Wife feels completely overwhelmed by managing household chores alone. Instead of asking for help directly, she drops subtle hints, sighs loudly while cleaning, and expects the Husband to just notice and assist.",
    sceneMetadata: {
      environment: "Busy kitchen. Dirty dishes in the sink. Laundry basket nearby. Evening meal preparation underway.",
      cameraAngle: "Medium perspective showing both characters in the same room but mentally disconnected.",
      characters: [
        {
          id: "wife",
          name: "Wife",
          position: "left",
          emotion: "Frustrated and exhausted",
          animation: "fidget",
          isPlayer: true,
          tone: "primary",
        },
        {
          id: "husband",
          name: "Husband",
          position: "right",
          emotion: "Relaxed and unaware",
          animation: "idle",
          tone: "slate",
        },
      ],
      dialogues: [
        {
          speakerId: "wife",
          type: "whisper",
          lines: ["sigh", "Must be nice having nothing to do..."],
        },
        {
          speakerId: "wife",
          type: "thought",
          lines: ["Why don't they notice?", "Why do I always have to do everything?"],
        },
        {
          speakerId: "husband",
          type: "speech",
          lines: ["Everything okay?", "You seem upset."],
        },
      ],
    },
    choices: [
      {
        key: "A",
        points: 10,
        text: "Wife approaches Husband directly and says, 'Would you please take out the trash and clean the kitchen counters before dinner?'",
      },
      {
        key: "B",
        points: 5,
        text: "Wife asks, 'Could you help around here sometime?' leaving the request vague, confusing, and completely open to interpretation.",
        feedback:
          "Sub-optimal: You spoke up, but vague requests invite vague results. Clear, brief, and direct invitations work best.",
      },
      {
        key: "C",
        points: 0,
        text: "Wife keeps doing all the work silently, growing angrier by the minute, waiting for Husband to magically volunteer.",
        feedback:
          "Passive: Expecting a partner to read your mind leads directly to bitterness. People cannot fix problems they do not know exist.",
      },
      {
        key: "D",
        points: -5,
        text: "Wife slams a dirty dish down and yells, 'You are incredibly lazy! You just sit there while I do absolutely everything!'",
        feedback:
          "Worst: Exploding after holding silent resentment shocks your partner and turns an unspoken need into a painful, defensive confrontation.",
      },
    ],
  },
]
