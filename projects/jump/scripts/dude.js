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
  var b2_dynamicBody = Box2D.b2_dynamicBody;

  return function Dude(){
    this.init = function(options){
      mvc.member.setDefaults.call(this, options);

      var shape = new b2PolygonShape();
      shape.SetAsBox(0.5, 1);

      var bd = new b2BodyDef();
      bd.set_type(b2_dynamicBody);
      bd.set_position(new b2Vec2(0.0, 20));
      var b4 = this.options.world.CreateBody(bd);
      b4.CreateFixture(shape, 1.0);
      b4.SetAngularDamping(10000);
      this.body = b4;
      this.body.userData = { name: 'dude' };

      this.prevAngle = 0;

      var geometry = new THREE.BoxGeometry(0.5 * config.scaleX, 1 * config.scaleY, config.depth - 0.5);
      this.threeObject = new THREE.Mesh(geometry, materials.cleanBox);
      this.options.scene.add(this.threeObject);
    };

    this.update = function(){
      var currentAngle = this.body.GetAngle();
      var angleDif = currentAngle - this.prevAngle;
      var p = this.body.GetPosition();
      this.threeObject.position.set(p.get_x(), p.get_y(), 1);
      this.threeObject.rotateZ(angleDif);
      this.prevAngle = currentAngle;
      if (this.prevState === 'starred' && this.body.userData.starred) return;

      if (this.prevState !== 'starred' && this.body.userData.starred) {
        this.threeObject.material.materials[4] = materials.cleanBoxFaceD;
        this.prevState = 'starred';
      } else if (this.prevState !== 'jumping' && this.body.userData.jumping){
        this.threeObject.material.materials[4] = materials.cleanBoxFaceO;
        this.prevState = 'jumping';
      } else if (this.prevState !== 'smile' &&
          ! this.body.userData.jumping &&
          ! this.body.userData.starred){
        this.threeObject.material.materials[4] = materials.cleanBoxFace;
        this.prevState = 'smile';
      }
    };

    this.destroy = function() {
      this.options.world.DestroyBody(this.body);
      this.options.scene.remove(this.threeObject);
    };
  };

});
