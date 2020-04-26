import * as React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { toggleMessageModal, toggleAddContactModal } from '../constants/actions.js';

import { styles } from '../styles/style.js'

import Container from './Container.js';
import SidebarListItem from './SidebarListItem.js';
import HeaderButton from './HeaderButton.js';



import { fakeNames } from '../constants/test_constants/test-contact-info.js';


function Sidebar(props) {

  function renderSideBarItems({item, index, separators}) {
    return (
      <SidebarListItem
        onPress={() => props.dispatch(toggleMessageModal())}
        text={item.key} 
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
        style={[]} 
      />
    );
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
  console.log('SIDEBARISACTIVE STATE:', props.sidebarIsActive)



  // fakeNames = props.data

  return(
    <View style={[props.style]}>
      {props.sidebarIsActive &&
        <Container style={[styles.container1, styles.base2, styles.flexColumn]}>
          <Container style={[styles.container1,]}>
            <HeaderButton  
              onPress={() => props.dispatch(toggleAddContactModal())}         
              title={"Add a Contact"}
              style={[styles.container1, styles.flexColumn, styles.base3, styles.curvedBase3Border]}
            />
          </Container>
          <Container style={[styles.container9]}>
          <FlatList style={[styles.container1]} 
            data={fakeNames}
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
    sidebarIsActive: state.modalReducer.sidebarIsActive
  };
}

export default connect(mapStateToProps)(Sidebar);


