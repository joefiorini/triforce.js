define(function(){

  // MooTools doesn't give me proper partial application,
  //  so this will have to do
  function partial(fn){
    var slice = Array.prototype.slice,
        args = slice.call(arguments, 1);

    return function(){
      return fn.apply(this, args.concat(slice.call(arguments, 0)));
    };
  }

  return {
    partial: partial
  };

});
