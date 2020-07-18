import * as React from 'react';
import { View, FlatList, TouchableOpacity, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Board from 'react-trello'

import { getWorkItem, addWorkLane, addWorkItem, changeStatus, goToItem } from '../constants/actions.js';

import { styles } from '../styles/style.js'

import Container from './Container.js';
import { TrademarkText, MonoText, TrademarkBigHeaderText } from '../components/StyledText';


function WorkViewer(props) {
  let defaultWorkItemId = '5f1099f89c35da7fb0f59ebb';
  React.useEffect(() => {
    props.dispatch(getWorkItem(defaultWorkItemId));
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
          <TrademarkBigHeaderText>{props.currentWorkItem.title}</TrademarkBigHeaderText>
        </View>
        <Board style={{backgroundColor: 'transparent', overflowY: 'scroll', maxHeight: '70%'}} 
              laneStyle={{backgroundColor: '#d1ccc7', maxHeight: '70%'}}
              editable={true} 
              onLaneAdd={params => {addWorkLane(defaultWorkItemId, params.title)}}
              onCardAdd={(card, laneId) => {props.dispatch(addWorkItem(props.currentWorkItem, card, laneId))}}
              onCardClick={(cardId, metadata, laneId) => {props.dispatch(getWorkItem(cardId))}}
              canAddLanes={true} 
              editLaneTitle={true}
              // onDataChange={onDataChange}
              onCardMoveAcrossLanes={(fromLaneId, toLaneId, cardId, index) => {props.dispatch(changeStatus(props.currentWorkItem, toLaneId, cardId, index))}}
              data={transformWorkItemDataToFrontEnd(props.currentWorkItem)} />
        <View style={[styles.base1, styles.allAroundMargin, styles.slightlyCurvedBase1Border]}>
          <TrademarkBigHeaderText style={[styles.mediumFont]}>Description</TrademarkBigHeaderText>

          <TrademarkText style={[styles.base2Text]}>
            HEY HERE WE AREcxtufygivuhbjn;kbihouvigycuftxydrztfucygvuhbijnkojbiohvugicyfxtdrztxytfcuygivuhobipnobiovuicyfxtydzrxtfucygivuobinbiovu
            dxfcgivuohgipho[pgiuoyftdifuogiphoi[jpoh[iopguiofyitdyfuogipuhoi[jpo[hopguiofy
            igcvuoibohnj'obpivoucygpuhoi[jpo][hiopovuciyuxtrcyiuvhbxtufcyigvuhbihovugicyfutxdyrzdxtfucygivuhobijnhouvgiycfutxyrzetyxtucyivuobijhovuicyutxyrcuyivuyobiupnojbiouviycutxcygivuhobj
            uxtcyiuvogibvuicytxivbvouicyvuobpiovhuciyvuohbiciytvuoibhpjhvouicyturxcyivuohibjhvouigcyfutxcyigvuhobijphovugicyufxigvuhbjhvljkgcfuxtcgivuhbijhvouicytufuogiuhbgovyuictuvfogiubvhougciyuvgibjvhuicgyv
            ivguhbijphovigcvuohbijphovugioibjpovhoiugohbipjoovhuygiphoibjiovhuiyfogiph
            ivoihugicufygoiuvhugiyogiubhvgiuygoibvouiygiubjhvoguhbovygiuphbjlhvkgiuurtxcyiguvhgcyifuxtcyiuvohgcyuf
            ufxtcyguvohiugicyfuxtydcifugivhljkcgiytfuogiujbklvhkgciyfoygiuph;bjklvj k
            icvuyoibgujhvougicytuvgiubjvhjgciyuovhilkljcguioyvguho;bjkvlhjouguphoibj;lvhouicoyfguhobjvhoufyguphobjklvhjkog
            spbdfinokabjpifuhojadgipuhosbipdgsaubufdbsnjobihvuifygoiuhbijhvjkghcyiuvyolhbjkgcjyiufyvogihkjgciytdfuygilvhjckgidtfuoyiguhv
            cgivugihbjgicytuvhjicgyutdfuyvhgicyuxitfuogvhjkchgiuovhjcgiyfuygihvkb kcgifuoghvkjgcifyghvb kcgifuoghvkjgcifyghvb
            gvogbvhouigcfyogiuvbhgicfuoygibjvhoufgtpyhiogivofygtpyhiobvlhough
            vuoyibonkjbihvuoiyogihoikbj;lvihouyfgiuhobnljklvhougiupho;kbnllvigpuhoiklbj;
            asdfvyt8giuhobohvuigcytfgoiubjhvuioygihjbklhvouygiphbjlvhogpho;p[ioj;bjkvlhjouguphoibj
            uvobgivouhgygibouygiupobjohp
            voubiuphoihovuyguhobjivlhobj;ivoguphio;gupihoi[po;gpuiyh[ihpogpiuhi[p;gphilgjkihio;gilu
            ogiphuoibivhogpuhogiuophoigiuophoigiovphoi[gpui]]]]]
            oygipblvhuogiubjhj
            ittvuoyibouciytufoygivucitfygubvoyft978guipbvhgiuoyfgihbjv]]]]]] YA
          </TrademarkText>
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



