define("triforce", ['triad', 'dom'], function(Triad, DOM){

  // Factory: the primary API for Triforce
  //  export to: $3

  var factory = function(){

    var args = Array.prototype.slice.apply(arguments);

    var feature = args.shift(),
        model, entryPoint;

    if(args.length === 1){
      entryPoint = args.shift();
    } else {
      feature.model.store = args.shift();

      entryPoint = args.shift();
    }

    feature.setup(feature.controller, feature.model, feature.view);

    var behavior = entryPoint(feature.view.el);
    feature.controller.setupListener(behavior);

  };

  factory.Triad = Triad;

  factory.DOM = DOM;

  return factory;

});
