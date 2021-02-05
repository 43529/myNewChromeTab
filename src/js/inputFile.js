const changePic = function () {
  const reader = new FileReader();
  let f = document.getElementById("fileInput").files[0];
  reader.readAsArrayBuffer(f);
  reader.onload = function () {
    let blob = new Blob([reader.result]);
    localStorage.background = window.URL.createObjectURL(blob);
    setBackgroundPic();
  };
};
//
const setBackgroundPic = function () {
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

setBackgroundPic();
document.getElementById("fileInput").onchange = function () {
  changePic(this);
};
document.getElementById("search-button").onclick = search;
