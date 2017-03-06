/**
 * Created by lihui on 15-12-10.
 */


var _ = require('underscore');
var step1 = require('./util/stepOne');
var step2 = require('./util/stepTwo');
var step3 = require('./util/stepThree');

var analyzeString = function (key, value, cfg, all) {
  var _array = key.split('\|');

  switch (_array.length) {
    case 1:
      key += '|'+key;
      return step2(key, value, step1(key, value, cfg, all));
    case 2:
      return step2(key, value, step1(key, value, cfg, all));
    case 3:
      return step3(key, value, step2(key, value, step1(key, value, cfg, all)));
    default:
      return $.growl.warning({message: '参数只支持1～3位'});
  }
}


module.exports = function (obj, all) {
  var schemaObj;
  _.each(obj, function (value, key) {
    schemaObj = analyzeString(key, value, schemaObj, all);
  });

  return schemaObj;
}

