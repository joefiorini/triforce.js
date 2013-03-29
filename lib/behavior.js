define(['utils', 'prime'], function(Utils, prime){

  function noop() { }

  var Behavior = prime({
    constructor: function(subscribe, name){
      this.name = name || "behavior";
      this.subscribe = subscribe;
      this.done = false;
    },
    map: function(fn){
      return new MapBehavior(this, fn);
    },
    reject: function(fn){
      return new RejectBehavior(this, fn);
    },
    run: function(fn){
      return new FunctionBehavior(this, fn);
    },
    convert: function(fn){
      return new ConvertBehavior(this, fn);
    },
    onValue: function(next, error, complete){
      var nexts = new NextAction(this, next || noop),
          errored = new ErrorAction(this, error || noop),
          completed = new CompletedAction(this, complete || noop);

      this.subscribe(nexts.call, errored.call, completed.call);
    }
  });

  var NextAction = prime({
    constructor: function(parent, subscriber){
      this.call = Utils.partial(this.call, parent, subscriber);
    },
    call: function(parent, subscriber, value){
      if(!parent.parent.done){
        subscriber(value);
      }
    }
  });


  var ErrorAction = prime({
    constructor: function(parent, subscriber){
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

  var CompletedAction = prime({
    constructor: function(parent, subscriber){
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


  var MapBehavior = prime({
    inherits: Behavior,
    constructor: function(parent, mapFn){

      this.name = "MapBehavior";
      this.done = false;
      this._parent = parent;
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

  var RejectBehavior = prime({
    inherits: Behavior,
    constructor: function(parent, fn){
      this.name = "RejectBehavior";
      this.done = false;
      this._parent = parent;
      this.subscribe = function(next, error, completed){
        var counter = 0;
        function incr(){
          return counter++;
        }
        var doReject = Utils.partial(this.doReject, fn, next, incr);
        return parent.subscribe(doReject, error, completed);
      };
    },
    doReject: function(fn, next, incr, value){
      var condition = fn(value, incr());
      if(!condition){
        next(value);
      }
    }
  });

  var FunctionBehavior = prime({
    inherits: Behavior,
    constructor: function(parent, fn){
      this.name = "FunctionBehavior";
      this.done = false;
      this._parent = parent;
      this.subscribe = function(next, error, completed){
        var doCall = Utils.partial(this.doCall, fn, next);
        return parent.subscribe(doCall, error, completed);
      };
    },
    doCall: function(fn, next, value){
      next(fn(value));
    }
  });

  var ConvertBehavior = prime({
    inherits: Behavior,
    constructor: function(parent, fn){
      this._parent = parent;
      var subscribe = function(next, error, completed){
        var doMerge = Utils.partial(this.doMerge, fn, next, error, completed);
        return parent.subscribe(doMerge, error, completed);
      };
      this.parent(subscribe, "ConvertBehavior");
    },
    doMerge: function(fn, next, error, completed, value){
      var newB = fn(value);
      newB.subscribe(next, error, completed);
    }
  });

  return Behavior;
});
