import * as React from 'react';
import { connect } from 'react-redux';
import { EntypoCircleWithPlus } from 'react-entypo';

import { toggleLoginSignup, toggleLogin, toggleSignup, getFiles, openNewFile } from '../actions/actions.js';

import Container from './Container.js';
import FileItem from './FileItem.js';

function FileDesktop(props) {
  // let files = props.files.concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files).concat(props.files);
  console.log('IN DESKTOP', props.currentFilePath);

  React.useEffect(() => {
    if (props.currentFilePath ) {
      props.dispatch(getFiles('http://localhost:3000/' + props.currentFilePath));
    }
  }, [props.currentFilePath]);


  return (
    <Container className={''}>
      <Container className={'container8'}>
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
      <Container className={'container1  '}>
        <div className={'maxContent allAroundMargin centerText pointer '} onClick={() => props.dispatch(openNewFile(props.currentFilePath))}>
          <EntypoCircleWithPlus style={{'height': '4em', 'width': '4em'}} className={'opaqueText'} />
        </div>
      </Container>
    </Container>
  );
}


function mapStateToProps(state) {
  return {
    files: state.modalReducer.files,
    currentFilePath: state.modalReducer.currentFilePath,
    prop2: state.prop2,
  };
}

export default connect(mapStateToProps)(FileDesktop);
