
export interface Employee {
  id: number;
  name: string;
  role: string;
  proficiency: string;
  industryStandard: string;
}

export interface ProficiencyLevel {
  ielts: string;
  cefr: string;
  description: string;
  details: {
    listening: string;
    reading: string;
    speaking: string;
    writing: string;
  };
}

// proficiencyData.ts
export const proficiencyMapping: Record<string, ProficiencyLevel> = {
  '0': {
    ielts: '-',
    cefr: 'A1',
    description: 'Beginner',
    details: {
      listening: 'Can understand basic greetings and simple phrases',
      reading: 'Can recognize familiar words and basic phrases',
      speaking: 'Can introduce themselves and others',
      writing: 'Can write simple isolated phrases and sentences'
    }
  },
  '1-': {
    ielts: '2.0',
    cefr: 'A2',
    description: 'Elementary',
    details: {
      listening: 'Can understand phrases and common vocabulary',
      reading: 'Can read short simple texts',
      speaking: 'Can communicate in simple routine tasks',
      writing: 'Can write short simple notes and messages'
    }
  },
  '1=': {
    ielts: '2.5',
    cefr: 'A2',
    description: 'Elementary',
    details: {
      listening: 'Can understand main points in simple messages',
      reading: 'Can understand basic texts and find information',
      speaking: 'Can describe aspects of background and environment',
      writing: 'Can write personal letters describing experiences'
    }
  },
  '1+': {
    ielts: '3.0',
    cefr: 'A2',
    description: 'Elementary',
    details: {
      listening: 'Can understand clear directions and instructions',
      reading: 'Can understand routine information and articles',
      speaking: 'Can handle basic social interactions',
      writing: 'Can write basic personal correspondence'
    }
  },
  '2-': {
    ielts: '4.0',
    cefr: 'B1',
    description: 'Lower Intermediate',
    details: {
      listening: 'Can follow main points of extended discussion',
      reading: 'Can understand non-routine letters and articles',
      speaking: 'Can enter unprepared into conversation',
      writing: 'Can write personal letters describing experiences'
    }
  },
  '2=': {
    ielts: '4.5',
    cefr: 'B1',
    description: 'Lower Intermediate',
    details: {
      listening: 'Can understand main points of clear speech',
      reading: 'Can understand texts with everyday language',
      speaking: 'Can deal with most situations while traveling',
      writing: 'Can write straightforward connected text'
    }
  },
  '2+': {
    ielts: '5.0',
    cefr: 'B1',
    description: 'Lower Intermediate',
    details: {
      listening: 'Can understand extended speech at work',
      reading: 'Can understand routine job-related discussions',
      speaking: 'Can briefly give reasons and explanations',
      writing: 'Can write detailed personal letters'
    }
  },
  '3-': {
    ielts: '5.5',
    cefr: 'B2',
    description: 'Upper Intermediate',
    details: {
      listening: 'Can understand extended speech and lectures',
      reading: 'Can read articles and reports on current topics',
      speaking: 'Can interact with native speakers fluently',
      writing: 'Can write clear detailed text on various subjects'
    }
  },
  '3=': {
    ielts: '6.0',
    cefr: 'B2',
    description: 'Upper Intermediate',
    details: {
      listening: 'Can understand most TV news and programs',
      reading: 'Can understand contemporary literary prose',
      speaking: 'Can present clear, detailed descriptions',
      writing: 'Can write essays or reports passing on information'
    }
  },
  '3+': {
    ielts: '6.5',
    cefr: 'B2',
    description: 'Upper Intermediate',
    details: {
      listening: 'Can understand complex technical discussions',
      reading: 'Can understand specialized articles',
      speaking: 'Can express viewpoints on topical issues',
      writing: 'Can write letters highlighting personal significance'
    }
  },
  '4-': {
    ielts: '7.0',
    cefr: 'C1',
    description: 'Advanced',
    details: {
      listening: 'Can follow extended speech even on abstract topics',
      reading: 'Can understand long complex factual texts',
      speaking: 'Can express fluently and spontaneously',
      writing: 'Can express in clear well-structured text'
    }
  },
  '4=': {
    ielts: '7.5',
    cefr: 'C1',
    description: 'Advanced',
    details: {
      listening: 'Can understand any kind of spoken language',
      reading: 'Can understand complex literary texts',
      speaking: 'Can present clear, detailed descriptions',
      writing: 'Can write complex letters, reports or articles'
    }
  },
  '4+': {
    ielts: '8.0',
    cefr: 'C1',
    description: 'Advanced',
    details: {
      listening: 'Can understand extended speech effortlessly',
      reading: 'Can understand abstract or specialized texts',
      speaking: 'Can express with precision of meaning',
      writing: 'Can write complex formal letters'
    }
  },
  '5-': {
    ielts: '8.5',
    cefr: 'C2',
    description: 'Very Advanced',
    details: {
      listening: 'Can understand any native speaker',
      reading: 'Can read all forms of written language',
      speaking: 'Can express with complete fluency',
      writing: 'Can write complex texts in appropriate style'
    }
  },
  '5=': {
    ielts: '9.0',
    cefr: 'C2',
    description: 'Very Advanced',
    details: {
      listening: 'Complete understanding of complex topics',
      reading: 'Can understand and interpret critically all forms',
      speaking: 'Can present arguments coherently',
      writing: 'Can write complex texts with clarity and fluency'
    }
  },
  '5+': {
    ielts: '9.0',
    cefr: 'C2',
    description: 'Very Advanced',
    details: {
      listening: 'Native-like understanding in all contexts',
      reading: 'Complete comprehension of any written text',
      speaking: 'Can express with complete accuracy and fluency',
      writing: 'Can write with sophisticated precision'
    }
  }
};

// mockData.ts
export const mockEmployeeData: Employee[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Software Engineer",
    proficiency: "4+",
    industryStandard: "4=",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Product Manager",
    proficiency: "2+",
    industryStandard: "3=",
  },
  {
    id: 3,
    name: "Emily Roberts",
    role: "Clinical Research Manager",
    proficiency: "4=",
    industryStandard: "4-",
  },
  {
    id: 4,
    name: "Michael Chang",
    role: "Software Developer",
    proficiency: "3=",
    industryStandard: "3=",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "UX Designer",
    proficiency: "3+",
    industryStandard: "3=",
  }
];