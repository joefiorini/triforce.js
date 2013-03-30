define(['bacon'], function(Bacon){

  var load = function(store, id){
    return Bacon.fromCallback(function(callback){
      var item = store.find(id);
      callback(item);
    });
  };

  var save = function(store, item){
    return Bacon.fromCallback(function(callback){
      item = store.save(item);
      callback(item);
    });
  };

  var loadAll = function(store, item){
    return new Behavior(function(next,error,complete){
      var items = store.findAll();
      next(items);
    });
  };

  var create = function(store, item){
    return new Behavior(function(next,error,complete){
      var item = store.create(item);
      next(item);
    });
  };

  return {
    load: load,
    save: save,
    create: create,
    loadAll: loadAll
  };

});
