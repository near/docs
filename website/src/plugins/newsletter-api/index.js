const express = require('express');
const { getCampaigns, getCampaignContent, subscribeToNewsletter } = require('../../api/newsletter');

module.exports = function (context, options) {
  return {
    name: 'newsletter-api-plugin',
    configureWebpack(config, isServer, utils) {
      return {
        devServer: isServer ? {} : {
          setupMiddlewares: (middlewares, devServer) => {
            if (!devServer) {
              throw new Error('webpack-dev-server is not defined');
            }

            devServer.app.use(express.json());
            
            devServer.app.get('/api/newsletter/campaigns', getCampaigns);
            devServer.app.get('/api/newsletter/content/:id', getCampaignContent);
            devServer.app.post('/api/newsletter/subscribe', subscribeToNewsletter);

            return middlewares;
          },
        },
      };
    }
  };
};