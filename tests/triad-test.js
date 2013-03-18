define(['triad', 'model', 'view', 'controller'],
    function(Triad, Model, View, Controller){

  module("$3.Triad");

  test("calls given function", function(assert){
    var called = false;
    Triad(function(){ called = true; });
    assert.ok(called, "immediately invokes given function");
  });

  test("passes Triad m/v/c arguments", function(assert){
    var args;
    Triad(function(){
      args = Array.prototype.slice.call(arguments);
    });
    assert.ok(args.length, 3, "calls function with 3 arguments");
    assert.ok(args[0] instanceof Model, "first argument is instance of model");
    assert.ok(args[1] instanceof View, "second argument is instance of view");
    assert.ok(args[2] instanceof Controller, "third argument is instance of controller");
  });

  test("passes new objects every time its called", function(assert){
    var args, newArgs;

    Triad(function(){
      args = Array.prototype.slice.call(arguments);
    });

    Triad(function(){
      newArgs = Array.prototype.slice.call(arguments);
    });

    assert.notEqual(args[0], newArgs[0], "gets new model instance");
    assert.notEqual(args[1], newArgs[1], "gets new view instance");
    assert.notEqual(args[2], newArgs[2], "gets new controller instance");

  });

});
