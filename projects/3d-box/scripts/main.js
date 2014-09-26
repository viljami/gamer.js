require.config({
  paths: {
    underscore: '../../vendor/lodash',
    three: '../../vendor/three.min'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    three: {
      exports: 'THREE'
    }
  }
});

require([
  '../../lib/onload',
  'world',
  '../../lib/controls',
  'three',
  '../../lib/animation-frame'
], function(
  onload,
  world,
  controls,
  THREE
){
  onload(function(){
    document.body.innerHTML = '';
    world.init();
    controls.init();

    var renderer = world.renderer;
    var scene = world.scene;
    var camera = world.camera;
    var light = world.pointLight;
    var cube = world.objects[0];

    var r = 3;
    var angle = 0;
    var cameraAngle = 0;
    var v3Zero = new THREE.Vector3( 0, 0, 0 );
    var c = world.createCube({x:0.1, y:0.1, z:0.1});
    var lens = 100;
    var frameSize = 100;

    controls.start();
    var render = function () {
      requestAnimationFrame(render);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      light.position.set(
        Math.cos(angle) * r + 1,
        1,
        Math.sin(angle) * r + 1
      );

      if (controls.isDown(39)){
        camera.lookAt(v3Zero);
        cameraAngle += 0.1;
        camera.position.set(
          Math.cos(cameraAngle) * r,
          1,
          Math.sin(cameraAngle) * r
        );
      } else if (controls.isDown(37)){
        camera.lookAt(v3Zero);
        cameraAngle -= 0.1;
        camera.position.set(
          Math.cos(cameraAngle) * r,
          1,
          Math.sin(cameraAngle) * r
        );
      } else if (controls.isDown(38)){
        lens += 100;
        frameSize += 100;
        camera.setLens(lens, frameSize );
      } else if (controls.isDown(40)){
        lens -= 100;
        frameSize -= 100;
        camera.setLens(lens, frameSize );
      }
      c.position.set(
        Math.cos(angle) * r,
        0,
        Math.sin(angle) * r
      );

      angle += 0.01;
      if (angle > 360) angle = 0;

      renderer.render(scene, camera);
    };

    render();
  });

  window.onresize = function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    world.resize();
  };
});
