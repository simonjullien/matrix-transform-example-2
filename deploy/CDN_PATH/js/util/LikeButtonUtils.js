define([
	'jquery',
	'underscore',
	'backbone',
	'config',
	'tumblelog'
],function(
	$,
	_,
	Backbone,
	Config,
	Tumblr
){
	var LikeButtonUtils = function(){
		this.$likeButtons = [];
	};

	_.extend(LikeButtonUtils.prototype, Backbone.Events);
	_.extend(LikeButtonUtils.prototype, {

		LIKE_BUTTON_RETRIEVED:'likeButtonUtils:likeButtonRetrieved',
		$node:null,
		isRetrieving:false,
		$likeButton:null,
		lastIDRegistered:-1,

		retrieveButton:function(postID, $node) {
			if(this.getButtonForID(postID)){
				this.$likeButton = this.getButtonForID(postID);
				this.trigger(this.LIKE_BUTTON_RETRIEVED);
			}else if (!this.isRetrieving && this.isHostedOnCorrectTumblrDomain()){
				this.isRetrieving = true;
				this.$node = $node;
				// TODO
				this.doRetrieveButton(postID);
			}
		},

		getButtonForID:function(postID){
			return _.find(this.$likeButtons, function($lb){
				return $lb.attr('data-post-id') === postID.toString();
			});
		},


		doRetrieveButton:function(postID){
			$.ajax('http://' + Config.TUMBLR.BLOG_URL + '/post/'+postID,{
				type:'get',
				success:_.bind(this.onLikeDataLoaded, this),
				error:_.bind(this.onLikeDataError,this)
			});
		},

		onLikeDataLoaded:function(data){
			this.isRetrieving = false;
			var $data = $(data);
			this.$likeButton = $data.find('.like_button');
			this.$likeButtons.push(this.$likeButton);
			this.registerLikeButton();
			this.trigger(this.LIKE_BUTTON_RETRIEVED);
		},

		getLikeButton:function(){
			return this.$likeButton;
		},


		registerLikeButton:function(){
			if (this.lastIDRegistered !== this.$likeButton.attr('data-post-id')){
				Tumblr.LikeButton.get_status_by_post_ids([this.$likeButton.attr('data-post-id')]);
				this.lastIDRegistered = this.$likeButton.attr('data-post-id');
			} else {
			}
		},

		onLikeDataError:function(e){
			// console.log('error!', e)
		},

		isHostedOnCorrectTumblrDomain:function(){
			return document.domain === Config.TUMBLR.BLOG_URL;
		}
	});

	return new LikeButtonUtils();
});