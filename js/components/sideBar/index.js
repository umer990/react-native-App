
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content, Text, List, ListItem, Icon } from 'native-base';
import { closeDrawer } from '../../actions/drawer';
import { replaceOrPushRoute } from '../../actions/route';

import styles from "./style";

class SideBar extends Component {

    navigateTo(route) {
        this.props.closeDrawer();
        this.props.replaceOrPushRoute(route);
    }

    render(){
        return (
            <Content style={styles.sidebar} >
                <List foregroundColor={"white"}>
                    <ListItem iconLeft onPress={() => this.navigateTo('dashboard')} >
                        <Icon name="ios-laptop-outline" />
                        <Text>Dashboard</Text>
                    </ListItem>
                    <ListItem iconLeft onPress={() => this.navigateTo('settings')} >
                        <Icon name="ios-settings-outline" />
                        <Text> Settings</Text>
                    </ListItem>
                    <ListItem iconLeft onPress={() => this.navigateTo('logout')} >
                        <Icon name="ios-log-out-outline" />
                        <Text> Log Out</Text>
                    </ListItem>
                </List>
            </Content>
        );
    }
}

function bindAction(dispatch) {
    return {
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(SideBar);
