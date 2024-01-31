/*
PANDORA LIGHTBOX V1.0
License: MIT
Author: Carlos Maldonado @choquo
Github: https://github.com/choquo/pandora-lightbox
*/

var pandoraTransitionSpeed = 300;

function closePandoraLightbox(){
	jQuery("#pandora-lb-wrapper").fadeOut(pandoraTransitionSpeed, function(){ 
		jQuery("#pandora-lb-wrapper").remove(); 
		jQuery("body").css({"overflow":"visible"}); 
	}); 
}

jQuery(function(){

	jQuery("body").on("click", ".pandora-lightbox", function(){

		var uri = jQuery(this).attr('href');
		console.log(uri);

		//Reset all opened lightbox
		jQuery("#pandora-lb-wrapper").remove();

		//Prepare lightbox layout
		jQuery("body").prepend(''+
			'<div id="pandora-lb-wrapper" style="opacity: 0;">'+
				'<div id="pandora-lb-content">'+
					'<div id="pandora-lb-content-inner">'+
						'<div id="pandora-lb-loading">'+
							'<!-- SVG encoded in: https://base64.guru/converter/encode/image/svg --> <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwcHgiICBoZWlnaHQ9IjIwMHB4IiAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIGNsYXNzPSJsZHMtcm9sbGluZyIgc3R5bGU9ImJhY2tncm91bmQ6IG5vbmU7Ij4KICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIGZpbGw9Im5vbmUiIG5nLWF0dHItc3Ryb2tlPSJ7e2NvbmZpZy5jb2xvcn19IiBuZy1hdHRyLXN0cm9rZS13aWR0aD0ie3tjb25maWcud2lkdGh9fSIgbmctYXR0ci1yPSJ7e2NvbmZpZy5yYWRpdXN9fSIgbmctYXR0ci1zdHJva2UtZGFzaGFycmF5PSJ7e2NvbmZpZy5kYXNoYXJyYXl9fSIgc3Ryb2tlPSIjYjFiMWIxIiBzdHJva2Utd2lkdGg9IjEwIiByPSIzNSIgc3Ryb2tlLWRhc2hhcnJheT0iMTY0LjkzMzYxNDMxMzQ2NDE1IDU2Ljk3Nzg3MTQzNzgyMTM4IiB0cmFuc2Zvcm09InJvdGF0ZSgyOTQgNTAgNTApIj4KICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGNhbGNNb2RlPSJsaW5lYXIiIHZhbHVlcz0iMCA1MCA1MDszNjAgNTAgNTAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMXMiIGJlZ2luPSIwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KICAgIDwvY2lyY2xlPgogIDwvc3ZnPg==">'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'
		);

		//Show the background of the lightbox
		jQuery("#pandora-lb-wrapper").animate({opacity: 1}, pandoraTransitionSpeed, function() {

			setTimeout(function(){
		
				//On animation complet Load content

				//Begin load content
				jQuery("body").css({'overflow': 'hidden'});

				//*** PDF
				if( /\.pdf/.test(uri) ){
					var content = '<div onclick="closePandoraLightbox()" style="background: white; padding: 2px 12px; position: absolute; z-index: 1; right: 0px; top: 0px; cursor: pointer; font-size: 24px; color: #818a91;">×</div>'+
								  '<iframe allowfullscreen webkitallowfullscreen id="pandora-lb-iframe" style="border: none; width: 100%;" src="source/vendors/ViewerJS/#../../../'+uri+'"></iframe>';
					jQuery("#pandora-lb-content-inner").html(content);
					jQuery("#pandora-lb-wrapper").fadeIn(pandoraTransitionSpeed);
					jQuery("#pandora-lb-iframe").height( parseInt(jQuery("#pandora-lb-wrapper").height())-60 );
					return false;
				}

				//*** Images
				if( /\.png|\.jpg|\.jpeg|\.bmp|\.gif|\.svg/.test(uri) ){
					var content = '<div style="position: relative;">'+
									'<div onclick="parent.closePandoraLightbox()" style="background: white; padding: 2px 12px; position: absolute; z-index: 1; right: 0px; top: 0px; cursor: pointer; font-size: 24px; color: #818a91;">×</div>'+
									'<img class="pandora-lb-image" src="'+uri+'">'+
								 '</div>';
					jQuery("#pandora-lb-content-inner").html(content);
					jQuery("#pandora-lb-wrapper").fadeIn(pandoraTransitionSpeed);
					return false;
				}

				//*** External pages
				if( /http\:|https\:/.test(uri) ){
					var content = '<div onclick="closePandoraLightbox()" style="background: white; padding: 2px 12px; position: absolute; z-index: 1; right: 0px; top: 0px; cursor: pointer; font-size: 24px; color: #818a91;">×</div>'+
								  '<iframe allowfullscreen webkitallowfullscreen id="pandora-lb-iframe" style="border: none; width: 100%;" src="'+uri+'"></iframe>';
					jQuery("#pandora-lb-content-inner").html(content);
					jQuery("#pandora-lb-wrapper").fadeIn(pandoraTransitionSpeed);
					jQuery("#pandora-lb-iframe").height( parseInt(jQuery("#pandora-lb-wrapper").height())-60 );
					return false;
				}

				//*** HTML PHP - Documents (internal)
				if( /\.htm|\.html|\.php/.test(uri) ){
					var req  =	jQuery.get(uri, function(content){
									jQuery("#pandora-lb-content-inner").html(content);
									jQuery("#pandora-lb-wrapper").fadeIn(pandoraTransitionSpeed);
							  	});
					jQuery("#pandora-lb-wrapper").bind("click", function(){ req.abort(); });
					return false;
				}
			},400);

		});

		return false;

	});


	
	//Close Lightbox
	jQuery("body").on("click", "#pandora-lb-content-inner *", function(e){ 
		e.stopPropagation(); 
	});
	jQuery("body").on("click", "#pandora-lb-wrapper, #pandora-lb-content, #pandora-lb-content-inner", function(e){
		closePandoraLightbox();
	});

});
	
//Close Lightbox on press ESC
jQuery(document).keyup(function(e) {
     if (e.keyCode == 27) {
        closePandoraLightbox();
    }
});