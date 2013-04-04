define(['bacon'], function(Bacon){

  var find = function(sync, query){
    return Bacon.fromCallback(function(callback){
      var item = sync.find(query);
      callback(item);
    });
  };

  var create = function(sync, item){
    return Bacon.fromCallback(function(callback){
      item = sync.create(item);
      callback(item);
    });
  };

  var save = function(sync, item){
    return Bacon.fromCallback(function(callback){
      item = sync.save(item);
      callback(item);
    });
  };

  var loadAll = function(store, item){
    return Bacon.fromCallback(function(callback){
      var items = store.findAll();
      callback(items);
    });
  };

  return {
    find: find,
    save: save,
    create: create,
    loadAll: loadAll
  };

});
