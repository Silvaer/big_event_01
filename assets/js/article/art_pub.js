$(function () {
    let layer = layui.layer;
    let form = layui.form;
    initCate();
    function initCate() {
        $.ajax({
            method: "get",
            url: "/my/article/cates",
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                let htmlStr = template('tpl-cate', { data: res.data });
                $('[name="cate_id"]').html(htmlStr);
                form.render();
            }
        })
    }

    // 初始化富文本编辑器
    initEditor()


    let $image = $('#image')

    // 2. 裁剪选项
    let options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click();
    })
    $('#coverFile').on('change', function (e) {
        // let file = $(this)[0].files;
        let file = e.target.files[0];
        console.log(file);
        if (file == undefined) return layer.msg('您可以选择一张图片作为文章封面');
        let newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    let state = '已发布'
    $('#btnSave2').on('click', function () {
        state = '草稿';
    })

    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        let fd = new FormData(this);
        // console.log(...fd);
        fd.append('state', state);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);
                // console.log(...fd);
                publishArticle(fd);
            });
    })
    function publishArticle(fd) {
        $.ajax({
            method: "post",
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // location.href = '/article/art_list.html'
                setTimeout(function () {
                    window.parent.document.querySelector('#art_list').click();
                }, 1000)

            }
        })
    }
})