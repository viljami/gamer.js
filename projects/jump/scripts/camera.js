define([
  'THREE',
  '../../lib/mvc'
], function(
  THREE,
  mvc
){
  var acceleration = 0.0005;
  var friction = 0.9;

  return function Camera(){

    this.init = function(options){
      mvc.member.setDefaults.call(this, options);

      this.aX = 0;
      this.vX = 0;

      this.threeObject = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 100);
      this.threeObject.position.x = 0;
      this.threeObject.position.y = 5;
      this.threeObject.position.z = 18;
      this.threeObject.lookAt({
          x: 0,
          y: 0,
          z: -4
      });
      this.options.scene.add(this.threeObject);
    };

    this.lookTowards = function(p){
      this.lookTarget = p;

      if (! this.currentPos){
        this.currentPos = p;
        this.threeObject.lookAt(p);
        return;
      }

      var x = this.currentPos.x - p.x;
      var y = this.currentPos.y - p.y;
      var length = Math.pow(x * x + y * y, 0.5);
      var alpha = Math.atan(Math.abs(y / x));

      if (Math.abs(x) >= 1){
        this.currentPos.x += Math.cos(alpha) * length * (x > 0 ? -1 : 1) * 0.05;
      }

      if (Math.abs(y) >= 1){
        this.currentPos.y += Math.sin(alpha) * length * (y > 0 ? -1 : 1) * 0.05;
      }

      this.threeObject.lookAt(this.currentPos);
    };

    this.moveX = function(x){
      var diff = this.threeObject.position.x - x;
      this.targetX = x;

      if (Math.abs(diff) >= 3) {
        if (diff < 0) this.aX += acceleration;
        else this.aX -= acceleration;

        this.vX += this.aX;
      }

      this.aX *= friction;
      this.vX *= friction;

      this.threeObject.position.x += this.vX;
    };

    this.update = function(){
      this.threeObject.updateProjectionMatrix();
    };

    this.resize = function(){
      this.threeObject.aspect = window.innerWidth / window.innerHeight;
      this.update();
    };
  };
});
