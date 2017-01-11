'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions } = React;

module.exports =  StyleSheet.create({
    tab: {
        flex: 1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center'
    },
    tabs: {
        height: 30,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    tabImage: {
        flex: 1,
        width: 30,
        height: 15
    },
});