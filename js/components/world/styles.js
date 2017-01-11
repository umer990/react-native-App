
'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
    row: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        flex: 1,
        borderRadius: 5,
        //fontSize: 20,
        //color: "#ffffff",
        backgroundColor: "#A9A9A9",
        alignItems: 'center'
    },
    button: {
        flex: 1,
        width: null,
        backgroundColor: '#808080',
        borderRadius : 5,
        borderColor: '#ffffff',
        borderWidth: 1
    },
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    footer: {
        position: 'absolute',
        flex:0.1,
        left: 0,
        right: 0,
        bottom: -10,
        backgroundColor:'green',
        flexDirection:'row',
        height:80,
        alignItems:'center',
    },
    hiddenFilter: {
        flex:1,
        position: "absolute",
        width: 0,
        height: 0,
    },
    showFilter: {
        flex:1,
        position: "absolute",
        zIndex: 9999,
        //flexDirection: 'row',
        //justifyContent:'flex-end',
        //alignItems:'flex-end',

    },
    hiddenMenu: {
        position: "absolute",
        width: 0,
        height: 0,
        backgroundColor: "#ffffff"
    },
    showMenu: {
        flex:1,
        width: 70,
        height: 50,
        position: "absolute",
        backgroundColor:'#000000',
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        zIndex: 9999,
    },
    hiddenFilterLabel: {
        flex:1,
        position: "absolute",
        width: 0,
        height: 0,
    },
    showFilterLabel: {
        flex:15,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },
    picker: {
        width: 50,
        height: null,
    },
    pickerItem: {
        fontSize:15,
        color:'#ffffff',
        width: 155,
        height: 90,
        backgroundColor: "#A9A9A9",
        borderRadius: 5,
    },
    alignRight: {
        flex: 1,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    filterContainer: {
        flex:1,
        width: 200,
        height: 250,
        backgroundColor:'#ffffff',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 5,
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    }
});
