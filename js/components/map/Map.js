import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { replaceRoute } from '../../actions/route';
import { getDestination } from '../../api/destinations';
import { setDestination } from '../../actions/destination';

import Global from '../../Global';
import styles from './styles';

import MapView, { Marker, Callout } from 'react-native-maps';
import DestinationMarker from './Marker';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;


class DestinationMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            prevMarkerId: null,
            prevMarker: null,
            calloutVisibles: false,
        }

        this.toogleCallout = this.toogleCallout.bind(this);
    }

    static get _this() {
        return this;
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    onPress(event) {
        event.preventDefault();
        event.stopPropagation();
        //console.log("-------onClick Coordinates-----------------------------------------: ", event.nativeEvent)
    }

    toogleCallout(markerId, marker, destination) {
        if (markerId == this.state.prevMarkerId || !this.state.prevMarkerId) {
            if (!this.state.calloutVisibles) {
                this.setCurrentDestination(destination.url).done(() => {
                    marker.showCallout();
                });
            } else {
                marker.hideCallout();
            }

            this.setState({
                calloutVisibles: !this.state.calloutVisibles
            });


        } else {
            if (this.state.calloutVisibles) {
                this.state.prevMarker.hideCallout();
            } else {
                this.setState({
                    calloutVisibles: !this.state.calloutVisibles
                });
            }

            this.setCurrentDestination(destination.url).done(() => {
                marker.showCallout();
            });
        }

        //SET PREV MARKER
        this.setState({prevMarkerId: markerId, prevMarker: marker});
    }

    async setCurrentDestination(apiPath) {
        let destinationJson = await getDestination(apiPath);
        let destination = await destinationJson.json();
        this.props.setDestination(destination);
    }


    render() {
        let {destinations, deal, typeShow, region, showUserLocation, onRegionChange} = this.props;

        //console.log("map region: ", destinations);
        var markers = () => <DestinationMarker destination={[]}/>

        if (typeShow == "destinations") {
            markers = destinations.map( (destination, i)  => (
                <DestinationMarker key={i} showCallout={true} toogleCallout={this.toogleCallout} destination={destination}/>
            ));
        } else if (typeShow == "deal") {
            deal.model = "resort";
            markers = <DestinationMarker showCallout={false} destination={deal}/>
        }

        return (
            <MapView
                provider="google"
                region={region}
                showsUserLocation={showUserLocation}
                followsUserLocation={showUserLocation}
                pitchEnabled={true}
                ref={ref => { this.map = ref; }}
                showsPointsOfInterest={false}
                showsBuildings={true}
                zoomEnabled={true}
                scrollEnabled={true}
                pitchEnabled={true}
                //maxDelta={5}
                //minDelta={1}
                //rotateEnabled={false}
                //cacheEnabled={true}
                //initialRegion={region}
                onRegionChangeComplete={onRegionChange}
                //onRegionChange={onRegionChange}
                onPress={this.onPress}
                style={styles.map}
                loadingEnabled={true}
                loadingIndicatorColor={"#666666"}
                loadingBackgroundColor={"#eeeeee"}>

                {markers}
            </MapView>
        );
    }
}

function bindAction(dispatch) {
    return {
        setDestination: (destination) => dispatch(setDestination(destination)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

const mapStateToProps = (state) => {
    return {
        deal: state.deal,
        destinations: state.destinations
    }
}

export default connect(mapStateToProps, bindAction)(DestinationMap);
