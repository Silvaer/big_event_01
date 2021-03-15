$(function () {
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.trim().length > 6) {
                return "昵称长度为1-6位之间";
            }
        }
    })
    initUserInfo();
    let layer = layui.layer;
    function initUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            data: {},
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                form.val('formUserInfo', res.data);
            }
        })
    }

    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    $('#formChange').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg('用户信息修改失败');
                }
                layer.msg('用户信息修改成功', { icon: 6 });
                window.parent.getUserinfo();
            }
        })
    })

})