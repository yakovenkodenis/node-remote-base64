'use strict';

var url = require('url');


var adapterFor = (function() {
    var adapters = {
        'http:': require('http'),
        'https:': require('https')
    };

    return function(inputUrl) {
        return adapters[url.parse(inputUrl).protocol];
    };
}());


/**
 * Fetches the data from provided url
 * and returns a Promise that will contain
 * base64 encoded data from the url.
 * @param {string} inputUrl
 * @return {Promise}
 */
function remoteBase64(inputUrl) {
    return new Promise(function(resolve, reject) {
        var adapter = adapterFor(inputUrl);
        var options = url.parse(inputUrl);

        adapter.get(options, function(res) {
            var data = '';

            res.on('data', function(chunk) {
                data += chunk;
            });

            res.on('end', function() {
                resolve(new Buffer(data).toString('base64'));
            });
        }).on('error', function(error) {
            reject(error);
        });
    });
};

module.exports = remoteBase64;
