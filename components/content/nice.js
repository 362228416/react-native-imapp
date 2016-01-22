var http = require('../http');

/**
 * 点赞
 * @param content
 * @param callback
 */
module.exports = function(content, callback) {
    http.post('/ws/content/nice', content, callback);
};