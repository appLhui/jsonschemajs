/**
 * Created by lihui on 16-1-19.
 */

module.exports = function(editors){
  var _moveStart = false;
  var _line = $('.line');
  var _boxLeft = $('.box-left');
  var _boxRight = $('.box-right');


  $('.drag').mousedown(function(){
    _moveStart = true;
  });

  $('.canvas').mouseup(function(){
    _moveStart = false;
  });

  $('.canvas').mousemove(function(e){
     if(!_moveStart) return;
    if(e.screenX/$('body').width()<.2 || e.screenX/$('body').width()>.8) return;
    _boxLeft.css('right',(100 - e.screenX/$('body').width()*100)+'%');
    _boxRight.css('left',(e.screenX/$('body').width()*100)+'%');
    _line.css('left',e.screenX/$('body').width()*100+'%');
    $.each(editors,function(){
      this.resize();
    })
  });

}
