const mailchimp = require('@mailchimp/mailchimp_marketing');
const { mailchimpApiKey, mailchimpRegion, newsletterAudienceId } = require('../config');

mailchimp.setConfig({
  apiKey: mailchimpApiKey,
  server: mailchimpRegion,
});

async function getCampaigns(req, res) {
  if (!mailchimpApiKey || !mailchimpRegion) {
    res.status(200).json([]); // Return empty array if not configured
    return;
  }

  try {
    const response = await mailchimp.campaigns.list({
      fields: [
        'campaigns.settings.subject_line',
        'campaigns.send_time',
        'campaigns.id',
        'campaigns.variate_settings.combinations',
        'campaigns.variate_settings.subject_lines',
      ],
      count: 5,
      status: 'sent',
      sortField: 'send_time',
      sortDir: 'DESC',
    });

    if ('campaigns' in response) {
      res.status(200).json(response.campaigns);
    } else {
      res.status(500).json({ error: 'Failed to fetch campaigns' });
    }
  } catch (error) {
    console.error('Mailchimp API error:', error);
    res.status(500).json({ error: 'error' });
  }
}

async function getCampaignContent(req, res) {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'Missing id parameter' });
    return;
  }

  if (!mailchimpApiKey || !mailchimpRegion) {
    res.status(500).json({ error: 'Newsletter service is not configured' });
    return;
  }

  try {
    const response = await mailchimp.campaigns.getContent(id.toString());
    if ('html' in response) {
      res.status(200).json(response.html);
    } else {
      res.status(500).json({ error: 'Invalid response from Mailchimp' });
    }
  } catch (error) {
    console.error('Mailchimp API error:', error);
    res.status(500).json({ error: 'error' });
  }
}

async function subscribeToNewsletter(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!mailchimpApiKey || !mailchimpRegion || !newsletterAudienceId) {
      res.status(500).json({
        success: false,
        message: 'Newsletter service is not configured.',
      });
      return;
    }

    try {
      const response = await mailchimp.lists.addListMember(newsletterAudienceId, {
        email_address: email,
        status: 'pending',
      });

      console.log(`response: ${response}`);

      res.status(200).json({
        success: true,
        message: 'Form submitted successfully! Please confirm your email',
      });
    } catch (error) {
      console.error('Error adding to list:', error);

      if (error.status === 400 && error.response.body.title === 'Member Exists') {
        res.status(500).json({
          success: false,
          message: 'Email already subscribed.',
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'An error occurred while processing your request.',
        });
      }
    }
  }
}

module.exports = {
  getCampaigns,
  getCampaignContent,
  subscribeToNewsletter
};