import React,{Fragment} from 'react';
import './Demo.css';
import Editor from '../pages/editor.js'


function Demo() {
    // Adding the Editor component
    return (
        <Fragment>

            {/* <Editor /> */}
            <a className="editor" href="/editor">Try it with Editor</a>
        </Fragment>

    )
} export default Demo;