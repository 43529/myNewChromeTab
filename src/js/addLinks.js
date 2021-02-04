// 会用原生写的地方直接用了原生，暂时不会用原生写的部分用了jQuery，之后再改成原生，如此重复
// import $ from "jquery"
let template = ``;
let userData = {
  list: [],
};
// 初始化userData
function initData() {
  userData = {
    list: [],
  };
}
function getDataFromChrome() {
  return new Promise(resolve => {
    chrome.storage.sync.get(null, res => {
      if (res.list) {
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
      resolve("保存成功");
    });
  })
}
// 渲染链接部分，绑定ID和删除button
function renderTemplate() {
  let item = "";
  template = ``;
  for (let i = 0; i < userData.list.length; i++) {
    item =
      `<li class="link-item"><a href="` +
      userData.list[i].url +
      `">` +
      userData.list[i].name +
      `</a><button>删除</button></li>`;
    template += item;
  }
  document.getElementById("link-list").innerHTML = template;
  addId();
  addButton();
}
function showModal() {
  document
    .getElementById("popup-background")
    .setAttribute("style", "visibility:visible;");
}
function hideModal() {
  document
    .getElementById("popup-background")
    .setAttribute("style", "visibility:hidden;");
}
function confirm() {
  document
    .getElementById("popup-background")
    .setAttribute("style", "visibility:hidden;");
  addNewLink();
  renderTemplate();
}
function addNewLink() {
  const link = document.querySelectorAll(".popup-content-item-input");
  const linkName = link[0].value;
  const linkUrl = link[1].value;
  // console.log(userData);
  userData.list.push({
    name: linkName,
    url: linkUrl,
  });
  saveDataToChrome().then(renderTemplate);
}
function deleteLink() {
  userData.list.splice(this.parentNode.getAttribute("index"), 1);
  saveDataToChrome()
      .then(getDataFromChrome)
      .then(renderTemplate);

}
function addId() {
  const link_list = document.getElementsByClassName("link-item")
  for(let i=0;i<link_list.length;i++) {
    link_list[i].setAttribute("index", i.toString());
  }
}
function addButton() {
  const list = document.getElementsByClassName("link-item");
  for(let i=0;i<list.length;i++) {
    list[i].lastChild.addEventListener("click", deleteLink);
  }
}
// -----------------------------------------------------------------------------
getDataFromChrome().then(renderTemplate);
document.getElementById("add-link-button").addEventListener("click", showModal);
document
  .getElementById("popup-content-button-cancel")
  .addEventListener("click", hideModal);
document
  .getElementById("popup-content-button-confirm")
  .addEventListener("click", confirm);

