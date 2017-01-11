import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { replaceRoute } from '../../actions/route';

import {Marker, Callout} from 'react-native-maps';
import DestinationCallout from './Callout';
import __ from "lodash";

import { getSites } from '../../api/sites';
import { getDeal } from '../../api/lastMinutes';
import { getDestination } from '../../api/destinations';
import { setDestination } from '../../actions/destination';

import Global from '../../Global';
import styles from './styles';

class DestinationMarker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            calloutVisibles: false,
            markerType: 'Golf'
        }

        this.showCallout = this.props.toogleCallout;
    }

    async setMarkerImage(siteID) {
        let sitesJson = await getSites(false);
        let sites = await sitesJson.json();
        let site = __.find(sites.sites, { 'id': +siteID });

        if (site) {
            this.setState({markerType: site.name});
        }
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    render() {


        let {destination, showCallout} = this.props;

        let markerImage = "";

        switch (destination.model) {
            case 'anchor':
                //markerImage = require('../../../images/marker_hotel@2x.png');
                break;
            case 'accommodation':
                markerImage = require('../../../images/marker_hotel@2x.png');
                break;
            case 'restaurant':
                markerImage = require('../../../images/marker_restaurant@2x.png');
                break;
            case 'resort':
                    if (destination.site_id == 1) {
                        markerImage = require('../../../images/marker_golf@2x.png');
                    } else {
                        markerImage = require('../../../images/marker_ski@2x.png');
                    }

                break;
            default :
                markerImage = require('../../../images/marker_tent@2x.png');
        }

        let markerOnPress = showCallout ? this.props.toogleCallout : () => {};

        return (
            <Marker
                ref={ref => { this.marker = ref; }}
                coordinate={{latitude: +destination.latitude, longitude: +destination.longitude}}
                image={markerImage}
                onPress={(event) => markerOnPress(event.nativeEvent.target, this.marker, destination)}
                style={{zIndex: 1}}
                >

                <Callout tooltip style={styles.customView} >
                    <DestinationCallout marker={this.marker}/>
                </Callout>
            </Marker>
        );
    }
}

function bindAction(dispatch) {
    return {
        setDestination: (destination) => dispatch(setDestination(destination)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(DestinationMarker);
