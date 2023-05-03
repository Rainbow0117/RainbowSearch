/** 通过 API 获取随机诗词 */
const poetry = document.querySelector(".randomPoetry");
const baseURL_poetry = "https://open.saintic.com/api/sentence";

function poetryGet() {
    axios({
        url: `${baseURL_poetry}/all`,
        params: {
            id: 1
        }
    })
        .then(response => {
            console.log('/all', response.data)
            poetry.innerHTML = `<a href = "https://cn.bing.com/search?q=${response.data.data.sentence}">『 ${response.data.data.sentence} --- 《${response.data.data.name}》』</a>`;

        }, error => {
            console.log('错误', error.message);
        })
}
poetryGet();

// API 获取天气信息
const wea = document.querySelector(".weather");
const tem = document.querySelector(".temperature");
const baseURL_weather = "https://v0.yiketianqi.com/free/day?appid=93417717&appsecret=0y46ONzi&unescape=1";

function weatherGet() {
    axios({
        url: `${baseURL_weather}`,
    }).then(response => {
        console.log('weatherInfo', response.data);
        const weatherInfo = response.data;

        // 设置当前温度
        tem.innerText = weatherInfo.tem + " ℃";

        // 根据返回的天气类型选择图标
        switch (weatherInfo.wea_img) {
            case "xue":
                wea.innerHTML = ` <i class="fa-regular fa-snowflake fa-2x"></i>${weatherInfo.wea}`;
                return;
            case "lei":
                wea.innerHTML = ` <i class="fa-solid fa-bolt fa-2x"></i>${weatherInfo.wea}`;
                return;
            case "shachen":
                wea.innerHTML = `<i class="fa-solid fa-wind fa-2x"></i>${weatherInfo.wea}`;
                return;
            case "wu":
                wea.innerHTML = `  <i class="fa-solid fa-smog fa-2x"></i>${weatherInfo.wea}`;
                return;
            case "bingbao":
                wea.innerHTML = ` <i class="fa-regular fa-cloud-meatball fa-2x"></i>${weatherInfo.wea}`;
                return;
            case "yun":
                wea.innerHTML = `<i class="fa-solid fa-cloud-sun fa-2x"></i>${weatherInfo.wea}`;
                return;
            case "yu":
                wea.innerHTML = `<i class="fa-regular fa-cloud-showers-heavy fa-2x"></i>${weatherInfo.wea}`;
                return;
            case "yin":
                wea.innerHTML = ` <i class="fa-solid fa-cloud fa-2x"></i>${weatherInfo.wea}`;
                return;
            case "qing":
                wea.innerHTML = ` <i class="fa-solid fa-sun fa-2x"></i>${weatherInfo.wea}`;
                return;
        }
    }, error => {
        console.log('错误', error.message);
    })
}
weatherGet();