/**
 * Created by lihui on 15-12-10.
 */


var _ = require('underscore');
var step1 = require('./util/stepOne');
var step2 = require('./util/stepTwo');
var step3 = require('./util/stepThree');

var analyzeString = function (key, value, cfg) {
  var _array = key.split('\|');

  switch (_array.length) {
    case 1:

    case 2:
      return step2(key, value, step1(key, value, cfg));
    case 3:
      return step3(key, value, step2(key, value, step1(key, value, cfg)));
    default:
      return console.warn('参数只支持1～3位');
  }
}



module.exports = function (obj) {
  var schemaObj;

  _.each(obj, function (value, key) {
    schemaObj = analyzeString(key, value, schemaObj);
  });

  return schemaObj;
}

