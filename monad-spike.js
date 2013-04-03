var Greeter = function(){
};

var Gproto = Greeter.prototype;

Gproto.say = function(phrase){
  return new Greetz(function(name){
    console.log(phrase + " " + name);
  });
};

Gproto.to = function(name){
};

var Greetz = function(gfunc){
  this.gfunc = gfunc;
}

var Gzproto = Greetz.prototype;

Gzproto.to = function(name){
  return new Greetz(function(punc){
    this.gfunc(name + punc);
  }.bind(this));
}

Gzproto.excitedly = function(){
  return new Greetz(function(){
    this.gfunc("!");
  }.bind(this));
}

Gzproto.normally = function(){
  return new Greetz(function(){
    this.gfunc(".");
  }.bind(this));
}

Gzproto.sheepishly = function(){
  return new Greetz(function(){
    this.gfunc("?");
  }.bind(this));
}

Gzproto.now = function(){
  this.gfunc();
}

new Greeter().say("hello").to("joe").excitedly().now();
new Greeter().say("hello").to("joe").normally().now();
new Greeter().say("hello").to("joe").sheepishly().now();
