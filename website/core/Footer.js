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
          {/* <div>
            <h5>JOIN THE COVERSATION</h5>
            <table cellPadding="15px" className="footerTable">
              <tbody>
                <tr className="footerTableRow">
                  <td height="70px" width="70px" className="footerTableCell footerTableBorderLeft footerTableBorderBottom">
                    <a href="https://t.me/cryptonear">
                      <img
                        src={this.props.config.baseUrl + "img/docs.svg"}
                        alt=""
                      />
                    </a>
                  </td>
                  <td height="70px" width="70px" className="footerTableCell footerTableBorderLeft footerTableBorderBottom">
                    <a href="https://medium.com/nearprotocol">
                      <img
                        src={this.props.config.baseUrl + "img/docs.svg"}
                        alt=""
                      />
                    </a>
                  </td>
                  <td height="70px" width="70px"className="footerTableCell footerTableBorderBottom">
                    <a href="https://discordapp.com/invite/gBtUFKR">
                      <img
                        src={this.props.config.baseUrl + "img/docs.svg"}
                        alt=""
                      />
                    </a>
                  </td>
                </tr>
                <tr className="footerTableRow">
                  <td height="70px" width="70px" className="footerTableCell footerTableBorderLeft">
                    <a href="https://twitter.com/nearprotocol">
                      <img
                        src={this.props.config.baseUrl + "img/docs.svg"}
                        alt=""
                      />
                    </a>
                  </td>
                  <td height="70px" width="70px" className="footerTableCell footerTableBorderLeft">
                    <a href="https://www.instagram.com/near_protocol/">
                      <img
                        src={this.props.config.baseUrl + "img/docs.svg"}
                        alt=""
                      />
                    </a>
                  </td>
                  <td height="70px" width="70px" className="footerTableCell">
                    <a href="https://www.facebook.com/NEARProtocol/">
                      <img
                        src={this.props.config.baseUrl + "img/docs.svg"}
                        alt=""
                      />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </section>
        <section className="extendedFooter nav-footer">
          <h3 className="footerPreText">THE NEAR NETWORK</h3>
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
