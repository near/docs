import { Children, cloneElement, useState } from 'react';
import useLessonStore from './stores/lessonStore';
import './InteractiveForm.scss';

const InteractiveForm = ({ children, id }) => {
    if (!id) {
        return <div className="interactive-lesson-error">Error: No lesson ID provided.</div>;
    }

    const { markLessonAsCompleted, isLessonCompleted, resetLesson } = useLessonStore();
    const isAlreadyCompleted = isLessonCompleted(id);

    const [selectedChoice, setSelectedChoice] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    
    const [showCompletionPage, setShowCompletionPage] = useState(false);

      const handlePrev = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
            setIsAnswered(false);
            setSelectedChoice(null);
            setShowFeedback(false);
        }
    };

    const handleNext = () => {
        if (currentStepIndex < processedChildren.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
            setIsAnswered(false);
            setSelectedChoice(null);
            setShowFeedback(false);
        } else {
            markLessonAsCompleted(id);
            setShowCompletionPage(true);
        }
    };

    const handleAnswerSubmit = () => {
        if (selectedChoice) {
            setIsAnswered(true);
            setShowFeedback(true);
        }
    };

    const handleRestartLesson = () => {
        resetLesson(id);
        setCurrentStepIndex(0);
        setIsAnswered(false);
        setSelectedChoice(null);
        setShowFeedback(false);
        setShowCompletionPage(false);
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

    if (showCompletionPage || isAlreadyCompleted) {
        return (
            <div className="interactive-lesson">
                <div className="lesson-layout">
                    <div className="lesson-main">
                        <div className="lesson-content-area">
                            <div className="completion-section">
                                <div className="completion-content">
                                    <div className="completion-icon">🎉</div>
                                    <h2>Congratulations!</h2>
                                    <p>You have successfully completed the entire lesson.</p>
                                    <p>You have demonstrated an excellent understanding of the concepts presented.</p>
                                    <div className="completion-message">
                                        <p><strong>✅ Progress saved!</strong> Your completion has been saved to your device.</p>
                                    </div>

                                    <div className="completion-stats">
                                        <div className="stat-item">
                                            <span className="stat-number">{processedChildren.length}</span>
                                            <span className="stat-label">Completed steps</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-number">100%</span>
                                            <span className="stat-label">Progress</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lesson-navigation">
                            <button
                                className="button button--outline button--primary"
                                onClick={handleRestartLesson}
                            >
                                Restart Lesson
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="interactive-lesson">
            <div className="lesson-layout">
                <div className="lesson-main">
                    <div className="lesson-content-area">
                         {processedChildren[currentStepIndex]}
                    </div>

                    <div className="lesson-navigation">
                        <button
                            className={`button button--outline button--primary ${currentStepIndex === 0 ? 'button--disabled' : ''}`}
                            onClick={handlePrev}
                            disabled={currentStepIndex === 0}
                        >
                            « Previous
                        </button>

                    
                        {!isAnswered && (
                            <button
                                className={`button button--primary ${!selectedChoice ? 'button--disabled' : ''}`}
                                onClick={handleAnswerSubmit}
                                disabled={!selectedChoice}
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

export { MultipleChoice, Option };
export default InteractiveForm;
