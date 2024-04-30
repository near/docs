import React, { useState, useEffect } from "react";
import { Github } from "./codetabs";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

export function ExplainCode({ children, id = 1 }) {
  let blocks = [];
  let files = []
  for (let child of children) {
    if (child.type === Block) {
      blocks.push({ text: child.props.children, highlight: child.props.highlights, fname: child.props.fname });
    }
  }
  const [lineNumber, setLineNumber] = useState(blocks[0].highlight);
  const [activeBlock, setActiveBlock] = useState(0);

  for (let child of children) {
    if (child.type === File) {
      files.push(
        { ...child.props }
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

    const y0 = document.getElementById(`block0`).getBoundingClientRect().top;

    let sumOfHeights = 0;
    for (let i = 0; i < blocks.length; i++) {
      sumOfHeights += document.getElementById(`block${i}`).clientHeight;
    }

    const handleScroll = () => {
      // how much we can scroll is the sumOfHeights - what we can see
      // what we can see is window.innerHeight - starting position of block 0
      const scrollableHeight = sumOfHeights - (window.innerHeight - y0);
      const scrollPercentage = window.scrollY / scrollableHeight;

      // select the block that corresponds the percentage of the scroll bar
      let acc = 0;
      for (let i = 0; i < blocks.length; i++) {
        const block = document.getElementById(`block${i}`)
        const blockHeight = block.clientHeight;
        acc += blockHeight / sumOfHeights;

        if (acc > scrollPercentage) {
          setLineNumber(blocks[i].highlight);
          setActiveBlock(i);
          break;
        }
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="row code-explain">
      <div className="col-forced--4 col" id="codeblocks">
        {blocks.map((block, index) => <InnerBlock selected={activeBlock === index} index={index} text={block.text} />)}
      </div>
      <div className="col-forced--8 col">
        <div id="files"
          style={{ position: 'sticky', height: '100vh', overflow: 'scroll' }}>
          <Tabs className="file-tabs" selectValue={(e) => {console.log(e)}}>
            {files.map(file =>
              <TabItem value={file.fname} label={file.fname} >
                <InnerFile {...file} lineNumber={lineNumber} />
              </TabItem>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function InnerBlock({ selected, text, index }) {
  const cssState = selected ? 'block-selected' : '';
  return <>
    <div className={`block ${cssState} padding--sm`} key={index} id={`block${index}`}>
      {text}
    </div>
  </>;
}

function InnerFile({ url, start, end, language, fname, lineNumber }) {
  return <>
    <Github url={url} start={start} end={end} language={language}
      fname={fname} metastring={`{${lineNumber}}`}
    />
  </>
}

export function Block({ children }) {
  return children;
}

export function File({ children }) {
  return children;
}

export default { ExplainCode, Block, File };