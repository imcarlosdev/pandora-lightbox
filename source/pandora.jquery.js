/*
PANDORA LIGHTBOX V1.0
THIS WORK IS UNDER MIT LICENCE http://opensource.org/licenses/MIT 
With tons of love by @choquo - Release Date 11-05-2014 
*/

var transitionSpeed = 500;
var offsetContent = 100; /*Margin top and botton for content*/
var loadingPath = 'source/loading.gif'; /*The path for loading gif*/

$(function(){

	$(".pandora-lightbox").click(function(){

		/*Reset all opened lightbox*/
		$("#pandora-lb-wrapper").remove();

		/*Prepare lightbox layout*/
		$("body").prepend('<div id="pandora-lb-wrapper"><div id="pandora-lb-content"><div id="pandora-lb-content-inner"><div id="pandora-lb-loading"><img src="'+loadingPath+'"></div></div></div> <script>$(function(){ $("#pandora-lb-content-inner").click(function(e){ e.stopPropagation(); }); $("#pandora-lb-wrapper, #pandora-lb-content").click(function(e){ $("#pandora-lb-wrapper").fadeOut('+transitionSpeed+', function(){ $("#pandora-lb-wrapper").remove(); $("body").css({"overflow":"visible"}); }); }); });</script></div>');

		/*Load content*/
		var uri = $(this).attr('href');
		
		$("body").css({'overflow': 'hidden'});

		/*Documents*/
		if(/.php|.htm|.html/.test(uri)){
			var req = $.get(uri, function(content){
						$("#pandora-lb-wrapper").fadeIn(transitionSpeed);
						$("#pandora-lb-content-inner").html(content).animate({'margin-top': offsetContent, 'margin-bottom': offsetContent}, transitionSpeed);
						
					});
			$("#pandora-lb-wrapper").bind("click", function(){ 	req.abort(); });

			return false;
		}

		/*Images*/
		if(/.png|.jpg/.test(uri)){
			var content = '<img src="'+uri+'">';
			var req = $.get(uri, function(){
						$("#pandora-lb-content-inner").html(content).animate({'margin-top': offsetContent, 'margin-bottom': offsetContent}, transitionSpeed);
						$("#pandora-lb-wrapper").fadeIn(transitionSpeed);
					  });
			
			$("#pandora-lb-wrapper").bind("click", function(){ 	req.abort(); });

			return false;
		}

		return false;

	});

});