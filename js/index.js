// lazy loading code taken from http://deanhume.com/home/blogpost/lazy-loading-images-using-intersection-observer/10163

// Get all of the images that are marked up to lazy load
const images = document.querySelectorAll('.js-lazy-image');
const config = {
  // If the image gets within 50px in the Y axis, start the download.
  rootMargin: '50px 0px',
  threshold: 0.01
};

// The observer for the images on the page
let observer = new IntersectionObserver(onIntersection, config);
  images.forEach(image => {
    observer.observe(image);
  });

function onIntersection(entries) {
  // Loop through the entries
  entries.forEach(entry => {
    // Are we in viewport?
    if (entry.intersectionRatio > 0) {

      // Stop watching and load the image
      observer.unobserve(entry.target);
      preloadImage(entry.target);
    }
  });
}

// If we don't have support for intersection observer, load the images immediately
if (!('IntersectionObserver' in window)) {
  Array.from(images).forEach(image => preloadImage(image));
} else {
  // It is supported, load the images
  observer = new IntersectionObserver(onIntersection, config);
  images.forEach(image => {
 
   observer.observe(image);
  });
}

function preloadImage(img) {
    img.setAttribute('src', img.getAttribute('data-src'));
}

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