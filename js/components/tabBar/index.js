import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Container, Header, Title, Footer, Content, Button, Icon, Alert } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { openDrawer } from '../../actions/drawer';
import { replaceRoute } from '../../actions/route';

//TABBARS
import TabBarOptions from './TabBarOptions';
import DestinationTabBar from './DestinationTabBar';
import DestinationMoreTabBar from './DestinationMoreTabBar';
import LastMinuteTabBar from './LastMinuteTabBar';
import LastMinuteMoreTabBar from './LastMinuteMoreTabBar';
import LastMinuteOnMapTabBar from './LastMinuteOnMapTabBar';


import Global from '../../Global';
import styles from './styles';

class TabBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {deals, tabBar} = this.props;

        //var currentTabBar = React.createFactory(tabBar);
        //return (
        //    <currentTabBar/>
        //)

        console.log("*****************************************************************", tabBar)

        if (tabBar.name === "DestinationTabBar") {
            return (
                <DestinationTabBar initialPage={tabBar.initialPage}/>
            )
        } else if (tabBar.name === "DestinationMoreTabBar") {
            return (
                <DestinationMoreTabBar initialPage={tabBar.initialPage}/>
            )
        } else if (tabBar.name === "LastMinuteTabBar") {
            return (
                <LastMinuteTabBar initialPage={tabBar.initialPage}/>
            )
        } else if (tabBar.name === "LastMinuteMoreTabBar") {
            return (
                <LastMinuteMoreTabBar initialPage={tabBar.initialPage}/>
            )
        } else if (tabBar.name === "LastMinuteOnMapTabBar") {
            return (
                <LastMinuteOnMapTabBar initialPage={tabBar.initialPage}/>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        tabBar: state.tabBar,
        deals: state.deals
    }
}

export default connect(mapStateToProps, null)(TabBar);
