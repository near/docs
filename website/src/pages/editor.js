import Layout from '@theme/Layout';
import React, { useState } from 'react';

import {
  LiveEditor,
  LiveError,
  LivePreview, LiveProvider
} from 'react-live';
import ReactLiveScope from '../theme/ReactLiveScope/index.js';
import "./editor.css";

export default function Editor() {
  const [viewResult, setViewResult] = useState(false)

  const scope = ReactLiveScope;

  const code = `PASTE YOUR CODE HERE`;

  return (
    <React.Fragment>
      <LiveProvider code={code} scope={scope} >
        <div>
          <div className='editor-heading'>LIVE EDITOR <button className='button' onClick={() => { setViewResult(true) }}> VIEW RESULT</button></div>
          <LiveEditor style={{backgroundColor:'black'}} />
        </div>
        {
          viewResult &&
          <div>
            <LiveError />
            <div className='editor-result'>RESULT</div>
            <LivePreview />
          </div>
        }

      </LiveProvider>
    </React.Fragment>
  );
} 