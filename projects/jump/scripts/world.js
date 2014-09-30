define([
  'underscore',
  'Box2D',
  'camera',
  'light',
  'ground',
  'dude',
  'platform',
  'draw',
  'interaction',
  'config'
], function(
  _,
  Box2D,
  Camera,
  Light,
  Ground,
  Dude,
  Platform,
  draw,
  interaction,
  config
){
  var options;
  var b2world;
  var scene, renderer, camera;
  var b2Vec2 = Box2D.b2Vec2;
  var currentTime, prevTime;
  var dude, ground, light;

  return {
    init: function(){
      b2world = this.b2world = new Box2D.b2World( new b2Vec2(0.0, config.gravity));

      draw.init({b2world: b2world});
      renderer = draw.renderer;
      scene = draw.scene;

      options = {
        world: b2world,
        scene: draw.scene
      };

      light = new Light();
      // (new Light()).init(_.extend(options, {x: 5, y: -5, z: 0}));
      (new Light()).init(_.extend(options, {x: 0, y: 15, z: 5}));
      // (new Light()).init(_.extend(options, {x: 15, y: -15, z: 0}));
      camera = new Camera();
      ground = new Ground();
      dude = new Dude();

      (new Platform()).init(_.extend(options, {x: 5, y: 2}));
      (new Platform()).init(_.extend(options, {x: -3, y: 4}));
      (new Platform()).init(_.extend(options, {x: -5, y: 6}));
      (new Platform()).init(_.extend(options, {x: 4, y: 8}));

      light.init(options);
      camera.init(options);
      ground.init(options);
      dude.init(options);

      interaction.init({b2world: b2world, dude: dude});
      interaction.start();

      prevTime = Date.now();
    },

    update: function(){
      currentTime = Date.now();
      b2world.Step((currentTime - prevTime) / 1000, 3, 2);
      prevTime = currentTime;

      interaction.check();

      dude.update();

      // has dude fallen
      if (dude.body.GetPosition().get_y() <= -20){
        dude.destroy();
        dude = new Dude();
        dude.init(options);
      }

      camera.lookTowards(dude.threeObject.position);
      camera.moveX(dude.threeObject.position.x);
    },

    resize: function(){
      draw.resize();
      camera.resize();
    },

    draw: function(){
      if (! this.doDebugDraw){
        draw.draw(scene, camera.threeObject);
      } else {
        draw.clear();
      }

      if (this.previousDoDebugDraw !== this.doDebugDraw){
        draw.clearDebugDraw();
      }
      if (this.doDebugDraw) draw.debugDraw(b2world);
      this.previousDoDebugDraw = this.previousDoDebugDraw;
    }
  };
});
