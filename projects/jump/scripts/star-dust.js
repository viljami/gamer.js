define([
  'underscore',
  'Box2D',
  'Box2DHelpers',
  '../../lib/mvc',
  'THREE',
  'materials',
  'config'
], function(
  _,
  Box2D,
  Box2DHelpers,
  mvc,
  THREE,
  materials,
  config
){
  var particleCount = 100;

  var randomNeg = function() { return Math.random() < 0.5 ? -1 : 1; };
  var randomX = function(){ return Math.random() * 0.006 * randomNeg(); };
  var randomY = function(){ return -Math.random() * 0.01 - 0.005; };

  // Star Dust is dust. It is not part of the physical world.
  // Therefore it does not have a body in Box2D world.
  return function StarDust(){
    this.init = function(options){
      mvc.member.setDefaults.call(this, options);

      this.particleSystemGeometry = new THREE.Geometry(1, 1, 1);
      this.particleSystemGeometry.dynamic = true;

      var pX, pY, pZ, particle;
      for (var i = 0; i < particleCount; i++) {
        pX = Math.random() * 0.5;
        pY = Math.random() * 3 - 0.75;
        pZ = Math.random() * 1 - 0.5;
        particle = new THREE.Vector3(pX, pY, pZ);
        particle.velocity = new THREE.Vector3(randomX(), randomY(), 0);
        this.particleSystemGeometry.vertices.push(particle);
      }

      var particleSystem = new THREE.ParticleSystem(
          this.particleSystemGeometry,
          materials.starDust);

      particleSystem.sortParticles = true;
      this.threeObject = particleSystem;
      this.threeObject.position.set(this.options.x, this.options.y, this.options.z || 1);
      this.options.scene.add(this.threeObject);
    };

    this.update = function(){
      this.threeObject.rotateY(0.002);
      var particle;

      if (this.isExplode) {
        this.updateExplode();
        return;
      }

      for (var i = 0; i < particleCount; i++) {
        particle = this.particleSystemGeometry.vertices[i];

        if (particle.y < -1.25) {
          particle.y = 1.5;
          particle.x = Math.random() * 0.5;
          particle.z = Math.random() * 1 - 0.5;

          particle.velocity.x = randomX();
          particle.velocity.y = randomY();
        }

        particle.add(particle.velocity);
      }

    };

    this.updateExplode = function(){
      var particle;

      for (var i = 0; i < particleCount; i++) {
        particle = this.particleSystemGeometry.vertices[i];
        particle.add(particle.velocity);
      }

      this.particleSystemGeometry.vertices.needsUpdate = true;
    };

    this.explode = function(){
      this.isExplode = true;
    };

    this.destroy = function(){
      this.options.scene.remove(this.threeObject);
    };
  };
});
