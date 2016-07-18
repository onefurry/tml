// Shows a single .screen and hides the previously shown one.
var showScreen = function (q) {
  document.querySelector('.screen.show').classList.remove('show');
  document.querySelector(q).classList.add('show');
};

// Creates a representation of a 'form' that will return the value of the
// elements specified in 'params' as an object.
var form = function (button, params, cb) {
  document.querySelector(button).onclick = function () {
    cb(objmap(params, function (param) {
      return document.querySelector(param).value;
    }));
  };
};

// Creates a button inside of an <li>.
var libtn = function (name, cb) {
  var setButtonListed = document.createElement("li");
  var setButton = document.createElement("button");
  setButton.innerHTML = name;
  setButton.onclick = cb;
  setButtonListed.appendChild(setButton);
  return setButtonListed;
}
