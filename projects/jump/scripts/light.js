define([
  'THREE',
  '../../lib/mvc'
], function(
  THREE,
  mvc
){
  return function Light(){
    this.init = function(options){
      mvc.member.setDefaults.call(this, options);

      var pointLight = new THREE.PointLight(
        0xFFFFFF, //light color
        1, // intensity
        0 // distance, 0 = infinite
      );

      pointLight.position.set(
        this.options.x || 0,
        this.options.y || 0,
        this.options.z || 0
      );

      this.options.scene.add(pointLight);
      this.threeObject = pointLight;
    };

    this.update = function(){
    };
  };
});
