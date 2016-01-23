function show_error(msg){
	ht = '<div class="alert alert-error" style="width:device-width;"><strong>'+msg+'</strong></div>';
	$('#number').hide();
	$('#number').html(ht);
	$('#number').slideDown('slow');
	}
function show_success(msg){
	ht = '<div class="alert alert-success"><strong>'+msg+'</strong></div>';
	$('#number').hide();
	$('#number').html(ht);
	$('#number').slideDown('slow');
	}
function show_info(msg){
	ht = '<div class="alert alert-info"><strong>'+msg+'</strong></div>';
	$('#number').hide();
	$('#number').html(ht);
	$('#number').slideDown('slow');
	}
