import React from "react";

export function FeatureList({ children }) {
  return <>
    <div class="container">
      <div class="row">
        {children}
      </div>
    </div>
  </>
}

export function Column({ title, children, size = 4 }) {
  return <>
    <div class={`col col--${size}`}>
      <h3>{title}</h3>
      {children}
    </div>
  </>
}

export function Feature({ image, title, subtitle, url }) {
  return <>
    <h4>  </h4>
    <a class="avatar" href={url}>
      <img
        class="avatar__photo"
        src={require(`@site/static/docs/assets/welcome-pages/${image}`).default} />
      <div class="avatar__intro">
        <div class="avatar__name">{title}</div>
        <small class="avatar__subtitle">{subtitle}</small>
      </div>
    </a>
  </>
}