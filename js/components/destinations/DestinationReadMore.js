import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { replaceRoute } from '../../actions/route';
import { getFBLike, setFBLike, setFBShare } from '../../api/facebook';
import FacebookTabBar from '../facebooktabbar';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import Carousel from 'react-native-carousel';
import TabBar from '../tabBar';
import ReadMoreCarousel from './ReadMoreCarousel';
import { ShareApi, GraphRequest, GraphRequestManager, AccessToken} from 'react-native-fbsdk';
import styles from "./styles";
import Global from '../../Global';

class DestinationReadMore extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.appGetFBLikesByModel();

        this.state = {
            fbPostId: null,
            fbPostLikes: null,
        };
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    handleTabChange(obj) {
        if(obj.i == 3)
            this.replaceRoute('welcome');
    }

    _renderDealImages() {
        let {destination} = this.props;

        if (!Array.isArray(destination.thumbnail)) {
            return (
                <ReadMoreCarousel thumbnail={ destination.thumbnail }/>
            );
        } else {
            return (
                <Col style={{ flex: 1 }}>
                    {destination.thumbnail.map((thumbnail, index) => {
                        return <Carousel animate={false} delay={3000} indicatorOffset={110}>
                            <ReadMoreCarousel key={index} thumbnail={ thumbnail }/>
                        </Carousel>
                    })}
                </Col>
            );
        }
    }

    async fbShare() {
        let {destination} = this.props;
        let options = {};

        const shareLinkContent = {
            contentType: 'link',
            //quote: destination.name,
            contentTitle: destination.name,
            contentUrl: destination.link,
            imageUrl: destination.thumbnail,
            contentDescription: destination.description,
        };

        const FBAuth =  await AccessToken.getCurrentAccessToken();

        if (FBAuth) {
            let canShare = await ShareApi.canShare(shareLinkContent)
            if (canShare) {
                var shareResponse = await ShareApi.share(shareLinkContent, '/me', destination.name);
                this.setState({fbPostId: shareResponse.postId});
            } else {
                Alert.alert("We can't shared");
            }

            //model: deal/lastminute/resort/accommodation/restaurant
            options.model = "lastminute";
            options.id = destination.id;
            options.apiToken = await AsyncStorage.getItem(Global.API_TOKEN);
            options.fbPostId = shareResponse.postId;

            try {
                let apiJson = await setFBShare(options);
                let apiData = await apiJson.json();
            } catch(e) {
                console.log(`\r-----------------ERROR---------------\r\r  ${e} \r\r-----------------ERROR---------------\r`);
            }

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
        let {destination} = this.props;
        let options = {};

        const FBAuth =  await AccessToken.getCurrentAccessToken();

        if (FBAuth) {
            options.model = "lastminute";
            options.id = destination.id;
            options.apiToken = await AsyncStorage.getItem(Global.API_TOKEN);

            try {
                let apiJson = await setFBLike(options);
                let apiData = await apiJson.json();
                this.appGetFBLikesByModel().done();
            } catch(e) {
                console.log(`\r-----------------ERROR---------------\r\r  ${e} \r\r-----------------ERROR---------------\r`);
            }


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
        let {destination} = this.props;
        let options = {};

        options.model = "lastminute";
        options.id = destination.id;
        options.apiToken = await AsyncStorage.getItem(Global.API_TOKEN);

        try {
            let apiJson = await getFBLike(options);
            let apiData = await apiJson.json();
            this.setState({fbPostLikes: apiData.likes.length});
        } catch(e) {
            console.log(`\r-----------------ERROR---------------\r\r  ${e} \r\r-----------------ERROR---------------\r`);
        }
    }

    render() {
        const {deals, destination} = this.props;

        var link = destination.link.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);

        return (
            <Grid>
                <Col style={{ flex: 1 }}>
                    <Row style={{ flex: 50 }}>
                        {this._renderDealImages()}
                    </Row>
                    <Row style={{ flex: 2}}/>
                    <Row style={{ flex: 5, flexDirection: 'row', }}>
                        <Col style={{ flex: 80}}>
                            <Row style={{flex: 1}}>
                                <Text style={{fontSize: 14, paddingLeft: 5}}>{ destination.name }</Text>
                            </Row>
                        </Col>
                        <Col style={{ flex: 20}}>
                            <Row style={{flex: 1}}>
                                <TouchableOpacity onPress={() => {this.appSetFBLike().done();}}>
                                    <Image style={{flex: 1, marginLeft: 10, width:20, height:20, flexDirection: 'row', justifyContent:'center', alignItems:'center'}} resizeMode={Image.resizeMode.contain} source={require('../../../images/fb_like.png')}>
                                        <Text style={{fontWeight: 'bold', color: 'white'}}></Text>
                                    </Image>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> {this.fbShare().done();}}>
                                    <Image style={{flex: 1, marginLeft: 5, width:20, height:20}} resizeMode={Image.resizeMode.contain} source={require('../../../images/fb_share.png')}>
                                    </Image>
                                </TouchableOpacity>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ flex: 50, paddingLeft: 7  }}>
                        <Text  style={{ fontSize: 8 }}>{ destination.description }</Text>
                    </Row>
                    <Row style={{ flex: 10,  backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                        <Col style={{ flex: 20 }}/>
                            <Col style={{ flex: 60 }}>
                                <Button block small success style={{flex: 1, width: null}} onPress={() => { this.replaceRoute('web') }}>
                                    <Text style={{color: 'white'}}> {`Go To "${link[1]}" Site`} </Text>
                                </Button>
                            </Col>
                        <Col style={{ flex: 20 }}/>
                    </Row>
                    <Row style={{ flex: 5}}/>
                </Col>
            </Grid>
        );
    }
}

function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

const mapStateToProps = (state) => {
    return {
        destination: state.destination,
        deals: state.deals
    }
}


export default connect(mapStateToProps, bindAction)(DestinationReadMore);
