(function(e,t,n){"use strict";var r=t.Modernizr;e.Windy=function(t,n){this.$el=e(n);this._init(t)};e.Windy.defaults={nextEl:"",prevEl:"",boundaries:{rotateX:{min:40,max:90},rotateY:{min:-15,max:15},rotateZ:{min:-10,max:10},translateX:{min:-200,max:200},translateY:{min:-400,max:-200},translateZ:{min:250,max:550}}};e.Windy.prototype={_init:function(t){this.options=e.extend(true,{},e.Windy.defaults,t);this.transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"};this.transEndEventName=this.transEndEventNames[r.prefixed("transition")];this.$items=this.$el.children("li");this.itemsCount=this.$items.length;this.resetTransformStr="translateX( 0px ) translateY( 0px ) translateZ( 0px ) rotateX( 0deg ) rotateY( 0deg ) rotateZ( 0deg )";this.supportTransitions=r.csstransitions;this.support3d=r.csstransforms3d;this.current=0;this.$items.eq(this.current).show();this._initEvents()},_getRandTransform:function(){return{rx:Math.floor(Math.random()*(this.options.boundaries.rotateX.max-this.options.boundaries.rotateX.min+1)+this.options.boundaries.rotateX.min),ry:Math.floor(Math.random()*(this.options.boundaries.rotateY.max-this.options.boundaries.rotateY.min+1)+this.options.boundaries.rotateY.min),rz:Math.floor(Math.random()*(this.options.boundaries.rotateZ.max-this.options.boundaries.rotateZ.min+1)+this.options.boundaries.rotateZ.min),tx:Math.floor(Math.random()*(this.options.boundaries.translateX.max-this.options.boundaries.translateX.min+1)+this.options.boundaries.translateX.min),ty:Math.floor(Math.random()*(this.options.boundaries.translateY.max-this.options.boundaries.translateY.min+1)+this.options.boundaries.translateY.min),tz:Math.floor(Math.random()*(this.options.boundaries.translateZ.max-this.options.boundaries.translateZ.min+1)+this.options.boundaries.translateZ.min)}},_initEvents:function(){var t=this;this.$items.on(this.transEndEventName,function(n){t._onTransEnd(e(this))});if(this.options.nextEl!==""){e(this.options.nextEl).on("click.windy",function(){t.next();return false})}if(this.options.prevEl!==""){e(this.options.prevEl).on("click.windy",function(){t.prev();return false})}},_onTransEnd:function(e){e.removeClass("wi-move");if(e.data("dir")==="right"){var t={zIndex:1,opacity:1};if(this.support3d){t.transform=this.resetTransformStr}else if(this.supportTransitions){t.left=0;t.top=0}e.hide().css(t)}},navigate:function(e){var t=this,n=this.$items.eq(this.current),r=this.$items.eq(e),i=this._getRandTransform(),s={zIndex:this.itemsCount+1-e,opacity:0},o={opacity:1};if(this.support3d){o.transform=t.resetTransformStr;s.transform="translateX("+i.tx+"px) translateY("+i.ty+"px) translateZ("+i.tz+"px) rotateX("+i.rx+"deg) rotateY("+i.ry+"deg) rotateZ("+i.rz+"deg)"}else if(this.supportTransitions){o.left=0;o.top=0;s.left=i.tx;s.top=i.ty}if(e>this.current){if(this.dir==="left"){this.$items.not(n).css("z-index",1).hide()}this.dir="right";n.addClass("wi-move").data("dir","right").css(s);if(r.hasClass("wi-move")){r.removeClass("wi-move")}r.css(o).show();if(!this.supportTransitions){this._onTransEnd(n)}}else if(e<this.current){this.dir="left";r.data("dir","left").css(s).show();setTimeout(function(){r.addClass("wi-move").data("dir","left").css(o);if(!t.supportTransitions){t._onTransEnd(r)}},20)}this.current=e},getItemsCount:function(){return this.itemsCount},next:function(){if(this.current<this.itemsCount-1){var e=this.current+1;this.navigate(e)}},prev:function(){if(this.current>0){var e=this.current-1;this.navigate(e)}}};var i=function(e){if(t.console){t.console.error(e)}};e.fn.windy=function(t){var n=e.data(this,"windy");if(typeof t==="string"){var r=Array.prototype.slice.call(arguments,1);this.each(function(){if(!n){i("cannot call methods on windy prior to initialization; "+"attempted to call method '"+t+"'");return}if(!e.isFunction(n[t])||t.charAt(0)==="_"){i("no such method '"+t+"' for windy instance");return}n[t].apply(n,r)})}else{this.each(function(){if(n){n._init()}else{n=e.data(this,"windy",new e.Windy(t,this))}})}return n}})(jQuery,window)