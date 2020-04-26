import * as React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Autocomplete from 'react-native-autocomplete-input';

import { toggleLoginSignup, toggleLogin, toggleSignup, toggleIsLoggedIn, toggleSettingsModal, toggleAddContactModal } from '../constants/actions.js';

import { styles } from '../styles/style.js'
import { TrademarkText } from '../components/StyledText';

import Container from './Container.js';
import Modal from '../modals/Modal.js';
import HeaderButton from '../components/HeaderButton.js';


function AddContactModal(props) {
  // const [contactInfo, setContactInfo] = React.useState('');
  const [suggestions, setSuggestions] = React.useState('');



  props.socketConnection.on('searchPotentialContact', data => {
    // console.log(data);
    setSuggestions(data);

  });


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
      console.log('ADD CONTACT RESPONSE', response);
      if (response.data.email) {
        alert(email + ' added');

       } else {
        alert(email + ' failed to login');
      }
    }).catch(err => console.error(err));
  }

  function fetchContactSuggestions(input) {
    props.socketConnection.emit('searchPotentialContact', input);
  }

  function renderSeparators() {
    return (
      <View
        style={[styles.base2, {
          height: 1,
          width: "100%",
        }]}      
      />
    );
  }


  return (
    <Container style={[props.style]}>
      <View style={[styles.container1]}>
       <Modal onClickedOutside={() => props.dispatch(toggleAddContactModal())}
              isModalityEnabled={true}
              default={props.addContactModalIsActive}
              style={[styles.container1, styles.base2]}>
        <Container style={[styles.container1, styles.allAroundMargin]}>

          <Autocomplete
          containerStyle={[styles.container1]}
            data={suggestions}
            // data={suggestions.length === 1 && comp(query, films[0].title) ? [] : films}           
            onChangeText={text => fetchContactSuggestions(text)}
            renderItem={({ item }) => {
              console.log(item);
              return (
              <TouchableOpacity onPress={() => sendAddContactInfo(item.email)}
                style={[styles.container1, styles.base3]}>
                <TrademarkText>{item.email}</TrademarkText>
              </TouchableOpacity>
            )}}
            // renderSeparator={renderSeparators}
            flatListProps={{
              ItemSeparatorComponent: renderSeparators
            }}
          />
        </Container>
        </Modal>
      </View>
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
    socketConnection: state.socketReducer.socketConnection
  };
}

export default connect(mapStateToProps)(AddContactModal);





