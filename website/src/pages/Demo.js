import React,{Fragment} from 'react';
import './Demo.css';
import Editor from '../pages/editor.js'


function Demo() {
    return (
        <Fragment>
            {/* <Editor /> */}
            <a className="editor" href="/editor">Try it with Editor</a>
        </Fragment>

    )
} export default Demo;