import React, { useState, useEffect } from "react";
import { useWallet } from '@theme/scripts/wallet-selector';
import BrowserOnly from '@docusaurus/BrowserOnly';
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";

export function WidgetEditor({ children, id = 1, height = "160px" }) {

  return (
    <BrowserOnly fallback={<div> Loading... </div>}>
      {() => {
        let startCode = '';
        try {
          startCode = children.props.children.props.children;
        } catch(e){ }
        const { Widget, useInitNear } = require('near-social-vm');
        const MonacoEditor = require('react-monaco-editor').default;
      
        const [code, setCode] = useState(startCode);
        const { initNear } = useInitNear();
        const { selector } = useWallet();

        useEffect(() => {
          initNear && selector && initNear({ networkId: 'testnet', selector });
        }, [initNear, selector]);

        return <div>
          <div className="monaco">
            <MonacoEditor
              height={height}
              value={code}
              options={{
                minimap: { enabled: false },
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                fontSize: '14px',
                renderLineHighlight: false,
                hideMargin: true,
                glyphMargin: false,
                folding: false,
                lineNumbers: false,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 0,
                scrollBars: false,
              }}
              onChange={(newValue, event) => setCode(newValue)}
            />
          </div>

          <div className="code_iframe">
            <div className="bootstrap-scope">
              <div className="vm-widget">
                <Widget code={code} key={id} />
              </div>
            </div>
          </div>
        </div>
      }}
    </BrowserOnly>
  )
}

export default WidgetEditor;