define(['controller', 'model', 'behaviors'], function(Controller, Model, B){

  var el, view, called, controller, store, item;

  module("$3.Controller", {
    setup: function(){
      el = document.querySelector("#qunit-fixture");
      view = { el: el };
      item = { blah: "doo", _persisted: false };
      store = {
        _persisted: false,
        save: function(item){ item._persisted = true; return item; }
      };
      var model = new Model(store);
      controller = new Controller(view, model);
      called = false;
    }
  });

  test("implements behavior dsl", function(assert){
    assert.ok(controller.setupListener, "has setupListener method");
    assert.ok(controller.convertsValue, "has convertsValue method");
  });

  test("responds to event", function(assert){
    var called = false;

    controller.then(function(v){
      called = true;
    });

    controller.setupListener(B.DOM.click(view.el));

    view.el.fireEvent("click");

    assert.equal(called, true);
  });

  test("allows converting values", function(assert){
    var actual;

    controller.convertsValue(function(){
      return "blah";
    });

    controller.then(function(v){
      actual = v;
    });

    controller.setupListener(B.DOM.click(view.el));

    view.el.fireEvent("click");

    assert.equal(actual, "blah");
  });

  test("passes converted values through stream", function(assert){
    var actual = [], inter = [];

    controller.convertsValue(function(val){
      return val.trim();
    });

    controller.rejectsValue(function(val){
      inter.push(val);
      return val.length === 0;
    });

    controller.then(function(v){
      actual.push(v);
    });

    controller.setupListener(B.Array.each(["  blah  ", "  diddy   ", "   "]));

    assert.deepEqual(inter, ["blah", "diddy", ""]);
    assert.deepEqual(actual, ["blah", "diddy"]);

  });

  test("allows saving model value based on current stream", function(assert){
    var actual = null;

    controller.convertsValue(function(val){
      val.blah = "diddy";
      return val;
    });

    controller.save();

    controller.then(function(val){
      actual = val;
    });

    controller.setupListener(B.Array.each([item]));

    assert.equal(item._persisted, true, "saved model");
    assert.equal(actual.blah, "diddy", "updated value");
  });

});
