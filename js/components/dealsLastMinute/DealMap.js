import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { replaceRoute } from '../../actions/route';

import Global from '../../Global';
import styles from './styles';

import MapView, { Marker, Callout } from 'react-native-maps';
import DealsMap from '../map/Map';

var { width, height } = Dimensions.get('window');

class Destinations extends Component {

    constructor(props) {
        super(props);

        this.state = {
            calloutVisible: false,
        }
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    onMarkerPress(e) {
        this.setState({
            calloutVisible: !this.state.calloutVisible
        });

        this.state.calloutVisible ? this.marker1.showCallout() : this.marker1.hideCallout();

        console.log("Click on marker")
    }

    render() {
        return (
            <DealsMap/>
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
        destinations: state.destinations
    }
}

export default connect(mapStateToProps, bindAction)(Destinations);
