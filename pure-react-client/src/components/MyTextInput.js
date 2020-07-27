import * as React from 'react';
import { connect } from 'react-redux';

import {  } from '../actions/actions.js';

// import { styles } from '../styles/style.js'

import Container from './Container.js';


function MyTextInput(props) {
  // const [height, setHeight] = React.useState(null);
  const [text, setText] = React.useState(props.placeholder);
  const [toSubmit, setToSubmit] = React.useState(false);

  function onChangeText(event) {
    let value = event.target.value;
    if (toSubmit) {
      setText('');
      setToSubmit(false);
      props.onSubmit(value);
    } else {
      setText(value);
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
    <Container className={props.className}>
      <textarea
        value={text} 
        onKeyPress={onKeyPress}
        onChange={onChangeText}
        className={'trademarkText container1 noColor noResize noShadow noBorder'}
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



