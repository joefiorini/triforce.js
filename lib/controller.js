define(['events/dom', 'behavior', 'mootools-core'], function(Events, Behavior){
  var Controller = new Class({
    initialize: function(view){
      this.view = view;
      this.el = view.el;
      this.subscribed = [];
      this.extraValuesQueue = [];
    },
    when: function(eventName){
      // var evt = Events.DOM(this.el).on(eventName);
      // return new Behavior(evt);
    }
  });

  return Controller;
});


