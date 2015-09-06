$(document).ready(function(){

  var click = function(){
    $('h1 span').each(function(index, character) {
      var span = this

      setTimeout(function () {
        $(span).velocity(

          {
          translateY: ["15", [150, 12]],
          },
          {
          duration: 500,
          }

        );

        $(span).velocity(

          {
          rotateZ: [0, [200, 16], -40],
          },
          {
          queue: false,
          duration: 600,
          }

        );

        $(span).velocity(

          {
          opacity: [1, "ease-in", 0],
          },
          {
          queue: false,
          duration: 200,
          }

        );

      }, index * 80);

    });
  }

  setTimeout(function() {
    click();
  }, 300);

})

// span.css([opacity: "0", position: "relative"]);



// var colors = ["#ddd", "#333", "#999", "#bbb"]

// var randomIndex = Math.floor(Math.random() * colors.length);

// $('#work img').rotate({ startDeg:-25, endDeg:0, easing:'ease-in' });

// $(span).rotate({ startDeg:-25, endDeg:0, easing:'ease-in' });
// $(span).css("color", colors[randomIndex]);
// rotation += 45;

// $(span).css({'-webkit-transform' : 'rotate(45deg)',
//            '-moz-transform' : 'rotate(45deg)',
//            '-ms-transform' : 'rotate(45deg)',
//            'transform' : 'rotate(45deg)'});




//apply animation to the whole hello.'
//figure out how to separate each letter.
//figure out how to stagger each animation.

//what do the children of hello look like?
//jquery each letter in a div element to
//span selects just text and makes an object around it. more specific / precise than a div.
