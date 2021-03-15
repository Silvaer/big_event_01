
// 1.开发环境路径
let baseURL = 'http://api-breakingnews-web.itheima.net';
// 2.测试环境路径
// let baseURL = 'http://api-breakingnews-web.itheima.net';
// 3.生产环境路径
// let baseURL = 'http://api-breakingnews-web.itheima.net';


$.ajaxPrefilter(function (options) {
    // console.log(options);
    options.url = baseURL + options.url;

    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('myToken') || ''
        }

        options.complete = function (res) {
            // console.log(res);
            let obj = res.responseJSON;
            // console.log(obj);
            if (obj.status && obj.message === "身份认证失败！") {
                localStorage.removeItem('myToken');
                location.href = '/login.html';
            }
        }
    }
})