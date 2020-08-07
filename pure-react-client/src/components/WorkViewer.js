import * as React from 'react';
import { connect } from 'react-redux';
import Board from 'react-trello';
import ReactMarkdown from 'react-markdown';

import { getWorkItem, addWorkLane, addWorkItem, changeStatus, goToItem, deleteWorkItem, getInitialWork } from '../actions/actions.js';

import Container from './Container.js';
import { TrademarkText, MonoText, TrademarkBigHeaderText } from './StyledText';
import HeaderButton from './HeaderButton.js';


const markdownText = '# Remote Pro\n\n## Executive Summary\n\n**There exists no full work from home suite.** Instead, businesses typically combine a patchwork of software (Slack, Jira, Google Drive, Zoom) to run their now remote business. The cost of such a suite for a small business is a prohibitive $7500 a month. Businesses that are new to work from home are looking for a better way to run.\n\n**Remote Pro is the first full work from home suite.** We include messaging, calling, ticketing, calendar, emails, and file storage and editing, all from the browser. While competitors have focused on specific niches, it is too confusing and expensive to run a distributed team with distributed tools.\n\n**Remote Pro is the best place to work from home.** While we are first targeting businesses that are new to remote work, we will expand our market to be the most convenient, inexpensive, and healthy way to work from home. Excellent customer service when there is frustration, and world class engineering to make sure it doesn\'t happen again. It is from this position that we will expand our market to the high rolling software industry.\n\n**Remote Pro is not for businesses that were mostly remote before the pandemic.** We are looking to become the best in the industry, not the most popular. The best way for us to understand the needs of the now remote economy is to address the needs of businesses with 3 - 20 employees that had never before been remote. After we address this market, our position will be strong enough to dominant the larger work from home market.\n\nIn 2020, [42%](https://www.cnbc.com/2020/04/09/heres-what-we-know-about-how-remote-work-changes-us.html) of workers who were not working from home, began to work from home, with [90%](https://buffer.com/state-of-remote-work-2019) saying that they hoped to work from home for the rest of their lives.'



function WorkViewer(props) {
  let defaultWorkItemId = '5f1099f89c35da7fb0f59ebb';

  // let propsToWatch = [];
  React.useEffect(() => {
    if (!props.currentWorkItemId) { // or Id or something else 
      props.dispatch(getInitialWork(props.username));
    } else {
      console.log('GETTING CALLED');
      props.dispatch(getWorkItem(props.currentWorkItemId));
    }
  }, [props.username, props.socketAuthorized, props.currentWorkItemId]);


  // React.useEffect(() => {
  //   if (!props.currentWorkItemId) { // or Id or something else 
  //     props.dispatch(getInitialWork(props.username));
  //   } else {
  //     props.dispatch(getWorkItem(props.currentWorkItemId));
  //   }
  // }, [props.currentWorkItemId]);

  function transformWorkItemDataToFrontEnd(backendWorkItem) {
    let boardData = {};
    let seenLaneTypes = new Set();
    let lanes = [];
    console.log(backendWorkItem);
    let laneTypes = backendWorkItem.lanes;

    // Create lanes
    laneTypes.map(laneType => {
      lanes.push({
        id: laneType.id,
        title: laneType.id,
        order: laneType.order,
        cards: [],
      });
    })

    // Add items to appropriate lane
    backendWorkItem.subItems.map((backendSubItem) => {
      lanes.map((lane) => {
        if (lane.id == backendSubItem.status) {
          lane.cards.push(backendSubItem);
        }
      });
    });

    lanes.map(lane => {
      lane.cards.sort((card1, card2) => card1.order > card2.order)
    });

    lanes.sort((lane1, lane2) => lane1.order > lane2.order);
    console.log('LANES', lanes);

    boardData.lanes = lanes;
    return boardData;

  }
  // console.log(props.currentWorkItem);

  return (
    <Container>
    {props.currentWorkItem ?
      <div className={'scroll'}>
        <div className={'base1 tenPercentHeight allAroundMargin slightlyCurvedBase1Border'}>
          <Container>
            <TrademarkBigHeaderText>{props.currentWorkItem.title}</TrademarkBigHeaderText>
          </Container>
        </div>
        <Board style={{backgroundColor: 'transparent', fontFamily: 'Verdana', overflowY: 'scroll', maxHeight: '70%'}} 
              laneStyle={{backgroundColor: '#d1ccc7',  maxHeight: '50vh' }}
              // cardStyle={{}}
              editable={true} 
              onLaneAdd={params => {addWorkLane(defaultWorkItemId, params.title)}}
              onCardAdd={(card, laneId) => {props.dispatch(addWorkItem(props.currentWorkItem, card, laneId))}}
              onCardClick={(cardId, metadata, laneId) => {props.dispatch(getWorkItem(cardId))}}
              onCardDelete={(cardId, laneId) => {props.dispatch(deleteWorkItem(cardId))}}
              canAddLanes={true} 
              editLaneTitle={true}
              // onDataChange={onDataChange}
              onCardMoveAcrossLanes={(fromLaneId, toLaneId, cardId, index) => {props.dispatch(changeStatus(props.currentWorkItem, toLaneId, cardId, index))}}
              data={transformWorkItemDataToFrontEnd(props.currentWorkItem)} />
        <div className={'base1 allAroundMargin slightlyCurvedBase1Border'}>
          <TrademarkBigHeaderText className={'mediumFont'}>Description</TrademarkBigHeaderText>
          <ReactMarkdown source={markdownText} />
        </div>
      </div>

    : <div></div>
    }
    </Container>
  );






  // return (
  //   <View style={[props.style]}>
  //     <Container style={[styles.base3, styles.allAroundMargin, styles.curvedBase3Border, styles.flexColumn]}>
  //       <TrademarkText style={[]}>{'TODO'}</TrademarkText>
  //       <FlatList
  //         data={toDoWorkItems}
  //         keyExtractor={(item) => item.id}
  //         renderItem={renderSubItem}
  //         style={[styles.container1, styles.allAroundMargin]} 
  //       />
  //     </Container>
  //     <Container style={[styles.base3, styles.allAroundMargin, styles.curvedBase3Border, styles.flexRow]}>
  //       <TrademarkText style={[]}>{'DOING'}</TrademarkText>

  //       <FlatList
  //         data={doingWorkItems}
  //         keyExtractor={(item) => item.id}
  //         renderItem={renderSubItem}
  //         style={[styles.container1, styles.allAroundMargin]} 
  //       />
  //     </Container>
  //     <Container style={[styles.base3, styles.allAroundMargin, styles.curvedBase3Border, styles.flexColumn]}>
  //       <TrademarkText style={[]}>{'DONE'}</TrademarkText>

  //       <FlatList
  //         data={doneWorkItems}
  //         keyExtractor={(item) => item.id}
  //         renderItem={renderSubItem}
  //         style={[styles.container1, styles.allAroundMargin]} 
  //       />
  //     </Container>    
  //   </View>
  // );



}


function mapStateToProps(state) {
  console.log('STATE IN WORK VIEWER:', state);
  return {
    currentWorkItem: state.socketReducer.currentWorkItem,
    currentWorkItemId: state.socketReducer.currentWorkItemId,
    username: state.socketReducer.username,
    socketAuthorized: state.socketReducer.socketAuthorized,
    prop2: state.prop2,
  };
}

export default connect(mapStateToProps)(WorkViewer);



