define(['bacon', 'gator', 'jwerty'], function(Bacon, Gator, jwerty){

  var asEventStream = Bacon.$.asEventStream;

  var click = function(selector){
    return asEventStream.call(Gator(selector), "click");
  };

  var enterKey = function(selector){
    return asEventStream.call(Gator(selector), "keydown").filter(function(e){
      return jwerty.is("enter", e);
    });
  };

  return {
    click: click,
    enterKey: enterKey
  };

});

