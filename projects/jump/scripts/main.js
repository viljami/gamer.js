require.config({
  paths: {
    underscore: '../../vendor/lodash',
    Box2D: '../../vendor/box2d',
    onload: '../../lib/onload',
    Box2DHelpers: '../../lib/embox2d-helpers',
    Box2DDebugDraw: '../../lib/embox2d-debug-draw',
    THREE: '../../vendor/three.min'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    Box2D: {
      exports: 'Box2D'
    },
    THREE: {
      exports: 'THREE'
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
  world,
  Box2D,
  getAnimaitionFrame
){
  onload(function(){
    document.body.innerHTML = '';

    world.init();

    var button = document.createElement('button');
    button.innerText = 'Toggle debug';
    document.body.appendChild(button);
    button.addEventListener('click', function(e) {
      e.preventDefault();
      world.doDebugDraw = ! world.doDebugDraw;
    });

    function update() {
      world.update();
    }

    function draw() {
      world.draw();
    }

    function resize() {
      world.resize();
    }

    function loop(){
      getAnimaitionFrame(loop);
      update();
      draw();
    }

    loop();

    window.addEventListener('resize', resize);
    resize();
  });
});
