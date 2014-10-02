define([
  'underscore',
  'Box2D',
  'Box2DHelpers',
  '../../lib/mvc',
  'THREE',
  'star-dust',
  'colladaLoader'
], function(
  _,
  Box2D,
  Box2DHelpers,
  mvc,
  THREE,
  StarDust
){
  var b2Vec2 = Box2D.b2Vec2;
  var b2BodyDef = Box2D.b2BodyDef;
  var b2PolygonShape = Box2D.b2PolygonShape;
  var b2_staticBody = Box2D.b2_staticBody;

  return function Star(){
    this.init = function(options){
      mvc.member.setDefaults.call(this, options);

      this.starDust = new StarDust();
      var starDustOptions = _.extend(options, {
        x: options.x,
        y: options.y - 2,
        z: 1.5
      });
      this.starDust.init(starDustOptions);

      var loader = new THREE.ColladaLoader();
      loader.load( 'assets/star-with-material.dae', _.bind(function ( collada ){
        var dae = collada.scene;
        // dae.rotation.x = -Math.PI/2;
        dae.updateMatrix();

        this.threeObject = dae;
        this.threeObject.scale.divide(new THREE.Vector3(2, 2, 2));
        this.threeObject.rotateY(60);
        this.options.scene.add(this.threeObject);

        this.update();
      }, this));

      var shape = new b2PolygonShape();
      shape.SetAsBox(0.8, 0.8);

      var bd = new b2BodyDef();
      bd.set_type(b2_staticBody);
      bd.set_position(new b2Vec2(this.options.x, this.options.y));
      var b4 = this.options.world.CreateBody(bd);
      b4.CreateFixture(shape, 1.0);
      this.body = b4;
      this.body.userData = { name: 'star' };

      this.angle = 0;
    };

    this.update = function(){
      var p = this.body.GetPosition();

      if (this.threeObject) {
        this.angle += 0.01;
        this.threeObject.position.set(
          p.get_x(),
          p.get_y() + Math.cos(this.angle) * 0.3,
          1.5
        );
        this.threeObject.rotateY(0.01);

        if (this.angle >= 360) this.angle = 0;
      }

      this.starDust.update();
    };

    this.isAchieved = function(){
      return !! this.body.userData.isAchieved;
    };

    this.isDestroyed = function(){
      return !! this.destroyed;
    };

    this.destroy = function() {
      this.starDust.explode();
      this.options.world.DestroyBody(this.body);
      this.options.scene.remove(this.threeObject);
      this.destroyed = true;
    };
  };

});
