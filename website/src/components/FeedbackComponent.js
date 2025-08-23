import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    rating: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const EMAILJS_CONFIG = {
    serviceId: 'service_tmydmq6',
    templateId: 'template_hsq7d9p',
    publicKey: 'Pfo9CV3qqPEi8c3VH',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name || 'Anonymous',
        from_email: formData.email || 'Not provided',
        subject: formData.subject,
        message: formData.message,
        rating: formData.rating
          ? `${'⭐'.repeat(parseInt(formData.rating))} (${formData.rating}/5)`
          : 'Not rated',
        submission_date: new Date().toLocaleString(),
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey,
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          rating: '',
        });
      } else {
        throw new Error(`Failed to submit feedback: ${response.text || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);

      // Check for specific Gmail scope error
      if (error.text && error.text.includes('insufficient authentication scopes')) {
        setSubmitStatus('gmail_scope_error');
      } else {
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="feedback-form-container"
      style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}
    >
      <div className="feedback-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--ifm-color-primary)', marginBottom: '1rem' }}>
          NEAR Developer Feedback
        </h2>
        <p style={{ fontSize: '1.1rem' }}>
        Building for developers, guided by developer feedback. <br/> Tell us what you like, what you don't like, and what we can do to improve.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-row" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label
              htmlFor="name"
              style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}
            >
              Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--ifm-color-emphasis-300)',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s ease',
                backgroundColor: 'var(--ifm-background-color)',
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              htmlFor="email"
              style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}
            >
              Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--ifm-color-emphasis-300)',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.2s ease',
                backgroundColor: 'var(--ifm-background-color)',
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="subject"
            style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}
          >
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--ifm-color-emphasis-300)',
              borderRadius: '8px',
              fontSize: '1rem',
              transition: 'border-color 0.2s ease',
              backgroundColor: 'var(--ifm-background-color)',
              cursor: 'pointer'
            }}
          >
            <option value="">Select a subject</option>
            <option value="docs">📚 Documentation</option>
            <option value="developer-experience">👨‍💻 Developer Experience</option>
            <option value="tooling">🔧 Tooling</option>
            <option value="other">💬 Other</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="rating"
            style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}
          >
            Overall Rating (Optional)
          </label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--ifm-color-emphasis-300)',
              borderRadius: '8px',
              fontSize: '1rem',
              backgroundColor: 'var(--ifm-background-color)',
            }}
          >
            <option value="">Select a rating</option>
            <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
            <option value="4">⭐⭐⭐⭐ Good</option>
            <option value="3">⭐⭐⭐ Average</option>
            <option value="2">⭐⭐ Poor</option>
            <option value="1">⭐ Very Poor</option>
          </select>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label
            htmlFor="message"
            style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}
          >
            Your Feedback *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="What would you like to share?"
            required
            rows="5"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--ifm-color-emphasis-300)',
              borderRadius: '8px',
              fontSize: '1rem',
              resize: 'vertical',
              minHeight: '120px',
              backgroundColor: 'var(--ifm-background-color)',
            }}
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '1rem 2rem',
            backgroundColor: isSubmitting
              ? 'var(--ifm-color-emphasis-300)'
              : 'var(--ifm-color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
          onMouseOver={(e) => {
            if (!isSubmitting) {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          {isSubmitting ? (
            <>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
              Sending...
            </>
          ) : (
            <>📤 Send Feedback</>
          )}
        </button>
      </form>

      {submitStatus === 'success' && (
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--ifm-color-success-light)',
            border: '1px solid var(--ifm-color-success)',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <strong>✅ Thank you!</strong> Your feedback has been sent successfully.
        </div>
      )}

      {submitStatus === 'error' && (
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--ifm-color-danger-light)',
            border: '1px solid var(--ifm-color-danger)',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <strong>❌ Error:</strong> Failed to send feedback. Please try again or contact us
          directly.
        </div>
      )}

      {submitStatus === 'gmail_scope_error' && (
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--ifm-color-warning-light)',
            border: '1px solid var(--ifm-color-warning)',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <strong>⚠️ Configuration Issue:</strong> There's a Gmail permission issue. Please contact
          the administrator to fix the email service configuration.
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default FeedbackForm;
