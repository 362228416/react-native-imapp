var http = require('../http');
import {hasMore} from '../page-utils.js'

/**
 * 获取形象圈列表
 * @param callback
 */
module.exports = function(params, callback) {
    http.get('/ws/content/getFriendsContent', params, data => {
        data.page.hasMore = hasMore(data.page);
        callback && callback(data);
    });
};