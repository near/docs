import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import {FeedbackComponent } from "../../../components/FeedbackComponent";

export default function FooterWrapper(props) {
  return (
    <>
      <Footer {...props} />
      <hr />
      <FeedbackComponent />
    </>
  );
}
