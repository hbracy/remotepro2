import * as React from 'react';
import { View, FlatList, TouchableOpacity, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Board from 'react-trello';
import ReactMarkdown from 'react-markdown';

import { getWorkItem, addWorkLane, addWorkItem, changeStatus, goToItem, deleteWorkItem } from '../constants/actions.js';

import { styles } from '../styles/style.js'

import Container from './Container.js';
import { TrademarkText, MonoText, TrademarkBigHeaderText } from '../components/StyledText';
import HeaderButton from '../components/HeaderButton.js';


const markdownText = '# Remote Pro\n\n## Executive Summary\n\n**There exists no full work from home suite.** Instead, businesses typically combine a patchwork of software (Slack, Jira, Google Drive, Zoom) to run their now remote business. The cost of such a suite for a small business is a prohibitive $7500 a month. Businesses that are new to work from home are looking for a better way to run.\n\n**Remote Pro is the first full work from home suite.** We include messaging, calling, ticketing, calendar, emails, and file storage and editing, all from the browser. While competitors have focused on specific niches, it is too confusing and expensive to run a distributed team with distributed tools.\n\n**Remote Pro is be the best place to work from home.** While we are first targeting businesses that are new to remote work, we will expand our market to be the most convenient, inexpensive, and healthy way to work from home. Excellent customer service when there is frustration, and world class engineering to make sure it doesn\'t happen again. It is from this position that we will expand our market to the high rolling software industry.\n\n**Remote Pro is not for businesses that were mostly remote before the pandemic.** We are looking to become the best in the industry, not the most popular. The best way for us to understand the needs of the now remote economy is to address the needs of businesses with 3 - 20 employees that had never before been remote. After we address this market, our position will be strong enough to dominant the larger work from home market.\n\nIn 2020, [42%](https://www.cnbc.com/2020/04/09/heres-what-we-know-about-how-remote-work-changes-us.html) of workers who were not working from home, began to work from home, with [90%](https://buffer.com/state-of-remote-work-2019) saying that they hoped to work from home for the rest of their lives.'



function WorkViewer(props) {
  let defaultWorkItemId = '5f1099f89c35da7fb0f59ebb';
  React.useEffect(() => {
    if (!props.currentWorkItem) {
      props.dispatch(getWorkItem(defaultWorkItemId));
    }
  }, []);

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
        // style: {height: '50%'}
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
  return (
    <View style={[props.style, styles.container1]}>
    {props.currentWorkItem ?
      <div style={{overflowY: 'scroll'}}>
        <View style={[styles.base1, styles.tenPercentHeight, styles.allAroundMargin, styles.slightlyCurvedBase1Border]}>
          <Container style={[styles.flexRow]}>
            <TrademarkBigHeaderText>{props.currentWorkItem.title}</TrademarkBigHeaderText>
            <HeaderButton title="Go Back"
              //Turn off everything if isSmallWindow
              onPress={() => console.log('goback')}
              style={[styles.container1, styles.curvedBase1Border, styles.base1]}
              textColor={styles.base2Text}
            />
          </Container>
        </View>
        <Board style={{backgroundColor: 'transparent', overflowY: 'scroll', maxHeight: '70%'}} 
              laneStyle={{backgroundColor: '#d1ccc7', maxHeight: '70%'}}
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
        <View style={[styles.base1, styles.allAroundMargin, styles.slightlyCurvedBase1Border]}>
          <TrademarkBigHeaderText style={[styles.mediumFont]}>Description</TrademarkBigHeaderText>
          <ReactMarkdown source={markdownText} />



        </View>
      </div>

    : <View></View>
    }
    </View>
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
  return {
    currentWorkItem: state.socketReducer.currentWorkItem,
    prop2: state.prop2,
  };
}

export default connect(mapStateToProps)(WorkViewer);



