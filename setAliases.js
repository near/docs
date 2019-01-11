const path = require('path');

module.exports = (config) => {
    const newalias = {
        '@public': path.join(__dirname, '/public'),
    };

    config.resolve.alias = { ...config.resolve.alias, ...newalias };
    return config;
};

