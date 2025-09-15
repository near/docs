import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Content from '../content.json';

// Calculate total lessons across all sections and modules
const calculateTotals = () => {
  let totalLessons = 0;
  let totalSections = 0;
  const sectionDetails = {};

  Object.keys(Content).forEach((section) => {
    totalSections++;
    const sectionData = Content[section];
    let sectionLessons = 0;
    
    Object.keys(sectionData).forEach((module) => {
      if (module !== 'sectionTitle') {
        const moduleData = sectionData[module];
        if (Array.isArray(moduleData)) {
          sectionLessons += moduleData.length;
          totalLessons += moduleData.length;
        }
      }
    });

    sectionDetails[section] = {
      title: sectionData.sectionTitle || section,
      totalLessons: sectionLessons,
      completedLessons: 0
    };
  });

  return { totalLessons, totalSections, sectionDetails };
};

const { totalLessons, totalSections, sectionDetails } = calculateTotals();

const useAcademyProgress = create(
  persist(
    (set, get) => ({
      // State
      completedLessons: {},
      contractNames: {}, // Store contract names by lesson key
      sectionProgress: { ...sectionDetails },
      totalLessons,
      totalSections,
      
      // Actions
      markLessonComplete: (sectionId, moduleId, lessonIndex, contractName = null) => {
        const lessonKey = `${sectionId}.${moduleId}.${lessonIndex}`;
        
        set((state) => {
          const newCompletedLessons = { ...state.completedLessons };
          const newContractNames = { ...state.contractNames };
          const newSectionProgress = { ...state.sectionProgress };
          
          const wasAlreadyCompleted = newCompletedLessons[lessonKey];
          
          // Mark lesson as completed
          newCompletedLessons[lessonKey] = true;
          
          // Save contract name if provided (always update, even if lesson was already completed)
          if (contractName && contractName.trim()) {
            newContractNames[lessonKey] = contractName.trim();
          }
          
          // Update section progress only if lesson wasn't already completed
          if (!wasAlreadyCompleted && newSectionProgress[sectionId]) {
            newSectionProgress[sectionId] = {
              ...newSectionProgress[sectionId],
              completedLessons: newSectionProgress[sectionId].completedLessons + 1
            };
          }
          
          return {
            completedLessons: newCompletedLessons,
            contractNames: newContractNames,
            sectionProgress: newSectionProgress
          };
        });
      },
      
      markLessonIncomplete: (sectionId, moduleId, lessonIndex) => {
        const lessonKey = `${sectionId}.${moduleId}.${lessonIndex}`;
        
        set((state) => {
          const newCompletedLessons = { ...state.completedLessons };
          const newContractNames = { ...state.contractNames };
          const newSectionProgress = { ...state.sectionProgress };
          
          // Mark lesson as incomplete
          if (newCompletedLessons[lessonKey]) {
            delete newCompletedLessons[lessonKey];
            
            // Remove contract name if it exists
            if (newContractNames[lessonKey]) {
              delete newContractNames[lessonKey];
            }
            
            // Update section progress
            if (newSectionProgress[sectionId]) {
              newSectionProgress[sectionId] = {
                ...newSectionProgress[sectionId],
                completedLessons: Math.max(0, newSectionProgress[sectionId].completedLessons - 1)
              };
            }
          }
          
          return {
            completedLessons: newCompletedLessons,
            contractNames: newContractNames,
            sectionProgress: newSectionProgress
          };
        });
      },
      
      isLessonCompleted: (sectionId, moduleId, lessonIndex) => {
        const lessonKey = `${sectionId}.${moduleId}.${lessonIndex}`;
        return get().completedLessons[lessonKey] || false;
      },
      
      getTotalCompletedLessons: () => {
        return Object.keys(get().completedLessons).length;
      },
      
      getOverallProgress: () => {
        const completed = Object.keys(get().completedLessons).length;
        return Math.round((completed / totalLessons) * 100);
      },
      
      getSectionProgress: (sectionId) => {
        return get().sectionProgress[sectionId] || null;
      },
      
      getAllSections: () => {
        return get().sectionProgress;
      },
      
      getContractName: (sectionId, moduleId, lessonIndex) => {
        const lessonKey = `${sectionId}.${moduleId}.${lessonIndex}`;
        return get().contractNames[lessonKey] || null;
      },
      
      getAllContractNames: () => {
        return get().contractNames;
      },
      
      resetProgress: () => {
        set({
          completedLessons: {},
          contractNames: {},
          sectionProgress: { ...sectionDetails }
        });
      }
    }),
    {
      name: 'academy-progress-storage', // localStorage key
      partialize: (state) => ({
        completedLessons: state.completedLessons,
        contractNames: state.contractNames,
        sectionProgress: state.sectionProgress
      })
    }
  )
);

export default useAcademyProgress;
