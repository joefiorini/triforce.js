define(['bindings', 'mootools-core'], function(Bindings){

  module("$3.Bindings");

  test("tracks changes to an input's value", function(assert){
    var input = new Element("input", { "id": "test-input",
      "type": "text" });

    $("qunit-fixture").adopt(input);

    var value = new Bindings.ElementValue($("test-input"));

    input.set("value", "blah");
    assert.equal(value.value(), "blah");

    input.set("value", "diddy");
    assert.equal(value.value(), "diddy");
  });

});
