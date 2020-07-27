import * as React from 'react';
import { connect } from 'react-redux';

import { getMessages, toggleMessageModal, sendMessage } from '../actions/actions.js';

import { TrademarkText } from '../components/StyledText';

import Container from './Container.js';
import Modal from './Modal.js';
import HeaderButton from './HeaderButton.js';
import MessageItem from './MessageItem.js';
import MyTextInput from './MyTextInput.js'

function MessageModal(props) {
  const maxTextHeight = 100;

  // const [inputTextHeight, setTextInputHeight] = React.useState(styles.mediumFont);

  React.useEffect(() => {
    props.dispatch(getMessages(props.messageModalName, props.messageModalConversationId));
  }, []);


  function renderMessageItems({item, index, separators}) {
    // console.log(item.messageDate);
    console.log('HERE')
    return <MessageItem 
      text={item.message} 
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}
      />
  }

  // function onTextInputHeightChange(height) {
  //   if (height > maxTextHeight) {
  //     return;
  //   }
  //   setTextInputHeight(height);
  //   console.log(height);
  // }

  return (
  <Container className={'thinBorder ' + props.className}>
       <Modal onClickedOutside={() => props.dispatch(toggleMessageModal())}
          isModalityEnabled={true}
          // default={true}
          className={'container1 base1 flexColumn'}>
        <Container>
          <TrademarkText>{props.messageModalName}</TrademarkText>
        </Container>
        <Container className={'container4 base2'}>
          <Container>
            <div className={'full base3 scroll'}> 
            {
              props.messages.map((item) => 
                <MessageItem 
                  text={item.message} 
                  />
              )
            }
            </div>
          </Container>
        </Container>
        <Container className={'container2'}>
        
          <MyTextInput className={'base1'}
          // onHeightChange={onTextInputHeightChange}
          // onChangeText={text => console.log(text)}
          onSubmit={text => (text.trimEnd()) && sendMessage(props.messageModalName, props.messageModalConversationId, text.trimEnd())}
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






