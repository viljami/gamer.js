require.config({
  paths: {
    q: '../../vendor/q',
    underscore: '../../vendor/lodash',
    three: '../../vendor/three.min',
    colladaLoader: '../../vendor/three/ColladaLoader'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    three: {
      exports: 'THREE'
    },
    colladaLoader: {
      deps: ['three']
    },
    q: {
      exports: 'Q'
    }
  }
});

require([
  'world/world',
  '../../lib/onload',
  '../../lib/animation-frame'
], function(
  worldPromise,
  onload
){
  onload(function(){
    worldPromise.then(function(world){
      var renderer = world.renderer;
      var scene = world.scene;
      var camera = world.camera;
      document.body.innerHTML = '';
      document.body.appendChild(world.renderer.domElement);

      var resize = function(){
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', resize);

      var render = function () {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
      };

      render();
      resize();
    });
  });
});
