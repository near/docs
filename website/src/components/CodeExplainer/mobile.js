import React, { useState, useEffect } from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import { lang2label, InnerBlock, InnerFile } from "./code-explainer";

function MobileView({ props: { blocks, files, languages, language, setLanguage } }) {
  const [lineNumber, setLineNumber] = useState(blocks[0].highlight);
  const [activeBlock, setActiveBlock] = useState(0);
  const [selectedFile, setSelectedFile] = useState(blocks[0].fname);

  const activateBlock = (index) => {
    setActiveBlock(index);
    setLineNumber(blocks[index].highlight);
    setSelectedFile(blocks[index].fname);
  }

  useEffect(() => activateBlock(0), [blocks, files])

  useEffect(() => {
    // scroll to the highlighted line
    const files = document.getElementById('files');
    const highlightedLine = document.querySelector('.theme-code-block-highlighted-line');
    if (highlightedLine) files.scrollTo({ top: highlightedLine.offsetTop, behavior: 'smooth' });
  }, [lineNumber]);

  const handleScroll = (elem) => {
    // calculate the size of the code explanations
    const t0 = document.getElementById(`block0`).getBoundingClientRect().top;
    const bN = document.getElementById(`block${blocks.length - 1}`).getBoundingClientRect().bottom;
    let blocksHeight = Math.abs(bN - t0);

    const scrollPercentage = elem.target.scrollTop / blocksHeight;

    // select the block that corresponds the percentage of the scroll bar
    let linf = 0;
    let lsup = 0;
    for (let i = 0; i < blocks.length; i++) {
      const block = document.getElementById(`block${i}`)
      linf = lsup;
      lsup += block.clientHeight / blocksHeight;

      if (scrollPercentage > linf && scrollPercentage < lsup) {
        activateBlock(i);
        break;
      }
    }
  };

  return (
    <>
      <div className="row code-explain">
        <div className="col--12 col" style={{ height: "63vh", overflowY: "scroll" }} id="codeblocks" onScroll={handleScroll}>
          <Tabs className="file-tabs" selectedValue={language} selectValue={(e) => setLanguage(e)}>
            {languages.map(lang => <TabItem value={lang} label={lang2label[lang]}></TabItem>)}
          </Tabs>
          {
            blocks.map((block, index) =>
              <InnerBlock selected={activeBlock === index} index={index} text={block.text} activateFn={activateBlock} />)
          }
        </div>
        <div className="col--12 col">
          <div id="files" style={{ height: "37vh", overflowY: "scroll" }}>
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

export default MobileView;