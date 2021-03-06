$(window).on('load', function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    })
    $('#file').on('change', function (e) {
        console.log(this.files);
        let file = e.target.files[0];
        if (file == undefined) {
            return layer.msg('请选择图片');
        }
        let newImgURL = URL.createObjectURL(file);
        $image.cropper('destroy').attr('src', newImgURL).cropper(options);
    })
    $('#btnUpload').on('click', function () {
        let dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        $.ajax({
            type: "post",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('上传头像成功');
                window.parent.getUserinfo();
            }
        })
    })
})
