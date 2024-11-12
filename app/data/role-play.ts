interface ResponseInstruction {
  head: string;
  detailed: string;
  suggestions: string[];
  tip: string;
}

interface DialogueLine {
  speaker: string;
  text: string;
}

interface RolePlayData {
  contextSummary: string;
  userPrompts: ResponseInstruction[];
  dialogue: DialogueLine[]; // Added dialogue property
}

export const rolePlayData: Record<string, RolePlayData> = {
  'offering-help': {
    contextSummary:
      "You are a marketing executive at a telecommunications firm, needing to leave work early due to personal reasons. A colleague, Jerry, notices that you seem concerned and offers to assist by covering your shift. During the conversation, you discuss the tasks he will need to handle in your absence, including attending to calls, following up with a client, and potentially handling an inquiry about a policy renewal. This scenario emphasizes the importance of tone and phrasing when offering, accepting, or declining help, as well as showing appreciation for assistance provided.",
    userPrompts: [
      {
        head: "Greet and inquire about Elaine's well-being",
        detailed:
          "Start by greeting Elaine in a friendly manner and asking her how she is doing to show concern and initiate a supportive conversation.",
        suggestions: [
          "How's everything going, Elaine?",
          "How have you been, Elaine?",
          "How's your day been so far, Elaine?",
          "How are things on your end, Elaine?",
          "How's it all going for you, Elaine?",
        ],
        tip: "Start with a friendly and genuine greeting to set a supportive tone.",
      },
      {
        head: "Notice Elaine seems worried",
        detailed:
          "Politely mention that Elaine looks concerned, using a gentle phrase to acknowledge her feelings without intruding. This shows that you're attentive and considerate.",
        suggestions: [
          "You seem a bit concerned; is everything okay?",
          "You look like something's on your mind—is there anything up?",
          "I couldn't help noticing you seem a bit preoccupied.",
          "You look like you've got something on your mind; hope all is well?",
          "I sense you might be a little stressed—is everything alright?",
        ],
        tip: "Use gentle language to express concern without sounding intrusive.",
      },
      {
        head: "Offer to help",
        detailed:
          "Express sympathy for Elaine's situation and follow it up with an open-ended offer to assist. Keep the offer genuine and use a phrase like, 'Is there anything I can help you with?'",
        suggestions: [
          "That sounds tough. Can I give you a hand with anything?",
          "I'm sorry to hear you're dealing with that. Is there any way I can assist?",
          "That doesn't sound easy. Let me know if I can help in any way.",
          "I can imagine that's stressful. Can I help out with something?",
          "I'm here to help if there's anything you need support with.",
        ],
        tip: "Follow expressions of sympathy with an offer to help to show you're ready to support.",
      },
      {
        head: "Offer to cover her shift",
        detailed:
          "After Elaine mentions needing to leave work, volunteer to cover her shift. Use reassuring language and mention that you're available and willing to help since you don't have other plans.",
        suggestions: [
          "I can take over for you—I'm free after my shift this afternoon.",
          "I'd be happy to cover your shift; I don't have anything going on later.",
          "No worries; I can handle it since I'm free after my shift.",
          "I've got time after my shift, so I can step in for you if needed.",
          "I'm available after my shift, so I can definitely cover for you.",
        ],
        tip: "Clearly mention your availability to reassure the other person that you're ready to help.",
      },
      {
        head: "Accept her thanks and ask what needs to be done",
        detailed:
          "Reassure Elaine that it's no trouble for you to help and ask her to clarify the tasks she needs you to handle during her shift.",
        suggestions: [
          "No worries at all. Let me know what you need me to handle.",
          "Happy to help. Just fill me in on what's needed.",
          "It's no trouble. What tasks should I take care of?",
          "My pleasure. Just walk me through what needs doing.",
          "No problem at all. Could you brief me on the tasks?",
        ],
        tip: "Use a casual tone to downplay the favor, making it feel like a natural part of teamwork.",
      },
      {
        head: "Confirm willingness to handle specific task",
        detailed:
          "Show confidence in handling the task Elaine has described. Politely ask if she has the details available to ensure you have the information you need.",
        suggestions: [
          "I can take care of that. Do you have her contact information?",
          "I'll handle it for sure. Can you pass along her details?",
          "That's easy enough. Could you share her info with me?",
          "I've got it covered. Do you have her information handy?",
          "No problem at all. Could you give me her contact details?",
        ],
        tip: "Reassure the person by confidently confirming your readiness to help with specifics.",
      },
      {
        head: "Assure Elaine that you'll handle it and confirm task specifics",
        detailed:
          "Confirm that you're ready to take on the task and clarify any details if necessary, showing that you're committed to managing it efficiently.",
        suggestions: [
          "Got it. Leave it with me—I assume it's a policy renewal?",
          "I'll take care of it. Just to confirm, it's for a policy renewal, right?",
          "No worries; I'll manage it. Is it a renewal, just to clarify?",
          "All good—I'll handle it. And this is a policy renewal, correct?",
          "Consider it done. Just to confirm, is it related to the policy renewal?",
        ],
        tip: "Asking for clarification shows attention to detail and ensures accuracy in your assistance.",
      },
      {
        head: "Confirm readiness and ask if there's anything else",
        detailed:
          "Reassure Elaine by affirming your understanding of the task and ask if there are any other responsibilities she'd like you to be aware of.",
        suggestions: [
          "It's taken care of. Is there anything else I need to know?",
          "You can count on me. Any other details I should be aware of?",
          "I've got it covered. Is there anything else you'd like me to handle?",
          "Done and done. Anything else you want me to keep track of?",
          "You can leave it with me. Is there anything else I should know?",
        ],
        tip: "Reconfirm your readiness and invite additional details to cover all bases.",
      },
      {
        head: "Respond with confidence and reassure Elaine",
        detailed:
          "Lightly acknowledge that you're experienced with handling similar situations, and reassure her that she can count on you to manage it without issue.",
        suggestions: [
          "Ah, I get it! No worries; I've got this.",
          "Oh, I know the type! Don't worry, I'll manage.",
          "Ah, one of those cases—no problem, I can take care of it.",
          "I see; that's no issue. I'll handle it for you.",
          "Got it! Leave it to me; I can take care of it.",
        ],
        tip: "Show confidence to reassure the person that they can rely on you.",
      },
      {
        head: "Acknowledge her thanks and mention she can return the favor",
        detailed:
          "Express that it's no problem for you to help and mention that she could reciprocate in the future if needed. Keep the tone friendly and appreciative.",
        suggestions: [
          "Anytime! Feel free to return the favor down the line.",
          "Happy to help. Maybe you can help me out one day too!",
          "It's a pleasure. You can return the favor when I need it!",
          "No worries! Just let me know if I need a hand sometime.",
          "My pleasure. You'll do the same for me if the time comes!",
        ],
        tip: "Mentioning reciprocation lightens the mood and builds rapport.",
      },
    ],
    dialogue: [
      { speaker: "You", text: "How are things with you, Elaine?" },
      { speaker: "Elaine", text: "Fine, thanks, Jerry." },
      {
        speaker: "You",
        text: "You look a little worried, if you don’t mind my saying so.",
      },
      {
        speaker: "Elaine",
        text: "Not at all. I’m just not feeling on top of things at the moment.",
      },
      {
        speaker: "You",
        text: "I’m sorry to hear that. Is there anything I can help you with?",
      },
      {
        speaker: "Elaine",
        text: "I’m not sure if you can. I need to leave work early today, and I can’t find anyone to take over my shift.",
      },
      {
        speaker: "You",
        text: "Well, I can easily do that. My shift ends in the afternoon, and I don’t have any plans for the evening.",
      },
      {
        speaker: "Elaine",
        text: "Oh, would you? That would be wonderful.",
      },
      {
        speaker: "You",
        text: "No problem. Just tell me what I need to do.",
      },
      {
        speaker: "Elaine",
        text: "You just have to attend to the phone, and make one follow-up call to a client, Ms Thompson, about her policy.",
      },
      {
        speaker: "You",
        text: "I can certainly handle that. Do you have her details?",
      },
      {
        speaker: "Elaine",
        text: "Yes, they’re in this file over here, and also in the database. Sylvia Thompson, with a ‘P’.",
      },
      {
        speaker: "You",
        text: "Great. Don’t worry, I’ll handle it. It’s a policy renewal, I presume?",
      },
      {
        speaker: "Elaine",
        text: "Yes. She’s expecting a call in the evening, around 5 p.m. or so.",
      },
      {
        speaker: "You",
        text: "Consider it done. Anything else I should keep in mind?",
      },
      {
        speaker: "Elaine",
        text: "One Mr McGregor may call about his premium – he’s in two minds about whether to renew it.",
      },
      {
        speaker: "You",
        text: "Ah, one of those! Don’t worry, I can handle it.",
      },
      {
        speaker: "Elaine",
        text: "Thanks so much for doing this, Jerry. I owe you one.",
      },
      {
        speaker: "You",
        text: "No problem. You can do the same for me if I need it!",
      },
      {
        speaker: "Elaine",
        text: "Of course! Please let me know any time if I can return the favour.",
      },
    ],
  },
};