import React, { useState } from 'react';

export function FeedbackComponent() {
  const [feedback, setFeedback] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(false);

  const handleFeedback = (event, type) => {
    event.preventDefault();
    setFeedback(type);
    setShowComment(true);
  };

  const handleSubmit = () => {
    // Here you could integrate with your analytics/feedback service
    console.log('Feedback submitted:', { type: feedback, comment });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFeedback(null);
      setShowComment(false);
      setComment('');
    }, 2000);
  };

  const handleSkip = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFeedback(null);
      setShowComment(false);
      setComment('');
    }, 1000);
  };

  if (isSubmitted) {
    return <>
      <hr style={{marginBottom: "1rem"}} />
      <div className="feedback-container">
        <div className="feedback-success">
          <span className="feedback-success-icon">✓</span>
          <span>Thanks for your feedback!</span>
        </div>
      </div>
    </>
  }

  return <>
    <hr style={{marginBottom: "1rem"}} />
    <div className="feedback-container">
      {!showComment ? (
        <div className="feedback-question">
          <span className="feedback-text">Was this page helpful?</span>
          <div className="feedback-buttons">
            <a 
              className="feedback-btn"
              href="#"
              onClick={(event) => handleFeedback(event, 'yes')}
              // title="Yes, this was helpful"
            >
              👍 Yes
            </a>
            <a 
              className="feedback-btn"
              href="#"
              onClick={(event) => handleFeedback(event, 'no')}
              // title="No, this wasn't helpful"
            >
              👎 No
            </a>
          </div>
        </div>
      ) : (
        <div className="feedback-comment-section">
          <div className="feedback-comment-header">
            <span className="feedback-text">
              {feedback === 'yes' ? 'Great! What did you like?' : 'Sorry about that. What went wrong?'}
            </span>
          </div>
          <textarea
            className="feedback-textarea"
            placeholder="(Optional) Tell us more..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
          />
          <div className="feedback-actions">
            <button className="feedback-action-btn feedback-skip" onClick={handleSkip}>
              Skip
            </button>
            <button className="feedback-action-btn feedback-submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  </>;
}
