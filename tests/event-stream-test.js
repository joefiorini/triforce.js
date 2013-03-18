define(['mootools-core', 'event-stream'], function(_,EventStream){

  var Evented = new Class({
    Implements: [Events],
    trigger: function(){
      this.fireEvent("change");
    }
  });

  module("$3.EventStream");

  test("binds to events using promise-style callbacks", function(assert){
    var called = false,
        obj = new Evented(),
        stream = new EventStream(obj);

    stream.on("change").then(function(){
      called = true;
    });

    obj.trigger();

    assert.ok(called, "event was triggered");

  });

});
