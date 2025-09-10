import React from 'react';
import clsx from 'clsx';
import './NavigationBar.scss';

/**
 * NavigationBar component for multi-step form navigation
 * @param {Object} props - Component props
 * @param {number} props.currentStep - Current active step
 * @param {number} props.totalSteps - Total number of steps
 * @param {Function} props.onNext - Function to handle next step
 * @param {Function} props.onPrev - Function to handle previous step
 * @param {Function} props.onSubmit - Function to handle form submission
 * @param {boolean} [props.isNextDisabled=false] - Whether next button is disabled
 * @param {boolean} [props.isPrevDisabled=false] - Whether previous button is disabled
 * @param {boolean} [props.isSubmitting=false] - Whether form is being submitted
 * @param {boolean} [props.allowSkip=false] - Whether to allow skipping steps
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.nextLabel='Next'] - Label for next button
 * @param {string} [props.prevLabel='Previous'] - Label for previous button
 * @param {string} [props.submitLabel='Submit'] - Label for submit button
 * @param {string} [props.skipLabel='Skip'] - Label for skip button
 */
const NavigationBar = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSubmit,
  isNextDisabled = false,
  isPrevDisabled = false,
  isSubmitting = false,
  allowSkip = false,
  className = '',
  nextLabel = 'Next',
  prevLabel = 'Previous',
  submitLabel = 'Submit',
  skipLabel = 'Skip'
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className={clsx('navigation-bar', className)}>
      {/* Previous/Back button */}
      <div className="navigation-section">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirstStep || isPrevDisabled}
          className={clsx(
            'nav-button nav-button--prev',
            {
              'nav-button--disabled': isFirstStep || isPrevDisabled
            }
          )}
        >
          <div className="nav-button-content">
            <svg className="nav-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>{prevLabel}</span>
          </div>
        </button>
      </div>

      {/* Step indicator and optional skip */}
      <div className="navigation-center">
        <span className="step-indicator">
          {currentStep} / {totalSteps}
        </span>
        
        {allowSkip && !isLastStep && (
          <button
            type="button"
            onClick={onNext}
            className="skip-button"
          >
            {skipLabel}
          </button>
        )}
      </div>

      {/* Next/Submit button */}
      <div className="navigation-section">
        {isLastStep ? (
          <button
            type="submit"
            onClick={onSubmit}
            disabled={isSubmitting}
            className={clsx(
              'nav-button nav-button--submit',
              {
                'nav-button--disabled': isSubmitting
              }
            )}
          >
            <div className="nav-button-content">
              {isSubmitting ? (
                <>
                  <svg className="nav-button-icon nav-button-icon--spin" fill="none" viewBox="0 0 24 24">
                    <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="spinner-fill" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>{submitLabel}</span>
                  <svg className="nav-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </div>
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={isNextDisabled}
            className={clsx(
              'nav-button nav-button--next',
              {
                'nav-button--disabled': isNextDisabled
              }
            )}
          >
            <div className="nav-button-content">
              <span>{nextLabel}</span>
              <svg className="nav-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
