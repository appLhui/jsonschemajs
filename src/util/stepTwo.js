/**
 *
 * Created by lihui on 15-12-10.
 * 验证第二步 判断第二步 是 该属性的解释还是 长度判断
 *
 */
var _ = require('underscore');

module.exports = function (key, value, cfg) {
  var typeOf = require("./typeOf");

  var _str = key.split('\|');
  var _key;

  if (!_str[0].indexOf('*')) {
    _key = _str[0].substring(1, key.length);
  } else {
    _key = _str[0];
  }
  if (_str[1].indexOf('~') != -1) {
    if(!cfg.properties) return false;
    var _array = _str[1].split('~');
    if (_array.length != 2) { // 长度判断格式不正确
      return $.growl.warning({ message:_str[0] + '表示长度的表达式有错误－Demo：1~10'});
    }

    var _minimum = parseInt(_array[0]); // 最小值
    var _maximum = parseInt(_array[1]); // 最大值

    if(_maximum<_minimum){
      return $.growl.warning({ message:_str[0] + '最大值小于最小值'});
    }

    if (_.isNumber(_minimum) && !_.isNaN(_minimum)) {
      if(typeOf(value) == 'integer'){
        _.extend(cfg.properties[_key], {
          'minimum': _minimum
        });
      }else if(typeOf(value) == 'string'){
        _.extend(cfg.properties[_key], {
          'minLength': _minimum
        });
      }else if(typeOf(value) == 'object'){
        _.extend(cfg.properties[_key], {
          'minProperties': _minimum
        });
      }else if(typeOf(value) == 'array'){
        _.extend(cfg.properties[_key], {
          'minItems': _minimum
        });
      }
    }

    if (_.isNumber(_maximum) && !_.isNaN(_maximum)) {

      if(typeOf(value) == 'integer'){
        _.extend(cfg.properties[_key], {
          'maximum': _maximum
        });
      }else if(typeOf(value) == 'string'){
        _.extend(cfg.properties[_key], {
          'maxLength': _maximum
        });
      }else if(typeOf(value) == 'object'){
        _.extend(cfg.properties[_key], {
          'maxProperties': _maximum
        });
      }else if(typeOf(value) == 'array'){
        _.extend(cfg.properties[_key], {
          'maxItems': _maximum
        });
      }
    }
  }else if(_str[1].indexOf(',') != -1 && typeOf(value) == 'string'){  // 如果是一个字符并且是枚举方式
    if(!cfg.properties) return false;
    _.extend(cfg.properties[_key], {
      'enum': _str[1].split(',')
    });
  } else {  // 第二步表示为 该项目的description
    if(!cfg.properties) return false;
    _.extend(cfg.properties[_key], {
      'description': _str[1],
      'title': _str[1]
    });
  }
  return cfg;
}
