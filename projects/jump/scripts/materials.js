define([
  'THREE'
], function(
  THREE
){
  var cleanBox = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('assets/clean-box.jpeg')
  });

  var cleanBoxFace = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('assets/clean-box-face.jpg')
  });

  return {
    cleanBoxFace: cleanBoxFace,

    cleanBoxFaceO: new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture('assets/clean-box-face-o.jpg')
    }),

    cleanBoxFaceD: new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture('assets/clean-box-face-d.jpg')
    }),

    cleanBox: new THREE.MeshFaceMaterial([cleanBox, cleanBox, cleanBox, cleanBox, cleanBoxFace, cleanBox]),

    starDust: new THREE.ParticleBasicMaterial({
      map: THREE.ImageUtils.loadTexture('assets/particle.png'),
      color: 0xE7E400,
      size: 1,
      opacity: 0.3,
      transparent: true
    }),

    woodBox: new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture('assets/wood-box.jpg')
    })
  };
});
