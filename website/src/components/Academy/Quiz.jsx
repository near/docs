import { Children, cloneElement, useEffect, useState } from 'react';
import './Quiz.scss';

const Quiz = ({ course, id, children }) => {
  if (!id) {
    return <div className="interactive-lesson-error">Error: No lesson ID provided.</div>;
  }

  const [isCompleted, setIsCompleted] = useState(false);
  const localStorageKey = `academy-quiz-${course}-${id}`;

  useEffect(() => {
    const savedStatus = localStorage.getItem(localStorageKey);

    if (savedStatus === 'completed') setIsCompleted(true);
  }, [])

  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleNext = () => {
    if (currentStepIndex < processedChildren.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setIsAnswered(false);
      setSelectedChoice(null);
      setShowFeedback(false);
    } else {
      setIsCompleted(true);
      localStorage.setItem(localStorageKey, 'completed');
      //add 1 to the completed course `academy-progress-${course}`
      const progressKey = `academy-progress-${course}`;
      const currentProgress = localStorage.getItem(progressKey);
      const newProgress = currentProgress ? parseInt(currentProgress) + 1 : 1;
      localStorage.setItem(progressKey, newProgress.toString());
    }
  };

  const handleAnswerSubmit = () => {
    setIsAnswered(true);
    setShowFeedback(true);
  };

  const processedChildren = Children.map(children, (child, index) => {
    if (child.type === MultipleChoice) {
      return cloneElement(child, {
        questionId: `question-${index}`,
        key: index,
        setIsAnswered,
        selectedChoice,
        setSelectedChoice,
        showFeedback,
      });
    }
    return child;
  });

  let completed = (
    <div className="completion-section">
      <div className="completion-content">
        <div className="completion-icon">🎉</div>
        <h2>Congratulations!</h2>
        <p>You have successfully completed the entire lesson.</p>
        <p>You have demonstrated an excellent understanding of the concepts presented.</p>
        <div className="completion-message">
          <p><strong>✅ Progress saved!</strong> Your completion has been saved to your device.</p>
        </div>
      </div>
    </div>
  );

  let quiz = (
    <div>
      <div className="lesson-content-area">
        {processedChildren[currentStepIndex]}
      </div>

      <div className="lesson-navigation">
        {!isAnswered && (
          <button
            className={`button button--primary ${!selectedChoice ? 'button--disabled' : ''}`}
            onClick={handleAnswerSubmit}
            disabled={selectedChoice === null}
          >
            Submit
          </button>
        )}

        {isAnswered && (
          <button
            className="button button--primary"
            onClick={handleNext}
          >
            Next »
          </button>
        )}
      </div>
    </div>
  )

  return (
    <div className="interactive-lesson">
      <div className="lesson-layout">
        <div className="lesson-main">
          {isCompleted ? completed : quiz}
        </div>
      </div>
    </div>
  );
};


const MultipleChoice = ({
  children,
  questionId,
  selectedChoice,
  setSelectedChoice,
  showFeedback,
  question
}) => {
  const processedOptions = Children.map(children, (child, index) => {
    if (child.type === Option) {
      return cloneElement(child, {
        key: index,
        optionId: `${questionId}-option-${index}`,
        isSelected: selectedChoice === index,
        onSelect: () => setSelectedChoice(index),
        showFeedback,
        disabled: showFeedback,
      });
    }
    return child;
  });

  console.log({ children })

  return (
    <div className="multiple-choice-question" id={questionId}>
      <div className="question-content">
        {question && (
          <div className="question-text">
            <h3>{question}</h3>
          </div>
        )}
        <div className="choices-grid">
          {processedOptions}
        </div>
      </div>
    </div>
  );
};

const Option = ({
  children,
  optionId,
  isSelected,
  onSelect,
  showFeedback,
  disabled,
  correct = false,
  label = ""
}) => {
  const getClassName = () => {
    let className = `option-item ${isSelected ? 'selected' : ''}`;

    if (showFeedback) {
      if (correct) {
        className += ' correct';
      } else if (isSelected && !correct) {
        className += ' incorrect';
      }
    }

    return className;
  };

  return (
    <div
      className={getClassName()}
      id={optionId}
      onClick={!disabled ? onSelect : undefined}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      {label && (
        <div className="choice-label">{label}</div>
      )}
      <div className="choice-text">
        {children}
      </div>
    </div>
  );
};

export { Quiz, MultipleChoice, Option };
