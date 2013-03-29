// define(['event'], function(_,Event){

//   var Evented = new Class({
//     Implements: [Events],
//     trigger: function(){
//       this.fireEvent("change");
//     }
//   });

//   module("$3.Event");

//   test("binds to events using promise-style callbacks", function(assert){
//     var called = false,
//         obj = new Evented(),
//         subscribe = new Event(obj).on("change");

//     subscribe.onValue(function(){
//       called = true;
//     });

//     obj.trigger();

//     assert.ok(called, "event was triggered");

//   });

//   test("stays bound after firing", function(assert){
//     var called = 0,
//         obj = new Evented(),
//         subscribe = new Event(obj).on("change");

//     subscribe.onValue(function(){
//       called++;
//     });

//     obj.trigger();
//     obj.trigger();

//     assert.equal(called, 2, "handler called twice");

//   });

// });
