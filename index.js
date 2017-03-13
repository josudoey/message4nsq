var nsq = require('nsqjs');
module.exports = function (opts) {
  opts = opts || {
    nsqdTCPAddresses: 'localhost:4150'
  };
  var tcpAddress = opts.nsqdTCPAddresses;
  if (Array.isArray(tcpAddress)) {
    tcpAddress = tcpAddress[0];
  }
  var hostIP = tcpAddress.split(':');
  var publisher = require('./publisher')(hostIP[0], hostIP[1]);
  var publish = (opts.promisify) ? opts.promisify(publisher.publish) : publisher.publish;
  return {
    watch: function (topic, channel, fn) {
      var reader = new nsq.Reader(topic, channel, opts);
      reader.connect();
      if (fn) {
        reader.on('message', fn);
      }
      return reader;
    },
    publish: publish,
    close: function () {
      if (publisher.writer.ready) {
        publisher.close();
      }
    }
  };
};

