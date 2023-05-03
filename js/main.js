import { baseURL, pageStyle, flag } from "./settings.js";

// title 的动画
const title = document.querySelector(".title");
title.addEventListener("click", () => {
    title.classList.add("animate__animated", "animate__bounce");
    setTimeout(() => {
        title.classList.remove("animate__animated", "animate__bounce");
    }, 1000);
});

/** 显示当前时间 */

const dateArea = document.querySelector(".dateArea");   // 时间显示区域
const todoList = document.querySelector(".todo-list");  //  todo-list 区域

// 获取当前时间 (hour : minutes)
function currentTime() {
    const d = new Date();
    const HH = addZero(d.getHours());   // 获取时
    const MM = addZero(d.getMinutes());   // 获取分钟
    const currentTime = HH + ' : ' + MM;
    dateArea.innerHTML = `<li>${currentTime}</li > `;
}

// 时间格式化 (个位数在十位补零)
function addZero(num) {
    return num > 9 ? num : "0" + num;
}

// 点击时间，todo-list 下滑出现
dateArea.onclick = () => {
    // 清除之前点击 To-do Title 残留的动画类
    todoList.classList.remove("animate__animated", "animate__backOutUp");

    todoList.classList.toggle("move");
}

currentTime();
// 每半分钟刷新
setInterval(currentTime, 30000);

/** 搜索功能 */
const inp = document.querySelector(".search-txt");  //搜索框
const searchBtn = document.querySelector(".search-btn");  //搜索按钮
const inpClear = document.querySelector(".clear");  // 清空按钮
const searchBox = document.querySelector(".search-box"); // 搜索区域

searchBox.onmouseout = () => {
    inpClear.style.visibility = "hidden";
}

searchBox.onmouseover = () => {
    clearShow();
}

// 点击后清空输入框
inpClear.onclick = () => {
    inp.value = "";
    inpClear.style.visibility = "hidden";
}

// input中有内容时， 清空图标出现;反之，隐藏
function clearShow() {

    if (inp.value != "") {
        inpClear.style.visibility = "visible";
    } else {
        inpClear.style.visibility = "hidden";
    }

}

inp.onkeyup = (event) => {
    clearShow();

    if (inp.value != "") {
        // 回车搜索
        if (event.key == "Enter") {
            window.open(`${baseURL}${inp.value}`, pageStyle);

            if (flag == 1) {
                inp.value = "";
                flag = 0;
            }
        }
    }
}

// 点击搜索图标搜索
searchBtn.onclick = () => {
    if (inp.value != "") {
        window.open(`${baseURL}${inp.value}`, pageStyle);

        if (flag == 1) {
            inp.value = "";
            flag = 0;
        }
    }

}

/** Todo List */
const todoInp = document.getElementById("todo-input");  // 任务输入框
const list = document.querySelector(".list");
const prompt = document.querySelector(".Blank-prompt"); // 未添加任务时默认显示
const todoTitle = document.querySelector(".todo-title");

// 鼠标事件触发 To-do Title 的动画
todoTitle.onmouseover = () => {
    todoTitle.classList.add("animate__animated", "animate__pulse");
    setTimeout(() => {
        todoTitle.classList.remove("animate__animated", "animate__pulse");
    }, 1000);
}

// 点击 To-do Title 隐藏 To-do List
todoTitle.onclick = () => {
    todoList.classList.add("animate__animated", "animate__backOutUp");
    todoList.classList.toggle("move");
}

todoInp.onkeyup = (event) => {

    const todoItem = document.querySelectorAll(".todo-item");

    // 输入为空时，return
    if (todoInp.value == "") {
        return false;
    }

    // 回车事件
    if (event.key == "Enter") {
        prompt.style.display = "none";

        // 设定任务添加上限，防止溢出
        if (todoItem.length >= 5) {
            alert("任务数量已达上限！");
            return;
        }

        // 本地储存
        const todos = getTodos();
        todos.push(todoInp.value);
        localStorage.setItem("todos", JSON.stringify(todos));

        let li = document.createElement("li");          //在ul中创建li
        li.innerHTML = '<i class="fa-regular fa-circle" aria-hidden="true" id = "circle"></i>' + todoInp.value + '<i class="fa-regular fa-star" aria-hidden="true" id="star"></i>';
        li.classList.add("todo-item", "animate__animated", "animate__fadeInUp");
        list.insertAdjacentElement("afterbegin", li);

        // 给 check 图标加上需要的鼠标事件
        checkAction();

        starAction();

        todoInp.value = "";

    }
}

// window.onload 方法
window.onload = () => {
    // 重新加载时，读取并生成本地储存中的 Todo
    generateTodos();

    linkDel();

    // 显示 welcome 的动画 
    const welcome = document.querySelector(".welcome");
    welcome.style.top = "170px";
    setTimeout(() => {
        welcome.style.top = "-45px";
    }, 3000);

}

// 获取本地储存中的 todo
function getTodos() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

// 生成 Todo
function generateTodos() {
    const todos = getTodos();
    // 
    if (todos.length != 0) {
        prompt.style.display = "none";
    }
    todos.forEach((todo) => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-regular fa-circle" aria-hidden="true" id="circle"></i>
        ${todo}
        <i class="fa-regular fa-star" aria-hidden="true" id="star"></i>`;

        li.classList.add("todo-item", "animate__animated", "animate__fadeInUp");
        list.insertAdjacentElement("afterbegin", li);

        checkAction();

        starAction();
    });
}

// 删除 todo
function checkTodo(checkIcon, len, i) {
    // const checkIcons = document.querySelectorAll("#circle");
    const todos = getTodos();
    todos.splice(len - 1 - i, 1);

    const removedStarKey = `star_${len - 1 - i}`;
    localStorage.removeItem(removedStarKey);

    localStorage.setItem('todos', JSON.stringify(todos));

    checkIcon.parentNode.classList.add("animate__animated", "animate__fadeOutDown");
    setTimeout(() => {
        if (list.contains(checkIcon.parentNode)) {
            list.removeChild(checkIcon.parentNode);
        }

        const todoItem = document.querySelectorAll(".todo-item");
        if (todoItem.length <= 0) {
            prompt.style.display = "block";
        }
    }, 1000);


}

// check 按钮的鼠标事件
function checkAction() {
    const checkIcons = document.querySelectorAll("#circle");

    for (let i = checkIcons.length - 1; i >= 0; i--) {
        let checkIcon = checkIcons[i];
        let len = checkIcons.length;
        checkIcon.onmouseover = () => {
            checkIcon.className = "fa-solid fa-check-circle";
        }

        checkIcon.onmouseout = () => {
            checkIcon.className = "fa-regular fa-circle";
        }

        checkIcon.onclick = () => {
            // 删除 todo
            checkTodo(checkIcon, len, i);
        }
    }
}

// star 按钮的鼠标事件与本地储存
function starAction() {
    const starIcons = document.querySelectorAll("#star");

    for (let i = starIcons.length - 1; i >= 0; i--) {
        const starIcon = starIcons[i];

        // Check if "fa-star" class is present and update local storage
        const updateStarLocalStorage = () => {
            localStorage.setItem(`star_${starIcons.length - 1 - i}`, JSON.stringify({ isStar: starIcon.classList.contains("fa-solid") }));
        }

        starIcon.onclick = () => {
            starIcon.classList.toggle("fa-regular");
            starIcon.classList.toggle("fa-solid");
            starIcon.parentNode.classList.toggle("selected");
            // Update local storage on click
            updateStarLocalStorage();
        }

        // Set initial state from local storage
        const storedState = JSON.parse(localStorage.getItem(`star_${starIcons.length - 1 - i}`));
        if (storedState) {
            starIcon.classList.toggle("fa-regular", !storedState.isStar);
            starIcon.classList.toggle("fa-solid", storedState.isStar);
            starIcon.parentNode.classList.toggle("selected", storedState.isStar);
        }
    }
}

/** Quick Link */
const linkArea = document.querySelector(".quick-link");     //链接显示区域
const links = document.querySelectorAll(".link-item");      //所有链接
const addLink = document.querySelector(".addLink");         //添加链接的按钮
const setLink = document.querySelector(".setLink");         //添加链接的菜单
const linkURL = document.querySelector(".link-url");        //链接网址
const linkTitle = document.querySelector(".link-title");    //链接名称
const submitLink = document.querySelector(".submit-link");  //链接添加的提交按钮

// 呼出链接设置菜单
addLink.onclick = () => {

    if (setLink.className.includes("animate__bounceInRight")) {

        setLink.classList.add("animate__animated", "animate__bounceOutRight");

        setTimeout(() => {
            setLink.classList.toggle("show");
            setLink.classList.remove("animate__animated", "animate__bounceOutRight");
            setLink.classList.remove("animate__animated", "animate__bounceInRight");
        }, 1000);
    } else {

        setLink.classList.toggle("show");
        setLink.classList.add("animate__animated", "animate__bounceInRight");
    }
}

// 链接添加
submitLink.onclick = () => {
    // 输入框为空时, 退出函数
    if (linkURL.value == "" && linkTitle.value == "") {
        return false;
    }

    const a = document.createElement('a');
    const initial = linkTitle.value.substring(0, 1).toUpperCase();

    // 设置 a 标签属性
    a.href = linkURL.value;
    a.id = linkTitle.value;
    a.target = "_blank";
    a.innerHTML = ` <li class="link-icon">
                        <i class="fa-regular fa-trash-can"></i>
                        <span>${initial}</span>
                    </li>
                    <li class="link-name">${linkTitle.value}</li>`;
    a.classList.add("link-item");
    a.classList.add("animate__animated", "animate__rotateIn");
    linkArea.insertAdjacentElement("afterbegin", a);

    // 对链接地址和链接名称进行本地储存
    localStorage.setItem(linkTitle.value, linkURL.value);

    // 添加后将输入框清空
    linkURL.value = "";
    linkTitle.value = "";
    // 自点击 addLink 图标, 让链接设置菜单隐藏
    addLink.click();

    linkDel();
}

// 链接删除
function linkDel() {
    const del_link = document.querySelectorAll(".fa-trash-can");   //链接删除图标

    del_link.forEach((item) => {
        item.onclick = () => {
            item.parentNode.parentNode.classList.add("animate__animated", "animate__rotateOut");
            // 动画结束后删除链接节点
            setTimeout(() => {
                linkArea.removeChild(item.parentNode.parentNode);
            }, 1000);
            // 阻止 a 标签被点击后的跳转行为
            return false;
        }
    });
}

// 读取并生成本地储存中记录的链接信息
function createLink() {

}

/**
 * 更新说明:
 *          1.升级了图标库 from V4 to V6
 *          2.增加了 logo 的色彩动画
 *          3.添加了天气显示
 *          4.增加了可自定义的快速链接
 * 重要更新: 
 *          1.便签不再是管子进管子出!!!(一个管子进两个管子出 😊)
 */