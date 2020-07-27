import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { toggleLoginSignup, logout, toggleSignup, toggleSettingsModal } from '../actions/actions.js';

import Container from './Container.js';
import Modal from './Modal.js';
import HeaderButton from './HeaderButton.js';


function SettingModal(props) {
  const [orgOptionIsActivated, setOrgOptionIsActivated] = React.useState(false);

  return (
    <Container className={props.className}>
      <Modal onClickedOutside={() => props.dispatch(toggleSettingsModal())}
            isModalityEnabled={true}
            default={props.settingModalIsActive}
            className={'container1 base3 flexColumn'}>
        {!orgOptionIsActivated && <DefaultModal props={props} />}
        {orgOptionIsActivated && <OrgModal /> }
      </Modal>
    </Container>
  );

  function DefaultModal() {
    return (
      <Container className={'flexColumn'}>
      <Container>
        <HeaderButton
          title={"Personal Settings"}
          >
        </HeaderButton>
      </Container>
      <Container>
        <HeaderButton onPress={() => setOrgOptionIsActivated(true)}
          title={"Create a new Org"} 
          >
        </HeaderButton>
      </Container>
      <Container>
        <HeaderButton onPress={() => props.dispatch(logout())}
          title={"Logout"}
          >
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
            // localStorage.removeItem('jwtToken'); // move this condition closer to root
            // props.dispatch(toggleLogin());
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
      <Container className={'flexColumn ' + props.className}>
        <Container className={'allAroundMargin'}>
          <input 
            onChange={event => {
              let value = event.target.value;
              setOrgName(value);
            }}
            placeholder="Name your organization"
            className={'fullHeight'}
          />
        </Container>
      <Container>
        <HeaderButton onPress={createNewOrg}
          title={"Create"}>
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


