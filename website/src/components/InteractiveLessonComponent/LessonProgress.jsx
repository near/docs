import React from 'react';
import './LessonProgress.scss';

const LessonProgress = ({ current, total, progress }) => {
  return (
    <div className="lesson-progress">
      <div className="progress-header">
        <h3 className="progress-title">TOTAL PROGRESS</h3>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-stats">
          <span className="lessons-completed">
            {current} of {total} lessons completed
          </span>
          <span className="progress-percentage">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default LessonProgress;
