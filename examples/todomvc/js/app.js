(function( window ) {
  'use strict';

  define('todomvc', ['triforce', 'features/new-todo', 'models/todos'], function($3, NewTodo, Todos){

    var NewTodo = require("features/new-todo"),
        Todos = require("models/todos");

    var todos = new Todos();

    // Bind features to model & entry point (event or URI)

    $3(NewTodo, todos, $3.DOM.enterKey);

    return {
      NewTodo: NewTodo
    };
  });

})( window );
