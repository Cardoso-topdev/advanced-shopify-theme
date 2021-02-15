$( document ).ready(function() {
  
  // for Splitbase collection page dropdowns for a Quick Add feature
  // if option has class "selected", add attribute selected as well
  
  $('#product-select option.selected').attr("selected");
  
  $('.thumb .overlay').remove();
  
  $('.thumb-switch').click(function(){
    
    // Grab img.thumb class src attribute
    // NOTE: ALL img tags must have use this class, 
    // otherwise you can't click back to the first image.

    var thumbSrc = $('.thumb-switch').attr('src');

    // Grab img#largeImage src attribute
    var largeSrc = $('.product-main-image img').attr('src');

    // Use variables to replace src instead of relying on file names.
    $('.product-main-image img').attr('src',$(this).attr('src').replace(thumbSrc,largeSrc));
    
  });
  
  
  // INSERT VIDEOS WITHIN BEST-SELLERS COLLECTION
  
  $( "<li class='product video-best-seller'><style>.embed-container { position: relative; padding-bottom: /*56.25%*/ 70.5%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/CVuuYxCpTPY' frameborder='0' allowfullscreen></iframe></div><div class='video-caption'>MEET OUR ALL-TIME BEST SELLING PRODUCT: NATURAL DEODORANT</div></li>" ).insertAfter(".best-sellers-listing .product-4605802807380");
  //$( "<li class='product video-best-seller desktop'><style>.embed-container { position: relative; padding-bottom: /*56.25%*/ 70.5%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/9x2gujGwePA' frameborder='0' allowfullscreen></iframe></div><div class='video-caption'>PALO SANTO COLLECTION: CLEAR YOUR MIND, BODY + SPIRIT</div></li>" ).insertAfter(".best-sellers-listing .product-3560396849236");
  //$( "<li class='product video-best-seller mobile'><style>.embed-container { position: relative; padding-bottom: /*56.25%*/ 70.5%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/9x2gujGwePA' frameborder='0' allowfullscreen></iframe></div><div class='video-caption'>PALO SANTO COLLECTION: CLEAR YOUR MIND, BODY + SPIRIT</div></li>" ).insertAfter(".best-sellers-listing .product-4699762262100");
  $( "<li class='product content-best-seller'><a href='https://blog.primallypure.com/video-tutorial-dry-brushing-how-to-benefits/'><img src='https://cdn.shopify.com/s/files/1/0874/6120/t/105/assets/dry-brushing.jpg?v=1599857269' alt='How to Dry Brush' /></a></li>" ).insertAfter(".best-sellers-listing .product-2433182466132");
 
  // CUSTOM DROPDOWN MENUS FOR. CONTACT PAGES
  
  // SET UP INITIAL DROPDOWNS
  
  $("#form-main .select-selected").click(function() {
    $("#form-main .select-items").toggle();
  });
  
  $("#form-order .select-selected").click(function() {
    $("#form-order .select-items").toggle();
  });
  
  $("#form-product .select-selected").click(function() {
    $("#form-product .select-items").toggle();
  });
  
  $("#form-media .select-selected").click(function() {
    $("#form-media .select-items").toggle();
  });
  
  $("#form-spa .select-selected").click(function() {
    $("#form-spa .select-items").toggle();
  });
  
  $("#form-other .select-selected").click(function() {
    $("#form-other .select-items").toggle();
  });
  
  
  // INSERT PROMO TO DEO COLLECTION PAGE
  $( "<li class='product'><a href='https://primallypure.com/pages/deodorant-quiz'><img src='https://cdn.shopify.com/s/files/1/0874/6120/files/Deo-Quiz.png?v=1612459053' style='width: 100%'></a></li>" ).insertAfter("#7-natural-deodorants-best-organic-deodorant-primally-pure .product-46497660934");
  
  
  
  // if click outside of dropdown, hide options
  $(document).mouseup(function(e) {
      var container = $(".select-selected");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $(".select-items").hide();
      }
  });
  
  // SET UP SUBFORMS
  
  // if select "Order Assistance", show #form-order
  $("#form-order-select").click(function() {
	$(".subform, .sub-subform").hide(); // hide other subforms
    $("#form-order").show(); // show just this form
    $("#form-main .select-selected").html("Order Assistance"); // change main dropdown text
  });
  
  // if select "Product + Ingredient Questions", show #form-product
  $("#form-product-select").click(function() {
    $(".subform, .sub-subform").hide(); // hide other subforms
    $("#form-product").show(); // show just this form
    $("#form-main .select-selected").html("Product + Ingredient Questions"); // change main dropdown text
  });
  
  // if select "Media + Collaboration", show #form-media
  $("#form-media-select").click(function() {
    $(".subform, .sub-subform").hide(); // hide other subforms
    $("#form-media").show(); // show just this form
    $("#form-main .select-selected").html("Media + Collaboration"); // change main dropdown text
  });
  
  // if select "The Spa at Primally Pure", show #form-spa
  $("#form-spa-select").click(function() {
    $(".subform, .sub-subform").hide(); // hide other subforms
    $("#form-spa").show(); // show just this form
    $("#form-main .select-selected").html("The Spa at Primally Pure"); // change main dropdown text
  });
  
  // if select "Other", show #form-other
  $("#form-other-select").click(function() {
    $(".subform, .sub-subform").hide(); // hide other subforms
    $("#form-other").show(); // show just this form
    $("#form-main .select-selected").html("Other"); // change main dropdown text
  });
  
  // SET UP SUB-SUBFORMS
  
  // Order Assistance > Make Changes 
  $("#form-order #form-changes-select").click(function() {
	$("#form-order .select-selected").html("Make Changes to an Order"); // change main dropdown text
    $(".sub-subform").hide();
    $("#form-changes").show();
  });
  
  // Order Assistance > Lost
  $("#form-order #form-lost-select").click(function() {
	$("#form-order .select-selected").html("Lost, Damaged or Incorrect Shipment"); // change main dropdown text
    $(".sub-subform").hide();
    $("#form-lost").show();
  });
  
  // Order Assistance > Subscriptions
  $("#form-order #form-subscriptions-select").click(function() {
	$("#form-order .select-selected").html("Subscriptions"); // change main dropdown text
    $(".sub-subform").hide();
    $("#form-subscriptions").show();
  });
  
  // Order Assistance > Lost
  $("#form-order #form-order-other-select").click(function() {
	$("#form-order .select-selected").html("Other"); // change main dropdown text
    $(".sub-subform").hide();
    $("#form-order-other").show();
  });
  
  // Product + Ingredients > Unsatisfied
  $("#form-product #form-unsatisfied-select").click(function() {
	$("#form-product .select-selected").html("Unsatisfied with a Product"); // change main dropdown text
    $(".sub-subform").hide();
    $("#form-unsatisfied").show();
  });
  
  // Product + Ingredients > Skincare Regimens
  $("#form-product #form-skincare-select").click(function() {
	$("#form-product .select-selected").html("Skincare Regimens"); // change main dropdown text
    $(".sub-subform").hide();
    $("#form-skincare").show();
  });
  
  // Product + Ingredients > How to Use
  $("#form-product #form-how-select").click(function() {
	$("#form-product .select-selected").html("How to Use"); // change main dropdown text
    $(".sub-subform").hide();
    $("#form-how").show();
  });
  
  // Product + Ingredients > Other
  $("#form-product #form-product-other-select").click(function() {
	$("#form-product .select-selected").html("Other"); // change main dropdown text
    $(".sub-subform").hide();
    $("#form-product-other").show();
  });
  
  // Media > Media/PR
  $("#form-media #form-pr-select").click(function() {
	$("#form-media .select-selected").html("Media/PR"); // change main dropdown text
    $(".sub-subform").hide();
    $("#form-pr").show();
  });
  
  // Media > Events
  $("#form-media #form-events-select").click(function() {
	$("#form-media .select-selected").html("Events"); // change main dropdown text
    $(".sub-subform").hide();
    $("#form-events").show();
  });
  
  // Media > Influencer
  $("#form-media #form-influencer-select").click(function() {
	$("#form-media .select-selected").html("Influencer"); // change main dropdown text
    $(".sub-subform").hide();
    $("#form-influencer").show();
  });
  
  
  // Media > Partnerships
  $("#form-media #form-partnerships-select").click(function() {
	$("#form-media .select-selected").html("Partnerships"); // change main dropdown text
    $(".sub-subform").hide();
    $("#form-partnerships").show();
  });
  
  // Media > Blog
  $("#form-media #form-blog-select").click(function() {
	$("#form-media .select-selected").html("Pure Life Blog"); // change main dropdown text
    $(".sub-subform").hide();
    $("#form-blog").show();
  });
  
  // Media > Donations
  $("#form-media #form-donations-select").click(function() {
	$("#form-media .select-selected").html("Donations"); // change main dropdown text
    $(".sub-subform").hide();
    $("#form-donations").show();
  });
  
  // Media > Wholesale
  $("#form-media #form-wholesale-select").click(function() {
	$("#form-media .select-selected").html("Wholesale"); // change main dropdown text
    $(".sub-subform").hide();
    $("#form-wholesale").show();
  });
  
  // Media > Other
  $("#form-media #form-media-other-select").click(function() {
	$("#form-media .select-selected").html("Other"); // change main dropdown text
    $(".sub-subform").hide();
    $("#form-media-other").show();
  });
  
   
  // match faq answer box's height to its width
  var answerBoxWidth = $('.answer-box').width()*.8; 
    $('.answer-box').height(answerBoxWidth);
    $(window).resize(function(){
        $('.answer-box').height(answerBoxWidth);
    });
  

  // arrange special fields in the image on deodorant landing page 
  
  $(".special-fields .blue-tansy").prependTo(".product-1484436275284 .product-inner figure");
  $(".special-fields .charcoal").prependTo(".product-46497366022 .product-inner figure");
  $(".special-fields .geranium").prependTo(".product-46497660934 .product-inner figure");
  $(".special-fields .lavender").prependTo(".product-1081928259 .product-inner figure");
  $(".special-fields .lemongrass").prependTo(".product-813851587 .product-inner figure");
  $(".special-fields .tea-tree").prependTo(".product-8514678918 .product-inner figure");
  $(".special-fields .unscented").prependTo(".product-46490746886 .product-inner figure");
  //$(".special-fields .cleanse").prependTo(".product-5461545030 .product-inner figure, .product-5461558278 .product-inner figure, .product-8514300678 .product-inner figure, .product-5461577030 .product-inner figure");
  //$(".special-fields .tone").prependTo(".product-2934628163 .product-inner figure, .product-6311919430 .product-inner figure, .product-8972369030 .product-inner figure");
  //$(".special-fields .moisturize").prependTo(".product-3610333478996 .product-inner figure, .product-3610310180948 .product-inner figure, .product-42807394310 .product-inner figure, .product-3609959628884 .product-inner figure");
  //$(".special-fields .mask").prependTo(".product-4360103493716 .product-inner figure, .product-4360103493716 .product-inner figure, .product-4360105427028 .product-inner figure, .product-4360094580820");



   

  
    /*$(".first-time-slide").hide(); 
   
    // if this is NOT your first visit
    if(localStorage.getItem('firstVisit') == 'visited'){
      $(".first-time-slide").hide();
      $(".welcome-area").show();
      $(".section-title.section-border").show();
      localStorage.setItem('firstVisit','visited');
    }
    
    // if this IS your first visit
    if(localStorage.getItem('firstVisit') != 'visited'){
      $(".slideshow").hide();
      $(".first-time-slide").show();
      $(".welcome-area").hide();
      $(".featured-products").css("margin-top","75px");
      $(".section-title.section-border").hide();
      localStorage.setItem('firstVisit','visited');
    }
  */
  
  	var currentPath = window.location.pathname;
    var quizWrap = document.getElementById('quiz-result-wrap'); 
  
    if(currentPath == "/pages/deodorant-quiz-charcoal"){
        quizWrap.style.display = "block";
        document.getElementById('quiz-result-h2').innerHTML = "CHARCOAL EUCALYPTUS + MINT";
        document.getElementById('result-description-paragraph').innerHTML = "You are a relaxation junkie, have good taste in your genes and love all things simple and pure.  Your closet essentials are classic + timeless, you visit spas religiously, and in every aspect of your life you seek simplicity and well-being.  The refreshing, soothing scent of eucalyptus and peppermint is the perfect complement to your balanced lifestyle and positive outlook on life.  Plus, activated coconut charcoal attracts 1000x its weight and powerfully binds to toxins + impurities.  After applying your charcoal eucalyptus mint deodorant, take a few deep breaths to promote a sense of calm and balance in your body, mind and spirit.";
        document.getElementById('deodorant-action').innerHTML = "SHOP OUR CHARCOAL DEODORANT";
        $("#deodorant-action").attr("href", "/products/charcoal-deodorant");
    }
  	else if (currentPath == "/pages/deodorant-quiz-geranium") {
		quizWrap.style.display = "block";
      	document.getElementById('quiz-result-h2').innerHTML = "GERANIUM";
		document.getElementById('result-description-paragraph').innerHTML = "You are down to have a good time, enjoy the finer things in life and love all things floral, feminine and glam.  You believe life is better in high heels, you're the first to instigate girl's night out and you lead your life with dignity and grace.  The gentle, floral aroma of geranium is the perfect complement to your feminine appeal and sweet personality.  Plus, it aids in eliminating odor while reducing inflammation and rejuvenating skin.  After applying your geranium deodorant, take a few deep breaths to become grounded and reduce stress in your body, mind and spirit.";
  		document.getElementById('deodorant-action').innerHTML = "SHOP OUR GERANIUM DEODORANT";
		$("#deodorant-action").attr("href", "/products/geranium-deodorant");
	}
  	else if (currentPath == "/pages/deodorant-quiz-lavender") {
        quizWrap.style.display = "block";
        document.getElementById('quiz-result-h2').innerHTML = "LAVENDER";
        document.getElementById('result-description-paragraph').innerHTML = "You are free spirited, lighthearted and love all things natural, earthy and wild.  You pick wildflowers, you pursue your dreams regardless of what others think, and you discover beauty in everything - and everyone.  The light, floral smell of lavender is the perfect complement to your relaxed personality and positive vibes.  Plus, it has powerful healing properties to calm skin sensitivities and combat inflammation.  After applying your lavender deodorant, take a few deep breaths to promote peace and well-being in your body, mind and spirit.";
        document.getElementById('deodorant-action').innerHTML = "SHOP OUR LAVENDER DEODORANT";
        document.getElementById('quiz-result-title').style.color = '#363636';
        $("#deodorant-action").attr("href", "/products/lavender-deodorant");
    }
  	else if (currentPath == "/pages/deodorant-quiz-lemongrass") {
        quizWrap.style.display = "block";
        document.getElementById('quiz-result-h2').innerHTML = "LEMONGRASS";
        document.getElementById('result-description-paragraph').innerHTML = "You are spontaneous, live by the sun and love all things fresh, bright and barefoot.  Your laugh is contagious, you seek simplicity in life, and you let the waves + stresses of life roll off your shoulders.  The fresh, uplifting scent of lemongrass is the perfect complement to your bright personality and upbeat lifestyle.  Plus, it powerfully protects against odor-causing bacteria to keep you smelling clean long after the sun has set.  After applying your lemongrass deodorant, take a few deep breaths to boost energy and balance in your  body, mind and spirit.";
        document.getElementById('deodorant-action').innerHTML = "SHOP OUR LEMONGRASS DEODORANT";
        $("#deodorant-action").attr("href", "/products/lemongrass-deodorant");
  	}
  	else if (currentPath == "/pages/deodorant-quiz-tea-tree") {
        quizWrap.style.display = "block";
        document.getElementById('quiz-result-h2').innerHTML = "TEA TREE";
        document.getElementById('result-description-paragraph').innerHTML = "You are easy-going, willing to get your hands dirty and love all things active, adventurous and outdoorsy.  You come alive in the great outdoors, you give your all no matter if it's work or your workouts, and you won't let anything get in the way of what you want.  The clean, natural scent of Tea Tree is the perfect complement to your active lifesytle and laid-back personality.  Tea Tree essential oil is especially beneficial for its antibacterial, odor busting and natural cleansing properties.  After applying your tea tree deodorant, take a few deep breaths to invigorate and awaken your body, mind and spirit.";
        document.getElementById('deodorant-action').innerHTML = "SHOP OUR TEA TREE DEODORANT";
        $("#deodorant-action").attr("href", "/products/tea-tree-deodorant");
	}
  	else if (currentPath == "/pages/deodorant-quiz-unscented") {
        quizWrap.style.display = "block";
        document.getElementById('quiz-result-h2').innerHTML = "UNSCENTED";
        document.getElementById('result-description-paragraph').innerHTML = "You are mellow, minimal and don't make a fuss about much.  You're content with your current surroundings, you like to keep things pure and simple, and your life mantra is &quot; less is more&quot;.  The unscented formula is the perfect complement to your no-frills approach to life and low maintenance personality.  Plus, it effectively protects against odor and soothes sensitive skin without any essential oils.  After applying your unscented deodorant, take a few deep breaths to promote a sense of calm throughout your body, mind and spirit.";
        document.getElementById('deodorant-action').innerHTML = "SHOP OUR UNSCENTED DEODORANT";
        $("#deodorant-action").attr("href", "/products/sensitive-unscented-deodorant");
  	}
  	else if (currentPath == "/pages/deodorant-quiz-blue-tansy") {
        quizWrap.style.display = "block";
        document.getElementById('quiz-result-h2').innerHTML = "BLUE TANSY";
        document.getElementById('result-description-paragraph').innerHTML = "You are vibrant, believe imperfections are beautiful and love all things bright, floral and sweet.  You celebrate the little things in life, collect treasures from your travels and thrive on connection with others.  The floral, fruity smell of blue tansy is the perfect complement to your uplifting presence + optimistic personality.  Plus, it powerfully calms inflammation and combats unwanted odor.  After applying your blue tansy deodorant, take a few deep breaths to boost your mood + soothe your senses.";
        document.getElementById('deodorant-action').innerHTML = "SHOP OUR BLUE TANSY DEODORANT";
        $("#deodorant-action").attr("href", "/products/blue-tansy-deodorant");
  	}	
  
  	/*convert.$('.product-list li').each(function(){
      if(convert.$(this).find('.money').length > 0){
        var price = convert.$(this).find('.price');
        convert.$('<div class="start">Starts at</div>').prependTo(price);
      }
    });*/
   
   
   /* HOLIDAY COUNTDOWN 
   let dte = $('#hiddeneventdate').text();
   let rtime = $('#hiddenRemoveTime').text();
   console.log("dte:", dte);
   let now = new Date();


   $('.countdownend').text(formatDateTime(dte));
   $('.countdownwrap').removeClass('dws-hide');
   CountDownTimer(dte, 'countdown');

   function formatDateTime(dte){
     let deadline = new Date(Date.parse(dte));
     let deadlineDate = deadline.toDateString().slice(4,-5);
     let deadlineHours = deadline.getHours();
     let deadlineMinutes = (deadline.getMinutes() < 10) ? '0'+deadline.getMinutes() : deadline.getMinutes();
     let deadlineTime = (deadlineHours < 13) ? deadlineHours+":"+deadlineMinutes+"am" : deadlineHours-12+":"+deadlineMinutes+"pm";
     deadlineTime = deadlineDate + ", " + deadlineTime;
     return deadlineTime;
   }

   function CountDownTimer(dt, id) {

     let end = new Date(dt);

     let _second = 1000;
     let _minute = _second * 60;
     let _hour = _minute * 60;
     let _day = _hour * 24;
     let timer;

     function showRemaining() {
       let now = new Date();
       let distance = end - now;

       if (distance < 0) {
         clearInterval(timer);


         $('.clockheading').html($('#hiddenEndMessage').text());
         //$('.clockheading').addClass('mycolor');
         $('#countdown').remove();
         return;
       } else {
         $('#countdown').show();
         $('.clockbody').removeClass('clockhide')
       }

       let days = Math.floor(distance / _day);
       let hours = Math.floor((distance % _day) / _hour);
       let minutes = Math.floor((distance % _hour) / _minute);
       let seconds = Math.floor((distance % _minute) / _second);

       $('.days').text(days);
       $('.hours').text(hours);
       $('.minutes').text(minutes);
       $('.seconds').text(seconds);
     }

     timer = setInterval(showRemaining, 1000);
   }
   */
  
   //$('.saso-variants option:nth-child(3),.saso-variants option:nth-child(4)').remove();

   // add "Most popular!" in Recharge dropdown for the second option
   $('.rc_select__frequency option:nth-child(2)').append('(Most popular!)');
   

});



