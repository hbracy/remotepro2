import * as React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { toggleMessageModal } from '../constants/actions.js';

import { styles } from '../styles/style.js'

import Container from './Container.js';
import SidebarListItem from './SidebarListItem.js';



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
      <View style={{
              height: 1,
              width: "100%",
              backgroundColor: styles.base2,
            }}
      />
    );
  }
  console.log('SIDEBARISACTIVE STATE:', props.sidebarIsActive)

  return(
    <View style={[props.style]}>
      {props.sidebarIsActive &&
        <Container style={[styles.container1, styles.base2, ]}>
          <FlatList style={[styles.container1]} 
            data={fakeNames}
            ItemSeparatorComponent={renderSideBarSeparators}
            renderItem={renderSideBarItems}
          />
        </Container>
      }
    </View>

  );

}


function mapStateToProps(state) {
  return {
    sidebarIsActive: state.sidebarIsActive
  };
}

export default connect(mapStateToProps)(Sidebar);


