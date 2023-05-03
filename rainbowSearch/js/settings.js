/** 页面打开方式 */
const newPage = "_blank";   // 新页面打开
const coverPage = "_self";  // 当前页面打开
export let pageStyle = coverPage;  // 默认方式

/** 搜索引擎网址 */
const baiduURL = "https://www.baidu.com/s?ie=utf-8&word=";
const bingURL = "https://cn.bing.com/search?q=";
const googleURL = "https://www.google.com/search?q=";

const yandexURL = "https://yandex.com/search/?text=";
const magiURL = "https://magi.com/search?q=";
const sogouURL = "https://www.sogou.com/web?query=";

const urlArr = [baiduURL, bingURL, googleURL, yandexURL, magiURL, sogouURL];
export let baseURL = bingURL;

/** 设置菜单 && 详细菜单 */
const mask = document.querySelector(".mask");   //遮罩层
const setting = document.querySelector(".setting"); //设置图标
const menu = document.querySelector(".menu");   //小菜单

// 遮罩层的三个详细菜单
const generalSettings = document.querySelector("#General-settings");
const searchPreferences = document.querySelector("#Search-preferences");
const appearanceSettings = document.querySelector("#appearance-settings");

// 设置图标的点击时间
setting.onclick = () => {
    mask.classList.remove("maskAppear");
    menu.style.display = "flex";
    menu.classList.toggle("menuMove");
}

//小设置菜单的 item 集合 
const subkey = document.querySelectorAll(".subkey");
// 小设置菜单的每一个单独项
const general = document.getElementById("general");
const preferences = document.getElementById("preferences");
const appearance = document.getElementById("appearance");

const exit = document.querySelectorAll(".fa-circle-xmark"); // 退出图标

subkey.forEach(item => {
    item.addEventListener("click", () => {
        mask.classList.add("maskAppear");
        menu.style.display = "none";
        setting.style.display = "none";
    });
});

// 小菜单中每一项的点击事件(点击后，对应的详细菜单出现)
general.onclick = () => {
    generalSettings.style.display = "flex";
    generalSettings.classList.add("animate__animated", "animate__zoomIn");  //出现时的动画
}

preferences.onclick = () => {
    searchPreferences.style.display = "flex";
    searchPreferences.classList.add("animate__animated", "animate__zoomIn");
}

appearance.onclick = () => {
    appearanceSettings.style.display = "flex";
    appearanceSettings.classList.add("animate__animated", "animate__zoomIn");
}

// 详细菜单的退出键的点击事件
exit.forEach(item => {
    item.onclick = function () {
        // 将退出图标的祖父节点(即对应设置区域)隐藏
        this.parentNode.parentNode.classList.add("animate__animated", "animate__zoomOut");  //消失时的动画
        setTimeout(() => {
            this.parentNode.parentNode.style.display = "none";
            this.parentNode.parentNode.classList.remove("animate__animated", "animate__zoomOut");
        }, 1000);
        menu.style.display = "flex"
        setting.style.display = "flex";
    }
});

const toggle = document.querySelectorAll("#toggle");    // 所有选项开关
const check = document.querySelectorAll(".fa-check");   // 搜索引擎偏好设置中的 check 图标
const searchEngine = document.querySelectorAll("#search-engine");   // 所有搜索引擎选项

// 选项开关点击事件
toggle.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("fa-toggle-off");
        item.classList.toggle("fa-toggle-on");
    });
});

for (let i = 0; i < searchEngine.length; i++) {
    // 自点击第二个搜索引擎选项 设置 baseURL 为 bingURL
    window.onload = () => {
        searchEngine[1].click();
    }

    searchEngine[i].onclick = () => {
        check.forEach(item => {
            item.classList.remove("checkAppear");
            item.style.display = "none";
        });

        check[i].style.display = "block";

        urlSet(i);
    }
}
// 设置 baseURL
function urlSet(i) {
    if (check[i].style.display == "block") {
        baseURL = urlArr[i];
        console.log("🚀 ~ file: main.js:195 ~ baseURL:", baseURL)
    }
}

// 自动清空搜索栏
const inputClear = document.querySelector("[toggle-input]");
export let flag = 0;   // 是否清空的标识 (flag = 1 是清空)
inputClear.addEventListener("click", () => {
    if (inputClear.className != "fa fa-toggle-on fa-lg") {
        flag = 1;
    }
});

// 设置页面打开方式
const openStyle = document.querySelector("[toggle-open]");
openStyle.addEventListener("click", () => {
    if (openStyle.className != "fa fa-toggle-on fa-lg") {
        pageStyle = newPage;
    }
});