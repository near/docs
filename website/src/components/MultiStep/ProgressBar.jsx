import React from 'react';
import clsx from 'clsx';
import './ProgressBar.scss';

/**
 * ProgressBar component for displaying step progress in multi-step forms
 * @param {Object} props - Component props
 * @param {number} props.currentStep - Current active step
 * @param {number} props.totalSteps - Total number of steps
 * @param {Array} props.steps - Array of step configurations
 * @param {boolean} [props.showStepNumbers=true] - Whether to show step numbers
 * @param {string} [props.className=''] - Additional CSS classes
 */
const ProgressBar = ({
  currentStep,
  totalSteps,
  steps,
  showStepNumbers = true,
  className = ''
}) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className={clsx('progress-bar-container', className)}>
      {/* Progress bar with step indicators */}
      <div className="progress-bar-wrapper">
        {/* Background progress bar */}
        <div className="progress-bar-track">
          <div className="progress-bar-background">
            {/* Active progress indicator */}
            <div 
              className="progress-bar-fill"
              style={{ width: `${Math.max(0, Math.min(100, progressPercentage))}%` }}
            />
          </div>
          <div className='progress-steps'>
          {/* Step indicators */}
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            const isAccessible = stepNumber <= currentStep;
            
            return (
              <div
                key={step.id}
                className={clsx(
                  'progress-step',
                  {
                    'progress-step--active': isActive,
                    'progress-step--completed': isCompleted,
                    'progress-step--inaccessible': !isAccessible,
                    'progress-step--accessible': isAccessible && !isActive && !isCompleted
                  }
                )}
              >
                {/* Step circle */}
                <div className="progress-step-circle">
                  {isCompleted ? (
                    <svg className="progress-step-check" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : showStepNumbers ? (
                    <span className="progress-step-number">{stepNumber}</span>
                  ) : (
                    <div className="progress-step-dot" />
                  )}
                </div>
                
                {/* Step label */}
                <div className="progress-step-label">
                  <div className="progress-step-title">
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="progress-step-description">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
