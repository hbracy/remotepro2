import * as React from 'react';
import onClickOutside from "react-onclickoutside";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true
    }
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside = evt => {
    // this.props.navigation.navigate('Home', {isClearingScreen: true})
    // if (notSmallScreen)
    // if (this.props.isModalityEnabled) {
      // this.setState({isActive: false})

      this.props.onClickedOutside();

    // }
  };

  render() {
    // console.log('PASSED IN DEFAULT ' + this.props.default)

    // if(!this.state.isActive) {
    //   // console.log("HEY")
    //   return(<div></div>)
    // } else {
      return(
        <div className={'container1 transparentBorder ' + this.props.className}>
          {this.props.children}
        </div>
      )
    // }
  }

}

export default onClickOutside(Modal);




