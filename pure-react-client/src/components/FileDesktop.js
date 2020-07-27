import * as React from 'react';
import { connect } from 'react-redux';

import { toggleLoginSignup, toggleLogin, toggleSignup, getFiles } from '../actions/actions.js';

import Container from './Container.js';
import FileItem from './FileItem.js';

function FileDesktop(props) {
  // let files = props.files.concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files);
  console.log('IN DESKTOP', props.currentFilePath);

  React.useEffect(() => {
    if (props.currentFilePath) {
      props.dispatch(getFiles('http://localhost:3000/' + props.currentFilePath));
    }
  }, [props.currentFilePath]);


  return (
    <Container className={''}>
      {
        props.files && 
        <Container className={'wrap scroll'}> {
          props.files.map((fileItem) => 
            <FileItem
              onPress={() => props.dispatch(getFiles('http://localhost:3000/' + props.currentFilePath + '/' + fileItem))}
              key={fileItem}
              text={fileItem}
            />
          )
        }
        </Container>
      }

    </Container>
  );
}


function mapStateToProps(state) {
  return {
    files: state.socketReducer.files,
    currentFilePath: state.socketReducer.currentFilePath,
    prop2: state.prop2,
  };
}

export default connect(mapStateToProps)(FileDesktop);
