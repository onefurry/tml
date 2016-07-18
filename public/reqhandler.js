var rh = {
  request: function (url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      cb(xhr.responseText);
    };
    xhr.open("GET", url);
    xhr.send();
  },
  check: function (name, key, cb) {
    rh.request("/k/" + name + "?key=" + key, function (data) {
      cb(data == 'true');
    });
  },
  save: function (name, key, data) {
    rh.request("/s/" + name + "?key=" + key + "&data=" + encodeURI(data),
      function () {});
  },
  create: function (name, key, data, cb) {
    rh.request("/c/" + name + "?key=" + key + "&data=" + encodeURI(data),
      function (res) {
      cb(res == "ALREADY EXISTS");
    });
  }
};
