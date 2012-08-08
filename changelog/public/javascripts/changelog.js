	function Changelog (source) {
		this.init(source);
	}

	Changelog.prototype = {
		source : {},

		self_project : {
			"title" : "Changelog",
			"url" : "http://localhost/work/keramovo/changelog/html/",
			"web" : "/",
			"guide" : "/guide",
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
	    	tpl += '<a class="primary" href="' + data.url + '" >' + data.title + '</a>'
	    	tpl += '</div>';

	    	tpl += '<div class="sub">';

	    	if (data.web && data.web.length > 0) {
	    		tpl += '<a class="project-web" title="Website" href="' + data.web + '">W</a>';
	    	}

	    	if (data.guide && data.guide.length > 0) {
	    		tpl += '<a class="project-guide" title="Guides" href="' + data.guide + '">G</a>';
	    	}

	    	if (data.download && data.download.length > 0) {
	    		tpl += '<a class="project-download" title="Download" href="' + data.download + '">D</a>';
	    	}

	    	if (data.repository && data.repository.length > 0) {
	    		tpl += '<a class="project-repository" title="Repository" href="' + data.repository + '">R</a>';
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

		init : function (source) {
			this.initSource(source);
		}
	};


function initChangelog(source) {
	return new Changelog(source);
}