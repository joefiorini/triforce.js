define(['triad'], function(Triad){

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
    assert.equal(args.length, 3, "calls function with 3 arguments");
    assert.equal(typeof args[0], "object");
    assert.equal(typeof args[1], "object");
    assert.equal(typeof args[2], "object");
  });

  test("passes new objects every time its called", function(assert){
    var args, newArgs;

    Triad(function(){
      args = Array.prototype.slice.call(arguments);
    });

    Triad(function(){
      newArgs = Array.prototype.slice.call(arguments);
    });

    assert.notEqual(args[0], newArgs[0]);
    assert.notEqual(args[1], newArgs[1]);
    assert.notEqual(args[2], newArgs[2]);

  });

});
