$(window).on('load', function () {
  
  	setTimeout(function() {
        // send skincare quiz LL box to skincare quiz page 
      	$('.lion-rule-item--110138').click(function() {
            window.location.href = "http://www.primallypure.com/pages/skincare-quiz";
        });
      	// send regimen click to regimen collection page
      	$('.lion-rule-item--110239').click(function() {
            window.location.href = "http://www.primallypure.com/pages/skincare-quiz";
        });
      	// send deo sub to deo collection page
      	$('.lion-rule-item--110143 ').click(function() {
            window.location.href = "http://www.primallypure.com/collections/primally-pure";
        });
		$('<div class="rewards-image"></div>').insertBefore('.lion-rule-item--110452 .lion-rule-item__content');
        $('<p class="rewards-helper">Give your friends 10% off their first order over $50, and you’ll get $10 in points for each referral.</p>').insertAfter('.lion-rule-item--110452 .lion-rule-item__title');


    }, 2000);
  
	
});

$('.btn-view-tracker').on('click', function (evt) {
    evt.preventDefault();
    $('#slider').addClass('show');
    $('body').addClass('backdrop');
});

$('.tracker').on('click', function (evt) {
    evt.preventDefault();
    $('#slider').addClass('show');
    $('body').addClass('backdrop');
});


$(document).click(function(event) {

    $target = $(event.target);
  

    if(!$target.hasClass('slider-viewer-link') && !$target.closest('.visible').length ){

        $('#slider').removeClass('show');
        $('body').removeClass('backdrop');

    }
  
});

$('#btn-close-slider').on('click', function (evt) {
    evt.preventDefault();

    $('#slider').removeClass('show');
    $('body').removeClass('backdrop');
});

$('.img-link').on('click', function (e) {
    e.preventDefault();

    $('#modal-box').toggleClass('show');
    $('body').addClass('backdrop');
});

$('#btn-close-modal').on('click', function (evt) {
    evt.preventDefault();

    $('#modal-box').removeClass('show');
    $('body').removeClass('backdrop');
});