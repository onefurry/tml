var editdata = {
  name: '',
  key: ''
};
var gamedata = {};

var loadGame = function () {
  rh.load(editdata.name, function (data) {
    gamedata = data;
    document.body.innerHTML = gamedata;
  });
}

// Main entry point for the game - responsible for handling the start screen.
var editor = function () {
  var form_startscreen = {
    name: '#game-name',
    key: '#game-key'
  };
  form('#new-game', form_startscreen, function (data) {
    rh.create(data.name, data.key, function (error) {
      if (error) alert("That name is taken or invalid.");
      else {
        editdata.name = data.name;
        editdata.key = data.key;
        loadGame();
      }
    });
  });
  form('#load-game', form_startscreen, function (data) {
    rh.check(data.name, data.key, function (error) {
      if (error) alert("That name+key combination is invalid.");
      else {
        editdata.name = data.name;
        editdata.key = data.key;
        loadGame();
      }
    });
  });
};
