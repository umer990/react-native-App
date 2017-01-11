"use strict"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Container, Header, Title, Footer, Content, Button, Icon, Alert } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { setFilterMap } from '../../actions/filterMap';
import TabBarOptions from './TabBarOptions';
import UploadAdventure from '../uploadadventure';
import Destinations from '../destinations';
import Profile from '../user';
import Global from '../../Global';
import styles from './styles';

class DestinationTabBar extends Component {
    componentWillMount() {
        this.handleTabChange({i: this.props.tabBar.initialPage})
    }

    componentWillUnmount() {
        this.props.setFilterMap({category: "", text: "", show: false});
    }

    handleTabChange(obj) {
        let filterShow = (obj.i == 1) ? true : false;
        this.props.setFilterMap({category: "", text: "", show: filterShow});
    }

    render() {
        const {deals, initialPage} = this.props;

        return (
            <ScrollableTabView
                onChangeTab={(obj) => this.handleTabChange(obj)}
                initialPage={initialPage}
                tabBarPosition='bottom'
                renderTabBar={() => <TabBarOptions/>}>
                <Profile/>
                <Destinations/>
                <UploadAdventure/>
            </ScrollableTabView>
        )
    }
}

function bindAction(dispatch) {
    return {
        setFilterMap: (filter) => dispatch(setFilterMap(filter)),
    }
}

const mapStateToProps = (state) => {
    return {
        tabBar: state.tabBar,
    }
}

export default connect(mapStateToProps, bindAction)(DestinationTabBar);
