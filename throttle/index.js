/* global module:true */

function ensureArray(thing) {
  return [].slice.call(thing);
}

module.exports = function throttle(fn, timeout) {
  // truthy iff call is pending
  var pendingCall = null;

  var handle = setInterval(function () {
    if (pendingCall) {
      fn.apply(pendingCall._this, pendingCall._args);
      pendingCall = null;
    } else {
      return;
    }
  }, timeout)

  return function() {
    var args = ensureArray(arguments);
    pendingCall = { _this: this, _args: args };
  };
};
