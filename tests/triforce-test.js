define(['triforce'], function($3){

  module("Triforce Root API Tests");

  test("$3 is an object", function(assert){
    assert.equal(typeof $3, "object", "$3 is a valid object");
  });

  test("$3 has valid type functions", function(assert){
    assert.equal(typeof $3.Triad, "function", "$3.Triad is a function");
  });

});
