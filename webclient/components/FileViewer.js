import * as React from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import SunEditor from 'suneditor-react';
import JoditEditor from "jodit-react";


import { toggleLoginSignup, toggleLogin, toggleSignup } from '../constants/actions.js';

import { styles } from '../styles/style.js'

import Container from './Container.js';


function FileViewer(props) {

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

  )
}


function mapStateToProps(state) {
  return {
    prop1: state.prop2,
    prop2: state.prop2,
  };
}

export default connect(mapStateToProps)(TextEditor);



