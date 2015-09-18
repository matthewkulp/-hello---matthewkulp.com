



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
var descriptions = $("#carousel ul li").children(".description");
var inViewImageContainer = $('#carousel .imageContainer');
var loader = $(".loader");
var animationComplete = false;
items.eq(0).addClass('active');
var currentItem = $('.active').index();
var currentImage = $('.currentImage');
var nextImage = $('.nextImage');
var nextDescription = $('.nextDescription');
var count = $('.count');
var autoCycle;




enterExitTime = 200;
descriptionYChange = 9;

function goTo(itemIndex){
	nextItem = itemIndex;
	animationComplete = false;

	//Count Change
	countChange(itemIndex);

	//Image Changes
	nextImage.empty();
	nextImage.css('opacity', '0');
	nextImage.html(pictures.eq(nextItem).html());
	if (nextImage.children().attr('isVideo') == 'true') {
		var video = nextImage.children();
		video[0].play();
	};
	nextImage.velocity('fadeIn', {
		duration: enterExitTime * 2,
		complete: function() {
				currentImage.html(nextImage.html());
			},
		}
	)

	// Description Changes
	nextDescription.velocity(
		{
		opacity: [0, "ease-in", 1],
		translateY: [descriptionYChange, 0],
		},
		{
		duration: enterExitTime,
		complete: function() {
			nextDescription.html(descriptions.eq(nextItem).html());
			nextDescription.velocity(
				{
				opacity: [1, "ease-in", 0],
				translateY: [0, descriptionYChange],
				},
				{
				duration: enterExitTime,
				complete: function() {
					animationComplete = true;
				}
			})
		}
	});


	// Make the nextItem .active
	items.removeClass('active')
		.eq(nextItem).addClass('active');
	currentItem = nextItem;


};




// Count Change
var firstCountChange = true;

function countChange (itemIndex) {
	count.html(function() {
		return (itemIndex + 1) + "/" + pictures.length;
	});

	if (firstCountChange == true) {
		count.velocity({
			opacity:[1, 'ease-in', 0],
			translateY: [0, descriptionYChange],
		},
		{
			duration: enterExitTime,
			delay: enterExitTime,
			complete: function() {
				firstCountChange = false;
			}
		})
	};
}




function carouselIntroduction(itemIndex) {
	nextHitbox.css('display', 'inherit');
	previousHitbox.css('display', 'inherit');

	goTo(itemIndex);

	first = true;
};




// Loading Behavior
loaderEnterExitTime = 500;

loader.velocity("fadeIn", {
	duration: loaderEnterExitTime
});

setTimeout(function () {
	pictures.eq(currentItem).imagesLoaded( function() {
	      loader.velocity("fadeOut",
	      {
	      duration: loaderEnterExitTime,
	      complete: function() {
				carouselIntroduction(currentItem);
				// // Set AutoCycle
				autoCycle = setInterval( next, 6000);
			},
		});
	})
}, 1100);




function next(){

	if (currentItem < pictures.length-1 && animationComplete){
		goTo(currentItem + 1);

	} else if (animationComplete) {
		goTo(0)
	}

};




function previous(){

	if (currentItem == 0 && animationComplete){
		goTo(pictures.length-1);
	} else if (animationComplete){
		goTo(currentItem - 1);
	}

}




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
inViewImageContainer.on('swipeleft', function () {

	clearInterval(autoCycle);
	if (animationComplete) {
		next();
	}

});




inViewImageContainer.on('swiperight', function () {

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
