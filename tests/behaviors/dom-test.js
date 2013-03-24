define(['behaviors/dom'], function(Behaviors){

  var called;

  module("DOM Factories", {
    setup: function(){
      called = false;
    }
  });

  test("click", function(assert){
    var behavior = Behaviors.click("#qunit-fixture");

    behavior.onValue(function(){
      called = true;
    });

    $$("#qunit-fixture").fireEvent("click");

    assert.equal(called, true);
  });

  test("change", function(assert){
    var input = new Element("input", { type: "text" });
    $("qunit-fixture").adopt(input);

    var behavior = Behaviors.change("input");

    behavior.onValue(function(val){
      called = true;
    });

    input.fireEvent("change");

    assert.equal(called, true);
  });

  test("mouseenter", function(assert){
    expectTrigger(Behaviors.mouseEnter, "mouseenter", "#qunit-fixture", assert);
  });

  test("enterKey", function(assert){
    var input = new Element("input"),
        behavior = Behaviors.enterKey(input),
        actual;

    $("qunit-fixture").adopt(input);

    behavior.onValue(function(e){
      actual = e.key;
    });

    input.fireEvent("keydown", { key: "enter" });

    assert.equal(actual, "enter");
  });

  function expectTrigger(factory, evt, selector, assert, data){
    var behavior = factory("#qunit-fixture");

    behavior.onValue(function(){
      called = true;
    });

    $$(selector).fireEvent(evt);

    assert.equal(called, true);
  }

});
