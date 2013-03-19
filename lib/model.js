define(["mootools-core"], function(){
  var Model = new Class({
    initialize: function(attrs){
      this.decorate(attrs);
    },
    decorate: function(obj){
      Object.append(this, obj);
    }
  });

  return Model;
});
