import Layout from '@theme/Layout'
import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import DOMPurify from 'dompurify';
import 'bootstrap/dist/css/bootstrap.min.css'

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
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (campaignsError) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger">Failed to load newsletter</div>
      </div>
    );
  }

  return (
    <Layout title="NEAR Newsletter" description="Subscribe to the NEAR Developer Newsletter">
    <div className="newsletter-page">
      <div className="container-fluid">
        <div className="row">
          {/* Main Content */}
          <div className="col-lg-8 col-12">
            {issueLoading ? (
              <div className="py-5">
                <div className="placeholder-glow">
                  <div className="placeholder col-8 mb-3" style={{ height: '32px' }} />
                  <div className="placeholder col-10 mb-2" />
                  <div className="placeholder col-9 mb-2" />
                  <div className="placeholder col-11 mb-2" />
                </div>
              </div>
            ) : !sanitizedIssueHtml ? (
              <div className="alert alert-warning mt-3">No issue content available.</div>
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
          <div className="col-lg-4 col-12">
            <div className="newsletter-sidebar">
              {/* Subscribe Form */}
              <div className="green-box mb-3">
                <h3 className="mb-3">Subscribe to the newsletter</h3>
                {isFormSubmitted ? (
                  <div className="confirmation-box" role="status">
                    <strong>Thank you!</strong> Please visit your e-mail to confirm your subscription.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className='mt-3' noValidate>
                    {errors.email && (
                      <div className="text-danger mb-2">Valid email required.</div>
                    )}
                    {responseError && (
                      <div className="text-danger mb-2">{responseError}</div>
                    )}
                    <div className="subscribe-form">
                      <label htmlFor="newsletter-email" className="visually-hidden">Email address</label>
                      <input
                        id="newsletter-email"
                        {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                        type="email"
                        autoComplete="email"
                        className="form-control subscribe-input"
                        placeholder="dev@youremail.com"
                        onChange={() => setResponseError(null)}
                        aria-invalid={!!errors.email}
                      />
                      <button type="submit" className="btn btn-dark" disabled={submitting} aria-busy={submitting}>
                        {submitting ? '...' : 'Subscribe'}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Recent Issues */}
              <div className="green-box">
                <h3>Recent Issues</h3>
              </div>
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

              <hr />

              {/* External Links */}
              <div className="green-box mb-3">
                <h3>Looking for more?</h3>
              </div>
              <ul className="links-list">
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
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Newsletter;
