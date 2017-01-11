"use strict"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Container, Header, Title, Footer, Content, Button, Icon, Alert } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import styles from './styles';

class TabBarOptions extends Component {
    render() {
        var {tabs, activeTab, activeBackgroundColor, inactiveBackgroundColor} = this.props;

        if (tabs.length == 4) {
            tabs.splice(-1, 1);
        }

        let tabsBar = tabs.map((tab, page) => {
            let reqImage = '';
            const isTabActive = activeTab === page;
            let backgroundColor = isTabActive ? activeBackgroundColor : inactiveBackgroundColor;

            switch (page) {
                case 0:
                    reqImage = require('../../../images/tab_profile.png');
                    break;
                case 1:
                    reqImage = require('../../../images/tab_map.png');
                    break;
                case 2:
                    reqImage = require('../../../images/tab_camera.png');
                    break;
                case 3:
                    reqImage = require('../../../images/tab_lastminute.png');
                    break;
                default :
                    reqImage = require('../../../images/nav_overlay_golf.png');
            }

            return <TouchableOpacity
                style={{flex: 1}}
                key={page}
                onPress={() => this.props.goToPage(page)}
                >
                <View style={[styles.tab, {backgroundColor: backgroundColor}, this.props.tabStyle]}>
                    <Image style={styles.tabImage} resizeMode={Image.resizeMode.contain} source={reqImage}>
                    </Image>
                </View>
            </TouchableOpacity>;
        })

        return (
            <View style={[styles.tabs, this.props.style, {backgroundColor: "#404040"}]}>
                <View style={{flex: 1}}/>
                {tabsBar}
                <View style={{flex: 1}}/>
            </View>
        );
    }
};

TabBarOptions.defaultProps = {
    activeBackgroundColor: "#666666",
    inactiveBackgroundColor: "#404040",
};

export default connect(null, null)(TabBarOptions);

