import React, { useState, useCallback, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import ProgressBar from './ProgressBar';
import NavigationBar from './NavigationBar';
import clsx from 'clsx';
import './MultiStep.scss';

/**
 * MultiStep component for creating multi-step forms with React Hook Form integration
 * @param {Object} props - Component props
 * @param {Array} props.steps - Array of step configurations
 * @param {Function} props.onSubmit - Function called when form is submitted
 * @param {Function} [props.onStepChange] - Callback for step changes
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.showProgressBar=true] - Whether to show the progress bar
 * @param {boolean} [props.showStepNumbers=true] - Whether to show step numbers in progress
 * @param {boolean} [props.allowSkip=false] - Allow skipping steps without validation
 * @param {Object} [props.form] - External React Hook Form instance
 * @param {Object} [props.defaultValues] - Default form values
 */
function MultiStep({
  steps,
  onSubmit,
  onStepChange,
  className = '',
  showProgressBar = true,
  showStepNumbers = true,
  allowSkip = false,
  form: externalForm,
  defaultValues
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepErrors, setStepErrors] = useState({});

  // Use external form if provided, otherwise create internal form
  const internalForm = useForm({
    defaultValues: defaultValues,
    mode: 'onChange'
  });
  
  const form = externalForm || internalForm;
  const { trigger, handleSubmit, formState: { errors } } = form;

  // Calculate total steps
  const totalSteps = steps.length;

  // Get current step configuration
  const currentStepConfig = steps[currentStep - 1];

  // Validate current step
  const validateCurrentStep = useCallback(async () => {
    if (!currentStepConfig.validation) return true;

    try {
      await trigger();
      const hasStepErrors = Object.keys(errors).length > 0;
      
      setStepErrors(prev => ({
        ...prev,
        [currentStep]: hasStepErrors
      }));
      
      return !hasStepErrors;
    } catch (error) {
      console.error('Step validation error:', error);
      setStepErrors(prev => ({
        ...prev,
        [currentStep]: true
      }));
      return false;
    }
  }, [currentStep, currentStepConfig.validation, trigger, errors]);

  // Handle step navigation
  const handleNext = useCallback(async () => {
    if (currentStep === totalSteps) return;

    // Validate current step before proceeding
    const isStepValid = await validateCurrentStep();
    
    if (!isStepValid && !allowSkip) {
      return;
    }

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    onStepChange?.(nextStep, 'next');
  }, [currentStep, totalSteps, validateCurrentStep, allowSkip, onStepChange]);

  const handlePrev = useCallback(() => {
    if (currentStep === 1) return;

    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    onStepChange?.(prevStep, 'prev');
  }, [currentStep, onStepChange]);

  // Handle form submission
  const handleFormSubmit = useCallback(async (data) => {
    setIsSubmitting(true);
    
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [onSubmit]);

  // Handle final submit button click
  const handleSubmitClick = useCallback(async () => {
    // Validate current step first
    const isStepValid = await validateCurrentStep();
    
    if (!isStepValid) {
      return;
    }

    // Submit the form
    const submitHandler = handleSubmit(handleFormSubmit);
    submitHandler();
  }, [validateCurrentStep, handleSubmit, handleFormSubmit]);

  // Check if next button should be disabled
  const isNextDisabled = !currentStepConfig.optional && !allowSkip && stepErrors[currentStep];

  // Auto-validate when step changes
  useEffect(() => {
    validateCurrentStep();
  }, [currentStep, validateCurrentStep]);

  return (
    <FormProvider {...form}>
      <div className={clsx('multistep-container', className)}>
        {/* Form Content */}
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <div className="multistep-form">
            {/* Step Header */}
            <div className="multistep-header">
              <div className="multistep-header-content">
                <div className="multistep-title-section">
                  <h2 className="multistep-title">
                    {currentStepConfig.title}
                  </h2>
                  {currentStepConfig.description && (
                    <p className="multistep-description">
                      {currentStepConfig.description}
                    </p>
                  )}
                </div>
                <div className="multistep-counter">
                  Step {currentStep} of {totalSteps}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {showProgressBar && (
              <div className="multistep-progress-section">
                <ProgressBar
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                  steps={steps}
                  showStepNumbers={showStepNumbers}
                />
              </div>
            )}

            {/* Step Content */}
            <div className="multistep-content">
              <div className="multistep-step-content">
                {currentStepConfig.content}
              </div>

              {/* Step validation errors */}
              {stepErrors[currentStep] && Object.keys(errors).length > 0 && (
                <div className="multistep-error-container">
                  <div className="multistep-error-content">
                    <div className="multistep-error-icon">
                      <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="multistep-error-text">
                      <h3 className="multistep-error-title">
                        Please fix the following errors:
                      </h3>
                      <div className="multistep-error-list">
                        <ul>
                          {Object.entries(errors).map(([field, error]) => (
                            <li key={field}>
                              {String(error?.message) || `${field} is required`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Bar */}
            <NavigationBar
              currentStep={currentStep}
              totalSteps={totalSteps}
              onNext={handleNext}
              onPrev={handlePrev}
              onSubmit={handleSubmitClick}
              isNextDisabled={isNextDisabled}
              isPrevDisabled={false}
              isSubmitting={isSubmitting}
              allowSkip={allowSkip}
            />
          </div>
        </form>

        {/* Step Status Indicators */}
        <div className="multistep-indicators">
          {steps.map((_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            const hasError = stepErrors[stepNumber];

            return (
              <div
                key={stepNumber}
                className={clsx(
                  'multistep-indicator',
                  {
                    'multistep-indicator--active': isActive && !hasError,
                    'multistep-indicator--completed': isCompleted && !hasError,
                    'multistep-indicator--error': hasError,
                    'multistep-indicator--inactive': !isActive && !isCompleted && !hasError
                  }
                )}
              />
            );
          })}
        </div>
      </div>
    </FormProvider>
  );
}

export default MultiStep;
