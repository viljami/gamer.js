define([
  'underscore',
  'Box2D'
], function(
  _,
  Box2D
){
  var b2Contact = Box2D.b2Contact;

  var is = function(body, name){ return body.userData && body.userData.name === name; };
  return function (){
    this.init = function(){
      var listener = new Box2D.JSContactListener();

      listener.BeginContact = function (contactPtr) {
        var contact = Box2D.wrapPointer( contactPtr, b2Contact),
          fA = contact.GetFixtureA(),
          fB = contact.GetFixtureB(),
          bA = fA.GetBody(),
          bB = fB.GetBody();

        if (is(bA, 'star')){
          // only other moving currently is the dude
          // -> collisions happen only with the dude.
          bA.userData.isAchieved = true;
          bB.userData.starred = true;
        } else if (is(bB, 'star')){
          bB.userData.isAchieved = true;
          bA.userData.starred = true;
        } else if (is(bA, 'dude')){
          bA.userData.jumping = false;
        } else if (is(bB, 'dude')){
          bB.userData.jumping = false;
        }
      };

      listener.EndContact = function(contactPtr) {
        var contact = Box2D.wrapPointer( contactPtr, b2Contact),
          fA = contact.GetFixtureA(),
          fB = contact.GetFixtureB(),
          bA = fA.GetBody(),
          bB = fB.GetBody();

        if (is(bA, 'dude')){
          bA.userData.jumping = true;
        } else if (is(bB, 'dude')){
          bB.userData.jumping = true;
        }
      };
      listener.PreSolve = function() {};
      listener.PostSolve = function() {};

      this.listener = listener;
    };
  };
});
