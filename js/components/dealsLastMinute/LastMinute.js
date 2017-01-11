import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, AppState, Modal, TouchableHighlight, ScrollView} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View, Card, CardItem} from 'native-base';
import { replaceRoute } from '../../actions/route';
import { setCurrentDial } from '../../actions/deal';
import { setTabBar } from '../../actions/tabBar';
import Global from '../../Global';
import styles from "./styles";

class Deal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDeal: {},
            modalVisible: false,
            hidden: false,
            fbPostId: null,
            fbPostLikes: null,
        };
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    readMore(deal) {
        this.props.setTabBar('LastMinuteMoreTabBar', 3);
        this.props.setCurrentDial(deal);
    }


    getTimeDelta(startDate, todayDate) {
        let delta = startDate - todayDate;
        let milliseconds = Math.floor((delta%1000)/100);
        let seconds = parseInt((delta/1000)%60);
        let minutes = parseInt((delta/(1000*60))%60);
        let hours = parseInt((delta/(1000*60*60))%24);
        let days = Math.floor(delta/(1000*60*60) / 24);

        let countMilliseconds = (milliseconds && milliseconds < 10) ? "0" + milliseconds: milliseconds;
        let countSeconds = (seconds && seconds < 10) ? "0" + seconds: seconds;
        let counMinutes = (minutes && minutes < 10) ? "0" + minutes: minutes;
        let countHours = (hours && hours < 10) ? "0" + hours: hours;
        let countDays = (days && days > 0) ? days : 0;
        let dayLabel = (days > 1) ? "days" : "day";

        return `${countDays} ${dayLabel} ${countHours}:${counMinutes}:${countSeconds}`;

    }

    render() {
        const {deal} = this.props;

        let start = deal.starts.match(/(\d{4})\-(\d{2})\-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/);
        let startDate = new Date(start[1],start[2]-1,start[3],start[4],start[5],start[6]);
        let todayDate = new Date();
        var timeLeft = this.getTimeDelta(startDate, todayDate);

        console.log("-------------------", timeLeft);

        return (
            <Row style={styles.container}>
                <TouchableHighlight onPress={ () => this.readMore(deal) }>
                    <Image style={{ flex: 1, width: null, height: null}}
                           hidden={this.state.hidden} resizeMode={Image.resizeMode.stretch}
                           source={ {uri: deal.thumbnail} }>
                        <Col style={ styles.container }>
                            <Row style={{ flex: 5 }}/>
                            <Row style={{ flex: 95 }}>
                                <Col style={{ flex: 1 }}>
                                    <Row style={{ flex: 70 }}/>
                                    <Row style={{ flex: 30, backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                                        <Col style={{ flex: 70 }}>
                                            <Row style={{ flex: 5 }}/>
                                            <Row style={{ flex: 45 }}>
                                                <Text style={{ flex: 1, fontSize: 11, flexWrap: 'wrap', paddingLeft: 3 }}> {deal.name} </Text>
                                            </Row>
                                            <Row style={{ flex: 5 }}/>
                                            <Row style={{ flex: 55}}>
                                                <Text style={{ flex: 1, fontSize: 8, flexWrap: 'wrap', paddingLeft: 7 }}> {deal.shortdescription} </Text>
                                            </Row>
                                        </Col>
                                        <Col style={{ flex: 30 }}>
                                            <Row style={{ flex: 5 }}/>
                                            <Row style={{ flex: 30, flexDirection: 'column', justifyContent:'flex-end'}}>
                                                <Text style={{ color: 'red', fontSize: 10 }}> Time left: </Text>
                                                <Text style={{ color: 'red', fontSize: 10 }}> {timeLeft} </Text>
                                            </Row>
                                            <Row style={{ flex: 35 }}/>
                                            <Row style={{ flex: 25, flexDirection: 'row', justifyContent:'flex-end'}}>
                                                <Text style={{ color: 'red' }}> {`Total ${deal.currency}${parseFloat(deal.price)}`} </Text>
                                            </Row>
                                            <Row style={{ flex: 5 }}/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Image>
                </TouchableHighlight>
            </Row>

        );
    }
}

function bindAction(dispatch) {
    return {
        setTabBar: (name, initialPage) => dispatch(setTabBar(name, initialPage)),
        setCurrentDial: (deal) => dispatch(setCurrentDial(deal)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Deal);
