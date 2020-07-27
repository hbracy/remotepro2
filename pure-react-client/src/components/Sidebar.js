import * as React from 'react';
import { connect } from 'react-redux';

import { getContacts, toggleMessageModal, toggleAddContactModal } from '../actions/actions.js';

import Container from './Container.js';
import SidebarListItem from './SidebarListItem.js';
import HeaderButton from './HeaderButton.js';


function Sidebar(props) {

  // function renderSideBarItems({item, index, separators}) {
  //   return (
  //     <SidebarListItem
  //       onPress={() => props.dispatch(toggleMessageModal(item.email, ))}
  //       text={item.email} 
  //       onShowUnderlay={separators.highlight}
  //       onHideUnderlay={separators.unhighlight}
  //       style={[]} 
  //     />
  //   );
  // }

  // function renderSideBarSeparators() {
  //   return (
  //     <View
  //       style={[styles.base2, {
  //         height: 1,
  //         width: "100%",
  //       }]}      
  //     />
  //   );
  // }

  React.useEffect(() => {
    props.dispatch(getContacts());
  }, []);

  return(
    <div className={props.className}>
      {props.sidebarIsActive &&
        <Container className={'base1 flexColumn'}>
          <Container className={'container1'}>
            <HeaderButton  
              onPress={() => props.dispatch(toggleAddContactModal())}         
              title={"Add a Contact"}
            />
          </Container>
          <Container className={'container9  base2'}>
          {
            props.contacts && 
            <div className={'full scroll'}> {
              props.contacts.map((item) => 
                <SidebarListItem
                  onPress={() => {
                    console.log('PRESS:', item.email);
                    props.dispatch(toggleMessageModal(item.email))}
                  }
                  key={item.email}
                  text={item.email} 
                />
              )
            }
            </div>
          }
          </Container>
        </Container>
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    sidebarIsActive: state.modalReducer.sidebarIsActive,
    contacts: state.socketReducer.contacts

  };
}

export default connect(mapStateToProps)(Sidebar);


