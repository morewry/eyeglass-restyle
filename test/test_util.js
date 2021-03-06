"use strict";

var util = require("../lib/util");
var assert = require("assert");

describe("#isEqual", function() {
  var mapA1 = new Map();
  mapA1.set("a", 1);
  var mapA2 = new Map();
  mapA2.set("a", 1);
  var mapA3 = new Map();
  mapA3.set("a", 1);
  mapA3.set("b", 1);
  var mapB = new Map();
  mapB.set("a", 2);
  var mapC = new Map();
  mapC.set("a", [1,2,3]);
  var mapD1 = new Map();
  mapD1.set("a", mapA1);
  var mapD2 = new Map();
  mapD2.set("a", mapA2);
  var mapD3 = new Map();
  mapD3.set("a", mapB);

  var tests = [
    {
      values: [true, true],
      isEqual: true
    },
    {
      values: [false, false],
      isEqual: true
    },
    {
      values: [true, false],
      isEqual: false
    },
    {
      values: [true, "true"],
      isEqual: false
    },
    {
      values: ["", ""],
      isEqual: true
    },
    {
      values: ["abc", "abc"],
      isEqual: true
    },
    {
      values: ["abc", "def"],
      isEqual: false
    },
    {
      values: [[], []],
      isEqual: true
    },
    {
      values: [[1,2,3], [1,2,3]],
      isEqual: true
    },
    {
      values: [[1,2,3], [4,5,6]],
      isEqual: false
    },
    {
      values: [[1,2,3], []],
      isEqual: false
    },
    {
      values: [{}, {}],
      isEqual: true
    },
    {
      values: [{a: true}, {a: true}],
      isEqual: true
    },
    {
      values: [{a: true}, {a: false}],
      isEqual: false
    },
    {
      values: [{a: true}, {a: true, b: true}],
      isEqual: false
    },
    {
      values: [mapA1, mapA1],
      isEqual: true
    },
    {
      values: [mapA1, mapA2],
      isEqual: true
    },
    {
      values: [mapA1, mapA3],
      isEqual: false
    },
    {
      values: [mapB, mapC],
      isEqual: false
    },
    {
      values: [mapD1, mapD2],
      isEqual: true
    },
    {
      values: [mapD1, mapD3],
      isEqual: false
    },
    {
      values: [mapA1, {a: 1}],
      isEqual: false
    }
  ];

  tests.forEach(function(test) {
    var a = test.values[0];
    var b = test.values[1];
    var message = "`" + (a instanceof Map ? "Map" : JSON.stringify(a)) + "` is " + (test.isEqual ? "" : "not ") + "equivalent to `" + (b instanceof Map ? "Map" : JSON.stringify(b)) + "`";
    it(message, function() {
      assert.equal(util.isEqual(a, b), test.isEqual);
    });
  });
});

describe("#strSubstitute", function() {
  it("should work with an object", function() {
    var result = util.strSubstitute("{a}", {
      a: 1
    });
    assert.equal("1", result);
  });
});
