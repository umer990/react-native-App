import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, ScrollView, WebView, ActivityIndicator } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View, Linking, Thumbnail } from 'native-base';
import { replaceRoute } from '../../actions/route';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import { setTabBar } from '../../actions/tabBar';
import Carousel from 'react-native-carousel';
import styles from "./styles";
import Global from '../../Global';

class Web extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animating: true,
        };
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    backToApp() {
        this.props.setTabBar("DestinationMoreTabBar", 1);
        this.replaceRoute('world');
    }

    render() {
        let {destination, setTabBar} = this.props;

        return (
            <Grid>
                <Col style={{flex: 1}}>
                    <Row style={{flex:4, backgroundColor:'#000000'}}>
                        <Col style={{flex:10, justifyContent:'center', alignItems:'center'}}>
                            <TouchableOpacity onPress={() => {}}>
                                <Image style={{flex: 1, width: 15, height: 15}} resizeMode={Image.resizeMode.contain} source={require('../../../images/menu-options.png')}>
                                </Image>
                            </TouchableOpacity>
                        </Col>
                        <Col style={{flex:20}}/>
                        <Col style={{flex:40, flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                            <Image style={{flex: 1,
                                    width: 250,
                                    height: 50}} resizeMode={Image.resizeMode.contain} source={require('../../../images/Golfskiworld-logo.png')}>
                            </Image>
                        </Col>
                        <Col style={{flex:30}}/>
                    </Row>
                    <Row style={{flex: 96}}>
                        <TouchableOpacity style={{ flex: 15, marginLeft: 10, marginTop: 10, position:"absolute", zIndex: 9999}} onPress={() => {this.backToApp()}}>
                            <Thumbnail style={{flex: 1, backgroundColor: "rgba(0,0,0,0.5)", width:30, height:30}} resizeMode={Image.resizeMode.cover} source={require('../../../images/back-button.png')}>
                            </Thumbnail>
                        </TouchableOpacity>
                        <WebView
                            renderLoading = {() => (
                              <ActivityIndicator
                              style={{alignItems: 'center', justifyContent: 'center', padding: 8}}
                              color="#0000FF"
                              animating={this.state.animating}
                              size="large" />
                            )}
                            onLoadStart={()=> this.setState({animating: true})}
                            onLoadEnd={()=> this.setState({animating: false})}
                            renderError= {(err) => {console.log(err)}}
                            source={{uri: destination.link}}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                        />
                    </Row>
                </Col>
            </Grid>
        );
    }
}

function bindAction(dispatch) {
    return {
        setTabBar: (name, index) => dispatch(setTabBar(name, index)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

const mapStateToProps = (state) => {
    return {
        destination: state.destination,
        deals: state.deals
    }
}

export default connect(mapStateToProps, bindAction)(Web);
