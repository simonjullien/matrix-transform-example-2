define([
	"underscore",
	"backbone",
	"config"
],
function(
	_,
	Backbone,
	Config
) {

	var facebook = {
	
		XFBML:null,
		FACEBOOK_READY:'facebook:ready',

		onInit:function(){
			this.XFBML = window.FB.XFBML;
			this.trigger(this.FACEBOOK_READY);
		},

		load:function(){
			window.fbAsyncInit = _.bind( facebook.onInit, facebook );
			(function(d, s, id) {
				// console.log('loading')
				var js, fjs = d.getElementsByTagName(s)[0];
				var facebookScript = d.getElementById(id);
				if (facebookScript) {
					facebookScript.parentNode.removeChild(facebookScript);
				}
				js = d.createElement(s); js.id = id;
				js.src ="//connect.facebook.net/en_US/all/debug.js#xfbml=1";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		}
	};

	_.extend(facebook, Backbone.Events);

	return facebook;
});