"use strict";

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ToastAndroid,
    ListView
    } = React;

module.exports = React.createClass({
    render: function () {
        return (
            <Image source={{uri: 'http://img5q.duitang.com/uploads/item/201211/14/20121114172343_Q5GGP.thumb.700_0.jpeg'}} style={{height: 550, backgroundColor: 'transparent', marginTop: 0}}>
            </Image>
        );
    },
})

