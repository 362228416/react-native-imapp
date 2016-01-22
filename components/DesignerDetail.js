"use strict";

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    TouchableHighlight,
    ToastAndroid,
    ListView
    } = React;

import Theme from './Theme.js'

module.exports = React.createClass({
    render: function () {
        let des = this.props.route.passProps.data;
        return (
            <View style={{backgroundColor: Theme.bgColor, flex: 1}}>
                <Text>{des.memName}</Text>
                <Image source={{uri: 'http://img5q.duitang.com/uploads/item/201211/14/20121114172343_Q5GGP.thumb.700_0.jpeg'}} style={{height: 550, backgroundColor: 'transparent', marginTop: 0}}>
                </Image>
            </View>
        );
    },


})
