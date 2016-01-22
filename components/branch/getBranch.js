var http = require('../http');

/**
 * 获取门店
 * @param callback
 */
module.exports = function(params, callback) {
    http.get('/ws/vip/getBranch/', params, callback);
};
