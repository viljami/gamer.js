require.config({
  paths: {
    underscore: '../../vendor/lodash',
    Box2D: '../../vendor/box2d',
    onload: '../../lib/onload',
    Box2DHelpers: '../../lib/embox2d-helpers',
    Box2DDebugDraw: '../../lib/embox2d-debug-draw',
    THREE: '../../vendor/three.min',
    colladaLoader: '../../vendor/three/ColladaLoader'
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
    },
    colladaLoader: {
      deps: ['THREE']
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
  var h1;
  var showGameOver = function(){
    if (h1) return;

    h1 = document.createElement('h1');
    h1.innerText = 'Congrats, you are a box!';
    h1.className = 'game-over';
    document.body.appendChild(h1);
  };

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
      if (world.isGameOver){
        showGameOver();
      }
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
