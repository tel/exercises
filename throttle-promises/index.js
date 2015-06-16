
module.exports = function throttlePromises(n, promiseThunks) {
  var total = promiseThunks.length;
  var limit = n;
  var out = new Array(total);
  var queue = promiseThunks.map(function (x, ix) { return { ix: ix, val: x } });
  var resolved = 0;

  return new Promise(function (resolve) {
    function startThunk() {
      if (limit > 0) {
        limit -= 1;
        var thunk = queue.shift();
        if (thunk) {
          thunk.val().then(function (result) {
            out[thunk.ix] = result;
            resolved += 1;
            limit += 1;
            if (resolved >= total) {
              resolve(out);
            } else {
              startThunk();
              return;
            }
          });
          return;
        } else {
          return;
        }
      } else {
        return;
      }
    }

    var i;
    for (i = 0; i <= n; i++) {
      startThunk();
    }
  });

};
