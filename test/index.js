var sinon = require('sinon');
var assert = require('assert');
var proxyquire = require('proxyquire');
describe('index', function () {
  it('watch', function () {
    var message = proxyquire('../index', {
      'nsqjs': {
        Reader: function () {
          this.connect = sinon.spy();
          this.on = sinon.spy();
        }
      }
    })();
    message.watch('test', 'test', function () {});
  });

  it('publish', function () {
    var publish = sinon.spy();
    var close = sinon.spy();
    var message = proxyquire('../index', {
      './publisher': function () {
        return {
          writer: {
            ready: true
          },
          publish: publish,
          close: close
        };
      }
    })();
    message.publish('test', 'test', function () {});
    assert(publish.calledOnce);

    message.close();
    assert(close.calledOnce);
  });

});

