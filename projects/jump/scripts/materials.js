define([
  'THREE'
], function(
  THREE
){
  return {
    cleanBox: new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture('assets/clean-box.jpeg')
    }),

    starDust: new THREE.ParticleBasicMaterial({
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
