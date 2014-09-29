define([
  'underscore',
  'Box2D',
  'Box2DDebugDraw',
  'Box2DHelpers'
], function(
  _,
  Box2D,
  Box2DDebugDraw,
  Box2DHelpers
){
  var b2Vec2 = Box2D.b2Vec2;
  var b2EdgeShape = Box2D.b2EdgeShape;
  var b2BodyDef = Box2D.b2BodyDef;
  var b2PolygonShape = Box2D.b2PolygonShape;
  var b2_dynamicBody = Box2D.b2_dynamicBody;

  var setDefaults = function(options){
    this.options = _.extend(this.defaults || {}, options);
  };


  return function(options){
    setDefaults.call(this, options);
    var context = this.options.context;

    // init
    var world = this.b2world = new Box2D.b2World( new b2Vec2(0.0, -10.0) );

    // gound
    var shape = new b2EdgeShape();
    shape.Set(new b2Vec2(-40.0, 0.0), new b2Vec2(40.0, 0.0));
    var ground = world.CreateBody(new b2BodyDef());
    ground.CreateFixture(shape, 0.0);

    // box
    shape = new b2PolygonShape();
    shape.SetAsBox(0.25, 0.25);

    var bd = new b2BodyDef();
    bd.set_type(b2_dynamicBody);
    bd.set_position(new b2Vec2(0.0, 20));
    var b4 = world.CreateBody(bd);
    b4.CreateFixture(shape, 10.0);

    // debug draw
    var debugDraw = Box2DDebugDraw.getCanvasDebugDraw(context);
    var flags = 0;
    flags |= Box2DHelpers.e_shapeBit;
    flags |= Box2DHelpers.e_jointBit;
    // flags |= Box2DHelpers.e_aabbBit;
    flags |= Box2DHelpers.e_centerOfMassBit;
    debugDraw.SetFlags( flags );
    world.SetDebugDraw( debugDraw );
  };
});
