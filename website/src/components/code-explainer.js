import React, { useState, useEffect } from "react";
import { Github } from "./codetabs";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import Admonition from '@theme/Admonition';

const lang2label = {
  "rust": "🦀 Rust",
  "js": "🌐 JavaScript",
  "ts": "🌐 TypeScript",
}

export function ExplainCode({ children, languages, alternativeURL }) {
  const [lineNumber, setLineNumber] = useState(0);
  const [activeBlock, setActiveBlock] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isWideEnough, setIsWideEnough] = useState(true);
  const [language, setLanguage] = useState(languages[0]);
  const [blocks, setBlocks] = useState([]);
  const [files, setFiles] = useState([]);

  // validate languages
  if (!languages.every(lang => lang in lang2label)) throw new Error("languages must be one of ['rust', 'js', 'ts']");

  useEffect(() => {
    let blocks = [];
    let files = []

    for (let child of children) {
      if (child.type === Block) {
        if (language in child.props.highlights) {
          blocks.push({ text: child.props.children, highlight: child.props.highlights[language], fname: child.props.fname });
        }
      } else {
        if (language === child.props.language) files.push({ ...child.props })
      }
    }

    setBlocks(blocks);
    setFiles(files);
  }, [language]);

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
    if (!blocks.length || !files.length) return;

    // check if the window is wide enough to render the code explainer
    setIsWideEnough(window.innerWidth > 768);

    // #files is sticky, and it "sticks" at the height of the .navbar
    const nav = document.querySelector('.navbar');
    const filesElem = document.getElementById('files');
    filesElem.style.top = `${nav.clientHeight}px`;

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
    const oneEm = parseFloat(getComputedStyle(document.documentElement).fontSize);

    if (files.clientHeight > blocksHeight) {
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

        if (acc > scrollPercentage && block.getBoundingClientRect().top < window.innerHeight - 2 * oneEm) {
          setLineNumber(blocks[i].highlight);
          setActiveBlock(i);
          setSelectedFile(blocks[i].fname);
          break;
        }
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => { console.log("removed listener"), window.removeEventListener('scroll', handleScroll) };
  }, [blocks, files]);

  if (!blocks.length || !files.length) return "Loading...";

  return (
    <>
      <div hidden={isWideEnough}>
        <Admonition type="danger">
          This page will not render correctly in small screen, consider using the <a href={alternativeURL}>plain text version</a>
        </Admonition>
      </div>

      <div>
        <Tabs className="language-tabs" selectedValue={language} selectValue={(e) => setLanguage(e)}>
          {languages.map(lang => <TabItem value={lang} label={lang2label[lang]}></TabItem>)}
        </Tabs>
      </div>

      <div className="row code-explain">
        <div className="col-forced--4 col" id="codeblocks">
          {blocks.map((block, index) => <InnerBlock selected={activeBlock === index} index={index} text={block.text} />)}
          <div id="extra-padding" style={{ width: "100%" }}></div>
        </div>
        <div className="col-forced--8 col">
          <div id="files"
            style={{ position: 'sticky', height: '100vh', overflow: 'scroll' }}>
            <Tabs className="file-tabs" selectedValue={selectedFile || blocks[0].fname} selectValue={(e) => setSelectedFile(e)}>
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
    <Github url={url} start={start} end={end}
      language={language} fname={fname}
      metastring={`{${lineNumber}}`} />
  </>
}

export function Block({ children }) { return children; }

export function File({ children }) { return children; }

export default { ExplainCode, Block, File };