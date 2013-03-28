(function( window ) {
  'use strict';

  define(['triforce'], function($3){

    return $3.Triad(function(controller, model, view){

      view.wraps("#new-todo");

      view.defineState("readyForInput", function(){
        this.set("value", "");
      });

      controller.convertsValue(function(value){
          return view.get("value")[0].trim();
        }).rejectsValue(function(value){
          return value.length == 0;
        }).respondsWith(function(value){
          return {
            id: new Date().getTime(),
            title: value,
            completed: false
          }
        }).
        save().
        then(function(todo){
          console.log("saved");
        });

    });

  });

})(window);
