	var previousHitbox = $('.previous');
	var nextHitbox = $('.next');
	var mobileGifs = $('.mobileGif');


	// Detect Touch Device.
	if (Modernizr.touch) {

		// Get rid of .previous hitbox so a touch event advances in one direction.
		previousHitbox.hide();
		nextHitbox.css('width', '100%');

		// Remove mp4s
		$('.video').remove();

		// Take div attribute and turn it into an image and insert it in the div.
		mobileGifs.map(function() {
			$(this).append('<img src="' + $(this).attr('url') + '" />');
		});

	} else {
		mobileGifs.remove();
	};




	//Initializations
	var carousel = $('#carousel');
	var items = $("#carousel ul").children("li");
	var pictures = $("#carousel ul li").children(".imageContainer");
	var pictureInnards = $('#carousel ul li .imageContainer').children();
	var descriptions = $("#carousel ul li .caption").children(".description");
	var counts = $("#carousel ul li .caption").children(".count");
	var loader = $(".loader");
	var animationComplete = false;
	items.eq(0).addClass('active');
	var currentPic = $('.active').index();
	var exitingPic;
	var previousPic;
	var nextHitboxPic;
	var autoCycle;




	// Animations
	enterExitTime = 200;

	function imageEnters (enteringPic) {

		pictures.css("z-index", "0");
		pictures.eq(currentPic).css("z-index", "1");
		pictures.eq(enteringPic).css("z-index", "2");

		if (pictureInnards.eq(enteringPic).attr('isVideo') == 'true') {
			pictureInnards[enteringPic].play();
		};

		pictures.eq(enteringPic).velocity("fadeIn", {
			duration: enterExitTime * 2,
			complete: function(){
				pictures.eq(previousPic).css("display", "none");
				if (pictureInnards.eq(previousPic).attr('isVideo') == 'true') {
					pictureInnards[previousPic].load();
				};
			}
		});

	};




	function countChange (picIndex) {
		counts.eq(picIndex).html(function() {
			return (picIndex + 1) + "/" + pictures.length;
		});
	}




	function carouselIntroduction(picIndex) {
		items.css('opacity', '1');
		nextHitbox.css('display', 'block');
		previousHitbox.css('display', 'block');

		descriptions.css('opacity', '0');
		descriptionEnters(picIndex);

		countChange(picIndex);
		counts.velocity("fadeIn", { duration: enterExitTime });

		imageEnters(picIndex);
		animationComplete = true;
	};




	function next(){

		if (currentPic < pictures.length-1 && animationComplete){
			goTo(currentPic + 1);

		} else if (animationComplete) {
			goTo(0)
		}
	};




	function previous(){

		if (currentPic == 0 && animationComplete){
			goTo(pictures.length-1);
		} else if (animationComplete){
			goTo(currentPic - 1);
		}
	}




	// Description Animation
	descriptionYChange = 9;

	function descriptionExits (picIndex) {
		descriptions.eq(picIndex).velocity(
			{
			opacity: [0, "ease-in", 1],
			translateY: [descriptionYChange, 0],
			},
			{
			duration: enterExitTime,
			}
		);
	}

	function descriptionEnters(picIndex) {
		descriptions.eq(picIndex).velocity(
			{
			opacity: [1, "ease-in", 0],
			translateY: [0, descriptionYChange],
			},
			{
			duration: enterExitTime,
			delay: enterExitTime,
			complete:
				function() {
					animationComplete = true;
				},
			}
		);
	};




	function goTo(picIndex){
		nextPic = picIndex;
		previousPic = currentPic;
		animationComplete = false;

		//Count Change
		counts.css("opacity", "0");
		countChange(nextPic);
		counts.eq(nextPic).css("opacity", "1");

		//Picture Changes
		imageEnters(nextPic);

		//Description Change
		descriptionExits(currentPic);
		descriptionEnters(nextPic);

		//Make the picture in view .active and 'currentPic'
		items.removeClass('active')
		.eq(nextPic).addClass('active');
		currentPic = nextPic;
	};




	// Click Behavior
	nextHitbox.on('click', function() {
		if (animationComplete) {
			clearInterval(autoCycle);
			next();
			return false;
		}
	});

	previousHitbox.on('click', function() {
		if (animationComplete) {
			clearInterval(autoCycle);
			previous();
			return false;
		}
	});




	//Swipe Behavior
	carousel.on('swipeleft', function () {
		clearInterval(autoCycle);
		if (animationComplete) {
			next();
		}
	});

	carousel.on('swiperight', function () {
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




	// Loading Behavior
	loaderEnterExitTime = 500;


	loader.velocity("fadeIn", {duration: loaderEnterExitTime});

	setTimeout(function () {
		pictures.eq(currentPic).imagesLoaded( function() {
		      loader.velocity("fadeOut",
		      {
		      duration: loaderEnterExitTime,
		      complete: function() {
					carouselIntroduction(currentPic);
					// Set AutoCycle
					autoCycle = setInterval( next, 6000);
				},
			});
		})
	}, 1200);
