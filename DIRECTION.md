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

## Eventual Support.todo

Eventually Triforce.js needs to support the following features:

- Wiring up a controller, model to an "entry point" (URL or DOM event) @done
- Rendering templates via an engine-specific "render"
- Specifying templates via HTML elements
- Models as anonymous objects with a specified "sync" function (to connect to ajax, localstore, whatever)
- Implicit creation of primary objects @done
- Feature-based organization as a core principle @done
- Side-loading templates from model "sync" object
- Declaring view states via entry/exit functions

## Basic Usage

```javascript
// A feature is a $3.triad; a small MVC grouping
App.TaskInput = $3.Triad(function(model, view, controller){

  model.decorate({
    title: $3.elementValue("new-todo") // creates a "value" binding to element with id "task-input"
  });

  controller.on($3.keyBehavior("enter", { down: true })).        // binds to keydown of view's element
    mapTo(function(){                                 // maps stream values to new model instances
      return {
        id: id,
        title: model.title.map(".trim"),
        complete: false
      }
    }).
    onValue(function(){
      model.save();
    }).                         // Called once the value stream is complete
    also(function(view){ view.set("value", ""); });   // Called in parallel to the event binding

  view.wrap("new-todo");  // for wrapping existing dom elements

});

// Define a custom m/v/c object for a triad
//  App.TaskInput.define("controller", ...) vs.
//  App.TaskInput.classFor("controller", ...) vs.
//  App.TaskInput.controllerClass({ });

App.TaskInput.classFor("controller", {
  loadTask: function(task){
    this.redirectTo("/tasks/" + task.id);
  }
});

// Tie together a model (resource), triad and (optional) URL or .el
$3(App.TaskInput, App.Task, { new: true });
$3(App.TaskList, App.Task, "/tasks");
```

## Konami Code
```javascript
App.Konami = function(controller){
var sequence = ["up", "up", "down", "down", "left", "right", "left", "right", "b", "a"];
controller.on($3.keyBehavior({ up: true })).
  mapTo(function(e) { e.key }).
  first(10).
  where(function(x){ x.equals(sequence) }).
  onValue(function(){
    $("result").html("KONAMI!");
  });
}

$(App.Konami, document);
```

## Show Form
```javascript
App.ShowForm = function(controller,_,view){

  // controller.doAjax => AjaxBehavior, ".href" => select href from view's el
  controller.
    on($3.clickBehavior("[data-action=show-form]").
    mapTo(function(e){ return e.target.get("href"); }).
    selectFrom(function(href){
      return $3.ajaxBehavior(href).mapTo(function(res){
        return res.templates.task_form;
      })
    }).
    onValue(function(form){
      view.adopt(form);
    });
}

$3(App.ShowForm, App.ServerTemplates, "[data-container-name=task-form-container]");
```

## New Ideas (22-03-2013)

```javascript

$3.Triad(App.ShowForm, function(controller, model, view){

  // Need some way to make views declarative;
  //  starting out with state definitions

  var invalidField = $3.viewState({
    on: function(message, el){
      el = jQuery(el); // wrap with jQuery to make translating easier
      var message = el.wrap("<small>").text(message).addClass("error").addClass(el.className);
      el.addClass("red").after(message);
    },
    off: function(el){
      el = jQuery(el);
      el.removeClass("red").next("small").remove();
    }
  });

  view.defineState("error", {
    "form :input": invalidField
  });

  controller.click("button.go-back").
    mapTo(function(){
      return $3.routeUrlFor(App.Root);
    });
    onValue($3.navigate);

  var stripeRequest = $3.ajaxBehavior(...);

  var product = $3.modelFor(App.Product);

  controller.submit("form").
    mapTo(function(form){
        return {
          params: {
            number: view.$(".card-number").val(),
            cvc: view.$(".card-cvc").val(),
            exp_month: view.$(".card-expiry-month").val(),
            exp_year: view.$(".card-expiry-year").val(),
            name: view.$("#customer_name").val(),
            email: view.$("#customer_email").val(),
          },
          amount: product.cost
        }
    }).
    convertTo(function(req){
        return $3._.stripeTokenBehavior(req.params, req.amount);
    }).
    onValue(...

  /*
    the previous line is the same as:
    onValue(function(value){
     $3.navigate(value);
    }
    because the map before it returns the url,
    it gets passed to onValue
  */
});

// Routes - tie together a triad, model and uri and/or DOM container
$3.Routes(function(){
  $3(App.Root, { url: "", container: $3.container("buy-container") });
  $3(App.ShowForm, App.UserTest, $3.container("task-form-container"));
  $3(App.PurchaseForm, App.Customer, { url: "buy", container: $3.container("buy-container")});
});
