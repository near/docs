import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import {FeedbackComponent } from "../../../components/FeedbackComponent";

export default function FooterWrapper(props) {
  return (
    <>
      <Footer {...props} />

      <div class="theme-admonition theme-admonition-tip admonition_node_modules-@docusaurus-theme-classic-lib-theme-Admonition-Layout-styles-module alert alert--success">
      <FeedbackComponent />
      </div>
    </>
  );
}
