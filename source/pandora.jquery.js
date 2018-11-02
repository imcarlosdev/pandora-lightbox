/*
PANDORA LIGHTBOX V1.0
License: MIT
Author: Carlos Maldonado @choquo
Github: https://github.com/choquo/pandora-lightbox
*/

var pandoraTransitionSpeed = 300;
var pdLoadingPath = 'source/loading.svg'; /*The path for loading gif*/

function closePandoraLightbox(){
	$("#pandora-lb-wrapper").fadeOut(pandoraTransitionSpeed, function(){ 
		$("#pandora-lb-wrapper").remove(); 
		$("body").css({"overflow":"visible"}); 
	}); 
}

$(function(){

	$(".pandora-lightbox").click(function(){

		var uri = $(this).attr('href');
		console.log(uri);

		//Reset all opened lightbox
		$("#pandora-lb-wrapper").remove();

		//Prepare lightbox layout
		$("body").prepend(''+
			'<div id="pandora-lb-wrapper" style="opacity: 0;">'+
				'<div id="pandora-lb-content">'+
					'<div id="pandora-lb-content-inner">'+
						'<div id="pandora-lb-loading">'+
							'<img src="'+pdLoadingPath+'">'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'
		);

		//Show the background of the lightbox
		$("#pandora-lb-wrapper").animate({opacity: 1}, pandoraTransitionSpeed, function() {

			setTimeout(function(){
		
				//On animation complet Load content

				//Begin load content
				$("body").css({'overflow': 'hidden'});

				//*** PDF
				if( /\.pdf/.test(uri) ){
					var content = '<iframe allowfullscreen webkitallowfullscreen id="pandora-lb-iframe" style="border: none; width: 100%;" src="source/vendors/ViewerJS/#../../../'+uri+'"></iframe>';
					$("#pandora-lb-content-inner").html(content);
					$("#pandora-lb-wrapper").fadeIn(pandoraTransitionSpeed);
					$("#pandora-lb-iframe").height( parseInt($("#pandora-lb-wrapper").height())-60 );
					return false;
				}

				//*** Images
				if( /\.png|\.jpg|\.jpeg|\.bmp|\.gif|\.svg/.test(uri) ){
					var content = '<img class="pandora-lb-image" src="'+uri+'">';
					$("#pandora-lb-content-inner").html(content);
					$("#pandora-lb-wrapper").fadeIn(pandoraTransitionSpeed);
					return false;
				}

				//*** External pages
				if( /http\:|https\:/.test(uri) ){
					var content = '<iframe allowfullscreen webkitallowfullscreen id="pandora-lb-iframe" style="border: none; width: 100%;" src="'+uri+'"></iframe>';
					$("#pandora-lb-content-inner").html(content);
					$("#pandora-lb-wrapper").fadeIn(pandoraTransitionSpeed);
					$("#pandora-lb-iframe").height( parseInt($("#pandora-lb-wrapper").height())-60 );
					return false;
				}

				//*** HTML PHP - Documents (internal)
				if( /\.htm|\.html|\.php/.test(uri) ){
					var req  =	$.get(uri, function(content){
									$("#pandora-lb-content-inner").html(content);
									$("#pandora-lb-wrapper").fadeIn(pandoraTransitionSpeed);
							  	});
					$("#pandora-lb-wrapper").bind("click", function(){ 	req.abort(); });
					return false;
				}
			},400);

		});

		return false;

	});


	
	//Close Lightbox
	$("body").on("click", "#pandora-lb-content-inner *", function(e){ 
		e.stopPropagation(); 
	});
	$("body").on("click", "#pandora-lb-wrapper, #pandora-lb-content, #pandora-lb-content-inner", function(e){
		closePandoraLightbox();
	});

});
	
//Close Lightbox on press ESC
$(document).keyup(function(e) {
     if (e.keyCode == 27) {
        closePandoraLightbox();
    }
});