import * as React from 'react';
import { connect } from 'react-redux';
import ScrollToBottom, { useScrollToBottom } from 'react-scroll-to-bottom';
import { EntypoPhone, EntypoVideoCamera } from 'react-entypo';

import { getMessages, toggleMessageModal, sendMessage, sendCallRequest } from '../actions/actions.js';

import { TrademarkText } from '../components/StyledText';

import Container from './Container.js';
import Modal from './Modal.js';
import HeaderButton from './HeaderButton.js';
import MessageArea from './MessageArea.js'
import MyTextInput from './MyTextInput.js'

function MessageModal(props) {
  const maxTextHeight = 100;

  // const [inputTextHeight, setTextInputHeight] = React.useState(styles.mediumFont);

  // const divRef = React.useRef(null);

  // React.useEffect(() => {
  //   divRef.current.scrollIntoView({ behavior: 'smooth' });
  // });
  React.useEffect(() => {
    props.dispatch(getMessages(props.messageModalName, props.messageModalConversationId));
  }, []);

  return (
  <Container className={'thinBorder transparentBorder ' + props.className}>
    <Modal onClickedOutside={() => props.dispatch(toggleMessageModal())}
      isModalityEnabled={true}
      // default={true}
      className={'container1 base3 flexColumn'}>
      <Container className={''}>
        <TrademarkText className={''}>{props.messageModalName}</TrademarkText>
        <div className={'container1 marginRight centerText'}>
          <EntypoVideoCamera style={{'height': '1.5em', 'width': '1.5em', 'color': '#ffffff'}} className={'pointer sideMargins'} onClick={() => props.dispatch(sendCallRequest(props.messageModalConversationId, true))}/>
          <EntypoPhone style={{'height': '1.5em', 'width': '1.5em', 'color': '#ffffff'}} className={'pointer'} onClick={() => props.dispatch(sendCallRequest(props.messageModalConversationId, false))}/>
        </div>
      </Container>
      <Container className={'container4 base3'}>
        <Container className={''}>
          <ScrollToBottom className={'container1 fullWidth  flexColumn base3 scroll'}> 
            <MessageArea messages={props.messages} />
          </ScrollToBottom>
        </Container>
      </Container>
      <Container className={' container2'}>
      
        <MyTextInput className={'base3'}
        // onHeightChange={onTextInputHeightChange}
        // onChangeText={text => console.log(text)}
        onSubmit={text => (text.trimEnd()) && sendMessage(props.messageModalName, props.messageModalConversationId, text.trimEnd())}
        removeOnSubmit={true}
        /> 
      
      </Container>
    </Modal>
  </Container>
  
  );
}


function mapStateToProps(state) {
  return {
    messageModalName: state.modalReducer.messageModalName,
    messageModalConversationId: state.modalReducer.messageModalConversationId,
    messages: state.socketReducer.messages
  };
}

export default connect(mapStateToProps)(MessageModal);






