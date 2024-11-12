export interface Unit {
  number: number;
  title: string;
  isUnlocked: boolean;
  buttonText: string;
  previousUnit: number | null;
}

export interface Section {
  title: string;
  time: string;
  isUnlocked: boolean;
}

export interface Lesson {
  number: number;
  title: string;
  sections: Section[];
}