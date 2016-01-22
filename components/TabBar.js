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
        bgColor: PropTypes.string,
    },
    getDefaultProps() {
        return {bgColor: 'rgb(249,249,249)'}
    },
    loaded: [],
    render() {
        //let selectedView = null;
        let items = [];
        this.props.children.map((view, i) => {
            if (view.props.selected) {
                //selectedView = view.props.children;
                this.loaded[i] = true;
                items.push(<View key={i} style={{flex: 1}}>{view.props.children}</View>)
            } else if (this.loaded[i]){
                items.push(<View key={i} style={{width: 0, height: 0}}>{view.props.children}</View>)
            }
        });
        let tabBarStyle = {flexDirection: 'row', height: 48, bottom: 0, backgroundColor: this.props.bgColor, borderTopWidth: 1, borderTopColor: 'rgb(241,241,241)'};

        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    {items}
                </View>
                <View style={tabBarStyle}>
                    {this.props.children}
                </View>
            </View>
        )
    }
})
