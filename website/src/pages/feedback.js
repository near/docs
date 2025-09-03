import React from 'react';
import Layout from '@theme/Layout';
import FeedbackComponent from '../components/FeedbackPageComponent';

export default function FeedbackPage() {
  return (
    <Layout
      title="Feedback"
      description="Share your feedback about NEAR Documentation"
    >
      <main style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem 0'
      }}>
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <FeedbackComponent />
        </div>
      </main>
    </Layout>
  );
}