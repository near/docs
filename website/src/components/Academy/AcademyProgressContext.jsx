import  { createContext, useContext, useState, useEffect } from 'react';

const AcademyProgressContext = createContext();

export const useAcademyProgress = (course) => {
  const context = useContext(AcademyProgressContext);
  if (!context) {
    throw new Error('useAcademyProgress must be used within an AcademyProgressProvider');
  }
  context.setLocalStorageKey(`academy-progress-${course}`);
  
  return context;
};

export const AcademyProgressProvider = ({ children }) => {
  const [localStorageKey, setLocalStorageKey] = useState();
  const [completedLessons, setCompletedLessons] = useState(0);

  useEffect(() => {
    setCompletedLessons( Number(localStorage.getItem(localStorageKey)) || 0)
  }
  , [localStorageKey]);

  const incrementCompletedLessons = () => {
    console.log("incrementCompletedLessons", localStorage);
    
    const increment = completedLessons + 1;
    setCompletedLessons(increment);
    localStorage.setItem(localStorageKey, increment);
  };

  const value = {
    completedLessons,
    incrementCompletedLessons,
    setLocalStorageKey
  };

  return (
    <AcademyProgressContext.Provider value={value}>
      {children}
    </AcademyProgressContext.Provider>
  );
};
