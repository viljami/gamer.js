define([
  'underscore'
], function(
  _
){

  var onKeyDown = function(e){
    this.keys[e.keyCode] = true;
  };

  var onKeyUp = function(e){
    this.keys[e.keyCode] = false;
  };

  var keyboard = {
    keys: [],

    init: function(){
      this.onKeyDown = _.bind(onKeyDown, this);
      this.onKeyUp = _.bind(onKeyUp, this);
    },

    startLinstening: function(){
      document.body.addEventListener('keydown', this.onKeyDown);
      document.body.addEventListener('keyup', this.onKeyUp);
    },

    stopListening: function(){
      document.body.removeEventListener('keydown', this.onKeyDown);
      document.body.removeEventListener('keyup', this.onKeyUp);
    },

    clear: function(){
      this.keys = [];
    },

    isDown: function(n){
      return this.keys[typeof n === 'string' ? n.charCodeAt(0) : n];
    },

    isDownFast: function(n){ return this.keys[n]; }
  };



  return {
    init: function(){ keyboard.init(); },
    start: function(){ keyboard.startLinstening(); },
    stop: function(){ keyboard.stopLinstening(); },
    isDown: function(n){ return keyboard.isDownFast(n); }
  };
});
