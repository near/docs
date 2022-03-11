
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

  const code = `function testing() {
    const [data, setData] = useState(null);
    
    useEffect(async function test(){
      try{
        const near = await connectNear();
        
        //========Write code here=========
        const response = await near.connection.provider.block({
          finality: "final",
        });
        setData(response);
        }catch(e){
        console.log(e)
        }
    },[])

    return <ViewResponse response={data}/>
  }
`;
  return (
    <React.Fragment>
      <LiveProvider code={code} scope={scope}>
        <div>
          <div className='editor-heading'>LIVE EDITOR <button onClick={() => { setViewResult(true) }}>View RESULT</button></div>
          <LiveEditor />
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