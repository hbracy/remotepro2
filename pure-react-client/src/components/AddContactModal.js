import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import Autocomplete from 'react-native-autocomplete-input';

import { toggleMessageModal, setContacts, toggleAddContactModal } from '../actions/actions.js';

import { TrademarkText } from '../components/StyledText';

import Container from './Container.js';
import Modal from './Modal.js';
import HeaderButton from './HeaderButton.js';


function AddContactModal(props) {
  // const [contactInfo, setContactInfo] = React.useState('');
  const [suggestions, setSuggestions] = React.useState('');

  // props.socketConnection.on('searchPotentialContact', data => {
  //   // console.log(data);
  //   setSuggestions(data);
  // });

  function sendAddContactInfo(email) {
    console.log("ADD CONTACT INFO BEING SENT: " + email);
    axios.post('http://localhost:3000/reserved/addContact',  {
          contactEmail: email,
        }, 
        {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('jwtToken')
          }
    }).then(response => {
      if (response.data.email) {
        console.log('HEY HEY', response.data)
        alert(email + ' added');
        // response.data.
        props.dispatch(setContacts(response.data.contacts.reverse()))
        // Open Message modal with email
        props.dispatch(toggleMessageModal(email, response.data.conversationId))


       } else {
        alert(email + ' failed to login');
      }
    }).catch(err => console.error(err));
  }

  // function fetchContactSuggestions(input) {
  //   props.socketConnection.emit('searchPotentialContact', input);
  // }

  // function renderSeparators() {
  //   return (
  //     <View
  //       style={[styles.base2, {
  //         height: 1,
  //         width: "100%",
  //       }]}      
  //     />
  //   );
  // }


  return (
    <Container className={' ' + props.className} >
      <Modal onClickedOutside={() => props.dispatch(toggleAddContactModal())}
              isModalityEnabled={true}
              default={props.addContactModalIsActive}
              className={'container1 noColor'}>
        <Container className={'allAroundMargin'}>
        {
          // <Autocomplete
          // containerStyle={[styles.container1]}
          //   data={suggestions}
          //   // data={suggestions.length === 1 && comp(query, films[0].title) ? [] : films}           
          //   onChangeText={text => fetchContactSuggestions(text)}
          //   renderItem={({ item }) => {
          //     return (
          //     <TouchableOpacity onPress={() => sendAddContactInfo(item.email)}
          //       style={[styles.container1, styles.base3]}>
          //       <TrademarkText>{item.email}</TrademarkText>
          //     </TouchableOpacity>
          //   )}}
          //   // renderSeparator={renderSeparators}
          //   flatListProps={{
          //     ItemSeparatorComponent: renderSeparators
          //   }}
          // />
        }
        </Container>
      </Modal>
    </Container>
  );
}

          // <TextInput onChangeText={text => setContactInfo(text)}
          //   style={[styles.fullHeight]}
          //   placeholder="Email"
          // />

function mapStateToProps(state) {
  return {
    addContactModalIsActive: state.modalReducer.addContactModalIsActive,
    socketConnection: state.socketReducer.socketConnection,
    contacts: state.socketReducer.contacts
  };
}

export default connect(mapStateToProps)(AddContactModal);





