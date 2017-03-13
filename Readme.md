# message4nsq

[![NPM](https://nodei.co/npm/message4nsq.svg?downloads=true&downloadRank=true)](https://nodei.co/npm/message4nsq/)
[![Build Status](https://travis-ci.org/josudoey/message4nsq.svg?branch=master)](https://travis-ci.org/josudoey/message4nsq)
[![Test Coverage](https://codeclimate.com/github/josudoey/message4nsq/badges/coverage.svg)](https://codeclimate.com/github/josudoey/message4nsq/coverage)
[![Code Climate](https://codeclimate.com/github/josudoey/message4nsq/badges/gpa.svg)](https://codeclimate.com/github/josudoey/message4nsq)
[![Issue Count](https://codeclimate.com/github/josudoey/message4nsq/badges/issue_count.svg)](https://codeclimate.com/github/josudoey/message4nsq)

## Installation

```bash
$ npm install --save message4nsq
```

## Example

```js
var message = require('message4nsq')({
  'nsqdTCPAddresses': 'localhost:4150'
});
var topic = 'devTopic';
var channel = 'devChannel';
var msg = {
  foo: 'bar'
};

message.publish(topic, msg, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('message sent.');
  message.close();
});
```
