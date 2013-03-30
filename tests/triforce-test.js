define(['triforce'], function($3){

  module("Triforce Root API Tests");

  test("$3 is a function", function(assert){
    assert.equal(typeof $3, "function", "$3 is a valid function");
  });

  test("$3 has valid type functions", function(assert){
    assert.equal(typeof $3.Triad, "function", "$3.Triad is a function");
  });

  test("$3 has behavior namespaces", function(assert){
    assert.ok($3.DOM, "DOM behaviors");
  });

  module("Triforce Factory - Entry Point Binding");

  test("binds features to event-based entry points", function(assert){
    var called = false;

    var TestFeature = $3.Triad(function(c,m,v){
      v.wraps("#qunit-fixture");

      c.then(function(){
        called = true;
      });
    });

    $3(TestFeature, $3.DOM.click);

    document.getElementById("qunit-fixture").click();

    assert.equal(called, true, "controller was notified of event");
  });

  test("uses given model instance", function(assert){
    var actual = null,
        model;

    var TestFeature = $3.Triad(function(c,m,v){
      actual = m;
    });

    var expected = TestFeature.model;

    model = {
      firstName: "blah",
      lastName: "diddy"
    };

    $3(TestFeature, model, $3.DOM.click);

    expected.decorate(model);

    assert.equal(actual, expected);
  });

});
