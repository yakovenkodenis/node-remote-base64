'use strict';

var url = require('url');
var mime = require('mime-types');


var adapterFor = (function() {
    var adapters = {
        'http:': require('http'),
        'https:': require('https')
    };

    return function(inputUrl) {
        return adapters[url.parse(inputUrl).protocol];
    };
}());

var UA = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36';


/**
 * Fetches the data from provided url
 * and returns a Promise that will contain
 * base64 encoded data from the url.
 * @param {string} inputUrl
 * @return {Promise}
 */
function remoteBase64(inputUrl) {
    return new Promise(function(resolve, reject) {
        var mimeType = mime.lookup(inputUrl) || 'application/octet-stream';
        var mimePrefix = 'data:' + mimeType + ';base64,';
        var adapter = adapterFor(inputUrl);
        var options = url.parse(inputUrl);
        
        options.method = 'GET';
        options.headers = {
            'User-Agent': UA
        };

        var request = adapter.request(options, function(res) {
            if (res.statusCode !== 200) {
                reject('HTTP status code: ' + res.statusCode);
            }

            res.setEncoding('base64');
            var data = '';

            res.on('data', function(chunk) {
                data += chunk;
            });

            res.on('end', function() {
                resolve(mimePrefix + data);
                request.end();
            });
        }).on('error', function(error) {
            reject(error);
            request.end();
        });
    });
};

module.exports = remoteBase64;
