(function( window ) {
  'use strict';

  define('todomvc', ['triforce', 'features/new-todo', 'models/todos'], function($3, NewTodo, Todos){

    // Bind features to model & entry point (event or URI)

    $3(NewTodo, Todos, $3.DOM.enterKey);

    return {
      NewTodo: NewTodo
    };
  });

})( window );
