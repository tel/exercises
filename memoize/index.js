
function ensureArray(thing) {
  return [].slice.call(thing);
}

module.exports = function memoize(fn) {
  var table = {};
  return function () {
    var args = ensureArray(arguments);
    if (table[args]) {
      return table[args];
    } else {
      var result = fn.apply(null, args);
      table[args] = result;
      return result;
    }
  };
};
