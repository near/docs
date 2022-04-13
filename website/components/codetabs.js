import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export function CodeTabs({ children }) {
  return (
    <Tabs className="language-tabs">
      {children}
    </Tabs>
  );
}

export function Assemblyscript({ children }) {
  return <TabItem value="as" label="🚀 - Assemblyscript"> this is the children </TabItem>
}

export function File({ children, fname }) {
  return (
    <TabItem value={fname} label={fname}>
      {children}
    </TabItem>
  );
}