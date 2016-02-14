/**
 * Created by lihui on 15-12-21.
 *
 * 将jsonschma 反转译会 新的语法
 *
 */

var _ = require('underscore');


var rander = function (obj, reObj) {
  if (!reObj) reObj = {};
  if (obj.type == 'object') {
    _.each(obj.properties, function (value, key) {
      var _range = '|';
      var _key = '';
      if(value.type == 'string'){
        if(value.enum){
          _range += value.enum.join(',');
        }else{
          if(value.minLength > value.maxLength) return $.growl.warning({ message:key + '[minLength] 属性大于[maxLength]'});
          if(value.minLength) _range += value.minLength + '~';
          if(value.maxLength) _range += '~' + value.maxLength;
        }
      }
      if(value.type == 'integer'){
        if(value.minimum > value.maximum) return $.growl.warning({ message:key + '[minimum] 属性大于[maximum]'});
        if(value.minimum) _range += value.minimum + '~';
        if(value.maximum) _range += '~' + value.maximum;
      }
      if(value.type == 'array'){
        if(value.minItems > value.maxItems) return $.growl.warning({ message:key + '[minItems] 属性大于[maxItems]'});
        if(value.minItems) _range += value.minItems + '~';
        if(value.maxItems) _range += '~' + value.maxItems;
      }
      if(value.type == 'object'){
        if(value.minProperties > value.maxProperties) return $.growl.warning({ message:key + '[minProperties] 属性大于[maxProperties]'});
        if(value.minProperties) _range += value.minProperties + '~';
        if(value.maxProperties) _range += '~' + value.maxProperties;
      }

      if(_range=='|') _range = '';
      if (_.indexOf(obj.required, key) != -1) {   //该属性为必填项
         _key += '*';
      }
      _key += key + _range.replace('~~','~') + '|' + (value.title || value.description || '--');

      if(value.type == 'array'){
        reObj[_key] = [];
        reObj[_key][0] = rander(value.items,reObj[_key][0]);
      }else if(value.type == 'object'){
        reObj[_key] = rander(value,reObj[_key]);
      }else{
        if(value.default){
          reObj[_key] = value.default;
        }else if(value.type == 'string'){
          reObj[_key] = 'hello word';
        }else if(value.type == 'integer'){
          reObj[_key] = 0;
        }else if(value.type == 'boolean'){
          reObj[_key] = true;
        }
      }
    });
  }
  return reObj;
}

module.exports = rander;