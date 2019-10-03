$(document).ready(function () {

	/* ======= Highlight.js Plugin ======= */
	/* Ref: https://highlightjs.org/usage/ */
	$('pre code').each(function (i, block) {
		hljs.highlightBlock(block);
	});

	/* ======= Here comes my own stuff ======= */ 
	$('hint').prepend("<p><b>Hint</b></p>");
	$('excurs').each(function () {
		var name = $(this).data('name');
		$(this).prepend("<p><b>Excurs: " + name + "</b></p>");
	});

	/* ======= ToC ======= */ 
	$('#toc').initTOC({
		// headers selector
		selector: 'h1, h2, h3, h4, h5, h6',
		// selector to specify elements search scope
		scope: 'body',
		// whether to overwrite existed headers' id
		overwrite: false,
		// string to prepend to id/href property
		prefix: 'toc'
	});
});
