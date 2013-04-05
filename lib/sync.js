define(["prime", "utils", "underscore", "bacon"], function(prime, Utils, _, Bacon){

  var Sync = prime({
    constructor: function(implFn){
      implFn.call(this, this);
    },
    itemModified: new Bacon.Bus(),
  });

  return Sync;

});
