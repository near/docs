import Layout from '@theme/Layout'
import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import DOMPurify from 'dompurify';

const API_BASE = 'http://localhost:5000';

const fetcher = (url) => fetch(url).then((res) => res.json());

function parseCampaignHTML(htmlString) {
  // SSR guard and resilience
  if (typeof window === 'undefined' || !htmlString) return '';
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const header = doc.querySelector('tbody[data-block-id="4"].mceWrapper');
    const footer = doc.querySelector('tbody[data-block-id="60"].mceWrapper');
    const style = doc.querySelector('style');

    [footer, header].forEach((element) => {
      if (element) {
        element.innerHTML = '';
      }
    });

    return (style?.outerHTML || '') + doc.body.innerHTML;
  } catch {
    return '';
  }
}

const Newsletter = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const [currentIssueId, setCurrentIssueId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch campaigns using SWR
  const { data: campaigns = [], error: campaignsError, isLoading: campaignLoading } = useSWR(
    `${API_BASE}/api/campaigns`,
    fetcher
  );

  // Fetch issue details using SWR
  const { data: issueDetails = { cache: false, data: '', success: false }, error: issueError, isLoading: issueLoading } = useSWR(
    currentIssueId ? `${API_BASE}/api/campaigns/${currentIssueId}/content` : null,
    fetcher
  );

  // Memoize sanitized HTML to avoid re-parsing every render
  const sanitizedIssueHtml = useMemo(() => {
    // Add SSR guard for DOMPurify
    if (typeof window === 'undefined' || !issueDetails?.data) return '';

    try {
      const parsedHtml = parseCampaignHTML(issueDetails.data);
      return DOMPurify.sanitize(parsedHtml);
    } catch (error) {
      console.error('Error sanitizing HTML:', error);
      return '';
    }
  }, [issueDetails]);

  // Get issue ID from URL or use first campaign
  const getIssueIdFromUrl = () => {
    // SSR guard
    if (typeof window === 'undefined') return null;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
  };

  // Set initial issue ID when campaigns are loaded
  useEffect(() => {
    if (campaigns.length > 0 && !currentIssueId) {
      const urlIssueId = getIssueIdFromUrl();
      const defaultIssueId = campaigns[0]?.variate_settings?.combinations[0]?.id || campaigns[0]?.id;
      const initialIssueId = urlIssueId || defaultIssueId;
      
      if (initialIssueId) {
        setCurrentIssueId(initialIssueId);
      }
    }
  }, [campaigns, currentIssueId]);

  // Handle browser navigation (back/forward)
  useEffect(() => {
    // SSR guard
    if (typeof window === 'undefined') return;
    
    const handlePopState = () => {
      const urlIssueId = getIssueIdFromUrl();
      if (urlIssueId && urlIssueId !== currentIssueId) {
        setCurrentIssueId(urlIssueId);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentIssueId]);

  const onSubmit = async (data) => {
    if (submitting) return; // prevent double submit
    setSubmitting(true);
    try {
      setResponseError(null);
      const response = await fetch(`${API_BASE}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setIsFormSubmitted(true);
      } else {
        setResponseError(responseData?.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setResponseError('Failed to subscribe. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleIssueChange = (newIssueId) => {
    if (!newIssueId || newIssueId === currentIssueId) return;
    
    // SSR guard
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('id', newIssueId);
      window.history.pushState({}, '', url);
    }
    
    setCurrentIssueId(newIssueId);
  };

  if (campaignLoading) {
    return (
      <Layout title="NEAR Newsletter" description="Subscribe to the NEAR Developer Newsletter">
        <div className="newsletter-page">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                  <div className="text-center">
                    <div className="loading-container mb-4">
                      <div className="loading-spinner"></div>
                      <div className="loading-pulse"></div>
                    </div>
                    <h3 className="loading-text mb-2">Loading Newsletter...</h3>
                    <p className="loading-subtitle">Getting the latest NEAR Dev News ready for you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (campaignsError) {
    return (
      <Layout title="NEAR Newsletter" description="Subscribe to the NEAR Developer Newsletter">
        <div className="newsletter-page">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
                  <div className="text-center" style={{ maxWidth: '600px' }}>
                    <div className="error-icon mb-4">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
                        <path d="m15 9-6 6" stroke="#ef4444" strokeWidth="2"/>
                        <path d="m9 9 6 6" stroke="#ef4444" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="alert alert-danger border-0">
                      <h4 className="mb-3">Unable to Load Newsletter</h4>
                      <p className="mb-3">We're having trouble connecting to our newsletter service. This might be temporary.</p>
                      <button 
                        className="btn btn-outline-danger me-3" 
                        onClick={() => window.location.reload()}
                      >
                        Try Again
                      </button>
                      <a href="/docs" className="btn btn-primary">
                        Browse Docs Instead
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="NEAR Newsletter" description="Subscribe to the NEAR Developer Newsletter">
      <div className="newsletter-page">
        <div className="newsletter-container">
          {/* Newsletter Header */}
          <div className="newsletter-header">
            <h1 className="newsletter-title">
              <span className="title-highlight">NEAR</span> Dev Newsletter
            </h1>
            <p className="newsletter-subtitle">
              Your weekly scoop on ecosystem updates, dev tools, freelance gigs, and events around the NEAR Protocol
            </p>
          </div>

          {/* Main Layout */}
          <div className="newsletter-layout">
            {/* Main Content */}
            <div className="newsletter-main">
              {issueLoading ? (
                <div className="loading-placeholder">
                  <div className="placeholder-glow">
                    <div className="placeholder title-placeholder" />
                    <div className="placeholder content-placeholder" />
                    <div className="placeholder content-placeholder" />
                    <div className="placeholder content-placeholder short" />
                  </div>
                </div>
              ) : !sanitizedIssueHtml ? (
                <div className="alert alert-warning">No issue content available.</div>
              ) : (
                <div className="newsletter-content">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: sanitizedIssueHtml
                    }}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="newsletter-sidebar">
              {/* Subscribe Form */}
              <div className="green-box subscribe-section">
                <h3>Subscribe to the newsletter</h3>
                {isFormSubmitted ? (
                  <div className="confirmation-box" role="status">
                    <strong>Thank you!</strong> 
                    <span>Please visit your e-mail to confirm your subscription.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {errors.email && (
                      <div className="error-message">Valid email required.</div>
                    )}
                    {responseError && (
                      <div className="error-message">{responseError}</div>
                    )}
                    <div className="subscribe-form">
                      <label htmlFor="newsletter-email" className="visually-hidden">Email address</label>
                      <input
                        id="newsletter-email"
                        {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                        type="email"
                        autoComplete="email"
                        className="subscribe-input"
                        placeholder="dev@youremail.com"
                        onChange={() => setResponseError(null)}
                        aria-invalid={!!errors.email}
                      />
                      <button type="submit" className="subscribe-button" disabled={submitting} aria-busy={submitting}>
                        {submitting ? '...' : 'Subscribe'}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Recent Issues */}
              <div className="green-box issues-header">
                <h3>Recent Issues</h3>
              </div>
              <div className="links-container">
                <ul className="links-list">
                  {campaigns.map((issue) => {
                    const issueIdToUse = issue.variate_settings?.combinations[0]?.id || issue.id;
                    const isActive = currentIssueId === issueIdToUse;
                    const subject = issue.settings?.subject_line || issue.variate_settings?.subject_lines?.[0] || 'Untitled Issue';
                    
                    return (
                      <li key={issue.id} className={isActive ? 'active' : ''}>
                        <button
                          className="link-button"
                          onClick={() => handleIssueChange(issueIdToUse)}
                          aria-current={isActive ? 'true' : 'false'}
                        >
                          {subject}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <hr className="sidebar-divider" />

              {/* External Links */}
              <div className="green-box external-header">
                <h3>Looking for more?</h3>
              </div>
              <div className="links-container">
                <ul className="links-list external-links">
                  <li>
                    <a href="https://nearweek.com" target="_blank" rel="noopener noreferrer">
                      NEARWEEK →
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com/neardevhub" target="_blank" rel="noopener noreferrer">
                      DevHub on X →
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com/NEARProtocol" target="_blank" rel="noopener noreferrer">
                      NEAR on X →
                    </a>
                  </li>
                  <li>
                    <a href="https://near.org/blog" target="_blank" rel="noopener noreferrer">
                      NEAR Blog →
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Newsletter;
