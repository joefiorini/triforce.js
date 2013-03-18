define(['mootools-core', 'promises'], function(){
  var Stream = new Class({
    initialize: function(target){
      this.target = target;
    },
    on: function(name){
      var p = this.promise = new Promise({ plain: true, lazy: true });
      this.target.addEvent(name, function(){
        p.deliver(null, true);
      });
      return this;
    },
    then: function(fn){
      this.promise.addEvent("realized", fn);
    }
  });

  return Stream;
});
