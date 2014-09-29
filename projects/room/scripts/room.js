define([
  'underscore',
  'three'
], function(
  _,
  THREE
){
  var room = new THREE.Object3D();

  var materials = [
    new THREE.MeshPhongMaterial({color: 0x00ff00}),
    new THREE.MeshPhongMaterial({color: 0xff0000}),
    new THREE.MeshPhongMaterial({color: 0x0000ff})
  ];
  var unit = {x:1,y:1,z:1};

  var getRandom = function(a){ return a[Math.floor(Math.random() * a.length)]; };

  var move = function(geometry, x, y, z){
    geometry.applyMatrix( new THREE.Matrix4().makeTranslation(x, y, z) );
    return geometry;
  };

  var createCube = function(d, point){
    var geometry = new THREE.BoxGeometry(d.x, d.y, d.z);
    var cube = new THREE.Mesh(geometry, getRandom(materials));
    if (point) cube.position = point;
    room.add(cube);
    return cube;
  };

  var p = function(x,y,z){ return new THREE.Vector3(x,y,z); };

  var init = function(){
    // move(createCube(p(1,1,1), 0,0,0));
    // move(createCube(p(1,1,1), 0,-3,0));
    createCube(p(1,1,1));
    // createCube(p(5,1,5), p(5,0,0));
    // createCube(p(1,5,5), p(-1,0,0));
    // createCube(p(1,5,5), p(0,5,0));

    var pointLight = new THREE.PointLight(
      0xFFFFFF, //light color
      1, // intensity
      0 // distance, 0 = infinite
    );
    pointLight.position.set(0,0,0);
    room.add(pointLight);

    return room;
  };

  return {
    init: init
  };
});
