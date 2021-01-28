// import $ from "C:/Users/34611/Documents/myNewChromeTab/node_modules/jquery/dist/jquery";
// let $ = require('jquery');
let template = ``;
let userData = {
  list: [],
};
// function output() {
//   let li = $(".link-list").length;
//   console.log(li);
// }
// output();
// 初始化userData
function initData() {
  userData = {
    list: [],
  };
}
//从chrome中读取和向chrome中保存数据
function getDataFromChrome() {
  // 注意这个函数是异步函数,暂时还没有什么问题，后续记得优化
  chrome.storage.sync.get(null, (res) => {
    if (res.list) {
      userData = res;
    } else {
      initData();
    }
    console.log(userData)
    renderTemplate();
  });
}
function saveDataToChrome() {
  chrome.storage.sync.set(userData, function () {
    console.log(userData);
    console.log("添加成功");
  });
}
// function generateTemplate(newLink) {
//   template += newLink;
//
//   // console.log(template);
//   return template;
// }
function renderTemplate() {
  let item = "";
  template = ``;
  for (let i = 0; i < userData.list.length; i++) {
    item =
      `<li class="link-item"><a href="` +
      userData.list[i].url +
      `">` +
      userData.list[i].name +
      `</a></li>`;
    template += item;
  }
  document.getElementById("link-list").innerHTML = template;
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
  // generateTemplate(link);
  renderTemplate();
}
function addNewLink() {
  const link = document.querySelectorAll(".popup-content-item-input");
  const linkName = link[0].value;
  const linkUrl = link[1].value;
  console.log(userData);
  userData.list.push({
    name: linkName,
    url: linkUrl,
  });
  saveDataToChrome();
  // getDataFromChrome();
  // const newLink =
  //   `
  //   <li class="link-item"><a href="` +
  //   linkUrl +
  //   `">` +
  //   linkName +
  //   `</a></li>
  // `;
  // return newLink;
}
// -----------------------------------------------------------------------------
// saveDataToChrome();
getDataFromChrome();
console.log(userData)
document.getElementById("add-link-button").addEventListener("click", showModal);
document
  .getElementById("popup-content-button-cancel")
  .addEventListener("click", hideModal);
document
  .getElementById("popup-content-button-confirm")
  .addEventListener("click", confirm);
