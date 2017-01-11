
'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#453F41'
    },
    shadow: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: 'transparent'
    },
    bg: {
        flex: 1,
        marginTop: deviceHeight/2.4,
        backgroundColor: '#453F41',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 30,
        bottom: 0,
    },
    input: {
        marginBottom: 20
    },
    btn: {
        marginTop: 20,
        alignSelf: 'center'
    },
    dialogContentText: {
        flex: 80,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dialogContentView: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 5
    },
    dialogContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: deviceWidth,
        height: deviceHeight
    },
    dialogLeftButton: {
        flex: 1,
        width: null,
        backgroundColor: '#ffffff',
        borderColor: '#999999',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderLeftWidth: 0,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 0,
    },
    dialogRightButton: {
        flex: 1,
        width: null,
        backgroundColor: '#ffffff',
        borderColor: '#999999',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderLeftWidth: 0,
        borderTopWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    }
});
