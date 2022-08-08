import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";
import ReferenceCode from "@theme/ReferenceCodeBlock";

export function CodeTabs({ children }) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  return (
    <Tabs className="language-tabs" groupId="code-tabs">
      {children.map((component, index) => {
        return (
          <TabItem value={component.props.value} label={component.props.value}>
            {component}
          </TabItem>
        );
      })}
    </Tabs>
  );
}

export function Language({ children, language }) {
  if (!Array.isArray(children)) {
    children = [children];
  }

  children = children.map((component) =>
    change_language_to(component, language)
  );

  if (children.length == 1) {
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

export function Github({ url, start, end, language, fname }) {
  let fullURL = url + "#";
  if (start && end) {
    fullURL += "L" + start + "-L" + end + "#";
  }
  return (
    <ReferenceCode language={language} fname={fname}>
      {fullURL}
    </ReferenceCode>
  );
}

/* AUX function */
function change_language_to(component, language) {
  const { children, url, start, end, fname } = component.props;

  if (component.props.mdxType == "Github") {
    return Github({ url, start, end, language, fname });
  }

  if (component.props.mdxType == "CodeBlock") {
    return (
      <CodeBlock fname={fname} language={language}>
        {children}
      </CodeBlock>
    );
  }

  return component;
}
