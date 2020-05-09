import * as React from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import SunEditor from 'suneditor-react';
import JoditEditor from "jodit-react";


import { toggleLoginSignup, toggleLogin, toggleSignup } from '../constants/actions.js';

import { styles } from '../styles/style.js'

import Container from './Container.js';


function TextEditor(props) {

  // return (
  //   <Container style={[styles.base1, styles.allAroundMargin, styles.curvedBase1Border]} >
  //       <TextInput 
  //         style={[styles.container1]} 
  //         defaultValue={props.initialText}
  //         multiline={true}
  //       />
  //   </Container>
  // );


      // <Editor
      //   initialValue="<p>This is the initial content of the editor</p>"
      //   init={{
      //    height: 500,
      //    menubar: false,
      //    plugins: [
      //      'advlist autolink lists link image charmap print preview anchor',
      //      'searchreplace visualblocks code fullscreen',
      //      'insertdatetime media table paste code help wordcount'
      //    ],
      //    toolbar:
      //      'undo redo | formatselect | bold italic backcolor | \
      //      alignleft aligncenter alignright alignjustify | \
      //      bullist numlist outdent indent | removeformat | help'
      //   }}
      //   apiKey='no-api-key'

      // />


//  />

  // const config = {
  //   readonly: false, // all options from https://xdsoft.net/jodit/doc/
  //   fullsize: true
  // }


  //     <JoditEditor
  //       // ref={editor}
  //       value={props.initialText}
  //       // config={config}
  //       tabIndex={1} // tabIndex of textarea
  //       // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
  //       onChange={newContent => {}}
  //       style={[styles.container1]}
  //     />

  return (
    <Container style={[styles.base1, styles.allAroundMargin, styles.curvedBase1Border]} >
      <Editor
        initialValue={props.initialText}
        init={{
         // height: 500,
         flex: 1,
         display: 'flex',
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
        }}
        apiKey='no-api-key'

      />
    </Container>

  )
}


function mapStateToProps(state) {
  return {
    prop1: state.prop2,
    prop2: state.prop2,
  };
}

export default connect(mapStateToProps)(TextEditor);



