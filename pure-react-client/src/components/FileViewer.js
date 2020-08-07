import * as React from 'react';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
// import 'ace-builds';
import AceEditor from 'react-ace';
// import "ace-builds/src-noconflict/mode-javascript";
// import "ace-builds/src-noconflict/theme-monokai";
// import 'brace/mode/javascript'
// import 'brace/theme/monokai'


import { toggleLoginSignup, toggleLogin, toggleSignup,saveFile } from '../actions/actions.js';

import Container from './Container.js';
import MyTextInput from './MyTextInput.js'


function FileViewer(props) {

  function TextEditor() {
    let [fileText, setFileText] = React.useState(RichTextEditor.createValueFromString(props.fileData.data, 'markdown'));
    let [fileTitle, setFileTitle] = React.useState(props.fileData.title);
    let [saveTrigger, setSaveTrigger] = React.useState(new Date());

    React.useEffect(() => {
      console.log('SETTING TIMEOUT')
      const interval = setInterval(() => {
        setSaveTrigger(new Date());
      }, 10000);
      return () => clearInterval(interval);
    })

    // file title default use state
    // watch file title / interval and save with use effect
    // set file title with title submit
    React.useEffect(() => {
      // send file data
      // if (fileText. )
      console.log('SAVE', fileText.toString('markdown'));
      console.log('LOOK HERE', props.fileData)

      let fullFileName = fileTitle ? props.currentFilePath + '/' + fileTitle + '.txt' : props.currentFilePath;

      props.dispatch(saveFile(fileText.toString('markdown'), fullFileName, saveTrigger));
    }, [fileTitle, saveTrigger])


    return (
      <Container className={' '}>
        <div className={'scroll fullWidth '}>
          <div className='allAroundMargin'>
          <Container className={'white slightlyCurvedTransparentBorder noBorderColor halfWidth'}>
            <MyTextInput placeholder={'Untitled'} onSubmit={setFileTitle}/>
          </Container>
          <RichTextEditor className={'relativePosition zeroZIndex noBorderColor'}
            value={fileText}
            onChange={setFileText}
            autoFocus
            // customControls={[<Container key={1} className={'base3 testToolBar'}>{'heyasdifnfas'}</Container>]}
          />
          </div>
        </div>
      </Container>
    );
  }


  function CodeEditor() {
    let [fileText, setFileText] = React.useState(props.fileData.data);
    console.log('IN CODE EDITOR')
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

  <Container>
  { 
    // props.fileData && !props.currentFilePath.endsWith('.js') && <TextEditor /> 
  }
  { 
    // props.fileData && props.currentFilePath.endsWith('.js') && <CodeEditor /> 
  }
  { 
    props.fileData && <TextEditor /> 
  }

  </Container>
);


}

function mapStateToProps(state) {
  return {
    currentFilePath: state.modalReducer.currentFilePath,
    fileData: state.modalReducer.fileData,

  };
}

export default connect(mapStateToProps)(FileViewer);



