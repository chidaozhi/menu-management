function showLocation(province , city , town) {
	
	var loc = new Location();
	
	var	title = '<option></option>';
	
	$('#loc_province').append(title);
	$('#loc_city').append(title);
	$('#loc_town').append(title);
	
	$("#loc_province,#loc_city,#loc_town").select2({
		placeholder: "Select a state",
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
		
}

$(function(){
		showLocation();
		// $('#btnval').click(function(){
		// 	alert($('#loc_province').val() + ' - ' + $('#loc_city').val() + ' - ' +  $('#loc_town').val()) 
		// })
		// $('#btntext').click(function(){
		// 	alert($('#loc_province').select2('data').text + ' - ' + $('#loc_city').select2('data').text + ' - ' +  $('#loc_town').select2('data').text) 
		// })
	});