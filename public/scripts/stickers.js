
$(document).ready(function(){
    $(".navbar-default").hide();
      $(window).scroll(function() { 
        if ($(document).scrollTop() > 650) { 
          $(".navbar-default").show();
          $(".navbar-default").css("background-color", "#3d69c9").css("opacity", "0.9"); 
        }else{
        	$(".navbar-default").hide();
        }
      });
});