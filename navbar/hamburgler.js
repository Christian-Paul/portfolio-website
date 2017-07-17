$('#bun').click(function() {
	if($('.places').is(':hidden')) {
		$('.places').slideDown('fast');
		$('#hamburger').addClass('clicked');
	}
	else {
		$('.places').hide('fast');
		$('#hamburger').removeClass('clicked');
	}
});