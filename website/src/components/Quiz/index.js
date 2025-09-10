import React from 'react';
import { useForm } from 'react-hook-form';
import { MultiStep } from '../MultiStep';

// Example usage of the MultiStep component
const QuizExample = () => {
  const form = useForm({
    defaultValues: {
      personalInfo: {
        name: '',
        email: '',
        age: ''
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
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              {...form.register('personalInfo.name', { required: 'Name is required' })}
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              {...form.register('personalInfo.age', { 
                required: 'Age is required',
                min: { value: 1, message: 'Age must be positive' },
                max: { value: 120, message: 'Age must be realistic' }
              })}
              type="number"
              id="age"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Areas of Interest
            </label>
            <div className="space-y-2">
              {['Technology', 'Design', 'Business', 'Science', 'Arts'].map((interest) => (
                <label key={interest} className="flex items-center">
                  <input
                    {...form.register('preferences.interests')}
                    type="checkbox"
                    value={interest}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{interest}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
              Experience Level
            </label>
            <select
              {...form.register('preferences.experience', { required: 'Please select your experience level' })}
              id="experience"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <div className="space-y-4">
          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Comments
            </label>
            <textarea
              {...form.register('feedback.comments')}
              id="comments"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Share any additional thoughts or feedback..."
            />
          </div>
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
              Overall Rating (1-10)
            </label>
            <input
              {...form.register('feedback.rating', { 
                min: { value: 1, message: 'Rating must be at least 1' },
                max: { value: 10, message: 'Rating cannot exceed 10' }
              })}
              type="range"
              id="rating"
              min="1"
              max="10"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 (Poor)</span>
              <span>10 (Excellent)</span>
            </div>
          </div>
        </div>
      ),
      optional: true
    }
  ];

  const handleSubmit = async (data) => {
    console.log('Form submitted with data:', data);
    alert('Form submitted successfully!');
  };

  const handleStepChange = (currentStep, direction) => {
    console.log(`Step changed to ${currentStep} (direction: ${direction})`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Multi-Step Form Example
        </h1>
        
        <MultiStep
          steps={steps}
          onSubmit={handleSubmit}
          onStepChange={handleStepChange}
          form={form}
          showProgressBar={true}
          showStepNumbers={true}
          allowSkip={false}
          className="bg-white"
        />
      </div>
    </div>
  );
};

export default QuizExample;