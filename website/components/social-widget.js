import MonacoEditor from 'react-monaco-editor';
import React, { useState, useEffect } from "react";
import { Widget, useInitNear } from 'near-social-vm';
import { useWallet } from '@theme/Gateway/wallet-selector';

export function WidgetEditor({ children, id = 1, height = "160px", properties }) {
  const startCode = children.props.children.props.children;

  const [code, setCode] = useState(startCode);
  const { initNear } = useInitNear();
  const { selector } = useWallet();

  useEffect(() => {
    initNear && selector && initNear({ networkId: 'mainnet', selector });
  }, [initNear, selector]);

  return (
    <div>
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
          language='jsx'
          onChange={(newValue, event) => setCode(newValue)}
        />
      </div>

      <div class="code_iframe">
        <h4 style={{ fontWeight: 0 }}> Preview <small> - Edit the code above! </small> </h4>
        <hr class="preview-border" />
        <Widget code={code} />
      </div>
    </div>
  )
}

export default WidgetEditor;