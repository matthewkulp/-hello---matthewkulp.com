$(document).ready(function(){

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




	// Detect Touch Device. If detected, hide the 'previous' hitbox and expand the 'next' hitbox
	if (Modernizr.touch) {
	    $('.previous').hide();
	    $('.next').css('width', '100%');
	}




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
				// animationComplete = true;
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
		// console.log('next');
		previousPic = currentPic;

		if (currentPic < pictures.length-1 && animationComplete){
			goTo(currentPic + 1);

		} else if (animationComplete) {
			goTo(0)
		} else {
			return;
		}

	};




	function previous(){
		// console.log('previous');
		previousPic = currentPic;

		if (currentPic == 0 && animationComplete){
			goTo(pictures.length-1);
		} else if (animationComplete){
			goTo(currentPic - 1);
		}
	}




	function goTo(enteringPic){
		console.log('goTo');
		animationComplete = false;
		// enteringPic = enteringPic;

		items.removeClass('active')
		.eq(enteringPic).addClass('active');

		//Count Change
		counts.css("opacity", "0");
		countChange(enteringPic);
		counts.eq(enteringPic).css("opacity", "1");

		//Picture Changes
		imageEnters(enteringPic);

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
		descriptionEnters(enteringPic);

		currentPic = $('.active').index();
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
		clearInterval(autoCycle);
		next();
		return false;
	});
	$('.previous').on('click', function() {
		clearInterval(autoCycle);
		previous();
		return false;
	});

	//Swipe Behavior
	$('#carousel').on('swipeleft', next );
	$('#carousel').on('swiperight', previous );




	$(document).keydown(function(e) {
		switch(e.which) {
			case 37: // left arrow key
				previous();
				break;

			case 39: // right arrow key
				next();
				break;

			default: return; // exit this handler for other keys
		}
		e.preventDefault(); // prevent the default action (scroll / move caret)
	});


});
