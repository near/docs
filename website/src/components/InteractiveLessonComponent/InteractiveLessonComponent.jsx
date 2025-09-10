import React, { useState, useEffect } from 'react';
import LessonProgress from './LessonProgress';
import LessonOutline from './LessonOutline';
import QuestionCard from './QuestionCard';
import './InteractiveLessonComponent.scss';

// Mock API data - in real implementation this would come from an API
const mockLessonData = {
  id: 'react-fundamentals-1',
  title: 'React Fundamentals - Lesson 1',
  description: 'Learn the fundamentals of React development and component creation',
  totalLessons: 8,
  currentLesson: 1,
  progress: 13, // percentage
  outline: [
    { id: 1, title: 'Introduction to React', completed: true, active: true },
    { id: 2, title: 'Components & Props', completed: false, active: false },
    { id: 3, title: 'State Management', completed: false, active: false },
    { id: 4, title: 'Event Handling', completed: false, active: false },
    { id: 5, title: 'Conditional Rendering', completed: false, active: false },
    { id: 6, title: 'Lists & Keys', completed: false, active: false },
    { id: 7, title: 'Forms in React', completed: false, active: false },
    { id: 8, title: 'Advanced Patterns', completed: false, active: false }
  ],
  content: {
    title: 'Introduction to React',
    body: `
      <h3>CONTENT</h3>
      <h4>Introduction to React</h4>
      <p>This is where the main lesson content would be displayed. You could include text, images, videos, interactive examples, and other educational materials.</p>
      <p>The content area is designed to be flexible and can accommodate various types of learning materials to help students understand the concepts being taught.</p>
    `
  },
  review: {
    question: {
      id: 'q1',
      text: 'Which of the following is the correct way to create a React component?',
      choices: [
        { id: 'choice1', text: 'function Component() { return <div>Hello</div>; }', correct: true },
        { id: 'choice2', text: 'const Component = () => <div>Hello</div>;', correct: false },
        { id: 'choice3', text: 'class Component extends React.Component { render() { return <div>Hello</div>; } }', correct: false },
        { id: 'choice4', text: 'All of the above', correct: false }
      ]
    }
  }
};

const InteractiveLessonComponent = ({ 
  lessonId,
  onLessonComplete,
  onProgressUpdate,
  className = ''
}) => {
  const [lessonData, setLessonData] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentStep, setCurrentStep] = useState('content'); // 'content' or 'review'

  // Simulate API call to fetch lesson data
  useEffect(() => {
    const fetchLessonData = async () => {
      // In a real implementation, this would be an actual API call
      // For now, we'll use the mock data
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      setLessonData(mockLessonData);
    };

    fetchLessonData();
  }, [lessonId]);

  const handleChoiceSelect = (choiceId) => {
    if (isAnswered) return;
    setSelectedChoice(choiceId);
  };

  const handleAnswerSubmit = () => {
    if (!selectedChoice || isAnswered) return;
    
    setIsAnswered(true);
    setShowFeedback(true);
    
    const selectedChoiceData = lessonData.review.question.choices.find(
      choice => choice.id === selectedChoice
    );
    
    if (selectedChoiceData?.correct) {
      // Correct answer - progress to next lesson
      setTimeout(() => {
        const newProgress = Math.min(lessonData.progress + 12.5, 100);
        onProgressUpdate?.(newProgress);
        
        if (newProgress >= 100) {
          onLessonComplete?.(lessonData.id);
        }
      }, 2000);
    }
  };

  const handleNext = () => {
    if (currentStep === 'content') {
      setCurrentStep('review');
    } else if (isAnswered) {
      // Move to next lesson or complete
      const selectedChoiceData = lessonData.review.question.choices.find(
        choice => choice.id === selectedChoice
      );
      
      if (selectedChoiceData?.correct) {
        onLessonComplete?.(lessonData.id);
      } else {
        // Reset for retry
        setSelectedChoice(null);
        setShowFeedback(false);
        setIsAnswered(false);
        setCurrentStep('content');
      }
    }
  };

  const handlePrev = () => {
    if (currentStep === 'review') {
      setCurrentStep('content');
      setSelectedChoice(null);
      setShowFeedback(false);
      setIsAnswered(false);
    }
  };

  if (!lessonData) {
    return (
      <div className="interactive-lesson-loading">
        <div className="loading-spinner"></div>
        <p>Loading lesson...</p>
      </div>
    );
  }

  return (
    <div className={`interactive-lesson ${className}`}>
      <div className="lesson-header">
        <h1 className="lesson-title">{lessonData.title}</h1>
        <LessonProgress 
          current={lessonData.currentLesson}
          total={lessonData.totalLessons}
          progress={lessonData.progress}
        />
      </div>

      <div className="lesson-layout">
        <div className="lesson-main">
          <div className="lesson-content-area">
            {currentStep === 'content' && (
              <div className="content-section">
                <div 
                  className="lesson-content"
                  dangerouslySetInnerHTML={{ __html: lessonData.content.body }}
                />
              </div>
            )}

            {currentStep === 'review' && (
              <div className="review-section">
                <h2 className="review-title">REVIEW AREA</h2>
                <QuestionCard
                  question={lessonData.review.question}
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
              className={`nav-btn prev-btn ${currentStep === 'content' ? 'disabled' : ''}`}
              onClick={handlePrev}
              disabled={currentStep === 'content'}
            >
              ← PREV
            </button>

            {currentStep === 'content' && (
              <button 
                className="nav-btn next-btn"
                onClick={handleNext}
              >
                NEXT →
              </button>
            )}

            {currentStep === 'review' && !isAnswered && (
              <button 
                className={`nav-btn submit-btn ${!selectedChoice ? 'disabled' : ''}`}
                onClick={handleAnswerSubmit}
                disabled={!selectedChoice}
              >
                SUBMIT
              </button>
            )}

            {currentStep === 'review' && isAnswered && (
              <button 
                className="nav-btn next-btn"
                onClick={handleNext}
              >
                NEXT →
              </button>
            )}
          </div>
        </div>

        <div className="lesson-sidebar">
          <LessonOutline 
            outline={lessonData.outline}
            progress={lessonData.progress}
          />
        </div>
      </div>
    </div>
  );
};

export default InteractiveLessonComponent;
