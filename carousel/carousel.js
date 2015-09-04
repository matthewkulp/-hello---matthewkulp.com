$(document).ready(function(){

	//initializations
  var items = $("#carousel").children("li");
	var pictures = $("#carousel li").children("img");
	var descriptions = $("#carousel li .caption").children(".description");
  var counts = $("#carousel li .caption").children(".count");
  var descriptionAnimationTime = 400;
  var animationComplete = true;

  var i = 0;
  items.eq(i).addClass('active');


  items.css("display", "none");
  $('#shadowBox').css('display', "none")


  function descriptionEnters(i) {
    $(descriptions).eq(i).velocity(
      {
      opacity: [1, "ease-in", 0],
      translateY: [0, -15],
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




  function imageEnters (i) {
    pictures.css("z-index", "0");
    pictures.eq(i - 1).css("z-index", "1");
    pictures.eq(i).css("z-index", "2");
    pictures.eq(i).velocity("fadeIn", { duration: 400 });

  }





  function carouselIntroduction(i) {
    items.css("display", "");

    descriptions.css("opacity", "0");
    descriptionEnters(i);

    counts.css("opacity", "0");
    counts.eq(i).html(function() {
      return (i+1) + "/" + pictures.length
    });
    counts.velocity("fadeIn", { duration: 400 });

    pictures.css("opacity", "0");
    imageEnters(i);

    $('#shadowBox').css("opacity", "0");
    $('#shadowBox').css("display", "");
    $('#shadowBox').velocity("fadeIn", { duration: 600 });


  };

  setTimeout(function () {
      carouselIntroduction(i);
  }, 3000);






	function goTo(i){
		animationComplete = false

		items.removeClass('active')
					.eq(i).addClass('active');

    //Count Change
    counts.css("opacity", "0");
    counts.eq(i).css("opacity", "1");
    counts.eq(i).html(function() {
      return (i+1) + "/" + pictures.length
    });

		//Picture Changes
    imageEnters(i);


    //Description Fade Out Previous
    descriptions.eq(i-1).velocity(
      {
      opacity: [0, "ease-in", 1],
      translateY: "-15px",
      },
      {
      duration: descriptionAnimationTime,
      }
    );
    //Description Fade In New
    descriptionEnters(i);

	};





  //Click Advance
	$("#carousel img").on('click', function(){

    currentPic = $('.active').index();

    if (currentPic < pictures.length-1 && animationComplete){
      goTo(currentPic + 1);

    } else if (animationComplete) {
  	  goTo(0)
    }

	});

});
