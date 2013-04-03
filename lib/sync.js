define(["prime", "utils", "underscore"], function(prime, Utils, _){

  var Sync = prime({
    constructor: function(implFn){
      implFn.call(this, this);
    }
  });

  return Sync;

});
