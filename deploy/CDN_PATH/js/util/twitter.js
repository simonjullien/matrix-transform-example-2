define([],function(){
	return {
		load:function(){
			(function(d,s,id){
				var twitterScript = d.getElementById(id);
				if(twitterScript){
					twitterScript.parentNode.removeChild(twitterScript);
				}
				var js,
					fjs=d.getElementsByTagName(s)[0],
					p=/^http:/.test(d.location)?'http':'https';
					js=d.createElement(s);js.id=id;
					js.src=p+'://platform.twitter.com/widgets.js';
					fjs.parentNode.insertBefore(js,fjs);
			}(document, 'script', 'twitter-wjs'));
		}
	};
});