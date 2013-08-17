define(['underscore'],function(_){
	return {

		findStoryTag:function(tags){
			return this.findTagMatching(tags, 'story: ');
		},

		findFeatureTag:function(tags){
			return this.findTagMatching(tags, 'feature: ');
		},
		
		findTagMatching:function(tags, string){
			var regex = new RegExp(string);
			return _.find(tags,function(tag){
				return tag.match(regex);
			});
		},

		hasStoryTag:function(tags){
			return this.getOccurrencesOfStoryWithinTags(tags).length > 0;
		},

		getOccurrencesOfStoryWithinTags:function(tags){
			return _.filter(tags, function(tag){
				return tag.match(/story:/);
			});
		},

		getNonSpecialTags:function(tags){
			return _.reject(tags, function(tag){
				return tag.match(/story:/) || tag.match(/feature:/);
			});
		}

	};
});