define(["model"], function(Model){

  var person = new Model({
    firstName: "Bob",
    lastName: "Belcher"
  });

  test("can decorate model with additional attributes", function(assert){
    person.decorate({
      fullName: function(){
        return this.firstName + " " + this.lastName;
      }
    });

    assert.equal(person.fullName(), "Bob Belcher", "fullName is accessible on model");

  });
});
