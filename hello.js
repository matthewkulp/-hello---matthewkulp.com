var helloLetters = $('#hello span')

// Title Animations
function enterLetters(letterArray){
	letterArray.each(function(index, character) {
		var letter = $(this);

		setTimeout(function () {
			letter.velocity(
			{
			translateY: [0, [500, 20], -20],
			},
			{
			duration: 800,
			});


			letter.velocity(
			{
			rotateZ: [0, [200, 16], -40],
			},
			{
			queue: false,
			duration: 1300,
			});


			letter.velocity(
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



enterLetters(helloLetters);
