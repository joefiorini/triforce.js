define(['events/dom'], function(Event){

  var ElementValue = new Class({
    initialize: function(el){
      this.el = el;
    },
    value: function(){
      return this.el.get("value");
    }
  });

  return {
    ElementValue: ElementValue
  };

});
