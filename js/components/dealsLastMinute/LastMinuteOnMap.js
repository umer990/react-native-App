import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { replaceRoute } from '../../actions/route';

import Global from '../../Global';
import styles from './styles';

import MapView, { Marker, Callout, Animated } from 'react-native-maps';
import DestinationMap from '../map/Map';
import ZoomButton from '../map/ZoomButton';
import BackButton from '../map/BackButton';

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 54.06477900;
const LONGITUDE = 16.19532200;
const LATITUDE_DELTA = 1.9922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class LastMinuteOnMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showUserLocation: false,
            region: {
                latitude: +props.deal.latitude,
                longitude: +props.deal.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            calloutVisible: false,
            maxDelta: 5
        }

        this.mapChangeZoom = this.mapChangeZoom.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    onRegionChange(region) {
        this.setState({ region });
        console.log("map change Region", region);
    }

    mapChangeZoom(inc) {
        let latitudeDelta = inc ? this.state.region.latitudeDelta - 2 : this.state.region.latitudeDelta + 2;
        let longitudeDelta = latitudeDelta * ASPECT_RATIO;

        console.log("delta", latitudeDelta)

        if (latitudeDelta > 0 && longitudeDelta > 0) {
            this.setState({
                region: {
                    latitude: this.state.region.latitude,
                    longitude: this.state.region.longitude,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta},
            });

        }
    }

    render() {
        let {deal} = this.props;

        return (
            <View>
                <View style={styles.mapContainer}>
                    <DestinationMap typeShow="deal" region={this.state.region} showUserLocation={this.state.showUserLocation} onRegionChange={this.onRegionChange} />
                    <View style={{flex:1}}>
                        <BackButton/>
                    </View>
                    <View style={{flex:1}}>
                        <ZoomButton mapChangeZoom={this.mapChangeZoom}/>
                    </View>
                </View>
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
        deal: state.deal
    }
}

export default connect(mapStateToProps, bindAction)(LastMinuteOnMap);
