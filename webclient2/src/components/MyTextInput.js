import * as React from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

import {  } from '../constants/actions.js';

import { styles } from '../styles/style.js'

import Container from './Container.js';


function MyTextInput(props) {
  // const [height, setHeight] = React.useState(null);
  const [text, setText] = React.useState(props.placeholder);
  const [toSubmit, setToSubmit] = React.useState(false);

  function onChangeText(text) {
    if (toSubmit) {
    setText('');
    setToSubmit(false);
    props.onSubmit(text);

    } else {
      setText(text);
    }
  }

  function onKeyPress({ nativeEvent }) {
  if (nativeEvent.key === 'Enter' && !nativeEvent.shiftKey) {
      setToSubmit(true);
    }
  }

  // function onHeightChange(height) {
  //   setHeight(height);

  //   props.onHeightChange(height)
  // }

  return (
    <Container         
      style={[styles.container1, 
              styles.base1, 
              styles.curvedBase1Border,
            ]}
    >
      <TextInput 
        onKeyPress={onKeyPress}
        onChangeText={onChangeText}
        // onSubmitEditing={onSubmit}
        multiline={true}
        // dense={true}
        
        // style={(!height) ? [styles.container1, 
        //       styles.base1, 
        //       styles.curvedBase1Border, 
        //       styles.allAroundMargin,
        //     ] : () =>{ 
        //       console.log('yo') 
        //     return {height: height}
        //   }}


        numberOfLines={2}
        // placeholder=''
        // onContentSizeChange={e => onHeightChange(e.nativeEvent.contentSize.height)} 
        value={text}
      />
    </Container>

      );
}


function mapStateToProps(state) {
  return {
    // isSmallWindow: state.isSmallWindow
  };
}

export default connect(mapStateToProps)(MyTextInput);



