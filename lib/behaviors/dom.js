define(['behavior', 'utils'], function(Behavior, Utils){

  var partial = Utils.partial;

  function keyboard(key){
    return "keydown:keys(" + key + ")";
  }

  function domBehavior(evt, selector){
    return new Behavior(function(next, error, complete){
      $$(selector).addEvent(evt, next);
    });
  }

  return {
    click: partial(domBehavior, "click"),
    change: partial(domBehavior, "change"),
    mouseEnter: partial(domBehavior, "mouseenter"),
    mouseLeave: partial(domBehavior, "mouseleave"),
    enterKey: partial(domBehavior, keyboard("enter"))
  };

});

