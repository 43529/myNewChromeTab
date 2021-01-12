// 函数定义
let template = `<li class="link-item"><a></a></li>`
function addLink() {
    console.log('addlink func works!!');
    renderTemplate();
}
function generateTemplate() {
    let newLink = `<li class="link-item">新增链接</li>`
    template += newLink;
    console.log(template);
    return template
}
function renderTemplate() {
    document.getElementById("link-list").innerHTML = generateTemplate();
}
// 执行
document.getElementById("link-list").innerHTML = template;
document.getElementById("add-link-button").addEventListener("click",addLink);
