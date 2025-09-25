import React from 'react';
import Layout from '@theme/Layout';
import Tools from '../components/tools';

export default function ToolBox() {
  return (
    <Layout
      title="Toolbox"
      description="Handy tools for NEAR developers and users"
    >
      <main style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem 0'
      }}>
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <Tools />
        </div>
      </main>
    </Layout>
  );
}