(function(window){
  'use strict';

  define(['triforce'], function($3){

    var sync = new $3.Sync(function(sync){

      sync.loadAll = function(){
        var todos = window.localStorage.getItem("todos");
        if(todos){
          todos = JSON.parse(todos);
        }
        return todos;
      };

      sync.load = function(id, todos){
        todos = (todos || this.loadAll());
        return todos.filter(function(todo){
          return todo.id === id;
        })[0];
      };

      sync.create = function(todo){
        var todos = sync.loadAll();
        todos.push(todo);
        window.localStorage.setItem("todos", JSON.stringify(todos));
      };

      sync.save = function(todo){
        var todos = sync.loadAll() || [],
            candidate = todos.filter(function(item){
              return item.id === todo.id;
            });

        todos = _(todos).without(candidate).union([todo]);
        window.localStorage.setItem("todos", JSON.stringify(todos.value()));
      };

    });

    return sync;

  });

})(window);
