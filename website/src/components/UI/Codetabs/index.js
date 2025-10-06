import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GitHubInternal from '../../github';

const lang2label = {
  rust: '🦀 Rust',
  js: '🌐 Javascript',
  ts: '🌐 Typescript',
};

export function CodeTabs({ children }) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  return (
    <Tabs groupId="code-tabs">
      {children.map((component, index) => {
        return (
          <TabItem value={component.props.value} label={lang2label[component.props.value]}>
            {component}
          </TabItem>
        );
      })}
    </Tabs>
  );
}

export function Language({ children, language, showSingleFName }) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  children = children.map((component) => change_language_to(component, language));

  if (children.length == 1 && !showSingleFName) {
    return (
      <TabItem value={0} label={children[0].props.fname}>
        {children[0]}
      </TabItem>
    );
  } else {
    return (
      <Tabs className="file-tabs">
        {children.map((component, index) => {
          return (
            <TabItem value={index} label={component.props.fname}>
              {component}
            </TabItem>
          );
        })}
      </Tabs>
    );
  }
}

export function Github({ url, start, end, language, fname, metastring, withSourceLink }) {
  return GitHubInternal({ url, start, end, language, fname, metastring, withSourceLink });
}

/* AUX function */
function change_language_to(component, language) {
  const { children, url, start, end, fname } = component.props;

  if (component.type === Github) {
    return Github({ url, start, end, language, fname });
  }

  return component;
}
