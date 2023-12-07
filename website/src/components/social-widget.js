import React, { useState, useEffect } from "react";
import { useWallet } from '@theme/Gateway/wallet-selector';
import BrowserOnly from '@docusaurus/BrowserOnly';

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
          initNear && selector && initNear({ networkId: 'mainnet', selector });
        }, [initNear, selector]);
        console.log(children.props.children.props.children)
        return <div>
          <div class="monaco">
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

          <div class="code_iframe">
            <h4 style={{ fontWeight: 0 }}> Preview <small> - Edit the code above! </small> </h4>
            <hr class="preview-border" />
            <Widget code={code} />
          </div>
        </div>
      }}
    </BrowserOnly>
  )
}

export default WidgetEditor;