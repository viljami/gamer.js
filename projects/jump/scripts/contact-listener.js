define([
  'underscore',
  'Box2D'
], function(
  _,
  Box2D
){
  var b2Contact = Box2D.b2Contact;

  var isStar = function(body){ return body.userData && body.userData.name === 'star'; };
  return function (){
    this.init = function(){
      var listener = new Box2D.JSContactListener();

      listener.BeginContact = function (contactPtr) {
        var contact = Box2D.wrapPointer( contactPtr, b2Contact),
          fA = contact.GetFixtureA(),
          fB = contact.GetFixtureB(),
          bA = fA.GetBody(),
          bB = fB.GetBody();

        if (isStar(bA)){
          bA.userData.isAchieved = true;
        } else if (isStar(bB)){
          bB.userData.isAchieved = true;
        }
      };

      listener.EndContact = function() { };
      listener.PreSolve = function() {};
      listener.PostSolve = function() {};

      this.listener = listener;
    };
  };
});
