

$().ready(function () {
	'use strict';

	// smells
	var iframe = $('#main-iframe');
	if (iframe.length > 0) {
		var md_test = /\.(md|MD|txt)$/,
			proxy_host = 'http://localhost/',
			proxy_url = '';
		$('#sidebar').delegate('a', 'click', function (e) {
			var a = $(this),
				href = a.attr('href'),
				is_primary = a.hasClass('primary');
			e.preventDefault();
			e.stopPropagation();					
			iframe.hide();

			if (is_primary) {
				console.log('is primary');
				proxy_url = proxy_host + '?url=' + href;
				console.log(proxy_url);
				//iframe.attr('src', href);
				// iframe.show();
			} else if (md_test.test(href)) {
				e.preventDefault();
				e.stopPropagation();
				$.ajax({
					type: 'GET',
					url: href,
					dataType: 'text',
					error: function (r) {
						console.log(r);
					},
					success: function (data) {
						if (data) {
							iframe.attr('src', 'data:text/plain,' + data);
 							iframe.show();
						}							
					}
				});					

			} else {
				document.location.href = href; 					
			} 

			return false;
		});
	} 		    	

});