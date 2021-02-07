import $ from "jquery"
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

function renderTemplate() {
  let item = "";
  template = ``;
  for (let i = 0; i < userData.list.length; i++) {
    item =
      `<li class="link-item"><button class="item-del-button">X</button><a href="` +
      userData.list[i].url +
      `">` +
      userData.list[i].name +
      `</a></li>`;
    template += item;
  }
  document.getElementById("link-list").innerHTML = template;
  addId();
  let list = document.getElementsByClassName("link-item");
  for(let i=0;i<list.length;i++) {
    list[i].lastChild.addEventListener("click", deleteLink);
  }
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
  $(".link-item").each(function () {
    $(this).attr('index', $(this).index());
  })
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

