"use strict";

import http from './http'
import {hasMore} from './page-utils.js'

import UserStore from './UserStore.js'

/**
 * 获取当前用户
 */
exports.getUser = function() {
    let user = UserStore.getData();
    return user;
};

/**
 * 用户登录
 * @param user
 * @param success
 * @param loginFails
 */
exports.login = function(user, success, fails) {
    http.post('/ws/vip/login', user, function(data){
        if (data.success) {
            var vip = data.results[0];
            vip.brithday = new Date(vip.brithday).format('yyyy-MM-dd');
            success && success(data);
        } else {
            fails && fails(data);
        }
    });
};


/**
 * 是否登录
 */
exports.isLogin = function() {
    var token = this.getUser().token
    return token && token != 'null' && token != 'undefined';
};