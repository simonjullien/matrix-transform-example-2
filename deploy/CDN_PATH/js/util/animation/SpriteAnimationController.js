define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "tweenMax",
    "events/Events",
    "view/BaseView",
    "util/Util"
], function (
    $,
    _,
    Backbone,
    Config,
    TweenMax,
    Events,
    BaseView,
    Util
) {
  return BaseView.extend({
		$btn: null,
		nbFrames: 0,
		sizeFrame: 0,
		time: 0,

		isTweening: false,

		tweenObj: null,

		initialize: function() {
			_.bindAll(this, "updateBtnAnimation","animationComplete");
			this.tweenObj = {progress:0};
		},

		animateSpriteBtn: function($btn, nbFrames, sizeFrame, time){
			this.$btn = $btn;
			this.nbFrames = nbFrames;
			this.sizeFrame = sizeFrame;
			this.time = time;
			this.tweenObj = {progress:0};
			this.isTweening = true;
			TweenMax.to( this.tweenObj, this.time, {progress:1, onUpdate:this.updateBtnAnimation, onComplete:this.animationComplete, ease:Linear.easeNone});
		},

		animationComplete: function(){
			this.isTweening = false;
		},

		reinitSprite: function(){
			this.tweenObj = {progress:0};
			this.isTweening = false;
			this.updateBtnAnimation();
		},

		updateBtnAnimation: function(){
			var mapFrame = parseInt(this.tweenObj.progress * this.nbFrames, 10);
			var positionFrameX = -(mapFrame*this.sizeFrame);
			// console.log(positionFrameX);
			this.$btn.css({'background-position': positionFrameX+'px 0px'});
		}
	});
});