$(document).ready(function(){

	//Initializations
	var items = $("#carousel ul").children("li");
	console.log(items);
	var pictures = $("#carousel ul li .imageContainer").children("img");
	var descriptions = $("#carousel ul li .caption").children(".description");
	var counts = $("#carousel ul li .caption").children(".count");
	var loader = $(".loader");
	var descriptionAnimationTime = 260;
	var animationComplete = true;
	items.eq(0).addClass('active');
	var currentPic = $('.active').index();
	var autoCycle;

	console.log(items);
	console.log(currentPic);

	// Connect Carousel height to item height.
	function setCarouselHeight() {
		var itemHeight = items.css("height");
		$('#carousel').css("height", itemHeight);
	};
	setCarouselHeight();
	$( window ).resize(function() {
		 setCarouselHeight();
	});

	// Display Changes
	items.css("display", "none");
	loader.css('display', 'none')
	counts.css("opacity", "0");;
	$('#shadowBox').css('display', "none");


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




	function imageEnters (currentPic) {
		pictures.css("z-index", "0");
		pictures.eq(currentPic - 1).css("z-index", "1");
		pictures.eq(currentPic).css("z-index", "2");
		pictures.eq(currentPic).velocity("fadeIn", { duration: 400 });
	}




	function countChange (currentPic) {
		counts.eq(currentPic).html(function() {
			return (currentPic + 1) + "/" + pictures.length
		});
	}




	function carouselIntroduction(currentPic) {
		items.css("display", "");

		descriptions.css("opacity", "0");
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
		currentPic = $('.active').index();
		console.log(currentPic);
		if (currentPic < pictures.length-1 && animationComplete){
			goTo(currentPic + 1);

		} else if (animationComplete) {
			goTo(0)
		}
	};




	function goTo(currentPic){
		animationComplete = false

		items.removeClass('active')
		.eq(currentPic).addClass('active');

		//Count Change
		counts.css("opacity", "0");
		countChange(currentPic);
		counts.eq(currentPic).css("opacity", "1");

		//Picture Changes
		imageEnters(currentPic);

		//Description Fade Out Previous
		descriptions.eq(currentPic-1).velocity(
			{
			opacity: [0, "ease-in", 1],
			translateY: "-10px",
			},
			{
			duration: descriptionAnimationTime,
			}
		);

		//Description Fade In New
		descriptionEnters(currentPic);
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
						autoCycle = setInterval( next, 6000);
					},
				});
			})
		}, 2000);
	}, 1600);




  // Click Behavior
	pictures.on('click', function(){
		clearInterval(autoCycle);
		next();
	});


});
