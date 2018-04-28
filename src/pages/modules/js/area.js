    var showLocation = function (province , city , town) {

        var loc = new Location();

        var	title = '<option></option>';

        $('#loc_province').append(title);
        $('#loc_city').append(title);
        $('#loc_town').append(title);

        $("#loc_province").select2({
			language:"zh-CN",
            placeholder: "国家",
            allowClear: true
        });
        $("#loc_city").select2({
            language:"zh-CN",
            placeholder: "省、直辖市",
            allowClear: true
        });
        $("#loc_town").select2({
            language:"zh-CN",
            placeholder: "市、县、区",
            allowClear: true
        });
        $('#loc_province').change(function() {
            $('#loc_city').empty();
            $('#loc_city').append(title);
            loc.fillOption('loc_city' , '0,'+$('#loc_province').val());
            $('#loc_city').change();
            //$('input[@name=location_id]').val($(this).val());
        });

        $('#loc_city').change(function() {
            $('#loc_town').empty();
            $('#loc_town').append(title);
            loc.fillOption('loc_town' , '0,' + $('#loc_province').val() + ',' + $('#loc_city').val());
            //$('input[@name=location_id]').val($(this).val());
        });

        $('#loc_town').change(function() {
            $('input[name=location_id]').val($(this).val());
        });

        if (province) {
            loc.fillOption('loc_province' , '0' , province);

            if (city) {
                loc.fillOption('loc_city' , '0,'+province , city);

                if (town) {
                    loc.fillOption('loc_town' , '0,'+province+','+city , town);
                }
            }

        } else {
            loc.fillOption('loc_province' , '0');
        }

    };
