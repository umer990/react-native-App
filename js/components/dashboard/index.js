
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Title, Footer, Content, Button, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { openDrawer } from '../../actions/drawer';
import { replaceRoute } from '../../actions/route';
import FacebookTabBar from '../facebooktabbar';
import Settings from '../settings';
import Login from '../login';

import MainGolf from '../maingolf';
import MainSki from '../mainski';
import World from '../world';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import theme from '../../themes/base-theme';
import styles from './styles';
/*

<Button transparent onPress={this.props.openDrawer}>
    <Icon name="ios-menu" />
</Button>
<Button transparent onPress={() => this.replaceRoute('login')}>
    <Icon name="ios-power" />
</Button>

<Container theme={theme} style={{backgroundColor: '#fff'}}>
</Container>
*/
class Dashboard extends Component {

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    render() {
        //if(global.world_type == 'Golf') {
          return (
            <World />
          )
        //} else if(global.world_type == 'Ski') {
        //  return (
        //    <World />
        //  )
        //}
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Dashboard);
