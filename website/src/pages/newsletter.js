import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import { useForm } from 'react-hook-form';
import DOMPurify from 'dompurify';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const NewsletterContainer = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 996px) {
    flex-direction: column;
  }
`;

const NewsletterContent = styled.div`
  flex: 2;
  min-width: 0;
  
  .newsletter-viewer {
    border: 1px solid var(--ifm-color-emphasis-300);
    border-radius: 8px;
    padding: 1rem;
    background: var(--ifm-background-color);
    overflow-x: auto;
  }
  
  .welcome-message {
    padding: 2rem;
    text-align: center;
    color: var(--ifm-color-content-secondary);
    
    h3 {
      color: var(--ifm-heading-color);
      margin-bottom: 1rem;
    }
  }
`;

const NewsletterSidebar = styled.div`
  flex: 1;
  min-width: 300px;
  
  @media (min-width: 997px) {
    position: sticky;
    top: 2rem;
    height: fit-content;
  }
`;

const GreenBox = styled.div`
  background: var(--ifm-color-primary);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: var(--ifm-color-primary-contrast-foreground);
  
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    color: inherit;
  }
  
  /* Dark theme adjustments */
  [data-theme='dark'] & {
    background: var(--ifm-color-primary-dark);
    color: var(--ifm-color-content-inverse);
  }
`;

const Confirmation = styled.div`
  background: var(--ifm-color-success-contrast-background);
  border: 1px solid var(--ifm-color-success);
  border-radius: 6px;
  padding: 15px 10px;
  animation: ${fadeIn} ease 0.5s;
  margin-top: 0.5rem;
  color: var(--ifm-color-success-contrast-foreground);
  
  /* Dark theme adjustments */
  [data-theme='dark'] & {
    background: var(--ifm-color-success-dark);
    color: var(--ifm-color-content-inverse);
  }
`;

const SubscribeForm = styled.div`
  display: flex;
  border: 2px solid var(--ifm-color-emphasis-300);
  border-radius: 6px;
  transition: border-color 0.2s ease-in;
  overflow: hidden;
  background: var(--ifm-background-color);
  
  &:focus-within {
    border-color: var(--ifm-color-primary);
  }
  
  input {
    flex: 1;
    border: none;
    padding: 0.75rem;
    font-size: 14px;
    outline: none;
    background: transparent;
    color: var(--ifm-font-color-base);
    
    &::placeholder {
      color: var(--ifm-color-content-secondary);
    }
  }
  
  button {
    background: var(--ifm-color-primary-darker);
    color: var(--ifm-color-primary-contrast-foreground);
    border: none;
    padding: 0.75rem 1rem;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: background-color 0.2s ease;
    
    &:hover {
      background: var(--ifm-color-primary-darkest);
    }
    
    /* Dark theme adjustments */
    [data-theme='dark'] & {
      background: var(--ifm-color-primary-light);
      color: var(--ifm-color-primary-contrast-background);
      
      &:hover {
        background: var(--ifm-color-primary);
      }
    }
  }
`;

const LinksList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--ifm-color-emphasis-200);
    
    &:last-child {
      border-bottom: none;
    }
    
    a {
      color: var(--ifm-color-primary);
      text-decoration: none;
      font-size: 14px;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  
  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid var(--ifm-color-emphasis-300);
    border-top: 4px solid var(--ifm-color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const fetcher = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    // Fallback to empty data if API fails
    if (url.includes('/api/newsletter')) {
      return [];
    }
    return null;
  }
};

const newsletterAPI = {
  async getCampaigns() {
    try {
      const response = await fetch('/api/newsletter/campaigns', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.warn('API failed, using fallback data');
        return [
          { id: 'demo1', settings: { subject_line: 'Welcome to NEAR Newsletter' } },
          { id: 'demo2', settings: { subject_line: 'NEAR Protocol Updates - Developer Edition' } },
          { id: 'demo3', settings: { subject_line: 'Ecosystem Highlights & Community News' } }
        ];
      }
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
      return [
        { id: 'demo1', settings: { subject_line: 'Welcome to NEAR Newsletter' } },
        { id: 'demo2', settings: { subject_line: 'NEAR Protocol Updates - Developer Edition' } },
        { id: 'demo3', settings: { subject_line: 'Ecosystem Highlights & Community News' } }
      ];
    }
  },

  async getCampaignContent(campaignId) {
    try {
      const response = await fetch(`/api/newsletter/content/${campaignId}`, {
        method: 'GET',
      });
      
      if (response.ok) {
        return await response.text();
      } else {
        throw new Error('Failed to fetch campaign content');
      }
    } catch (error) {
      console.error('Failed to fetch campaign content:', error);
      // Return fallback content
      return `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h2>NEAR Protocol Newsletter</h2>
          <p>This is a preview of newsletter content. To see actual newsletters, configure your Mailchimp API credentials.</p>
          <h3>What you'll find in our newsletters:</h3>
          <ul>
            <li>Latest NEAR Protocol developments and updates</li>
            <li>New developer tools, SDKs, and tutorials</li>
            <li>Ecosystem highlights and project spotlights</li>
            <li>Community events and opportunities</li>
            <li>Technical deep-dives and best practices</li>
          </ul>
          <p>Subscribe above to stay connected with the NEAR community!</p>
        </div>
      `;
    }
  },

  async subscribe(email) {
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        return { success: true, message: data.message || 'Successfully subscribed! Please check your email to confirm.' };
      } else {
        return { success: false, message: data.message || 'Failed to subscribe. Please try again.' };
      }
    } catch (error) {
      console.error('Subscription error:', error);
      return { success: false, message: 'An error occurred. Please try again later.' };
    }
  }
};

function parseCampaignHTML(htmlString) {
  if (typeof window === 'undefined') return htmlString;
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  // Remove header and footer
  const header = doc.querySelector('tbody[data-block-id="4"].mceWrapper');
  const footer = doc.querySelector('tbody[data-block-id="60"].mceWrapper');
  const style = doc.querySelector('style');
  
  [footer, header].forEach((element) => {
    if (element) {
      element.innerHTML = '';
    }
  });
  
  return (style?.outerHTML || '') + doc.body.innerHTML;
}

export default function Newsletter() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [campaignContent, setCampaignContent] = useState('');
  const [loadingContent, setLoadingContent] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [campaignLoading, setCampaignLoading] = useState(true);

  React.useEffect(() => {
    const loadCampaigns = async () => {
      setCampaignLoading(true);
      try {
        const data = await newsletterAPI.getCampaigns();
        setCampaigns(data);
        if (data && data.length > 0 && !selectedIssue) {
          setSelectedIssue(data[0]);
        }
      } catch (error) {
        console.error('Failed to load campaigns:', error);
        setCampaigns([]);
      } finally {
        setCampaignLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  React.useEffect(() => {
    if (selectedIssue) {
      const loadContent = async () => {
        setLoadingContent(true);
        try {
          const content = await newsletterAPI.getCampaignContent(selectedIssue.id);
          setCampaignContent(content);
        } catch (error) {
          console.error('Failed to load content:', error);
          setCampaignContent('<p>Failed to load newsletter content.</p>');
        } finally {
          setLoadingContent(false);
        }
      };

      loadContent();
    }
  }, [selectedIssue]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = async (data) => {
    try {
      setResponseError(null);
      
      const result = await newsletterAPI.subscribe(data.email);
      
      if (result.success) {
        setIsFormSubmitted(true);
      } else {
        setResponseError(result.message);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setResponseError('An error occurred. Please try again.');
    }
  };
  
  return (
    <Layout
      title="NEAR Newsletter"
      description="Stay up-to-date with the latest NEAR Protocol developments, tutorials, and ecosystem news."
    >
      <NewsletterContainer>
        <NewsletterContent>
          {campaignLoading ? (
            <LoadingSpinner />
          ) : selectedIssue ? (
            <div className="newsletter-viewer">
              {loadingContent ? (
                <LoadingSpinner />
              ) : (
                <div dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(parseCampaignHTML(campaignContent))
                }}></div>
              )}
            </div>
          ) : (
            <div className="welcome-message">
              <h3>Welcome to NEAR Newsletter</h3>
              <p>Stay updated with the latest NEAR Protocol developments, tutorials, and ecosystem news!</p>
              {campaigns && campaigns.length > 0 && (
                <p>Select a newsletter from the sidebar to read the latest content.</p>
              )}
              {campaigns && campaigns.length === 0 && !campaignLoading && (
                <p><em>No newsletter issues are available yet.</em></p>
              )}
            </div>
          )}
        </NewsletterContent>
        
        <NewsletterSidebar>
          <GreenBox>
            <h3>Subscribe to Newsletter</h3>
            {isFormSubmitted ? (
              <Confirmation>
                <strong>Thank you!</strong> Please check your email to confirm your subscription.
              </Confirmation>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                {errors.email && (
                  <div style={{ color: 'red', fontSize: '14px', marginBottom: '0.5rem' }}>
                    This field is required!
                  </div>
                )}
                {responseError && (
                  <div style={{ color: 'red', fontSize: '14px', marginBottom: '0.5rem' }}>
                    {responseError}
                  </div>
                )}
                <SubscribeForm>
                  <input
                    {...register('email', { required: true })}
                    placeholder="dev@youremail.com"
                    type="email"
                    onChange={() => setResponseError(null)}
                  />
                  <button type="submit">Subscribe</button>
                </SubscribeForm>
              </form>
            )}
          </GreenBox>
          
          <GreenBox>
            <h3>Recent Issues</h3>
          </GreenBox>
          
          <LinksList>
            {campaignLoading ? (
              <li style={{ color: 'var(--ifm-color-content-secondary)' }}>
                Loading newsletters...
              </li>
            ) : campaigns && campaigns.length > 0 ? (
              campaigns.map((issue) => (
                <li key={issue.id}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedIssue(issue);
                    }}
                    style={{
                      fontWeight: selectedIssue?.id === issue.id ? 'bold' : 'normal',
                    }}
                  >
                    {issue.settings.subject_line || issue.variate_settings?.subject_lines?.[0] || 'Newsletter Issue'}
                  </a>
                </li>
              ))
            ) : (
              <li style={{ fontStyle: 'italic', color: 'var(--ifm-color-content-secondary)' }}>
                No newsletter issues available yet.
              </li>
            )}
          </LinksList>
          
          <hr style={{ margin: '1.5rem 0', borderColor: 'var(--ifm-color-emphasis-300)' }} />
          
          <GreenBox>
            <h3>Looking for more?</h3>
          </GreenBox>
          
          <LinksList>
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
          </LinksList>
        </NewsletterSidebar>
      </NewsletterContainer>
    </Layout>
  );
}