/**
 * Created by lihui on 15-12-10.
 * 检验一步 加 * 开头的 key 值为必填项
 */

var _ = require('underscore');



module.exports = function (key, value, cfg) {
  var typeOf = require("./typeOf");
  var rander = require('../encodeJsonschma');

  key = key.split('\|')[0];

  if (!cfg) {
    cfg = {
      "type": "object",
      "required": [],
      "properties": {}
    }
  }
  if (!key.indexOf('*')) { // 属性为必填项
    key = key.substring(1, key.length);
    cfg.required.push(key);
  }
  if (_.isObject(value) && !_.isArray(value)) {
    cfg.properties[key] = _.extend({
      'type': typeOf(value)
    },rander(value));
  }else if(_.isObject(value) && _.isArray(value)){
    cfg.properties[key] = _.extend({
      'type': 'array'
    },{items:rander(value[0])});
  } else {
    cfg.properties[key] = {
      'type': typeOf(value),
      'default': value
    };
  }

  return cfg;
}
