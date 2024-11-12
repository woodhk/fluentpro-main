interface DialogueLine {
  speaker: string;
  text: string;
}

interface KeyVocabulary {
  word: string;
  context: string;
}

export interface ScenarioData {
  lessonTitle: string;
  introduction: {
    text: string;
    image: string;
  };
  skillsAim: {
    points: string[];
    image: string;
  };
  languageLearningAim: {
    points: string[];
    image: string;
  };
  dialogue: DialogueLine[];
  keyVocabulary: KeyVocabulary[];
}

export const scenarios: Record<string, ScenarioData> = {
  'offering-help': {
    lessonTitle: 'Offering Help',
    introduction: {
      text: `At work, people often offer to do things for others. It's important to know how to make offers in different business situations.
It's also important to know how to respond to offers in the right manner, using appropriate language.
You should be able to offer help in a way that is polite and friendly. You should also know how to accept or decline an offer of help.
In offering, accepting or declining help, the right tone is very important. What you say is sometimes not as important as how you say it. Tone adds a lot to the meaning of your words. While the right tone can help you make positive business relationships, using the wrong tone can offend others.
In this lesson, we will look at a few ways to offer, accept and decline help in words that are friendly and polite.`,
      image: '/icons/scenario1.png'
    },
    skillsAim: {
      points: [
        'Develop the ability to offer help in a polite and professional manner in various workplace situations.',
        'Learn to accept and decline help with appropriate language and tone.',
        'Practice strategies for responding to offers in a way that fosters positive workplace relationships.'
      ],
      image: '/icons/scenario2.png'
    },
    languageLearningAim: {
      points: [
        'Enhance vocabulary and expressions related to offering, accepting, and declining help.',
        'Improve skills in using polite, friendly language to convey offers of help.',
        'Develop listening and speaking skills for responding to offers while maintaining a positive and respectful tone.'
      ],
      image: '/icons/scenario3.png'
    },
    dialogue: [
      { speaker: 'Jerry', text: 'How are things with you, Elaine?' },
      { speaker: 'Elaine', text: 'Fine, thanks, Jerry.' },
      { speaker: 'Jerry', text: "You look a little worried, if you don't mind my saying so." },
      { speaker: 'Elaine', text: "Not at all. I'm just not feeling on top of things at the moment." },
      { speaker: 'Jerry', text: "I'm sorry to hear that. Is there anything I can help you with?" },
      { speaker: 'Elaine', text: "I'm not sure if you can. I need to leave work early today, and I can't find anyone to take over my shift." },
      { speaker: 'Jerry', text: "Well, I can easily do that. My shift ends in the afternoon, and I don't have any plans for the evening." },
      { speaker: 'Elaine', text: 'Oh, would you? That would be wonderful.' },
      { speaker: 'Jerry', text: 'No problem. Just tell me what I need to do.' },
      { speaker: 'Elaine', text: "You just have to attend to the phone, and make one follow-up call to a client, Ms Thompson, about her policy." },
      { speaker: 'Jerry', text: 'I can certainly handle that. Do you have her details?' },
      { speaker: 'Elaine', text: "Yes, they're in this file over here, and also in the database. Sylvia Thompson, with a 'P'." },
      { speaker: 'Jerry', text: "Great. Don't worry, I'll handle it. It's a policy renewal, I presume?" },
      { speaker: 'Elaine', text: "Yes. She's expecting a call in the evening, around 5 p.m. or so." },
      { speaker: 'Jerry', text: 'Consider it done. Anything else I should keep in mind?' },
      { speaker: 'Elaine', text: "One Mr McGregor may call about his premium – he's in two minds about whether to renew it." },
      { speaker: 'Jerry', text: "Ah, one of those! Don't worry, I can handle it." },
      { speaker: 'Elaine', text: 'Thanks so much for doing this, Jerry. I owe you one.' },
      { speaker: 'Jerry', text: 'No problem. You can do the same for me if I need it!' },
      { speaker: 'Elaine', text: 'Of course! Please let me know any time if I can return the favour.' }
    ],
    keyVocabulary: [
      {
        word: "Is there anything I can help you with?",
        context: "A polite way to offer general assistance"
      },
      {
        word: "I can easily do that",
        context: "Expressing willingness and ability to help"
      },
      {
        word: "Would you? That would be wonderful",
        context: "Expressing gratitude and appreciation for an offer"
      },
      {
        word: "I can certainly handle that",
        context: "Showing confidence in ability to help"
      },
      {
        word: "Don't worry, I'll handle it",
        context: "Reassuring someone about taking responsibility"
      },
      {
        word: "I owe you one",
        context: "Expressing gratitude and acknowledging a debt of favor"
      }
    ]
  },
  'refusing-accepting-a-business-invitation': {
    lessonTitle: 'Refusing Accepting a Business Invitation',
    introduction: {
      text: "Accepting an invitation is easy. Refusing an invitation is more difficult. In business situations, it's particularly important to know how to refuse an invitation politely so you don't cause offence to the person who is inviting you.",
      image: '/icons/scenario1.png'
    },
    skillsAim: {
      points: [
        'Develop the ability to accept and refuse business invitations professionally and politely.',
        'Learn how to make polite excuses to decline invitations without causing offense.',
        'Practice creating and responding to informal and formal invitations in a business context.'
      ],
      image: '/icons/scenario2.png'
    },
    languageLearningAim: {
      points: [
        'Enhance vocabulary and phrases related to making, accepting, and declining business invitations.',
        'Improve the ability to use polite language for invitations and refusals in various business situations.',
        'Develop skills in framing responses to maintain professionalism and positive relationships during social interactions.'
      ],
      image: '/icons/scenario3.png'
    },
    dialogue: [],
    keyVocabulary: []
  }
};