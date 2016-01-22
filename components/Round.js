"use strict";

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    TextInput,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ToastAndroid,
    ListView
    } = React;

import NavigationBar from './NavigationBar'
import Theme from './Theme.js'

import nice from './content/nice.js'
import fetchFriendsContents from './des/fetchFriendsContents.js'
import DesignerDetail from './DesignerDetail.js'
import UserApi from './user-api.js'

import {format} from './string-utils'

import ContentStore from './ContentStore.js'

var {width, height} = Dimensions.get('window');
var contentHeight = height - 110;

const Nice = React.createClass({
    getInitialState() {
        return {like: this.props.like}
    },
    nice() {
        this.props.nice && this.props.nice()
    },
    render() {
        return (
            <Text ref="like" onPress={this.nice} style={{color: (this.state.like == 1 ? '#ee9852' : '#9a9a9a'), fontSize: 15, fontFamily: 'iconfont', marginRight: 10}}>&#xe605;</Text>
        )
    }
})

const LikePeople = React.createClass({
    getInitialState() {
        return {loginId: this.props.loginId}
    },
    render() {
        return this.state.loginId ? (
            <View style={{paddingTop: 12, paddingLeft: 67, flexDirection: 'row'}}>
                <Text ref="niceLoginId" style={{fontSize: 13, color: 'rgb(115,115,115)', fontFamily: 'iconfont', width: width - 90}}>&#xe628;{this.state.loginId}</Text>
            </View>
        ) : null;
    }
})

const Row = React.createClass({
    getInitialState() {
        return {like: this.props.row.momentsThumb.like, niceLoginId: this.props.row.momentsThumb.loginId}
    },
    nice() {
        let {row, nice} = this.props;
        nice && nice(row);
        this.refs.nice.setState({like: row.momentsThumb.like});
        this.refs.likePeople.setState({loginId: row.momentsThumb.loginId});
    },
    render() {
        let {row, i, imageItems, commentItems, onCommentClick} = this.props;
        return (
            <View key={row.id} style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, padding: 12, backgroundColor: 'rgb(255,255,255)', }}>
                    <View style={{margin: 0, flexDirection: 'row'}}>
                        <Image source={{uri: row.from.fileName, height: 50, width: 50}} style={{resizeMode: Image.resizeMode.stretch, borderRadius: 25}}/>
                        <View style={{marginLeft: 16, alignItems: 'flex-start'}}>
                            <Text style={{color: '#9a9a9a', fontWeight: '400', fontSize: 15, marginBottom: 10}}>{row.fromName || row.from.loginId}</Text>
                            <Text style={{fontSize: 13, color: '#9a9a9a', width: width - 90}}>{format(row.content)}</Text>
                        </View>
                    </View>
                    <View style={{paddingLeft: 67, marginTop: 12}}>
                        {imageItems}
                    </View>
                    <View style={{paddingTop: 12, paddingLeft: 67, flexDirection: 'row'}}>
                        <View style={{alignItems: 'flex-start', flex: 1}}>
                            <Text style={{color: '#9a9a9a'}}>{row.cTime}</Text>
                        </View>
                        <View style={{alignItems: 'flex-end', flex: 1}}>
                            <View style={{flexDirection: 'row', flex: 1}}>
                                <Nice ref="nice" like={row.momentsThumb.like} nice={this.nice}/>
                                <TouchableOpacity onPress={onCommentClick.bind(null, row)}>
                                    <Text style={{color: '#9a9a9a', fontSize: 15, fontFamily: 'iconfont'}}>&#xe60f;</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <LikePeople ref="likePeople" loginId={row.momentsThumb.loginId}/>
                    {commentItems.length > 0 &&
                    <View
                        style={{marginTop: 12, marginLeft: 67, paddingLeft: 5, paddingBottom: 10, justifyContent: 'flex-start', backgroundColor: '#f3f3f3'}}>
                        {commentItems}
                    </View>
                    }
                </View>
            </View>
        )
    }
})

module.exports = React.createClass({
    getInitialState: function () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            pull: false,
            showPost: false,
            hasMore: false,
            only: this.props.only ? this.props.only : false,
            loading: true,
            dataSource: ds.cloneWithRows([]),
        };
    },
    loadData() {
        let data = ContentStore.getData();
        var dataSource = this.state.dataSource.cloneWithRows(data.list);
        this.setState({hasMore: data.hasMore, dataSource: dataSource});
    },
    loadMore() {
        ContentStore.loadMore();
    },
    componentWillMount() {
        ContentStore.addListener('round', this.loadData);
        this.loadData();
    },
    onCommentClick(row) {
        this.setState({showPost: true, currentRow: row});
    },
    onCommentCancel() {
        this.setState({showPost: false});
    },
    onCommentPost() {
        this.setState({showPost: false});
    },
    componentWillUnmount() {
        ContentStore.removeListener('round');
    },
    render: function () {
        return (
            <View>
                <ListView
                    onEndReachedThreshold={0}
                    onEndReached={() => {this.state.hasMore && this.loadMore()}}
                    style={{backgroundColor: 'rgb(240,240,240)', height: contentHeight}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSeparator={this.renderSeparator}
                    renderHeader={this.renderHeader}
                    //onScroll={e => {
                    //    console.log(e.nativeEvent.contentOffset.y);
                    //    //console.log(e.isDefaultPrevented());
                    //    //console.log(e.isPropagationStopped());
                    //    //endRefreshing()
                    //}}
                    //onScrollAnimationEnd={() => {
                    //console.log('eee');
                    //}}
                    />
                <Modal transparent={true} visible={this.state.showPost} animated={true}>
                    <View style={[{flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,.2)', paddingTop: 50, }]}>
                        <View style={{borderRadius: 3, overflow: 'hidden'}}>
                            <View style={{flexDirection: 'row', backgroundColor: 'rgb(255,255,255)', height: 32, width: width - 64, padding: 6}}>
                                <TouchableOpacity style={{flex: 1}} onPress={this.onCommentCancel}>
                                    <Text style={{color: Theme.TopBarBtnColor, }}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex: 1}} onPress={this.onCommentPost}>
                                    <Text style={{color: Theme.TopBarBtnColor, flex: 1, textAlign: 'right'}}>发布</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{padding: 8, paddingTop: 0, backgroundColor: 'rgb(255,255,255)'}}>
                                <TextInput
                                    placeholder="晒晒自己的形象吧！"
                                    multiline={true}
                                    style={{height: 96, fontSize: 15, width: width - 80}}
                                    onChangeText={(content) => {
                                        this.setState({content: content})
                                    }}
                                    value={this.state.content}
                                    />
                                <Text style={{fontFamily: 'iconfont', color: '#737373', fontSize: 23, marginTop: -28, marginLeft: 3, position: 'absolute', backgroundColor: 'transparent'}}>&#xe61a;</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    },
    renderSeparator(r,i) {
        return (
            <View key={'s' + i} style={{height: 1, backgroundColor: '#ccc'}}></View>
        )
    },
    renderHeader() {
        return this.state.pull ? (
            <View style={{alignItems: 'center', height: 40, justifyContent: 'center'}}>
                <Text style={{color: '9a9a9a'}}>快放开，我要刷新了</Text>
            </View>
        ) : null;
    },
    renderImages(images) {
        let imageWidth = 64;
        var length = images.length;
        if (length == 1) {
            imageWidth *= 3;
        } else if (length == 2 || length == 4) {
            imageWidth *= 2;
        }
        var imageItems = [];
        images.map((image, i) => {
            imageItems.push(
                <Image key={i} source={{uri: image + '@1e_1c_0o_1l_2700h_270w_100q', width: imageWidth, height: imageWidth}} style={{marginRight: 2, marginBottom: 2}}/>
            )
        });
        if (length == 4) {
            return [<View key={0} style={{flexDirection: 'row'}}>{imageItems.slice(0,2)}</View>,
                <View key={1} style={{flexDirection: 'row'}}>{imageItems.slice(2)}</View>]
        } else if (length == 5 || length == 6) {
            return [<View key={0} style={{flexDirection: 'row'}}>{imageItems.slice(0,3)}</View>,
                <View key={1} style={{flexDirection: 'row'}}>{imageItems.slice(3)}</View>]
        } else if (length == 7 || length == 8 || length == 9) {
            return [<View key={0} style={{flexDirection: 'row'}}>{imageItems.slice(0,3)}</View>,
                <View key={1} style={{flexDirection: 'row'}}>{imageItems.slice(3, 6)}</View>,
                <View key={2} style={{flexDirection: 'row'}}>{imageItems.slice(6)}</View>]
        }
        return <View style={{flexDirection: 'row'}}>{imageItems}</View>;
    },
    renderComment(comment, i) {
        if (!comment.from) {
            return null;
        }
        let memName = comment.from.memName.trim();
        let cwidth = width - (memName.length * 6) - 85;
        return (
            <View key={i} style={{ marginBottom: 2, alignItems: 'flex-start'}}>
                <Text style={{marginRight: 2, fontSize: 13, lineHeight: 25, width: cwidth}}>{memName + ': ' + comment.content}</Text>
            </View>
        )
    },
    renderRow: function (row, r, i) {

        let images = row.img ? row.img.split(',') : [];
        let imageItems = this.renderImages(images);
        let commentItems = null;
        if (row.comment) {
            commentItems = row.comment.map(this.renderComment)
        }

        return <Row row={row} like={row.momentsThumb.like} i={i} nice={this.nice} onCommentClick={this.onCommentClick} commentItems={commentItems} imageItems={imageItems}/>
    },
    nice(row) {

        var user = UserApi.getUser();
        var content = {contentId: row.id, thumbId: user.id, status: row.momentsThumb.like};
        nice(content);

        // 点赞，或者取消之后更新点赞数量、点赞人
        var loginId = user.nickName || user.memName;
        row.momentsThumb.like = content.status == 0 ? 1 : 0;
        row.momentsThumb.nice += content.status == 0 ? 1 : -1;
        if (content.status == 0) {
            var existsLoginId = row.momentsThumb.loginId ? [row.momentsThumb.loginId] : [];
            row.momentsThumb.loginId = existsLoginId.concat(loginId).join(',')
        } else {
            var loginIds = row.momentsThumb.loginId.split(',');
            loginIds.splice(loginIds.indexOf(loginId),1);
            row.momentsThumb.loginId = loginIds.join(',');
        }
    },
})


