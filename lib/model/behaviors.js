define(['behavior'], function(Behavior){

  var load = function(store, id){
    return new Behavior(function(next,error,complete){
      var item = store.find(id);
      next(item);
    });
  };

  var save = function(store, item){
    return new Behavior(function(next,error,complete){
      item = store.save(item);
      next(item);
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
