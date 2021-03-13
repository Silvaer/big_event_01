$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let pwd = $('.reg-box input[name="password"]').val();
            if (value != pwd) return "两次密码输入不一致!";
        }
    })

    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: $('.reg-box input[name="username"]').val(),
                password: $('.reg-box input[name="password"]').val()
            },
            success: (res) => {
                console.log(res);
                if (res.status != 0)
                    return layer.msg(res.message, { icon: 5 });
                layer.msg("恭喜您，注册成功", { icon: 6 }, function () {
                    $('#link_login').click();
                    $('#form_reg')[0].reset();
                });
            }
        })
    })


    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) return layer.msg(res.message, { icon: 5 })
                layer.msg('恭喜您，登录成功', { icon: 6 });
                localStorage.getItem('myToken', res.token);
                location.href = '/index.html';
                // location.assign('/index.html');
            }
        })
    })

})