define([
  'three'
],function(
  THREE
){
    var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.x = 18;
    camera.position.y = 4.5;
    camera.position.z = 0;
    camera.lookAt({
        x: 0,
        y: 3,
        z: 0
    });

    return camera;
});
