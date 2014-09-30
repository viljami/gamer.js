define([
  'THREE',
  'Box2DDebugDraw',
  'Box2DHelpers'
], function(
  THREE,
  Box2DDebugDraw,
  Box2DHelpers
){
  var debugCanvas, debugContext;
  var canvasWidth, canvasHeight;
  var canvasOffsetX, canvasOffsetY;
  var PTM = 32;

  var initDebugDraw = function(b2world){
    debugCanvas = document.createElement('canvas');
    document.body.appendChild(debugCanvas);
    debugContext = debugCanvas.getContext('2d');
    var debugDraw = Box2DDebugDraw.getCanvasDebugDraw(debugContext);
    var flags = 0;
    flags |= Box2DHelpers.e_shapeBit;
    flags |= Box2DHelpers.e_jointBit;
    // flags |= Box2DHelpers.e_aabbBit;
    flags |= Box2DHelpers.e_centerOfMassBit;
    debugDraw.SetFlags( flags );
    b2world.SetDebugDraw( debugDraw );
  };

  return {
    init: function(options){
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer();
      document.body.appendChild(this.renderer.domElement);

      initDebugDraw(options.b2world);
    },

    resize: function(){
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      debugCanvas.width = canvasWidth;
      debugCanvas.height = canvasHeight;
      canvasOffsetX = window.innerWidth / 2;
      canvasOffsetY = window.innerHeight;
    },

    draw: function(scene, camera){
      this.renderer.domElement.style.display = 'block';
      this.renderer.render(scene, camera);
    },

    clear: function(){
      this.renderer.domElement.style.display = 'none';
    },

    clearDebugDraw: function(){
      debugContext.clearRect(0,0,canvasWidth, canvasHeight);
    },

    debugDraw: function (b2world) {
      debugContext.clearRect(0,0,canvasWidth, canvasHeight);

      debugContext.save();

      debugContext.translate(canvasOffsetX, canvasOffsetY);
      debugContext.scale(1, -1);
      debugContext.scale(PTM,PTM);
      debugContext.lineWidth /= PTM;
      debugContext.fillStyle = 'rgb(255,255,0)';
      b2world.DrawDebugData();

      debugContext.restore();
    }
  };

});
