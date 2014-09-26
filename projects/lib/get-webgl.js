define([], function(){
  return function(canvas){
    var gl;

    try {
      gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}

    if (gl) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    }

    window.addEventListener('onresize', function(){
      gl.viewport(0, 0, window.innerWidth, window.innerHeight);
    });

    return gl;
  };
});
