"use strict";

var React = require('react-native');
var {
    Component,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ToastAndroid,
    ListView
    } = React;

import UserApi from './user-api.js'
import UserStore from './UserStore.js'

var {width, height} = Dimensions.get('window');
var contentHeight = height - 110;

const Item = React.createClass({
    render() {
        let {icon, text, noRright, style} = this.props;
        return (
            <TouchableOpacity style={style}>
                <View style={{paddingLeft: 9, paddingRight: 9 }}>
                    <View style={{flexDirection: 'row', paddingTop: 12, paddingBottom: 12}}>
                        <Text style={{fontFamily: 'iconfont', color: '#737373', fontSize: 18}}>{icon}</Text>
                        <Text style={{marginLeft: 3, color: 'rgb(39,39,39)', fontSize: 17}}>{text}</Text>
                        {noRright ||
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Text
                                style={{fontFamily: 'iconfont', color: 'rgb(195,194,200)', fontSize: 16}}>&#xe604;</Text>
                        </View>
                        }
                    </View>
                    <View style={{height: 1, backgroundColor: 'rgb(247,247,247)'}}></View>
                </View>
            </TouchableOpacity>
        )
    }
})

module.exports = React.createClass({

    render() {
        return (
            <ScrollView
                style={{height: contentHeight, backgroundColor: 'rgb(239,239,244)'}}>
                <Image source={{uri: 'http://img5q.duitang.com/uploads/item/201211/14/20121114172343_Q5GGP.thumb.700_0.jpeg'}} style={{height: 550, backgroundColor: 'transparent', marginTop: 0}}>
                </Image>
                <View style={{marginTop: 15, backgroundColor: 'rgb(255,255,255)'}}>
                    <Item text="我的消息" icon="&#xe60f;"/>
                    <Item url="#/mine/my-profile" text="形象档案" icon="&#xe624;"/>
                    <Item url="#/mine/my-rounds" text="我的相册" icon="&#xe627;"/>
                    <Item url="#/mine/my-exchanges" text="礼服置换" icon="&#xe636;"/>
                </View>
                <View style={{marginTop: 15, marginBottom: 15, backgroundColor: 'rgb(255,255,255)'}}>
                    <TouchableOpacity onPress={() => UserStore.setData(null)}>
                        <View style={{paddingLeft: 9, paddingRight: 9 }}>
                            <View style={{alignItems: 'center', paddingTop: 12, paddingBottom: 12}}>
                                <Text style={{color: 'rgb(39,39,39)', fontSize: 17}}>退出登录</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
})
