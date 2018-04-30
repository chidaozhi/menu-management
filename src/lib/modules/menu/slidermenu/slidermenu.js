$(function() {
  $('#menu2').metisMenu({
    toggle: false
  });
  $(".nano").nanoScroller({alwaysVisible: true});
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
