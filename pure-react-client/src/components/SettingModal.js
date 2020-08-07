import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { logout, toggleSettingsModal, getUserOrgs, searchMembersToAddToGroup } from '../actions/actions.js';

import Container from './Container.js';
import Modal from './Modal.js';
import HeaderButton from './HeaderButton.js';


function SettingModal(props) {
  const [defaultIsActive, goToDefault] = React.useState(true);
  const [orgOptionIsActive, goToOrgOption] = React.useState(false);
  const [createNewOrgIsActive, goToCreateNewOrg] = React.useState(false);
  const [currentOrgModal, setCurrentOrgModal] = React.useState(null);
  const [addMemberInput, setAddMemberInput] = React.useState('');


  React.useEffect(() => {
    props.dispatch(getUserOrgs());
  }, [])

  return (
    <Container className={props.className}>
      {console.log('DISABLE CLICK OUTSIDE: ', props.settingsSuggestionData)}
      <Modal onClickedOutside={() => !props.settingsSuggestionData ? props.dispatch(toggleSettingsModal()) : console.log('NOT HERE')}
            // disableOnClickOutside={props.settingsSuggestionData}
            default={props.settingModalIsActive}
            className={'container1 base3 flexColumn'}>
        {defaultIsActive && <DefaultModal />}
        {orgOptionIsActive && <OrgModal /> }
        {createNewOrgIsActive && <CreateOrgModal /> }
        {currentOrgModal && <OrgSettingModal /> }

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
        <HeaderButton onPress={() => {
          goToOrgOption(true);
          goToDefault(false);
        }}
          title={"Group Settings"} 
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



  function OrgModal() {

    return (
      <Container className={'scroll flexColumn'}>
        <HeaderButton onPress={() => {
          goToCreateNewOrg(true);
          goToOrgOption(false);

        }}
          title={"Create New Group"}
          className={'base1 curvedBase1Border'}
          textColor={'base2Text'}
          >
        </HeaderButton>
        {
          props.userOrgs.map((userOrg) => 
            <HeaderButton onPress={() => {
                setCurrentOrgModal(userOrg);
                goToOrgOption(false);
              }}
              title={userOrg.org_name.toString()}
              key={userOrg._id}
              >
            </HeaderButton>
          )
        }
      </Container>
    );

  }

  function OrgSettingModal() {

    return (
      <Container className={'scroll flexColumn'}>
        <Container>
          <Container className={''}>
            <input 
            onChange={event => {
                    let value = event.target.value;
                    if (value) props.dispatch(searchMembersToAddToGroup(value, currentOrgModal._id));
                    setAddMemberInput(value);
                  }}
            placeholder={'Add member'} 
            autoFocus
            value={addMemberInput}
            className={'container1'} />
          </Container>
          <HeaderButton onPress={() => {
              goToCreateNewOrg(false);
              goToOrgOption(false);
            }}
            title={"Add"}>
          </HeaderButton>
        </Container>
        <HeaderButton onPress={() => {
          goToCreateNewOrg(false);
          goToOrgOption(false);
        }}
          title={"Other Option 1"}>
        </HeaderButton>
        <HeaderButton onPress={() => {
          goToCreateNewOrg(false);
          goToOrgOption(false);
        }}
          title={"Other Option 2"}>
        </HeaderButton>
      </Container>
    );
  }



  function CreateOrgModal() {

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
      <Container className={'flexColumn'}>
        <Container className={'allAroundMargin'}>
          <input 
            onChange={event => {
              let value = event.target.value;
              setOrgName(value);
            }}
            placeholder="Name your group"
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
    userOrgs: state.socketReducer.userOrgs,
    settingsSuggestionData: state.socketReducer.settingsSuggestionData,

  };
}

export default connect(mapStateToProps)(SettingModal);


