/* global module:true */

function ensureArray(thing) {
  return [].slice.call(thing);
}

module.exports = function debounce(fn, threshold) {
  var callAfter = new Date() + threshold;
  var calling = null;

  return function () {
    var args = ensureArray(arguments);
    var now = new Date();

    if (calling) {
      calling = { self: this, args: args };
    } else {
      if (now > callAfter) {
        callAfter = new Date() + threshold;
        fn.apply(this, args);
      } else {
        calling = { self: this, args: args };
        setTimeout(function () {
          fn.apply(calling.self, calling.args);
          calling = null;
          callAfter = new Date() + threshold;
        }, threshold);
      }
    }
  };
};
