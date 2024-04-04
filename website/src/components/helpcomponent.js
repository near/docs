import React from "react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export function HelpComponent({ children }) {
  return <>

<div class="theme-admonition theme-admonition-tip admonition_node_modules-@docusaurus-theme-classic-lib-theme-Admonition-Layout-styles-module alert alert--success">

<details>
<summary><b style={{cursor: 'pointer'}}>Looking for help? 👉 <a href="/help">Check our Resources</a> or <a>chat with us</a>!</b></summary>


<div class="col">
<br/>
<a href="https://neardevhub.org/" target="_blank" rel="noopener noreferrer"><img loading="lazy" src="https://img.shields.io/badge/DEV_HUB-03BE09" alt="DEVHUB" class="img_node_modules-@docusaurus-theme-classic-lib-theme-MDXComponents-Img-styles-module" /></a>
&nbsp;
<a href="https://bit.ly/near-dev-calendar" target="_blank" rel="noopener noreferrer"><img loading="lazy" src="https://img.shields.io/badge/CALENDAR-F9F502" alt="CALENDAR" class="img_node_modules-@docusaurus-theme-classic-lib-theme-MDXComponents-Img-styles-module" /></a>
&nbsp;
<a href="https://t.me/addlist/VyVjNaP190JlOGMx" target="_blank" rel="noopener noreferrer"><img loading="lazy" src="https://img.shields.io/badge/DEV_SUPPORT-BE0303" alt="DEV SUPPORT" class="img_node_modules-@docusaurus-theme-classic-lib-theme-MDXComponents-Img-styles-module" /></a>
&nbsp;
<a href="https://newsletter.neardevhub.org/" target="_blank" rel="noopener noreferrer"><img loading="lazy" src="https://img.shields.io/badge/NEWSLETTER-0087E5" alt="NEWSLETTER" class="img_node_modules-@docusaurus-theme-classic-lib-theme-MDXComponents-Img-styles-module" /></a>
&nbsp;
<a href="https://github.com/orgs/near/discussions/new?category=dev-feedback" target="_blank" rel="noopener noreferrer"><img loading="lazy" src="https://img.shields.io/badge/FEEDBACK-purple" alt="FEEDBACK" class="img_node_modules-@docusaurus-theme-classic-lib-theme-MDXComponents-Img-styles-module" /></a>
</div>

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
</details>

</div>

  </>
}
