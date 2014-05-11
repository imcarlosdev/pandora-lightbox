##Pandora Lightbox
Just include jQuery and core files from "source/" folder and put "pandora-lightbox" class to your links.


	<a class="pandora-lightbox" href="picture.jpg">Load a picture</a>
	<a class="pandora-lightbox" href="document.htm">Load a document</a>

###Parameters
Change some parameters in file pandora.jquery.js and voilá!

	var transitionSpeed = 500;
	var offsetContent = 100; /*Margin top and botton for content*/
	var loadingPath = 'source/loading.gif'; /*The path of loading gif*/
