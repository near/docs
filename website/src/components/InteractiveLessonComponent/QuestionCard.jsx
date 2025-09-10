import React from 'react';
import './QuestionCard.scss';

const QuestionCard = ({ 
  question, 
  selectedChoice, 
  onChoiceSelect, 
  showFeedback, 
  isAnswered 
}) => {
  const getChoiceClassName = (choice) => {
    let className = 'choice-item';
    
    if (selectedChoice === choice.id) {
      className += ' selected';
    }
    
    if (showFeedback && isAnswered) {
      if (choice.correct) {
        className += ' correct';
      } else if (selectedChoice === choice.id && !choice.correct) {
        className += ' incorrect';
      }
    }
    
    return className;
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <h3 className="question-title">QUESTION</h3>
      </div>
      
      <div className="question-content">
        <p className="question-text">{question.text}</p>
        
        <div className="choices-grid">
          {question.choices.map((choice) => (
            <button
              key={choice.id}
              className={getChoiceClassName(choice)}
              onClick={() => onChoiceSelect(choice.id)}
              disabled={isAnswered}
            >
              <span className="choice-label">
                {choice.id === 'choice1' ? 'CHOICE 1' : 
                 choice.id === 'choice2' ? 'CHOICE 2' : 
                 choice.id === 'choice3' ? 'CHOICE 3' : 'CHOICE 4'}
              </span>
              <span className="choice-text">{choice.text}</span>
            </button>
          ))}
        </div>
        
        {showFeedback && isAnswered && (
          <div className="feedback-section">
            {question.choices.find(c => c.id === selectedChoice)?.correct ? (
              <div className="feedback correct-feedback">
                <span className="feedback-icon">✓</span>
                <span className="feedback-text">Correct! Well done.</span>
              </div>
            ) : (
              <div className="feedback incorrect-feedback">
                <span className="feedback-icon">✗</span>
                <span className="feedback-text">
                  Incorrect. The correct answer is highlighted above.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
