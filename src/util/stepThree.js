/**
 * Created by lihui on 15-12-10.
 * 第三步 为该属性的解释
 *
 */
var _ = require('underscore');

module.exports = function (key, value, cfg) {
  var _str = key.split('\|');
  var _key;
  if (!_str[0].indexOf('*')) {
    _key = _str[0].substring(1, key.length);
  } else {
    _key = _str[0];
  }
  if(!cfg) return cfg;
  if(!cfg.properties) return false;
  _.extend(cfg.properties[_key], {
    //'description': _str[2],
    'title': _str[2]
  });
  return cfg;
}