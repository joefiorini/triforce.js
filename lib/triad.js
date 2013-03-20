define(['mootools-core', 'model', 'view', 'controller'], function(_,Model, View, Controller){

  var Triad = new Class({
    initialize: function(controller, model, view){
      this.controller = controller;
      this.model = model;
      this.view = view;
    }
  });

  return function(fn){
    var model = new Model(),
        view = new View(),
        controller = new Controller(view);

    var triad = new Triad(controller, model, view);

    fn.call(this, controller, model, view);

    return triad;
  };

});
