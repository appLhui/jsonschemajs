window.$ = window.jQuery = require('jquery');
window.JSONEditor = require('jsoneditor');

require('bootstrap-webpack');

require('./src/css/jsoneditor.less');
require('./src/css/jquery.growl.css');
require('./src/plug-in/jquery.growl.js');


var encode = require('./src/encodeJsonschma');
var decode = require('./src/decodeJsonschma');



$( document ).ready(function() {
  // 新的jsonschma语法

  var newCodeSourceEditor = new JSONEditor(document.getElementById("newCodeSourceEditor"), {"mode": "code"});
  var jsonschmaEditor = new JSONEditor(document.getElementById("jsonschmaEditor"), {"mode": "code"});

  var json = {
    '*name|1~10|我是名字': '刘备',
    'enum|张飞,关羽|我是枚举':'张飞',
    '*age|10~|我是年龄': 12,
    '*sex|性别': true,
    '*identity|2~2|身份': {
      '*level|级别': 1,
      '*title|1~100|称号': '将军'
    },
    '*subordinates|~12': [{
      '*name|1~': "关羽",
      "*age|~10": 15,
      "identity|身份": {
        "level|级别": 2,
        '*title|1~100|称号': '上士'
      }
    }]
  };

  newCodeSourceEditor.set(json);

  $('.encode').click(function(){
    jsonschmaEditor.set(encode(newCodeSourceEditor.get(),!!$(this).attr('all')));
  });


  $('.decode').click(function(){
    newCodeSourceEditor.set(decode(jsonschmaEditor.get(),!!$(this).attr('all')));
  });

  require('./src/drop')([jsonschmaEditor,newCodeSourceEditor]);

});

