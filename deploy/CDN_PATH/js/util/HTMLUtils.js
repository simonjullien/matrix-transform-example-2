define([
	'jquery',

],function(
	$
){

	return {
		p:function(content){
			return this.wrap(content,'p');
		},
		a:function(body, href, targetBlank){
			// if (attributes){
			// 	console.log('we have attributes', _.pairs(attributes));
			// 	var attrPairs = _.pairs(attributes); 
			// 	var nAttribs = attrPairs.length;
			// 	var attrString;
			// 	if (nAttribs > 1){
			// 		// TODO: 
			// 		_.reduce(_.pairs(attributes),function(accum, current){
			// 			console.log('00000', current)
			// 			// console.log(current.keys.join("="))
			// 			return accum + current;
			// 		});
			// 	} else {
					
			// 		attrString = attrPairs
			// 	}
			// }
			if (targetBlank){
				return '<a href="'+href+'" target="_blank">'+ body + '</a>';
			}
			return '<a href="'+href+'">'+ body + '</a>';
			
		},
		li:function(content){
			return this.wrap(content,'li');
		},
		wrap:function(content, tagName){
			return '<'+tagName+'>' + content + '</'+tagName+'>';
		},

		addSpanToLastWord:function(sentence, spanClass){
			var sentenceArr = sentence.split(" ");
			var lastWord =sentenceArr.pop();
			var storyName = sentenceArr.join(' ') + ' ' + '<span class="'+spanClass+'">'+lastWord+'</span>';
			return storyName;

		},

		addSpanAndIconToLastWord:function(sentence, spanClass){
			var sentenceArr = sentence.split(" ");
			var lastWord =sentenceArr.pop();
			var storyName = sentenceArr.join(' ') + ' ' + '<span class="'+spanClass+'">'+lastWord+'<span class="icon"></span></span>';
			return storyName;

		}
	};

});