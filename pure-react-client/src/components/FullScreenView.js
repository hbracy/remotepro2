// Library imports
import * as React from 'react';
import { connect } from 'react-redux';

// My assets

// My actions
import { toggleLoginSignup, toggleLogin, getFiles, getGoogleDriveFiles, authorizeGoogleDrive } from '../actions/actions.js';

// My Components
import Container from './Container.js';
import LoginSignupModal from './LoginSignupModal.js';
import LoginModal from './LoginModal.js';
import SignupModal from './SignupModal.js';
import SettingModal from './SettingModal.js';
import FileDesktop from './FileDesktop.js';
import WorkViewer from './WorkViewer.js';
import CalendarViewer from './CalendarViewer.js';
import MessageModal from './MessageModal.js';
import FileViewer from './FileViewer.js';
import AddContactModal from './AddContactModal.js';
import SettingSuggestionModal from './SettingSuggestionModal.js';

// import MyTextInput from './MyTextInput.js';

// My Constants

function FullScreenView(props) {
  // let [value, setValue] = React.useState([getInitialObject(props.fileDataToDisplay)])

  React.useEffect(() => {
   props.dispatch(getFiles('http://localhost:3000/remotepro/remoteprohomepage'));
   // console.log(props.files);
  },[]);


  // function renderFolderItems({item}) {
  //   console.log('CURRENT FILE PATH STATE', props.currentFilePath);
  //   return (
  //     <TouchableOpacity onPress={() => {
  //       // setCurrentItemName(currentItemName + item);
  //       // console.log('currentItemName', currentItemName);
  //       props.dispatch(getFiles('http://localhost:3000/' + props.currentFilePath + '/' + item))
  //     }} style={[styles.container1, styles.centerCenter]}>
  //       <Text> <Entypo name="folder" size={40} color="#323232"/></Text>
  //       <Text>{item}</Text>
  //     </TouchableOpacity>
  //   );

  // }

  // function renderGoogleDriveFolderItems({item}) {
  //   console.log('CURRENT FILE PATH STATE', props.currentFilePath);
  //   return (
  //     <TouchableOpacity onPress={() => {
  //       // setCurrentItemName(currentItemName + item);
  //       // console.log('currentItemName', currentItemName);
  //       // props.dispatch(getGoogleDriveFiles('http://localhost:3000/' + props.currentFilePath + '/' + item))

  //       props.dispatch(authorizeGoogleDrive());
  //     }} style={[styles.container1, styles.centerCenter]}>
  //       <Text> <Entypo name="folder" size={40} color="#323232"/></Text>
  //       <Text>{item}</Text>
  //     </TouchableOpacity>
  //   );




  // }
  // console.log('USERNAME:', props.username);

  // console.log('IS GO TO WORK ON?', props.goToWork);

  return (
    <Container className={'relativePosition flexColumn ' + props.className}>
      <div className={'absolutePosition full noColor'}>
        <Container className={'container1'}>
        { 
          props.goToCalendar && <CalendarViewer /> 
        }
        {
          props.goToWork && <WorkViewer /> 
        }
        { 
          props.goToFiles && <FileDesktop />
        }
        {
          props.goToFileViewer && <FileViewer canEdit={false} fileData={props.fileData} /> 
        }

        </Container>
      </div>
      <Container className={''}>
        <Container>
          {
            props.addContactModalIsActive && <AddContactModal className={'container1'} />
          }
        </Container>
        <Container>
        </Container>
        <Container>
          { props.settingsSuggestionData && <SettingSuggestionModal listData={props.settingsSuggestionData} className={'relativePosition'} /> }
          
                    {
            !props.loginToken && props.loginSignupModalIsActive && <LoginSignupModal className={'container1 relativePosition'} />
          }
          {
            !props.loginToken && props.loginModalIsActive && <LoginModal className={'container1 relativePosition'} />
          }
          {
            !props.loginToken && props.signupModalIsActive && <SignupModal className={'container1 relativePosition'} />
          }
          {
            props.loginToken && props.settingModalIsActive && <SettingModal className={'container1 relativePosition'} />
          }

        </Container>
        <Container>
        </Container>
      </Container>
      <Container className={''}>
        <Container>
          {
            props.messageModalIsActive &&
            <MessageModal className={'relativePosition'} contact={''} />
          }
        </Container>
        <Container>
        </Container>
        <Container> 
        </Container>
        <Container>
        </Container>
      </Container>
    </Container>
  );
}




// {props.fileToOpen && 
//   <Container>
//   <Image source={props.fileToOpen} style={{height: '100%', width: '100%'}}/>
//   </Container>
// }


          // {props.fileDataToDisplay && 
            // <Container>
            //   <Text>
            //   {props.fileDataToDisplay}
            //   </Text>
            // </Container>
          // }




function mapStateToProps(state) {
  return {
    loginSignupModalIsActive: state.modalReducer.loginSignupModalIsActive,
    signupModalIsActive: state.modalReducer.signupModalIsActive,
    loginModalIsActive: state.modalReducer.loginModalIsActive,
    messageModalIsActive: state.modalReducer.messageModalIsActive,
    loginToken: state.socketReducer.loginToken,
    settingModalIsActive: state.modalReducer.settingModalIsActive,
    addContactModalIsActive: state.modalReducer.addContactModalIsActive,
    currentFilePath: state.modalReducer.currentFilePath,
    fileData: state.modalReducer.fileData,
    goToWork: state.modalReducer.goToWork,
    goToFiles: state.modalReducer.goToFiles,
    goToCalendar: state.modalReducer.goToCalendar,
    username: state.socketReducer.username,
    settingsSuggestionData: state.socketReducer.settingsSuggestionData,
    goToFileViewer: state.modalReducer.goToFileViewer,
  };
}

export default connect(mapStateToProps)(FullScreenView);
