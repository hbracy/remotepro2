
import * as React from 'react';
import { connect } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import { createEvent, getEvents, changeEventDetails } from '../actions/actions.js';

import Container from './Container.js';

import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'

import '../../node_modules/react-big-calendar/lib/addons/dragAndDrop/styles.css'

const DragAndDropCalendar = withDragAndDrop(Calendar)

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
    <Container>
      {props.currentEventList && 
        <div className={'allAroundMargin fullWidth'}>
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
          className={'base1 curvedBase1Border'}
          style={{width: '100%' }}
        />
        </div>

      }
    </Container>
  );
}


function mapStateToProps(state) {
  return {
    currentEventList: state.socketReducer.currentEventList,
  };
}

export default connect(mapStateToProps)(CalendarViewer);


