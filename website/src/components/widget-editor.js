import React, { useState, useEffect } from "react";
import BrowserOnly from '@docusaurus/BrowserOnly';
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";

export function WidgetEditor({ children, id = 1, networkId = "testnet", height = "160px" }) {

  return (
    <BrowserOnly fallback={<div> Loading... </div>}>
      {() => {
        let startCode = '';
        try {
          if (!children.length) children = [children]
          startCode = children[0].props.children.props.children;
        } catch (e) { }
        const { Widget, useInitNear } = require('near-social-vm');
        const MonacoEditor = require('react-monaco-editor').default;

        const [code, setCode] = useState(startCode);
        const { initNear } = useInitNear();

        useEffect(() => {
          initNear && initNear({ networkId, selector: new Promise(() => { }) });
        }, [initNear]);

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
          {children[1]}
        </div>
      }}
    </BrowserOnly>
  )
}

export default WidgetEditor;