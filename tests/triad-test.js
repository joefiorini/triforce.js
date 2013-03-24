define(['triad', 'model', 'view', 'controller'],
    function(Triad, Model, View, Controller){

  module("$3.Triad");

  test("defers the given function until setup is called", function(assert){
    var called = false;

    var feature = Triad(function(){ called = true; });

    feature.setup();

    assert.equal(called, true);
  });

  test("passes Triad m/v/c arguments", function(assert){
    var args;
    var feature = Triad(function(){
      args = Array.prototype.slice.call(arguments);
    });

    feature.setup();

    assert.equal(args.length, 3, "calls function with 3 arguments");
    assert.ok(args[0] instanceof Controller, "third argument is instance of controller");
    assert.ok(args[1] instanceof Model, "first argument is instance of model");
    assert.ok(args[2] instanceof View, "second argument is instance of view");
  });

  test("passes new objects every time its called", function(assert){
    var args, newArgs;

    var f1 = Triad(function(){
      args = Array.prototype.slice.call(arguments);
    });

    var f2 = Triad(function(){
      newArgs = Array.prototype.slice.call(arguments);
    });

    f1.setup();
    f2.setup();

    assert.notEqual(args[0], newArgs[0], "gets new controller instance");
    assert.notEqual(args[1], newArgs[1], "gets new model instance");
    assert.notEqual(args[2], newArgs[2], "gets new view instance");

  });

  test("returns feature with triad objects set on it", function(assert){
    var args,
        feature = Triad(function(){
          args = Array.prototype.slice.call(arguments);
        });

    feature.setup();

    assert.equal(args[0], feature.controller, "returns feature with controller");
    assert.equal(args[1], feature.model, "returns feature with model");
    assert.equal(args[2], feature.view, "returns feature with view");
  });

});
