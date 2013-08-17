define([
    "jquery",
    "underscore",
    "backbone",
    "config",
    "handlebars",
    "view/common/base_view",
    "view/common/Item",
    "util/animation/AnimationUtils",
    "util/MathUtils",
    "util/anim_frame"
], function (
    $,
    _,
    Backbone,
    Config,
    Handlebars,
    BaseView,
    Item,
    AnimationUtils,
    MathUtils,
    AnimFrame
) {

    "use strict";

  return BaseView.extend({

        listImages: null,
        $gridHolder: null,
        size:200,
        loopInterval: null,

        initialize: function() {
            _.bindAll(
                this,
                "loopAnimation",
                "onClickGrid"
            );
            this.targetRotation = {x:0,y:0,z:0};
            //# Load HTML template
            require(["text!"+Config.BASE_URL+"templates/example.html!strip"], _.bind(this.onTemplateLoaded, this) );

        },

        onTemplateLoaded: function( template ) {

            var templateFunction = Handlebars.compile( template );

            this.$el.append(
                $( templateFunction( { 'title': 'Awesome!', 'time': new Date().toString() } ) )
            );
            this.init();
        },

        init: function(){
            this.listImages = [];
            this.$gridHolder = $('.grid-all',this.el);
            var posY=-1;
            for (var i = 0; i < 16; i++) {
                var gridItem = $("<div class='grid-item'><img src='CDN_PATH/img/_"+i+".jpg' class='image-front'> <img src='CDN_PATH/img/" + i + ".jpg' class='image-back'></div>");
                this.$gridHolder.append(gridItem);
                if(i%4 === 0){
                    posY++;
                }
                var it = new Item({grid:{x:(i%4),y:posY}, item:gridItem, positionForMatrix:{x:(i%4)*this.size,y:posY*this.size,z:0}, rotationForMatrix:{x:0, y:0, z:0}});
                this.listImages.push(it);
            }
            AnimFrame.on('anim_frame',this.loopAnimation,this);

            this.$gridHolder.on('click',this.onClickGrid);
        },

        onClickGrid: function(){
            for (var i = 0; i < 16; i++) {
                var it = this.listImages[i];
                it.transitionTo();
            }
        },

        loopAnimation:function(){
            for (var i = 0; i < 16; i++) {
                var it = this.listImages[i];
                it.updateLoop();
            }
        },

		render: function() {

            //this.$el.append('What an awesome about page!!');
		}
	});
});
