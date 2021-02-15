/* ======================================
===  SEARCH                       ====
====================================== */

$('.search-bar').hide();
$('.search-input').focus();


$('.search-image').click(function() {
  $('.search-bar').slideDown();
  $('.search-input').focus();
});

// close with esc button

$(document).keyup(function(e) {
  if (e.keyCode == 27) { // escape key maps to keycode `27`
    $('.search-bar').slideUp();
  }
});

// close when click close
$(".search-close").mouseup(function(e) {
    $(".search-bar").slideUp();
});

/* ======================================
===  MOBILENAV                       ====
====================================== */
$(function($) {
    var $lateral_menu_trigger = $('.mobile-wrap'),
        $content_wrapper = $('#main-nav'),
        $navigation = $('.mobile-menu');
  
	
  	$("#main-header, #banner-area, #fsb_bar").addClass("fixed");

    //open-close lateral menu clicking on the menu icon
    $lateral_menu_trigger.on('click', function(event) {
        event.preventDefault();
		$(window).scrollTop(0);
      	$("#main-header, #banner-area, #fsb_bar").toggleClass("fixed");
        $lateral_menu_trigger.toggleClass('cross');
        $content_wrapper.slideToggle(500);

        //check if transitions are not supported - i.e. in IE9
        if ($('html').hasClass('no-csstransitions')) {
            $('body').toggleClass('overflow-hidden');
        }
    });
  
           

    $(".sub-menu a:first-child").click(function() {
        //Inner 
        var jqInner = $(this).parent();
        jqInner.toggleClass("active");
        $(this).next().slideToggle(500);
    })

});




//$(window).resize(function(){location.reload();});


/* ======================================
===  HEADER TRANSITION               ====
====================================== */
// If we've scrolled 100px, add "fadein" class to the header

/*
jQuery(function() {
    createSticky(jQuery("body"));
});

function createSticky(sticky) {
    if (typeof sticky != "undefined") {
        var pos = sticky.offset().top + 180,
            win = jQuery(window);

        win.on("scroll", function() {
            if (win.scrollTop() > pos) {
                sticky.addClass("fadein");
            } else {
                sticky.removeClass("fadein");
            }
        });
    }
}
*/