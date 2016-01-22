var http = require('../http');

/**
 * 获取所有门店
 * @param callback
 */
module.exports = function(callback) {
    var params = {};
    params['param[lat]'] = '0';
    params['param[lng]'] = '0';
    http.get('/ws/vip/getAllBranch', params, data => {
        callback && callback(data);
    });
};