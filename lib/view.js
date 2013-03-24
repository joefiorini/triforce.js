define(["mootools-core"], function(){

  var ViewStates = new Class({
    states: {},
    defineState: function(name, config){
      this.states[name] = config;
    }
  });

  var View = new Class({
    Implements: ViewStates,
    wraps: function(selector){
      this.el = $$(selector);
    },
    get: function(prop){
      return this.el.get(prop);
    }
  });

  return View;
});

