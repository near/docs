import React, { useState, useEffect } from "react";
import { Github } from "./codetabs";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import Admonition from '@theme/Admonition';

export function ExplainCode({ children, alternativeURL }) {
  const [lineNumber, setLineNumber] = useState(0);
  const [activeBlock, setActiveBlock] = useState(0);

  let blocks = [];
  let files = []

  for (let child of children) {
    if (child.type === Block) {
      blocks.push({ text: child.props.children, highlight: child.props.highlights, fname: child.props.fname });
    } else {
      files.push({ ...child.props })
    }
  }

  useEffect(() => {
    // scroll to the highlighted line
    const highlightedLine = document.querySelector('.theme-code-block-highlighted-line');

    if (highlightedLine) {
      const files = document.getElementById('files');
      const scrollTo = highlightedLine.offsetTop - files.clientHeight / 2;
      files.scrollTo({ top: scrollTo, behavior: 'smooth' });
    }
  }, [lineNumber]);

  useEffect(() => {
    // #files is sticky, and it "sticks" at the height of the .navbar
    const nav = document.querySelector('.navbar');
    const files = document.getElementById('files');
    files.style.top = `${nav.clientHeight}px`;

    // calculate the size of the code explanations
    const t0 = document.getElementById(`block0`).getBoundingClientRect().top;
    const bN = document.getElementById(`block${blocks.length - 1}`).getBoundingClientRect().bottom;
    let blocksHeight = Math.abs(bN - t0);

    // the scrollable height is the size of the blocks that we cannot see
    // plus an offset if the window is already scrolled
    const offset = window.scrollY + t0;
    let scrollableHeight
    if (blocksHeight < window.innerHeight + offset) {
      scrollableHeight = blocksHeight
    } else {
      scrollableHeight = blocksHeight - window.innerHeight + offset;
    }

    // add some padding to the end of the blocks so we can always scroll
    if ( files.clientHeight > blocksHeight) {
      const oneEm = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const tN = document.getElementById(`block${blocks.length - 1}`).getBoundingClientRect().top;

      document.getElementById('extra-padding').style.height = `${files.clientHeight - Math.abs(tN - bN) + oneEm}px`;
    }

    const handleScroll = () => {
      const scrollPercentage = window.scrollY / scrollableHeight;

      // select the block that corresponds the percentage of the scroll bar
      let acc = 0;
      for (let i = 0; i < blocks.length; i++) {
        const block = document.getElementById(`block${i}`)
        const blockHeight = block.clientHeight;
        acc += blockHeight / blocksHeight;

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

  const isWideEnough = window.innerWidth > 768;

  return (
    <>
    <div hidden={isWideEnough}>
      <Admonition type="danger">
        This page will not render correctly in small screen, consider using the <a href={alternativeURL}>plain text version</a>
      </Admonition>
    </div>

    <div className="row code-explain">
      <div className="col-forced--4 col" id="codeblocks">
        {blocks.map((block, index) => <InnerBlock selected={activeBlock === index} index={index} text={block.text} />)}
        <div id="extra-padding" style={{width: "100%"}}></div>
      </div>
      <div className="col-forced--8 col">
        <div id="files"
          style={{ position: 'sticky', height: '100vh', overflow: 'scroll' }}>
          <Tabs className="file-tabs" selectedValue={blocks[activeBlock].fname}>
            {files.map(file =>
              <TabItem value={file.fname} >
                <InnerFile {...file} lineNumber={lineNumber} />
              </TabItem>
            )}
          </Tabs>
        </div>
      </div>
    </div>
    </>
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

export function Block({ children }) { return children; }

export function File({ children }) { return children; }

export default { ExplainCode, Block, File };