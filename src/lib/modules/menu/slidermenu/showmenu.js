/***********************
 * 常量&变量
 **********************/
// var httpUrl1 = "http://127.0.0.1:3000/menus";
// var httpUrl2 = "http://127.0.0.1:5000/";
var RELA_URL = "./src/service/";
var FIRST_SHOW = "m_1.json";
var ROOT_MENU = $('.nav.navbar-nav');
var LEFT_MENU = $('.metismenu#left-menu');
var MAIN_LI = $('.nav.navbar-nav li');
var choiceId = '';

/***********************
 * 方法
 **********************/
var main = function (res) {

    if(res){
        res = res.menus;
        if(res.length){
            for(var i = 0; i < res.length; i++) {
                var id = res[i].id;
                var firstLi = '';      //一级菜单循环遍历添加
                firstLi += '<li id="'+ id +'"><a href="#">' + res[i].name + '</a></li>';
                ROOT_MENU.append(firstLi);
            }
            //默认选中第一个菜单，添加选中class
            $('.nav.navbar-nav li:nth-child(1)').toggleClass('active');
        }
    }
};

var childMenu = function (resource) {
    var leftLi = '';
    var secondMenu= resource.children;
    if(resource){
        if(secondMenu){
            var leftLiChild = new Array(100);
            for(var index = 0; index < leftLiChild.length; index++){
                leftLiChild[index] = '';
            }
            for(var k = 0; k < secondMenu.length; k++){
                var thridMenu = secondMenu[k].children;
                if(thridMenu){
                    for(var j = 0; j < thridMenu.length; j++){
                        leftLiChild[k] += `<li><a href="#" onclick="menuClick('` + thridMenu[j].url + `')">` + '<span class=" ' + thridMenu[j].class + '"></span>' + ' ' + thridMenu[j].name + '</a>'+'</li>';
                    }
                    leftLi += '<li><a class="has-arrow" href="#">'+'<span class=" '+ secondMenu[k].class + '"></span>' + ' ' + secondMenu[k].name + '</a>' + '<ul aria-expanded="true">' + leftLiChild[k] + '</ul>' +'</li>';
                }
            }
            // $('#left-menu').metisMenu('dispose');
            LEFT_MENU.append(leftLi);
            $('#left-menu').metisMenu({
                toggle:false //添加dom元素后要再执行一遍，打开新的子菜单时不关闭其与子菜单
            });
            leftLi = '';
        }
    }
};

/***********************
 * 按钮操作
 **********************/
// 点击一级菜单后执行
MAIN_LI.click(choiceId,function () {
    var script = '';
    var menuNum = '';
    LEFT_MENU.empty();
    MAIN_LI.removeClass('active');
    $(this).addClass('active');
    choiceId = $(this).attr("id");//获取一级菜单选中的id
    menuNum = choiceId;//id号关联二级菜单
    childMenu();//执行二级菜单
    $('#left-menu').metisMenu('dispose');

    //jsonp添加script跨域标签
    script = document.createElement("script");
    script.src = './src/service/' + menuNum + '.json?callback=childMenu';
    document.body.appendChild(script);
    document.body.removeChild(script);
});




