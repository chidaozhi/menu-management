var menuClick = function (menuUrl) {
    $('#iframe-page-content').attr('src', menuUrl);
    //iframe内容加载出来前设置遮罩层
    var loading = layer.load(0, {shade: 0.3});
    $('#iframe-page-content').load(function () {
        //加载结束去掉遮罩
        layer.close(loading);
    });

};