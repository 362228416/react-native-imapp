'use strict';

var React = require('react-native');
var {
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    View,
    Dimensions,
    SegmentedControlIOS,
    Component,
    Navigator,
    ToastAndroid,
    WebView,
    Modal,
    ActivityIndicatorIOS,
    AlertIOS,
    } = React;

import publish from './content/publish.js'
import uploadImage from './content/uploadImage.js'
import ContentStore from './ContentStore.js'
import UserApi from './user-api.js'
import UserStore from './UserStore.js'
import Theme from './Theme.js'

require('./string-utils');
require('./date-utils');

let {NavigationBar, Occasion, Designer, Round, TabBar, TabBarItem, Mine, Branch, Exchange, Post, Login}  = require('./index');


const DesBarIOS = React.createClass({
    getDefaultProps() {
        return {selected: 0}
    },
    render() {
        return (
            <SegmentedControl
                values={['形象顾问', '15小时会所']}
                style={{width: 200}}
                onChange={e => {
                    this.props.onChange && this.props.onChange(e);
                }}
                selectedIndex={this.props.selected}/>
        )
    }
});

/**
 * 自定义的SegmentedControl，跟SegmentedControlIOS表现一致（样式，事件），支持android&ios
 */
const SegmentedControl = React.createClass({
    getDefaultProps() {
        return {selectedIndex: 0}
    },
    onPress(i) {
        this.props.onChange && this.props.onChange({nativeEvent: {selectedSegmentIndex: i}})
    },
    render() {
        let items = this.props.values.map((val, i) => {
            let bgColor = this.props.selectedIndex == i ? Theme.SegmentedBgColor : 'transparent';
            let color = this.props.selectedIndex == i ? Theme.SegmentedActiveColor : Theme.SegmentedBgColor;
            return (
                <TouchableOpacity activeOpacity={10} key={i} style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: bgColor}} onPress={this.onPress.bind(null, i)}>
                    <Text style={{color: color, fontSize: 13}}>{val}</Text>
                </TouchableOpacity>
            )
        });
        return (
            <View style={[{flexDirection: 'row', flex: 1, borderColor: Theme.SegmentedBgColor, borderWidth: 1, borderRadius: 0, height: 26}, this.props.style]}>
                {items}
            </View>
        )
    }
});

const HomeBarIOS = React.createClass({
    getDefaultProps() {
        return {selected: 0}
    },
    render() {
        return (
            <SegmentedControl
                values={['形象圈', '礼服置换']}
                style={{width: 140}}
                onChange={e => {
                    this.props.onChange && this.props.onChange(e);
                }}
                selectedIndex={this.props.selected}/>
        )
    }
});

const App = React.createClass({
    getInitialState() {
        return {selected: 'round', showExchange: false, showBranch: false, postData: {content: '', files: []}}
    },
    renderScene: function (route, navigator) {
        var Component = route.component;
        var navBar = route.navigationBar;
        if (navBar) {
            navBar = React.addons.cloneWithProps(navBar, {
                navigator: navigator,
                route: route
            });
        }

        // 这里用的是RootView的navigator
        return (
            <View>
                {navBar}
                <Component navigator={this.props.navigator} route={route}/>
            </View>
        );
    },
    onPostEdit(data) {
        this.state.postData = data;
    },
    onPost() {

        // 输入校验
        let {content, files} = this.state.postData;
        if (content.trim().length == 0) {
            AlertIOS.alert('说说你此刻的心情吧.');
            return;
        }
        if (files.length == 0) {
            AlertIOS.alert('您的照片还没上传哦.');
            return;
        }

        let images = [], i = 0, length = files.length;
        let user = UserApi.getUser();

        let {navigator, root} = this.props;
        let me = this;

        // 真正发布
        function post() {
            publish({content: content, img: images.join(',')}, (res) => {
                if (!res.success) {
                    root.setState({loading: false});
                    AlertIOS.alert('发布失败，请重试.')
                    return;
                }

                ContentStore.addData({
                    id: res.data,
                    fromName: user.nickName,
                    content: content,
                    img: images.join(','),
                    cTime: '刚刚',
                    comment: [],
                    from: {fileName: user.fileName,},
                    momentsThumb: {like: 0, nice: 0, loginId: ''}
                });
                me.state.postData.content = '';
                me.state.postData.files = [];
                root.setState({loading: false});
                navigator.pop();
            });
        }

        // 上传图片，一张一张的上传，上传完成之后发布
        function upload() {
            uploadImage({base64: files[i]}, (res) => {
                i++;
                images.push(res.data);
                if (i < length) {
                    upload();
                } else {
                    post();
                }
            });
        }

        // 关闭loading窗口
        this.props.root.setState({loading: true});
        upload();

    },
    render() {

        let desBranch = this.state.showBranch ? Branch : Designer;
        let roundExchange = this.state.showExchange ? Exchange : Round;

        let user = UserStore.getData();

        return (
            <TabBar>
                <TabBarItem
                    title="形象圈"
                    icon="&#xe613;"
                    selected={this.state.selected === 'round'}
                    onPress={() => this.setState({selected: 'round'})}>
                    <Navigator
                        key={"round" + this.state.showExchange}
                        renderScene={this.renderScene}
                        initialRoute={{
                        component: roundExchange,
                        navigationBar: <NavigationBar
                            right={<View style={{marginRight: 10}}><Text style={{fontSize: 22, fontWeight: 'bold', fontFamily: 'iconfont', color: Theme.TopBarBtnColor}}>&#xe62a;</Text></View>}
                            customTitle={<HomeBarIOS
                                style={{}}
                                selected={this.state.showExchange ? 1 : 0}
                                onChange={e => {
                                    this.setState({showExchange: e.nativeEvent.selectedSegmentIndex == 1});
                                }}
                            />}
                        />
                    }}/>
                </TabBarItem>
                <TabBarItem
                    title="场合服饰"
                    icon="&#xe61f;"
                    selected={this.state.selected === 'occ'}
                    onPress={() => this.setState({selected: 'occ'})}>
                    <Navigator
                        key="occ"
                        renderScene={this.renderScene}
                        initialRoute={{
                        component: Occasion,
                        navigationBar: <NavigationBar
                            title="场合服饰"
                        />
                    }}/>
                </TabBarItem>
                <TabBarItem
                    iconSize={43}
                    icon="&#xe601;"
                    color="rgb(0,171,250)"
                    onPress={() => this.props.navigator.push({
                        component: Post,
                        passProps: {onPostEdit: this.onPostEdit, content: this.state.postData.content, files: this.state.postData.files},
                        navigationBar: <NavigationBar
                            style={{backgroundColor: Theme.TopBarBgColor, margin: 0, padding: 0}}
                            title="发布形象"
                            left={
                                <TouchableOpacity onPress={() => this.props.navigator.pop()}>
                                    <View style={{flexDirection: 'row', paddingLeft: 10, alignItems: 'center'}}>
                                        <Text style={{color: Theme.TopBarBtnColor, fontWeight: '500', fontSize: 17}}>取消</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            right={
                                <TouchableOpacity onPress={this.onPost}>
                                    <View style={{flexDirection: 'row', paddingRight: 10, alignItems: 'center'}}>
                                        <Text style={{color: Theme.TopBarBtnColor, fontWeight: '500', fontSize: 17}}>发布</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            />

                    })}
                    />
                <TabBarItem
                    title="形象服务"
                    icon="&#xe622;"
                    selected={this.state.selected === 'designer'}
                    onPress={() => this.setState({selected: 'designer'})}>
                    <Navigator
                        key={"designer" + this.state.showBranch}
                        renderScene={this.renderScene}
                        initialRoute={{
                        component: desBranch,
                        navigationBar: <NavigationBar
                            customTitle={<DesBarIOS
                                selected={this.state.showBranch ? 1 : 0}
                                onChange={e => {
                                    this.setState({showBranch: e.nativeEvent.selectedSegmentIndex == 1});
                                }}
                            />}
                        />
                    }}/>
                </TabBarItem>
                <TabBarItem
                    title="我的"
                    icon="&#xe60c;"
                    selected={this.state.selected === 'mine'}
                    onPress={() => this.setState({selected: 'mine'})}>
                    <Navigator
                        key="mine"
                        renderScene={this.renderScene}
                        initialRoute={{
                        component: Mine,
                        navigationBar: <NavigationBar
                            title="我的"
                        />
                    }}/>
                </TabBarItem>
            </TabBar>
        )
    }
})

const RootView = React.createClass({
    getInitialState() {
        return {loading: false, isLogin: true, loaded: false}
    },
    checkLogin() {
        this.setState({isLogin: UserStore.getData() != null});
    },
    componentWillMount() {
        UserStore.addListener('root' , this.checkLogin);
        this.checkLogin();
        UserStore.checkLogin(user => {
            this.setState({isLogin: user != null, loaded: true});
        })
    },
    componentWillUnmount() {
        UserStore.removeListener('root');
    },
    renderScene: function (route, navigator) {
        var Component = route.component;
        var navBar = route.navigationBar;
        if (navBar) {
            navBar = React.addons.cloneWithProps(navBar, {
                navigator: navigator,
                route: route
            });
        }
        return (
            <View style={{flex: 1}}>
                {navBar}
                <Component navigator={navigator} route={route} root={this}/>
            </View>
        );
    },
    render() {
        return this.state.loaded ? (
            this.state.isLogin ? (
                <View style={{flex: 1}}>
                    <Navigator
                        renderScene={this.renderScene}
                        initialRoute={{component: App}}
                        />
                    <Modal transparent={true} visible={this.state.loading} animated={true}>
                        <View style={[{justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,.2)'}]}>
                            <ActivityIndicatorIOS
                                animating={true}
                                color="rgb(255,255,255)"
                                style={[{height: 100, width: 100, backgroundColor: 'rgba(0,0,0,.5)'}]}
                                size="large"/>
                        </View>
                    </Modal>
                </View>
            ) : <Login root={this}/>
        ) : null;
    }
})

module.exports = RootView;
