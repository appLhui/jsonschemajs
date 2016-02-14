/**
 * Created by lihui on 16-2-14.
 */


chrome.contextMenus.create({
  type: 'normal',
  title: 'JsonSchema工具',
  id: 'jsonschemajs',
  onclick: function(){
    window.open('index.html', '_blank');
  }
});


chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == "install"){
    chrome.tabs.create({url: "index.html"});
  }
});