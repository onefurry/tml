var editdata = {
  name: '',
  key: ''
};
var gamedata = {};

var saveGame = function () {
  rh.save(editdata.name, editdata.key, gamedata);
};

var showSet = function (set) {
  var s = gamedata.sets[set];
  for (var page in s) (function(page) {
    alert(page);
  })(page);
};

var loadGame = function () {
  rh.load(editdata.name, function (data) {
    gamedata = data;
    showScreen('#main');
    document.querySelector("#start-screen").value = gamedata.startpoint;
    for(set in gamedata.sets) (function(set) {
      document.querySelector("#screen-sets").appendChild(libtn(set, function() {
        showSet(set);
      }));
    })(set);
    document.querySelector("#screen-sets").appendChild(libtn("+", function () {
      var name;
      if(name = prompt("Enter the name for the set:")) {
        alert("Made Set! x3")
      }
    }));
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
