define([
  '../../lib/controls',
  'Box2D'
], function(
  controls,
  Box2D
){
  var b2Vec2 = Box2D.b2Vec2;

  var MAX_SPEED = 1;

  var forward = new b2Vec2(500, 0);
  var backward = new b2Vec2(-500, 0);
  var up = new b2Vec2(0, 25);

  var move = function(b2body, force){
    var v = b2body.GetLinearVelocity();

    b2body.SetAwake(true);
    b2body.ApplyForce(force, b2body.GetWorldCenter());
    v = b2body.GetLinearVelocity();
    // if (Math.abs(v.get_x()) >= MAX_SPEED) b2body.SetLinearVelocity(new b2Vec2(MAX_SPEED, v.get_y()));
    if (Math.abs(v.get_x()) >= MAX_SPEED) b2body.SetLinearVelocity(new b2Vec2(force.get_x() < 0 ? -MAX_SPEED : MAX_SPEED, v.get_y()));
  };

  var jump = function(b2body, force){
    var v = b2body.GetLinearVelocity();
    if (Math.abs(v.get_y()) <=  0.01){
      b2body.SetAwake(true);
      b2body.ApplyLinearImpulse(force, b2body.GetWorldCenter());
    }
  };

  return {
    init: function(options){
      this.world = options.b2world;
      this.dudeBody = options.dude.body;

      controls.init();
    },

    check: function(){
      if (controls.isDown(39)) move(this.dudeBody, forward);
      if (controls.isDown(38)) jump(this.dudeBody, up);
      // if (controls.isDown(40)) move(this.dudeBody, backward);
      if (controls.isDown(37)) move(this.dudeBody, backward);
    },

    start: controls.start,
    stop: controls.stop
  };
});
