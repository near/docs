import React, { useState, useEffect } from "react";
import BrowserOnly from '@docusaurus/BrowserOnly';
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";

export function NearWidget({ children, id = 1, height = "160px", networkId = 'testnet' }) {

  return (
    <BrowserOnly fallback={<div> Loading... </div>}>
      {() => {
        let startCode = '';
        try {
          if (!children.length) children = [children]
          startCode = children[0].props.children.props.children;
        } catch (e) { }
        const { Widget, useInitNear } = require('near-social-vm');

        const [code, setCode] = useState(startCode);
        const { initNear } = useInitNear();

        useEffect(() => {
          initNear && initNear({ networkId, selector: new Promise(() => { }) });
        }, [initNear]);

        return <>
          <div className="code_iframe">
            <div className="bootstrap-scope">
              <div className="vm-widget">
                <Widget code={code} key={id} />
              </div>
            </div>
          </div>
        </>
      }}
    </BrowserOnly>
  )
}

export default NearWidget;