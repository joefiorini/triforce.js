define(['controller', 'mootools-core'], function(Controller){

  test("delegates its el to view's el", function(assert){

    var el = $("qunit-fixture"),
        view = { el: el },
        controller = new Controller(view);

    assert.equal(controller.el, el);
  });

  test("subscribes to events on view's el", function(assert){

    var el = $("qunit-fixture"),
        view = { el: el },
        called = false,
        controller = new Controller(view);

    controller.when('click').onValue(function(){
      called = true;
    });

    view.el.fireEvent('click');

    assert.equal(called, true, "view's click event triggered on controller");
  });

});
