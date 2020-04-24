import * as React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { toggleMessageModal } from '../constants/actions.js';

import { styles } from '../styles/style.js'
import { TrademarkText } from '../components/StyledText';

import Container from './Container.js';
import Modal from '../modals/Modal.js';
import HeaderButton from '../components/HeaderButton.js';
import SidebarListItem from './SidebarListItem.js';


function MessageModal(props) {
  // function onStateChange(modalIsActive) {
  //   setMessageModalInfo(modalIsActive);
  // }


  const nowDate = new Date()
  const messageDummy = {
    name: 'Alan',
    messages: [
      {
        messageText: 'Hello',
        messageDate: nowDate
      },
      {
        messageText: 'How are you?',
        messageDate: nowDate
      }
    ]
  }

  function renderMessageItems({item, index, separators}) {
    return <SidebarListItem 
      text={item.messageText + ' ' + item.messageDate} 
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}
      style={[]} />
  }
// ({item}) => {
//                   <View style={[styles.container1]}>
//                     <TrademarkText>{item.messageText + ' ' + item.messageDate}</TrademarkText>
//                   </View>
//                 }}

  return (
  <View style={[props.style]}>
      <View style={[styles.container1]}>
       <Modal onClickedOutside={() => props.dispatch(toggleMessageModal())}
          isModalityEnabled={true}
          // default={true}
          style={[styles.container1, styles.base3]}>
        <Container style={[styles.container1]}>
          <TrademarkText>{props.contact}</TrademarkText>
        </Container>
        <Container style={[styles.container4, styles.base2]}>
          <View style={[styles.container1]}>
            <FlatList 
              data={messageDummy.messages}
              style={[styles.container1]} 
              renderItem={renderMessageItems}
              />

          </View>
        </Container>
        </Modal>
      </View>
    </View>
  
  );
}


function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(MessageModal);






