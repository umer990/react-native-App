import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View, Thumbnail } from 'native-base';
import { replaceRoute } from '../../actions/route';
import { setTabBar } from '../../actions/tabBar';

import Global from '../../Global';
import styles from './styles';

var { width, height } = Dimensions.get('window');

class BackButton extends Component {

    constructor(props) {
        super(props);
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    render() {

        return (
            <View>
                <TouchableOpacity onPress={() => {this.props.setTabBar('LastMinuteMoreTabBar', 3)}}>
                    <Thumbnail style={[styles.button, {marginLeft: 10, marginTop: 10}]} resizeMode={Image.resizeMode.contain} source={require('../../../images/back-button.png')}>
                    </Thumbnail>
                </TouchableOpacity>
            </View>
        );
    }
}

function bindAction(dispatch) {
    return {
        setTabBar: (name, index) => dispatch(setTabBar(name, index)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(BackButton);
