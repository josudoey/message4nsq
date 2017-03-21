var nsq = require('nsqjs');
var merge = require('merge');
var getPublisher = require('./publisher');
module.exports = function (opts) {
  opts = opts || {
    nsqdTCPAddresses: 'localhost:4150'
  };
  var tcpAddress = opts.nsqdTCPAddresses;
  if (Array.isArray(tcpAddress)) {
    tcpAddress = tcpAddress[0];
  }
  var hostIP = tcpAddress.split(':');
  var publisher = getPublisher(hostIP[0], hostIP[1]);
  publisher.publish = (opts.promisify) ? opts.promisify(publisher.publish) : publisher.publish;
  publisher.watch = function (topic, channel, optsOrFn, fn) {
    var options = merge(true, opts);
    if (typeof optsOrFn === 'function') {
      fn = optsOrFn;
    } else if (typeof optsOrFn === 'object') {
      merge(options, optsOrFn);
    }
    var reader = new nsq.Reader(topic, channel, options);
    reader.connect();
    if (fn) {
      reader.on('message', fn);
    }
    return reader;
  };
  return publisher;
};

