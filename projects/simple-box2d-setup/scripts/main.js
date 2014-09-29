require.config({
  paths: {
    underscore: '../../vendor/lodash',
    Box2D: '../../vendor/box2d',
    onload: '../../lib/onload',
    Box2DHelpers: '../../lib/embox2d-helpers',
    Box2DDebugDraw: '../../lib/embox2d-debug-draw'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    Box2D: {
      exports: 'Box2D'
    }
  }
});

require([
  'onload',
  'world',
  'Box2D',
  '../../lib/animation-frame'
], function(
  onload,
  World,
  Box2D,
  getAnimaitionFrame
){
  var PTM = 32;
  var canvasOffsetX, canvasOffsetY;
  var currentTime, prevTime = Date.now();

  onload(function(){
    var canvasWidth, canvasHeight;

    document.body.innerHTML = ''; // clear

    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    var context = canvas.getContext('2d');

    var world = (new World({context: context})).b2world;

    function step() {
      currentTime = Date.now();
      world.Step((currentTime - prevTime) / 1000, 3, 2);
      prevTime = currentTime;
    }

    function draw() {
      context.clearRect(0,0,canvasWidth, canvasHeight);

      context.save();

      context.translate(canvasOffsetX, canvasOffsetY);
      context.scale(1, -1);
      context.scale(PTM,PTM);
      context.lineWidth /= PTM;
      context.fillStyle = 'rgb(255,255,0)';
      world.DrawDebugData();

      context.restore();
    }

    function resize() {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvasOffsetX = canvasWidth / 2;
      canvasOffsetY = canvasHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }
    window.addEventListener('resize', resize);
    resize();


    function loop(){
      getAnimaitionFrame(loop);
      step();
      draw();
    }

    loop();
  });
});
