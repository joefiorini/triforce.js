define(['behavior', 'utils', 'mootools-core', 'mootools-more'], function(Behavior, Utils){

  var partial = Utils.partial;

  function keyboard(key){
    return "keydown:keys(" + key + ")";
  }

  function arrayBehavior(method, array){
    return new Behavior(function(next, error, complete){
      array[method].call(array, function(value){
        next(value);
      });
      complete();
    });
  }

  return {
    each: partial(arrayBehavior, "each")
  };

});


