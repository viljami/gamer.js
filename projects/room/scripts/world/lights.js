define([
  'three'
],function(
  THREE
){
  var lights = [];
  lights.push(new THREE.AmbientLight(0x666666));

  var light;

  light = new THREE.DirectionalLight(0xdfebff, 1.75);
  light.position.set(20, 0, 0);
  light.position.multiplyScalar(1.3);

  light.castShadow = true;
  light.shadowCameraVisible = true;

  light.shadowMapWidth = 512;
  light.shadowMapHeight = 512;

  var d = 20;

  light.shadowCameraLeft = -d;
  light.shadowCameraRight = d;
  light.shadowCameraTop = d;
  light.shadowCameraBottom = -d;

  light.shadowCameraFar = 100;
  light.shadowDarkness = 0.2;

  lights.push(light);

  return lights;
});
