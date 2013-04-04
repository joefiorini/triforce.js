define(["prime"], function(prime){

  var ViewStates = prime({
    states: {},
    defineState: function(name, config){
      this.states[name] = config;
    }
  });

  var View = prime({
    inherits: ViewStates,
    wraps: function(selector){
      this.el = document.querySelector(selector);
    },
    get: function(prop){
      return this.el[prop];
    },
    set: function(prop, value){
      this.el[prop] = value;
    }
  });

  return View;
});

