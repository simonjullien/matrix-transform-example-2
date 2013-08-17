define([
	"jquery",
	"handlebars",
	"tweenMax",
	"config",
	"util/animation/AnimationUtils"
], function(
	$,
	Handlebars,
	TweenMax,
	Config,
	AnimationUtils
){
	return {

		loadCompiledTemplate:function(path, callback){
			// we can't call callback directly, bc/ templates gives us the file with all templates
			require(["templates"], function(Templates){
				callback(Templates[path]);
			});

		},

		loadUncompiledTemplate:function(path, callback){
			require(["text!"+Config.BASE_URL + path+"!strip"], function(template){
				callback(Handlebars.compile(template));
			});
		},

		// path should be provided relative to the templates folder, without the html extension
		getCompiledTemplate:function(path, callback){
			if(Config.USE_COMPILED_TEMPLATES){
				this.loadCompiledTemplate(path, callback);
			} else {
				this.loadUncompiledTemplate(path, callback);
			}
		},

		applyTranslation: function(x,y){
			var ie = Config.getIEversion();
			var returnObj = {};
			var tran = null;
			if(ie === -1){
				tran = Config.getVendorPrefix().css+'transform';
				var translationM = AnimationUtils.getTransformationMatrix(x, y, 0);
				var resltM = AnimationUtils.getResultMatrix([translationM]);
				var cssTransformMatrix = AnimationUtils.getStringTransform3d(resltM);
				returnObj[tran] = cssTransformMatrix;
				//console.log('NO IE :',returnObj);
				return returnObj;
			}else if(ie >= 9){
				tran = Config.getVendorPrefix().css+'transform';
				var translation2D = AnimationUtils.getStringTranslate2d(x, y);
				//console.log(translation2D);
				returnObj[tran] = translation2D;
				//console.log('IE9 :',returnObj.toString());
				return returnObj;
			}else{
				return AnimationUtils.getObjectTopLeft(x, y);
			}
		},

		getTextFromFirstStrongElement:function(fullText){
			var strongContent= '';
			var $fullText = $(fullText);
			var $firstElement = $fullText.first().children(':first'); // wrapping paragraph
			var firstIsStrong = $firstElement.is('strong');
			if (firstIsStrong){
				strongContent = $firstElement.html();
			}
			return strongContent;
		},


		getTextAfterFirstStrongElement:function(fullText){
			var content= '';
			var $fullText = $(fullText);
			var $firstElement = $fullText.first().children(':first'); // wrapping paragraph
			var firstIsStrong = $firstElement.is('strong');

			if (firstIsStrong){
				content = fullText.substring(fullText.indexOf('</p>') + 4, fullText.length);
			} else {
				content = fullText;
			}
			return content;
		},

		getShortText:function(text, _maxLength){
			var maxLength = (_maxLength === undefined) ? 120 - 3 : _maxLength - 3; //to account for the dots
			var closestSpaceIndex = text.substring(0, maxLength).lastIndexOf(" ");
			return text.substring(0, closestSpaceIndex) + "...";
		}
	};
});