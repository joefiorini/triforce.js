define(['mootools-core', 'event'], function(_,Event){

  var Evented = new Class({
    Implements: [Events],
    trigger: function(){
      this.fireEvent("change");
    }
  });

  module("$3.Event");

  test("binds to events using promise-style callbacks", function(assert){
    var called = false,
        obj = new Evented(),
        stream = new Event(obj);

    stream.on("change").then(function(){
      called = true;
    });

    obj.trigger();

    assert.ok(called, "event was triggered");

  });

});
