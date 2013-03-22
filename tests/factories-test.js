define(['factories'], function($3){

  var called;

  module("DOM Factories", {
    setup: function(){
      called = false;
    }
  });

  test("click", function(assert){
    var behavior = $3.DOM.click("#qunit-fixture");

    behavior.onValue(function(){
      called = true;
    });

    $$("#qunit-fixture").fireEvent("click");

    assert.equal(called, true);
  });

  test("change", function(assert){
    var input = new Element("input", { type: "text" });
    $("qunit-fixture").adopt(input);

    var behavior = $3.DOM.change("input");

    behavior.onValue(function(val){
      called = true;
    });

    input.fireEvent("change");

    assert.equal(called, true);
  });

  test("mouseenter", function(assert){
    expectTrigger($3.DOM.mouseEnter, "mouseenter", "#qunit-fixture", assert);
  });

  function expectTrigger(factory, evt, selector, assert){
    var behavior = factory("#qunit-fixture");

    behavior.onValue(function(){
      called = true;
    });

    $$(selector).fireEvent(evt);

    assert.equal(called, true);
  }

});
