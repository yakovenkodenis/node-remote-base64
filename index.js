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
        
        // if (options.protocol === 'http:') {
        //     options.port = options.port || 80;
        //     options.agent = adapter.Agent(options);
        // } else if (options.protocol === 'https:') {
        //     options.port = options.port || 443;
        //     options.agent = new (adapter.Agent)(options);
        // }

        adapter.get(options, function(res) {
            var data = '';

            res.on('data', function(chunk) {
                data += chunk;
            });

            res.on('end', function() {
                resolve(data);
            });
        }).on('error', function(error) {
            reject(error);
        });
    });
};

module.exports = remoteBase64;
