import React from 'react';
import { useForm } from 'react-hook-form';
import MultiStep from './MultiStep';
import './MultiStepExample.scss';

/**
 * MultiStepExample component demonstrating usage of the MultiStep component
 */
const MultiStepExample = () => {
  const form = useForm({
    defaultValues: {
      personalInfo: {
        name: '',
        email: '',
        age: 0
      },
      preferences: {
        interests: [],
        experience: ''
      },
      feedback: {
        comments: '',
        rating: 5
      }
    }
  });

  const steps = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      content: (
        <div className="form-section">
          <div className="form-field">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              {...form.register('personalInfo.name', { required: 'Name is required' })}
              type="text"
              id="name"
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-field">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              {...form.register('personalInfo.email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-field">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              {...form.register('personalInfo.age', { 
                required: 'Age is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Age must be positive' },
                max: { value: 120, message: 'Age must be realistic' }
              })}
              type="number"
              id="age"
              className="form-input"
              placeholder="Enter your age"
            />
          </div>
        </div>
      )
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description: 'Select your interests and experience level',
      content: (
        <div className="form-section">
          <div className="form-field">
            <label className="form-label">
              Areas of Interest
            </label>
            <div className="checkbox-group">
              {['Technology', 'Design', 'Business', 'Science', 'Arts'].map((interest) => (
                <label key={interest} className="checkbox-item">
                  <input
                    {...form.register('preferences.interests')}
                    type="checkbox"
                    value={interest}
                    className="checkbox-input"
                  />
                  <span className="checkbox-label">{interest}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="experience" className="form-label">
              Experience Level
            </label>
            <select
              {...form.register('preferences.experience', { required: 'Please select your experience level' })}
              id="experience"
              className="form-select"
            >
              <option value="">Select experience level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>
      )
    },
    {
      id: 'feedback',
      title: 'Feedback',
      description: 'Share your thoughts and rate your experience',
      content: (
        <div className="form-section">
          <div className="form-field">
            <label htmlFor="comments" className="form-label">
              Additional Comments
            </label>
            <textarea
              {...form.register('feedback.comments')}
              id="comments"
              rows={4}
              className="form-textarea"
              placeholder="Share any additional thoughts or feedback..."
            />
          </div>
          <div className="form-field">
            <label htmlFor="rating" className="form-label">
              Overall Rating (1-10)
            </label>
            <input
              {...form.register('feedback.rating', { 
                valueAsNumber: true,
                min: { value: 1, message: 'Rating must be at least 1' },
                max: { value: 10, message: 'Rating cannot exceed 10' }
              })}
              type="range"
              id="rating"
              min="1"
              max="10"
              className="form-range"
            />
            <div className="range-labels">
              <span>1 (Poor)</span>
              <span>10 (Excellent)</span>
            </div>
            <div className="range-value">
              Current rating: {form.watch('feedback.rating')}
            </div>
          </div>
        </div>
      ),
      optional: true
    }
  ];

  const handleSubmit = async (data) => {
    console.log('Form submitted with data:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Form submitted successfully!');
  };

  const handleStepChange = (currentStep, direction) => {
    console.log(`Step changed to ${currentStep} (direction: ${direction})`);
  };

  return (
    <div className="multistep-example">
      <div className="example-container">
        <h1 className="example-title">
          Multi-Step Form Demo
        </h1>
        
        <MultiStep
          steps={steps}
          onSubmit={handleSubmit}
          onStepChange={handleStepChange}
          form={form}
          showProgressBar={true}
          showStepNumbers={true}
          allowSkip={false}
          className="example-form"
        />
      </div>
    </div>
  );
};

export default MultiStepExample;
