define(['behavior', 'utils'], function(Behavior, Utils){

  var partial = Utils.partial;

  function arrayBehavior(method, array){
    return new Behavior(function(next, error, complete){
      array[method].call(array, function(value){
        next(value);
      });
      complete();
    });
  }

  return {
    each: partial(arrayBehavior, "forEach")
  };

});


