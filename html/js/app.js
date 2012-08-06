$().ready(function () {
	'use strict';
	function Changelog (source_url) {
		this.source_url = source_url;
		this.init();
	}

	Changelog.prototype = {
		source_url : '',

		self_project : {
			"title" : "Changelog",
			"url" : "changelog.md",
			"iframeable" : 0,
			"web" : "",
			"guide" : "guide.html",
			"repository" : "https://github.com/keram/changelog/",
			"branches" : [
				{
					"title" : "master",
					"url" : "https://github.com/keram/changelog/commits/master"
				}
			]
		},

		getSource : function () {
			var self = this;

			$.get(this.source_url, function (response) {
		    	if (response) {
		    		self.initSource(response);
		    	}
		    });    			
		},

		initSource : function (source) {
			if (source.title && source.author) {
	    		this.setTitle(source.title, source.author);
	    	}
	    	this.buildList(source);
	    	this.bindEvents();
		}, 

		buildList : function (source) {
			var list = '', content = '';
    	
	    	list = $('<ul />').appendTo($('#sidebar-content'));
	    	if (source.projects) {
				source.projects.push(this.self_project);
				for (var i = 0, l = source.projects.length; i < l; i++) {
		    		content += this.buildItem(source.projects[i]);
		    	}
	    	}
	    	
	    	list.html(content);
		},

		setTitle : function (project_title, project_author) {
	    	var twitter_url = 'https://twitter.com/';
	    	var author_url = twitter_url + project_author.replace('@', '');
	    	var title = '<a href="./">' + project_title + '</a> by <a href="' + author_url + '">' + project_author + '</a>';
	    	$('#logo').html(title);
		},

		buildItem : function (data) {
	    	var item = 'item';
	    	var tpl = '';
	    	tpl += '<li>';
	    	tpl += '<div class="primary">';
	    	tpl += '<a class="primary" href="' + data.url + '" ' + (data.iframeable ? 'iframeable="1" ' : '') + '>' + data.title + '</a>'
	    	tpl += '</div>';

	    	tpl += '<div class="sub">';

	    	if (data.web && data.web.length > 0) {
	    		tpl += '<a class="project-web" title="' + data.title + ' website" href="' + data.web + '">W</a>';
	    	}

	    	if (data.guide && data.guide.length > 0) {
	    		tpl += '<a class="project-guide" title="' + data.title + ' guides" href="' + data.guide + '">G</a>';
	    	}

	    	if (data.download && data.download.length > 0) {
	    		tpl += '<a class="project-download" title="' + data.title + ' download link, page or instalation instructions" href="' + data.download + '">D</a>';
	    	}

	    	if (data.repository && data.repository.length > 0) {
	    		tpl += '<a class="project-repository" title="' + data.title + ' repository link" href="' + data.repository + '">R</a>';
	    	}

	    	tpl += '</div>';
	    	
	    	tpl += '<ul>';
	    	if (data.branches && data.branches.length > 0) {
	    		var branch = null;
	    		for (var j = 0; j < data.branches.length; j++ ) {
	    			branch = data.branches[j];
	    			tpl += '<li><a href="' + branch.url + '">' + branch.title + '</a></li>';
	    		}
	    	}
	    	tpl += '</ul>';    	

	    	tpl += '</li>';
	    	item = tpl;
	    	return item;
		},

		bindEvents : function () {
	    	
		},

		init : function () {
			this.getSource();
		}
	};

	// smells
	var default_source = 'http://localhost/work/keramovo/changelog/html/source.json';
    var s = document.location.search.match(/source=(http.+\.json)/);
    if (!s || s.length < 2) {
    	document.location.href = document.location.href + '?source=' + default_source;
    } else {
		var source = s[1];
    	var my_changelog = new Changelog(source);
		var iframe = $('#main-iframe');
		if (iframe.length > 0) {
			var md_test = /\.(md|MD|txt)$/;
			$('#sidebar').delegate('a', 'click', function (e) {
				var a = $(this),
					href = a.attr('href'),
					iframeable = a.attr('iframeable');
				e.preventDefault();
				e.stopPropagation();					
				iframe.hide();

				if (iframeable !== 'undefined' && !!iframeable) {
					iframe.attr('src', href);
					iframe.show();
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
	}
});