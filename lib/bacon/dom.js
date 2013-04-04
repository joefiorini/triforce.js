define(['bacon', 'gator'], function(Bacon, Gator){

  var click = function(selector){
    return Bacon.fromCallback(function(callback){
      Gator(selector).on("click", callback);
    });
  };

  Bacon.DOM = {
    click: click
  };

  return Bacon;

});