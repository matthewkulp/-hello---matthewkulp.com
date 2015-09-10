$(document).ready(function(){

	//Initializations
	var items = $("#carousel ul").children("li");
	var pictures = $("#carousel ul li .imageContainer").children("img");
	var descriptions = $("#carousel ul li .caption").children(".description");
	var counts = $("#carousel ul li .caption").children(".count");
	var loader = $(".loader");
	var descriptionAnimationTime = 260;
	var animationComplete = true;
	items.eq(0).addClass('active');
	var currentPic = $('.active').index();
	var exitingPic;
	var autoCycle;
	$('.previous, .next').css('z-index','4');

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




	// Start Stylings
	items.css('display', 'none');
	loader.css('display', 'none');
	$('.previous, .next').css('display', 'none');
	counts.css('opacity', '0');





	// Animations
	function descriptionEnters(currentPic) {
		$(descriptions).eq(currentPic).velocity(
			{
			opacity: [1, "ease-in", 0],
			translateY: [0, -10],
			},
			{
			duration: descriptionAnimationTime,
			delay: descriptionAnimationTime,
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
		pictures.eq(enteringPic).velocity("fadeIn", { duration: 400 });
	}




	function countChange (currentPic) {
		counts.eq(currentPic).html(function() {
			return (currentPic + 1) + "/" + pictures.length;
		});
	}




	function carouselIntroduction(currentPic) {
		items.css('display', '');
		$('.previous, .next').css('display', '');

		descriptions.css('opacity', '0');
		descriptionEnters(currentPic);

		countChange(currentPic);
		counts.velocity("fadeIn", { duration: 400 });

		pictures.css("opacity", "0");
		imageEnters(currentPic);

		$('#shadowBox').css("opacity", "0");
		$('#shadowBox').css("display", "");
		$('#shadowBox').velocity("fadeIn", { duration: 600 });
	};




	function next(){
		clearInterval(autoCycle);

		if (currentPic < pictures.length-1 && animationComplete){
			goTo(currentPic + 1);

		} else if (animationComplete) {
			goTo(0)
		}

	};

	function previous(){
		clearInterval(autoCycle);

		if (currentPic == 0 && animationComplete){
			goTo(pictures.length-1);
		} else if (animationComplete){
			goTo(currentPic - 1);
		}
	}


	function goTo(enteringPic){
		animationComplete = false
		enteringPic = enteringPic;

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
			duration: descriptionAnimationTime,
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
		}, 2000);
	}, 1600);




	// Click Behavior
	$('.next').on('click', next );
	$('.previous').on('click', previous );

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
