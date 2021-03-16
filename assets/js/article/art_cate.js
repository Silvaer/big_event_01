$(function () {
    initArtCateList();
    function initArtCateList() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: (res) => {
                // console.log(res);
                let htmlStr = template('t1', { data: res.data });
                $('tbody').html(htmlStr);
            }
        })
    }

    let indexAdd = null;
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    // 添加类别
    $('body').on('submit', "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message, { icon: 6 });
                initArtCateList();
                $(this)[0].reset();
                layer.close(indexAdd);
            }
        })
    })

    let form = layui.form;
    let indexEdit = null;
    // 编辑
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        let Id = $(this).data('id');
        // console.log(Id);
        $.ajax({
            type: "get",
            url: "/my/article/cates/" + Id,
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                form.val('form-edit', res.data);
            }
        })

    })

    // 确认修改
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                initArtCateList();
                layer.close(indexEdit);
            }
        })
    })

    // 删除
    $('tbody').on('click', '.btn-delete', function () {

        let Id = $(this).data('id');
        console.log(Id);
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + Id,
                success: (res) => {
                    // console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message);
                    }
                    layer.close(index);
                    layer.msg('恭喜你删除成功', { icon: 6 });
                    initArtCateList();
                }
            })
        });
    })
})