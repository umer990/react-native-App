import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View, Thumbnail } from 'native-base';
import { ShareApi, GraphRequest, GraphRequestManager, AccessToken} from 'react-native-fbsdk';
import { replaceRoute } from '../../actions/route';
import { setTabBar } from '../../actions/tabBar';
import Global from '../../Global';
import styles from "./styles";


class ReadMoreCarousel extends Component {

    constructor(props) {
        super(props);
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    render() {
        var {thumbnail, setTabBar} = this.props;

        return (
            <Image style={{ flex: 1, width: null, height: null }} resizeMode={Image.resizeMode.stretch} source={ {uri: thumbnail} }>
                <Grid>
                    <Row style={{ flex: 5 }}/>
                    <Row style={{ flex: 10 }}>
                        <Col style={{ flex: 70}}>
                            <Row style={{flex: 1}}>
                                <TouchableOpacity onPress={() => {setTabBar('DestinationTabBar', 1)}}>
                                    <Thumbnail style={{flex: 1, marginLeft: 10, backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 17, width:30, height:30}} resizeMode={Image.resizeMode.cover} source={require('../../../images/back-button.png')}>
                                    </Thumbnail>
                                </TouchableOpacity>
                            </Row>
                        </Col>
                        <Col style={{flex: 30}}/>
                    </Row>
                    <Row style={{ flex: 85 }}/>
                </Grid>
            </Image>
        );
    }
}

function bindAction(dispatch) {
    return {
        setTabBar: (name, initialPage) => dispatch(setTabBar(name, initialPage)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

const mapStateToProps = (state) => {
    return {
        destination: state.destination,
    }
}

export default connect(mapStateToProps, bindAction)(ReadMoreCarousel);
