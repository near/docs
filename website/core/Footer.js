/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                className="logo"
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="180"
                height="60"
              />
            )}
          </a>
          <div>
            <h5 className="footerTitle">DEVELOPERS</h5>
            <a href="/">
              Docs
            </a>
            <a href="https://nearprotocol.com/events/">
              Events
            </a>
            <a href="https://nearprotocol.typeform.com/to/UBOiPg">
              Survey
            </a>
            <a href="https://github.com/nearprotocol">
              Github
            </a>
          </div>
          <div>
            <h5 className="footerTitle">BUSINESSES</h5>
            <a
              href="https://stackoverflow.com/questions/tagged/"
              target="_blank"
              rel="noreferrer noopener">
              Use Cases
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer noopener">
              Partners
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer noopener">
              Become a partner
            </a>
          </div>
          <div>
            <h5 className="footerTitle">COMMUNITY</h5>
            <a
              href="https://nearprotocol.com/events/"
              target="_blank"
              rel="noreferrer noopener">
              Events
            </a>
          </div>
          <div>
            <h5 className="footerTitle">MEDIA</h5>
            <a
              href="https://nearprotocol.com/blog/"
              target="_blank"
              rel="noreferrer noopener">
              Blog
            </a>
            <a
              href="https://nearprotocol.com/blog/category/videos/"
              target="_blank"
              rel="noreferrer noopener">
              Videos
            </a>
            <a
              href="https://medium.com/nearprotocol"
              target="_blank"
              rel="noreferrer noopener">
              Medium
            </a>
            <a
              href="https://www.youtube.com/channel/UCuKdIYVN8iE3fv8alyk1aMw"
              target="_blank"
              rel="noreferrer noopener">
              YouTube
            </a>
            <a
              href="https://twitter.com/nearprotocol"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>
          </div>
          <div>
            <h5 className="footerTitle">ABOUT</h5>
            <a
              href="https://nearprotocol.com/team/"
              target="_blank"
              rel="noreferrer noopener">
              Team
            </a>
            <a
              href="https://nearprotocol.com/careers/"
              target="_blank"
              rel="noreferrer noopener">
              Careers
            </a>
            <a
              href="https://nearprotocol.com/investors/"
              target="_blank"
              rel="noreferrer noopener">
              Investors
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer noopener">
              Nearkats
            </a>
            <a
              href="http://nearprotocol.com/downloads/NEAR_PressKit.zip"
              target="_blank"
              rel="noreferrer noopener">
              Press
            </a>
          </div>
          <div>
            <h5>JOIN THE COVERSATION</h5>
            <a href={`${this.props.config.baseUrl}blog`}>Blog</a>
            <a href="https://github.com/">GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/facebook/docusaurus/stargazers"
              data-show-count="true"
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
            {this.props.config.twitterUsername && (
              <div className="social">
                <a
                  href={`https://twitter.com/${
                    this.props.config.twitterUsername
                  }`}
                  className="twitter-follow-button">
                  Follow @{this.props.config.twitterUsername}
                </a>
              </div>
            )}
            {this.props.config.facebookAppId && (
              <div className="social">
                <div
                  className="fb-like"
                  data-href={this.props.config.url}
                  data-colorscheme="dark"
                  data-layout="standard"
                  data-share="true"
                  data-width="225"
                  data-show-faces="false"
                />
              </div>
            )}
          </div>
        </section>
        <section className="extendedFooter nav-footer">
          <a href="https://docs.nearprotocol.com/">
            <img
                src={this.props.config.baseUrl + "img/docs.svg"}
                alt=""
                width="180"
                height="60"
              />
          </a>
            <a href="https://wallet.nearprotocol.com/">
              <img
                src={this.props.config.baseUrl + "img/wallet.svg"}
                alt=""
                width="180"
                height="60"
              />
            </a>
            <a href="https://studio.nearprotocol.com/">
              <img
                src={this.props.config.baseUrl + "img/studio.svg"}
                alt=""
                width="180"
                height="60"
              />
            </a>
            <a href="https://explorer.nearprotocol.com/">
              <img
                src={this.props.config.baseUrl + "img/explorer.svg"}
                alt=""
                width="180"
                height="60"
              />
            </a>
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
