define(["model/behaviors", 'prime', 'underscore'], function(B, prime, _){

  var Model = prime({
    // Binds: ["loadItem", "saveItem", "loadItems", "createItem"],
    constructor: function(store, attrs){
      this.store = store;
      _.extend(this, attrs);
    },
    loadItem: function(id){
      return B.load(this.store, id);
    },
    saveItem: function(item){
      return B.save(this.store, item);
    },
    loadItems: function(){
      return B.loadAll(this.store);
    },
    createItem: function(item){
      return B.create(this.store, item);
    },
    decorate: function(obj){
      _.extend(this, obj);
    }
  });

  return Model;
});
