define(["model"], function(Model){

  var person = new Model(null, {
    firstName: "Bob",
    lastName: "Belcher"
  });

  module("$3.Model");

  test("can decorate model with additional attributes", function(assert){
    person.decorate({
      fullName: function(){
        return this.firstName + " " + this.lastName;
      }
    });

    assert.equal(person.fullName(), "Bob Belcher", "fullName is accessible on model");

  });

  test("wraps given finder in a behavior", function(assert){
    var called = false, actual = null;

    var model = new Model({
      find: function(id){
        called = true;
        return { id: id };
      }
    });

    model.loadItem(1).onValue(function(item){
      actual = item;
    });

    assert.equal(called, true, "finder was called");
    assert.equal(actual.id, 1, "id was set");
  });

  test("wraps saving in a behavior", function(assert){
    var called = false, actual = null, item = { id: 1 };

    var model = new Model({
      save: function(item){
        item._persisted = true;
        called = true;
        return item;
      }
    });

    model.saveItem(item).onValue(function(item){
      actual = item;
    });

    assert.equal(called, true, "save was called");
    assert.equal(actual._persisted, true, "item was saved");
  });

});
