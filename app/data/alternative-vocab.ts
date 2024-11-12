interface AlternativeExample {
  example: string;
  audioUrl: string;
}

interface AlternativeVocabulary {
  phrase: string;
  alternatives: AlternativeExample[];
}

// Mock data structure for alternative-vocab.ts
export const alternativeVocab: Record<string, AlternativeVocabulary[]> = {
  'offering-help': [
    {
      phrase: "Is there anything I can help you with?",
      alternatives: [
        { example: "Would you like a hand with anything?", audioUrl: "/audio/alt1.mp3" },
        { example: "Is there something you’d like assistance with?", audioUrl: "/audio/alt2.mp3" },
        { example: "Can I support you with anything at the moment?", audioUrl: "/audio/alt3.mp3" }
      ]
    },
    {
      phrase: "I can easily do that",
      alternatives: [
        { example: "That's no problem at all—I can take care of it.", audioUrl: "/audio/alt4.mp3" },
        { example: "I’d be happy to handle that for you.", audioUrl: "/audio/alt5.mp3" },
        { example: "Consider it done—I've got it covered.", audioUrl: "/audio/alt6.mp3" }
      ]
    },
    {
      phrase: "Would you? That would be wonderful",
      alternatives: [
        { example: "Really? That would be fantastic!", audioUrl: "/audio/alt7.mp3" },
        { example: "Would you mind? That would be amazing!", audioUrl: "/audio/alt8.mp3" },
        { example: "Oh, would you? That would be such a big help!", audioUrl: "/audio/alt9.mp3" }
      ]
    },
    {
      phrase: "I can certainly handle that",
      alternatives: [
        { example: "I’d be more than happy to take care of that.", audioUrl: "/audio/alt10.mp3" },
        { example: "I can absolutely take that on.", audioUrl: "/audio/alt11.mp3" },
        { example: "I’m fully prepared to manage that.", audioUrl: "/audio/alt12.mp3" }
      ]
    },
    {
      phrase: "Don't worry, I'll handle it",
      alternatives: [
        { example: "No need to stress—I’ve got this covered.", audioUrl: "/audio/alt1.mp13" },
        { example: "Leave it to me; I’ll take care of everything.", audioUrl: "/audio/alt14.mp3" },
        { example: "Rest assured, I’ll look after it.", audioUrl: "/audio/alt15.mp3" }
      ]
    },
    {
      phrase: "I owe you one",
      alternatives: [
        { example: "Thanks a lot!", audioUrl: "/audio/alt16.mp3" },
        { example: "I owe you big time", audioUrl: "/audio/alt17.mp3" },
        { example: "You’re a lifesaver!", audioUrl: "/audio/alt18.mp3" }
      ]
    },
    
  ]
};