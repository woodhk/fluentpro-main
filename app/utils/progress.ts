
interface SectionProgress {
  [lessonSlug: string]: string[] // Array of completed section titles
}

export const getCompletedSections = (lessonSlug: string): string[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const progress: SectionProgress = JSON.parse(localStorage.getItem('lessonProgress') || '{}');
    return progress[lessonSlug] || [];
  } catch {
    return [];
  }
};

export const markSectionComplete = (lessonSlug: string, sectionTitle: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const progress: SectionProgress = JSON.parse(localStorage.getItem('lessonProgress') || '{}');
    const completedSections = progress[lessonSlug] || [];
    
    if (!completedSections.includes(sectionTitle)) {
      progress[lessonSlug] = [...completedSections, sectionTitle];
      localStorage.setItem('lessonProgress', JSON.stringify(progress));
    }
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const isSectionUnlocked = (
  lessonSlug: string,
  sectionIndex: number,
  sections: any[]
): boolean => {
  if (sectionIndex === 0) return true;
  
  const completedSections = getCompletedSections(lessonSlug);
  const previousSection = sections[sectionIndex - 1];
  return completedSections.includes(previousSection.title);
};