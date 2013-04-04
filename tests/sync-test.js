define(["sync", "model", "prime"], function(Sync, Model, prime){

  module("$3.Sync");

  test("allows defining sync functions on object passed into monad", function(assert){
    var expected = { id: 1 },
        actual = null,
        sync = new Sync(function(sync){
          sync.find = function(query){
            actual = query;
          };
        });

    sync.find({ id: 1 });

    assert.deepEqual(actual, expected);
  });

});
