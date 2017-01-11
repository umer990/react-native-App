import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { replaceRoute } from '../../actions/route';
import { getFBLike, setFBLike, setFBShare } from '../../api/facebook';
import { lastMinuteReservation } from '../../api/lastMinutes';
import FacebookTabBar from '../facebooktabbar';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import Carousel from 'react-native-carousel';
import { setTabBar } from '../../actions/tabBar';
import { setCurrentDial } from '../../actions/deal';
import DealImage from './LastMinuteImage';
import { ShareApi, GraphRequest, GraphRequestManager, AccessToken} from 'react-native-fbsdk';
import styles from "./styles";
import Global from '../../Global';


class DealMore extends Component {
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

    componentWillMount() {
        this.appGetFBLikesByModel();
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    handleTabChange(obj) {
        if(obj.i == 3)
            this.replaceRoute('welcome');
    }

    viewOnMap(deal) {
        this.props.setTabBar('LastMinuteOnMapTabBar', 3);
        this.props.setCurrentDial(deal);
    }

    _renderDealImages() {
        const {deal, setModalVisible} = this.props;

        if (!Array.isArray(deal.thumbnail)) {
            return (
                <DealImage thumbnail={ deal.thumbnail }/>
            );
        } else {
            return (
                <Col style={{ flex: 1 }}>
                    {deal.thumbnail.map((thumbnail, index) => {
                        return <Carousel animate={false} delay={3000} indicatorOffset={110}>
                                    <DealImage key={index} thumbnail={ thumbnail }/>
                                </Carousel>
                    })}
                </Col>
            );
        }
    }

    async dealReservation() {
        let {deal} = this.props;
        let options = {};

        options.model = "lastminute";
        options.id = deal.id.toString();
        options.apiToken = await AsyncStorage.getItem(Global.API_TOKEN);

        try {
            let apiJson = await lastMinuteReservation(options);
            let apiData = await apiJson.json();

            if (apiData.status){
                Alert.alert("Last minute was reservation");
            } else {
                Alert.alert("Last minute was not reservation");
            }
        } catch(e) {
            console.log(`\r-----------------ERROR---------------\r\r  ${e} \r\r-----------------ERROR---------------\r`);
        }
    }

    async fbShare() {
        let {deal} = this.props;
        let options = {};

        const shareLinkContent = {
            contentType: 'link',
            //quote: deal.name,
            contentTitle: deal.name,
            contentUrl: deal.link,
            imageUrl: deal.thumbnail,
            contentDescription: deal.description,
        };

        const FBAuth =  await AccessToken.getCurrentAccessToken();

        if (FBAuth) {
            let canShare = await ShareApi.canShare(shareLinkContent)
            if (canShare) {
                var shareResponse = await ShareApi.share(shareLinkContent, '/me', deal.name);
                this.setState({fbPostId: shareResponse.postId});
            } else {
                Alert.alert("We can't shared");
            }

            //model: deal/lastminute/resort/accommodation/restaurant
            options.model = "lastminute";
            options.id = deal.id;
            options.apiToken = await AsyncStorage.getItem(Global.API_TOKEN);
            options.fbPostId = shareResponse.postId;

            let apiJson = await setFBShare(options);
            let apiData = await apiJson.json();

            if (apiData.status) {
                Alert.alert('Shared');
            }
            else {
                Alert.alert('UnShare');
            }
        } else {
            Alert.alert('You should login first');
        }
    }

    async appSetFBLike() {
        let {deal} = this.props;
        let options = {};

        const FBAuth =  await AccessToken.getCurrentAccessToken();

        if (FBAuth) {
            options.model = "lastminute";
            options.id = deal.id;
            options.apiToken = await AsyncStorage.getItem(Global.API_TOKEN);

            let apiJson = await setFBLike(options);
            let apiData = await apiJson.json();
            this.appGetFBLikesByModel().done();

            if (apiData.status) {
                Alert.alert('Likes');
            }
            else {
                Alert.alert('Unlike');
            }
        } else {
            Alert.alert('You should login first');
        }
    }

    async appGetFBLikesByModel() {
        let {deal} = this.props;
        let options = {};

        options.model = "lastminute";
        options.id = deal.id.toString();
        options.apiToken = await AsyncStorage.getItem(Global.API_TOKEN);

        try {
            let apiJson = await getFBLike(options);
            let apiData = await apiJson.json();

            this.setState({fbPostLikes: apiData.likes.length});
        } catch(e) {
            console.log(`\r-----------------ERROR---------------\r\r  ${e} \r\r-----------------ERROR---------------\r`);
        }

    }

    getTimeDelta(startDate, todayDate) {
        let start = new Date(startDate[1],startDate[2]-1,startDate[3],startDate[4],startDate[5],startDate[6]);
        let today = new Date(todayDate[0], todayDate[1]-1, todayDate[2],todayDate[3],todayDate[4],todayDate[5]);

        let milliseconds = start - today;
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        let countMilliseconds = (milliseconds && milliseconds > 0) ? milliseconds % 60 : "";
        let countSeconds = (seconds && seconds > 0) ? seconds % 60 : "";
        let counMinutes = (minutes && minutes > 0) ? minutes % 60 : "";
        let countHours = (hours && hours > 0) ? hours % 24 : "";
        let countDays = (days && days > 0) ? days : "";
        let dayLabel = (countDays > 1) ? "days" : "day";

        return `${countDays} ${dayLabel} ${countHours}:${counMinutes}:${countSeconds}`;

    }

    render() {
        const { deal } = this.props;

        let data = "2017-01-10 05:40:10".match(/(\d{4})\-(\d{2})\-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})/);
        var timeLeft = this.getTimeDelta(data, [2017,1,5,4,10,10]);

        console.log("-------------------", timeLeft);

        return (
            <Grid>
                <Col style={{ flex: 1 }}>
                    <Row style={{ flex: 50 }}>
                        {this._renderDealImages()}
                    </Row>
                    <Row style={{ flex: 2}}/>
                    <Row style={{ flex: 12, flexDirection: 'row', }}>
                        <Col style={{ flex: 80}}>
                            <Row style={{flex: 1}}>
                                <Text style={{flex: 1, fontSize: 14, paddingLeft: 5}}>{ deal.name }</Text>
                            </Row>
                        </Col>
                        <Col style={{ flex: 20}}>
                            <Row style={{flex: 1}}>
                                <TouchableOpacity onPress={() => {this.appSetFBLike().done();}}>
                                    <Image style={{flex: 1, width:20, height:20, flexDirection: 'row', marginLeft: 10, marginBottom: 20}} resizeMode={Image.resizeMode.contain} source={require('../../../images/fb_like.png')}>
                                        <Text style={{fontWeight: 'bold', color: 'white'}}></Text>
                                    </Image>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> {this.fbShare().done();}}>
                                    <Image style={{flex: 1, width:20, height:20,  marginLeft: 5, marginBottom: 20}} resizeMode={Image.resizeMode.contain} source={require('../../../images/fb_share.png')}>
                                    </Image>
                                </TouchableOpacity>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ flex: 48,  flexDirection: 'row' }}>
                        <ScrollView>
                            <Text  style={{flex: 1, fontSize: 8, flexWrap: 'wrap', paddingLeft: 7}}>{ deal.description }</Text>
                        </ScrollView>
                    </Row>
                    <Row style={{ flex: 2}}/>
                    <Row style={{ flex: 5, flexDirection: 'row', justifyContent:'flex-start', paddingLeft: 5 }}>
                        <Text style={{ color: 'red', fontSize: 10 }}> Time left: {timeLeft} </Text>
                    </Row>
                    <Row style={{ flex: 5, flexDirection: 'row', justifyContent:'flex-start', paddingLeft: 5 }}>
                        <Text style={{ color: 'red', fontSize: 16 }}> {`Total ${deal.currency}${parseFloat(deal.price)}`} </Text>
                    </Row>
                    <Row style={{ flex: 30 }}>
                        <Col style={{ flex: 20 }} />
                        <Col style={{ flex: 60 }}>
                            <Row style={{ flex: 5 }}/>
                            <Row style={{ flex: 10 }}>
                                <Col style={{ flex: 20 }} />
                                <Col style={{ flex: 60 }}>
                                    <Row style={{ flex: 1 }}>
                                        <Button block small simple style={{flex: 1}} onPress={() => this.viewOnMap(deal)}>
                                            <Text style={{color: 'white'}}>View on map</Text>
                                        </Button>
                                    </Row>
                                </Col>
                                <Col style={{ flex: 20 }} />
                            </Row>
                            <Row style={{ flex: 2 }}/>
                            <Row style={{ flex: 10 }}>
                                <Button block small success style={{flex: 1, width: null}} onPress={() => this.dealReservation()}>
                                    <Text style={{color: 'white'}}>Make a reservation</Text>
                                </Button>
                            </Row>
                            <Row style={{ flex: 3 }}/>
                        </Col>
                        <Col style={{ flex: 20 }} />
                    </Row>
                    <Row style={{ flex: 2}}/>
                </Col>
            </Grid>
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

const mapStateToProps = (state) => {
    return {
        deal: state.deal,
    }
}


export default connect(mapStateToProps, bindAction)(DealMore);
