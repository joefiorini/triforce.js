(function(window){
  'use strict';

  define(['triforce'], function($3){

    var TodoStorage = {
      loadAll: function(){
        var todos = window.localStorage.getItem("todos")
        if(todos){
          todos = JSON.parse(todos);
        }
        return todos;
      },
      load: function(id, todos){
        var todos = (todos || this.loadAll());
        return todos.filter(function(todo){
          todo.id == id;
        })[0];
      },
      create: function(todo){
        var todos = loadAll();
        todos.push(todo);
        window.localStorage.setItem("todos", JSON.stringify(todos));
      },
      save: function(todo){
        var todos = TodoStorage.loadAll() || [],
            candidate = todos.filter(function(item){
              return item.id === todo.id;
            });

        todos.erase(candidate);
        todos.push(todo);
        window.localStorage.setItem("todos", JSON.stringify(todos));
      }
    }

    return {
      findAll: TodoStorage.loadAll,
      save: TodoStorage.save,
      create: TodoStorage.create,
      find: TodoStorage.load
    };

  });

})(window);
