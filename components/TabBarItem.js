'use strict';

var React = require('react-native');
var {
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Component,
    PropTypes,
    } = React;

module.exports = React.createClass({
    propTypes: {
        title: PropTypes.string,
        color: PropTypes.string,
        onPress: PropTypes.func,
        iconSize: PropTypes.number
    },
    render() {
        let color = this.props.color || 'rgb(171,172,187)';
        if (this.props.selected) {
            color = this.props.selectedColor || 'rgb(0,183,250)';
        }
        let iconSize = this.props.iconSize || 20;

        return (
            <TouchableOpacity style={{flex: 1}} onPress={this.props.onPress} activeOpacity={1}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: color, fontFamily: 'iconfont', fontSize: iconSize}}>{this.props.icon}</Text>
                    {this.props.title ? <Text style={{color: color, fontSize: 11}}>{this.props.title}</Text> : null}
                </View>
            </TouchableOpacity>
        )
    }
})