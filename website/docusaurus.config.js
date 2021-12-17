module.exports={
  "title": "NEAR Documentation",
  "tagline": "Documentation for NEAR Protocol",
  "url": "https://docs.near.org",
  "baseUrl": "/",
  "organizationName": "near",
  "projectName": "docs",
  "scripts": [
    "https://buttons.github.io/buttons.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    "https://use.fontawesome.com/221fd444f5.js",
    "/js/copy-code-button.js",
    "/js/mixpanel.js",
    "/js/hotjar.js"
  ],
  "stylesheets": [
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&family=Source+Code+Pro:ital,wght@0,400;0,600;1,400;1,600&display=swap",
    "/css/copy-code-button.css",
    "/css/landing-page.css",
    "https://near.org/wp-content/themes/near-19/assets/dist/near.min.css"
  ],
  "favicon": "img/favicon.ico",
  "customFields": {
    "disableHeaderTitle": true,
    "fonts": {
      "myFont": [
        "Inter",
        "sans-serif"
      ]
    }
  },
  "themes": [
    "@saucelabs/theme-github-codeblock"
  ],
  "onBrokenLinks": "log",
  "onBrokenMarkdownLinks": "log",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "showLastUpdateAuthor": true,
          "showLastUpdateTime": true,
          "editUrl": "https://github.com/near/docs/edit/master/website",
          "path": "../docs",
          "sidebarPath": "../website/sidebars.json"
        },
        googleAnalytics: {
          trackingID: 'UA-100373569-7',
          anonymizeIP: true,
        },
        "blog": {},
        "theme": {
          "customCss": "../src/css/customTheme.css"
        }
      }
    ]
  ],
  "plugins": [],
  "themeConfig": {
    prism: {
      "additionalLanguages": [
        "rust", "java", "python", "ruby", "go", "toml"
      ]
    },
    "colorMode": {
        "defaultMode": "light",
        "disableSwitch": true,
    },
    "navbar": {
      "title": "DOCS",
      "logo": {
        "src": "img/near_logo.svg"
      },
      "items": [
        {
          "to": "docs/concepts/new-to-near",
          "label": "Concepts",
          "position": "left"
        },
        {
          "to": "docs/develop/basics/getting-started",
          "label": "Develop",
          "position": "left"
        },
        {
          "to": "docs/tutorials/overview",
          "label": "Tutorials",
          "position": "left"
        },
        {
          "to": "docs/api/overview",
          "label": "API",
          "position": "left"
        },
        {
          "href": "https://wiki.near.org/validator/validator-overview",
          "label": "Tokens/Staking",
          "position": "left"
        },
        {
          "to": "docs/roles/integrator/exchange-integration",
          "label": "Exchanges",
          "position": "left"
        },
        {
          "to": "docs/community/community-channels",
          "label": "Community",
          "position": "left"
        },
        {
          "type": 'search',
          "position": 'right',
        },
        {
          "type": 'localeDropdown',
          "position": 'right',
        },
      ]
    },
    "image": "img/near_logo.svg",
    "footer": {
      "links": [],
      "copyright": "Copyright © 2021 NEAR Protocol",
      "logo": {
        "src": "img/near_logo.svg"
      }
    },
    "algolia": {
      "apiKey": "058929d1d423f0f46d3278a102d58bfd",
      "indexName": "near",
      "placeholder": "Search the Docs..."
    },
    "gtag": {
      "trackingID": "UA-100373569-7"
    }
  },
  "i18n": {
    "defaultLocale": "en",
    "locales": ["en", "es-ES", "fr", "ko", "pt-BR", "ru", "vi", "zh-CN"],
    "localeConfigs": {
      "es-ES": {
        "label": "Español"
      },
      "pt-BR": {
        "label": "Português"
      },
      "zh-CN": {
        "label": "简体中文"
      }
    }
  }
}
