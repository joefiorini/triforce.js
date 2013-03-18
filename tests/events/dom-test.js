define(['mootools-core', 'events/dom'], function(_,Events){

  var $target, called;

  module("$3.Events.DOM", {
    setup: function(){
      $target = $("qunit-fixture");
      called = false;
    }
  });

  test("binds to DOM events given selector and event name", function(assert){
    var stream = new Events.DOM($target);

    stream.on("click").then(function(){
      called = true;
    });

    $target.fireEvent("click");

    assert.ok(called, "click event was triggered");
  });


  module("$3.Events.DOM.Keyboard", {
    setup: function(){
      $target = $("qunit-fixture");
      called = false;
    }
  });

  test("binds to keydown and triggers on given key", function(assert){
    var stream = new Events.DOM.Keyboard("a", $target);

    stream.then(function(e){
      called = e.key;
    });

    $target.fireEvent("keydown", { key: "a" });

    assert.equal(called, "a", "keydown event was triggered with 'a'");
  });


});
