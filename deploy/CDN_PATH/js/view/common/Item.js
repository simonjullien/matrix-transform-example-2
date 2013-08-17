define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "handlebars",
    "view/common/base_view",
    "util/animation/AnimationUtils",
    "util/MathUtils",
    "tweenMax",
], function (
    $,
    _,
    Backbone,
    Config,
    Handlebars,
    BaseView,
    AnimationUtils,
    MathUtils,
    TweenMax
) {

    "use strict";

  return BaseView.extend({

        grid: null,
        $item: null,
        positionForMatrix: null,
        rotationForMatrix: null,
        deltaPositionForMatrix: null,

        rotationXDirection:null,
        rotationYDirection:null,

        rollOverPosition: null,
        rollOverPositionTG: null,
        rollOverRotation: null,
        rollOverRotationTG: null,

        time: null,
        delay: null,

        tgRotate: null,

        isFront: true,

        isX: true,
        sign: 1,
        scale: null,

        initialize: function(options) {
            _.bindAll(
                this,
                "switchTexture",
                "startAnimation",
                "endAnimation",
                "onMouseOver"
            );
            this.scale = Math.random() * 0.4 + 0.8;
            this.grid = options.grid;
            this.$item = options.item;
            //$('.image-back',this.$item).css({'top':(-this.grid.y*200)+'px', 'left':(-this.grid.x*200)+'px'});
            this.positionForMatrix = options.positionForMatrix;
            this.rotationForMatrix = options.rotationForMatrix;

            this.$item.on('mouseover',this.onMouseOver);

            this.tgRotate = {x:0,y:0,z:0};
            this.deltaPositionForMatrix = {x:0,y:0,z:0};
            this.rollOverPosition = {x:0,y:0,z:0};
            this.rollOverPositionTG = {x:0,y:0,z:0};
            this.rollOverRotation = {x:0,y:0,z:0};
            this.rollOverRotationTG = {x:0,y:0,z:0};

            this.time = Math.random()*0.5+1;
            this.delay = (this.grid.x + this.grid.y)*0.1;

            var ind_z = -Math.abs((this.grid.x + this.grid.y)-3);
            this.$item.css('z-index',50+ind_z);

            if(Math.random() <= 0.5){
                this.isX = false;
                $('.image-back',this.$item).css('-webkit-transform', 'rotateY(-180deg)');
            }else{
                $('.image-back',this.$item).css('-webkit-transform', 'rotateX(-180deg)');
            }

            $('.image-front',this.$item).css('display','block');
            $('.image-back',this.$item).css('display','none');

            if(Math.random() <= 0.5){
                this.sign = -1;
            }

            this.setTransformation();
        },

        onMouseOver: function(){
            
           this.rollOverPositionTG.x = Math.random() * 10 - 5;
           this.rollOverPositionTG.y = Math.random() * 10 - 5;
           this.rollOverPositionTG.z = Math.random() * 10 - 5;

            this.rollOverRotationTG.x = Math.random() * 40 - 20;
            this.rollOverRotationTG.y = Math.random() * 40 - 20;
            //this.rollOverRotationTG.z = Math.random() * 4 - 2;
        },

        transitionTo: function(){
            //console.log(Math.random());

                if(this.isX){
                    this.tgRotate.x += 180*this.sign;
                }else{
                    this.tgRotate.y += 180*this.sign;
                }

                var dist = -1000;
                var ydis = 0;
            
            TweenMax.to( this.rotationForMatrix, this.time, {x:this.tgRotate.x,y:this.tgRotate.y,z:this.tgRotate.z, onStart:this.startAnimation, delay:this.delay, ease:Expo.easeInOut});
            TweenMax.to( this.deltaPositionForMatrix, this.time/2, {z:dist, y:ydis, delay:this.delay+0, ease:Expo.easeIn, onComplete:this.switchTexture});
            TweenMax.to( this.deltaPositionForMatrix, this.time/2, {z:0, y:0, delay:this.delay+this.time/2, ease:Expo.easeOut,onComplete:this.endAnimation});
        },

        startAnimation: function(){},

        endAnimation: function(){},

        switchTexture: function(){
            if(this.isFront){
                this.isFront = false;
                $('.image-front',this.$item).css('display','none');
                $('.image-back',this.$item).css('display','block');
            }else{
                this.isFront = true;
                $('.image-front',this.$item).css('display','block');
                $('.image-back',this.$item).css('display','none');
            }
        },

        setTransformation:function($it){
            var resultTransitionX = this.deltaPositionForMatrix.x + this.positionForMatrix.x + this.rollOverPosition.x;
            var resultTransitionY = this.deltaPositionForMatrix.y + this.positionForMatrix.y + this.rollOverPosition.y;
            var resultTransitionZ = this.deltaPositionForMatrix.z + this.positionForMatrix.z + this.rollOverPosition.z;

            var resultRotationX = this.rotationForMatrix.x + this.rollOverRotation.x;
            var resultRotationY = this.rotationForMatrix.y + this.rollOverRotation.y;
            var resultRotationZ = this.rotationForMatrix.z + this.rollOverRotation.z;

            var translationM = AnimationUtils.getTransformationMatrix(resultTransitionX,resultTransitionY,resultTransitionZ);
            
            var rotationXM = AnimationUtils.getRotationXMatrix(resultRotationX);
            var rotationYM = AnimationUtils.getRotationYMatrix(resultRotationY);
            var rotationZM = AnimationUtils.getRotationZMatrix(resultRotationZ);


            var resultM = AnimationUtils.getResultMatrix([translationM,rotationXM,rotationYM,rotationZM]);
            var cssTransformMatrix = AnimationUtils.getStringTransform3d(resultM);
            this.$item.css({
                'transform': cssTransformMatrix,
                '-ms-transform': cssTransformMatrix,
                '-webkit-transform': cssTransformMatrix,
                '-moz-transform': cssTransformMatrix,
                '-o-transform': cssTransformMatrix
            });
        },

        updateLoop: function(){
            this.rollOverPosition.x += (this.rollOverPositionTG.x - this.rollOverPosition.x)*0.15;
            this.rollOverPosition.y += (this.rollOverPositionTG.y - this.rollOverPosition.y)*0.15;
            this.rollOverPosition.z += (this.rollOverPositionTG.z - this.rollOverPosition.z)*0.15;

            this.rollOverRotation.x += (this.rollOverRotationTG.x - this.rollOverRotation.x)*0.15;
            this.rollOverRotation.y += (this.rollOverRotationTG.y - this.rollOverRotation.y)*0.15;
            this.rollOverRotation.z += (this.rollOverRotationTG.z - this.rollOverRotation.z)*0.15;

            this.setTransformation();
        },

		render: function() {

            //this.$el.append('What an awesome about page!!');
		}
	});
});
