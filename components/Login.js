'use strict';

var React = require('react-native');
var {
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View,
    Dimensions,
    SegmentedControlIOS,
    Component,
    Navigator,
    TextInput,
    ToastAndroid,
    Modal,
    ActivityIndicatorIOS,
    AlertIOS,
    } = React;

import UserStore from './UserStore.js'
import UserApi from './user-api.js'

module.exports = React.createClass({
    getInitialState() {
        return {loginId: '362228416@qq.com', loginPassword: '******'}
    },
    login() {
        UserApi.login(Object.assign({}, this.state), res => {
            UserStore.setData(res.results[0])
        }, res => {
            AlertIOS.alert(res.msg)
        })
    },
    render() {

        let lastLoginUser = UserStore.getLastLoginUser();

        return (
            <ScrollView style={{flex: 1, backgroundColor: 'rgb(240,240,240)'}}>
                <View style={{height: 150, alignItems: 'center', justifyContent: 'center', paddingTop: 40}}>
                    {lastLoginUser ?
                        <View style={{borderRadius: 44, overflow: 'hidden'}}>
                            <Image source={{uri: lastLoginUser.fileName, height: 88, width: 88}}/>
                        </View>
                        :
                        <Text style={{fontSize: 88, fontFamily: 'iconfont', color: 'rgb(215,215,215)'}}>&#xe607;</Text>
                    }
                </View>
                <View style={{ paddingLeft: 45, paddingRight: 45, marginTop: 30}}>
                    <TextInput onChangeText={(content) => {
                            this.setState({loginId: content})
                                }}
                               keyboardType="phone-pad" placeholder="用户名" style={styles.input} value={this.state.loginId}/>
                    <TextInput onChangeText={(content) => {
                            this.setState({loginPassword: content})
                        }}
                               placeholder="密码" style={[styles.input, {marginTop: 10}]} value={this.state.loginPassword} secureTextEntry={true}/>
                    <View style={{height: 20, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                        <TouchableOpacity>
                            <Text style={{fontSize: 13}}>忘记密码?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 54, justifyContent: 'flex-end', alignItems: 'center'}}>
                        <TouchableOpacity onPress={this.login} style={{backgroundColor: 'rgb(127,127,127)', width: 100, height: 38, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 20, color: 'rgb(255,255,255)'}}>登录</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
})

var styles = StyleSheet.create({
    input: {
        height: 44,
        fontSize: 15,
        borderRadius: 4,
        paddingLeft: 12,
        backgroundColor: 'rgb(255,255,255)',
    }
});
