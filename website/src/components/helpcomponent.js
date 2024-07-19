import React from "react";

export function HelpComponent({ children }) {
  return <>
    <div class="theme-admonition theme-admonition-tip admonition_node_modules-@docusaurus-theme-classic-lib-theme-Admonition-Layout-styles-module alert alert--success">

      <details>
        <summary><b style={{ cursor: 'pointer' }}>Need some help? <a>Chat with us</a></b> or check our <a href="/help">Dev Resources</a>!</summary>

        <div class="row mb-1">
          <div class="col col--3">
            <div className="avatar">
              <img
                className="avatar__photo avatar__photo--sm"
                src={require("@site/static/docs/assets/home/twitter.png").default} />
              <div className="avatar__intro">
                <div className="avatar__name"><a href="https://twitter.com/@nearprotocol" target="_blank" rel="noopener noreferrer">Twitter</a></div>
              </div>
            </div>
          </div>
          <div class="col col--3">
            <div className="avatar">
              <img
                className="avatar__photo avatar__photo--sm"
                src={require("@site/static/docs/assets/home/telegram.png").default} />
              <div className="avatar__intro">
                <div className="avatar__name"><a href="https://t.me/neardev" target="_blank" rel="noopener noreferrer">Telegram</a></div>
              </div>
            </div>
          </div>
          <div class="col col--3">
            <div className="avatar">
              <img
                className="avatar__photo"
                src={require("@site/static/docs/assets/home/discord.png").default} />
              <div className="avatar__intro">
                <div className="avatar__name"><a href="https://near.chat" target="_blank" rel="noopener noreferrer">Discord</a></div>
              </div>
            </div>
          </div>
          <div class="col col--3">
            <div className="avatar">
              <img
                className="avatar__photo"
                src={require("@site/static/docs/assets/home/zulip.png").default} />
              <div className="avatar__intro">
                <div className="avatar__name"><a href="https://near.zulipchat.com/" target="_blank" rel="noopener noreferrer">Zulip</a></div>
              </div>
            </div>
          </div>
        </div>
      </details>

    </div>

  </>
}
