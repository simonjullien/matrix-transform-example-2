define([],function(){

	window._gaq =  [];
	window._gaq.push(['_setAccount', 'UA-30415002-1']);

	var ga = {

		events:{

		},

		trackPage:function(_pageName){
			if (window._gaq) {
				window._gaq.push(['_trackPageview', _pageName]);
			}
		},


		trackEventOfType:function(_eventType){
			this.trackEvent(_eventType[0], _eventType[1], _eventType[2]||null);
		},


		trackEvent:function(_category, _action, _label){
			if (window._gaq) {
				window._gaq.push(["_trackEvent", _category, _action, _label]);
			}
		}
	};

	// load analytics
	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();

	return ga;
});