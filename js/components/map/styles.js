
'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    bubble: {
        width: 190,
        height: 150,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderColor: '#3333ff',
        borderRadius: 5,
        borderWidth: 1,
    },
    customView: {
        width: 190,
        height: 150,
        flexDirection: 'row',
        justifyContent:'center',
        zIndex: 9999,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    button: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15,
        width: 30,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5,
        //paddingHorizontal: 12,
        marginHorizontal: 5,
    },
});

