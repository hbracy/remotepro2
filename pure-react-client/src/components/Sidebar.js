import * as React from 'react';
import { connect } from 'react-redux';

import { getConversations, toggleMessageModal, toggleAddContactModal } from '../actions/actions.js';

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
    props.dispatch(getConversations());
  }, [props.socketAuthorized]);

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
            props.conversations && 
            <div className={'full scroll'}> {
              props.conversations.map((item) => {
                const name = item.participants.find(participant => participant != props.username)
                return (
                  <SidebarListItem
                    onPress={() => {
                      console.log('PRESS:', item);
                      props.dispatch(toggleMessageModal(name, item._id))
                    }}
                    key={item._id}
                    text={name} 
                  />
                )
              })
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
    conversations: state.socketReducer.conversations,
    socketAuthorized: state.socketReducer.socketAuthorized,
    username: state.socketReducer.username,

  };
}

export default connect(mapStateToProps)(Sidebar);


