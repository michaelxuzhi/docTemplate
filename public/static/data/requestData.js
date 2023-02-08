export function requestURL() {
    return {
        // url: "http://localhost:8888",
        atURL: './static/data/atNew.json',
        resURL: './static/data/resData.json',
    };
}

export const mongoDB_config = {
    reqUrl: 'http://localhost:3000',
};

// 弃用旧的xhr请求，使用axios替代
// let xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4 && this.status === 200) {
//     that.atObjGlobal = JSON.parse(xhr.responseText);
//     // console.log('requestJSON success', that.atObjGlobal);
//     // return JSON.parse(xhr.responseText);
//   } else if (xhr.readyState === 4 && this.status !== 200) {
//     console.log('请求失败');
//   }
// };
// // 请求本地json只允许请求public下的json文件
// // xhr.open('GET', '/static/data/data.json', true);
// xhr.open('GET', 'http://127.0.0.1:8888', true);
// xhr.send();
