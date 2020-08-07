import * as React from 'react';
import { connect } from 'react-redux';
import { useScrollToBottom } from 'react-scroll-to-bottom';

import { toggleLoginSignup, toggleLogin, toggleSignup } from '../actions/actions.js';

import Container from './Container.js';
import MessageItem from './MessageItem.js';


function MessageArea(props) {
  // const scrollToBottom = useScrollToBottom();
  // scrollToBottom({ behavior: 'auto' });

  return (
    <div className={''}>
      {
        props.messages.map((item) => 
          <MessageItem 
            item={item}
            key={item._id}
            />
        )
      }

    </div>
  );
}


function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(MessageArea);



