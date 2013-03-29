// define(['event', 'prime'], function(Event, prime){

//   var DOMEvent = prime({
//     inherits: Event
//   });

//   var KeyboardEvent = prime({
//     inherits: DOMEvent,
//     Implements: [Options],
//     initialize: function(key, target, options){
//       this.key = key;
//       this.setOptions(options);
//       this.parent(target);
//       this.eventName = "keydown:keys(" + key + ")";
//     }
//   });

//   DOMEvent.Keyboard = KeyboardEvent;

//   return {
//     DOM: DOMEvent
//   };
// });
