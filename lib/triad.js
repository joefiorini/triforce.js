define(['model', 'view', 'controller'], function(Model, View, Controller){

  return function(fn){
    var model = new Model(),
        view = new View(),
        controller = new Controller();

    fn.call(this, model, view, controller);
  };

});
