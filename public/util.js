// Hack in a map() function for objects.
Object.prototype.map = function (func) {
  var o = this, result = {};
  Object.keys(this).forEach(function (key) {
    if (o.hasOwnProperty(key)) result[key] = func(o[key]);
  });
  return result;
};
