import Layout from '@theme/Layout'
import { useState, useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import DOMPurify from 'dompurify';

const API_BASE = 'https://tmp-docs-ai-service.onrender.com';

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

  // Shadow DOM isolated renderer
  const IssueContent = ({ html }) => {
    const hostRef = useRef(null);
    useEffect(() => {
      if (typeof window === 'undefined') return;
      if (!hostRef.current) return;
      // Create or reuse shadow root
      const shadow = hostRef.current.shadowRoot || hostRef.current.attachShadow({ mode: 'open' });
      // Minimal reset inside shadow DOM – avoids inheriting site styles while allowing CSS variables
      const reset = `:host{display:block;font-family:var(--ifm-font-family-base, system-ui, sans-serif);line-height:1.5;color:#1a202c}`+
        `*,*::before,*::after{box-sizing:border-box}`+
        `body,div,section,article,header,footer,h1,h2,h3,h4,h5,h6,p,ul,ol,li,table,tr,td,th{margin:0;padding:0;font:inherit}`+
        `h1{font-size:2rem;margin:1.5rem 0 .75rem;font-weight:600}`+
        `h2{font-size:1.5rem;margin:1.25rem 0 .6rem;font-weight:600}`+
        `h3{font-size:1.2rem;margin:1rem 0 .5rem;font-weight:600}`+
        `p{margin:.75rem 0}`+
        `a{color:var(--near-color-royal,#2563eb);text-decoration:underline}`+
        `img{height:auto;margin:1rem auto}`+
        `table{width:100%;border-collapse:collapse}`+
        `td,th{vertical-align:top}`+
        `ul,ol{padding-left:1.25rem}`;
      // Inject (preserve any internal styles that come with the HTML)
      shadow.innerHTML = `<style>${reset}</style>${html || ''}`;
    }, [html]);
    return <div ref={hostRef} />;
  };

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
      <h1 className="newsletter-title">
        Loading Newsletter...
      </h1>
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
                  <IssueContent html={sanitizedIssueHtml} />
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

              {/* External Links */}
              <div className="green-box external-header">
                <h3>Looking for more?</h3>
              </div>
              <div className="links-container">
                <ul className="links-list external-links">
                  <li>
                    <a href="https://nearweek.com" target="_blank" rel="noopener noreferrer">
                      NEARWEEK
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com/NEARProtocol" target="_blank" rel="noopener noreferrer">
                      NEAR on X
                    </a>
                  </li>
                  <li>
                    <a href="https://near.org/blog" target="_blank" rel="noopener noreferrer">
                      NEAR Blog
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
