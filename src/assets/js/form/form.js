/*!
 * @author:Chidao
 */
;"use strict";
$(function () {
    /**
     * jquery-steps
     * 步骤插件
     * bodyTag一定要在内容的最外层
     */
    $('.wizard').steps({
        headerTag: 'h1',
        bodyTag: 'section',
        transitionEffect: 'slideLeft',
        labels: {
            finish: "提交",
            next: '下一步',
            previous: '上一步'
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            var ifValid = newIndex - currentIndex;
            if (ifValid > 0) {
                var currentFormValid = $('form:visible').valid();
                if (currentFormValid) {
                    // alert('本页验证通过');
                    return true;
                } else {
                    layer.msg('填写有误');
                    return false;
                }
            } else {
                return true;
            }
        },
        onFinishing: function (event, currentIndex) {
            layer.alert('确认提交？', {
                skin: 'layer-ext-myskin' //样式类名  蓝色自定义样式
                , closeBtn: 1    // 是否显示关闭按钮
                , anim: 1 //动画类型`
                , btn: ['确认', '返回'] //按钮
                , icon: 3    // icon
                , yes: function (index, layero) {
                    var res = verifyCode.validate(document.getElementById("code_input").value);
                    if (res) {
                        var submitValid = $('#form-0,#form-1,#form-2,#form-3').valid();
                        if (submitValid === true) {
                            var param = $('#form-0,#form-1,#form-2,#form-3').serializeObject();
                            var json = JSON.stringify(param);
                            $.ajax({
                                url: "http://39.104.168.114:80/mg-web/app/test2",
                                async: false,
                                type: 'post',
                                // useDefaultXhrHeader:false,
                                data: json,
                                dataType: 'text',
                                contentType: "application/json",  //缺失会出现URL编码，无法转成json对象
                                success: function () {
                                    layer.msg("成功", {icon: 1});
                                    return true;
                                },
                                error: function (req) {
                                    layer.msg('请到控制台查看提交情况', {icon: 1});
                                    return true;
                                }
                            });
                        } else {
                            layer.msg('提交失败！请检验表单项！', {icon: 0});
                            return false;
                        }
                    } else {
                        layer.msg('验证码输入错误！', {icon: 0});
                        return false;
                    }
                }
                , btn2: function (index, layero) {
                    layer.close();
                }
            });
            return true;//return false 不能继续往下进行
        }
    });

    /**
     * layer全局配置
     */
    layer.config({
        extend: 'myskin/style.css'
    });

    /**
     * 生成验证码
     */
    var verifyCode = new GVerify("verify");

    /**
     * 动态创建测试按钮
     */
    var testBtn = "<li id='test-btn' class='test-btn' style='display: block;margin: 0 0.5em;float: left;'>一键测试</li>";
    $('.actions > ul').append(testBtn);

    /**
     * 计算价格
     */
    var unitPrice;
    var buyYear;
    var price;

    function countPrice() {
        unitPrice = $('input[name="service"]:checked').attr('price');
        buyYear = $('.js-example-basic-single.service-time-select').val();
        if (buyYear === undefined || unitPrice === undefined) {
            price = 0;
        } else {
            price = unitPrice * buyYear;
        }
        $('#price').text(price);
        return price;
    }

    countPrice();

    /**
     * icheck单选、复选框
     */
    $(document).ready(function () {
        //小圆按钮
        $('.skin-minimal input').iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass: 'iradio_minimal-blue',
            increaseArea: '20%'
        });
        //长文字按钮
        $('.skin-line input').each(function () {
            var self = $(this),
                label = self.next(),
                label_text = label.text();
            label.remove();
            self.iCheck({
                checkboxClass: 'icheckbox_line-blue',
                radioClass: 'iradio_line-blue',
                insert: '<div class="icheck_line-icon"></div>' + label_text
            });
        });
        //自定义--单选且可不选按钮
        $("input[name='service']").on("ifChecked", function (event) {
            $("input[name='service']").on("ifClicked", function (event) {
                $("input[name='service']").iCheck('uncheck');
            });
        });
        $("input[name='service']").on('ifChanged', function () {
            countPrice();
            var serviceVal = $("input[name='service']:checked").val();
            if (serviceVal == undefined) {
                $('.service-time').empty();
            } else {
                $('.service-time').append('<div class="service-time-select"> 购买时间：\n' +
                    '                            <select id="buy-year" class="js-example-basic-single service-time-select" name="buyYear">\n' +
                    '                                <option value="1">1年</option>\n' +
                    '                                <option value="2">2年</option>\n' +
                    '                                <option value="3">3年</option>\n' +
                    '                            </select>\n' +
                    '                        </div>');
                $('.js-example-basic-single.service-time-select').select2();
                countPrice();//页面加载好后直接计价
                $('.js-example-basic-single.service-time-select').change(function () {
                    countPrice();//有任何变动再次计价
                });
            }
        });

    });

    /**
     * select2下拉框插件
     * 多项选择-爱好
     */
    $('.interest-select').select2({
        closeOnSelect: false,
        allowClear: true
    });
    //裁去不必要的一个默认模块
    $('.select2-search__field').remove();
    showLocation();

    /**
     * laydate日期插件
     */
    var lay = laydate.render({
        elem: '#form-date',
        format: 'M月d日',
        // value:nowDate,
        done: function (value, date) {
        }
    });

    /**
     * 表单验证
     */
    //1.添加自定义验证-手机验证
    $.validator.addMethod(
        'phone',
        function (value, element, param) {
            var reg = /^(0|\+86)?(13\d|14[579]|15[0-35-9]|17[0135-8]|18\d)\d{8}$/;
            return reg.test(value);
        },
        '请输入正确的手机号码'
    );
    //2.添加自定义验证-多行文本框
    $.validator.addMethod(
        'textArea',
        function (value, element, param) {
            var reg = /^.{0,400}$/;
            return reg.test(value.replace(/\r\n/g, "").replace(/\s/g, ""));
        },
        '字数不得超过400'
    );
    //验证规则配置
    $.validator.setDefaults({
        debug: true,
        success: "valid"
    });
    //验证项是用name值绑定的
    $('#form-0').validate({
        rules: {
            username: {
                required: true,
                minlength: 5,
                maxlength: 16
            },
            password: {
                required: true,
                minlength: 2,
                maxlength: 10
            },
            'confirm-password': {
                required: true,
                equalTo: "#form-password"
            },
            mail: {
                required: true,
                email: true
            },
            'phone': {
                required: true,
                'phone': true
            },
            'date': {
                required: true
            },
            age: {
                required: true,
                number: true,
                min: 0
            },
            sex: {
                required: true
            }
        }
    });
    $('#form-1').validate({
        rules: {
            'textarea': {
                textArea: true
            }
        }
    });
    //汉字提示
    $.extend($.validator.messages, {
        required: "这是必填字段",
        remote: "请修正此字段",
        email: "请输入有效的电子邮件地址",
        url: "请输入有效的网址",
        date: "请输入有效的日期",
        dateISO: "请输入有效的日期 (YYYY-MM-DD)",
        number: "请输入有效的数字",
        digits: "只能输入数字",
        creditcard: "请输入有效的信用卡号码",
        equalTo: "两次输入密码不同",
        extension: "请输入有效的后缀",
        maxlength: $.validator.format("最多可以输入 {0} 个字符"),
        minlength: $.validator.format("最少要输入 {0} 个字符"),
        rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
        range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
        max: $.validator.format("请输入不大于 {0} 的数值"),
        min: $.validator.format("请输入不小于 {0} 的数值"),
    });
    //自动将form表单封装成json对象
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    /**
     * 一键添加所有测试项
     */
    $('#test-btn').click(function () {
        var title = '<option></option>';
        $('#form-username').attr("value", "chidao");
        $('#form-password').attr("value", "123123");
        $('#form-confirm-password').attr("value", "123123");
        $('#form-mail').attr("value", "chi@123.com");
        $('#phone').attr("value", "15644556677");
        $('#form-male').iCheck('check');
        $('#society').iCheck('check');
        $('#life').iCheck('check');
        $('#sports').iCheck('check');
        $('#form-date').attr("value", "12月3日");
        $('#form-age').attr("value", "25");
        $('#loc_province option').remove(':first');
        $('#loc_province').trigger('change');
        $('#loc_city option').remove(':first');
        $('#loc_city').trigger('change');
        $('#loc_town option').remove(':first');
        $('#loc_town').trigger('change');
        $("#form-textarea").text("text");
        $('.interest-select').val(['love', 'japanese']);
        $('.interest-select').trigger('change');
        $('#high').iCheck('check');
        $('#test-btn').remove();
    });

});


