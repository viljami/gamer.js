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
    h1.innerHTML = 'Congrats! You got a box.';
    h1.className = 'game-over';
    document.body.appendChild(h1);

    setTimeout(function(){ h1.style.display ='none'; }, 15000);
  };

  onload(function(){
    document.body.innerHTML = '';

    world.init();

    var button = document.createElement('button');
    button.innerHTML = 'Show physics';
    document.body.appendChild(button);

    var info = document.createElement('p');
    info.className = 'info';
    info.innerHTML = 'Press the button to see the game logic.';
    document.body.appendChild(info);

    button.addEventListener('click', function(){
      world.doDebugDraw = ! world.doDebugDraw;

      if (world.doDebugDraw){
        info.innerText = "Press the button to see with graphics.";
        button.innerText = 'Show wrapping';
      } else {
        info.innerText = 'Press the button to see the game logic.';
        button.innerText = 'Show physics';
      }
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
