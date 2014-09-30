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
  var b2Vec2 = Box2D.b2Vec2;
  var b2EdgeShape = Box2D.b2EdgeShape;
  var b2BodyDef = Box2D.b2BodyDef;

  return function Ground(){
    this.init = function(options){
      mvc.member.setDefaults.call(this, options);

      var shape = new b2EdgeShape();
      shape.Set(new b2Vec2(-20.0, 0.0), new b2Vec2(20.0, 0.0));
      var ground = this.options.world.CreateBody(new b2BodyDef());
      ground.CreateFixture(shape, 0.0);
      this.body = ground;

      var geometry = new THREE.BoxGeometry(40, 0.5, config.depth);
      this.threeObject = new THREE.Mesh(geometry, materials.green);
      this.options.scene.add(this.threeObject);

      var p = this.body.GetPosition();
      this.threeObject.position.set(p.get_x(), p.get_y() - 0.25, 1);
      console.log(p.get_x(), p.get_y());
    };

    this.update = function(){

    };
  };

});
