import * as React from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import { toggleLoginSignup, toggleLogin, toggleSignup, toggleSettingsModal } from '../constants/actions.js';

import { styles } from '../styles/style.js'

import Container from './Container.js';
import Modal from '../modals/Modal.js';
import HeaderButton from '../components/HeaderButton.js';


function SettingModal(props) {
  const [orgOptionIsActivated, setOrgOptionIsActivated] = React.useState(false);
  // const [orgName, setOrgName] = React.useState('');


  return (
    <View style={[props.style]}>
      <View style={[styles.container1]}>
       <Modal onClickedOutside={() => props.dispatch(toggleSettingsModal())}
              isModalityEnabled={true}
              default={props.settingModalIsActive}
              style={[styles.container1, styles.base3]}>

        {!orgOptionIsActivated && <DefaultModal />}
        {orgOptionIsActivated && <OrgModal /> }
        </Modal>
      </View>
    </View>
  );

  function DefaultModal(props) {
    return (
      <Container style={[styles.container1, styles.flexColumn]}>
      <Container style={[styles.container1]}>
        <HeaderButton
          title={"Personal Settings"} 
          style={[styles.container1]}>
        </HeaderButton>
      </Container>
      <Container style={[styles.container1]}>
        <HeaderButton onPress={() => setOrgOptionIsActivated(true)}
          title={"Create a new Org"} 
          style={[styles.container1]}>
        </HeaderButton>
      </Container>
      <Container style={[styles.container1]}>
        <HeaderButton onPress={() => console.log('logout')}
          title={"Logout"} 
          style={[styles.container1]}>
        </HeaderButton>
      </Container>
      </Container>
    );
  }

  function OrgModal(props) {

    const [orgName, setOrgName] = React.useState('');

    function createNewOrg() {
        axios.post('http://localhost:3000/reserved/createNewOrg', {
          orgName: orgName,
        }, {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('jwtToken')
          }
        }
        ).then(response => {
          console.log('LOGIN RESPONSE', response.data);
          if (response.data == 'Please login again') {
            localStorage.removeItem('jwtToken'); // move this condition closer to root
            props.dispatch(toggleLogin());
          } else if (response.data) {
            alert('Sucessfully created org ' + response.data.org_name);
            // localStorage.setItem('jwtToken', response.data.authToken);
            // dispatch a user success;
          } else {
            alert(orgName + ' already exists');
          }
        }).catch(err => console.error(err));

    }

    return (
      <Container style={[props.style, styles.container1, styles.flexColumn]}>
        <Container style={[styles.container1, styles.allAroundMargin]}>
          <TextInput 
            style={[styles.fullHeight]}
            onChangeText={text => setOrgName(text)}
            placeholder="Name your organization"
          />
        </Container>
      <Container style={[styles.container1]}>
        <HeaderButton onPress={createNewOrg}
          title={"Create"} 
          style={[styles.container1]}>
        </HeaderButton>
      </Container>
      </Container>
    );
  }

}

function mapStateToProps(state) {
  return {
    settingModalIsActive: state.modalReducer.settingModalIsActive,
  };
}

export default connect(mapStateToProps)(SettingModal);


