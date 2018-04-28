$(function() {
  $('#menu2').metisMenu({
    toggle: false
  });
  $(".nano").nanoScroller({alwaysVisible: true});
  // $("#hum-butt").click(function(){
  //     $(this).toggleClass("is-active");     //如果存在就删除一个类，如果不存在就添加一个类
  //     $('#absolute-box').toggleClass('is-acive');
  //     // $('#hum-butt').toggleClass('is-scroll');
  // });
    $('.tixing-right').click(function(){
        $(this).hide();
        $('.tixing-left').show();
        $('#absolute-box').hide();
    });
    $('.tixing-left').click(function(){
        $(this).hide();
        $('.tixing-right').show();
        $('#absolute-box').show();
    });
});
