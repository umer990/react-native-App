import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { replaceRoute } from '../../actions/route';

import Global from '../../Global';
import styles from './styles';

var { width, height } = Dimensions.get('window');

class ZoomButton extends Component {

    constructor(props) {
        super(props);
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    render() {

        let {mapChangeZoom} = this.props;

        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => mapChangeZoom(true)} style={styles.button}>
                    <Text style={{fontSize: 35, color:"#ffffff"}}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => mapChangeZoom(false)} style={[styles.button]}>
                    <Text style={{fontSize: 35, color:"#ffffff"}}>-</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(ZoomButton);
