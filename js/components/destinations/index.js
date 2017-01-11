import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { replaceRoute } from '../../actions/route';
import { setSearchSquareСoordinates } from "../../actions/filterMap";
import { getDestinations } from '../../api/destinations';
import { setDestinations } from '../../actions/destinations';
import DestinationsOnMap from "./DestinationsOnMap";

import __ from "lodash";
import Global from '../../Global';
import styles from './styles';

import MapView, { Marker, Callout, Animated } from 'react-native-maps';
import DestinationMap from '../map/Map';
import ZoomButton from '../map/ZoomButton';

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE =  53.5000000000000;
const LONGITUDE = 18.5000000000000;
const LATITUDE_DELTA = 15.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class Destinations extends Component {

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
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
    this.setState({
      region: {
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: this.state.region.latitudeDelta,
        longitudeDelta: this.state.region.longitudeDelta},
    });

    this.setDestinations();

    console.log("map change Region", region);
  }

  mapChangeZoom(inc) {
    let latitudeDelta = inc ? this.state.region.latitudeDelta - 3 : this.state.region.latitudeDelta + 3;
    let longitudeDelta = latitudeDelta * ASPECT_RATIO;

    if (longitudeDelta > 0 && longitudeDelta < 23) {
      this.setState({
        region: {
          latitude: this.state.region.latitude,
          longitude: this.state.region.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta},
      });

    }
    this.setDestinations();
  }

  async setDestinations() {
    let x1 = this.state.region.longitude - height/1000 * this.state.region.longitudeDelta;
    let y1 = this.state.region.latitude - (width+height)/2/1000 * this.state.region.latitudeDelta;

    let x2 = this.state.region.longitude + height/1000 * this.state.region.longitudeDelta;
    let y2 = this.state.region.latitude + (width+height)/2/1000 * this.state.region.latitudeDelta;

    const apiToken = await AsyncStorage.getItem(Global.API_TOKEN);

    let options = {
      apiToken: apiToken,
      category: this.props.filterMap.category,
      text: this.props.filterMap.text,
      coordinates: {
        longMin: x1,
        longMax: x2,
        latMin: y1,
        latMax: y2,
      },

    }

    const destinationsJson = await getDestinations(options);
    let destinations = await destinationsJson.json();
    //console.log("%%%%%%%%%%%%%%%%%", destinations);
    this.props.setDestinations(destinations);
  }

  async addAnchors() {
    let {destinations} = this.props;

    if (__.find(destinations, { 'id': 1001 })) {
      destinations.splice(destinations.length - 4, 4);
    }

    let x1 = this.state.region.longitude - height/1000 * this.state.region.longitudeDelta;
    let y1 = this.state.region.latitude - (width+height)/2/1000 * this.state.region.latitudeDelta;

    let x2 = this.state.region.longitude + height/1000 * this.state.region.longitudeDelta;
    let y2 = this.state.region.latitude + (width+height)/2/1000 * this.state.region.latitudeDelta;


    let searchSquareСoordinates = {
      longMin: x1,
      longMax: x2,
      latMin: y1,
      latMax: y2,
    }

    destinations.push(
        { id: 1001,
          type_id: '1',
          longitude: x1,
          latitude: y1,
          model: 'anchor',
          url: '/geo/show/accommodation/16' },
        { id: 1002,
          type_id: '1',
          longitude: x1,
          latitude: y2,
          model: 'anchor',
          url: '/geo/show/accommodation/16' },
        { id: 1003,
          type_id: '1',
          longitude: x2,
          latitude: y2,
          model: 'anchor',
          url: '/geo/show/accommodation/16' },
        { id: 1004,
          type_id: '1',
          longitude: x2,
          latitude: y1,
          model: 'anchor',
          url: '/geo/show/accommodation/16' },
        //{ id: 1006,
        //  type_id: '1',
        //  longitude: this.state.region.longitude - height/1000 * this.state.region.longitudeDelta,//x
        //  latitude: this.state.region.latitude,//y
        //  model: 'anchor',
        //  url: '/geo/show/accommodation/16' },
        //{ id: 1007,
        //  type_id: '1',
        //  longitude: this.state.region.longitude,//x
        //  latitude: this.state.region.latitude + (width+height)/2/1000 * this.state.region.latitudeDelta,//y
        //  model: 'anchor',
        //  url: '/geo/show/accommodation/16' },
        //{ id: 1008,
        //  type_id: '1',
        //  longitude: this.state.region.longitude + height/1000 * this.state.region.longitudeDelta,//x
        //  latitude: this.state.region.latitude,//y
        //  model: 'anchor',
        //  url: '/geo/show/accommodation/16' },
        //{ id: 1009,
        //  type_id: '1',
        //  longitude: this.state.region.longitude,//x
        //  latitude: this.state.region.latitude - (width+height)/2/1000 * this.state.region.latitudeDelta,//y
        //  model: 'anchor',
        //  url: '/geo/show/accommodation/16' }
    );

  }

  render() {

    //this.addAnchors();

    return (
        <DestinationsOnMap region={this.state.region} mapChangeZoom={this.mapChangeZoom} onRegionChange={this.onRegionChange} />
    );
  }
}

function bindAction(dispatch) {
  return {
    setDestinations: (destinations) => dispatch(setDestinations(destinations)),
    setSearchSquareСoordinates:(coordinates)=>dispatch(setSearchSquareСoordinates(coordinates)),
    replaceRoute:(route)=>dispatch(replaceRoute(route))
  }
}

const mapStateToProps = (state) => {
  return {
    destinations: state.destinations,
    deal: state.deal,
    filterMap: state.filterMap,
  }
}

export default connect(mapStateToProps, bindAction)(Destinations);