define([
  'three'
],function(
  THREE
){
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshLambertMaterial({
      color: 0x999999
  });

  var cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  cube.position.x = 9;
  cube.position.y = 3;
  cube.position.z = 0;
  cube.rotateX = 45;

  cube.updateMatrix();

  return cube;
});
