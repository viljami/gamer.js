define(function(){
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x){
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
        || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (! window.requestAnimationFrame){
    var currTime, timeToCall, id, fn,
      passTime = function(){ fn(currTime + timeToCall); };

    window.requestAnimationFrame = function(callback){
      fn = callback;
      currTime = Date.now();
      timeToCall = Math.max(0, 16 - (currTime - lastTime));
      id = window.setTimeout(passTime, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (! window.cancelAnimationFrame){
    window.cancelAnimationFrame = function(id){
      clearTimeout(id);
    };
  }

  return window.requestAnimationFrame;
});
