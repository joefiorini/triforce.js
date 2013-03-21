define(['behavior', 'utils', 'mootools-core'], function(Behavior, Utils){

  var called, obj;

  var Evented = new Class({
    run: function(args){
      this.handler(args);
    }
  });

  function createBehavior(handler){
    return new Behavior(function(next, error, complete){
      handler = Utils.partial(handler, next, error, complete);

      obj.handler = handler;

      return function(){
      };
    });

  }

  module("$3.Behavior", {
    setup: function(){
      called = false;
      obj = new Evented();
    }
  });

  test("simple event handling", function(expect){
    var args = { e: "blah" };
    var b = createBehavior(function(next, err, complete, e){
      next(e);
      complete();
    });

    b.onValue(function(e){
      called = true;
      expect.equal(e, args, "passed event arguments");
    });

    obj.run(args);

    expect.equal(called, true, "event was called");
  });

  test("simple error handling", function(expect){
    var success = false;

    var b = createBehavior(function(n,error,c,e){
      error("stupid");
    });

    b.onValue(function(e){
      success = true;
    }, function(e){
      called = true;
      expect.equal(e, "stupid", "raised correct error");
    });

    obj.run();

    expect.equal(called, true, "error handler was called");
    expect.equal(success, false, "value handler was not called");
  });

  test("keeps listening after first value", function(assert){
    var called = 0;

    var b = createBehavior(function(next, err, complete, e){
      next(e);
      complete();
    });

    b.onValue(function(){
      called++;
    });

    obj.run();
    obj.run();

    assert.equal(called, 2, "event called twice");
  });

  test("maps single value", function(expect){
    var args = { e: "cool" },
        index = null;

    var b = createBehavior(function(next, err, c, e){
      next(e);
    });

    var b2 = b.map(function(val, idx){
      index = idx;
      return val.e;
    });

    b2.onValue(function(val){
      expect.notEqual(val, args, "did not pluck property off args");
      expect.equal(val, args.e);
      expect.equal(index, 0, "tracks index");
    });

    obj.run(args);
  });

  test("maps multiple values", 2, function(expect){
    var index = null,

        called = 0,
        vals = [1,2,3],
        actual = [];

    var b = createBehavior(function(next, err, complete, e){
      next(vals[0]);
      next(vals[1]);
      next(vals[2]);
      complete();
    });

    var b2 = b.map(function(val, idx){
      actual.push(val);
      index = idx;
    });

    b2.onValue(function(val){
    }, null, function(){
      expect.deepEqual(actual, vals, "called complete with correct value");
    });

    obj.run(1);

    expect.equal(index, vals.length - 1, "increments index");

  });

});
