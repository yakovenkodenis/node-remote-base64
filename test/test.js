'use strict';

var expect = require('chai').expect;
var remoteBase64 = require('../index');


describe('#remoteBase64', function() {
    it('should exist', function() {
        expect(remoteBase64).to.exist;
    });

    it('should be ok', function() {
        expect(remoteBase64).to.be.ok;
    })
});
