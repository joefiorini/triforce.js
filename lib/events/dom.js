define(['event', 'mootools-more'], function(Event){

  var DOMEvent = new Class({
    Extends: Event
  });

  var KeyboardEvent = new Class({
    Extends: DOMEvent,
    Implements: [Options],
    initialize: function(key, target, options){
      this.key = key;
      this.setOptions(options);
      this.parent(target);
      this.eventName = "keydown:keys(" + key + ")";
    }
  });

  DOMEvent.Keyboard = KeyboardEvent;

  return {
    DOM: DOMEvent
  };
});
