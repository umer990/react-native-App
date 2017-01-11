"use strict"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Container, Header, Title, Footer, Content, Button, Icon, Alert } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { openDrawer } from '../../actions/drawer';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { lastMinutesTabActive } from '../../actions/deals';
import { setTabBar } from '../../actions/tabBar';
import TabBar from './TabBarOptions';
import LastMinuteMore from '../dealsLastMinute/LastMinuteMore';
import LastMinuteOnMap from '../dealsLastMinute/LastMinuteOnMap';
import Destinations from '../destinations';
import UploadAdventure from '../uploadadventure';
import Profile from '../user';
import Global from '../../Global';
import styles from './styles';

class LastMinuteOnMapTabBar extends Component {
    //componentWillMount() {
    //    this.props.lastMinutesTabActive(true);
    //}
    //
    handleTabChange(obj) {
        if (obj.i == 3) {
            this.props.lastMinutesTabActive(true);
        } else {
            this.props.lastMinutesTabActive(false);
            this.props.setTabBar('DestinationTabBar', obj.i);
        }
    }

    render() {
        const {tabName, deals, initialPage} = this.props;

        return (
            <ScrollableTabView
                onChangeTab={(obj) => this.handleTabChange(obj)}
                initialPage={initialPage}
                tabBarPosition='bottom'
                renderTabBar={() => <TabBar/>}>
                <Profile/>
                <Destinations/>
                <UploadAdventure/>
                <LastMinuteOnMap/>
            </ScrollableTabView>
        )
    }
}

function bindAction(dispatch) {
    return {
        setTabBar: (name, initTab) => dispatch(setTabBar(name, initTab)),
        lastMinutesTabActive: (active) => dispatch(lastMinutesTabActive(active)),
    }
}

const mapStateToProps = (state) => {
    return {
        tabBar: state.tabBar,
    }
}

export default connect(mapStateToProps, bindAction)(LastMinuteOnMapTabBar);
