var nsq = require('nsqjs');
module.exports = function (address, port, opts) {
  var writer = new nsq.Writer(address, port, opts);
  var q = [];
  var retryInterval = 1000;
  var nextConnectTime = 0;
  var retryHandle;
  var retry = function () {
    if (writer.ready) {
      return;
    }
    if (retryHandle) {
      return;
    }
    var now = Date.now();
    if (now > nextConnectTime) {
      retryHandle = setTimeout(function () {
        retryHandle = undefined;
        writer.connect();
      }, retryInterval);
      return;
    }
    nextConnectTime = now + retryInterval;
    writer.connect();
  };

  var flush = function () {
    for (var d = q.shift(); d; d = q.shift()) {
      writer.publish(d[0], d[1], d[2]);
    }
  };
  var publish = function (topic, msgs, cb) {
    if (!writer.ready) {
      q.push([topic, msgs, cb]);
      retry();
      return;
    }
    writer.publish(topic, msgs, cb);
  };
  var close = function () {
    if (writer.ready) {
      writer.close();
    }
  };
  writer.on('ready', function () {
    flush();
  });
  writer.on('error', retry);
  return {
    writer: writer,
    publish: publish,
    close: close
  };
};

