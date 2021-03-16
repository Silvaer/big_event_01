$(function () {
    let p = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    template.defaults.imports.dataFormat = function (dtStr) {
        let dt = new Date(dtStr);
        let y = padZero(dt.getFullYear());
        let m = padZero(dt.getMonth() + 1);
        let d = padZero(dt.getDate());
        let hh = padZero(dt.getHours());
        let mm = padZero(dt.getMinutes());
        let ss = padZero(dt.getSeconds());
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
    function padZero(num) {
        return num < 10 ? '0' + num : num;
    }
    initTable();
    function initTable() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: p,
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                let htmlStr = template('tpl-table', { data: res.data });
                $('tbody').html(htmlStr);
                renderPage(res.total);
            }
        })
    }

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

    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        let cate_id = $('[name="cate_id"]').val();
        let state = $('[name="state"]').val();
        p.cate_id = cate_id;
        p.state = state;
        initTable();
    })

    let laypage = layui.laypage;
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: p.pagesize,
            curr: p.pagenum,
            limits: [2, 3, 5, 8, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                // console.log(obj);
                if (!first) {
                    p.pagenum = obj.curr;
                    p.pagesize = obj.limit;
                    initTable();
                }
            }
        });
    }


    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).data('id');
        // console.log(Id);
        layer.confirm('确定删除？', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: "get",
                url: "/my/article/delete/" + Id,
                success: (res) => {
                    if (res.status != 0) {
                        return layer.msg(res.message);
                    }
                    if ($('.btn-delete').length === 1 && p.pagenum > 1) {
                        p.pagenum--;
                    }
                    layer.msg("恭喜你删除文章成功");
                    initTable();
                }
            })
            layer.close(index);
        });

    })

})