# Triforce.js

## Goals

  A much simpler approach to Javscript MVC for small-medium sized web sites. Allows for lightweight data structures for models, minimal state decoupled from behavior, organized by features instead of object-type. As much as possible, removes the need to think in terms of language features, and instead allows implementors to think in terms of features and user behaviors.

    - can be used to adapt existing DOM or
    - render client-side templates
    - Small model/view/controller triads ($3.triad)
    - Models can be "global" data structures, or
      models wrapped with ViewModel proxies
    - Events are bound declaratively via streams
      and promises rather than imperative event
      bindings

## Basic Usage

```javascript
// A feature is a $3.triad; a small MVC grouping
App.TaskInput = $3.Triad(function(model, view, controller){

  model.decorate({
    title: $3.elementValue("new-todo") // creates a "value" binding to element with id "task-input"
  });

  controller.when("keydown:keys(enter)").        // binds to keydown of view's element
    with(function(){ new Date().getTime(); }).   // creates additional values to get passed to mapTo, in order called
    mapTo(function(id, model){                   // maps stream values to new model instances
      return {
        id: id,
        title: model.title.map(".trim"),
        complete: false
      }
    }).
    onValue(model.todoAdded).                         // Called once the value stream is complete
    also(function(view){ view.set("value", ""); });   // Called in parallel to the event binding

  view.wrap("new-todo");  // for wrapping existing dom elements

});

// Tie together a model (resource), triad and (optional) URL
$3(App.Task, App.TaskInput, { new: true });
$3(App.Task, App.TaskList, "/tasks");
```
