import React from "react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export function FeatureList({ children }) {
  return <>
    <div className="container features">
      <div className="row">
        {children}
      </div>
    </div>
  </>
}

export function Column({ title, children, size = 4 }) {
  return <>
    <div className={`col col--${size}`}>
      <h3>{title}</h3>
      {children}
    </div>
  </>
}

export function Feature({ image, title, subtitle, url, highlight = false }) {
  const { siteConfig, i18n } = useDocusaurusContext();
  let link;
  if (url.startsWith('http')) {
    link = <svg width="0.8rem" height="0.8rem" aria-hidden="true" viewBox="0 0 24 24" className="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>;
  } else if (i18n.currentLocale != i18n.defaultLocale) {
    url = "/" + i18n.currentLocale + url;
  }

  return <>
    <h4>  </h4>
    <a className="avatar" href={url} style={{ backgroundColor: highlight && "rgb(240, 255, 240)" }}>
      <img
        className="avatar__photo"
        src={require(`@site/static/docs/assets/welcome-pages/${image}`).default} />
      <div className="avatar__intro">
        <div className="avatar__name">{title} {link}</div>
        <small className="avatar__subtitle">{subtitle}</small>
      </div>
    </a>
  </>
}