import * as React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { getMessages, toggleMessageModal, sendMessage } from '../constants/actions.js';

import { styles } from '../styles/style.js'
import { TrademarkText } from '../components/StyledText';

import Container from './Container.js';
import Modal from '../modals/Modal.js';
import HeaderButton from '../components/HeaderButton.js';
import SidebarListItem from './SidebarListItem.js';
import MessageItem from './MessageItem.js';
import MyTextInput from './MyTextInput.js'

function MessageModal(props) {
  const maxTextHeight = 100;

  const [inputTextHeight, setTextInputHeight] = React.useState(styles.mediumFont);

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
      style={[]} />
  }

  // function onTextInputHeightChange(height) {
  //   if (height > maxTextHeight) {
  //     return;
  //   }
  //   setTextInputHeight(height);
  //   console.log(height);
  // }

  return (
  <View style={[props.style]}>
      <View style={[styles.container1]}>
       <Modal onClickedOutside={() => props.dispatch(toggleMessageModal())}
          isModalityEnabled={true}
          // default={true}
          style={[styles.container1, styles.base3]}>
        <Container style={[styles.container1]}>
          <TrademarkText>{props.messageModalName}</TrademarkText>
        </Container>
        <Container style={[styles.container4]}>
          <View style={[styles.container1]}>
            <FlatList 
              data={props.messages}
              style={[styles.container1]} 
              renderItem={renderMessageItems}
              />
          </View>
        </Container>
        <Container style={[styles.container2]}>
          <MyTextInput style={[styles.container1]}
          // onHeightChange={onTextInputHeightChange}
          // onChangeText={text => console.log(text)}
          onSubmit={text => (text.trimEnd()) && sendMessage(props.messageModalName, props.messageModalConversationId, text.trimEnd())}
          /> 
        </Container>
        </Modal>
      </View>
    </View>
  
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






