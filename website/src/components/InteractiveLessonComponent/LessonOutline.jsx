import React from 'react';
import './LessonOutline.scss';

const LessonOutline = ({ outline, progress }) => {
  return (
    <div className="lesson-outline">
      <h3 className="outline-title">LESSON OUTLINE</h3>
      <div className="outline-list">
        {outline.map((item) => (
          <div 
            key={item.id}
            className={`outline-item ${item.active ? 'active' : ''} ${item.completed ? 'completed' : ''}`}
          >
            <span className="item-number">{item.id}.</span>
            <span className="item-title">{item.title}</span>
            {item.completed && (
              <span className="completion-check">✓</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonOutline;
