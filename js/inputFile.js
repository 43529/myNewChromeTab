const changepic = function () {
  const reader = new FileReader();
  f = document.getElementById("fileInput").files[0];
  reader.readAsDataURL(f);
  reader.onload = function (e) {
    localStorage.background = this.result;
    setBackgourndPic();
  };
};
const setBackgourndPic = function () {
  if (localStorage.background) {
    document.body.style.backgroundImage =
      "url(" + localStorage.background + ")";
    document.body.style.backgroundSize = "100% 100%";
  }
};
const search = function () {
  const searchContent = document.getElementById("search-input").value;
  console.log(searchContent);
  const href = "https://www.baidu.com/s?word=" + searchContent;
  window.location.replace(href);
};

setBackgourndPic();
document.getElementById("fileInput").onchange = function () {
  changepic(this);
};
document.getElementById("search-button").onclick = search;
