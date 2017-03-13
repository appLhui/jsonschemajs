/**
 * Created by lihui on 15-12-10.
 * 检验一步 加 * 开头的 key 值为必填项
 */

var _ = require('underscore');


module.exports = function (key, value, cfg, all) {
  var typeOf = require("./typeOf");
  var rander = require('../encodeJsonschma');

  key = key.split('\|')[0];


  if (all && key.indexOf('*')) {
    key = '*' + key;
  }

  if (!cfg) {
    cfg = {
      "type": "object",
      "required": [],
      "properties": {}
    }
  }
  if (!key.indexOf('*')) { // 属性为必填项
    key = key.substring(1, key.length);
    if (!cfg.required) cfg.required = [];
    cfg.required.push(key);
  }
  if (_.isObject(value) && !_.isArray(value)) {
    cfg.properties[key] = _.extend({
      'type': typeOf(value)
    }, rander(value, all));
  } else if (_.isObject(value) && _.isArray(value)) {
    cfg.properties[key] = _.extend({
      'type': 'array'
    }, {items: rander(value[0], all)});
  } else {
    if (!cfg.properties) return false;
    cfg.properties[key] = {
      'type': typeOf(value),
      'default': value
    };
  }
  if (cfg.required && !cfg.required.length) delete cfg.required;

  return cfg;
}
