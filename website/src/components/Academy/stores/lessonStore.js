import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useLessonStore = create(
  persist(
    (set, get) => ({
      completedLessons: new Set(),
      
      savedContracts: new Map(),
      
      markLessonAsCompleted: (lessonId) => {
        const currentCompleted = get().completedLessons;
        const newCompleted = new Set(currentCompleted);
        newCompleted.add(lessonId);
        
        set({ completedLessons: newCompleted });
      },
      
      saveContract: (lessonId, contractAddress) => {
        const currentContracts = get().savedContracts;
        const newContracts = new Map(currentContracts);
        newContracts.set(lessonId, contractAddress);
        
        set({ savedContracts: newContracts });
      },
      
      getSavedContract: (lessonId) => {
        return get().savedContracts.get(lessonId) || '';
      },
      
      isLessonCompleted: (lessonId) => {
        return get().completedLessons.has(lessonId);
      },
      
      resetLesson: (lessonId) => {
        const currentCompleted = get().completedLessons;
        const currentContracts = get().savedContracts;
        
        const newCompleted = new Set(currentCompleted);
        const newContracts = new Map(currentContracts);
        
        newCompleted.delete(lessonId);
        newContracts.delete(lessonId);
        
        set({ 
          completedLessons: newCompleted,
          savedContracts: newContracts 
        });
      },
      
      resetAllProgress: () => {
        set({ 
          completedLessons: new Set(),
          savedContracts: new Map()
        });
      },
      
      getCompletedLessons: () => {
        return Array.from(get().completedLessons);
      },
      
      getAllSavedContracts: () => {
        const contracts = get().savedContracts;
        return Object.fromEntries(contracts);
      }
    }),
    {
      name: 'lesson-progress',
      storage: {
        getItem: (name) => {
          try {
            const item = localStorage.getItem(name);
            if (!item) return null;
            
            const parsed = JSON.parse(item);
            if (parsed.state) {
              if (Array.isArray(parsed.state.completedLessons)) {
                parsed.state.completedLessons = new Set(parsed.state.completedLessons);
              }
              if (parsed.state.savedContracts && typeof parsed.state.savedContracts === 'object') {
                parsed.state.savedContracts = new Map(Object.entries(parsed.state.savedContracts));
              }
            }
            return parsed;
          } catch (error) {
            console.error('Error loading lesson progress from localStorage:', error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            if (value.state) {
              if (value.state.completedLessons instanceof Set) {
                value.state.completedLessons = Array.from(value.state.completedLessons);
              }
              if (value.state.savedContracts instanceof Map) {
                value.state.savedContracts = Object.fromEntries(value.state.savedContracts);
              }
            }
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.error('Error saving lesson progress to localStorage:', error);
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch (error) {
            console.error('Error removing lesson progress from localStorage:', error);
          }
        }
      }
    }
  )
);

export default useLessonStore;
