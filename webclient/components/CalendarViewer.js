
import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
const DragAndDropCalendar = withDragAndDrop(Calendar)

import { createEvent, getEvents, changeEventDetails } from '../constants/actions.js';

import { styles } from '../styles/style.js'

import Container from './Container.js';

import '../node_modules/react-big-calendar/lib/css/react-big-calendar.css'

import '../node_modules/react-big-calendar/lib/addons/dragAndDrop/styles.css'
function CalendarViewer(props) {
  const localizer = momentLocalizer(moment)

  React.useEffect(() => {
    // if (!props.currentEventList) {
      props.dispatch(getEvents());
    // }
  }, []);

  function handleEventCreation(newEvent) {
    console.log(newEvent);
    const title = window.prompt('New Event name'); // Standin
    if (title) {
      newEvent.title = title;
      props.dispatch(createEvent(newEvent));

    }

  }


// see https://github.com/jquense/react-big-calendar/blob/master/examples/demos/dnd.js
// and https://github.com/jquense/react-big-calendar/blob/c52609bc308fbc59c189ebd434f0e776c6f75b8a/src/addons/dragAndDrop/withDragAndDrop.js
  return (
    <View style={[styles.container1, styles.allAroundMargin, styles.base1, styles.curvedBase1Border]}>
      {props.currentEventList && 
        <DragAndDropCalendar
          localizer={localizer}
          events={props.currentEventList}
          onSelectSlot={handleEventCreation}
          // onSelectEvent={}
          onEventDrop={(param) => console.log(param)}
          onEventResize={(updatedEvent) => props.dispatch(changeEventDetails(updatedEvent))}
          onDragStart={(param) => console.log(param)}
          startAccessor="start"
          endAccessor="end"
          scrollToTime={new Date()}
          selectable
          resizable
          defaultView={'week'}
          style={{ height: '100%' }}
        />


      }
    </View>
  );
}


function mapStateToProps(state) {
  return {
    currentEventList: state.socketReducer.currentEventList,
  };
}

export default connect(mapStateToProps)(CalendarViewer);


