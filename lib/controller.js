define(['behavior', 'prime'], function(Behavior, prime){

  function behaviorProxy(actualName){
    return function(fn){
      var next = this.call;
      this.call = function(b){
        b = next(b);
        return b[actualName].call(b, fn);
      };
      return this;
    };
  }

  var Controller = prime({
    constructor: function(view, model, behavior){
      this.view = view;
      this.model = model;
      this.el = view.el;
      this.behavior = new Behavior(function(n,e,c){
        n();
      });
      this.call = function(b){
        this.behavior = b;
        return this.behavior;
      };
    },
    setupListener: function(behavior){
      this.behavior = behavior;
      this.call(behavior);
      return this;
    },
    convertsValue: behaviorProxy("map"),
    respondsWith: behaviorProxy("map"),
    rejectsValue: behaviorProxy("reject"),
    save: function(){
      var next = this.call,
          self = this;
      this.call = function(b){
        b = next(b);
        return b.convert(self.model.saveItem);
      };
      return this;
    },
    then: function(fn){
      var next = this.call;
      this.call = function(b){
        b = next(b);
        b.onValue(fn);
      };
      return this;
    },
    transitionsView: function(fn){
      // Not implemented
    }
  });

  return Controller;
});


