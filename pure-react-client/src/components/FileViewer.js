import * as React from 'react';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import brace from 'brace';
import AceEditor from 'react-ace';


import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
// import 'brace/mode/javascript'
// import 'brace/theme/monokai'

// import "ace-builds/webpack-resolver";

import { toggleLoginSignup, toggleLogin, toggleSignup } from '../actions/actions.js';

import Container from './Container.js';


function FileViewer(props) {
  // const [filePath, setFilePath] = React.useState(props.currentFilePath);

  // React.useEffect(() => {
  //   setFilePath(props.currentFilePath)
  // }, [props.currentFilePath])

  // console.log('HERE IS THE FILE DATA', fileData);



  function TextEditor() {
    let [fileText, setFileText] = React.useState(RichTextEditor.createValueFromString(props.fileData.data, 'markdown'));

    return (
      <Container className={' '}>
        <div className={'scroll'}>
          <RichTextEditor className={'allAroundMargin '}
            value={fileText}
            onChange={setFileText}
            autoFocus
          />
        </div>
      </Container>
    );
  }


  function CodeEditor() {
    let [fileText, setFileText] = React.useState(props.fileData.data);
    console.log('IN CODE EDITOR')
    // React.useEffect(() => {
    //   return () => {
    //     setFileText('')}
    // }, [])


    return (
      <Container className={' '}>
        <div className={'full'}>
          <AceEditor
              mode="javascript"
              theme="monokai"
              onChange={setFileText}
              value={fileText}
              width={'100%'}
              className={'allAroundMargin'}

              // setOptions={{ useWorker: false }}
            />
        </div>
      </Container>
    );
  }

return (

  // // // { props.canEdit && <HtmlFileEditor /> }
  // <PlainTextViewer />

  // <CodeEditor />
  <Container>
  { props.fileData && !props.currentFilePath.endsWith('.js') && <TextEditor /> }
  { props.fileData && props.currentFilePath.endsWith('.js') && <CodeEditor /> }
  </Container>
  // <div>{props.initialText}</div>
);


}

function mapStateToProps(state) {
  return {
    currentFilePath: state.socketReducer.currentFilePath,
  };
}

export default connect(mapStateToProps)(FileViewer);



