(function( window ) {
  'use strict';

  define('todomvc', ['triforce', 'models/todos', 'features/new-todo'], function($3, Todos, NewTodo){

    // Bind features to model & entry point (event or URI)
    $3(NewTodo, Todos, $3.DOM.enterKey);

    return {
      NewTodo: NewTodo
    };
  });

})( window );
