$(document).ready(function(){

	var tStart = 600 // Start Y in px
		, tEnd = 1800   // End Y in px
		, cStart = [180, 170, 97] // Color 1
		, cEnd = [147, 197, 83]   // Color 2
		, cDiff = [cEnd[0] - cStart[0], cEnd[1] - cStart[1], cEnd[1] - cStart[0]];


	// Golden Rod - rgb(187, 156, 105)
	// Yellowed Golden Rod - rgb(180, 170, 97)


	// Set the color theme (background color, hello, and loader match)
	$("#aboutBG").css('background-color', 'rgb(' + cStart + ')');
	$('#hello').css('color', 'rgb(' + cStart + ')');
	$('.loader').css('border-color', 'rgba(' + cStart + ', .2)');
	$('.loader').css('border-left-color', 'rgba(' + cStart + ', 1)');

	var helloLetters = $('#hello span')
		,aboutLetters = $('#about span');

	helloLetters.css("opacity", "0");
	aboutLetters.css("opacity", "0");
	aboutAnimated = false;




	// Background Animation
	$(document).scroll(function() {
		var p = ($(this).scrollTop() - tStart) / (tEnd - tStart); // % of transition
		p = Math.min(1, Math.max(0, p)); // Clamp to [0, 1]
		var cBg = [Math.round(cStart[0] + cDiff[0] * p), Math.round(cStart[1] + cDiff[1] * p), Math.round(cStart[2] + cDiff[2] * p)];
	     $("#aboutBG").css('background-color', 'rgb(' + cBg.join(',') +')');
	});




	// Title Animations
	function enterLetters(letterArray){
		letterArray.each(function(index, character) {
			var letter = this

			setTimeout(function () {
				$(letter).velocity(
				{
				translateY: ["15", [150, 12]],
				},
				{
				duration: 500,
				});


				$(letter).velocity(
				{
				rotateZ: [0, [200, 16], -40],
				},
				{
				queue: false,
				duration: 600,
				});


				$(letter).velocity(
				{
				opacity: [1, "ease-in", 0],
				},
				{
				queue: false,
				duration: 200,
				});

			}, index * 80);
		});
	};




	setTimeout(function() {
		enterLetters(helloLetters);
	}, 500);




	$(document).scroll(function() {
		if ($(this).scrollTop() > 200) {
			if (aboutAnimated == false) {
				aboutAnimated = true;
				enterLetters(aboutLetters);
		     }
		}
	});




	// Newsletter Behavior
	$(document).ready(function(){
		$('#mailchimp').on('click', function(){
			$('#mailchimp input').attr('placeholder', '');
		})
	})

	function updateColor () {
		var p = (Math.abs(this.y) - tStart) / (tEnd - tStart); // % of transition
		p = Math.min(1, Math.max(0, p)); // Clamp to [0, 1]
		var cBg = [Math.round(cStart[0] + cDiff[0] * p), Math.round(cStart[1] + cDiff[1] * p), Math.round(cStart[2] + cDiff[2] * p)];
		$("#aboutBG").css('background-color', 'rgb(' + cBg.join(',') +')');
	};

	if(navigator.userAgent.match('CriOS')){
    // Wrap content in iScroll elements
    $( '#page' ).wrap( '<div id="wrapper"><div id="scroller"></div></div>' );

    // Start iScroll
    myScroll = new IScroll('#wrapper', {
	  click: true,
	  tap: true,
	  probeType: 3,
	//   eventPassthrough: 'horizontal',
    });

    myScroll.on('scroll', updateColor);

    // Prevent default scroll
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

}

});
