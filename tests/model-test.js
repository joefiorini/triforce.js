define(["model", "sync", "triforce", "prime", "bacon"], function(Model, Sync, $3, prime, Bacon){

  var person;
  var noop = function(){ };

  module("$3.Model", {
    setup: function(){
      console.log("setup");
      person = new Model({
        firstName: "Bob",
        lastName: "Belcher"
      });
    }
  });

  test("can define a model", function(assert){
    assert.equal($3.model, Model.define);
  });

  test("can decorate model with additional attributes", function(assert){
    person.decorate({
      fullName: function(){
        return this.firstName + " " + this.lastName;
      }
    });

    assert.equal(person.fullName(), "Bob Belcher", "fullName is accessible on model");

  });

  module("$3.Model#sync");

  test("uses sync for given model", function(assert){

    var called = false,
        actual = null;

    var sync = new Sync(function(sync){
      sync.find = function(query){
        called = true;
        actual = query;
      };
    });

    var Person = Model.define(sync);

    Person.find({ id: 1 }).onValue(noop);

    assert.equal(called, true, "find was called");
    assert.deepEqual(actual, { id: 1 }, "received query parameter");

  });

  test("uses globally defined sync", function(assert){
    var called = false;

    $3.sync(function(sync){
      sync.find = function(query){
        called = true;
      };
    });

    var Person = Model.define();

    Person.find().onValue(noop);

    assert.equal(called, true);

  });

  test("model sync overrides global sync", function(assert){
    var calledGlobal = false,
        calledLocal = false;

    $3.sync(function(sync){
      sync.find = function(query){
        calledGlobal = true;
      };
    });

    var Person = Model.define(new Sync(function(sync){
      sync.find = function(){
        calledLocal = true;
      };
    }));

    Person.find().onValue(noop);

    assert.equal(calledGlobal, false, "global sync not called with local sync defined");
    assert.equal(calledLocal, true);

  });

  test("sync functions are observable", function(assert){
    var called = false, actual = null, created = null, saved = false, instance;

    var ModelC = Model.define(new Sync(function(sync){
      sync.find = function(query){
        called = true;
        return { id: query.id };
      };

      sync.create = function(obj){
        console.log(obj);
        obj._persisted = true;
        return obj;
      };

      sync.save = function(){
        saved = true;
      };

    }));

    ModelC.find({id: 1}).onValue(function(item){
      actual = item;
    });

    ModelC.create({id: 1, name: "joe"}).onValue(function(item){
      created = item;
    });

    instance = new ModelC();

    instance.save().onValue(function(item){
      saved = true;
    });

    assert.equal(called, true, "find was called");
    assert.deepEqual(actual, {id: 1}, "retrieved item was passed into event");
    assert.equal(created._persisted, true, "item was created");
    assert.equal(saved, true, "item was saved");
  });

  test("can plug saving into a stream", function(assert){

    var ModelC = Model.define(function(sync){
      sync.save = function(item){
        called = true;
        item._persisted = true;
      };
    });

    var model = new ModelC();
    model._persisted = false;

    var stream = Bacon.fromArray([model]),
        called = false, actual = null;

    var newStream = model.saveOnChange(stream);

    newStream.onValue(function(item){
      actual = item;
    });

    assert.equal(called, true, "save was called");
    assert.equal(actual._persisted, true, "item was modified");
  });

});
