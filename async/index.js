
module.exports = {
  sequence: function (fns) {
    function f0(cb, i, e) { cb(e, i); }
    function step(total, fn) {
      return function (cb, i) {
        return fn(function (e, x) {
          e ? cb(e, null) : total(cb, x);
        }, i);
      }
    }
    return fns.reduceRight(step, f0);
  },
  parallel: function (fns) {
    return function (cb) {
      var count = 0;
      var returned = false;
      var total = fns.length;
      var result = new Array(total);
      fns.forEach(function (fn, ix) {
        fn(function(err, val) {
          if (!returned) {
            if (err) {
              returned = true;
              cb(err, null)
            } else {
              count += 1;
              result[ix] = val;
              if (count >= total) {
                returned = true;
                cb(null, result);
              }
            }
          }
        });
      });
    };
  },
  race: function (fns) {
    return function (cb) {
      var returned = false;
      fns.forEach(function (fn) {
        fn(function (err, val) {
          if (!returned) {
            returned = true;
            cb(err, val);
          }
        });
      });
    };
  },
}
