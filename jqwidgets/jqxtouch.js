/*
jQWidgets v5.3.1 (2017-Sep)
Copyright (c) 2011-2017 jQWidgets.
License: https://jqwidgets.com/license/
*/

(function(b){var a=0;b.jqx.jqxWidget("jqxTouch","",{});b.extend(b.jqx._jqxTouch.prototype,{defineInstance:function(){this.swipeMin=50;this.swipeMax=500;this.swipeDelay=1000;this.tapHoldDelay=750;this.swipeMaxVerticalDisance=100;this.swipeMaxHorizontalDisance=100;this.orientationChangeEnabled=true;this._eventsMap={mousedown:b.jqx.mobile.getTouchEventName("touchstart"),mouseup:b.jqx.mobile.getTouchEventName("touchend"),mousemove:b.jqx.mobile.getTouchEventName("touchmove")};this._swipeLocked=false;this._rotationInterval=200;this._events=["tap","taphold","swipe","swipeleft","swiperight","swipetop","swipebottom","orientationchange"];this._instanceId=-1},createInstance:function(){a+=1;this._instanceId=a;this._isTouchDevice=b.jqx.mobile.isTouchDevice();this._defineRotateHandler()},refresh:function(){this._removeEventListeners();this._addEventListeners()},_defineRotateHandler:function(){var c=this;if(!this._rotateHandler){this._rotateHandler=function(){c._checkOrientation()}}},_getEvent:function(c){if(this._isTouchDevice){c=this._eventsMap[c]}return c+this._getEventNamespace()},_getEventNamespace:function(){return".swipe"+this._instanceId},_removeEventListeners:function(){clearInterval(this._rotateInterval);this.removeHandler(b(document),this._getEvent("mouseup"));this.removeHandler(this.host,this._getEvent("mousedown"));this.removeHandler(this.host,this._getEvent("mousemove"));if(window.removeEventListener){window.removeEventListener("resize",this._rotateHandler);window.removeEventListener("orientationchange",this._rotateHandler)}},_addEventListeners:function(){var c=this;this.addHandler(this.host,this._getEvent("mouseup"),function(d){c._resetSwipe();c._resetTap()});this.addHandler(this.host,this._getEvent("mousedown"),function(d){c._initSwipe(d);c._initTap(d)});this.addHandler(this.host,this._getEvent("mousemove"),function(d){c._maxSwipeVerticalDistance=Math.max(c._maxSwipeVerticalDistance,Math.abs(c._startY-c._getCoordinates(d).y));c._maxSwipeHorizontalDistance=Math.max(c._maxSwipeHorizontalDistance,Math.abs(c._startX-c._getCoordinates(d).x));c._mouseMoved=true;return c._handleSwipeEvents(d)});this._rotationListeners()},_handleSwipeEvents:function(d){var c=true;if(this._mouseDown&&!this._tapHoldFired){c=this._handleVerticalSwipeEvents(d);c=this._handleHorizontalSwipeEvents(d)}this._lastPosition=this._getCoordinates(d);return c},_handleVerticalSwipeEvents:function(f){var d,c;d=this._getCoordinates(f).y;c=d-this._startY;if(this._maxSwipeHorizontalDistance<this.swipeMaxHorizontalDisance){return this._swiped(f,c,2)}return true},_handleHorizontalSwipeEvents:function(f){var d,c;d=this._getCoordinates(f).x;c=d-this._startX;if(this._maxSwipeVerticalDistance<this.swipeMaxVerticalDisance){return this._swiped(f,c)}return true},_swiped:function(f,d,c){c=c||0;if(Math.abs(d)>=this.swipeMin&&!this._swipeEvent&&!this._swipeLocked){this._swipeEvent=this._getSwipeEvent(d,c)}if(Math.abs(d)<=this.swipeMax){f.stopImmediatePropagation();return false}return true},_getSwipeEvent:function(e,d){var c;if(e<0){c={eventId:3+d,data:{target:this.host}}}else{c={eventId:4+d,data:{target:this.host}}}return c},_resetSwipe:function(){if(this._swipeEvent&&!this._swipeLocked){this._raiseEvent(2,this._swipeEvent.data);this._raiseEvent(this._swipeEvent.eventId,this._swipeEvent.data)}clearTimeout(this._swipeTimeout);this._mouseDown=false},_resetTap:function(){clearTimeout(this._tapHoldTimeout);if(!this._tapHoldFired&&!this._mouseMoved){this._raiseEvent(0,{target:this.host})}},_initTap:function(d){var c=this;this._mouseMoved=false;this._tapHoldFired=false;this._tapHoldTimeout=setTimeout(function(){if(!c._mouseMoved){c._raiseEvent(1,{target:this.host});c._tapHoldFired=true}},this.tapHoldDelay)},_initSwipe:function(d){var c=this;this._mouseDown=true;this._maxSwipeVerticalDistance=0;this._maxSwipeHorizontalDistance=0;this._startX=this._getCoordinates(d).x;this._startY=this._getCoordinates(d).y;this._swipeLocked=false;this._swipeEvent=null;this._swipeTimeout=setTimeout(function(){c._swipeLocked=true},this.swipeDelay)},_rotationListeners:function(){var c=this;this._previousOrientation=window.orientation;this._previousWidth=screen.width;if(this.orientationChangeEnabled){if(window.addEventListener){window.addEventListener("resize",this._rotateHandler,false);window.addEventListener("orientationchange",this._rotateHandler,false)}this._rotateInterval=setInterval(function(){c._checkOrientation()},this._rotationInterval)}},_checkOrientation:function(){var c="vertical";if(window.orientation!==this._previousOrientation||this._previousWidth!==screen.width){if(window.orientation===90||screen.width>screen.height){c="horizontal"}this._raiseEvent(7,{orientation:c})}this._previousOrientation=window.orientation;this._previousWidth=screen.width},_raiseEvent:function(d,c){var e=b.Event(this._events[d]);e.args=c;return this.host.trigger(e)},_getCoordinates:function(d){var f=b.jqx.position(d);f.x=f.left;f.y=f.top;return f},propertyChangedHandler:function(c,d,f,e){if(d==="orientationChangeEnabled"){this.refresh()}else{return}},isTouchDevice:function(){return this._isTouchDevice}})}(jqxBaseFramework));

