// Hack in a map() function for objects.
var objmap = function (obj, func) {
  var result = {};
  Object.keys(obj).forEach(function (key) {
    if (obj.hasOwnProperty(key)) result[key] = func(obj[key]);
  });
  return result;
};
