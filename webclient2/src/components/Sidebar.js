import * as React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { getContacts, toggleMessageModal, toggleAddContactModal } from '../constants/actions.js';

import { styles } from '../styles/style.js'

import Container from './Container.js';
import SidebarListItem from './SidebarListItem.js';
import HeaderButton from './HeaderButton.js';


function Sidebar(props) {

  function renderSideBarItems({item, index, separators}) {
    return (
      <SidebarListItem
        onPress={() => props.dispatch(toggleMessageModal(item.email, ))}
        text={item.email} 
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
        style={[]} 
      />
    );
    // toggleMessageModal(email, response.data.conversationId
  }

  function renderSideBarSeparators() {
    return (
      <View
        style={[styles.base2, {
          height: 1,
          width: "100%",
        }]}      
      />
    );
  }

  React.useEffect(() => {
    props.dispatch(getContacts());
  }, []);

  return(
    <View style={[props.style]}>
      {props.sidebarIsActive &&
        <Container style={[styles.container1, styles.base3, styles.flexColumn]}>
          <Container style={[styles.container1,]}>
            <HeaderButton  
              onPress={() => props.dispatch(toggleAddContactModal())}         
              title={"Add a Contact"}
              style={[styles.container1, styles.flexColumn, styles.base2, styles.curvedBase2Border]}
            />
          </Container>
          <Container style={[styles.container9]}>
          <FlatList style={[styles.container1]} 
            data={props.contacts}
            ItemSeparatorComponent={renderSideBarSeparators}
            renderItem={renderSideBarItems}
          />
          </Container>
        </Container>
      }
    </View>
  );
}

function mapStateToProps(state) {
  return {
    sidebarIsActive: state.modalReducer.sidebarIsActive,
    contacts: state.socketReducer.contacts

  };
}

export default connect(mapStateToProps)(Sidebar);


