// smooth scrolling to page sections
$('.nav-about').click(function() {
	$('html, body').animate(
		{
			scrollTop: $('.about-holder').offset().top
		}, 1000)
});

$('.nav-portfolio').click(function() {
	$('html, body').animate(
		{
			scrollTop: $('.portfolio-holder').offset().top
		}, 1400)
});

$('.nav-contact').click(function() {
	$('html, body').animate(
		{
			scrollTop: $('.contact-holder').offset().top
		}, 2000)
});

$('.footer-about').click(function() {
	$('html, body').animate(
		{
			scrollTop: $('.about-holder').offset().top
		}, 2000)
});

$('.footer-portfolio').click(function() {
	$('html, body').animate(
		{
			scrollTop: $('.portfolio-holder').offset().top
		}, 1800)
});

$('.footer-contact').click(function() {
	$('html, body').animate(
		{
			scrollTop: $('.contact-holder').offset().top
		}, 1000)
});

// make portfolio rows the same height
$(window).load(function() {
    var maxHeight = $('.project-description').outerHeight();


    $('.project-description').outerHeight(maxHeight);  
})


// form validation
$('.form').validate({
    rules: {
        name: {
            required: true
        },
        email: {
            required: true,
            email: true
        },
        subject: {
            required: true
        },
        message: {
            required: true
        }
    },
    submitHandler: function(form) {
        $.ajax({
            url: "//formspree.io/christiansamuelpaul@gmail.com", 
            method: "POST",
            data: {
                name: $(form).find("input[name='name']").val(),
                email: $(form).find("input[name='email']").val(),
                subject: $(form).find("input[name='subject']").val(),
                message: $(form).find("textarea[name='message']").val()
            },
            dataType: "json",
            success: function() {
                $('.response-success').fadeIn();
            },
            error: function() {
                $('.response-failure').fadeIn();
            }
        });
    }
 });