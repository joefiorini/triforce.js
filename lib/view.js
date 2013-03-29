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
      this.el = $$(selector);
    },
    get: function(prop){
      return this.el.get(prop);
    }
  });

  return View;
});

