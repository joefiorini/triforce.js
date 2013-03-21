// define(['controller', 'mootools-core'], function(Controller){

//   var el, view, called, controller;

//   module("$3.Controller", {
//     setup: function(){
//       el = $("qunit-fixture");
//       view = { el: el };
//       controller = new Controller(view);
//       called = false;
//     }
//   });

//   test("delegates its el to view's el", function(assert){
//     assert.equal(controller.el, el);
//   });

//   test("subscribes to events on view's el", function(assert){

//     controller.when('click').onValue(function(){
//       called = true;
//     });

//     view.el.fireEvent('click');

//     assert.equal(called, true, "view's click event triggered on controller");
//   });

//   test("can map event subscriptions", function(assert){

//     controller.when('keyDown').mapTo(function(e){
//       return e.key;
//     }).onValue(function(value){
//       assert.equal(value, ['e']);
//     });

//     el.fireEvent('keyDown', { key: 'e' });
//   });

// });
