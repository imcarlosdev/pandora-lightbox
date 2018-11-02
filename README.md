## Pandora Lightbox
Pandora is a lightweight lightbox, it works fine on iPad, pc, mac. you can load content with height overflowed and scroll the lightbox content without pain.

### Usage

Just include jQuery and core files from "source/" folder.
	
	<link rel="stylesheet" href="source/pandora.style.css">	
	<script src="source/jquery.min.js"></script>
	<script src="source/pandora.jquery.js"></script>

And put "pandora-lightbox" class to your links.

	<a class="pandora-lightbox" href="picture.jpg">Load a picture</a>
	<a class="pandora-lightbox" href="document.htm">Load a document</a>

### Parameters
Change some parameters in file pandora.jquery.js and voilá!

	var transitionSpeed = 500;
	var offsetContent = 100; /*Margin top and botton for content*/
	var loadingPath = 'source/loading.gif'; /*The path of loading gif*/
