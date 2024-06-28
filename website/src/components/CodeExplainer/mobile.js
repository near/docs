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

  useEffect(() => {
    // scroll to the highlighted line
    const highlightedLine = document.querySelector(`div[fname="${selectedFile}"] .theme-code-block-highlighted-line`)
    const file = document.querySelector(`div[fname="${selectedFile}"] .prism-code`);

    if (highlightedLine) file.scrollTo({ top: highlightedLine.offsetTop, behavior: 'smooth' });
  }, [selectedFile, lineNumber]);

  useEffect(() => {
    activateBlock(0);

    const nav = document.querySelector('.navbar');

    // each file has a maxHeight
    const fileTabs = document.querySelector('.file-tabs');

    const allFiles = document.querySelectorAll(`.language-${language}`);
    allFiles.forEach(
      elem => elem.style.maxHeight = `calc(33vh - ${fileTabs.clientHeight}px)`
    );
    
    // calculate the size of the code explanations
    const t0 = document.getElementById(`block0`).getBoundingClientRect().top;
    const bN = document.getElementById(`block${blocks.length - 1}`).getBoundingClientRect().bottom;
    let blocksHeight = Math.abs(bN - t0);

    // we want to count the scroll from the top of the codeblocks
    const nonTranslatedCodeBlocks = document.getElementById('codeblocks').getBoundingClientRect().top + window.scrollY;

    const handleScroll = () => {
      const scrolled = window.scrollY - nonTranslatedCodeBlocks + nav.clientHeight;
      const filesElem = document.getElementById('files');
      const scrollPercentage = window.scrollY ? scrolled / (blocksHeight + filesElem.clientHeight) : 0;

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

    window.addEventListener('scroll', handleScroll);

    return () => { window.removeEventListener('scroll', handleScroll) };

  }, [blocks, files, language]);

  return (
    <>
      <div className="code-explain" style={{ position: "relative" }}>
        <div id="codeblocks">
          <Tabs className="file-tabs" selectedValue={language} selectValue={(e) => setLanguage(e)}>
            {languages.map(lang => <TabItem value={lang} label={lang2label[lang]}></TabItem>)}
          </Tabs>
          {
            blocks.map((block, index) =>
              <InnerBlock selected={activeBlock === index} index={index} text={block.text} type={block.type} activateFn={activateBlock} />)
          }
        </div>
        <div id="files" style={{ height: "33vh", position: "sticky", bottom: 0, backgroundColor: "var(--ifm-background-color)" }}>
          <Tabs className="file-tabs" selectedValue={selectedFile || blocks[0].fname} selectValue={(e) => setSelectedFile(e)}>
            {files.map(file =>
              <TabItem value={file.fname} >
                <InnerFile {...file} lineNumber={lineNumber} />
              </TabItem>
            )}
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default MobileView;