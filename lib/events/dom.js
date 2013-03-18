define(['event-stream', 'mootools-more'], function(EventStream){

  var DOMEventStream = new Class({
    Extends: EventStream
  });

  var KeyboardEventStream = new Class({
    Extends: DOMEventStream,
    Implements: [Options],
    initialize: function(key, target, options){
      this.key = key;
      this.setOptions(options);
      this.parent(target);
      this.on("keydown:keys(" + key + ")");
    }
  });

  DOMEventStream.Keyboard = KeyboardEventStream;

  return {
    DOM: DOMEventStream
  };
});
