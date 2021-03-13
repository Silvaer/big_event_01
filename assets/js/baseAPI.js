
// 1.开发环境路径
let baseURL = 'http://api-breakingnews-web.itheima.net';
// 2.测试环境路径
// let baseURL = 'http://api-breakingnews-web.itheima.net';
// 3.生产环境路径
// let baseURL = 'http://api-breakingnews-web.itheima.net';


$.ajaxPrefilter(function (options) {
    // console.log(options);
    options.url = baseURL + options.url;
})