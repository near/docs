import { useEffect, useState } from 'react';
import LessonProgress from './LessonProgress';
import QuestionCard from './QuestionCard';
import './InteractiveForm.scss';
import Content from './content.json';
import useAcademyProgress from './store/useAcademyProgress';

const InteractiveForm = ({ id }) => {
    if (!id) {
        return <div className="interactive-lesson-error">Error: No lesson ID provided.</div>;
    }

    const [section, lessonModule] = id.split('.');

    if (!Content[section] || !Content[section][lessonModule]) {
        return <div className="interactive-lesson-error">Error: Invalid lesson ID.</div>;
    }

    const { markLessonComplete, isLessonCompleted } = useAcademyProgress();

    const lessonData = Content[section][lessonModule];
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let lastCompletedStep = -1;

        for (let i = 0; i < lessonData.length; i++) {
            if (isLessonCompleted(section, lessonModule, i)) {
                lastCompletedStep = i;
            }
        }

        const startStep = Math.min(lastCompletedStep + 1, lessonData.length - 1);
        setCurrentStepIndex(startStep);

        setSelectedChoice(null);
        setShowFeedback(false);
        setIsAnswered(false);

        const initialProgress = Math.round((startStep / lessonData.length) * 100);
        setProgress(initialProgress);
    }, [id, section, lessonModule, lessonData.length, isLessonCompleted]); // Reset when lesson ID changes

    useEffect(() => {
        let completedSteps = 0;

        for (let i = 0; i < currentStepIndex; i++) {
            if (isLessonCompleted(section, lessonModule, i)) {
                completedSteps++;
            }
        }

        if (isLessonCompleted(section, lessonModule, currentStepIndex)) {
            completedSteps++;
        }

        const newProgress = Math.round((completedSteps / lessonData.length) * 100);
        setProgress(newProgress);
    }, [currentStepIndex, section, lessonModule, lessonData.length, isLessonCompleted]);

    const handleChoiceSelect = (choiceId) => {
        if (isAnswered) return;
        setSelectedChoice(choiceId);
    };

    const handleAnswerSubmit = () => {
        if (!selectedChoice || isAnswered) return;

        setIsAnswered(true);
        setShowFeedback(true);

        const currentStep = lessonData[currentStepIndex];
        const selectedChoiceIndex = parseInt(selectedChoice.replace('choice', '')) - 1;
        const selectedChoiceData = currentStep.answerChoices[selectedChoiceIndex];

        if (selectedChoiceData?.isCorrect) {
            markLessonComplete(section, lessonModule, currentStepIndex);

            // onProgressUpdate?.(newProgress); 

            if (currentStepIndex >= lessonData.length - 1) {
                // onLessonComplete?.();
            }
        }
    };

    const handleNext = () => {
        const currentStep = lessonData[currentStepIndex];

        markLessonComplete(section, lessonModule, currentStepIndex);

        if (currentStep.componentType === 'content') {
            if (currentStepIndex < lessonData.length - 1) {
                setCurrentStepIndex(currentStepIndex + 1);
                setSelectedChoice(null);
                setShowFeedback(false);
                setIsAnswered(false);
            } else {
                // onLessonComplete?.();
            }
        } else if (currentStep.componentType === 'quiz' && isAnswered) {
            const selectedChoiceIndex = parseInt(selectedChoice.replace('choice', '')) - 1;
            const selectedChoiceData = currentStep.answerChoices[selectedChoiceIndex];

            if (currentStepIndex < lessonData.length - 1) {
                setCurrentStepIndex(currentStepIndex + 1);
                setSelectedChoice(null);
                setShowFeedback(false);
                setIsAnswered(false);
            } else {
                // onLessonComplete?.();
            }
        }
    };

    const handlePrev = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
            setSelectedChoice(null);
            setShowFeedback(false);
            setIsAnswered(false);
        }
    };

    const currentStepData = lessonData[currentStepIndex];

    return (
        <div className={`interactive-lesson`}>
            <div className="lesson-header">
                <h1 className="lesson-title">Introduction to React</h1>
                <LessonProgress
                    current={currentStepIndex + 1}
                    total={lessonData.length}
                    progress={progress}
                />
            </div>

            <div className="lesson-layout">
                <div className="lesson-main">
                    <div className="lesson-content-area">
                        {currentStepData.componentType === 'content' && (
                            <div className="content-section">
                                <div
                                    className="lesson-content"
                                    dangerouslySetInnerHTML={{ __html: currentStepData.htmlContent }}
                                />
                            </div>
                        )}

                        {currentStepData.componentType === 'quiz' && (
                            <div className="review-section">
                                <QuestionCard
                                    question={{
                                        text: currentStepData.questionText,
                                        choices: currentStepData.answerChoices.map((choice, index) => ({
                                            id: `choice${index + 1}`,
                                            text: choice.choiceText,
                                            correct: choice.isCorrect
                                        }))
                                    }}
                                    selectedChoice={selectedChoice}
                                    onChoiceSelect={handleChoiceSelect}
                                    showFeedback={showFeedback}
                                    isAnswered={isAnswered}
                                />
                            </div>
                        )}
                    </div>

                    <div className="lesson-navigation">
                        <button
                            className={`button button--outline button--primary ${currentStepIndex === 0 ? 'button--disabled' : ''}`}
                            onClick={handlePrev}
                            disabled={currentStepIndex === 0}
                        >
                            « Previous
                        </button>

                        {currentStepData.componentType === 'content' && (
                            <button
                                className="button button--primary"
                                onClick={handleNext}
                            >
                                Next »
                            </button>
                        )}

                        {currentStepData.componentType === 'quiz' && !isAnswered && (
                            <button
                                className={`button button--primary ${!selectedChoice ? 'button--disabled' : ''}`}
                                onClick={handleAnswerSubmit}
                                disabled={!selectedChoice}
                            >
                                Submit
                            </button>
                        )}

                        {currentStepData.componentType === 'quiz' && isAnswered && (
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

export default InteractiveForm;
