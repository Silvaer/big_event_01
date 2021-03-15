$(function () {
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name="oldPwd"]').val()) {
                return "新密码不能与旧密码一致";
            }
        },
        rePwd: function (value) {
            if (value !== $('[name="newPwd"]').val()) {
                return "确认密码必须与新密码一致";
            }
        }
    })

    $('#changePwd').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $('form').serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('恭喜您修改密码成功', { icon: 6 });
                $('form')[0].reset();
            }
        })
    })

})