import * as React from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import {Convergence} from "@convergence/convergence";

// import * as firebase from 'firebase';
// import CodeMirror from 'codemirror';
// import Firepad from 'firepad';

// import firebase from 'firebase/app';
// import 'firebase/database';
// import brace from 'brace';
// global.ace = brace;
// global.ace.require = global.ace.acequire;
// import Firepad from 'firepad';



import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';



// import { Editor } from '@tinymce/tinymce-react';
import SunEditor from 'suneditor-react';
import JoditEditor from "jodit-react";


import { toggleLoginSignup, toggleLogin, toggleSignup } from '../constants/actions.js';

import { styles } from '../styles/style.js'

import Container from './Container.js';


function FileViewer(props) {
  const [fileData, setFileData] = React.useState(props.initialText);



  // firebase.initializeApp({
  //   apiKey: "AIzaSyBRnFTaO2bg9_FrxSPqPGIuW7CNogfdbnM",
  //   authDomain: "project-772eb.firebaseapp.com",
  //   databaseURL: "https://project-772eb.firebaseio.com",
  //   projectId: "project-772eb",
  //   storageBucket: "project-772eb.appspot.com",
  //   messagingSenderId: "665140131151",
  //   appId: "1:665140131151:web:11867ea94f8d645af7c13a"
  // });


// React.useEffect(() => { 


//   let firepadRef = firebase.database().ref();
//   let codeMirror = CodeMirror(document.getElementById('firepad'), { lineWrapping: true });
//   let firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
//           richTextShortcuts: true,
//           richTextToolbar: true,
//           defaultText: 'Hello, World!'
//         });
//   new Firepad.fromACE(firepadRef, this.aceInstance.editor, options);






// }, []);



  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.17.0/codemirror.js";
  //   script.async = true;
  //   document.body.appendChild(script);

  //   const script1 = document.createElement('script');
  //   script1.src = "https://cdn.firebase.com/libs/firepad/1.4.0/firepad.min.js";
  //   script1.async = true;
  //   document.body.appendChild(script1);


  //   const codeMirror = window.CodeMirror(document.getElementById('firepad'), { lineWrapping: true });



  //   var firepadRef = firebase.database().ref();
  //   var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
  //           richTextShortcuts: true,
  //           richTextToolbar: true,
  //           defaultText: 'Hello, World!'
  //         });



  //   return () => {
  //     document.body.removeChild(script);
  //     document.body.removeChild(script1);

  //   }
  // }, []);



  function PlainTextViewer() {
    return (
      <Container style={[styles.base1, styles.allAroundMargin, styles.curvedBase1Border]} >
        <div>
          <div id='firepad'>
          </div>
        </div>
      </Container>
    );
  }


    console.log('HERE IS THE FILE DATA', fileData);



  function CodeEditor() {
    return (
      <Container style={[styles.base1, styles.allAroundMargin, styles.curvedBase1Border]} >
        <Editor
          value={fileData}
          onValueChange={code => setFileData(code)}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
      </Container>


    )
  }





  function HtmlFileEditor() {
    return (
      <Container style={[styles.base1, styles.allAroundMargin, styles.curvedBase1Border]} >
        <Editor
          initialValue={props.initialText.replace(/\n/g, "<br />")}
          outputFormat='text'
          init={{
            height: '100%',
            width: '100%',
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'code undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help',
            branding: false,
          }}

          apiKey='lzqnjizfj7dugx05i037yh39yfq0iywwkfzaeovtnu6m4v84'
        />
      </Container>

    );

  } 

return (

  // // // { props.canEdit && <HtmlFileEditor /> }
  // <PlainTextViewer />

  <CodeEditor />


);


}


function mapStateToProps(state) {
  return {
    prop1: state.prop2,
    prop2: state.prop2,
  };
}

export default connect(mapStateToProps)(FileViewer);



