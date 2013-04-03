define(['controller', 'model', 'dom', 'bacon'], function(Controller, Model, DOM, Bacon){

  var el, view, called, controller, store, item;

  module("$3.Controller", {
    setup: function(){
      el = document.querySelector("#qunit-fixture");
      view = { el: el };
      item = { blah: "doo", _persisted: false };
      var ModelC = Model.define(function(sync){
        sync.save = function(item){
          item._persisted = true;
          return item;
        };
      });
      controller = new Controller(view, new ModelC(item));
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

    controller.setupListener(DOM.click(view.el));

    view.el.click();

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

    controller.setupListener(DOM.click(view.el));

    view.el.click();

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

    controller.setupListener(Bacon.fromArray(["  blah  ", "  diddy   ", "   "]));

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

    controller.setupListener(Bacon.fromArray([item]));

    assert.equal(item._persisted, true, "saved model");
    assert.equal(actual.blah, "diddy", "updated value");
  });

});
