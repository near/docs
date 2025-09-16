import React, { useEffect } from 'react';
import './Progress.scss';

const Progress = ({ course, total }) => {

  const [completedLessons, setCompletedLessons] = React.useState(0);
  const localStorageKey = `academy-progress-${course}`;

  
  useEffect(() => {

    const savedProgress = localStorage.getItem(localStorageKey);

    if (savedProgress) {
      setCompletedLessons(parseInt(savedProgress, 10));
    }
  }, [])

  return (
    <div className="lesson-progress academy-progress">
      <div className="progress-header">
        <h3 className="progress-title">
          {course ? `${course.toUpperCase()} PROGRESS` : 'ACADEMY PROGRESS'}
        </h3>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${completedLessons / total}%` }}
          ></div>
        </div>
        <div className="progress-stats">
          <span className="lessons-completed">
            {completedLessons} of {total} lessons completed
          </span>
          <span className="progress-percentage">
            {completedLessons / total}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Progress;
