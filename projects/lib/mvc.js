define([], function(){
  var setDefaults = function(options){
    this.options = _.extend(this.defaults || {}, options || {});
  };

  return {
    member: {
      setDefaults: setDefaults
    }
  };
});
