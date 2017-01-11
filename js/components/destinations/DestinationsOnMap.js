import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';

import MapView, { Marker, Callout, Animated } from 'react-native-maps';
import DestinationMap from '../map/Map';
import ZoomButton from '../map/ZoomButton';

import Global from '../../Global';
import styles from './styles';

class Destinations extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showUserLocation: false,
            calloutVisible: false,
        }
    }

    render() {
        let {destinations} = this.props;

        return (
            <View style={styles.container}>

                <DestinationMap typeShow="destinations" showUserLocation={this.state.showUserLocation} region={this.props.region } onRegionChange={this.props.onRegionChange} />

                <View style={{flex:1}}>
                    <ZoomButton mapChangeZoom={this.props.mapChangeZoom}/>
                </View>
            </View>
        );
    }
}

export default connect(null, null)(Destinations);

