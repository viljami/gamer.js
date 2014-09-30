define(['THREE'], function(THREE){
  return {
    move: function(geometry, x, y, z) {
      geometry.applyMatrix( new THREE.Matrix4().makeTranslation(x, y, z) );
      return geometry;
    }
  };
});
