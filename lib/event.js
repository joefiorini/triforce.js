define(['mootools-core', 'promises'], function(){
  var Event = new Class({
    initialize: function(target){
      this.target = target;
    },
    on: function(name){
      var p = this.promise = new Promise({ plain: true, lazy: true });
      this.target.addEvent(name, function(e){
        p.deliver(e, true);
      });
      return this;
    },
    then: function(fn){
      this.promise.addEvent("realized", fn);
    }
  });

  return Event;
});

