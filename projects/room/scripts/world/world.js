define([
  'q',
  'three',
  './room',
  './camera',
  './cube',
  './lights'
], function(
  Q,
  THREE,
  room,
  camera,
  cube,
  lights
){
  var webglRenderer = new THREE.WebGLRenderer();
  webglRenderer.shadowMapEnabled = true;
  webglRenderer.shadowMapSoft = true;

  var scene = new THREE.Scene();

  var add2Scene = function(o){ scene.add(o); };
  var init = function(room){
    scene.add(room[0]);
    scene.add(cube);

    lights.forEach(add2Scene);

    return {
      renderer: webglRenderer,
      scene: scene,
      camera: camera
    };
  };

  return Q.all([room]).then(init);
});
