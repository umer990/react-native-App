import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Container, Header, Title, Footer, Content, Button, Icon, Alert } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { openDrawer } from '../../actions/drawer';
import { replaceRoute } from '../../actions/route';
import { setDealList } from '../../actions/deals';

import FacebookTabBar from '../facebooktabbar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DestinationTabBar from '../tabBar/DestinationTabBar';

import Global from '../../Global';

import theme from '../../themes/base-theme';
import styles from './styles';

class MainGolf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'featured',
            deals: [],
        };
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    handleTabChange(obj) {
      if(obj.i == 3)
         this.replaceRoute('welcome');
    }

    render() {
      var {deals} = this.props;

      return (
        <Grid>
          <Row style={{flex:2, flexDirection:'column', backgroundColor:'#228B22'}}>
            <View style={{flex:3}} />
            <View style={{flex:6}}>
              <Text style={{color:'white', fontSize:22, textAlign:'center'}}>Golf World</Text>
            </View>
            <View style={{flex:1}} />
          </Row>
          <Row style={{flex:26}}>
            <DestinationTabBar/>
          </Row>
        </Grid>
      )
    }
}

function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

const mapStateToProps = (state) => {
    return {
        deals: state.deals
    }
}

export default connect(mapStateToProps, bindAction)(MainGolf);
