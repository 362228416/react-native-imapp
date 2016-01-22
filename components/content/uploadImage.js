var http = require('../http');

/**
 * 上传图片
 * @param content
 */
module.exports = function(content, callback) {
    http.post('/ws/vip/upload', content, callback);
};