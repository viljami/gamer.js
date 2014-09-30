define([
  'THREE'
], function(
  THREE
){
  return {
    // sky: new THREE.MeshLambertMaterial({
    //   map: THREE.ImageUtils.loadTexture('images/sky.jpg'),
    //   side: THREE.DoubleSide
    // }),
    green: new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture('assets/wood-box.jpg')
      // map: tileTexture
      // color: 0x00ff00
    }),
    red: new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture('assets/wood-box.jpg')
      // color: 0xff0000
    }),
    blue: new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture('assets/clean-box.jpeg')
      // color: 0x0000ff
    })
  };
});
