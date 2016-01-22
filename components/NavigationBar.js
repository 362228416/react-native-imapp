"use strict";

var React = require('react-native');

var {
    StyleSheet,
    Text,
    View,
    Platform
    } = React;

import Theme from './Theme.js'

let marginTop = Platform.OS === 'ios' ? 20 : 0;

module.exports = React.createClass({
    getDefaultProps() {
        return {bgColor: Theme.TopBarBgColor}
    },
    render() {
        let title = this.props.title || this.props.route.title;
        let customTitle = this.props.customTitle || <Text style={{fontWeight: '500', color: Theme.TopBarTitleColor, fontSize: 17}}>{title}</Text>
        return (
            <View>
                <View style={[{flexDirection: 'row', height: 44 + marginTop, backgroundColor: this.props.bgColor, paddingTop: marginTop}, this.props.style]}>
                    <View style={{alignItems: 'flex-start', justifyContent: 'center', flex: 1}}>
                        {this.props.left}
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {customTitle}
                    </View>
                    <View style={{alignItems: 'flex-end', flex: 1, justifyContent: 'center'}}>
                        {this.props.right}
                    </View>
                </View>
                <View style={{height: 0, backgroundColor: 'rgb(127,127,127)',}}></View>
            </View>
        )
    }
});
