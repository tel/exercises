/* global module:true */

module.exports = function flattenThunks(thunk) {
  return function(cb) {
    function flattener(err, result) {
      if (typeof result === "function") {
        result(flattener);
      } else {
        cb(err, result);
      }
    }
    thunk(flattener);
  };
};
