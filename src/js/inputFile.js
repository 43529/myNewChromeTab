let userData = {
  background: '',
};
function initData() {
  userData = {
    background: '',
  };
}
function getDataFromChrome() {
  return new Promise(resolve => {
    chrome.storage.sync.get(null, res => {
      if (res.background) {
        userData = res;
      } else {
        initData();
      }
      resolve(res);
    });
  })
}
function saveDataToChrome() {
  return new Promise(resolve => {
    chrome.storage.sync.set(userData, function () {
      resolve("背景设置成功");
    });
  })
}
const changePic = function () {
  const reader = new FileReader();
  let f = document.getElementById("fileInput").files[0];
  reader.readAsDataURL(f);
  reader.onload = function () {
    userData.background = this.result;
    saveDataToChrome().then(res => console.log(res));
    setBackgroundPic();
  };
};
const setBackgroundPic = function () {
  getDataFromChrome().then(res => console.log(res));
  if (userData.background) {
    document.body.style.backgroundImage =
      "url(" + userData.background + ")";
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
