define(['mootools-core', 'model', 'view', 'controller'], function(_,Model, View, Controller){

  var Triad = new Class({
    initialize: function(controller, model, view, setup){
      this.controller = controller;
      this.model = model;
      this.view = view;
      this.setupFn = setup;
    },
    setup: function(controller, model, view){
      if(controller !== undefined){
        this.controller = controller;
      }

      if(model !== undefined){
        this.model = model;
      }

      if(view !== undefined){
        this.view = view;
      }

      this.setupFn.call(this, this.controller, this.model, this.view);
    }
  });

  return function(fn){
    var model = new Model(),
        view = new View(),
        controller = new Controller(view, model);

    var triad = new Triad(controller, model, view, fn);

    return triad;
  };

});
