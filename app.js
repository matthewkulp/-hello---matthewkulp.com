var tStart = 600 // Start Y in px
	, tEnd = 1800   // End Y in px
	, cStart = [180, 170, 97] // Color 1
	, cEnd = [152, 184, 99]   // Color 2
	, cDiff = [cEnd[0] - cStart[0], cEnd[1] - cStart[1], cEnd[1] - cStart[0]];

var aboutBG = $('#aboutBG');
var mailchimp = $('#mailchimp input');
// var portrait = $('.portrait');
// var portraitEntered = false;



// Check for Chrome on iOS and ignore scroll events.
if(navigator.userAgent.match('CriOS')){

} else {
	// Animate background color
	$(document).scroll(function() {
		var p = ($(this).scrollTop() - tStart) / (tEnd - tStart); // % of transition
		p = Math.min(1, Math.max(0, p)); // Clamp to [0, 1]
		var cBg = [Math.round(cStart[0] + cDiff[0] * p), Math.round(cStart[1] + cDiff[1] * p), Math.round(cStart[2] + cDiff[2] * p)];
	     aboutBG.css('background-color', 'rgb(' + cBg.join(',') +')');


	//      if ($(this).scrollTop() > 390 && portraitEntered == false) {
	// 	     portrait.velocity({
	// 		     opacity: [1, "ease-in", 0],
	// 		     translateY: [12, 0],
	// 	     }, {
	// 		     duration: 800,
	// 	     });
	// 	     portraitEntered = true;
	//      }

	});

}




// Newsletter onClick behavior
mailchimp.on('click', function(){
	mailchimp.attr('placeholder', '');
})
