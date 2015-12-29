/**
 * Created by lihui on 15-12-10.
 * 按schema 参数类型，进行判断
 *
 */

var _ = require('underscore');

module.exports = function(o){
  if(_.isString(o)) return 'string';
  if(_.isNumber(o)) return 'integer';
  if(_.isBoolean(o)) return 'boolean';
  if(_.isObject(o) && !_.isArray(o)) return 'object';
  if(_.isObject(o) && _.isArray(o)) return 'array';
}
