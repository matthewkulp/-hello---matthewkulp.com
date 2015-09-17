	var tStart = 600 // Start Y in px
		, tEnd = 1800   // End Y in px
		, cStart = [180, 170, 97] // Color 1
		, cEnd = [147, 197, 83]   // Color 2
		, cDiff = [cEnd[0] - cStart[0], cEnd[1] - cStart[1], cEnd[1] - cStart[0]];

	var aboutBG = $('#aboutBG');
	var mailchimp = $('#mailchimp input');




	var items = $("#carousel ul").children("li");
	var pictures = $("#carousel ul li .imageContainer").children();
	var carousel = $('#carousel');
	items.eq(0).addClass('active');
	var activePic = $('.active').index(); // returns a number


	function setCarouselHeight() {
		var activePic = $('.active').index(); // returns a number
		var itemHeight = items.eq(activePic).css("height");

		carousel.css("height", itemHeight);

		var imageHeight = pictures.css("height");
		 $('.next').css("height", imageHeight);
		$('.previous').css("height", imageHeight);
	};

	setCarouselHeight();




	// Reset carousel height on resize for non-touch devices.
	if (Modernizr.touch == false) {
		$( window ).resize(function() {
			 setCarouselHeight();
		});
	}




	$('#greeting').css('height', 'auto');

	// Check for Chrome on iOS and ignore scroll events.
	if(navigator.userAgent.match('CriOS')){

	} else {
		// Animate background color
		$(document).scroll(function() {
			var p = ($(this).scrollTop() - tStart) / (tEnd - tStart); // % of transition
			p = Math.min(1, Math.max(0, p)); // Clamp to [0, 1]
			var cBg = [Math.round(cStart[0] + cDiff[0] * p), Math.round(cStart[1] + cDiff[1] * p), Math.round(cStart[2] + cDiff[2] * p)];
		     aboutBG.css('background-color', 'rgb(' + cBg.join(',') +')');
		});

	}




	// Newsletter onClick behavior
	mailchimp.on('click', function(){
		mail.attr('placeholder', '');
	})
