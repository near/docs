import React from "react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export function HelpComponent({ children }) {
  return <>

<h3> Looking for help? 👉 <a href="/help">Check our Resources</a></h3>

<div class="row">
  <div class="col col--3">
    <div className="avatar">
      <img
        className="avatar__photo avatar__photo--sm"
        src={require("@site/static/docs/assets/home/twitter.png").default} />
      <div className="avatar__intro">
        <div className="avatar__name"><a href="https://twitter.com/@nearprotocol">Twitter</a></div>
      </div>
    </div>
  </div>
  <div class="col col--3">
    <div className="avatar">
      <img
        className="avatar__photo avatar__photo--sm"
        src={require("@site/static/docs/assets/home/telegram.png").default} />
      <div className="avatar__intro">
        <div className="avatar__name"><a href="https://t.me/neardev">Telegram</a></div>
      </div>
    </div>
  </div>
  <div class="col col--3">
    <div className="avatar">
      <img
        className="avatar__photo"
        src={require("@site/static/docs/assets/home/discord.png").default} />
      <div className="avatar__intro">
        <div className="avatar__name"><a href="https://near.chat">Discord</a></div>
      </div>
    </div>
  </div>
  <div class="col col--3">
    <div className="avatar">
      <img
        className="avatar__photo"
        src={require("@site/static/docs/assets/home/zulip.png").default} />
      <div className="avatar__intro">
        <div className="avatar__name"><a href="https://near.zulipchat.com/">Zulip</a></div>
      </div>
    </div>
  </div>
</div>

  </>
}
