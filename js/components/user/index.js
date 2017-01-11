import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { replaceRoute } from '../../actions/route';
import FacebookTabBar from '../facebooktabbar';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import Carousel from 'react-native-carousel';
import styles from "./styles";
import Global from '../../Global';

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    render() {
        let {user} = this.props;

        let imageSource = require('../../../images/profile.png');
        let name = "your name"

        if (user) {
            imageSource = {uri: user.fbProfile.image};
            name = user.fbProfile.name
        }

        return (
            <View style={{flex:1}}>
                <Grid>
                    <Col style={{ flex: 1, backgroundColor: "#ffffff" }}>
                        <Row style={{ flex: 30, flexDirection: 'column', justifyContent:'center', alignItems: "center", marginTop: 20}}>
                            <Col style={{ flex: 1 }}>
                                <Row style={{ flex: 50 }}>
                                    <Image style={{flex: 1, borderRadius: 5, borderColor: '#808080', borderWidth: 1}} resizeMode={Image.resizeMode.cover} source={imageSource}>
                                    </Image>
                                </Row>
                                <Row style={{ flex: 5 }} />
                                <Row style={{ flex: 15 }}>
                                    <Text>{name}</Text>
                                </Row>
                                <Row style={{ flex: 30 }}/>
                            </Col>
                        </Row>
                        <Row style={{ flex: 5}}>
                            <Text>0 Saved</Text>
                        </Row>
                        <Row style={{ flex: 5}}>
                            <Text>0 Following</Text>
                        </Row>
                        <Row style={{ flex: 5}}>
                            <Text>0 Folowers</Text>
                        </Row>
                        <Row style={{ flex: 55 }}/>
                    </Col>
                </Grid>
            </View>
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
        user: state.user,
    }
}

export default connect(mapStateToProps, bindAction)(Profile);
