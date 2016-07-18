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
      cb(data === 'false');
    });
  },
  save: function (name, key, data) {
    rh.request("/s/" + name + "?key=" + key + "&data=" + encodeURI(data),
      function () {});
  },
  create: function (name, key, cb) {
    // This is the default game data.
    var data = {
      title: "Untitled",
      lists: {},
      numbers: {},
      startpoint: "main/start",
      sets: {
        main: {
          pages: {
            start: {
              text: [
                {
                  text: "Welcome to the TML Editor! This is the start page " +
                        "of the game! You can link it to other pages or sets!"
                },
                {
                  text: "Nice! You've set x to 1!",
                  only_ifeq: ['x', 1]
                }
              ],
              links: [{
                label: "Set x to 1.",
                only_ifeq: ['x', 0],
                actions: [
                  {
                    type: 'set',
                    on: 'x',
                    val: 1
                  }
                ]
              }]
            }
          }
        }
      }
    };
    rh.request("/c/" + name + "?key=" + key + "&data=" + encodeURI(JSON.stringify(data)),
      function (res) {
      cb(res === "ALREADY EXISTS");
    });
  },
  load: function (name, cb) {
    rh.request("/d/" + name, function (res) {
      cb(JSON.parse(res));
    });
  }
};
