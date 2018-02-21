'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = 8080;

app.get('/', function (request, response) {
    response.send(_react2.default.createElement(
        'h1',
        null,
        'Hi this is dog'
    ));
});

app.listen(PORT, function () {
    console.log('listening on port ' + PORT);
});