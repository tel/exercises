/* global module:true */

function cloneAry(ary) {
  var out = [];
  var ix;
  for (ix in ary) {
    out.push(ary[ix]);
  }
  return out;
}

function _curry(args, fn) {
  return function () {
    var k;
    var newArgs = cloneAry(args);
    console.log(args);
    for (k in arguments) {
      newArgs.push(arguments[k]);
    };
    if (newArgs.length >= fn.length) {
      return fn.apply(this, newArgs);
    } else {
      return _curry(newArgs, fn);
    }
  };
};

module.exports = function curry (fn) {
  return _curry([], fn);
}
