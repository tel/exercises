/* global module:true */

function Middleware() {
  this._uses = [];
}

/* @param {Exists r. Function[Function[Unit, r], r]} fn - Function is passed a
 * callback to pass control to after completing its work. Bound to the
 * Middleware context passed through the whole chain.
 */
Middleware.prototype.use = function use(fn) {
  this._uses.push(fn);
};

Middleware.prototype.go = function go(fin) {
  var obj = {};
  this._uses.reduceRight(
    function(cb, fn) {
      return fn.bind(obj, cb)
    },
    fin.bind(obj)
  )();
  return obj;
}

module.exports = Middleware;
