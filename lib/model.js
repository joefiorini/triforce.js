define(["model/behaviors", "mootools-core", "mootools-more"], function(B){
  var Model = new Class({
    Binds: ["loadItem", "saveItem", "loadItems", "createItem"],
    initialize: function(store, attrs){
      this.store = store;
      this.decorate(attrs);
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
      Object.append(this, obj);
    }
  });

  return Model;
});
