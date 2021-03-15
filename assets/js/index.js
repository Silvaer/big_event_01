$(function () {
    getUserinfo();

    $('#btnlogout').click(function () {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('myToken');
            location.href = '/login.html';

            layer.close(index);
        });
    })
})
function getUserinfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        data: {},
        success: (res) => {
            console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message, { icon: 6 });
            }
            renderAvatar(res.data);
        }
    })
}


function renderAvatar(user) {
    let name = user.nickname || user.username;
    $('#welcome').text(`欢迎` + name);
    if (user.user_pic == null) {
        $('.layui-nav-img').hide();
        $('.text_avater').show().text(name[0].toUpperCase());
    } else {
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $('.text_avater').hide();
    }
}