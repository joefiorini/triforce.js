define(['events/dom', 'mootools-core'], function(Events){
  var Controller = new Class({
    initialize: function(view){
      this.view = view;
      this.el = view.el;
      this.subscribed = [];
    },
    when: function(eventName){
      return new Events.DOM(this.el).on(eventName);
    }
  });

  return Controller;
});


