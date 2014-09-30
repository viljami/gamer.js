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
  var b2BodyDef = Box2D.b2BodyDef;
  var b2PolygonShape = Box2D.b2PolygonShape;
  var b2_staticBody = Box2D.b2_staticBody;
  var bd = new b2BodyDef();
  bd.set_type(b2_staticBody);

  return function Platform(){
    this.init = function(options){
      mvc.member.setDefaults.call(this, options);

      var shape = new b2PolygonShape();
      shape.SetAsBox(1, 0.5);
      shape.friction = 0.7;

      bd.set_position(new b2Vec2(this.options.x, this.options.y));
      var b4 = this.options.world.CreateBody(bd);
      b4.CreateFixture(shape, 10.0);
      this.body = b4;

      var geometry = new THREE.BoxGeometry(1 * config.scaleX, 0.5 * config.scaleY, config.depth - 0.2);
      this.threeObject = new THREE.Mesh(geometry, materials.red);
      this.options.scene.add(this.threeObject);
      this.update();
    };

    this.update = function(){
      var p = this.body.GetPosition();
      this.threeObject.position.set(p.get_x(), p.get_y(), 1);
      this.threeObject.rotateZ(this.body.GetAngle());
    };
  };

});
