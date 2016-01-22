var http = require('../http');

/**
 * 获取设计师
 * @param callback
 */
module.exports = function(id, callback) {
    http.get('/ws/vip/getVipinfoById/' + id, callback);
};
