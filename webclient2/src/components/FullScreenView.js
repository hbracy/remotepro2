// Library imports
import * as React from 'react';
import { TouchableOpacity, View, FlatList, Text, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
// My styles
import { styles } from '../styles/style.js';

// My actions
import { toggleLoginSignup, toggleLogin, getFiles } from '../constants/actions.js';

// My Components
import Container from './Container.js';
import LoginSignupModal from './LoginSignupModal.js';
import SignupModal from './SignupModal.js';
import LoginModal from './LoginModal.js';
import SettingModal from './SettingModal.js';
import FolderItem from './FolderItem.js';
import MessageModal from './MessageModal.js';
import AddContactModal from './AddContactModal.js';
import MyTextInput from './MyTextInput.js';
import TextEditor from './TextEditor.js';

// My Constants
import { fileInfo } from '../constants/test_constants/test-file-info.js'

function FullScreenView(props) {
  // let [value, setValue] = React.useState([getInitialObject(props.fileDataToDisplay)])

  React.useEffect(() => {
   props.dispatch(getFiles('http://localhost:3000/remotepro/remoteprohomepage'));
   // console.log(props.files);
  }, []);


  function renderFolderItems({item}) {
    console.log('CURRENT FILE PATH STATE', props.currentFilePath);
    return (
      <TouchableOpacity onPress={() => {
        // setCurrentItemName(currentItemName + item);
        // console.log('currentItemName', currentItemName);
        props.dispatch(getFiles('http://localhost:3000/' + props.currentFilePath + '/' + item))
      }} style={[styles.container1, styles.centerCenter]}>
        <Text> <Entypo name="folder" size={40} color="#323232"/></Text>
        <Text>{item}</Text>
      </TouchableOpacity>
    );

  }
  
// console.log(props.files);
          console.log('YEp', props.fileDataToDisplay)
                      // <SyntaxHighlighter 

              // language='javascript' 
              // style={docco}
              // // highlighter={"prism" || "hljs"}
              // // PreTag={TextInput}
              // // CodeTag={TextInput}
              // >
            // </SyntaxHighlighter>

  return (
    <View style={[props.style]}>
      <View style={[styles.absolutePosition, styles.fullWidth, styles.fullHeight, styles.noColor]}>
        <View style={[styles.container1]}>
        { !props.fileDataToDisplay &&
          <FlatList
            data={props.files}
            keyExtractor={(item) => item.key}
            renderItem={renderFolderItems}
            numColumns={4} 
            horizontal={false}
            // extraData={props}
            style={[styles.container1]} 

          />
        }
        { props.fileDataToDisplay && <TextEditor initialText={props.fileDataToDisplay} /> }
        </View>
      </View>
      <Container pointerEvents="box-none"
        style={[styles.container1]} >
        <Container style={[styles.container1]}>
          {props.addContactModalIsActive && <AddContactModal style={[styles.container1]} />}
        </Container>
        <Container style={[styles.container1]}>
        </Container>
        <Container style={[styles.container1]} >
        </Container>
        <Container style={[styles.container1]}>
          {!props.isLoggedIn && props.loginSignupModalIsActive && <LoginSignupModal style={[styles.container1, styles.relativePosition]} />}
          {!props.isLoggedIn && props.loginModalIsActive && <LoginModal style={[styles.container1]} />}
          {!props.isLoggedIn && props.signupModalIsActive && <SignupModal style={[styles.container1]} />}
          {props.isLoggedIn && props.settingModalIsActive && <SettingModal style={[styles.container1]} />}
        </Container>
      </Container>
      <Container  pointerEvents="box-none" 
        style={[styles.container1]}>
        <Container style={[styles.container1]}>
          {props.messageModalIsActive &&
            <MessageModal contact={''} style={[styles.container1]} />}
        </Container>
        <Container style={[styles.container1]}>
        </Container>
        <Container style={[styles.container1]} >
        </Container>
        <Container style={[styles.container1]}>
        </Container>
      </Container>
    </View>
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
    isLoggedIn: state.modalReducer.isLoggedIn,
    settingModalIsActive: state.modalReducer.settingModalIsActive,
    addContactModalIsActive: state.modalReducer.addContactModalIsActive,
    files: state.socketReducer.files,
    currentFilePath: state.socketReducer.currentFilePath,
    fileDataToDisplay: state.socketReducer.fileDataToDisplay,
  };
}

export default connect(mapStateToProps)(FullScreenView);
