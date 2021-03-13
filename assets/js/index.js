$(function () {
    getUserinfo();
})
function getUserinfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        Headers: {
            Authorization: localStorage.getItem('myToken')
        },
        data: {},
        success: (res) => {
            console.log(res);
        }
    })
}