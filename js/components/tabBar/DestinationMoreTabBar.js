"use strict"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Container, Header, Title, Footer, Content, Button, Icon, Alert } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { lastMinutesTabActive } from '../../actions/deals';
import TabBarOptions from './TabBarOptions';
import DestinationReadMore from '../destinations/DestinationReadMore';
import UploadAdventure from '../uploadadventure';
import Profile from '../user';
import Global from '../../Global';
import styles from './styles';

class DestinationMoreTabBar extends Component {
    componentWillMount() {
        this.props.lastMinutesTabActive(false);
    }

    render() {
        const {initialPage} = this.props;

        return (
            <ScrollableTabView
                initialPage={initialPage}
                tabBarPosition='bottom'
                renderTabBar={() => <TabBarOptions/>}>
                <Profile/>
                <DestinationReadMore/>
                <UploadAdventure/>
            </ScrollableTabView>
        )
    }
}

function bindAction(dispatch) {
    return {
        lastMinutesTabActive: (active) => dispatch(lastMinutesTabActive(active)),
    }
}

const mapStateToProps = (state) => {
    return {
        tabBar: state.tabBar,
    }
}

export default connect(mapStateToProps, bindAction)(DestinationMoreTabBar);
