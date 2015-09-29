// Add feature
// Project Titles for slideshow captions.
// Sudo code:
// Flag titles in the html so that (a) they can be styled with CSS and (b) their contents can be examined by a jQuery selector
// Style the titles to spec,
// Get the title of the currentItem,
// Get the title of the nextItem,
// Compare the titles
// If they equal each other, change them WITHOUT animations. Else, change the title with an animation.
// Make sure that the count changes when the exit animation for the link completes. exit animation > count change > enter animation.

// Building the link algorithm.
// Some projects do not have links. Because I'm building a bunch of arrays for all of the carousel elements and I'm using index to keep track, this means I have to build a link array that keeps blank spots. Test that it's capable of doing that. By adding a link div for each item and having jquery build an array, check the length.


// Planning:
// if innerHTML of this.items == innerHTML thelast.items then skip link animation and title animation.

// ELSE..
// Do this for the link:
// 1. Link Animate Out
// 2.a. if innerHTML.is(':empty') == true && hasURL == true,  then .css('opacity', '0') AND .unwrap() img AND set hasURL = false
// 2.b. if innterHTML.is(':empty') == false,  then .css('opacity', '1') and .wrap('<a href="' + links(currentItem).innerHTML() + '" target="_blank"></div> )
// 3. Link Animate In

//Do this for the title:
// 1. Title Animate Out
// 2. Change contents of title div
// 3. Title Animate In





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
var items = $("#carousel ul li");
var pictures = $("ul .image");
var descriptions = $("ul .description");
var inViewImage = $('.inview .imageContainer');
var loader = $(".loader");
var animationComplete = false;
items.eq(0).addClass('active');
var currentItem = $('.active').index();
var currentImage = $('.currentImage');
var nextImage = $('.nextImage');
var inViewDescription = $('.inview .description');
var inViewTitle = $('.inview .title');
var inViewLink = $('.inview .link');
var count = $('.count');
var autoCycle;


var links = $('ul .link');
var titles = $('ul .title');
var linkImage = $('.inview .link img');
firstGoToCall = true;


enterExitTime = 200;
descriptionYChange = 9;






function goTo(itemIndex){
	nextItem = itemIndex;
	animationComplete = false;

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
	inViewDescription.velocity(
		{
		opacity: [0, "ease-in", 1],
		translateY: [descriptionYChange, 0],
		},
		{
		duration: enterExitTime,
		complete: function() {
			inViewDescription.html(descriptions.eq(nextItem).html());
			inViewDescription.velocity(
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




	// Title Changes
	inViewTitle.velocity(
		{
		opacity: [0, "ease-in", 1],
		translateY: [descriptionYChange, 0],
		},
		{
		duration: enterExitTime,
		complete: function() {
			inViewTitle.html(titles.eq(nextItem).html());
			inViewTitle.velocity(
				{
				opacity: [1, "ease-in", 0],
				translateY: [0, descriptionYChange],
				},
				{
				duration: enterExitTime,
			})
		}
	});




	// Link Changes
	if (firstGoToCall) {
		countChange(nextItem)

		setTimeout(function(){
			linkEnter(nextItem);
		}, enterExitTime);

	} else {
		inViewLink.velocity(
			{
			opacity: [0, "ease-in", 1],
			translateY: [descriptionYChange, 0],
			},
			{
			duration: enterExitTime,
			complete: function() {
				linkEnter(nextItem);
			}
		});
	}

	// Change the count
	if (firstGoToCall == false) {
		setTimeout(function() {
			countChange(itemIndex);
		}, enterExitTime)
	};

	// Make the nextItem .active
	items.removeClass('active')
		.eq(nextItem).addClass('active');
	currentItem = nextItem;


	firstGoToCall = false;

};




function linkEnter (itemIndex) {
	// Change the link
	var itemURL = links.eq(itemIndex).html();
	linkImage.unwrap();
	linkImage.wrap('<a href="' + itemURL + '" target="_blank"></div>');

	// If the item doesn't have URL, hide the link img.
	if ($.trim(links.eq(itemIndex).html()).length == 0) {
		linkImage.css('display', 'none');
	} else {
		linkImage.css('display', 'initial');
	};

	// Enter Animation
	inViewLink.velocity(
		{
		opacity: [1, "ease-in", 0],
		translateY: [0, descriptionYChange],
		},
		{
		duration: enterExitTime,
	})
};




// Count Change

function countChange (itemIndex) {
	count.html(function() {
		return (itemIndex + 1) + "/" + pictures.length;
	});

	if (firstGoToCall == true) {
		count.velocity({
			opacity:[1, 'ease-in', 0],
			translateY: [0, descriptionYChange],
		},
		{
			duration: enterExitTime,
			delay: enterExitTime,
		})
	};
};




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
inViewImage.on('swipeleft', function () {

	clearInterval(autoCycle);
	if (animationComplete) {
		next();
	}

});




inViewImage.on('swiperight', function () {

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
