import React, { useState, useEffect } from "react";
import CodeBlock from "@theme/CodeBlock";
import { Github } from "./codetabs";

export function ExplainCode({ children, id = 1 }) {

  let blocks = [];
  let files = []
  for (let child of children) {
    if (child.type === Block) {
      blocks.push({ text: child.props.children, highlight: child.props.highlights, fname: child.props.fname });
    }
  }

  const [lineNumber, setLineNumber] = useState(blocks[0].highlight);

  for (let child of children) {
    if (child.type === File) {
      files.push(
        <Github url={child.props.url} start={child.props.start} end={child.props.end} language={child.props.language} fname={child.props.fname} metastring={`{${lineNumber}}`} />
      )
    }
  }

  useEffect(() => {
    // scroll the #files div to the class #theme-code
    const highlightedLine = document.querySelector('.theme-code-block-highlighted-line');
    if (highlightedLine) {
      const files = document.getElementById('files');
      const scrollTo = highlightedLine.offsetTop - files.clientHeight / 2;
      files.scrollTo({ top: scrollTo, behavior: 'smooth' });
    }
  }, [lineNumber]);

  useEffect(() => {
    // at the beginning, #files is sticky and takes "top" as the height of .nav
    const nav = document.querySelector('.navbar');
    const files = document.getElementById('files');
    files.style.top = `${nav.clientHeight}px`;
  });

  useEffect(() => {
    const handleScroll = () => {

      // border cases
      if (window.scrollY === 0) {
        setLineNumber(blocks[0].highlight);
        return;
      }

      const lastBlock = document.getElementById(`block${blocks.length - 1}`);
      const rect = lastBlock.getBoundingClientRect();
      if (rect.bottom < window.innerHeight) {
        setLineNumber(blocks[blocks.length - 1].highlight);
        return;
      }

      // when a #block${i} is at the middle of the screen, set the corresponding line number to the state
      for (let i = 0; i < blocks.length; i++) {
        const block = document.getElementById(`block${i}`);
        const rect = block.getBoundingClientRect();
        const offsetWindowHeight = (document.querySelector('.navbar').clientHeight + window.innerHeight) / 2;
        if (rect.top < offsetWindowHeight && rect.bottom > offsetWindowHeight) {
          setLineNumber(blocks[i].highlight);
          break;
        }
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="row code-explain">
      <div className="col-forced--4 col" id="codeblocks">
        {blocks.map((block, index) => (
          <div key={index} id={`block${index}`} className="padding--sm">
            {block.text}
          </div>
        ))}
      </div>
      <div className="col-forced--8 col">
        <div id="files" style={{ position: 'sticky', height: '100vh', overflow: 'scroll' }}>
          {files[0]}
        </div>
      </div>
    </div>);
}

export function Block({ children }) {
  return <div>{children}</div>;
}

export function File({ children }) {
  return <div>{children}</div>;
}

export default { ExplainCode, Block, File };