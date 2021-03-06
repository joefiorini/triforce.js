define(['mootools-core'], function(){
  var Event = new Class({
    initialize: function(target, name){
      this.target = target;
      this.eventName = name;
    },
    on: function(name){
      return new Event(this.target, name);
    },
    onValue: function(fn){
      this.target.addEvent(this.eventName, fn);
    }
  });

  return Event;
});

