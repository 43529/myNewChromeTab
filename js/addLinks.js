// 函数定义
let template = ``;

function generateTemplate(newLink) {
  template += newLink;

  console.log(template);
  return template;
}
function renderTemplate() {
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
  const link = addNewLink();
  generateTemplate(link);
  renderTemplate();
}
function addNewLink() {
  const link = document.querySelectorAll(".popup-content-item-input");
  const linkName = link[0].value;
  const linkUrl = link[1].value;
  const newLink =
    `
    <li class="link-item"><a href="` +
    linkUrl +
    `">` +
    linkName +
    `</a></li>
  `;
  return newLink;
}
// 执行
renderTemplate();
document.getElementById("add-link-button").addEventListener("click", showModal);
document
  .getElementById("popup-content-button-cancle")
  .addEventListener("click", hideModal);
document
  .getElementById("popup-content-button-confirm")
  .addEventListener("click", confirm);
