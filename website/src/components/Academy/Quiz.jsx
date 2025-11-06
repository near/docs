import { Children, cloneElement, useEffect, useState } from 'react';
import './Quiz.scss';
import { useAcademyProgress } from './AcademyProgressContext';
import Card from '../UI/Card';

const Quiz = ({ course, id, children }) => {
  if (!id) {
    return <div>Error: No lesson ID provided.</div>;
  }
  if (!course) {
    return <div>Error: No course provided.</div>;
  }
  
  const {incrementCompletedLessons} = useAcademyProgress(course);
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
      incrementCompletedLessons();
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
        <div className="completion-icon">🥳</div>
        <h2>Congratulations!</h2>
        <p>You have completed this lesson.</p>
        <div className="completion-message">
          <p><strong>✅ Your progress has been saved locally</strong></p>
        </div>
      </div>
    </div>
  );

  let quiz = (
    <>
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
    </>
  )

  return (
    <div className="interactive-lesson">
        <div className="lesson-main">
          {isCompleted ? completed : quiz}
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

  return (
    <div className="multiple-choice-question" id={questionId}>
      <div className="question-content">
        {question && <h3>{question}</h3>}
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
}) => {
  let color = isSelected ? 'blue' : 'default';
  let border = isSelected ? '3px solid var(--ifm-color-primary)' : '1px solid var(--ifm-color-border-secondary)';
  if (showFeedback){
    color = correct ? 'mint' : isSelected && !correct ? 'red' : '';
  }

  return (
    <Card
      color={color}
      id={optionId}
      onClick={!disabled ? onSelect : undefined}
      description={children}
      style={{ cursor: disabled ? 'default' : 'pointer', border: border }}
    />
  );
};

export { Quiz, MultipleChoice, Option };
