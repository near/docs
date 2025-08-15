require('dotenv').config();

export const mailchimpApiKey = process.env.MAILCHIMP_API_KEY || process.env.REACT_APP_MAILCHIMP_API_KEY || '';
export const mailchimpRegion = process.env.MAILCHIMP_REGION || process.env.REACT_APP_MAILCHIMP_REGION || '';
export const newsletterAudienceId = process.env.NEWSLETTER_AUDIENCE_ID || process.env.REACT_APP_NEWSLETTER_AUDIENCE_ID || '';

export const isProduction = process.env.NODE_ENV === 'production';