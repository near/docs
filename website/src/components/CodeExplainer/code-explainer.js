import React, { useState, useEffect } from "react";
import CodeBlock from '@theme/CodeBlock'

import { Github } from "../codetabs";

import DesktopView from './desktop'
import MobileView from './mobile'

export const lang2label = {
  "rust": "🦀 RS",
  "js": "🌐 JS",
  "ts": "🌐 TS",
}

export function ExplainCode({ children, languages }) {
  languages = languages.split(",");
  const [language, setLang] = useState(languages[0]);
  const [blocks, setBlocks] = useState([]);
  const [files, setFiles] = useState([]);
  const [isWideEnough, setIsWideEnough] = useState(true);

  // validate languages
  if (!languages.every(lang => lang in lang2label)) throw new Error("languages must be one of ['rust', 'js', 'ts']");

  const setLanguage = (lang) => {
    localStorage.setItem('docusaurus.tab.code-tabs', lang);
    setLang(lang);
  }

  useEffect(() => {
    const storedLang = localStorage.getItem('docusaurus.tab.code-tabs');
    if (storedLang && languages.includes(storedLang)) setLang(storedLang);

    // check if we should render Desktop or Mobile
    setIsWideEnough(window.innerWidth > 768);
  }, [])

  useEffect(() => {
    let blocks = [];
    let files = []

    for (let child of children) {
      if (child.props.highlights) {
        let props_highlights = JSON.parse(child.props.highlights);
        if (props_highlights && language in props_highlights) {
          blocks.push({ text: child.props.children, highlight: props_highlights[language], fname: child.props.fname, type: child.props.type });
        }
      }
      if (language === child.props.language) files.push({ ...child.props })
    }

    setBlocks(blocks);
    setFiles(files);
  }, [language]);

  if (!blocks.length || !files.length) return "Loading...";

  if (isWideEnough) {
    return <DesktopView props={{ blocks, files, languages, language, setLanguage }} />
  } else {
    return <MobileView props={{ blocks, files, languages, language, setLanguage }} />
  }
}

export function Block({ children }) { return children; }

export function File({ children }) { return children; }

export function InnerBlock({ selected, text, index, activateFn, type }) {
  console.log("TYPE", type);
  if (type) {
    return <div id={`block${index}`}>{text}</div>;
  }

  const cssState = selected ? 'block-selected' : '';
  return (
    <div className={`block ${cssState} padding--sm`} key={index} id={`block${index}`} onClick={() => activateFn(index)}>
      {text}
    </div>
  );
}

export function InnerFile({ url, start, end, language, fname, lineNumber, children }) {
  if (!url) {
    return (
      <div fname={fname}>
        <CodeBlock language={language} metastring={`{${lineNumber}}`} >
          {children.props.children.props.children}
        </CodeBlock>
      </div>
    );
  }

  return <>
    <div fname={fname}>
      <Github url={url} start={start} end={end}
        language={language} fname={fname}
        metastring={`{${lineNumber}}`} />
    </div>
  </>
}

export default { ExplainCode, Block, File };