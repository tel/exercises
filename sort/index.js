
module.exports = function sort(ary) {
  if (ary.length <= 1) {
    return ary;
  } else {
    var pivot = ary.shift();
    var left = sort(ary.filter(function (x) { return x <= pivot; }));
    var right = sort(ary.filter(function (x) { return x > pivot; }));
    return left.concat([pivot], right);
  };
};
