$(document).ready(function(){
	// Detect Touch Device. If detected, hide the 'previous' hitbox and expand the 'next' hitbox
	var mobileGifs = $('.mobileGif');
	if (Modernizr.touch) {
		$('.previous').hide();
		$('.next').css('width', '100%');

		$('.video').remove();
		mobileGifs.map(function() {
			$(this).append('<img src="' + $(this).attr('url') + '" />');
		});
	} else {
		$('.mobileGif').remove();
	};

	//Initializations
	var items = $("#carousel ul").children("li");
	var pictures = $("#carousel ul li .imageContainer").children();
	var descriptions = $("#carousel ul li .caption").children(".description");
	var counts = $("#carousel ul li .caption").children(".count");
	var loader = $(".loader");
	enterExitTime = 200;
	var animationComplete = false;
	items.eq(0).addClass('active');
	var currentPic = $('.active').index();
	var exitingPic;
	var previousPic;
	var autoCycle;
	$('.previous, .next').css('z-index','4');
	$('.previous, .next').css('display','none');
	counts.eq(currentPic).html('# / #');

	// Connect Carousel height to item height.
	function setCarouselHeight() {
		var itemHeight = items.css("height");
		$('#carousel').css("height", itemHeight);

		var imageHeight = pictures.css("height");
		$('.previous, .next').css("height", imageHeight);
	};
	setCarouselHeight();




	$( window ).resize(function() {
		 setCarouselHeight();
	});




	// Pre-Load Stylings
	pictures.css("display", "none");
	pictures.eq(currentPic).css("display", "none");
	items.css('opacity', '0');
	loader.css('opacity', '0');
	$('.previous, .next').css('opacity', '0');
	counts.css('opacity', '0');









	// Animations
	function descriptionEnters(currentPic) {
		$(descriptions).eq(currentPic).velocity(
			{
			opacity: [1, "ease-in", 0],
			translateY: [0, -10],
			},
			{
			duration: enterExitTime,
			delay: enterExitTime,
			complete: function() {
					animationComplete = true;
				},
			}
		);
	};




	function imageEnters (enteringPic) {

		pictures.css("z-index", "0");
		pictures.eq(currentPic).css("z-index", "1");
		pictures.eq(enteringPic).css("z-index", "2");

		if (pictures.eq(enteringPic).attr('isVideo') == 'true') {
			pictures[enteringPic].play();
		};

		pictures.eq(enteringPic).velocity("fadeIn", {
			duration: enterExitTime * 2,
			complete: function(){
				pictures.eq(previousPic).css("display", "none");
				if (pictures.eq(previousPic).attr('isVideo') == 'true') {
					pictures[previousPic].load();
				};
			}
		});

	};




	function countChange (currentPic) {
		counts.eq(currentPic).html(function() {
			return (currentPic + 1) + "/" + pictures.length;
		});
	}




	function carouselIntroduction(currentPic) {
		items.css('opacity', '1');
		$('.previous, .next').css('display', '');

		descriptions.css('opacity', '0');
		descriptionEnters(currentPic);

		countChange(currentPic);
		counts.velocity("fadeIn", { duration: enterExitTime });

		imageEnters(currentPic);
		animationComplete = true;
	};




	function next(){

		if (currentPic < pictures.length-1 && animationComplete){
			goTo(currentPic + 1);

		} else if (animationComplete) {
			goTo(0)
		} else {
			return;
		}

	};




	function previous(){

		if (currentPic == 0 && animationComplete){
			goTo(pictures.length-1);
		} else if (animationComplete){
			goTo(currentPic - 1);
		}
	}


	var nextPic;

	function goTo(pic){
		nextPic = pic;
		previousPic = currentPic;
		animationComplete = false;

		//Count Change
		counts.css("opacity", "0");
		countChange(nextPic);
		counts.eq(nextPic).css("opacity", "1");

		//Picture Changes
		imageEnters(nextPic);

		//Description Fade Out Previous
		descriptions.eq(currentPic).velocity(
			{
			opacity: [0, "ease-in", 1],
			translateY: "-10px",
			},
			{
			duration: enterExitTime,
			}
		);

		//Description Fade In New
		descriptionEnters(nextPic);

		//Make the picture in view .active and 'currentPic'
		items.removeClass('active')
		.eq(nextPic).addClass('active');
		currentPic = nextPic;
	};




	// Loading Behavior
	setTimeout(function () {
		loader.velocity("fadeIn", {duration: 900});

		setTimeout(function () {
			pictures.eq(currentPic).imagesLoaded( function() {
			      loader.velocity("fadeOut",
			      {
			      duration: 900,
			      complete: function() {
						carouselIntroduction(currentPic);
						// Set AutoCycle
						autoCycle = setInterval( next, 6000);
					},
				});
			})
		}, 1000);
	}, 1600);




	// Click Behavior

	$('.next').on('click', function() {
		if (animationComplete) {
			clearInterval(autoCycle);
			next();
			return false;
		}
	});

	$('.previous').on('click', function() {
		if (animationComplete) {
			clearInterval(autoCycle);
			previous();
			return false;
		}
	});




	//Swipe Behavior
	$('#carousel').on('swipeleft', function () {
		clearInterval(autoCycle);
		if (animationComplete) {
			next();
		}
	});

	$('#carousel').on('swiperight', function () {
		clearInterval(autoCycle);
		if (animationComplete) {
			previous();
		}
	});




	$(document).keydown(function(e) {
		switch(e.which) {
			case 37: // left arrow key
				clearInterval(autoCycle);
				previous();
				break;

			case 39: // right arrow key
				clearInterval(autoCycle);
				next();
				break;

			default: return; // exit this handler for other keys
		}
		e.preventDefault(); // prevent the default action (scroll / move caret)
	});




});
