
'use strict';

import { StyleSheet, Dimensions } from "react-native";

var devWid = Dimensions.get('window').width;
var devHei = Dimensions.get('window').height;

module.exports = StyleSheet.create({
    textTitle: {
        flex: 1,
        color: '#fff',
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textDescription: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    text: {
        fontWeight: 'bold',
        color: '#fff',
    },
    container: {
        width: devWid,
        height: (devHei/2.5),
        flex: 1,
    },
    modalContainer: {
        width: null,
        height: (devHei/2.5),
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    button: {
        flex: 1,
        width: null
    },
    mapContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});
