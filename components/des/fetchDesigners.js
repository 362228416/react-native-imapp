var http = require('../http');
import {hasMore} from '../page-utils.js'

/**
 * 获取设计师列表
 * @param callback
 */
module.exports = function(params, callback) {
    params['param[lat]'] = '';
    params['param[lng]'] = '';
    http.get('/ws/vip/getAllVipinfo', params, data => {
        data.page.hasMore = hasMore(data.page);
        callback && callback(data);
    });
};
