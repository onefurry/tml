var player = function (data) {
  document.querySelector("#pagebody").innerHTML = data.title;
  document.title = data.title;
  document.querySelector("#gametitle").innerHTML = data.title;
};
