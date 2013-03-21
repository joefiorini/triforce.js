define(['event', 'utils', 'mootools-core'], function(Event, Utils){

  function noop() { }

  var Behavior = new Class({
    initialize: function(subscribe){
      this.name = "behavior";
      this.subscribe = subscribe;
      this.done = false;
    },
    map: function(fn){
      return new MapBehavior(this, fn);
    },
    onValue: function(next, error, complete){
      var nexts = new NextAction(this, next || noop),
          errored = new ErrorAction(this, error || noop),
          completed = new CompletedAction(this, complete || noop);

      this.subscribe(nexts.call, errored.call, completed.call);
    }
  });

  var NextAction = new Class({
    initialize: function(parent, subscriber){
      this.call = Utils.partial(this.call, parent, subscriber);
    },
    call: function(parent, subscriber, value){
      if(!parent.parent.done){
        subscriber(value);
      }
    }
  });


  var ErrorAction = new Class({
    initialize: function(parent, subscriber){
      var reset = function(error){
        subscriber(error);
        parent.parent.done = false; // reset done for next call
      };
      this.call = Utils.partial(this.call, parent, reset);
    },
    call: function(parent, subscriber, error){
      if(!parent.parent.done){
        parent.parent.done = true;
        subscriber(error);
      }
    }
  });

  var CompletedAction = new Class({
    initialize: function(parent, subscriber){
      var reset = function(){
        subscriber();
        parent.parent.done = false; // reset done for next call
      };
      this.call = Utils.partial(this.call, parent, reset);
    },
    call: function(parent, subscriber){
      parent.parent.done = true;
      subscriber();
    }
  });


  var MapBehavior = new Class({
    Extends: Behavior,
    initialize: function(parent, mapFn){

      this.name = "MapBehavior";
      this.done = false;
      this.parent = parent;
      this.subscribe = function(next, error, completed){
        var counter = 0;
        function incr(){
          return counter++;
        }
        var doMap = Utils.partial(this.doMap, mapFn, next, incr);
        return parent.subscribe(doMap, error, completed);
      };

    },
    doMap: function(fn, next, incr, value){
      var result = fn(value, incr());
      next(result);
    }
  });

  return Behavior;
});
