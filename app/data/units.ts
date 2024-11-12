import { Unit } from '../types';

export const units: Unit[] = [
  {
    number: 1,
    title: "Business Communication Skills",
    isUnlocked: true,
    buttonText: "Continue",
    previousUnit: null
  },
  {
    number: 2,
    title: "Business Meetings",
    isUnlocked: false,
    buttonText: "Complete Unit 1",
    previousUnit: 1
  },
  {
    number: 3,
    title: "Business Presentations",
    isUnlocked: false,
    buttonText: "Complete Unit 2",
    previousUnit: 2
  },
  {
    number: 4,
    title: "Business Negotiations",
    isUnlocked: false,
    buttonText: "Complete Unit 3",
    previousUnit: 3
  },
  {
    number: 5,
    title: "Sales",
    isUnlocked: false,
    buttonText: "Complete Unit 4",
    previousUnit: 4
  }
];