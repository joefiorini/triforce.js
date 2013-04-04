define(["model/observables", 'sync', 'prime', 'underscore'], function(B, Sync, prime, _){

  var Helpers = {
    sync: function(sync){
      this.sync.using = sync;
    },
    find: function(query){
      return B.find(this.sync.using, query);
    },
    create: function(obj){
      return B.create(this.sync.using, obj);
    }
  };

  var InstanceHelpers = {
    save: function(){
      return B.save(this.sync.using, this);
    }
  };

  var Model = prime({
    constructor: function(attrs){
      _.extend(this, InstanceHelpers);
      _.extend(this, attrs);

      _.bindAll(this, "decorate", "save");

      if(this.constructor.sync && this.constructor.sync.using){
        this.sync(this.constructor.sync.using);
      }

    },
    sync: function(sync){
      this.sync.using = sync;
    },
    decorate: function(obj){
      _.extend(this, obj);
    }
  });

  Model.define = function(sync){
    var model = prime({ inherits: Model });
    _.extend(model, Helpers);
    if(typeof sync === "function"){
      model.sync(new Sync(sync));
    } else if(typeof sync === "object"){
      model.sync(sync);
    } else if(typeof Model.sync !== "undefined"){
      model.sync(Model.sync);
    }
    return model;
  };

  return Model;
});
