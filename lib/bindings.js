define(['events/dom', 'prime'], function(Event, prime){

  var ElementValue = prime({
    constructor: function(el){
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
