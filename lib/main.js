define("triforce", ['triad', 'behaviors', 'mootools-core'], function(Triad, Behaviors){

  // Factory: the primary API for Triforce
  //  export to: $3

  var factory = function(){

    var args = Array.prototype.slice.apply(arguments);

      var feature = args.shift(),
          model, entryPoint;

      if(args.length === 1){
        entryPoint = args.shift();
      } else {
        model = args.shift();
        feature.model.decorate(model);

        entryPoint = args.shift();
      }

      var behavior = entryPoint(feature.view.el);
      feature.controller.setupListener(behavior);

  };

  factory.Triad = Triad;
  factory.DOM = Behaviors.DOM;

  return factory;

});
