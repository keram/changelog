

$().ready(function () {
	'use strict';

	// smells
	var main = $('#main-content'),
		location = document.location,
		proxy_url = location.protocol + '//' + location.host + '/proxy';

	$('#sidebar').delegate('a', 'click', function (e) {
		var a = $(this),
			href = a.attr('href'),
			url = proxy_url,
			is_primary = a.hasClass('primary');
		e.preventDefault();
		e.stopPropagation();					

		if (is_primary) {
			url += '?url=' + encodeURIComponent(href);
			$.ajax({
				type: 'GET',
				url: url,
				dataType: 'text',
				error: function (r) {
					console.log(r);
				},
				success: function (data) {
					if (data) {
						main.html(data);
					}							
				}
			});					
		} 

		return false;
	});

	setTimeout(function () {
		var logo = $('#logo');
		if (logo.html() === 'Changelog initialization..') {
			logo.html("Loading changelog source take too long, probably something bad happen. <br>Check source url and try reload.");
		}
	}, 3000);
});