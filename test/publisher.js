var sinon = require('sinon');
var assert = require('assert');
var proxyquire = require('proxyquire');
var merge = require('merge');
describe('publisher', function () {
  it('init', function () {
    var fake = {
      ready: true,
      connect: sinon.spy(),
      on: sinon.spy(),
      publish: sinon.spy()
    };
    var publisher = proxyquire('../publisher', {
      'nsqjs': {
        Writer: function () {
          merge(this, fake);
        }
      }
    })();

    publisher.publish();
    assert(fake.publish.calledOnce);

  });

});

