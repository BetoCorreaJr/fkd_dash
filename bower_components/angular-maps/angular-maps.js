/**
 * Contains XMLHttpRequest.js <http://code.google.com/p/xmlhttprequest/>
 * Copyright 2007 Sergey Ilinsky (http://www.ilinsky.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * OpenLayers.Util.pagePosition is based on Yahoo's getXY method, which is
 * Copyright (c) 2006, Yahoo! Inc.
 * All rights reserved.
 * 
 * Redistribution and use of this software in source and binary forms, with or
 * without modification, are permitted provided that the following conditions
 * are met:
 * 
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 * 
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 * 
 * * Neither the name of Yahoo! Inc. nor the names of its contributors may be
 *   used to endorse or promote products derived from this software without
 *   specific prior written permission of Yahoo! Inc.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
 * POSSIBILITY OF SUCH DAMAGE.
 */
var OpenLayers={VERSION_NUMBER:"Release 2.14 dev",singleFile:true,_getScriptLocation:(function(){var r=new RegExp("(^|(.*?\\/))(OpenLayers[^\\/]*?\\.js)(\\?|$)"),s=document.getElementsByTagName('script'),src,m,l="";for(var i=0,len=s.length;i<len;i++){src=s[i].getAttribute('src');if(src){m=src.match(r);if(m){l=m[1];break;}}}
return(function(){return l;});})(),ImgPath:''};OpenLayers.Class=function(){var len=arguments.length;var P=arguments[0];var F=arguments[len-1];var C=typeof F.initialize=="function"?F.initialize:function(){P.prototype.initialize.apply(this,arguments);};if(len>1){var newArgs=[C,P].concat(Array.prototype.slice.call(arguments).slice(1,len-1),F);OpenLayers.inherit.apply(null,newArgs);}else{C.prototype=F;}
return C;};OpenLayers.inherit=function(C,P){var F=function(){};F.prototype=P.prototype;C.prototype=new F;var i,l,o;for(i=2,l=arguments.length;i<l;i++){o=arguments[i];if(typeof o==="function"){o=o.prototype;}
OpenLayers.Util.extend(C.prototype,o);}};OpenLayers.Util=OpenLayers.Util||{};OpenLayers.Util.extend=function(destination,source){destination=destination||{};if(source){for(var property in source){var value=source[property];if(value!==undefined){destination[property]=value;}}
var sourceIsEvt=typeof window.Event=="function"&&source instanceof window.Event;if(!sourceIsEvt&&source.hasOwnProperty&&source.hasOwnProperty("toString")){destination.toString=source.toString;}}
return destination;};OpenLayers.String={startsWith:function(str,sub){return(str.indexOf(sub)==0);},contains:function(str,sub){return(str.indexOf(sub)!=-1);},trim:function(str){return str.replace(/^\s\s*/,'').replace(/\s\s*$/,'');},camelize:function(str){var oStringList=str.split('-');var camelizedString=oStringList[0];for(var i=1,len=oStringList.length;i<len;i++){var s=oStringList[i];camelizedString+=s.charAt(0).toUpperCase()+s.substring(1);}
return camelizedString;},format:function(template,context,args){if(!context){context=window;}
var replacer=function(str,match){var replacement;var subs=match.split(/\.+/);for(var i=0;i<subs.length;i++){if(i==0){replacement=context;}
if(replacement===undefined){break;}
replacement=replacement[subs[i]];}
if(typeof replacement=="function"){replacement=args?replacement.apply(null,args):replacement();}
if(typeof replacement=='undefined'){return'undefined';}else{return replacement;}};return template.replace(OpenLayers.String.tokenRegEx,replacer);},tokenRegEx:/\$\{([\w.]+?)\}/g,numberRegEx:/^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,isNumeric:function(value){return OpenLayers.String.numberRegEx.test(value);},numericIf:function(value,trimWhitespace){var originalValue=value;if(trimWhitespace===true&&value!=null&&value.replace){value=value.replace(/^\s*|\s*$/g,"");}
return OpenLayers.String.isNumeric(value)?parseFloat(value):originalValue;}};OpenLayers.Number={decimalSeparator:".",thousandsSeparator:",",limitSigDigs:function(num,sig){var fig=0;if(sig>0){fig=parseFloat(num.toPrecision(sig));}
return fig;},format:function(num,dec,tsep,dsep){dec=(typeof dec!="undefined")?dec:0;tsep=(typeof tsep!="undefined")?tsep:OpenLayers.Number.thousandsSeparator;dsep=(typeof dsep!="undefined")?dsep:OpenLayers.Number.decimalSeparator;if(dec!=null){num=parseFloat(num.toFixed(dec));}
var parts=num.toString().split(".");if(parts.length==1&&dec==null){dec=0;}
var integer=parts[0];if(tsep){var thousands=/(-?[0-9]+)([0-9]{3})/;while(thousands.test(integer)){integer=integer.replace(thousands,"$1"+tsep+"$2");}}
var str;if(dec==0){str=integer;}else{var rem=parts.length>1?parts[1]:"0";if(dec!=null){rem=rem+new Array(dec-rem.length+1).join("0");}
str=integer+dsep+rem;}
return str;},zeroPad:function(num,len,radix){var str=num.toString(radix||10);while(str.length<len){str="0"+str;}
return str;}};OpenLayers.Function={bind:function(func,object){var args=Array.prototype.slice.call(arguments,2);return function(){var newArgs=args.concat(Array.prototype.slice.call(arguments,0));return func.apply(object,newArgs);};},bindAsEventListener:function(func,object){return function(event){return func.call(object,event||window.event);};},False:function(){return false;},True:function(){return true;},Void:function(){}};OpenLayers.Array={filter:function(array,callback,caller){var selected=[];if(Array.prototype.filter){selected=array.filter(callback,caller);}else{var len=array.length;if(typeof callback!="function"){throw new TypeError();}
for(var i=0;i<len;i++){if(i in array){var val=array[i];if(callback.call(caller,val,i,array)){selected.push(val);}}}}
return selected;}};OpenLayers.Bounds=OpenLayers.Class({left:null,bottom:null,right:null,top:null,centerLonLat:null,initialize:function(left,bottom,right,top){if(OpenLayers.Util.isArray(left)){top=left[3];right=left[2];bottom=left[1];left=left[0];}
if(left!=null){this.left=OpenLayers.Util.toFloat(left);}
if(bottom!=null){this.bottom=OpenLayers.Util.toFloat(bottom);}
if(right!=null){this.right=OpenLayers.Util.toFloat(right);}
if(top!=null){this.top=OpenLayers.Util.toFloat(top);}},clone:function(){return new OpenLayers.Bounds(this.left,this.bottom,this.right,this.top);},equals:function(bounds){var equals=false;if(bounds!=null){equals=((this.left==bounds.left)&&(this.right==bounds.right)&&(this.top==bounds.top)&&(this.bottom==bounds.bottom));}
return equals;},toString:function(){return[this.left,this.bottom,this.right,this.top].join(",");},toArray:function(reverseAxisOrder){if(reverseAxisOrder===true){return[this.bottom,this.left,this.top,this.right];}else{return[this.left,this.bottom,this.right,this.top];}},toBBOX:function(decimal,reverseAxisOrder){if(decimal==null){decimal=6;}
var mult=Math.pow(10,decimal);var xmin=Math.round(this.left*mult)/mult;var ymin=Math.round(this.bottom*mult)/mult;var xmax=Math.round(this.right*mult)/mult;var ymax=Math.round(this.top*mult)/mult;if(reverseAxisOrder===true){return ymin+","+xmin+","+ymax+","+xmax;}else{return xmin+","+ymin+","+xmax+","+ymax;}},toGeometry:function(){return new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing([new OpenLayers.Geometry.Point(this.left,this.bottom),new OpenLayers.Geometry.Point(this.right,this.bottom),new OpenLayers.Geometry.Point(this.right,this.top),new OpenLayers.Geometry.Point(this.left,this.top)])]);},getWidth:function(){return(this.right-this.left);},getHeight:function(){return(this.top-this.bottom);},getSize:function(){return new OpenLayers.Size(this.getWidth(),this.getHeight());},getCenterPixel:function(){return new OpenLayers.Pixel((this.left+this.right)/2,(this.bottom+this.top)/2);},getCenterLonLat:function(){if(!this.centerLonLat){this.centerLonLat=new OpenLayers.LonLat((this.left+this.right)/2,(this.bottom+this.top)/2);}
return this.centerLonLat;},scale:function(ratio,origin){if(origin==null){origin=this.getCenterLonLat();}
var origx,origy;if(origin.CLASS_NAME=="OpenLayers.LonLat"){origx=origin.lon;origy=origin.lat;}else{origx=origin.x;origy=origin.y;}
var left=(this.left-origx)*ratio+origx;var bottom=(this.bottom-origy)*ratio+origy;var right=(this.right-origx)*ratio+origx;var top=(this.top-origy)*ratio+origy;return new OpenLayers.Bounds(left,bottom,right,top);},add:function(x,y){if((x==null)||(y==null)){throw new TypeError('Bounds.add cannot receive null values');}
return new OpenLayers.Bounds(this.left+x,this.bottom+y,this.right+x,this.top+y);},extend:function(object){if(object){switch(object.CLASS_NAME){case"OpenLayers.LonLat":this.extendXY(object.lon,object.lat);break;case"OpenLayers.Geometry.Point":this.extendXY(object.x,object.y);break;case"OpenLayers.Bounds":this.centerLonLat=null;if((this.left==null)||(object.left<this.left)){this.left=object.left;}
if((this.bottom==null)||(object.bottom<this.bottom)){this.bottom=object.bottom;}
if((this.right==null)||(object.right>this.right)){this.right=object.right;}
if((this.top==null)||(object.top>this.top)){this.top=object.top;}
break;}}},extendXY:function(x,y){this.centerLonLat=null;if((this.left==null)||(x<this.left)){this.left=x;}
if((this.bottom==null)||(y<this.bottom)){this.bottom=y;}
if((this.right==null)||(x>this.right)){this.right=x;}
if((this.top==null)||(y>this.top)){this.top=y;}},containsLonLat:function(ll,options){if(typeof options==="boolean"){options={inclusive:options};}
options=options||{};var contains=this.contains(ll.lon,ll.lat,options.inclusive),worldBounds=options.worldBounds;if(worldBounds&&!contains){var worldWidth=worldBounds.getWidth();var worldCenterX=(worldBounds.left+worldBounds.right)/2;var worldsAway=Math.round((ll.lon-worldCenterX)/worldWidth);contains=this.containsLonLat({lon:ll.lon-worldsAway*worldWidth,lat:ll.lat},{inclusive:options.inclusive});}
return contains;},containsPixel:function(px,inclusive){return this.contains(px.x,px.y,inclusive);},contains:function(x,y,inclusive){if(inclusive==null){inclusive=true;}
if(x==null||y==null){return false;}
x=OpenLayers.Util.toFloat(x);y=OpenLayers.Util.toFloat(y);var contains=false;if(inclusive){contains=((x>=this.left)&&(x<=this.right)&&(y>=this.bottom)&&(y<=this.top));}else{contains=((x>this.left)&&(x<this.right)&&(y>this.bottom)&&(y<this.top));}
return contains;},intersectsBounds:function(bounds,options){if(typeof options==="boolean"){options={inclusive:options};}
options=options||{};if(options.worldBounds){var self=this.wrapDateLine(options.worldBounds);bounds=bounds.wrapDateLine(options.worldBounds);}else{self=this;}
if(options.inclusive==null){options.inclusive=true;}
var intersects=false;var mightTouch=(self.left==bounds.right||self.right==bounds.left||self.top==bounds.bottom||self.bottom==bounds.top);if(options.inclusive||!mightTouch){var inBottom=(((bounds.bottom>=self.bottom)&&(bounds.bottom<=self.top))||((self.bottom>=bounds.bottom)&&(self.bottom<=bounds.top)));var inTop=(((bounds.top>=self.bottom)&&(bounds.top<=self.top))||((self.top>bounds.bottom)&&(self.top<bounds.top)));var inLeft=(((bounds.left>=self.left)&&(bounds.left<=self.right))||((self.left>=bounds.left)&&(self.left<=bounds.right)));var inRight=(((bounds.right>=self.left)&&(bounds.right<=self.right))||((self.right>=bounds.left)&&(self.right<=bounds.right)));intersects=((inBottom||inTop)&&(inLeft||inRight));}
if(options.worldBounds&&!intersects){var world=options.worldBounds;var width=world.getWidth();var selfCrosses=!world.containsBounds(self);var boundsCrosses=!world.containsBounds(bounds);if(selfCrosses&&!boundsCrosses){bounds=bounds.add(-width,0);intersects=self.intersectsBounds(bounds,{inclusive:options.inclusive});}else if(boundsCrosses&&!selfCrosses){self=self.add(-width,0);intersects=bounds.intersectsBounds(self,{inclusive:options.inclusive});}}
return intersects;},containsBounds:function(bounds,partial,inclusive){if(partial==null){partial=false;}
if(inclusive==null){inclusive=true;}
var bottomLeft=this.contains(bounds.left,bounds.bottom,inclusive);var bottomRight=this.contains(bounds.right,bounds.bottom,inclusive);var topLeft=this.contains(bounds.left,bounds.top,inclusive);var topRight=this.contains(bounds.right,bounds.top,inclusive);return(partial)?(bottomLeft||bottomRight||topLeft||topRight):(bottomLeft&&bottomRight&&topLeft&&topRight);},determineQuadrant:function(lonlat){var quadrant="";var center=this.getCenterLonLat();quadrant+=(lonlat.lat<center.lat)?"b":"t";quadrant+=(lonlat.lon<center.lon)?"l":"r";return quadrant;},transform:function(source,dest){this.centerLonLat=null;var ll=OpenLayers.Projection.transform({'x':this.left,'y':this.bottom},source,dest);var lr=OpenLayers.Projection.transform({'x':this.right,'y':this.bottom},source,dest);var ul=OpenLayers.Projection.transform({'x':this.left,'y':this.top},source,dest);var ur=OpenLayers.Projection.transform({'x':this.right,'y':this.top},source,dest);this.left=Math.min(ll.x,ul.x);this.bottom=Math.min(ll.y,lr.y);this.right=Math.max(lr.x,ur.x);this.top=Math.max(ul.y,ur.y);return this;},wrapDateLine:function(maxExtent,options){options=options||{};var leftTolerance=options.leftTolerance||0;var rightTolerance=options.rightTolerance||0;var newBounds=this.clone();if(maxExtent){var width=maxExtent.getWidth();while(newBounds.left<maxExtent.left&&newBounds.right-rightTolerance<=maxExtent.left){newBounds=newBounds.add(width,0);}
while(newBounds.left+leftTolerance>=maxExtent.right&&newBounds.right>maxExtent.right){newBounds=newBounds.add(-width,0);}
var newLeft=newBounds.left+leftTolerance;if(newLeft<maxExtent.right&&newLeft>maxExtent.left&&newBounds.right-rightTolerance>maxExtent.right){newBounds=newBounds.add(-width,0);}}
return newBounds;},CLASS_NAME:"OpenLayers.Bounds"});OpenLayers.Bounds.fromString=function(str,reverseAxisOrder){var bounds=str.split(",");return OpenLayers.Bounds.fromArray(bounds,reverseAxisOrder);};OpenLayers.Bounds.fromArray=function(bbox,reverseAxisOrder){return reverseAxisOrder===true?new OpenLayers.Bounds(bbox[1],bbox[0],bbox[3],bbox[2]):new OpenLayers.Bounds(bbox[0],bbox[1],bbox[2],bbox[3]);};OpenLayers.Bounds.fromSize=function(size){return new OpenLayers.Bounds(0,size.h,size.w,0);};OpenLayers.Bounds.oppositeQuadrant=function(quadrant){var opp="";opp+=(quadrant.charAt(0)=='t')?'b':'t';opp+=(quadrant.charAt(1)=='l')?'r':'l';return opp;};OpenLayers.Element={visible:function(element){return OpenLayers.Util.getElement(element).style.display!='none';},toggle:function(){for(var i=0,len=arguments.length;i<len;i++){var element=OpenLayers.Util.getElement(arguments[i]);var display=OpenLayers.Element.visible(element)?'none':'';element.style.display=display;}},remove:function(element){element=OpenLayers.Util.getElement(element);element.parentNode.removeChild(element);},getHeight:function(element){element=OpenLayers.Util.getElement(element);return element.offsetHeight;},hasClass:function(element,name){var names=element.className;return(!!names&&new RegExp("(^|\\s)"+name+"(\\s|$)").test(names));},addClass:function(element,name){if(!OpenLayers.Element.hasClass(element,name)){element.className+=(element.className?" ":"")+name;}
return element;},removeClass:function(element,name){var names=element.className;if(names){element.className=OpenLayers.String.trim(names.replace(new RegExp("(^|\\s+)"+name+"(\\s+|$)")," "));}
return element;},toggleClass:function(element,name){if(OpenLayers.Element.hasClass(element,name)){OpenLayers.Element.removeClass(element,name);}else{OpenLayers.Element.addClass(element,name);}
return element;},getStyle:function(element,style){element=OpenLayers.Util.getElement(element);var value=null;if(element&&element.style){value=element.style[OpenLayers.String.camelize(style)];if(!value){if(document.defaultView&&document.defaultView.getComputedStyle){var css=document.defaultView.getComputedStyle(element,null);value=css?css.getPropertyValue(style):null;}else if(element.currentStyle){value=element.currentStyle[OpenLayers.String.camelize(style)];}}
var positions=['left','top','right','bottom'];if(window.opera&&(OpenLayers.Util.indexOf(positions,style)!=-1)&&(OpenLayers.Element.getStyle(element,'position')=='static')){value='auto';}}
return value=='auto'?null:value;}};OpenLayers.LonLat=OpenLayers.Class({lon:0.0,lat:0.0,initialize:function(lon,lat){if(OpenLayers.Util.isArray(lon)){lat=lon[1];lon=lon[0];}
this.lon=OpenLayers.Util.toFloat(lon);this.lat=OpenLayers.Util.toFloat(lat);},toString:function(){return("lon="+this.lon+",lat="+this.lat);},toShortString:function(){return(this.lon+", "+this.lat);},clone:function(){return new OpenLayers.LonLat(this.lon,this.lat);},add:function(lon,lat){if((lon==null)||(lat==null)){throw new TypeError('LonLat.add cannot receive null values');}
return new OpenLayers.LonLat(this.lon+OpenLayers.Util.toFloat(lon),this.lat+OpenLayers.Util.toFloat(lat));},equals:function(ll){var equals=false;if(ll!=null){equals=((this.lon==ll.lon&&this.lat==ll.lat)||(isNaN(this.lon)&&isNaN(this.lat)&&isNaN(ll.lon)&&isNaN(ll.lat)));}
return equals;},transform:function(source,dest){var point=OpenLayers.Projection.transform({'x':this.lon,'y':this.lat},source,dest);this.lon=point.x;this.lat=point.y;return this;},wrapDateLine:function(maxExtent){var newLonLat=this.clone();if(maxExtent){while(newLonLat.lon<maxExtent.left){newLonLat.lon+=maxExtent.getWidth();}
while(newLonLat.lon>maxExtent.right){newLonLat.lon-=maxExtent.getWidth();}}
return newLonLat;},CLASS_NAME:"OpenLayers.LonLat"});OpenLayers.LonLat.fromString=function(str){var pair=str.split(",");return new OpenLayers.LonLat(pair[0],pair[1]);};OpenLayers.LonLat.fromArray=function(arr){var gotArr=OpenLayers.Util.isArray(arr),lon=gotArr&&arr[0],lat=gotArr&&arr[1];return new OpenLayers.LonLat(lon,lat);};OpenLayers.Pixel=OpenLayers.Class({x:0.0,y:0.0,initialize:function(x,y){this.x=parseFloat(x);this.y=parseFloat(y);},toString:function(){return("x="+this.x+",y="+this.y);},clone:function(){return new OpenLayers.Pixel(this.x,this.y);},equals:function(px){var equals=false;if(px!=null){equals=((this.x==px.x&&this.y==px.y)||(isNaN(this.x)&&isNaN(this.y)&&isNaN(px.x)&&isNaN(px.y)));}
return equals;},distanceTo:function(px){return Math.sqrt(Math.pow(this.x-px.x,2)+
Math.pow(this.y-px.y,2));},add:function(x,y){if((x==null)||(y==null)){throw new TypeError('Pixel.add cannot receive null values');}
return new OpenLayers.Pixel(this.x+x,this.y+y);},offset:function(px){var newPx=this.clone();if(px){newPx=this.add(px.x,px.y);}
return newPx;},CLASS_NAME:"OpenLayers.Pixel"});OpenLayers.Size=OpenLayers.Class({w:0.0,h:0.0,initialize:function(w,h){this.w=parseFloat(w);this.h=parseFloat(h);},toString:function(){return("w="+this.w+",h="+this.h);},clone:function(){return new OpenLayers.Size(this.w,this.h);},equals:function(sz){var equals=false;if(sz!=null){equals=((this.w==sz.w&&this.h==sz.h)||(isNaN(this.w)&&isNaN(this.h)&&isNaN(sz.w)&&isNaN(sz.h)));}
return equals;},CLASS_NAME:"OpenLayers.Size"});OpenLayers.Console={log:function(){},debug:function(){},info:function(){},warn:function(){},error:function(){},userError:function(error){alert(error);},assert:function(){},dir:function(){},dirxml:function(){},trace:function(){},group:function(){},groupEnd:function(){},time:function(){},timeEnd:function(){},profile:function(){},profileEnd:function(){},count:function(){},CLASS_NAME:"OpenLayers.Console"};(function(){var scripts=document.getElementsByTagName("script");for(var i=0,len=scripts.length;i<len;++i){if(scripts[i].src.indexOf("firebug.js")!=-1){if(console){OpenLayers.Util.extend(OpenLayers.Console,console);break;}}}})();OpenLayers.Lang={code:null,defaultCode:"en",getCode:function(){if(!OpenLayers.Lang.code){OpenLayers.Lang.setCode();}
return OpenLayers.Lang.code;},setCode:function(code){var lang;if(!code){code=(OpenLayers.BROWSER_NAME=="msie")?navigator.userLanguage:navigator.language;}
var parts=code.split('-');parts[0]=parts[0].toLowerCase();if(typeof OpenLayers.Lang[parts[0]]=="object"){lang=parts[0];}
if(parts[1]){var testLang=parts[0]+'-'+parts[1].toUpperCase();if(typeof OpenLayers.Lang[testLang]=="object"){lang=testLang;}}
if(!lang){OpenLayers.Console.warn('Failed to find OpenLayers.Lang.'+parts.join("-")+' dictionary, falling back to default language');lang=OpenLayers.Lang.defaultCode;}
OpenLayers.Lang.code=lang;},translate:function(key,context){var dictionary=OpenLayers.Lang[OpenLayers.Lang.getCode()];var message=dictionary&&dictionary[key];if(!message){message=key;}
if(context){message=OpenLayers.String.format(message,context);}
return message;}};OpenLayers.i18n=OpenLayers.Lang.translate;OpenLayers.Util=OpenLayers.Util||{};OpenLayers.Util.getElement=function(){var elements=[];for(var i=0,len=arguments.length;i<len;i++){var element=arguments[i];if(typeof element=='string'){element=document.getElementById(element);}
if(arguments.length==1){return element;}
elements.push(element);}
return elements;};OpenLayers.Util.isElement=function(o){return!!(o&&o.nodeType===1);};OpenLayers.Util.isArray=function(a){return(Object.prototype.toString.call(a)==='[object Array]');};OpenLayers.Util.removeItem=function(array,item){for(var i=array.length-1;i>=0;i--){if(array[i]==item){array.splice(i,1);}}
return array;};OpenLayers.Util.indexOf=function(array,obj){if(typeof array.indexOf=="function"){return array.indexOf(obj);}else{for(var i=0,len=array.length;i<len;i++){if(array[i]==obj){return i;}}
return-1;}};OpenLayers.Util.dotless=/\./g;OpenLayers.Util.modifyDOMElement=function(element,id,px,sz,position,border,overflow,opacity){if(id){element.id=id.replace(OpenLayers.Util.dotless,"_");}
if(px){element.style.left=px.x+"px";element.style.top=px.y+"px";}
if(sz){element.style.width=sz.w+"px";element.style.height=sz.h+"px";}
if(position){element.style.position=position;}
if(border){element.style.border=border;}
if(overflow){element.style.overflow=overflow;}
if(parseFloat(opacity)>=0.0&&parseFloat(opacity)<1.0){element.style.filter='alpha(opacity='+(opacity*100)+')';element.style.opacity=opacity;}else if(parseFloat(opacity)==1.0){element.style.filter='';element.style.opacity='';}};OpenLayers.Util.createDiv=function(id,px,sz,imgURL,position,border,overflow,opacity){var dom=document.createElement('div');if(imgURL){dom.style.backgroundImage='url('+imgURL+')';}
if(!id){id=OpenLayers.Util.createUniqueID("OpenLayersDiv");}
if(!position){position="absolute";}
OpenLayers.Util.modifyDOMElement(dom,id,px,sz,position,border,overflow,opacity);return dom;};OpenLayers.Util.createImage=function(id,px,sz,imgURL,position,border,opacity,delayDisplay){var image=document.createElement("img");if(!id){id=OpenLayers.Util.createUniqueID("OpenLayersDiv");}
if(!position){position="relative";}
OpenLayers.Util.modifyDOMElement(image,id,px,sz,position,border,null,opacity);if(delayDisplay){image.style.display="none";function display(){image.style.display="";OpenLayers.Event.stopObservingElement(image);}
OpenLayers.Event.observe(image,"load",display);OpenLayers.Event.observe(image,"error",display);}
image.style.alt=id;image.galleryImg="no";if(imgURL){image.src=imgURL;}
return image;};OpenLayers.IMAGE_RELOAD_ATTEMPTS=0;OpenLayers.Util.alphaHackNeeded=null;OpenLayers.Util.alphaHack=function(){if(OpenLayers.Util.alphaHackNeeded==null){var arVersion=navigator.appVersion.split("MSIE");var version=parseFloat(arVersion[1]);var filter=false;try{filter=!!(document.body.filters);}catch(e){}
OpenLayers.Util.alphaHackNeeded=(filter&&(version>=5.5)&&(version<7));}
return OpenLayers.Util.alphaHackNeeded;};OpenLayers.Util.modifyAlphaImageDiv=function(div,id,px,sz,imgURL,position,border,sizing,opacity){OpenLayers.Util.modifyDOMElement(div,id,px,sz,position,null,null,opacity);var img=div.childNodes[0];if(imgURL){img.src=imgURL;}
OpenLayers.Util.modifyDOMElement(img,div.id+"_innerImage",null,sz,"relative",border);if(OpenLayers.Util.alphaHack()){if(div.style.display!="none"){div.style.display="inline-block";}
if(sizing==null){sizing="scale";}
div.style.filter="progid:DXImageTransform.Microsoft"+".AlphaImageLoader(src='"+img.src+"', "+"sizingMethod='"+sizing+"')";if(parseFloat(div.style.opacity)>=0.0&&parseFloat(div.style.opacity)<1.0){div.style.filter+=" alpha(opacity="+div.style.opacity*100+")";}
img.style.filter="alpha(opacity=0)";}};OpenLayers.Util.createAlphaImageDiv=function(id,px,sz,imgURL,position,border,sizing,opacity,delayDisplay){var div=OpenLayers.Util.createDiv();var img=OpenLayers.Util.createImage(null,null,null,null,null,null,null,delayDisplay);img.className="olAlphaImg";div.appendChild(img);OpenLayers.Util.modifyAlphaImageDiv(div,id,px,sz,imgURL,position,border,sizing,opacity);return div;};OpenLayers.Util.upperCaseObject=function(object){var uObject={};for(var key in object){uObject[key.toUpperCase()]=object[key];}
return uObject;};OpenLayers.Util.applyDefaults=function(to,from){to=to||{};var fromIsEvt=typeof window.Event=="function"&&from instanceof window.Event;for(var key in from){if(to[key]===undefined||(!fromIsEvt&&from.hasOwnProperty&&from.hasOwnProperty(key)&&!to.hasOwnProperty(key))){to[key]=from[key];}}
if(!fromIsEvt&&from&&from.hasOwnProperty&&from.hasOwnProperty('toString')&&!to.hasOwnProperty('toString')){to.toString=from.toString;}
return to;};OpenLayers.Util.getParameterString=function(params){var paramsArray=[];for(var key in params){var value=params[key];if((value!=null)&&(typeof value!='function')){var encodedValue;if(typeof value=='object'&&value.constructor==Array){var encodedItemArray=[];var item;for(var itemIndex=0,len=value.length;itemIndex<len;itemIndex++){item=value[itemIndex];encodedItemArray.push(encodeURIComponent((item===null||item===undefined)?"":item));}
encodedValue=encodedItemArray.join(",");}
else{encodedValue=encodeURIComponent(value);}
paramsArray.push(encodeURIComponent(key)+"="+encodedValue);}}
return paramsArray.join("&");};OpenLayers.Util.urlAppend=function(url,paramStr){var newUrl=url;if(paramStr){var parts=(url+" ").split(/[?&]/);newUrl+=(parts.pop()===" "?paramStr:parts.length?"&"+paramStr:"?"+paramStr);}
return newUrl;};OpenLayers.Util.getImagesLocation=function(){return OpenLayers.ImgPath||(OpenLayers._getScriptLocation()+"img/");};OpenLayers.Util.getImageLocation=function(image){return OpenLayers.Util.getImagesLocation()+image;};OpenLayers.Util.Try=function(){var returnValue=null;for(var i=0,len=arguments.length;i<len;i++){var lambda=arguments[i];try{returnValue=lambda();break;}catch(e){}}
return returnValue;};OpenLayers.Util.getXmlNodeValue=function(node){var val=null;OpenLayers.Util.Try(function(){val=node.text;if(!val){val=node.textContent;}
if(!val){val=node.firstChild.nodeValue;}},function(){val=node.textContent;});return val;};OpenLayers.Util.mouseLeft=function(evt,div){var target=(evt.relatedTarget)?evt.relatedTarget:evt.toElement;while(target!=div&&target!=null){target=target.parentNode;}
return(target!=div);};OpenLayers.Util.DEFAULT_PRECISION=14;OpenLayers.Util.toFloat=function(number,precision){if(precision==null){precision=OpenLayers.Util.DEFAULT_PRECISION;}
if(typeof number!=="number"){number=parseFloat(number);}
return precision===0?number:parseFloat(number.toPrecision(precision));};OpenLayers.Util.rad=function(x){return x*Math.PI/180;};OpenLayers.Util.deg=function(x){return x*180/Math.PI;};OpenLayers.Util.VincentyConstants={a:6378137,b:6356752.3142,f:1/298.257223563};OpenLayers.Util.distVincenty=function(p1,p2){var ct=OpenLayers.Util.VincentyConstants;var a=ct.a,b=ct.b,f=ct.f;var L=OpenLayers.Util.rad(p2.lon-p1.lon);var U1=Math.atan((1-f)*Math.tan(OpenLayers.Util.rad(p1.lat)));var U2=Math.atan((1-f)*Math.tan(OpenLayers.Util.rad(p2.lat)));var sinU1=Math.sin(U1),cosU1=Math.cos(U1);var sinU2=Math.sin(U2),cosU2=Math.cos(U2);var lambda=L,lambdaP=2*Math.PI;var iterLimit=20;while(Math.abs(lambda-lambdaP)>1e-12&&--iterLimit>0){var sinLambda=Math.sin(lambda),cosLambda=Math.cos(lambda);var sinSigma=Math.sqrt((cosU2*sinLambda)*(cosU2*sinLambda)+
(cosU1*sinU2-sinU1*cosU2*cosLambda)*(cosU1*sinU2-sinU1*cosU2*cosLambda));if(sinSigma==0){return 0;}
var cosSigma=sinU1*sinU2+cosU1*cosU2*cosLambda;var sigma=Math.atan2(sinSigma,cosSigma);var alpha=Math.asin(cosU1*cosU2*sinLambda/sinSigma);var cosSqAlpha=Math.cos(alpha)*Math.cos(alpha);var cos2SigmaM=cosSigma-2*sinU1*sinU2/cosSqAlpha;var C=f/16*cosSqAlpha*(4+f*(4-3*cosSqAlpha));lambdaP=lambda;lambda=L+(1-C)*f*Math.sin(alpha)*(sigma+C*sinSigma*(cos2SigmaM+C*cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)));}
if(iterLimit==0){return NaN;}
var uSq=cosSqAlpha*(a*a-b*b)/(b*b);var A=1+uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq)));var B=uSq/1024*(256+uSq*(-128+uSq*(74-47*uSq)));var deltaSigma=B*sinSigma*(cos2SigmaM+B/4*(cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)-
B/6*cos2SigmaM*(-3+4*sinSigma*sinSigma)*(-3+4*cos2SigmaM*cos2SigmaM)));var s=b*A*(sigma-deltaSigma);var d=s.toFixed(3)/1000;return d;};OpenLayers.Util.destinationVincenty=function(lonlat,brng,dist){var u=OpenLayers.Util;var ct=u.VincentyConstants;var a=ct.a,b=ct.b,f=ct.f;var lon1=lonlat.lon;var lat1=lonlat.lat;var s=dist;var alpha1=u.rad(brng);var sinAlpha1=Math.sin(alpha1);var cosAlpha1=Math.cos(alpha1);var tanU1=(1-f)*Math.tan(u.rad(lat1));var cosU1=1/Math.sqrt((1+tanU1*tanU1)),sinU1=tanU1*cosU1;var sigma1=Math.atan2(tanU1,cosAlpha1);var sinAlpha=cosU1*sinAlpha1;var cosSqAlpha=1-sinAlpha*sinAlpha;var uSq=cosSqAlpha*(a*a-b*b)/(b*b);var A=1+uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq)));var B=uSq/1024*(256+uSq*(-128+uSq*(74-47*uSq)));var sigma=s/(b*A),sigmaP=2*Math.PI;while(Math.abs(sigma-sigmaP)>1e-12){var cos2SigmaM=Math.cos(2*sigma1+sigma);var sinSigma=Math.sin(sigma);var cosSigma=Math.cos(sigma);var deltaSigma=B*sinSigma*(cos2SigmaM+B/4*(cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)-
B/6*cos2SigmaM*(-3+4*sinSigma*sinSigma)*(-3+4*cos2SigmaM*cos2SigmaM)));sigmaP=sigma;sigma=s/(b*A)+deltaSigma;}
var tmp=sinU1*sinSigma-cosU1*cosSigma*cosAlpha1;var lat2=Math.atan2(sinU1*cosSigma+cosU1*sinSigma*cosAlpha1,(1-f)*Math.sqrt(sinAlpha*sinAlpha+tmp*tmp));var lambda=Math.atan2(sinSigma*sinAlpha1,cosU1*cosSigma-sinU1*sinSigma*cosAlpha1);var C=f/16*cosSqAlpha*(4+f*(4-3*cosSqAlpha));var L=lambda-(1-C)*f*sinAlpha*(sigma+C*sinSigma*(cos2SigmaM+C*cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)));var revAz=Math.atan2(sinAlpha,-tmp);return new OpenLayers.LonLat(lon1+u.deg(L),u.deg(lat2));};OpenLayers.Util.getParameters=function(url,options){options=options||{};url=(url===null||url===undefined)?window.location.href:url;var paramsString="";if(OpenLayers.String.contains(url,'?')){var start=url.indexOf('?')+1;var end=OpenLayers.String.contains(url,"#")?url.indexOf('#'):url.length;paramsString=url.substring(start,end);}
var parameters={};var pairs=paramsString.split(/[&;]/);for(var i=0,len=pairs.length;i<len;++i){var keyValue=pairs[i].split('=');if(keyValue[0]){var key=keyValue[0];try{key=decodeURIComponent(key);}catch(err){key=unescape(key);}
var value=(keyValue[1]||'').replace(/\+/g," ");try{value=decodeURIComponent(value);}catch(err){value=unescape(value);}
if(options.splitArgs!==false){value=value.split(",");}
if(value.length==1){value=value[0];}
parameters[key]=value;}}
return parameters;};OpenLayers.Util.lastSeqID=0;OpenLayers.Util.createUniqueID=function(prefix){if(prefix==null){prefix="id_";}else{prefix=prefix.replace(OpenLayers.Util.dotless,"_");}
OpenLayers.Util.lastSeqID+=1;return prefix+OpenLayers.Util.lastSeqID;};OpenLayers.INCHES_PER_UNIT={'inches':1.0,'ft':12.0,'mi':63360.0,'m':39.37,'km':39370,'dd':4374754,'yd':36};OpenLayers.INCHES_PER_UNIT["in"]=OpenLayers.INCHES_PER_UNIT.inches;OpenLayers.INCHES_PER_UNIT["degrees"]=OpenLayers.INCHES_PER_UNIT.dd;OpenLayers.INCHES_PER_UNIT["nmi"]=1852*OpenLayers.INCHES_PER_UNIT.m;OpenLayers.METERS_PER_INCH=0.02540005080010160020;OpenLayers.Util.extend(OpenLayers.INCHES_PER_UNIT,{"Inch":OpenLayers.INCHES_PER_UNIT.inches,"Meter":1.0/OpenLayers.METERS_PER_INCH,"Foot":0.30480060960121920243/OpenLayers.METERS_PER_INCH,"IFoot":0.30480000000000000000/OpenLayers.METERS_PER_INCH,"ClarkeFoot":0.3047972651151/OpenLayers.METERS_PER_INCH,"SearsFoot":0.30479947153867624624/OpenLayers.METERS_PER_INCH,"GoldCoastFoot":0.30479971018150881758/OpenLayers.METERS_PER_INCH,"IInch":0.02540000000000000000/OpenLayers.METERS_PER_INCH,"MicroInch":0.00002540000000000000/OpenLayers.METERS_PER_INCH,"Mil":0.00000002540000000000/OpenLayers.METERS_PER_INCH,"Centimeter":0.01000000000000000000/OpenLayers.METERS_PER_INCH,"Kilometer":1000.00000000000000000000/OpenLayers.METERS_PER_INCH,"Yard":0.91440182880365760731/OpenLayers.METERS_PER_INCH,"SearsYard":0.914398414616029/OpenLayers.METERS_PER_INCH,"IndianYard":0.91439853074444079983/OpenLayers.METERS_PER_INCH,"IndianYd37":0.91439523/OpenLayers.METERS_PER_INCH,"IndianYd62":0.9143988/OpenLayers.METERS_PER_INCH,"IndianYd75":0.9143985/OpenLayers.METERS_PER_INCH,"IndianFoot":0.30479951/OpenLayers.METERS_PER_INCH,"IndianFt37":0.30479841/OpenLayers.METERS_PER_INCH,"IndianFt62":0.3047996/OpenLayers.METERS_PER_INCH,"IndianFt75":0.3047995/OpenLayers.METERS_PER_INCH,"Mile":1609.34721869443738887477/OpenLayers.METERS_PER_INCH,"IYard":0.91440000000000000000/OpenLayers.METERS_PER_INCH,"IMile":1609.34400000000000000000/OpenLayers.METERS_PER_INCH,"NautM":1852.00000000000000000000/OpenLayers.METERS_PER_INCH,"Lat-66":110943.316488932731/OpenLayers.METERS_PER_INCH,"Lat-83":110946.25736872234125/OpenLayers.METERS_PER_INCH,"Decimeter":0.10000000000000000000/OpenLayers.METERS_PER_INCH,"Millimeter":0.00100000000000000000/OpenLayers.METERS_PER_INCH,"Dekameter":10.00000000000000000000/OpenLayers.METERS_PER_INCH,"Decameter":10.00000000000000000000/OpenLayers.METERS_PER_INCH,"Hectometer":100.00000000000000000000/OpenLayers.METERS_PER_INCH,"GermanMeter":1.0000135965/OpenLayers.METERS_PER_INCH,"CaGrid":0.999738/OpenLayers.METERS_PER_INCH,"ClarkeChain":20.1166194976/OpenLayers.METERS_PER_INCH,"GunterChain":20.11684023368047/OpenLayers.METERS_PER_INCH,"BenoitChain":20.116782494375872/OpenLayers.METERS_PER_INCH,"SearsChain":20.11676512155/OpenLayers.METERS_PER_INCH,"ClarkeLink":0.201166194976/OpenLayers.METERS_PER_INCH,"GunterLink":0.2011684023368047/OpenLayers.METERS_PER_INCH,"BenoitLink":0.20116782494375872/OpenLayers.METERS_PER_INCH,"SearsLink":0.2011676512155/OpenLayers.METERS_PER_INCH,"Rod":5.02921005842012/OpenLayers.METERS_PER_INCH,"IntnlChain":20.1168/OpenLayers.METERS_PER_INCH,"IntnlLink":0.201168/OpenLayers.METERS_PER_INCH,"Perch":5.02921005842012/OpenLayers.METERS_PER_INCH,"Pole":5.02921005842012/OpenLayers.METERS_PER_INCH,"Furlong":201.1684023368046/OpenLayers.METERS_PER_INCH,"Rood":3.778266898/OpenLayers.METERS_PER_INCH,"CapeFoot":0.3047972615/OpenLayers.METERS_PER_INCH,"Brealey":375.00000000000000000000/OpenLayers.METERS_PER_INCH,"ModAmFt":0.304812252984505969011938/OpenLayers.METERS_PER_INCH,"Fathom":1.8288/OpenLayers.METERS_PER_INCH,"NautM-UK":1853.184/OpenLayers.METERS_PER_INCH,"50kilometers":50000.0/OpenLayers.METERS_PER_INCH,"150kilometers":150000.0/OpenLayers.METERS_PER_INCH});OpenLayers.Util.extend(OpenLayers.INCHES_PER_UNIT,{"mm":OpenLayers.INCHES_PER_UNIT["Meter"]/1000.0,"cm":OpenLayers.INCHES_PER_UNIT["Meter"]/100.0,"dm":OpenLayers.INCHES_PER_UNIT["Meter"]*100.0,"km":OpenLayers.INCHES_PER_UNIT["Meter"]*1000.0,"kmi":OpenLayers.INCHES_PER_UNIT["nmi"],"fath":OpenLayers.INCHES_PER_UNIT["Fathom"],"ch":OpenLayers.INCHES_PER_UNIT["IntnlChain"],"link":OpenLayers.INCHES_PER_UNIT["IntnlLink"],"us-in":OpenLayers.INCHES_PER_UNIT["inches"],"us-ft":OpenLayers.INCHES_PER_UNIT["Foot"],"us-yd":OpenLayers.INCHES_PER_UNIT["Yard"],"us-ch":OpenLayers.INCHES_PER_UNIT["GunterChain"],"us-mi":OpenLayers.INCHES_PER_UNIT["Mile"],"ind-yd":OpenLayers.INCHES_PER_UNIT["IndianYd37"],"ind-ft":OpenLayers.INCHES_PER_UNIT["IndianFt37"],"ind-ch":20.11669506/OpenLayers.METERS_PER_INCH});OpenLayers.DOTS_PER_INCH=72;OpenLayers.Util.normalizeScale=function(scale){var normScale=(scale>1.0)?(1.0/scale):scale;return normScale;};OpenLayers.Util.getResolutionFromScale=function(scale,units){var resolution;if(scale){if(units==null){units="degrees";}
var normScale=OpenLayers.Util.normalizeScale(scale);resolution=1/(normScale*OpenLayers.INCHES_PER_UNIT[units]*OpenLayers.DOTS_PER_INCH);}
return resolution;};OpenLayers.Util.getScaleFromResolution=function(resolution,units){if(units==null){units="degrees";}
var scale=resolution*OpenLayers.INCHES_PER_UNIT[units]*OpenLayers.DOTS_PER_INCH;return scale;};OpenLayers.Util.pagePosition=function(forElement){var pos=[0,0];var viewportElement=OpenLayers.Util.getViewportElement();if(!forElement||forElement==window||forElement==viewportElement){return pos;}
var BUGGY_GECKO_BOX_OBJECT=OpenLayers.IS_GECKO&&document.getBoxObjectFor&&OpenLayers.Element.getStyle(forElement,'position')=='absolute'&&(forElement.style.top==''||forElement.style.left=='');var parent=null;var box;if(forElement.getBoundingClientRect){box=forElement.getBoundingClientRect();var scrollTop=window.pageYOffset||viewportElement.scrollTop;var scrollLeft=window.pageXOffset||viewportElement.scrollLeft;pos[0]=box.left+scrollLeft;pos[1]=box.top+scrollTop;}else if(document.getBoxObjectFor&&!BUGGY_GECKO_BOX_OBJECT){box=document.getBoxObjectFor(forElement);var vpBox=document.getBoxObjectFor(viewportElement);pos[0]=box.screenX-vpBox.screenX;pos[1]=box.screenY-vpBox.screenY;}else{pos[0]=forElement.offsetLeft;pos[1]=forElement.offsetTop;parent=forElement.offsetParent;if(parent!=forElement){while(parent){pos[0]+=parent.offsetLeft;pos[1]+=parent.offsetTop;parent=parent.offsetParent;}}
var browser=OpenLayers.BROWSER_NAME;if(browser=="opera"||(browser=="safari"&&OpenLayers.Element.getStyle(forElement,'position')=='absolute')){pos[1]-=document.body.offsetTop;}
parent=forElement.offsetParent;while(parent&&parent!=document.body){pos[0]-=parent.scrollLeft;if(browser!="opera"||parent.tagName!='TR'){pos[1]-=parent.scrollTop;}
parent=parent.offsetParent;}}
return pos;};OpenLayers.Util.getViewportElement=function(){var viewportElement=arguments.callee.viewportElement;if(viewportElement==undefined){viewportElement=(OpenLayers.BROWSER_NAME=="msie"&&document.compatMode!='CSS1Compat')?document.body:document.documentElement;arguments.callee.viewportElement=viewportElement;}
return viewportElement;};OpenLayers.Util.isEquivalentUrl=function(url1,url2,options){options=options||{};OpenLayers.Util.applyDefaults(options,{ignoreCase:true,ignorePort80:true,ignoreHash:true,splitArgs:false});var urlObj1=OpenLayers.Util.createUrlObject(url1,options);var urlObj2=OpenLayers.Util.createUrlObject(url2,options);for(var key in urlObj1){if(key!=="args"){if(urlObj1[key]!=urlObj2[key]){return false;}}}
for(var key in urlObj1.args){if(urlObj1.args[key]!=urlObj2.args[key]){return false;}
delete urlObj2.args[key];}
for(var key in urlObj2.args){return false;}
return true;};OpenLayers.Util.createUrlObject=function(url,options){options=options||{};if(!(/^\w+:\/\//).test(url)){var loc=window.location;var port=loc.port?":"+loc.port:"";var fullUrl=loc.protocol+"//"+loc.host.split(":").shift()+port;if(url.indexOf("/")===0){url=fullUrl+url;}else{var parts=loc.pathname.split("/");parts.pop();url=fullUrl+parts.join("/")+"/"+url;}}
if(options.ignoreCase){url=url.toLowerCase();}
var a=document.createElement('a');a.href=url;var urlObject={};urlObject.host=a.host.split(":").shift();urlObject.protocol=a.protocol;if(options.ignorePort80){urlObject.port=(a.port=="80"||a.port=="0")?"":a.port;}else{urlObject.port=(a.port==""||a.port=="0")?"80":a.port;}
urlObject.hash=(options.ignoreHash||a.hash==="#")?"":a.hash;var queryString=a.search;if(!queryString){var qMark=url.indexOf("?");queryString=(qMark!=-1)?url.substr(qMark):"";}
urlObject.args=OpenLayers.Util.getParameters(queryString,{splitArgs:options.splitArgs});urlObject.pathname=(a.pathname.charAt(0)=="/")?a.pathname:"/"+a.pathname;return urlObject;};OpenLayers.Util.removeTail=function(url){var head=null;var qMark=url.indexOf("?");var hashMark=url.indexOf("#");if(qMark==-1){head=(hashMark!=-1)?url.substr(0,hashMark):url;}else{head=(hashMark!=-1)?url.substr(0,Math.min(qMark,hashMark)):url.substr(0,qMark);}
return head;};OpenLayers.IS_GECKO=(function(){var ua=navigator.userAgent.toLowerCase();return ua.indexOf("webkit")==-1&&ua.indexOf("gecko")!=-1;})();OpenLayers.CANVAS_SUPPORTED=(function(){var elem=document.createElement('canvas');return!!(elem.getContext&&elem.getContext('2d'));})();OpenLayers.BROWSER_NAME=(function(){var name="";var ua=navigator.userAgent.toLowerCase();if(ua.indexOf("opera")!=-1){name="opera";}else if(ua.indexOf("msie")!=-1){name="msie";}else if(ua.indexOf("safari")!=-1){name="safari";}else if(ua.indexOf("mozilla")!=-1){if(ua.indexOf("firefox")!=-1){name="firefox";}else{name="mozilla";}}
return name;})();OpenLayers.Util.getBrowserName=function(){return OpenLayers.BROWSER_NAME;};OpenLayers.Util.getRenderedDimensions=function(contentHTML,size,options){var w,h;var container=document.createElement("div");container.style.visibility="hidden";var containerElement=(options&&options.containerElement)?options.containerElement:document.body;var parentHasPositionAbsolute=false;var superContainer=null;var parent=containerElement;while(parent&&parent.tagName.toLowerCase()!="body"){var parentPosition=OpenLayers.Element.getStyle(parent,"position");if(parentPosition=="absolute"){parentHasPositionAbsolute=true;break;}else if(parentPosition&&parentPosition!="static"){break;}
parent=parent.parentNode;}
if(parentHasPositionAbsolute&&(containerElement.clientHeight===0||containerElement.clientWidth===0)){superContainer=document.createElement("div");superContainer.style.visibility="hidden";superContainer.style.position="absolute";superContainer.style.overflow="visible";superContainer.style.width=document.body.clientWidth+"px";superContainer.style.height=document.body.clientHeight+"px";superContainer.appendChild(container);}
container.style.position="absolute";if(size){if(size.w){w=size.w;container.style.width=w+"px";}else if(size.h){h=size.h;container.style.height=h+"px";}}
if(options&&options.displayClass){container.className=options.displayClass;}
var content=document.createElement("div");content.innerHTML=contentHTML;content.style.overflow="visible";if(content.childNodes){for(var i=0,l=content.childNodes.length;i<l;i++){if(!content.childNodes[i].style)continue;content.childNodes[i].style.overflow="visible";}}
container.appendChild(content);if(superContainer){containerElement.appendChild(superContainer);}else{containerElement.appendChild(container);}
if(!w){w=parseInt(content.scrollWidth);container.style.width=w+"px";}
if(!h){h=parseInt(content.scrollHeight);}
container.removeChild(content);if(superContainer){superContainer.removeChild(container);containerElement.removeChild(superContainer);}else{containerElement.removeChild(container);}
return new OpenLayers.Size(w,h);};OpenLayers.Util.getScrollbarWidth=function(){var scrollbarWidth=OpenLayers.Util._scrollbarWidth;if(scrollbarWidth==null){var scr=null;var inn=null;var wNoScroll=0;var wScroll=0;scr=document.createElement('div');scr.style.position='absolute';scr.style.top='-1000px';scr.style.left='-1000px';scr.style.width='100px';scr.style.height='50px';scr.style.overflow='hidden';inn=document.createElement('div');inn.style.width='100%';inn.style.height='200px';scr.appendChild(inn);document.body.appendChild(scr);wNoScroll=inn.offsetWidth;scr.style.overflow='scroll';wScroll=inn.offsetWidth;document.body.removeChild(document.body.lastChild);OpenLayers.Util._scrollbarWidth=(wNoScroll-wScroll);scrollbarWidth=OpenLayers.Util._scrollbarWidth;}
return scrollbarWidth;};OpenLayers.Util.getFormattedLonLat=function(coordinate,axis,dmsOption){if(!dmsOption){dmsOption='dms';}
coordinate=(coordinate+540)%360-180;var abscoordinate=Math.abs(coordinate);var coordinatedegrees=Math.floor(abscoordinate);var coordinateminutes=(abscoordinate-coordinatedegrees)/(1/60);var tempcoordinateminutes=coordinateminutes;coordinateminutes=Math.floor(coordinateminutes);var coordinateseconds=(tempcoordinateminutes-coordinateminutes)/(1/60);coordinateseconds=Math.round(coordinateseconds*10);coordinateseconds/=10;if(coordinateseconds>=60){coordinateseconds-=60;coordinateminutes+=1;if(coordinateminutes>=60){coordinateminutes-=60;coordinatedegrees+=1;}}
if(coordinatedegrees<10){coordinatedegrees="0"+coordinatedegrees;}
var str=coordinatedegrees+"\u00B0";if(dmsOption.indexOf('dm')>=0){if(coordinateminutes<10){coordinateminutes="0"+coordinateminutes;}
str+=coordinateminutes+"'";if(dmsOption.indexOf('dms')>=0){if(coordinateseconds<10){coordinateseconds="0"+coordinateseconds;}
str+=coordinateseconds+'"';}}
if(axis=="lon"){str+=coordinate<0?OpenLayers.i18n("W"):OpenLayers.i18n("E");}else{str+=coordinate<0?OpenLayers.i18n("S"):OpenLayers.i18n("N");}
return str;};OpenLayers.Util.getConstructor=function(className){var Constructor;var parts=className.split('.');if(parts[0]==="OpenLayers"){Constructor=OpenLayers;}else{Constructor=window[parts[0]];}
for(var i=1,ii=parts.length;i<ii;++i){Constructor=Constructor[parts[i]];}
return Constructor;};OpenLayers.Feature=OpenLayers.Class({layer:null,id:null,lonlat:null,data:null,marker:null,popupClass:null,popup:null,initialize:function(layer,lonlat,data){this.layer=layer;this.lonlat=lonlat;this.data=(data!=null)?data:{};this.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME+"_");},destroy:function(){if((this.layer!=null)&&(this.layer.map!=null)){if(this.popup!=null){this.layer.map.removePopup(this.popup);}}
if(this.layer!=null&&this.marker!=null){this.layer.removeMarker(this.marker);}
this.layer=null;this.id=null;this.lonlat=null;this.data=null;if(this.marker!=null){this.destroyMarker(this.marker);this.marker=null;}
if(this.popup!=null){this.destroyPopup(this.popup);this.popup=null;}},onScreen:function(){var onScreen=false;if((this.layer!=null)&&(this.layer.map!=null)){var screenBounds=this.layer.map.getExtent();onScreen=screenBounds.containsLonLat(this.lonlat);}
return onScreen;},createMarker:function(){if(this.lonlat!=null){this.marker=new OpenLayers.Marker(this.lonlat,this.data.icon);}
return this.marker;},destroyMarker:function(){this.marker.destroy();},createPopup:function(closeBox){if(this.lonlat!=null){if(!this.popup){var anchor=(this.marker)?this.marker.icon:null;var popupClass=this.popupClass?this.popupClass:OpenLayers.Popup.Anchored;this.popup=new popupClass(this.id+"_popup",this.lonlat,this.data.popupSize,this.data.popupContentHTML,anchor,closeBox);}
if(this.data.overflow!=null){this.popup.contentDiv.style.overflow=this.data.overflow;}
this.popup.feature=this;}
return this.popup;},destroyPopup:function(){if(this.popup){this.popup.feature=null;this.popup.destroy();this.popup=null;}},CLASS_NAME:"OpenLayers.Feature"});OpenLayers.State={UNKNOWN:'Unknown',INSERT:'Insert',UPDATE:'Update',DELETE:'Delete'};OpenLayers.Feature.Vector=OpenLayers.Class(OpenLayers.Feature,{fid:null,geometry:null,attributes:null,bounds:null,state:null,style:null,url:null,renderIntent:"default",modified:null,initialize:function(geometry,attributes,style){OpenLayers.Feature.prototype.initialize.apply(this,[null,null,attributes]);this.lonlat=null;this.geometry=geometry?geometry:null;this.state=null;this.attributes={};if(attributes){this.attributes=OpenLayers.Util.extend(this.attributes,attributes);}
this.style=style?style:null;},destroy:function(){if(this.layer){this.layer.removeFeatures(this);this.layer=null;}
this.geometry=null;this.modified=null;OpenLayers.Feature.prototype.destroy.apply(this,arguments);},clone:function(){return new OpenLayers.Feature.Vector(this.geometry?this.geometry.clone():null,this.attributes,this.style);},onScreen:function(boundsOnly){var onScreen=false;if(this.layer&&this.layer.map){var screenBounds=this.layer.map.getExtent();if(boundsOnly){var featureBounds=this.geometry.getBounds();onScreen=screenBounds.intersectsBounds(featureBounds);}else{var screenPoly=screenBounds.toGeometry();onScreen=screenPoly.intersects(this.geometry);}}
return onScreen;},getVisibility:function(){return!(this.style&&this.style.display=='none'||!this.layer||this.layer&&this.layer.styleMap&&this.layer.styleMap.createSymbolizer(this,this.renderIntent).display=='none'||this.layer&&!this.layer.getVisibility());},createMarker:function(){return null;},destroyMarker:function(){},createPopup:function(){return null;},atPoint:function(lonlat,toleranceLon,toleranceLat){var atPoint=false;if(this.geometry){atPoint=this.geometry.atPoint(lonlat,toleranceLon,toleranceLat);}
return atPoint;},destroyPopup:function(){},move:function(location){if(!this.layer||!this.geometry.move){return undefined;}
var pixel;if(location.CLASS_NAME=="OpenLayers.LonLat"){pixel=this.layer.getViewPortPxFromLonLat(location);}else{pixel=location;}
var lastPixel=this.layer.getViewPortPxFromLonLat(this.geometry.getBounds().getCenterLonLat());var res=this.layer.map.getResolution();this.geometry.move(res*(pixel.x-lastPixel.x),res*(lastPixel.y-pixel.y));this.layer.drawFeature(this);return lastPixel;},toState:function(state){if(state==OpenLayers.State.UPDATE){switch(this.state){case OpenLayers.State.UNKNOWN:case OpenLayers.State.DELETE:this.state=state;break;case OpenLayers.State.UPDATE:case OpenLayers.State.INSERT:break;}}else if(state==OpenLayers.State.INSERT){switch(this.state){case OpenLayers.State.UNKNOWN:break;default:this.state=state;break;}}else if(state==OpenLayers.State.DELETE){switch(this.state){case OpenLayers.State.INSERT:break;case OpenLayers.State.DELETE:break;case OpenLayers.State.UNKNOWN:case OpenLayers.State.UPDATE:this.state=state;break;}}else if(state==OpenLayers.State.UNKNOWN){this.state=state;}},CLASS_NAME:"OpenLayers.Feature.Vector"});OpenLayers.Feature.Vector.style={'default':{fillColor:"#ee9900",fillOpacity:0.4,hoverFillColor:"white",hoverFillOpacity:0.8,strokeColor:"#ee9900",strokeOpacity:1,strokeWidth:1,strokeLinecap:"round",strokeDashstyle:"solid",hoverStrokeColor:"red",hoverStrokeOpacity:1,hoverStrokeWidth:0.2,pointRadius:6,hoverPointRadius:1,hoverPointUnit:"%",pointerEvents:"visiblePainted",cursor:"inherit",fontColor:"#000000",labelAlign:"cm",labelOutlineColor:"white",labelOutlineWidth:3},'select':{fillColor:"blue",fillOpacity:0.4,hoverFillColor:"white",hoverFillOpacity:0.8,strokeColor:"blue",strokeOpacity:1,strokeWidth:2,strokeLinecap:"round",strokeDashstyle:"solid",hoverStrokeColor:"red",hoverStrokeOpacity:1,hoverStrokeWidth:0.2,pointRadius:6,hoverPointRadius:1,hoverPointUnit:"%",pointerEvents:"visiblePainted",cursor:"pointer",fontColor:"#000000",labelAlign:"cm",labelOutlineColor:"white",labelOutlineWidth:3},'temporary':{fillColor:"#66cccc",fillOpacity:0.2,hoverFillColor:"white",hoverFillOpacity:0.8,strokeColor:"#66cccc",strokeOpacity:1,strokeLinecap:"round",strokeWidth:2,strokeDashstyle:"solid",hoverStrokeColor:"red",hoverStrokeOpacity:1,hoverStrokeWidth:0.2,pointRadius:6,hoverPointRadius:1,hoverPointUnit:"%",pointerEvents:"visiblePainted",cursor:"inherit",fontColor:"#000000",labelAlign:"cm",labelOutlineColor:"white",labelOutlineWidth:3},'delete':{display:"none"}};OpenLayers.Style=OpenLayers.Class({id:null,name:null,title:null,description:null,layerName:null,isDefault:false,rules:null,context:null,defaultStyle:null,defaultsPerSymbolizer:false,propertyStyles:null,initialize:function(style,options){OpenLayers.Util.extend(this,options);this.rules=[];if(options&&options.rules){this.addRules(options.rules);}
this.setDefaultStyle(style||OpenLayers.Feature.Vector.style["default"]);this.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME+"_");},destroy:function(){for(var i=0,len=this.rules.length;i<len;i++){this.rules[i].destroy();this.rules[i]=null;}
this.rules=null;this.defaultStyle=null;},createSymbolizer:function(feature){var style=this.defaultsPerSymbolizer?{}:this.createLiterals(OpenLayers.Util.extend({},this.defaultStyle),feature);var rules=this.rules;var rule,context;var elseRules=[];var appliedRules=false;for(var i=0,len=rules.length;i<len;i++){rule=rules[i];var applies=rule.evaluate(feature);if(applies){if(rule instanceof OpenLayers.Rule&&rule.elseFilter){elseRules.push(rule);}else{appliedRules=true;this.applySymbolizer(rule,style,feature);}}}
if(appliedRules==false&&elseRules.length>0){appliedRules=true;for(var i=0,len=elseRules.length;i<len;i++){this.applySymbolizer(elseRules[i],style,feature);}}
if(rules.length>0&&appliedRules==false){style.display="none";}
if(style.label!=null&&typeof style.label!=="string"){style.label=String(style.label);}
return style;},applySymbolizer:function(rule,style,feature){var symbolizerPrefix=feature.geometry?this.getSymbolizerPrefix(feature.geometry):OpenLayers.Style.SYMBOLIZER_PREFIXES[0];var symbolizer=rule.symbolizer[symbolizerPrefix]||rule.symbolizer;if(this.defaultsPerSymbolizer===true){var defaults=this.defaultStyle;OpenLayers.Util.applyDefaults(symbolizer,{pointRadius:defaults.pointRadius});if(symbolizer.stroke===true||symbolizer.graphic===true){OpenLayers.Util.applyDefaults(symbolizer,{strokeWidth:defaults.strokeWidth,strokeColor:defaults.strokeColor,strokeOpacity:defaults.strokeOpacity,strokeDashstyle:defaults.strokeDashstyle,strokeLinecap:defaults.strokeLinecap});}
if(symbolizer.fill===true||symbolizer.graphic===true){OpenLayers.Util.applyDefaults(symbolizer,{fillColor:defaults.fillColor,fillOpacity:defaults.fillOpacity});}
if(symbolizer.graphic===true){OpenLayers.Util.applyDefaults(symbolizer,{pointRadius:this.defaultStyle.pointRadius,externalGraphic:this.defaultStyle.externalGraphic,graphicName:this.defaultStyle.graphicName,graphicOpacity:this.defaultStyle.graphicOpacity,graphicWidth:this.defaultStyle.graphicWidth,graphicHeight:this.defaultStyle.graphicHeight,graphicXOffset:this.defaultStyle.graphicXOffset,graphicYOffset:this.defaultStyle.graphicYOffset});}}
return this.createLiterals(OpenLayers.Util.extend(style,symbolizer),feature);},createLiterals:function(style,feature){var context=OpenLayers.Util.extend({},feature.attributes||feature.data);OpenLayers.Util.extend(context,this.context);for(var i in this.propertyStyles){style[i]=OpenLayers.Style.createLiteral(style[i],context,feature,i);}
return style;},findPropertyStyles:function(){var propertyStyles={};var style=this.defaultStyle;this.addPropertyStyles(propertyStyles,style);var rules=this.rules;var symbolizer,value;for(var i=0,len=rules.length;i<len;i++){symbolizer=rules[i].symbolizer;for(var key in symbolizer){value=symbolizer[key];if(typeof value=="object"){this.addPropertyStyles(propertyStyles,value);}else{this.addPropertyStyles(propertyStyles,symbolizer);break;}}}
return propertyStyles;},addPropertyStyles:function(propertyStyles,symbolizer){var property;for(var key in symbolizer){property=symbolizer[key];if(typeof property=="string"&&property.match(/\$\{\w+\}/)){propertyStyles[key]=true;}}
return propertyStyles;},addRules:function(rules){Array.prototype.push.apply(this.rules,rules);this.propertyStyles=this.findPropertyStyles();},setDefaultStyle:function(style){this.defaultStyle=style;this.propertyStyles=this.findPropertyStyles();},getSymbolizerPrefix:function(geometry){var prefixes=OpenLayers.Style.SYMBOLIZER_PREFIXES;for(var i=0,len=prefixes.length;i<len;i++){if(geometry.CLASS_NAME.indexOf(prefixes[i])!=-1){return prefixes[i];}}},clone:function(){var options=OpenLayers.Util.extend({},this);if(this.rules){options.rules=[];for(var i=0,len=this.rules.length;i<len;++i){options.rules.push(this.rules[i].clone());}}
options.context=this.context&&OpenLayers.Util.extend({},this.context);var defaultStyle=OpenLayers.Util.extend({},this.defaultStyle);return new OpenLayers.Style(defaultStyle,options);},CLASS_NAME:"OpenLayers.Style"});OpenLayers.Style.createLiteral=function(value,context,feature,property){if(typeof value=="string"&&value.indexOf("${")!=-1){value=OpenLayers.String.format(value,context,[feature,property]);value=(isNaN(value)||!value)?value:parseFloat(value);}
return value;};OpenLayers.Style.SYMBOLIZER_PREFIXES=['Point','Line','Polygon','Text','Raster'];OpenLayers.Util=OpenLayers.Util||{};OpenLayers.Util.vendorPrefix=(function(){"use strict";var VENDOR_PREFIXES=["","O","ms","Moz","Webkit"],divStyle=document.createElement("div").style,cssCache={},jsCache={};function domToCss(prefixedDom){if(!prefixedDom){return null;}
return prefixedDom.replace(/([A-Z])/g,function(c){return"-"+c.toLowerCase();}).replace(/^ms-/,"-ms-");}
function css(property){if(cssCache[property]===undefined){var domProperty=property.replace(/(-[\s\S])/g,function(c){return c.charAt(1).toUpperCase();});var prefixedDom=style(domProperty);cssCache[property]=domToCss(prefixedDom);}
return cssCache[property];}
function js(obj,property){if(jsCache[property]===undefined){var tmpProp,i=0,l=VENDOR_PREFIXES.length,prefix,isStyleObj=(typeof obj.cssText!=="undefined");jsCache[property]=null;for(;i<l;i++){prefix=VENDOR_PREFIXES[i];if(prefix){if(!isStyleObj){prefix=prefix.toLowerCase();}
tmpProp=prefix+property.charAt(0).toUpperCase()+property.slice(1);}else{tmpProp=property;}
if(obj[tmpProp]!==undefined){jsCache[property]=tmpProp;break;}}}
return jsCache[property];}
function style(property){return js(divStyle,property);}
return{css:css,js:js,style:style,cssCache:cssCache,jsCache:jsCache};}());OpenLayers.Animation=(function(window){var requestAnimationFrame=OpenLayers.Util.vendorPrefix.js(window,"requestAnimationFrame");var isNative=!!(requestAnimationFrame);var requestFrame=(function(){var request=window[requestAnimationFrame]||function(callback,element){window.setTimeout(callback,16);};return function(callback,element){request.apply(window,[callback,element]);};})();var counter=0;var loops={};function start(callback,duration,element){duration=duration>0?duration:Number.POSITIVE_INFINITY;var id=++counter;var start=+new Date;loops[id]=function(){if(loops[id]&&+new Date-start<=duration){callback();if(loops[id]){requestFrame(loops[id],element);}}else{delete loops[id];}};requestFrame(loops[id],element);return id;}
function stop(id){delete loops[id];}
return{isNative:isNative,requestFrame:requestFrame,start:start,stop:stop};})(window);OpenLayers.Tween=OpenLayers.Class({easing:null,begin:null,finish:null,duration:null,callbacks:null,time:null,minFrameRate:null,startTime:null,animationId:null,playing:false,initialize:function(easing){this.easing=(easing)?easing:OpenLayers.Easing.Expo.easeOut;},start:function(begin,finish,duration,options){this.playing=true;this.begin=begin;this.finish=finish;this.duration=duration;this.callbacks=options.callbacks;this.minFrameRate=options.minFrameRate||30;this.time=0;this.startTime=new Date().getTime();OpenLayers.Animation.stop(this.animationId);this.animationId=null;if(this.callbacks&&this.callbacks.start){this.callbacks.start.call(this,this.begin);}
this.animationId=OpenLayers.Animation.start(OpenLayers.Function.bind(this.play,this));},stop:function(){if(!this.playing){return;}
if(this.callbacks&&this.callbacks.done){this.callbacks.done.call(this,this.finish);}
OpenLayers.Animation.stop(this.animationId);this.animationId=null;this.playing=false;},play:function(){var value={};for(var i in this.begin){var b=this.begin[i];var f=this.finish[i];if(b==null||f==null||isNaN(b)||isNaN(f)){throw new TypeError('invalid value for Tween');}
var c=f-b;value[i]=this.easing.apply(this,[this.time,b,c,this.duration]);}
this.time++;if(this.callbacks&&this.callbacks.eachStep){if((new Date().getTime()-this.startTime)/this.time<=1000/this.minFrameRate){this.callbacks.eachStep.call(this,value);}}
if(this.time>this.duration){this.stop();}},CLASS_NAME:"OpenLayers.Tween"});OpenLayers.Easing={CLASS_NAME:"OpenLayers.Easing"};OpenLayers.Easing.Linear={easeIn:function(t,b,c,d){return c*t/d+b;},easeOut:function(t,b,c,d){return c*t/d+b;},easeInOut:function(t,b,c,d){return c*t/d+b;},CLASS_NAME:"OpenLayers.Easing.Linear"};OpenLayers.Easing.Expo={easeIn:function(t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b;},easeOut:function(t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},easeInOut:function(t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b;},CLASS_NAME:"OpenLayers.Easing.Expo"};OpenLayers.Easing.Quad={easeIn:function(t,b,c,d){return c*(t/=d)*t+b;},easeOut:function(t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeInOut:function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b;},CLASS_NAME:"OpenLayers.Easing.Quad"};OpenLayers.Geometry=OpenLayers.Class({id:null,parent:null,bounds:null,initialize:function(){this.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME+"_");},destroy:function(){this.id=null;this.bounds=null;},clone:function(){return new OpenLayers.Geometry();},setBounds:function(bounds){if(bounds){this.bounds=bounds.clone();}},clearBounds:function(){this.bounds=null;if(this.parent){this.parent.clearBounds();}},extendBounds:function(newBounds){var bounds=this.getBounds();if(!bounds){this.setBounds(newBounds);}else{this.bounds.extend(newBounds);}},getBounds:function(){if(this.bounds==null){this.calculateBounds();}
return this.bounds;},calculateBounds:function(){},distanceTo:function(geometry,options){},getVertices:function(nodes){},atPoint:function(lonlat,toleranceLon,toleranceLat){var atPoint=false;var bounds=this.getBounds();if((bounds!=null)&&(lonlat!=null)){var dX=(toleranceLon!=null)?toleranceLon:0;var dY=(toleranceLat!=null)?toleranceLat:0;var toleranceBounds=new OpenLayers.Bounds(this.bounds.left-dX,this.bounds.bottom-dY,this.bounds.right+dX,this.bounds.top+dY);atPoint=toleranceBounds.containsLonLat(lonlat);}
return atPoint;},getLength:function(){return 0.0;},getArea:function(){return 0.0;},getCentroid:function(){return null;},toString:function(){var string;if(OpenLayers.Format&&OpenLayers.Format.WKT){string=OpenLayers.Format.WKT.prototype.write(new OpenLayers.Feature.Vector(this));}else{string=Object.prototype.toString.call(this);}
return string;},CLASS_NAME:"OpenLayers.Geometry"});OpenLayers.Geometry.fromWKT=function(wkt){var geom;if(OpenLayers.Format&&OpenLayers.Format.WKT){var format=OpenLayers.Geometry.fromWKT.format;if(!format){format=new OpenLayers.Format.WKT();OpenLayers.Geometry.fromWKT.format=format;}
var result=format.read(wkt);if(result instanceof OpenLayers.Feature.Vector){geom=result.geometry;}else if(OpenLayers.Util.isArray(result)){var len=result.length;var components=new Array(len);for(var i=0;i<len;++i){components[i]=result[i].geometry;}
geom=new OpenLayers.Geometry.Collection(components);}}
return geom;};OpenLayers.Geometry.segmentsIntersect=function(seg1,seg2,options){var point=options&&options.point;var tolerance=options&&options.tolerance;var intersection=false;var x11_21=seg1.x1-seg2.x1;var y11_21=seg1.y1-seg2.y1;var x12_11=seg1.x2-seg1.x1;var y12_11=seg1.y2-seg1.y1;var y22_21=seg2.y2-seg2.y1;var x22_21=seg2.x2-seg2.x1;var d=(y22_21*x12_11)-(x22_21*y12_11);var n1=(x22_21*y11_21)-(y22_21*x11_21);var n2=(x12_11*y11_21)-(y12_11*x11_21);if(d==0){if(n1==0&&n2==0){intersection=true;}}else{var along1=n1/d;var along2=n2/d;if(along1>=0&&along1<=1&&along2>=0&&along2<=1){if(!point){intersection=true;}else{var x=seg1.x1+(along1*x12_11);var y=seg1.y1+(along1*y12_11);intersection=new OpenLayers.Geometry.Point(x,y);}}}
if(tolerance){var dist;if(intersection){if(point){var segs=[seg1,seg2];var seg,x,y;outer:for(var i=0;i<2;++i){seg=segs[i];for(var j=1;j<3;++j){x=seg["x"+j];y=seg["y"+j];dist=Math.sqrt(Math.pow(x-intersection.x,2)+
Math.pow(y-intersection.y,2));if(dist<tolerance){intersection.x=x;intersection.y=y;break outer;}}}}}else{var segs=[seg1,seg2];var source,target,x,y,p,result;outer:for(var i=0;i<2;++i){source=segs[i];target=segs[(i+1)%2];for(var j=1;j<3;++j){p={x:source["x"+j],y:source["y"+j]};result=OpenLayers.Geometry.distanceToSegment(p,target);if(result.distance<tolerance){if(point){intersection=new OpenLayers.Geometry.Point(p.x,p.y);}else{intersection=true;}
break outer;}}}}}
return intersection;};OpenLayers.Geometry.distanceToSegment=function(point,segment){var result=OpenLayers.Geometry.distanceSquaredToSegment(point,segment);result.distance=Math.sqrt(result.distance);return result;};OpenLayers.Geometry.distanceSquaredToSegment=function(point,segment){var x0=point.x;var y0=point.y;var x1=segment.x1;var y1=segment.y1;var x2=segment.x2;var y2=segment.y2;var dx=x2-x1;var dy=y2-y1;var along=(dx==0&&dy==0)?0:((dx*(x0-x1))+(dy*(y0-y1)))/(Math.pow(dx,2)+Math.pow(dy,2));var x,y;if(along<=0.0){x=x1;y=y1;}else if(along>=1.0){x=x2;y=y2;}else{x=x1+along*dx;y=y1+along*dy;}
return{distance:Math.pow(x-x0,2)+Math.pow(y-y0,2),x:x,y:y,along:along};};OpenLayers.Event={observers:false,KEY_SPACE:32,KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,element:function(event){return event.target||event.srcElement;},isSingleTouch:function(event){return event.touches&&event.touches.length==1;},isMultiTouch:function(event){return event.touches&&event.touches.length>1;},isTouchEvent:function(evt){return(""+evt.type).indexOf("touch")===0||("pointerType"in evt&&(evt.pointerType===evt.MSPOINTER_TYPE_MOUSE||evt.pointerType==="touch"));},isLeftClick:function(event){return(((event.which)&&(event.which==1))||((event.button)&&(event.button==1)));},isRightClick:function(event){return(((event.which)&&(event.which==3))||((event.button)&&(event.button==2)));},stop:function(event,allowDefault){if(!allowDefault){OpenLayers.Event.preventDefault(event);}
if(event.stopPropagation){event.stopPropagation();}else{event.cancelBubble=true;}},preventDefault:function(event){if(event.preventDefault){event.preventDefault();}else{event.returnValue=false;}},findElement:function(event,tagName){var element=OpenLayers.Event.element(event);while(element.parentNode&&(!element.tagName||(element.tagName.toUpperCase()!=tagName.toUpperCase()))){element=element.parentNode;}
return element;},observe:function(elementParam,name,observer,useCapture){var element=OpenLayers.Util.getElement(elementParam);useCapture=useCapture||false;if(name=='keypress'&&(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||element.attachEvent)){name='keydown';}
if(!this.observers){this.observers={};}
if(!element._eventCacheID){var idPrefix="eventCacheID_";if(element.id){idPrefix=element.id+"_"+idPrefix;}
element._eventCacheID=OpenLayers.Util.createUniqueID(idPrefix);}
var cacheID=element._eventCacheID;if(!this.observers[cacheID]){this.observers[cacheID]=[];}
this.observers[cacheID].push({'element':element,'name':name,'observer':observer,'useCapture':useCapture});if(element.addEventListener){element.addEventListener(name,observer,useCapture);}else if(element.attachEvent){element.attachEvent('on'+name,observer);}},stopObservingElement:function(elementParam){var element=OpenLayers.Util.getElement(elementParam);var cacheID=element._eventCacheID;this._removeElementObservers(OpenLayers.Event.observers[cacheID]);},_removeElementObservers:function(elementObservers){if(elementObservers){for(var i=elementObservers.length-1;i>=0;i--){var entry=elementObservers[i];OpenLayers.Event.stopObserving.apply(this,[entry.element,entry.name,entry.observer,entry.useCapture]);}}},stopObserving:function(elementParam,name,observer,useCapture){useCapture=useCapture||false;var element=OpenLayers.Util.getElement(elementParam);var cacheID=element._eventCacheID;if(name=='keypress'){if(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||element.detachEvent){name='keydown';}}
var foundEntry=false;var elementObservers=OpenLayers.Event.observers[cacheID];if(elementObservers){var i=0;while(!foundEntry&&i<elementObservers.length){var cacheEntry=elementObservers[i];if((cacheEntry.name==name)&&(cacheEntry.observer==observer)&&(cacheEntry.useCapture==useCapture)){elementObservers.splice(i,1);if(elementObservers.length==0){delete OpenLayers.Event.observers[cacheID];}
foundEntry=true;break;}
i++;}}
if(foundEntry){if(element.removeEventListener){element.removeEventListener(name,observer,useCapture);}else if(element&&element.detachEvent){element.detachEvent('on'+name,observer);}}
return foundEntry;},unloadCache:function(){if(OpenLayers.Event&&OpenLayers.Event.observers){for(var cacheID in OpenLayers.Event.observers){var elementObservers=OpenLayers.Event.observers[cacheID];OpenLayers.Event._removeElementObservers.apply(this,[elementObservers]);}
OpenLayers.Event.observers=false;}},CLASS_NAME:"OpenLayers.Event"};OpenLayers.Event.observe(window,'unload',OpenLayers.Event.unloadCache,false);OpenLayers.Events=OpenLayers.Class({BROWSER_EVENTS:["mouseover","mouseout","mousedown","mouseup","mousemove","click","dblclick","rightclick","dblrightclick","resize","focus","blur","touchstart","touchmove","touchend","keydown"],TOUCH_MODEL_POINTER:"pointer",TOUCH_MODEL_MSPOINTER:"MSPointer",TOUCH_MODEL_TOUCH:"touch",listeners:null,object:null,element:null,eventHandler:null,fallThrough:null,includeXY:false,extensions:null,extensionCount:null,clearMouseListener:null,initialize:function(object,element,eventTypes,fallThrough,options){OpenLayers.Util.extend(this,options);this.object=object;this.fallThrough=fallThrough;this.listeners={};this.extensions={};this.extensionCount={};this._pointerTouches=[];if(element!=null){this.attachToElement(element);}},destroy:function(){for(var e in this.extensions){if(typeof this.extensions[e]!=="boolean"){this.extensions[e].destroy();}}
this.extensions=null;if(this.element){OpenLayers.Event.stopObservingElement(this.element);if(this.element.hasScrollEvent){OpenLayers.Event.stopObserving(window,"scroll",this.clearMouseListener);}}
this.element=null;this.listeners=null;this.object=null;this.fallThrough=null;this.eventHandler=null;},addEventType:function(eventName){},attachToElement:function(element){if(this.element){OpenLayers.Event.stopObservingElement(this.element);}else{this.eventHandler=OpenLayers.Function.bindAsEventListener(this.handleBrowserEvent,this);this.clearMouseListener=OpenLayers.Function.bind(this.clearMouseCache,this);}
this.element=element;var touchModel=this.getTouchModel();var type;for(var i=0,len=this.BROWSER_EVENTS.length;i<len;i++){type=this.BROWSER_EVENTS[i];OpenLayers.Event.observe(element,type,this.eventHandler);if((touchModel===this.TOUCH_MODEL_POINTER||touchModel===this.TOUCH_MODEL_MSPOINTER)&&type.indexOf('touch')===0){this.addPointerTouchListener(element,type,this.eventHandler);}}
OpenLayers.Event.observe(element,"dragstart",OpenLayers.Event.stop);},on:function(object){for(var type in object){if(type!="scope"&&object.hasOwnProperty(type)){this.register(type,object.scope,object[type]);}}},register:function(type,obj,func,priority){if(type in OpenLayers.Events&&!this.extensions[type]){this.extensions[type]=new OpenLayers.Events[type](this);}
if(func!=null){if(obj==null){obj=this.object;}
var listeners=this.listeners[type];if(!listeners){listeners=[];this.listeners[type]=listeners;this.extensionCount[type]=0;}
var listener={obj:obj,func:func};if(priority){listeners.splice(this.extensionCount[type],0,listener);if(typeof priority==="object"&&priority.extension){this.extensionCount[type]++;}}else{listeners.push(listener);}}},registerPriority:function(type,obj,func){this.register(type,obj,func,true);},un:function(object){for(var type in object){if(type!="scope"&&object.hasOwnProperty(type)){this.unregister(type,object.scope,object[type]);}}},unregister:function(type,obj,func){if(obj==null){obj=this.object;}
var listeners=this.listeners[type];if(listeners!=null){for(var i=0,len=listeners.length;i<len;i++){if(listeners[i].obj==obj&&listeners[i].func==func){listeners.splice(i,1);break;}}}},remove:function(type){if(this.listeners[type]!=null){this.listeners[type]=[];}},triggerEvent:function(type,evt){var listeners=this.listeners[type];if(!listeners||listeners.length==0){return undefined;}
if(evt==null){evt={};}
evt.object=this.object;evt.element=this.element;if(!evt.type){evt.type=type;}
listeners=listeners.slice();var continueChain;for(var i=0,len=listeners.length;i<len;i++){var callback=listeners[i];continueChain=callback.func.apply(callback.obj,[evt]);if((continueChain!=undefined)&&(continueChain==false)){break;}}
if(!this.fallThrough){OpenLayers.Event.stop(evt,true);}
return continueChain;},handleBrowserEvent:function(evt){var type=evt.type,listeners=this.listeners[type];if(!listeners||listeners.length==0){return;}
var touches=evt.touches;if(touches&&touches[0]){var x=0;var y=0;var num=touches.length;var touch;for(var i=0;i<num;++i){touch=this.getTouchClientXY(touches[i]);x+=touch.clientX;y+=touch.clientY;}
evt.clientX=x/num;evt.clientY=y/num;}
if(this.includeXY){evt.xy=this.getMousePosition(evt);}
this.triggerEvent(type,evt);},getTouchClientXY:function(evt){var win=window.olMockWin||window,winPageX=win.pageXOffset,winPageY=win.pageYOffset,x=evt.clientX,y=evt.clientY;if(evt.pageY===0&&Math.floor(y)>Math.floor(evt.pageY)||evt.pageX===0&&Math.floor(x)>Math.floor(evt.pageX)){x=x-winPageX;y=y-winPageY;}else if(y<(evt.pageY-winPageY)||x<(evt.pageX-winPageX)){x=evt.pageX-winPageX;y=evt.pageY-winPageY;}
evt.olClientX=x;evt.olClientY=y;return{clientX:x,clientY:y};},clearMouseCache:function(){this.element.scrolls=null;this.element.lefttop=null;this.element.offsets=null;},getMousePosition:function(evt){if(!this.includeXY){this.clearMouseCache();}else if(!this.element.hasScrollEvent){OpenLayers.Event.observe(window,"scroll",this.clearMouseListener);this.element.hasScrollEvent=true;}
if(!this.element.scrolls){var viewportElement=OpenLayers.Util.getViewportElement();this.element.scrolls=[window.pageXOffset||viewportElement.scrollLeft,window.pageYOffset||viewportElement.scrollTop];}
if(!this.element.lefttop){this.element.lefttop=[(document.documentElement.clientLeft||0),(document.documentElement.clientTop||0)];}
if(!this.element.offsets){this.element.offsets=OpenLayers.Util.pagePosition(this.element);}
return new OpenLayers.Pixel((evt.clientX+this.element.scrolls[0])-this.element.offsets[0]
-this.element.lefttop[0],(evt.clientY+this.element.scrolls[1])-this.element.offsets[1]
-this.element.lefttop[1]);},getTouchModel:function(){if(!("_TOUCH_MODEL"in OpenLayers.Events)){OpenLayers.Events._TOUCH_MODEL=(window.PointerEvent&&"pointer")||(window.MSPointerEvent&&"MSPointer")||(("ontouchdown"in document)&&"touch")||null;}
return OpenLayers.Events._TOUCH_MODEL;},addPointerTouchListener:function(element,type,handler){var eventHandler=this.eventHandler;var touches=this._pointerTouches;function pointerHandler(evt){handler(OpenLayers.Util.applyDefaults({stopPropagation:function(){for(var i=touches.length-1;i>=0;--i){touches[i].stopPropagation();}},preventDefault:function(){for(var i=touches.length-1;i>=0;--i){touches[i].preventDefault();}},type:type},evt));}
switch(type){case'touchstart':return this.addPointerTouchListenerStart(element,type,pointerHandler);case'touchend':return this.addPointerTouchListenerEnd(element,type,pointerHandler);case'touchmove':return this.addPointerTouchListenerMove(element,type,pointerHandler);default:throw'Unknown touch event type';}},addPointerTouchListenerStart:function(element,type,handler){var touches=this._pointerTouches;var cb=function(e){if(!OpenLayers.Event.isTouchEvent(e)){return;}
var alreadyInArray=false;for(var i=0,ii=touches.length;i<ii;++i){if(touches[i].pointerId==e.pointerId){alreadyInArray=true;break;}}
if(!alreadyInArray){touches.push(e);}
e.touches=touches.slice();handler(e);};OpenLayers.Event.observe(element,this.getTouchModel()===this.TOUCH_MODEL_MSPOINTER?'MSPointerDown':'pointerdown',cb);var internalCb=function(e){if(!OpenLayers.Event.isTouchEvent(e)){return;}
var up=false;for(var i=0,ii=touches.length;i<ii;++i){if(touches[i].pointerId==e.pointerId){if(this.clientWidth!=0&&this.clientHeight!=0){if((Math.ceil(e.clientX)>=this.clientWidth||Math.ceil(e.clientY)>=this.clientHeight)){touches.splice(i,1);}}
break;}}};OpenLayers.Event.observe(element,this.getTouchModel()===this.TOUCH_MODEL_MSPOINTER?'MSPointerOut':'pointerout',internalCb);},addPointerTouchListenerMove:function(element,type,handler){var touches=this._pointerTouches;var cb=function(e){if(!OpenLayers.Event.isTouchEvent(e)){return;}
if(touches.length==1&&touches[0].pageX==e.pageX&&touches[0].pageY==e.pageY){return;}
for(var i=0,ii=touches.length;i<ii;++i){if(touches[i].pointerId==e.pointerId){touches[i]=e;break;}}
e.touches=touches.slice();handler(e);};OpenLayers.Event.observe(element,this.getTouchModel()===this.TOUCH_MODEL_MSPOINTER?'MSPointerMove':'pointermove',cb);},addPointerTouchListenerEnd:function(element,type,handler){var touches=this._pointerTouches;var cb=function(e){if(!OpenLayers.Event.isTouchEvent(e)){return;}
for(var i=0,ii=touches.length;i<ii;++i){if(touches[i].pointerId==e.pointerId){touches.splice(i,1);break;}}
e.touches=touches.slice();handler(e);};OpenLayers.Event.observe(element,this.getTouchModel()===this.TOUCH_MODEL_MSPOINTER?'MSPointerUp':'pointerup',cb);},CLASS_NAME:"OpenLayers.Events"});OpenLayers.Events.buttonclick=OpenLayers.Class({target:null,events:['mousedown','mouseup','click','dblclick','touchstart','touchmove','touchend','keydown'],startRegEx:/^mousedown|touchstart$/,cancelRegEx:/^touchmove$/,completeRegEx:/^mouseup|touchend$/,isDeviceTouchCapable:'ontouchstart'in window||window.DocumentTouch&&document instanceof window.DocumentTouch,initialize:function(target){this.target=target;for(var i=this.events.length-1;i>=0;--i){this.target.register(this.events[i],this,this.buttonClick,{extension:true});}},destroy:function(){for(var i=this.events.length-1;i>=0;--i){this.target.unregister(this.events[i],this,this.buttonClick);}
delete this.target;},getPressedButton:function(element){var depth=3,button;do{if(OpenLayers.Element.hasClass(element,"olButton")){button=element;break;}
element=element.parentNode;}while(--depth>0&&element);return button;},ignore:function(element){var depth=3,ignore=false;do{if(element.nodeName.toLowerCase()==='a'){ignore=true;break;}
element=element.parentNode;}while(--depth>0&&element);return ignore;},buttonClick:function(evt){var propagate=true,element=OpenLayers.Event.element(evt);if(element&&(OpenLayers.Event.isLeftClick(evt)&&!this.isDeviceTouchCapable||!~evt.type.indexOf("mouse"))){var button=this.getPressedButton(element);if(button){if(evt.type==="keydown"){switch(evt.keyCode){case OpenLayers.Event.KEY_RETURN:case OpenLayers.Event.KEY_SPACE:this.target.triggerEvent("buttonclick",{buttonElement:button});OpenLayers.Event.stop(evt);propagate=false;break;}}else if(this.startEvt){if(this.completeRegEx.test(evt.type)){var pos=OpenLayers.Util.pagePosition(button);var viewportElement=OpenLayers.Util.getViewportElement();var scrollTop=window.pageYOffset||viewportElement.scrollTop;var scrollLeft=window.pageXOffset||viewportElement.scrollLeft;pos[0]=pos[0]-scrollLeft;pos[1]=pos[1]-scrollTop;this.target.triggerEvent("buttonclick",{buttonElement:button,buttonXY:{x:this.startEvt.clientX-pos[0],y:this.startEvt.clientY-pos[1]}});}
if(this.cancelRegEx.test(evt.type)){if(evt.touches&&this.startEvt.touches&&(Math.abs(evt.touches[0].olClientX-this.startEvt.touches[0].olClientX)>4||Math.abs(evt.touches[0].olClientY-this.startEvt.touches[0].olClientY))>4){delete this.startEvt;}}
OpenLayers.Event.stop(evt);propagate=false;}
if(this.startRegEx.test(evt.type)){this.startEvt=evt;OpenLayers.Event.stop(evt);propagate=false;}}else{propagate=!this.ignore(OpenLayers.Event.element(evt));delete this.startEvt;}}
return propagate;}});OpenLayers.Projection=OpenLayers.Class({proj:null,projCode:null,titleRegEx:/\+title=[^\+]*/,initialize:function(projCode,options){OpenLayers.Util.extend(this,options);this.projCode=projCode;if(typeof Proj4js=="object"){this.proj=new Proj4js.Proj(projCode);}},getCode:function(){return this.proj?this.proj.srsCode:this.projCode;},getUnits:function(){return this.proj?this.proj.units:null;},toString:function(){return this.getCode();},equals:function(projection){var p=projection,equals=false;if(p){if(!(p instanceof OpenLayers.Projection)){p=new OpenLayers.Projection(p);}
if((typeof Proj4js=="object")&&this.proj.defData&&p.proj.defData){equals=this.proj.defData.replace(this.titleRegEx,"")==p.proj.defData.replace(this.titleRegEx,"");}else if(p.getCode){var source=this.getCode(),target=p.getCode();equals=source==target||!!OpenLayers.Projection.transforms[source]&&OpenLayers.Projection.transforms[source][target]===OpenLayers.Projection.nullTransform;}}
return equals;},destroy:function(){delete this.proj;delete this.projCode;},CLASS_NAME:"OpenLayers.Projection"});OpenLayers.Projection.transforms={};OpenLayers.Projection.defaults={"EPSG:4326":{units:"degrees",maxExtent:[-180,-90,180,90],worldExtent:[-180,-90,180,90],yx:true},"CRS:84":{units:"degrees",maxExtent:[-180,-90,180,90],worldExtent:[-180,-90,180,90]},"EPSG:900913":{units:"m",maxExtent:[-20037508.34,-20037508.34,20037508.34,20037508.34],worldExtent:[-180,-89,180,89]}};OpenLayers.Projection.addTransform=function(from,to,method){if(method===OpenLayers.Projection.nullTransform){var defaults=OpenLayers.Projection.defaults[from];if(defaults&&!OpenLayers.Projection.defaults[to]){OpenLayers.Projection.defaults[to]=defaults;}}
if(!OpenLayers.Projection.transforms[from]){OpenLayers.Projection.transforms[from]={};}
OpenLayers.Projection.transforms[from][to]=method;};OpenLayers.Projection.transform=function(point,source,dest){if(source&&dest){if(!(source instanceof OpenLayers.Projection)){source=new OpenLayers.Projection(source);}
if(!(dest instanceof OpenLayers.Projection)){dest=new OpenLayers.Projection(dest);}
if(source.proj&&dest.proj){point=Proj4js.transform(source.proj,dest.proj,point);}else{var sourceCode=source.getCode();var destCode=dest.getCode();var transforms=OpenLayers.Projection.transforms;if(transforms[sourceCode]&&transforms[sourceCode][destCode]){transforms[sourceCode][destCode](point);}}}
return point;};OpenLayers.Projection.nullTransform=function(point){return point;};(function(){var pole=20037508.34;function inverseMercator(xy){xy.x=180*xy.x/pole;xy.y=180/Math.PI*(2*Math.atan(Math.exp((xy.y/pole)*Math.PI))-Math.PI/2);return xy;}
function forwardMercator(xy){xy.x=xy.x*pole/180;var y=Math.log(Math.tan((90+xy.y)*Math.PI/360))/Math.PI*pole;xy.y=Math.max(-20037508.34,Math.min(y,20037508.34));return xy;}
function map(base,codes){var add=OpenLayers.Projection.addTransform;var same=OpenLayers.Projection.nullTransform;var i,len,code,other,j;for(i=0,len=codes.length;i<len;++i){code=codes[i];add(base,code,forwardMercator);add(code,base,inverseMercator);for(j=i+1;j<len;++j){other=codes[j];add(code,other,same);add(other,code,same);}}}
var mercator=["EPSG:900913","EPSG:3857","EPSG:102113","EPSG:102100","OSGEO:41001"],geographic=["CRS:84","urn:ogc:def:crs:EPSG:6.6:4326","EPSG:4326"],i;for(i=mercator.length-1;i>=0;--i){map(mercator[i],geographic);}
for(i=geographic.length-1;i>=0;--i){map(geographic[i],mercator);}})();OpenLayers.Map=OpenLayers.Class({Z_INDEX_BASE:{BaseLayer:100,Overlay:325,Feature:725,Popup:750,Control:1000},id:null,fractionalZoom:false,events:null,allOverlays:false,div:null,dragging:false,size:null,viewPortDiv:null,layerContainerOrigin:null,layerContainerDiv:null,layers:null,controls:null,popups:null,baseLayer:null,center:null,resolution:null,zoom:0,panRatio:1.5,options:null,tileSize:null,projection:"EPSG:4326",units:null,resolutions:null,maxResolution:null,minResolution:null,maxScale:null,minScale:null,maxExtent:null,minExtent:null,restrictedExtent:null,numZoomLevels:16,theme:null,displayProjection:null,fallThrough:false,autoUpdateSize:true,eventListeners:null,panTween:null,panMethod:OpenLayers.Easing.Expo.easeOut,panDuration:50,zoomTween:null,zoomMethod:OpenLayers.Easing.Quad.easeOut,zoomDuration:20,paddingForPopups:null,layerContainerOriginPx:null,minPx:null,maxPx:null,initialize:function(div,options){var isDOMElement=OpenLayers.Util.isElement(div);if(arguments.length===1&&typeof div==="object"&&!isDOMElement){options=div;div=options&&options.div;}
this.tileSize=new OpenLayers.Size(OpenLayers.Map.TILE_WIDTH,OpenLayers.Map.TILE_HEIGHT);this.paddingForPopups=new OpenLayers.Bounds(15,15,15,15);this.theme=OpenLayers._getScriptLocation()+'theme/default/style.css';this.options=OpenLayers.Util.extend({},options);OpenLayers.Util.extend(this,options);var projCode=this.projection instanceof OpenLayers.Projection?this.projection.projCode:this.projection;OpenLayers.Util.applyDefaults(this,OpenLayers.Projection.defaults[projCode]);if(this.maxExtent&&!(this.maxExtent instanceof OpenLayers.Bounds)){this.maxExtent=new OpenLayers.Bounds(this.maxExtent);}
if(this.minExtent&&!(this.minExtent instanceof OpenLayers.Bounds)){this.minExtent=new OpenLayers.Bounds(this.minExtent);}
if(this.restrictedExtent&&!(this.restrictedExtent instanceof OpenLayers.Bounds)){this.restrictedExtent=new OpenLayers.Bounds(this.restrictedExtent);}
if(this.center&&!(this.center instanceof OpenLayers.LonLat)){this.center=new OpenLayers.LonLat(this.center);}
this.layers=[];this.id=OpenLayers.Util.createUniqueID("OpenLayers.Map_");this.div=OpenLayers.Util.getElement(div);if(!this.div){this.div=document.createElement("div");this.div.style.height="1px";this.div.style.width="1px";}
OpenLayers.Element.addClass(this.div,'olMap');var id=this.id+"_OpenLayers_ViewPort";this.viewPortDiv=OpenLayers.Util.createDiv(id,null,null,null,"relative",null,"hidden");this.viewPortDiv.style.width="100%";this.viewPortDiv.style.height="100%";this.viewPortDiv.className="olMapViewport";this.div.appendChild(this.viewPortDiv);this.events=new OpenLayers.Events(this,this.viewPortDiv,null,this.fallThrough,{includeXY:true});if(OpenLayers.TileManager&&this.tileManager!==null){if(!(this.tileManager instanceof OpenLayers.TileManager)){this.tileManager=new OpenLayers.TileManager(this.tileManager);}
this.tileManager.addMap(this);}
id=this.id+"_OpenLayers_Container";this.layerContainerDiv=OpenLayers.Util.createDiv(id);this.layerContainerDiv.style.zIndex=this.Z_INDEX_BASE['Popup']-1;this.layerContainerOriginPx={x:0,y:0};this.applyTransform();this.viewPortDiv.appendChild(this.layerContainerDiv);this.updateSize();if(this.eventListeners instanceof Object){this.events.on(this.eventListeners);}
if(this.autoUpdateSize===true){this.updateSizeDestroy=OpenLayers.Function.bind(this.updateSize,this);OpenLayers.Event.observe(window,'resize',this.updateSizeDestroy);}
if(this.theme){var addNode=true;var nodes=document.getElementsByTagName('link');for(var i=0,len=nodes.length;i<len;++i){if(OpenLayers.Util.isEquivalentUrl(nodes.item(i).href,this.theme)){addNode=false;break;}}
if(addNode){var cssNode=document.createElement('link');cssNode.setAttribute('rel','stylesheet');cssNode.setAttribute('type','text/css');cssNode.setAttribute('href',this.theme);document.getElementsByTagName('head')[0].appendChild(cssNode);}}
if(this.controls==null){this.controls=[];if(OpenLayers.Control!=null){if(OpenLayers.Control.Navigation){this.controls.push(new OpenLayers.Control.Navigation());}else if(OpenLayers.Control.TouchNavigation){this.controls.push(new OpenLayers.Control.TouchNavigation());}
if(OpenLayers.Control.Zoom){this.controls.push(new OpenLayers.Control.Zoom());}else if(OpenLayers.Control.PanZoom){this.controls.push(new OpenLayers.Control.PanZoom());}
if(OpenLayers.Control.ArgParser){this.controls.push(new OpenLayers.Control.ArgParser());}
if(OpenLayers.Control.Attribution){this.controls.push(new OpenLayers.Control.Attribution());}}}
for(var i=0,len=this.controls.length;i<len;i++){this.addControlToMap(this.controls[i]);}
this.popups=[];this.unloadDestroy=OpenLayers.Function.bind(this.destroy,this);OpenLayers.Event.observe(window,'unload',this.unloadDestroy);if(options&&options.layers){delete this.center;delete this.zoom;this.addLayers(options.layers);if(options.center&&!this.getCenter()){this.setCenter(options.center,options.zoom);}}
if(this.panMethod){this.panTween=new OpenLayers.Tween(this.panMethod);}
if(this.zoomMethod&&this.applyTransform.transform){this.zoomTween=new OpenLayers.Tween(this.zoomMethod);}},getViewport:function(){return this.viewPortDiv;},render:function(div){this.div=OpenLayers.Util.getElement(div);OpenLayers.Element.addClass(this.div,'olMap');this.viewPortDiv.parentNode.removeChild(this.viewPortDiv);this.div.appendChild(this.viewPortDiv);this.updateSize();},unloadDestroy:null,updateSizeDestroy:null,destroy:function(){if(!this.unloadDestroy){return false;}
if(this.panTween){this.panTween.stop();this.panTween=null;}
if(this.zoomTween){this.zoomTween.stop();this.zoomTween=null;}
OpenLayers.Event.stopObserving(window,'unload',this.unloadDestroy);this.unloadDestroy=null;if(this.updateSizeDestroy){OpenLayers.Event.stopObserving(window,'resize',this.updateSizeDestroy);}
this.paddingForPopups=null;if(this.controls!=null){for(var i=this.controls.length-1;i>=0;--i){this.controls[i].destroy();}
this.controls=null;}
if(this.layers!=null){for(var i=this.layers.length-1;i>=0;--i){this.layers[i].destroy(false);}
this.layers=null;}
if(this.viewPortDiv&&this.viewPortDiv.parentNode){this.viewPortDiv.parentNode.removeChild(this.viewPortDiv);}
this.viewPortDiv=null;if(this.tileManager){this.tileManager.removeMap(this);this.tileManager=null;}
if(this.eventListeners){this.events.un(this.eventListeners);this.eventListeners=null;}
this.events.destroy();this.events=null;this.options=null;},setOptions:function(options){var updatePxExtent=this.minPx&&options.restrictedExtent!=this.restrictedExtent;OpenLayers.Util.extend(this,options);updatePxExtent&&this.moveTo(this.getCachedCenter(),this.zoom,{forceZoomChange:true});},getTileSize:function(){return this.tileSize;},getBy:function(array,property,match){var test=(typeof match.test=="function");var found=OpenLayers.Array.filter(this[array],function(item){return item[property]==match||(test&&match.test(item[property]));});return found;},getLayersBy:function(property,match){return this.getBy("layers",property,match);},getLayersByName:function(match){return this.getLayersBy("name",match);},getLayersByClass:function(match){return this.getLayersBy("CLASS_NAME",match);},getControlsBy:function(property,match){return this.getBy("controls",property,match);},getControlsByClass:function(match){return this.getControlsBy("CLASS_NAME",match);},getLayer:function(id){var foundLayer=null;for(var i=0,len=this.layers.length;i<len;i++){var layer=this.layers[i];if(layer.id==id){foundLayer=layer;break;}}
return foundLayer;},setLayerZIndex:function(layer,zIdx){layer.setZIndex(this.Z_INDEX_BASE[layer.isBaseLayer?'BaseLayer':'Overlay']
+zIdx*5);},resetLayersZIndex:function(){for(var i=0,len=this.layers.length;i<len;i++){var layer=this.layers[i];this.setLayerZIndex(layer,i);}},addLayer:function(layer){for(var i=0,len=this.layers.length;i<len;i++){if(this.layers[i]==layer){return false;}}
if(this.events.triggerEvent("preaddlayer",{layer:layer})===false){return false;}
if(this.allOverlays){layer.isBaseLayer=false;}
layer.div.className="olLayerDiv";layer.div.style.overflow="";this.setLayerZIndex(layer,this.layers.length);if(layer.isFixed){this.viewPortDiv.appendChild(layer.div);}else{this.layerContainerDiv.appendChild(layer.div);}
this.layers.push(layer);layer.setMap(this);if(layer.isBaseLayer||(this.allOverlays&&!this.baseLayer)){if(this.baseLayer==null){this.setBaseLayer(layer);}else{layer.setVisibility(false);}}else{layer.redraw();}
this.events.triggerEvent("addlayer",{layer:layer});layer.events.triggerEvent("added",{map:this,layer:layer});layer.afterAdd();return true;},addLayers:function(layers){for(var i=0,len=layers.length;i<len;i++){this.addLayer(layers[i]);}},removeLayer:function(layer,setNewBaseLayer){if(this.events.triggerEvent("preremovelayer",{layer:layer})===false){return;}
if(setNewBaseLayer==null){setNewBaseLayer=true;}
if(layer.isFixed){this.viewPortDiv.removeChild(layer.div);}else{this.layerContainerDiv.removeChild(layer.div);}
OpenLayers.Util.removeItem(this.layers,layer);layer.removeMap(this);layer.map=null;if(this.baseLayer==layer){this.baseLayer=null;if(setNewBaseLayer){for(var i=0,len=this.layers.length;i<len;i++){var iLayer=this.layers[i];if(iLayer.isBaseLayer||this.allOverlays){this.setBaseLayer(iLayer);break;}}}}
this.resetLayersZIndex();this.events.triggerEvent("removelayer",{layer:layer});layer.events.triggerEvent("removed",{map:this,layer:layer});},getNumLayers:function(){return this.layers.length;},getLayerIndex:function(layer){return OpenLayers.Util.indexOf(this.layers,layer);},setLayerIndex:function(layer,idx){var base=this.getLayerIndex(layer);if(idx<0){idx=0;}else if(idx>this.layers.length){idx=this.layers.length;}
if(base!=idx){this.layers.splice(base,1);this.layers.splice(idx,0,layer);for(var i=0,len=this.layers.length;i<len;i++){this.setLayerZIndex(this.layers[i],i);}
this.events.triggerEvent("changelayer",{layer:layer,property:"order"});if(this.allOverlays){if(idx===0){this.setBaseLayer(layer);}else if(this.baseLayer!==this.layers[0]){this.setBaseLayer(this.layers[0]);}}}},raiseLayer:function(layer,delta){var idx=this.getLayerIndex(layer)+delta;this.setLayerIndex(layer,idx);},setBaseLayer:function(newBaseLayer){if(newBaseLayer!=this.baseLayer){if(OpenLayers.Util.indexOf(this.layers,newBaseLayer)!=-1){var center=this.getCachedCenter();var oldResolution=this.getResolution();var newResolution=OpenLayers.Util.getResolutionFromScale(this.getScale(),newBaseLayer.units);if(this.baseLayer!=null&&!this.allOverlays){this.baseLayer.setVisibility(false);}
this.baseLayer=newBaseLayer;if(!this.allOverlays||this.baseLayer.visibility){this.baseLayer.setVisibility(true);if(this.baseLayer.inRange===false){this.baseLayer.redraw();}}
if(center!=null){var newZoom=this.getZoomForResolution(newResolution||this.resolution,true);this.setCenter(center,newZoom,false,oldResolution!=newResolution);}
this.events.triggerEvent("changebaselayer",{layer:this.baseLayer});}}},addControl:function(control,px){this.controls.push(control);this.addControlToMap(control,px);},addControls:function(controls,pixels){var pxs=(arguments.length===1)?[]:pixels;for(var i=0,len=controls.length;i<len;i++){var ctrl=controls[i];var px=(pxs[i])?pxs[i]:null;this.addControl(ctrl,px);}},addControlToMap:function(control,px){control.outsideViewport=(control.div!=null);if(this.displayProjection&&!control.displayProjection){control.displayProjection=this.displayProjection;}
control.setMap(this);var div=control.draw(px);if(div){if(!control.outsideViewport){div.style.zIndex=this.Z_INDEX_BASE['Control']+
this.controls.length;this.viewPortDiv.appendChild(div);}}
if(control.autoActivate){control.activate();}},getControl:function(id){var returnControl=null;for(var i=0,len=this.controls.length;i<len;i++){var control=this.controls[i];if(control.id==id){returnControl=control;break;}}
return returnControl;},removeControl:function(control){if((control)&&(control==this.getControl(control.id))){if(control.div&&(control.div.parentNode==this.viewPortDiv)){this.viewPortDiv.removeChild(control.div);}
OpenLayers.Util.removeItem(this.controls,control);}},addPopup:function(popup,exclusive){if(exclusive){for(var i=this.popups.length-1;i>=0;--i){this.removePopup(this.popups[i]);}}
popup.map=this;this.popups.push(popup);var popupDiv=popup.draw();if(popupDiv){popupDiv.style.zIndex=this.Z_INDEX_BASE['Popup']+
this.popups.length;this.layerContainerDiv.appendChild(popupDiv);}},removePopup:function(popup){OpenLayers.Util.removeItem(this.popups,popup);if(popup.div){try{this.layerContainerDiv.removeChild(popup.div);}
catch(e){}}
popup.map=null;},getSize:function(){var size=null;if(this.size!=null){size=this.size.clone();}
return size;},updateSize:function(){var newSize=this.getCurrentSize();if(newSize&&!isNaN(newSize.h)&&!isNaN(newSize.w)){this.events.clearMouseCache();var oldSize=this.getSize();if(oldSize==null){this.size=oldSize=newSize;}
if(!newSize.equals(oldSize)){this.size=newSize;for(var i=0,len=this.layers.length;i<len;i++){this.layers[i].onMapResize();}
var center=this.getCachedCenter();if(this.baseLayer!=null&&center!=null){var zoom=this.getZoom();this.zoom=null;this.setCenter(center,zoom);}}}
this.events.triggerEvent("updatesize");},getCurrentSize:function(){var size=new OpenLayers.Size(this.div.clientWidth,this.div.clientHeight);if(size.w==0&&size.h==0||isNaN(size.w)&&isNaN(size.h)){size.w=this.div.offsetWidth;size.h=this.div.offsetHeight;}
if(size.w==0&&size.h==0||isNaN(size.w)&&isNaN(size.h)){size.w=parseInt(this.div.style.width);size.h=parseInt(this.div.style.height);}
return size;},calculateBounds:function(center,resolution){var extent=null;if(center==null){center=this.getCachedCenter();}
if(resolution==null){resolution=this.getResolution();}
if((center!=null)&&(resolution!=null)){var halfWDeg=(this.size.w*resolution)/2;var halfHDeg=(this.size.h*resolution)/2;extent=new OpenLayers.Bounds(center.lon-halfWDeg,center.lat-halfHDeg,center.lon+halfWDeg,center.lat+halfHDeg);}
return extent;},getCenter:function(){var center=null;var cachedCenter=this.getCachedCenter();if(cachedCenter){center=cachedCenter.clone();}
return center;},getCachedCenter:function(){if(!this.center&&this.size){this.center=this.getLonLatFromViewPortPx({x:this.size.w/2,y:this.size.h/2});}
return this.center;},getZoom:function(){return this.zoom;},pan:function(dx,dy,options){options=OpenLayers.Util.applyDefaults(options,{animate:true,dragging:false});if(options.dragging){if(dx!=0||dy!=0){this.moveByPx(dx,dy);}}else{var centerPx=this.getViewPortPxFromLonLat(this.getCachedCenter());var newCenterPx=centerPx.add(dx,dy);if(this.dragging||!newCenterPx.equals(centerPx)){var newCenterLonLat=this.getLonLatFromViewPortPx(newCenterPx);if(options.animate){this.panTo(newCenterLonLat);}else{this.moveTo(newCenterLonLat);if(this.dragging){this.dragging=false;this.events.triggerEvent("moveend");}}}}},panTo:function(lonlat){if(this.panTween&&this.getExtent().scale(this.panRatio).containsLonLat(lonlat)){var center=this.getCachedCenter();if(lonlat.equals(center)){return;}
var from=this.getPixelFromLonLat(center);var to=this.getPixelFromLonLat(lonlat);var vector={x:to.x-from.x,y:to.y-from.y};var last={x:0,y:0};this.panTween.start({x:0,y:0},vector,this.panDuration,{callbacks:{eachStep:OpenLayers.Function.bind(function(px){var x=px.x-last.x,y=px.y-last.y;this.moveByPx(x,y);last.x=Math.round(px.x);last.y=Math.round(px.y);},this),done:OpenLayers.Function.bind(function(px){this.moveTo(lonlat);this.dragging=false;this.events.triggerEvent("moveend");},this)}});}else{this.setCenter(lonlat);}},setCenter:function(lonlat,zoom,dragging,forceZoomChange){if(this.panTween){this.panTween.stop();}
if(this.zoomTween){this.zoomTween.stop();}
this.moveTo(lonlat,zoom,{'dragging':dragging,'forceZoomChange':forceZoomChange});},moveByPx:function(dx,dy){var hw=this.size.w/2;var hh=this.size.h/2;var x=hw+dx;var y=hh+dy;var wrapDateLine=this.baseLayer.wrapDateLine;var xRestriction=0;var yRestriction=0;if(this.restrictedExtent){xRestriction=hw;yRestriction=hh;wrapDateLine=false;}
dx=wrapDateLine||x<=this.maxPx.x-xRestriction&&x>=this.minPx.x+xRestriction?Math.round(dx):0;dy=y<=this.maxPx.y-yRestriction&&y>=this.minPx.y+yRestriction?Math.round(dy):0;if(dx||dy){if(!this.dragging){this.dragging=true;this.events.triggerEvent("movestart");}
this.center=null;if(dx){this.layerContainerOriginPx.x-=dx;this.minPx.x-=dx;this.maxPx.x-=dx;}
if(dy){this.layerContainerOriginPx.y-=dy;this.minPx.y-=dy;this.maxPx.y-=dy;}
this.applyTransform();var layer,i,len;for(i=0,len=this.layers.length;i<len;++i){layer=this.layers[i];if(layer.visibility&&(layer===this.baseLayer||layer.inRange)){layer.moveByPx(dx,dy);layer.events.triggerEvent("move");}}
this.events.triggerEvent("move");}},adjustZoom:function(zoom){if(this.baseLayer&&this.baseLayer.wrapDateLine){var resolution,resolutions=this.baseLayer.resolutions,maxResolution=this.getMaxExtent().getWidth()/this.size.w;if(this.getResolutionForZoom(zoom)>maxResolution){if(this.fractionalZoom){zoom=this.getZoomForResolution(maxResolution);}else{for(var i=zoom|0,ii=resolutions.length;i<ii;++i){if(resolutions[i]<=maxResolution){zoom=i;break;}}}}}
return zoom;},getMinZoom:function(){return this.adjustZoom(0);},moveTo:function(lonlat,zoom,options){if(lonlat!=null&&!(lonlat instanceof OpenLayers.LonLat)){lonlat=new OpenLayers.LonLat(lonlat);}
if(!options){options={};}
if(zoom!=null){zoom=parseFloat(zoom);if(!this.fractionalZoom){zoom=Math.round(zoom);}}
var requestedZoom=zoom;zoom=this.adjustZoom(zoom);if(zoom!==requestedZoom){lonlat=this.getCenter();}
var dragging=options.dragging||this.dragging;var forceZoomChange=options.forceZoomChange;if(!this.getCachedCenter()&&!this.isValidLonLat(lonlat)){lonlat=this.maxExtent.getCenterLonLat();this.center=lonlat.clone();}
if(this.restrictedExtent!=null){if(lonlat==null){lonlat=this.center;}
if(zoom==null){zoom=this.getZoom();}
var resolution=this.getResolutionForZoom(zoom);var extent=this.calculateBounds(lonlat,resolution);if(!this.restrictedExtent.containsBounds(extent)){var maxCenter=this.restrictedExtent.getCenterLonLat();if(extent.getWidth()>this.restrictedExtent.getWidth()){lonlat=new OpenLayers.LonLat(maxCenter.lon,lonlat.lat);}else if(extent.left<this.restrictedExtent.left){lonlat=lonlat.add(this.restrictedExtent.left-
extent.left,0);}else if(extent.right>this.restrictedExtent.right){lonlat=lonlat.add(this.restrictedExtent.right-
extent.right,0);}
if(extent.getHeight()>this.restrictedExtent.getHeight()){lonlat=new OpenLayers.LonLat(lonlat.lon,maxCenter.lat);}else if(extent.bottom<this.restrictedExtent.bottom){lonlat=lonlat.add(0,this.restrictedExtent.bottom-
extent.bottom);}
else if(extent.top>this.restrictedExtent.top){lonlat=lonlat.add(0,this.restrictedExtent.top-
extent.top);}}}
var zoomChanged=forceZoomChange||((this.isValidZoomLevel(zoom))&&(zoom!=this.getZoom()));var centerChanged=(this.isValidLonLat(lonlat))&&(!lonlat.equals(this.center));if(zoomChanged||centerChanged||dragging){dragging||this.events.triggerEvent("movestart",{zoomChanged:zoomChanged});if(centerChanged){if(!zoomChanged&&this.center){this.centerLayerContainer(lonlat);}
this.center=lonlat.clone();}
var res=zoomChanged?this.getResolutionForZoom(zoom):this.getResolution();if(zoomChanged||this.layerContainerOrigin==null){this.layerContainerOrigin=this.getCachedCenter();this.layerContainerOriginPx.x=0;this.layerContainerOriginPx.y=0;this.applyTransform();var maxExtent=this.getMaxExtent({restricted:true});var maxExtentCenter=maxExtent.getCenterLonLat();var lonDelta=this.center.lon-maxExtentCenter.lon;var latDelta=maxExtentCenter.lat-this.center.lat;var extentWidth=Math.round(maxExtent.getWidth()/res);var extentHeight=Math.round(maxExtent.getHeight()/res);this.minPx={x:(this.size.w-extentWidth)/2-lonDelta/res,y:(this.size.h-extentHeight)/2-latDelta/res};this.maxPx={x:this.minPx.x+Math.round(maxExtent.getWidth()/res),y:this.minPx.y+Math.round(maxExtent.getHeight()/res)};}
if(zoomChanged){this.zoom=zoom;this.resolution=res;}
var bounds=this.getExtent();if(this.baseLayer.visibility){this.baseLayer.moveTo(bounds,zoomChanged,options.dragging);options.dragging||this.baseLayer.events.triggerEvent("moveend",{zoomChanged:zoomChanged});}
bounds=this.baseLayer.getExtent();for(var i=this.layers.length-1;i>=0;--i){var layer=this.layers[i];if(layer!==this.baseLayer&&!layer.isBaseLayer){var inRange=layer.calculateInRange();if(layer.inRange!=inRange){layer.inRange=inRange;if(!inRange){layer.display(false);}
this.events.triggerEvent("changelayer",{layer:layer,property:"visibility"});}
if(inRange&&layer.visibility){layer.moveTo(bounds,zoomChanged,options.dragging);options.dragging||layer.events.triggerEvent("moveend",{zoomChanged:zoomChanged});}}}
this.events.triggerEvent("move");dragging||this.events.triggerEvent("moveend");if(zoomChanged){for(var i=0,len=this.popups.length;i<len;i++){this.popups[i].updatePosition();}
this.events.triggerEvent("zoomend");}}},centerLayerContainer:function(lonlat){var originPx=this.getViewPortPxFromLonLat(this.layerContainerOrigin);var newPx=this.getViewPortPxFromLonLat(lonlat);if((originPx!=null)&&(newPx!=null)){var oldLeft=this.layerContainerOriginPx.x;var oldTop=this.layerContainerOriginPx.y;var newLeft=Math.round(originPx.x-newPx.x);var newTop=Math.round(originPx.y-newPx.y);this.applyTransform((this.layerContainerOriginPx.x=newLeft),(this.layerContainerOriginPx.y=newTop));var dx=oldLeft-newLeft;var dy=oldTop-newTop;this.minPx.x-=dx;this.maxPx.x-=dx;this.minPx.y-=dy;this.maxPx.y-=dy;}},isValidZoomLevel:function(zoomLevel){return((zoomLevel!=null)&&(zoomLevel>=0)&&(zoomLevel<this.getNumZoomLevels()));},isValidLonLat:function(lonlat){var valid=false;if(lonlat!=null){var maxExtent=this.getMaxExtent();var worldBounds=this.baseLayer.wrapDateLine&&maxExtent;valid=maxExtent.containsLonLat(lonlat,{worldBounds:worldBounds});}
return valid;},getProjection:function(){var projection=this.getProjectionObject();return projection?projection.getCode():null;},getProjectionObject:function(){var projection=null;if(this.baseLayer!=null){projection=this.baseLayer.projection;}
return projection;},getMaxResolution:function(){var maxResolution=null;if(this.baseLayer!=null){maxResolution=this.baseLayer.maxResolution;}
return maxResolution;},getMaxExtent:function(options){var maxExtent=null;if(options&&options.restricted&&this.restrictedExtent){maxExtent=this.restrictedExtent;}else if(this.baseLayer!=null){maxExtent=this.baseLayer.maxExtent;}
return maxExtent;},getNumZoomLevels:function(){var numZoomLevels=null;if(this.baseLayer!=null){numZoomLevels=this.baseLayer.numZoomLevels;}
return numZoomLevels;},getExtent:function(){var extent=null;if(this.baseLayer!=null){extent=this.baseLayer.getExtent();}
return extent;},getResolution:function(){var resolution=null;if(this.baseLayer!=null){resolution=this.baseLayer.getResolution();}else if(this.allOverlays===true&&this.layers.length>0){resolution=this.layers[0].getResolution();}
return resolution;},getUnits:function(){var units=null;if(this.baseLayer!=null){units=this.baseLayer.units;}
return units;},getScale:function(){var scale=null;if(this.baseLayer!=null){var res=this.getResolution();var units=this.baseLayer.units;scale=OpenLayers.Util.getScaleFromResolution(res,units);}
return scale;},getZoomForExtent:function(bounds,closest){var zoom=null;if(this.baseLayer!=null){zoom=this.baseLayer.getZoomForExtent(bounds,closest);}
return zoom;},getResolutionForZoom:function(zoom){var resolution=null;if(this.baseLayer){resolution=this.baseLayer.getResolutionForZoom(zoom);}
return resolution;},getZoomForResolution:function(resolution,closest){var zoom=null;if(this.baseLayer!=null){zoom=this.baseLayer.getZoomForResolution(resolution,closest);}
return zoom;},zoomTo:function(zoom,xy){var map=this;if(map.isValidZoomLevel(zoom)){if(map.baseLayer.wrapDateLine){zoom=map.adjustZoom(zoom);}
var center=xy?map.getZoomTargetCenter(xy,map.getResolutionForZoom(zoom)):map.getCenter();if(center){map.events.triggerEvent('zoomstart',{center:center,zoom:zoom});}
if(map.zoomTween){map.zoomTween.stop();var currentRes=map.getResolution(),targetRes=map.getResolutionForZoom(zoom),start={scale:1},end={scale:currentRes/targetRes};if(!xy){var size=map.getSize();xy={x:size.w/2,y:size.h/2};}
map.zoomTween.start(start,end,map.zoomDuration,{minFrameRate:50,callbacks:{eachStep:function(data){var containerOrigin=map.layerContainerOriginPx,scale=data.scale,dx=((scale-1)*(containerOrigin.x-xy.x))|0,dy=((scale-1)*(containerOrigin.y-xy.y))|0;map.applyTransform(containerOrigin.x+dx,containerOrigin.y+dy,scale);},done:function(data){map.applyTransform();var resolution=map.getResolution()/data.scale,newZoom=map.getZoomForResolution(resolution,true),newCenter=data.scale===1?center:map.getZoomTargetCenter(xy,resolution);map.moveTo(newCenter,newZoom);}}});}else{map.setCenter(center,zoom);}}},zoomIn:function(){if(this.zoomTween){this.zoomTween.stop();}
this.zoomTo(this.getZoom()+1);},zoomOut:function(){if(this.zoomTween){this.zoomTween.stop();}
this.zoomTo(this.getZoom()-1);},zoomToExtent:function(bounds,closest){if(!(bounds instanceof OpenLayers.Bounds)){bounds=new OpenLayers.Bounds(bounds);}
var center=bounds.getCenterLonLat();if(this.baseLayer.wrapDateLine){var maxExtent=this.getMaxExtent();bounds=bounds.clone();while(bounds.right<bounds.left){bounds.right+=maxExtent.getWidth();}
center=bounds.getCenterLonLat().wrapDateLine(maxExtent);}
this.setCenter(center,this.getZoomForExtent(bounds,closest));},zoomToMaxExtent:function(options){var restricted=(options)?options.restricted:true;var maxExtent=this.getMaxExtent({'restricted':restricted});this.zoomToExtent(maxExtent);},zoomToScale:function(scale,closest){var res=OpenLayers.Util.getResolutionFromScale(scale,this.baseLayer.units);var halfWDeg=(this.size.w*res)/2;var halfHDeg=(this.size.h*res)/2;var center=this.getCachedCenter();var extent=new OpenLayers.Bounds(center.lon-halfWDeg,center.lat-halfHDeg,center.lon+halfWDeg,center.lat+halfHDeg);this.zoomToExtent(extent,closest);},getLonLatFromViewPortPx:function(viewPortPx){var lonlat=null;if(this.baseLayer!=null){lonlat=this.baseLayer.getLonLatFromViewPortPx(viewPortPx);}
return lonlat;},getViewPortPxFromLonLat:function(lonlat){var px=null;if(this.baseLayer!=null){px=this.baseLayer.getViewPortPxFromLonLat(lonlat);}
return px;},getZoomTargetCenter:function(xy,resolution){var lonlat=null,size=this.getSize(),deltaX=size.w/2-xy.x,deltaY=xy.y-size.h/2,zoomPoint=this.getLonLatFromPixel(xy);if(zoomPoint){lonlat=new OpenLayers.LonLat(zoomPoint.lon+deltaX*resolution,zoomPoint.lat+deltaY*resolution);}
return lonlat;},getLonLatFromPixel:function(px){return this.getLonLatFromViewPortPx(px);},getPixelFromLonLat:function(lonlat){var px=this.getViewPortPxFromLonLat(lonlat);px.x=Math.round(px.x);px.y=Math.round(px.y);return px;},getGeodesicPixelSize:function(px){var lonlat=px?this.getLonLatFromPixel(px):(this.getCachedCenter()||new OpenLayers.LonLat(0,0));var res=this.getResolution();var left=lonlat.add(-res/2,0);var right=lonlat.add(res/2,0);var bottom=lonlat.add(0,-res/2);var top=lonlat.add(0,res/2);var dest=new OpenLayers.Projection("EPSG:4326");var source=this.getProjectionObject()||dest;if(!source.equals(dest)){left.transform(source,dest);right.transform(source,dest);bottom.transform(source,dest);top.transform(source,dest);}
return new OpenLayers.Size(OpenLayers.Util.distVincenty(left,right),OpenLayers.Util.distVincenty(bottom,top));},getViewPortPxFromLayerPx:function(layerPx){var viewPortPx=null;if(layerPx!=null){var dX=this.layerContainerOriginPx.x;var dY=this.layerContainerOriginPx.y;viewPortPx=layerPx.add(dX,dY);}
return viewPortPx;},getLayerPxFromViewPortPx:function(viewPortPx){var layerPx=null;if(viewPortPx!=null){var dX=-this.layerContainerOriginPx.x;var dY=-this.layerContainerOriginPx.y;layerPx=viewPortPx.add(dX,dY);if(isNaN(layerPx.x)||isNaN(layerPx.y)){layerPx=null;}}
return layerPx;},getLonLatFromLayerPx:function(px){px=this.getViewPortPxFromLayerPx(px);return this.getLonLatFromViewPortPx(px);},getLayerPxFromLonLat:function(lonlat){var px=this.getPixelFromLonLat(lonlat);return this.getLayerPxFromViewPortPx(px);},applyTransform:function(x,y,scale){scale=scale||1;var origin=this.layerContainerOriginPx,needTransform=scale!==1;x=x||origin.x;y=y||origin.y;var style=this.layerContainerDiv.style,transform=this.applyTransform.transform,template=this.applyTransform.template;if(transform===undefined){transform=OpenLayers.Util.vendorPrefix.style('transform');this.applyTransform.transform=transform;if(transform){var computedStyle=OpenLayers.Element.getStyle(this.viewPortDiv,OpenLayers.Util.vendorPrefix.css('transform'));if(!computedStyle||computedStyle!=='none'){template=['translate3d(',',0) ','scale3d(',',1)'];style[transform]=[template[0],'0,0',template[1]].join('');}
if(!template||!~style[transform].indexOf(template[0])){template=['translate(',') ','scale(',')'];}
this.applyTransform.template=template;}}
if(transform!==null&&(template[0]==='translate3d('||needTransform===true)){if(needTransform===true&&template[0]==='translate('){x-=origin.x;y-=origin.y;style.left=origin.x+'px';style.top=origin.y+'px';}
style[transform]=[template[0],x,'px,',y,'px',template[1],template[2],scale,',',scale,template[3]].join('');}else{style.left=x+'px';style.top=y+'px';if(transform!==null){style[transform]='';}}},CLASS_NAME:"OpenLayers.Map"});OpenLayers.Map.TILE_WIDTH=256;OpenLayers.Map.TILE_HEIGHT=256;OpenLayers.Layer=OpenLayers.Class({id:null,name:null,div:null,opacity:1,alwaysInRange:null,RESOLUTION_PROPERTIES:['scales','resolutions','maxScale','minScale','maxResolution','minResolution','numZoomLevels','maxZoomLevel'],events:null,map:null,isBaseLayer:false,alpha:false,displayInLayerSwitcher:true,visibility:true,attribution:null,inRange:false,imageSize:null,options:null,eventListeners:null,gutter:0,projection:null,units:null,scales:null,resolutions:null,maxExtent:null,minExtent:null,maxResolution:null,minResolution:null,numZoomLevels:null,minScale:null,maxScale:null,displayOutsideMaxExtent:false,wrapDateLine:false,metadata:null,initialize:function(name,options){this.metadata={};options=OpenLayers.Util.extend({},options);if(this.alwaysInRange!=null){options.alwaysInRange=this.alwaysInRange;}
this.addOptions(options);this.name=name;if(this.id==null){this.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME+"_");this.div=OpenLayers.Util.createDiv(this.id);this.div.style.width="100%";this.div.style.height="100%";this.div.dir="ltr";this.events=new OpenLayers.Events(this,this.div);if(this.eventListeners instanceof Object){this.events.on(this.eventListeners);}}},destroy:function(setNewBaseLayer){if(setNewBaseLayer==null){setNewBaseLayer=true;}
if(this.map!=null){this.map.removeLayer(this,setNewBaseLayer);}
this.projection=null;this.map=null;this.name=null;this.div=null;this.options=null;if(this.events){if(this.eventListeners){this.events.un(this.eventListeners);}
this.events.destroy();}
this.eventListeners=null;this.events=null;},clone:function(obj){if(obj==null){obj=new OpenLayers.Layer(this.name,this.getOptions());}
OpenLayers.Util.applyDefaults(obj,this);obj.map=null;return obj;},getOptions:function(){var options={};for(var o in this.options){options[o]=this[o];}
return options;},setName:function(newName){if(newName!=this.name){this.name=newName;if(this.map!=null){this.map.events.triggerEvent("changelayer",{layer:this,property:"name"});}}},addOptions:function(newOptions,reinitialize){if(this.options==null){this.options={};}
if(newOptions){if(typeof newOptions.projection=="string"){newOptions.projection=new OpenLayers.Projection(newOptions.projection);}
if(newOptions.projection){OpenLayers.Util.applyDefaults(newOptions,OpenLayers.Projection.defaults[newOptions.projection.getCode()]);}
if(newOptions.maxExtent&&!(newOptions.maxExtent instanceof OpenLayers.Bounds)){newOptions.maxExtent=new OpenLayers.Bounds(newOptions.maxExtent);}
if(newOptions.minExtent&&!(newOptions.minExtent instanceof OpenLayers.Bounds)){newOptions.minExtent=new OpenLayers.Bounds(newOptions.minExtent);}}
OpenLayers.Util.extend(this.options,newOptions);OpenLayers.Util.extend(this,newOptions);if(this.projection&&this.projection.getUnits()){this.units=this.projection.getUnits();}
if(this.map){var resolution=this.map.getResolution();var properties=this.RESOLUTION_PROPERTIES.concat(["projection","units","minExtent","maxExtent"]);for(var o in newOptions){if(newOptions.hasOwnProperty(o)&&OpenLayers.Util.indexOf(properties,o)>=0){this.initResolutions();if(reinitialize&&this.map.baseLayer===this){this.map.setCenter(this.map.getCenter(),this.map.getZoomForResolution(resolution),false,true);this.map.events.triggerEvent("changebaselayer",{layer:this});}
break;}}}},onMapResize:function(){},redraw:function(){var redrawn=false;if(this.map){this.inRange=this.calculateInRange();var extent=this.getExtent();if(extent&&this.inRange&&this.visibility){var zoomChanged=true;this.moveTo(extent,zoomChanged,false);this.events.triggerEvent("moveend",{"zoomChanged":zoomChanged});redrawn=true;}}
return redrawn;},moveTo:function(bounds,zoomChanged,dragging){var display=this.visibility;if(!this.isBaseLayer){display=display&&this.inRange;}
this.display(display);},moveByPx:function(dx,dy){},setMap:function(map){if(this.map==null){this.map=map;this.maxExtent=this.maxExtent||this.map.maxExtent;this.minExtent=this.minExtent||this.map.minExtent;this.projection=this.projection||this.map.projection;if(typeof this.projection=="string"){this.projection=new OpenLayers.Projection(this.projection);}
if(this.projection&&this.projection.getUnits()){this.units=this.projection.getUnits();}
else{this.units=this.units||this.map.units;}
this.initResolutions();if(!this.isBaseLayer){this.inRange=this.calculateInRange();var show=((this.visibility)&&(this.inRange));this.div.style.display=show?"":"none";}
this.setTileSize();}},afterAdd:function(){},removeMap:function(map){},getImageSize:function(bounds){return(this.imageSize||this.tileSize);},setTileSize:function(size){var tileSize=(size)?size:((this.tileSize)?this.tileSize:this.map.getTileSize());this.tileSize=tileSize;if(this.gutter){this.imageSize=new OpenLayers.Size(tileSize.w+(2*this.gutter),tileSize.h+(2*this.gutter));}},getVisibility:function(){return this.visibility;},setVisibility:function(visibility){if(visibility!=this.visibility){this.visibility=visibility;this.display(visibility);this.redraw();if(this.map!=null){this.map.events.triggerEvent("changelayer",{layer:this,property:"visibility"});}
this.events.triggerEvent("visibilitychanged");}},display:function(display){if(display!=(this.div.style.display!="none")){this.div.style.display=(display&&this.calculateInRange())?"block":"none";}},calculateInRange:function(){var inRange=false;if(this.alwaysInRange){inRange=true;}else{if(this.map){var resolution=this.map.getResolution();inRange=((resolution>=this.minResolution)&&(resolution<=this.maxResolution));}}
return inRange;},setIsBaseLayer:function(isBaseLayer){if(isBaseLayer!=this.isBaseLayer){this.isBaseLayer=isBaseLayer;if(this.map!=null){this.map.events.triggerEvent("changebaselayer",{layer:this});}}},initResolutions:function(){var i,len,p;var props={},alwaysInRange=true;for(i=0,len=this.RESOLUTION_PROPERTIES.length;i<len;i++){p=this.RESOLUTION_PROPERTIES[i];props[p]=this.options[p];if(alwaysInRange&&this.options[p]){alwaysInRange=false;}}
if(this.options.alwaysInRange==null){this.alwaysInRange=alwaysInRange;}
if(props.resolutions==null){props.resolutions=this.resolutionsFromScales(props.scales);}
if(props.resolutions==null){props.resolutions=this.calculateResolutions(props);}
if(props.resolutions==null){for(i=0,len=this.RESOLUTION_PROPERTIES.length;i<len;i++){p=this.RESOLUTION_PROPERTIES[i];props[p]=this.options[p]!=null?this.options[p]:this.map[p];}
if(props.resolutions==null){props.resolutions=this.resolutionsFromScales(props.scales);}
if(props.resolutions==null){props.resolutions=this.calculateResolutions(props);}}
var maxResolution;if(this.options.maxResolution&&this.options.maxResolution!=="auto"){maxResolution=this.options.maxResolution;}
if(this.options.minScale){maxResolution=OpenLayers.Util.getResolutionFromScale(this.options.minScale,this.units);}
var minResolution;if(this.options.minResolution&&this.options.minResolution!=="auto"){minResolution=this.options.minResolution;}
if(this.options.maxScale){minResolution=OpenLayers.Util.getResolutionFromScale(this.options.maxScale,this.units);}
if(props.resolutions){props.resolutions.sort(function(a,b){return(b-a);});if(!maxResolution){maxResolution=props.resolutions[0];}
if(!minResolution){var lastIdx=props.resolutions.length-1;minResolution=props.resolutions[lastIdx];}}
this.resolutions=props.resolutions;if(this.resolutions){len=this.resolutions.length;this.scales=new Array(len);for(i=0;i<len;i++){this.scales[i]=OpenLayers.Util.getScaleFromResolution(this.resolutions[i],this.units);}
this.numZoomLevels=len;}
this.minResolution=minResolution;if(minResolution){this.maxScale=OpenLayers.Util.getScaleFromResolution(minResolution,this.units);}
this.maxResolution=maxResolution;if(maxResolution){this.minScale=OpenLayers.Util.getScaleFromResolution(maxResolution,this.units);}},resolutionsFromScales:function(scales){if(scales==null){return;}
var resolutions,i,len;len=scales.length;resolutions=new Array(len);for(i=0;i<len;i++){resolutions[i]=OpenLayers.Util.getResolutionFromScale(scales[i],this.units);}
return resolutions;},calculateResolutions:function(props){var viewSize,wRes,hRes;var maxResolution=props.maxResolution;if(props.minScale!=null){maxResolution=OpenLayers.Util.getResolutionFromScale(props.minScale,this.units);}else if(maxResolution=="auto"&&this.maxExtent!=null){viewSize=this.map.getSize();wRes=this.maxExtent.getWidth()/viewSize.w;hRes=this.maxExtent.getHeight()/viewSize.h;maxResolution=Math.max(wRes,hRes);}
var minResolution=props.minResolution;if(props.maxScale!=null){minResolution=OpenLayers.Util.getResolutionFromScale(props.maxScale,this.units);}else if(props.minResolution=="auto"&&this.minExtent!=null){viewSize=this.map.getSize();wRes=this.minExtent.getWidth()/viewSize.w;hRes=this.minExtent.getHeight()/viewSize.h;minResolution=Math.max(wRes,hRes);}
if(typeof maxResolution!=="number"&&typeof minResolution!=="number"&&this.maxExtent!=null){var tileSize=this.map.getTileSize();maxResolution=Math.max(this.maxExtent.getWidth()/tileSize.w,this.maxExtent.getHeight()/tileSize.h);}
var maxZoomLevel=props.maxZoomLevel;var numZoomLevels=props.numZoomLevels;if(typeof minResolution==="number"&&typeof maxResolution==="number"&&numZoomLevels===undefined){var ratio=maxResolution/minResolution;numZoomLevels=Math.floor(Math.log(ratio)/Math.log(2))+1;}else if(numZoomLevels===undefined&&maxZoomLevel!=null){numZoomLevels=maxZoomLevel+1;}
if(typeof numZoomLevels!=="number"||numZoomLevels<=0||(typeof maxResolution!=="number"&&typeof minResolution!=="number")){return;}
var resolutions=new Array(numZoomLevels);var base=2;if(typeof minResolution=="number"&&typeof maxResolution=="number"){base=Math.pow((maxResolution/minResolution),(1/(numZoomLevels-1)));}
var i;if(typeof maxResolution==="number"){for(i=0;i<numZoomLevels;i++){resolutions[i]=maxResolution/Math.pow(base,i);}}else{for(i=0;i<numZoomLevels;i++){resolutions[numZoomLevels-1-i]=minResolution*Math.pow(base,i);}}
return resolutions;},getResolution:function(){var zoom=this.map.getZoom();return this.getResolutionForZoom(zoom);},getExtent:function(){return this.map.calculateBounds();},getZoomForExtent:function(extent,closest){var viewSize=this.map.getSize();var idealResolution=Math.max(extent.getWidth()/viewSize.w,extent.getHeight()/viewSize.h);return this.getZoomForResolution(idealResolution,closest);},getDataExtent:function(){},getResolutionForZoom:function(zoom){zoom=Math.max(0,Math.min(zoom,this.resolutions.length-1));var resolution;if(this.map.fractionalZoom){var low=Math.floor(zoom);var high=Math.ceil(zoom);resolution=this.resolutions[low]-
((zoom-low)*(this.resolutions[low]-this.resolutions[high]));}else{resolution=this.resolutions[Math.round(zoom)];}
return resolution;},getZoomForResolution:function(resolution,closest){var zoom,i,len;if(this.map.fractionalZoom){var lowZoom=0;var highZoom=this.resolutions.length-1;var highRes=this.resolutions[lowZoom];var lowRes=this.resolutions[highZoom];var res;for(i=0,len=this.resolutions.length;i<len;++i){res=this.resolutions[i];if(res>=resolution){highRes=res;lowZoom=i;}
if(res<=resolution){lowRes=res;highZoom=i;break;}}
var dRes=highRes-lowRes;if(dRes>0){zoom=lowZoom+((highRes-resolution)/dRes);}else{zoom=lowZoom;}}else{var diff;var minDiff=Number.POSITIVE_INFINITY;for(i=0,len=this.resolutions.length;i<len;i++){if(closest){diff=Math.abs(this.resolutions[i]-resolution);if(diff>minDiff){break;}
minDiff=diff;}else{if(this.resolutions[i]<resolution){break;}}}
zoom=Math.max(0,i-1);}
return zoom;},getLonLatFromViewPortPx:function(viewPortPx){var lonlat=null;var map=this.map;if(viewPortPx!=null&&map.minPx){var res=map.getResolution();var maxExtent=map.getMaxExtent({restricted:true});var lon=(viewPortPx.x-map.minPx.x)*res+maxExtent.left;var lat=(map.minPx.y-viewPortPx.y)*res+maxExtent.top;lonlat=new OpenLayers.LonLat(lon,lat);if(this.wrapDateLine){lonlat=lonlat.wrapDateLine(this.maxExtent);}}
return lonlat;},getViewPortPxFromLonLat:function(lonlat,resolution){var px=null;if(lonlat!=null){resolution=resolution||this.map.getResolution();var extent=this.map.calculateBounds(null,resolution);px=new OpenLayers.Pixel((1/resolution*(lonlat.lon-extent.left)),(1/resolution*(extent.top-lonlat.lat)));}
return px;},setOpacity:function(opacity){if(opacity!=this.opacity){this.opacity=opacity;var childNodes=this.div.childNodes;for(var i=0,len=childNodes.length;i<len;++i){var element=childNodes[i].firstChild||childNodes[i];var lastChild=childNodes[i].lastChild;if(lastChild&&lastChild.nodeName.toLowerCase()==="iframe"){element=lastChild.parentNode;}
OpenLayers.Util.modifyDOMElement(element,null,null,null,null,null,null,opacity);}
if(this.map!=null){this.map.events.triggerEvent("changelayer",{layer:this,property:"opacity"});}}},getZIndex:function(){return this.div.style.zIndex;},setZIndex:function(zIndex){this.div.style.zIndex=zIndex;},adjustBounds:function(bounds){if(this.gutter){var mapGutter=this.gutter*this.map.getResolution();bounds=new OpenLayers.Bounds(bounds.left-mapGutter,bounds.bottom-mapGutter,bounds.right+mapGutter,bounds.top+mapGutter);}
if(this.wrapDateLine){var wrappingOptions={'rightTolerance':this.getResolution(),'leftTolerance':this.getResolution()};bounds=bounds.wrapDateLine(this.maxExtent,wrappingOptions);}
return bounds;},CLASS_NAME:"OpenLayers.Layer"});OpenLayers.Layer.SphericalMercator={getExtent:function(){var extent=null;if(this.sphericalMercator){extent=this.map.calculateBounds();}else{extent=OpenLayers.Layer.FixedZoomLevels.prototype.getExtent.apply(this);}
return extent;},getLonLatFromViewPortPx:function(viewPortPx){return OpenLayers.Layer.prototype.getLonLatFromViewPortPx.apply(this,arguments);},getViewPortPxFromLonLat:function(lonlat){return OpenLayers.Layer.prototype.getViewPortPxFromLonLat.apply(this,arguments);},initMercatorParameters:function(){this.RESOLUTIONS=[];var maxResolution=156543.03390625;for(var zoom=0;zoom<=this.MAX_ZOOM_LEVEL;++zoom){this.RESOLUTIONS[zoom]=maxResolution/Math.pow(2,zoom);}
this.units="m";this.projection=this.projection||"EPSG:900913";},forwardMercator:(function(){var gg=new OpenLayers.Projection("EPSG:4326");var sm=new OpenLayers.Projection("EPSG:900913");return function(lon,lat){var point=OpenLayers.Projection.transform({x:lon,y:lat},gg,sm);return new OpenLayers.LonLat(point.x,point.y);};})(),inverseMercator:(function(){var gg=new OpenLayers.Projection("EPSG:4326");var sm=new OpenLayers.Projection("EPSG:900913");return function(x,y){var point=OpenLayers.Projection.transform({x:x,y:y},sm,gg);return new OpenLayers.LonLat(point.x,point.y);};})()};OpenLayers.Layer.EventPane=OpenLayers.Class(OpenLayers.Layer,{smoothDragPan:true,isBaseLayer:true,isFixed:true,pane:null,mapObject:null,initialize:function(name,options){OpenLayers.Layer.prototype.initialize.apply(this,arguments);if(this.pane==null){this.pane=OpenLayers.Util.createDiv(this.div.id+"_EventPane");}},destroy:function(){this.mapObject=null;this.pane=null;OpenLayers.Layer.prototype.destroy.apply(this,arguments);},setMap:function(map){OpenLayers.Layer.prototype.setMap.apply(this,arguments);this.pane.style.zIndex=parseInt(this.div.style.zIndex)+1;this.pane.style.display=this.div.style.display;this.pane.style.width="100%";this.pane.style.height="100%";if(OpenLayers.BROWSER_NAME=="msie"){this.pane.style.background="url("+OpenLayers.Util.getImageLocation("blank.gif")+")";}
if(this.isFixed){this.map.viewPortDiv.appendChild(this.pane);}else{this.map.layerContainerDiv.appendChild(this.pane);}
this.loadMapObject();if(this.mapObject==null){this.loadWarningMessage();}
this.map.events.register('zoomstart',this,this.onZoomStart);},removeMap:function(map){this.map.events.unregister('zoomstart',this,this.onZoomStart);if(this.pane&&this.pane.parentNode){this.pane.parentNode.removeChild(this.pane);}
OpenLayers.Layer.prototype.removeMap.apply(this,arguments);},onZoomStart:function(evt){if(this.mapObject!=null){var center=this.getMapObjectLonLatFromOLLonLat(evt.center);var zoom=this.getMapObjectZoomFromOLZoom(evt.zoom);this.setMapObjectCenter(center,zoom,false);}},loadWarningMessage:function(){this.div.style.backgroundColor="darkblue";var viewSize=this.map.getSize();var msgW=Math.min(viewSize.w,300);var msgH=Math.min(viewSize.h,200);var size=new OpenLayers.Size(msgW,msgH);var centerPx=new OpenLayers.Pixel(viewSize.w/2,viewSize.h/2);var topLeft=centerPx.add(-size.w/2,-size.h/2);var div=OpenLayers.Util.createDiv(this.name+"_warning",topLeft,size,null,null,null,"auto");div.style.padding="7px";div.style.backgroundColor="yellow";div.innerHTML=this.getWarningHTML();this.div.appendChild(div);},getWarningHTML:function(){return"";},display:function(display){OpenLayers.Layer.prototype.display.apply(this,arguments);this.pane.style.display=this.div.style.display;},setZIndex:function(zIndex){OpenLayers.Layer.prototype.setZIndex.apply(this,arguments);this.pane.style.zIndex=parseInt(this.div.style.zIndex)+1;},moveByPx:function(dx,dy){OpenLayers.Layer.prototype.moveByPx.apply(this,arguments);if(this.dragPanMapObject){this.dragPanMapObject(dx,-dy);}else{this.moveTo(this.map.getCachedCenter());}},moveTo:function(bounds,zoomChanged,dragging){OpenLayers.Layer.prototype.moveTo.apply(this,arguments);if(this.mapObject!=null){var newCenter=this.map.getCenter();var newZoom=this.map.getZoom();if(newCenter!=null){var moOldCenter=this.getMapObjectCenter();var oldCenter=this.getOLLonLatFromMapObjectLonLat(moOldCenter);var moOldZoom=this.getMapObjectZoom();var oldZoom=this.getOLZoomFromMapObjectZoom(moOldZoom);if(!(newCenter.equals(oldCenter))||newZoom!=oldZoom){if(!zoomChanged&&oldCenter&&this.dragPanMapObject&&this.smoothDragPan){var oldPx=this.map.getViewPortPxFromLonLat(oldCenter);var newPx=this.map.getViewPortPxFromLonLat(newCenter);this.dragPanMapObject(newPx.x-oldPx.x,oldPx.y-newPx.y);}else{var center=this.getMapObjectLonLatFromOLLonLat(newCenter);var zoom=this.getMapObjectZoomFromOLZoom(newZoom);this.setMapObjectCenter(center,zoom,dragging);}}}}},getLonLatFromViewPortPx:function(viewPortPx){var lonlat=null;if((this.mapObject!=null)&&(this.getMapObjectCenter()!=null)){var moPixel=this.getMapObjectPixelFromOLPixel(viewPortPx);var moLonLat=this.getMapObjectLonLatFromMapObjectPixel(moPixel);lonlat=this.getOLLonLatFromMapObjectLonLat(moLonLat);}
return lonlat;},getViewPortPxFromLonLat:function(lonlat){var viewPortPx=null;if((this.mapObject!=null)&&(this.getMapObjectCenter()!=null)){var moLonLat=this.getMapObjectLonLatFromOLLonLat(lonlat);var moPixel=this.getMapObjectPixelFromMapObjectLonLat(moLonLat);viewPortPx=this.getOLPixelFromMapObjectPixel(moPixel);}
return viewPortPx;},getOLLonLatFromMapObjectLonLat:function(moLonLat){var olLonLat=null;if(moLonLat!=null){var lon=this.getLongitudeFromMapObjectLonLat(moLonLat);var lat=this.getLatitudeFromMapObjectLonLat(moLonLat);olLonLat=new OpenLayers.LonLat(lon,lat);}
return olLonLat;},getMapObjectLonLatFromOLLonLat:function(olLonLat){var moLatLng=null;if(olLonLat!=null){moLatLng=this.getMapObjectLonLatFromLonLat(olLonLat.lon,olLonLat.lat);}
return moLatLng;},getOLPixelFromMapObjectPixel:function(moPixel){var olPixel=null;if(moPixel!=null){var x=this.getXFromMapObjectPixel(moPixel);var y=this.getYFromMapObjectPixel(moPixel);olPixel=new OpenLayers.Pixel(x,y);}
return olPixel;},getMapObjectPixelFromOLPixel:function(olPixel){var moPixel=null;if(olPixel!=null){moPixel=this.getMapObjectPixelFromXY(olPixel.x,olPixel.y);}
return moPixel;},CLASS_NAME:"OpenLayers.Layer.EventPane"});OpenLayers.Layer.FixedZoomLevels=OpenLayers.Class({initialize:function(){},initResolutions:function(){var props=['minZoomLevel','maxZoomLevel','numZoomLevels'];for(var i=0,len=props.length;i<len;i++){var property=props[i];this[property]=(this.options[property]!=null)?this.options[property]:this.map[property];}
if((this.minZoomLevel==null)||(this.minZoomLevel<this.MIN_ZOOM_LEVEL)){this.minZoomLevel=this.MIN_ZOOM_LEVEL;}
var desiredZoomLevels;var limitZoomLevels=this.MAX_ZOOM_LEVEL-this.minZoomLevel+1;if(((this.options.numZoomLevels==null)&&(this.options.maxZoomLevel!=null))||((this.numZoomLevels==null)&&(this.maxZoomLevel!=null))){desiredZoomLevels=this.maxZoomLevel-this.minZoomLevel+1;}else{desiredZoomLevels=this.numZoomLevels;}
if(desiredZoomLevels!=null){this.numZoomLevels=Math.min(desiredZoomLevels,limitZoomLevels);}else{this.numZoomLevels=limitZoomLevels;}
this.maxZoomLevel=this.minZoomLevel+this.numZoomLevels-1;if(this.RESOLUTIONS!=null){var resolutionsIndex=0;this.resolutions=[];for(var i=this.minZoomLevel;i<=this.maxZoomLevel;i++){this.resolutions[resolutionsIndex++]=this.RESOLUTIONS[i];}
this.maxResolution=this.resolutions[0];this.minResolution=this.resolutions[this.resolutions.length-1];}},getResolution:function(){if(this.resolutions!=null){return OpenLayers.Layer.prototype.getResolution.apply(this,arguments);}else{var resolution=null;var viewSize=this.map.getSize();var extent=this.getExtent();if((viewSize!=null)&&(extent!=null)){resolution=Math.max(extent.getWidth()/viewSize.w,extent.getHeight()/viewSize.h);}
return resolution;}},getExtent:function(){var size=this.map.getSize();var tl=this.getLonLatFromViewPortPx({x:0,y:0});var br=this.getLonLatFromViewPortPx({x:size.w,y:size.h});if((tl!=null)&&(br!=null)){return new OpenLayers.Bounds(tl.lon,br.lat,br.lon,tl.lat);}else{return null;}},getZoomForResolution:function(resolution){if(this.resolutions!=null){return OpenLayers.Layer.prototype.getZoomForResolution.apply(this,arguments);}else{var extent=OpenLayers.Layer.prototype.getExtent.apply(this,[]);return this.getZoomForExtent(extent);}},getOLZoomFromMapObjectZoom:function(moZoom){var zoom=null;if(moZoom!=null){zoom=moZoom-this.minZoomLevel;if(this.map.baseLayer!==this){zoom=this.map.baseLayer.getZoomForResolution(this.getResolutionForZoom(zoom));}}
return zoom;},getMapObjectZoomFromOLZoom:function(olZoom){var zoom=null;if(olZoom!=null){zoom=olZoom+this.minZoomLevel;if(this.map.baseLayer!==this){zoom=this.getZoomForResolution(this.map.baseLayer.getResolutionForZoom(zoom));}}
return zoom;},CLASS_NAME:"OpenLayers.Layer.FixedZoomLevels"});OpenLayers.Layer.Google=OpenLayers.Class(OpenLayers.Layer.EventPane,OpenLayers.Layer.FixedZoomLevels,{MIN_ZOOM_LEVEL:0,MAX_ZOOM_LEVEL:21,RESOLUTIONS:[1.40625,0.703125,0.3515625,0.17578125,0.087890625,0.0439453125,0.02197265625,0.010986328125,0.0054931640625,0.00274658203125,0.001373291015625,0.0006866455078125,0.00034332275390625,0.000171661376953125,0.0000858306884765625,0.00004291534423828125,0.00002145767211914062,0.00001072883605957031,0.00000536441802978515,0.00000268220901489257,0.0000013411045074462891,0.00000067055225372314453],type:null,wrapDateLine:true,sphericalMercator:false,useTiltImages:false,version:null,initialize:function(name,options){options=options||{};options.version="3";var mixin=OpenLayers.Layer.Google["v"+
options.version.replace(/\./g,"_")];if(mixin){OpenLayers.Util.applyDefaults(options,mixin);}else{throw"Unsupported Google Maps API version: "+options.version;}
OpenLayers.Util.applyDefaults(options,mixin.DEFAULTS);if(options.maxExtent){options.maxExtent=options.maxExtent.clone();}
OpenLayers.Layer.EventPane.prototype.initialize.apply(this,[name,options]);OpenLayers.Layer.FixedZoomLevels.prototype.initialize.apply(this,[name,options]);if(this.sphericalMercator){OpenLayers.Util.extend(this,OpenLayers.Layer.SphericalMercator);this.initMercatorParameters();}},clone:function(){return new OpenLayers.Layer.Google(this.name,this.getOptions());},setVisibility:function(visible){var opacity=this.opacity==null?1:this.opacity;OpenLayers.Layer.EventPane.prototype.setVisibility.apply(this,arguments);this.setOpacity(opacity);},display:function(visible){if(!this._dragging){this.setGMapVisibility(visible);}
OpenLayers.Layer.EventPane.prototype.display.apply(this,arguments);},moveTo:function(bounds,zoomChanged,dragging){this._dragging=dragging;OpenLayers.Layer.EventPane.prototype.moveTo.apply(this,arguments);delete this._dragging;},setOpacity:function(opacity){if(opacity!==this.opacity){if(this.map!=null){this.map.events.triggerEvent("changelayer",{layer:this,property:"opacity"});}
this.opacity=opacity;}
if(this.getVisibility()){var container=this.getMapContainer();OpenLayers.Util.modifyDOMElement(container,null,null,null,null,null,null,opacity);}},destroy:function(){if(this.map){this.setGMapVisibility(false);var cache=OpenLayers.Layer.Google.cache[this.map.id];if(cache&&cache.count<=1){this.removeGMapElements();}}
OpenLayers.Layer.EventPane.prototype.destroy.apply(this,arguments);},removeGMapElements:function(){var cache=OpenLayers.Layer.Google.cache[this.map.id];if(cache){var container=this.mapObject&&this.getMapContainer();if(container&&container.parentNode){container.parentNode.removeChild(container);}
var termsOfUse=cache.termsOfUse;if(termsOfUse&&termsOfUse.parentNode){termsOfUse.parentNode.removeChild(termsOfUse);}
var poweredBy=cache.poweredBy;if(poweredBy&&poweredBy.parentNode){poweredBy.parentNode.removeChild(poweredBy);}
if(this.mapObject&&window.google&&google.maps&&google.maps.event&&google.maps.event.clearListeners){google.maps.event.clearListeners(this.mapObject,'tilesloaded');}}},removeMap:function(map){if(this.visibility&&this.mapObject){this.setGMapVisibility(false);}
var cache=OpenLayers.Layer.Google.cache[map.id];if(cache){if(cache.count<=1){this.removeGMapElements();delete OpenLayers.Layer.Google.cache[map.id];}else{--cache.count;}}
delete this.termsOfUse;delete this.poweredBy;delete this.mapObject;delete this.dragObject;OpenLayers.Layer.EventPane.prototype.removeMap.apply(this,arguments);},getOLBoundsFromMapObjectBounds:function(moBounds){var olBounds=null;if(moBounds!=null){var sw=moBounds.getSouthWest();var ne=moBounds.getNorthEast();if(this.sphericalMercator){sw=this.forwardMercator(sw.lng(),sw.lat());ne=this.forwardMercator(ne.lng(),ne.lat());}else{sw=new OpenLayers.LonLat(sw.lng(),sw.lat());ne=new OpenLayers.LonLat(ne.lng(),ne.lat());}
olBounds=new OpenLayers.Bounds(sw.lon,sw.lat,ne.lon,ne.lat);}
return olBounds;},getWarningHTML:function(){return OpenLayers.i18n("googleWarning");},getMapObjectCenter:function(){return this.mapObject.getCenter();},getMapObjectZoom:function(){return this.mapObject.getZoom();},getLongitudeFromMapObjectLonLat:function(moLonLat){return this.sphericalMercator?this.forwardMercator(moLonLat.lng(),moLonLat.lat()).lon:moLonLat.lng();},getLatitudeFromMapObjectLonLat:function(moLonLat){var lat=this.sphericalMercator?this.forwardMercator(moLonLat.lng(),moLonLat.lat()).lat:moLonLat.lat();return lat;},getXFromMapObjectPixel:function(moPixel){return moPixel.x;},getYFromMapObjectPixel:function(moPixel){return moPixel.y;},CLASS_NAME:"OpenLayers.Layer.Google"});OpenLayers.Layer.Google.cache={};OpenLayers.Control=OpenLayers.Class({id:null,map:null,div:null,type:null,allowSelection:false,displayClass:"",title:"",autoActivate:false,active:null,handlerOptions:null,handler:null,eventListeners:null,events:null,initialize:function(options){this.displayClass=this.CLASS_NAME.replace("OpenLayers.","ol").replace(/\./g,"");OpenLayers.Util.extend(this,options);this.events=new OpenLayers.Events(this);if(this.eventListeners instanceof Object){this.events.on(this.eventListeners);}
if(this.id==null){this.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME+"_");}},destroy:function(){if(this.events){if(this.eventListeners){this.events.un(this.eventListeners);}
this.events.destroy();this.events=null;}
this.eventListeners=null;if(this.handler){this.handler.destroy();this.handler=null;}
if(this.handlers){for(var key in this.handlers){if(this.handlers.hasOwnProperty(key)&&typeof this.handlers[key].destroy=="function"){this.handlers[key].destroy();}}
this.handlers=null;}
if(this.map){this.map.removeControl(this);this.map=null;}
this.div=null;},setMap:function(map){this.map=map;if(this.handler){this.handler.setMap(map);}},draw:function(px){if(this.div==null){this.div=OpenLayers.Util.createDiv(this.id);this.div.className=this.displayClass;if(!this.allowSelection){this.div.className+=" olControlNoSelect";this.div.setAttribute("unselectable","on",0);this.div.onselectstart=OpenLayers.Function.False;}
if(this.title!=""){this.div.title=this.title;}}
if(px!=null){this.position=px.clone();}
this.moveTo(this.position);return this.div;},moveTo:function(px){if((px!=null)&&(this.div!=null)){this.div.style.left=px.x+"px";this.div.style.top=px.y+"px";}},activate:function(){if(this.active){return false;}
if(this.handler){this.handler.activate();}
this.active=true;if(this.map){OpenLayers.Element.addClass(this.map.viewPortDiv,this.displayClass.replace(/ /g,"")+"Active");}
this.events.triggerEvent("activate");return true;},deactivate:function(){if(this.active){if(this.handler){this.handler.deactivate();}
this.active=false;if(this.map){OpenLayers.Element.removeClass(this.map.viewPortDiv,this.displayClass.replace(/ /g,"")+"Active");}
this.events.triggerEvent("deactivate");return true;}
return false;},CLASS_NAME:"OpenLayers.Control"});OpenLayers.Control.TYPE_BUTTON=1;OpenLayers.Control.TYPE_TOGGLE=2;OpenLayers.Control.TYPE_TOOL=3;OpenLayers.Control.Attribution=OpenLayers.Class(OpenLayers.Control,{separator:", ",template:"${layers}",layerTemplate:'<a href="${href}" target="_blank">${title}</a>',destroy:function(){this.map.events.un({"removelayer":this.updateAttribution,"addlayer":this.updateAttribution,"changelayer":this.updateAttribution,"changebaselayer":this.updateAttribution,scope:this});OpenLayers.Control.prototype.destroy.apply(this,arguments);},draw:function(){OpenLayers.Control.prototype.draw.apply(this,arguments);this.map.events.on({'changebaselayer':this.updateAttribution,'changelayer':this.updateAttribution,'addlayer':this.updateAttribution,'removelayer':this.updateAttribution,scope:this});this.updateAttribution();return this.div;},updateAttribution:function(){var attributions=[],attribution;if(this.map&&this.map.layers){for(var i=0,len=this.map.layers.length;i<len;i++){var layer=this.map.layers[i];if(layer.attribution&&layer.getVisibility()){attribution=(typeof layer.attribution=="object")?OpenLayers.String.format(this.layerTemplate,layer.attribution):layer.attribution;if(OpenLayers.Util.indexOf(attributions,attribution)===-1){attributions.push(attribution);}}}
this.div.innerHTML=OpenLayers.String.format(this.template,{layers:attributions.join(this.separator)});}},CLASS_NAME:"OpenLayers.Control.Attribution"});OpenLayers.Handler=OpenLayers.Class({id:null,control:null,map:null,keyMask:null,active:false,evt:null,touch:false,initialize:function(control,callbacks,options){OpenLayers.Util.extend(this,options);this.control=control;this.callbacks=callbacks;var map=this.map||control.map;if(map){this.setMap(map);}
this.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME+"_");},setMap:function(map){this.map=map;},checkModifiers:function(evt){if(this.keyMask==null){return true;}
var keyModifiers=(evt.shiftKey?OpenLayers.Handler.MOD_SHIFT:0)|(evt.ctrlKey?OpenLayers.Handler.MOD_CTRL:0)|(evt.altKey?OpenLayers.Handler.MOD_ALT:0)|(evt.metaKey?OpenLayers.Handler.MOD_META:0);return(keyModifiers==this.keyMask);},activate:function(){if(this.active){return false;}
var events=OpenLayers.Events.prototype.BROWSER_EVENTS;for(var i=0,len=events.length;i<len;i++){if(this[events[i]]){this.register(events[i],this[events[i]]);}}
this.active=true;return true;},deactivate:function(){if(!this.active){return false;}
var events=OpenLayers.Events.prototype.BROWSER_EVENTS;for(var i=0,len=events.length;i<len;i++){if(this[events[i]]){this.unregister(events[i],this[events[i]]);}}
this.touch=false;this.active=false;return true;},startTouch:function(){if(!this.touch){this.touch=true;var events=["mousedown","mouseup","mousemove","click","dblclick","mouseout"];for(var i=0,len=events.length;i<len;i++){if(this[events[i]]){this.unregister(events[i],this[events[i]]);}}}},callback:function(name,args){if(name&&this.callbacks[name]){this.callbacks[name].apply(this.control,args);}},register:function(name,method){this.map.events.registerPriority(name,this,method);this.map.events.registerPriority(name,this,this.setEvent);},unregister:function(name,method){this.map.events.unregister(name,this,method);this.map.events.unregister(name,this,this.setEvent);},setEvent:function(evt){this.evt=evt;return true;},destroy:function(){this.deactivate();this.control=this.map=null;},CLASS_NAME:"OpenLayers.Handler"});OpenLayers.Handler.MOD_NONE=0;OpenLayers.Handler.MOD_SHIFT=1;OpenLayers.Handler.MOD_CTRL=2;OpenLayers.Handler.MOD_ALT=4;OpenLayers.Handler.MOD_META=8;OpenLayers.Handler.Click=OpenLayers.Class(OpenLayers.Handler,{delay:300,single:true,'double':false,pixelTolerance:0,dblclickTolerance:13,stopSingle:false,stopDouble:false,timerId:null,down:null,last:null,first:null,rightclickTimerId:null,touchstart:function(evt){this.startTouch();this.down=this.getEventInfo(evt);this.last=this.getEventInfo(evt);return true;},touchmove:function(evt){this.last=this.getEventInfo(evt);return true;},touchend:function(evt){if(this.down){evt.xy=this.last.xy;evt.lastTouches=this.last.touches;this.handleSingle(evt);this.down=null;}
return true;},mousedown:function(evt){this.down=this.getEventInfo(evt);this.last=this.getEventInfo(evt);return true;},mouseup:function(evt){var propagate=true;if(this.checkModifiers(evt)&&this.control.handleRightClicks&&OpenLayers.Event.isRightClick(evt)){propagate=this.rightclick(evt);}
return propagate;},rightclick:function(evt){if(this.passesTolerance(evt)){if(this.rightclickTimerId!=null){this.clearTimer();this.callback('dblrightclick',[evt]);return!this.stopDouble;}else{var clickEvent=this['double']?OpenLayers.Util.extend({},evt):this.callback('rightclick',[evt]);var delayedRightCall=OpenLayers.Function.bind(this.delayedRightCall,this,clickEvent);this.rightclickTimerId=window.setTimeout(delayedRightCall,this.delay);}}
return!this.stopSingle;},delayedRightCall:function(evt){this.rightclickTimerId=null;if(evt){this.callback('rightclick',[evt]);}},click:function(evt){if(!this.last){this.last=this.getEventInfo(evt);}
this.handleSingle(evt);return!this.stopSingle;},dblclick:function(evt){this.handleDouble(evt);return!this.stopDouble;},handleDouble:function(evt){if(this.passesDblclickTolerance(evt)){if(this["double"]){this.callback("dblclick",[evt]);}
this.clearTimer();}},handleSingle:function(evt){if(this.passesTolerance(evt)){if(this.timerId!=null){if(this.last.touches&&this.last.touches.length===1){if(this["double"]){OpenLayers.Event.preventDefault(evt);}
this.handleDouble(evt);}
if(!this.last.touches||this.last.touches.length!==2){this.clearTimer();}}else{this.first=this.getEventInfo(evt);var clickEvent=this.single?OpenLayers.Util.extend({},evt):null;this.queuePotentialClick(clickEvent);}}},queuePotentialClick:function(evt){this.timerId=window.setTimeout(OpenLayers.Function.bind(this.delayedCall,this,evt),this.delay);},passesTolerance:function(evt){var passes=true;if(this.pixelTolerance!=null&&this.down&&this.down.xy){passes=this.pixelTolerance>=this.down.xy.distanceTo(evt.xy);if(passes&&this.touch&&this.down.touches.length===this.last.touches.length){for(var i=0,ii=this.down.touches.length;i<ii;++i){if(this.getTouchDistance(this.down.touches[i],this.last.touches[i])>this.pixelTolerance){passes=false;break;}}}}
return passes;},getTouchDistance:function(from,to){return Math.sqrt(Math.pow(from.clientX-to.clientX,2)+
Math.pow(from.clientY-to.clientY,2));},passesDblclickTolerance:function(evt){var passes=true;if(this.down&&this.first){passes=this.down.xy.distanceTo(this.first.xy)<=this.dblclickTolerance;}
return passes;},clearTimer:function(){if(this.timerId!=null){window.clearTimeout(this.timerId);this.timerId=null;}
if(this.rightclickTimerId!=null){window.clearTimeout(this.rightclickTimerId);this.rightclickTimerId=null;}},delayedCall:function(evt){this.timerId=null;if(evt){this.callback("click",[evt]);}},getEventInfo:function(evt){var touches;if(evt.touches){var len=evt.touches.length;touches=new Array(len);var touch;for(var i=0;i<len;i++){touch=evt.touches[i];touches[i]={clientX:touch.olClientX,clientY:touch.olClientY};}}
return{xy:evt.xy,touches:touches};},deactivate:function(){var deactivated=false;if(OpenLayers.Handler.prototype.deactivate.apply(this,arguments)){this.clearTimer();this.down=null;this.first=null;this.last=null;deactivated=true;}
return deactivated;},CLASS_NAME:"OpenLayers.Handler.Click"});OpenLayers.Kinetic=OpenLayers.Class({threshold:0,deceleration:0.0035,nbPoints:100,delay:200,points:undefined,timerId:undefined,initialize:function(options){OpenLayers.Util.extend(this,options);},begin:function(){OpenLayers.Animation.stop(this.timerId);this.timerId=undefined;this.points=[];},update:function(xy){this.points.unshift({xy:xy,tick:new Date().getTime()});if(this.points.length>this.nbPoints){this.points.pop();}},end:function(xy){var last,now=new Date().getTime();for(var i=0,l=this.points.length,point;i<l;i++){point=this.points[i];if(now-point.tick>this.delay){break;}
last=point;}
if(!last){return;}
var time=new Date().getTime()-last.tick;var dist=Math.sqrt(Math.pow(xy.x-last.xy.x,2)+
Math.pow(xy.y-last.xy.y,2));var speed=dist/time;if(speed==0||speed<this.threshold){return;}
var theta=Math.asin((xy.y-last.xy.y)/dist);if(last.xy.x<=xy.x){theta=Math.PI-theta;}
return{speed:speed,theta:theta};},move:function(info,callback){var v0=info.speed;var fx=Math.cos(info.theta);var fy=-Math.sin(info.theta);var initialTime=new Date().getTime();var lastX=0;var lastY=0;var timerCallback=function(){if(this.timerId==null){return;}
var t=new Date().getTime()-initialTime;var p=(-this.deceleration*Math.pow(t,2))/2.0+v0*t;var x=p*fx;var y=p*fy;var args={};args.end=false;var v=-this.deceleration*t+v0;if(v<=0){OpenLayers.Animation.stop(this.timerId);this.timerId=null;args.end=true;}
args.x=x-lastX;args.y=y-lastY;lastX=x;lastY=y;callback(args.x,args.y,args.end);};this.timerId=OpenLayers.Animation.start(OpenLayers.Function.bind(timerCallback,this));},CLASS_NAME:"OpenLayers.Kinetic"});OpenLayers.Handler.Drag=OpenLayers.Class(OpenLayers.Handler,{started:false,stopDown:true,dragging:false,last:null,start:null,lastMoveEvt:null,oldOnselectstart:null,interval:0,timeoutId:null,documentDrag:false,documentEvents:null,initialize:function(control,callbacks,options){OpenLayers.Handler.prototype.initialize.apply(this,arguments);if(this.documentDrag===true){var me=this;this._docMove=function(evt){me.mousemove({xy:{x:evt.clientX,y:evt.clientY},element:document});};this._docUp=function(evt){me.mouseup({xy:{x:evt.clientX,y:evt.clientY}});};}},dragstart:function(evt){var propagate=true;this.dragging=false;if(this.checkModifiers(evt)&&this._pointerId==evt.pointerId&&(OpenLayers.Event.isLeftClick(evt)||OpenLayers.Event.isSingleTouch(evt))){this.started=true;this.start=evt.xy;this.last=evt.xy;OpenLayers.Element.addClass(this.map.viewPortDiv,"olDragDown");this.down(evt);this.callback("down",[evt.xy]);OpenLayers.Event.preventDefault(evt);if(!this.oldOnselectstart){this.oldOnselectstart=document.onselectstart?document.onselectstart:OpenLayers.Function.True;}
document.onselectstart=OpenLayers.Function.False;propagate=!this.stopDown;}else{delete this._pointerId;this.started=false;this.start=null;this.last=null;}
return propagate;},dragmove:function(evt){this.lastMoveEvt=evt;if(this.started&&this._pointerId==evt.pointerId&&!this.timeoutId&&(evt.xy.x!=this.last.x||evt.xy.y!=this.last.y)){if(this.documentDrag===true&&this.documentEvents){if(evt.element===document){this.adjustXY(evt);this.setEvent(evt);}else{this.removeDocumentEvents();}}
if(this.interval>0){this.timeoutId=setTimeout(OpenLayers.Function.bind(this.removeTimeout,this),this.interval);}
this.dragging=true;this.move(evt);this.callback("move",[evt.xy]);if(!this.oldOnselectstart){this.oldOnselectstart=document.onselectstart;document.onselectstart=OpenLayers.Function.False;}
this.last=evt.xy;}
return true;},dragend:function(evt){if(this.started&&this._pointerId==evt.pointerId){if(this.documentDrag===true&&this.documentEvents){this.adjustXY(evt);this.removeDocumentEvents();}
var dragged=(this.start!=this.last);this.started=false;this.dragging=false;delete this._pointerId;OpenLayers.Element.removeClass(this.map.viewPortDiv,"olDragDown");this.up(evt);this.callback("up",[evt.xy]);if(dragged){this.callback("done",[evt.xy]);}
document.onselectstart=this.oldOnselectstart;}
return true;},down:function(evt){},move:function(evt){},up:function(evt){},out:function(evt){},mousedown:function(evt){return this.dragstart(evt);},touchstart:function(evt){this.startTouch();if(!("_pointerId"in this)){this._pointerId=evt.pointerId;}
return this.dragstart(evt);},mousemove:function(evt){return this.dragmove(evt);},touchmove:function(evt){return this.dragmove(evt);},removeTimeout:function(){this.timeoutId=null;if(this.dragging){this.mousemove(this.lastMoveEvt);}},mouseup:function(evt){return this.dragend(evt);},touchend:function(evt){evt.xy=this.last;return this.dragend(evt);},mouseout:function(evt){if(this.started&&OpenLayers.Util.mouseLeft(evt,this.map.viewPortDiv)){if(this.documentDrag===true){this.addDocumentEvents();}else{var dragged=(this.start!=this.last);this.started=false;this.dragging=false;OpenLayers.Element.removeClass(this.map.viewPortDiv,"olDragDown");this.out(evt);this.callback("out",[]);if(dragged){this.callback("done",[evt.xy]);}
if(document.onselectstart){document.onselectstart=this.oldOnselectstart;}}}
return true;},click:function(evt){return(this.start==this.last);},activate:function(){var activated=false;if(OpenLayers.Handler.prototype.activate.apply(this,arguments)){this.dragging=false;activated=true;}
return activated;},deactivate:function(){var deactivated=false;if(OpenLayers.Handler.prototype.deactivate.apply(this,arguments)){this.started=false;this.dragging=false;this.start=null;this.last=null;deactivated=true;OpenLayers.Element.removeClass(this.map.viewPortDiv,"olDragDown");}
return deactivated;},adjustXY:function(evt){var pos=OpenLayers.Util.pagePosition(this.map.viewPortDiv);evt.xy.x-=pos[0];evt.xy.y-=pos[1];},addDocumentEvents:function(){OpenLayers.Element.addClass(document.body,"olDragDown");this.documentEvents=true;OpenLayers.Event.observe(document,"mousemove",this._docMove);OpenLayers.Event.observe(document,"mouseup",this._docUp);},removeDocumentEvents:function(){OpenLayers.Element.removeClass(document.body,"olDragDown");this.documentEvents=false;OpenLayers.Event.stopObserving(document,"mousemove",this._docMove);OpenLayers.Event.stopObserving(document,"mouseup",this._docUp);},CLASS_NAME:"OpenLayers.Handler.Drag"});OpenLayers.Handler.Feature=OpenLayers.Class(OpenLayers.Handler,{EVENTMAP:{'click':{'in':'click','out':'clickout'},'mousemove':{'in':'over','out':'out'},'dblclick':{'in':'dblclick','out':null},'mousedown':{'in':null,'out':null},'mouseup':{'in':null,'out':null},'touchstart':{'in':'click','out':'clickout'}},feature:null,lastFeature:null,down:null,up:null,clickTolerance:4,geometryTypes:null,stopClick:true,stopDown:true,stopUp:false,initialize:function(control,layer,callbacks,options){OpenLayers.Handler.prototype.initialize.apply(this,[control,callbacks,options]);this.layer=layer;},touchstart:function(evt){this.startTouch();return OpenLayers.Event.isMultiTouch(evt)?true:this.mousedown(evt);},touchmove:function(evt){OpenLayers.Event.preventDefault(evt);},mousedown:function(evt){if(OpenLayers.Event.isLeftClick(evt)||OpenLayers.Event.isSingleTouch(evt)){this.down=evt.xy;}
return this.handle(evt)?!this.stopDown:true;},mouseup:function(evt){this.up=evt.xy;return this.handle(evt)?!this.stopUp:true;},click:function(evt){return this.handle(evt)?!this.stopClick:true;},mousemove:function(evt){if(!this.callbacks['over']&&!this.callbacks['out']){return true;}
this.handle(evt);return true;},dblclick:function(evt){return!this.handle(evt);},geometryTypeMatches:function(feature){return this.geometryTypes==null||OpenLayers.Util.indexOf(this.geometryTypes,feature.geometry.CLASS_NAME)>-1;},handle:function(evt){if(this.feature&&!this.feature.layer){this.feature=null;}
var type=evt.type;var handled=false;var previouslyIn=!!(this.feature);var click=(type=="click"||type=="dblclick"||type=="touchstart");this.feature=this.layer.getFeatureFromEvent(evt);if(this.feature&&!this.feature.layer){this.feature=null;}
if(this.lastFeature&&!this.lastFeature.layer){this.lastFeature=null;}
if(this.feature){if(type==="touchstart"){OpenLayers.Event.preventDefault(evt);}
var inNew=(this.feature!=this.lastFeature);if(this.geometryTypeMatches(this.feature)){if(previouslyIn&&inNew){if(this.lastFeature){this.triggerCallback(type,'out',[this.lastFeature]);}
this.triggerCallback(type,'in',[this.feature]);}else if(!previouslyIn||click){this.triggerCallback(type,'in',[this.feature]);}
this.lastFeature=this.feature;handled=true;}else{if(this.lastFeature&&(previouslyIn&&inNew||click)){this.triggerCallback(type,'out',[this.lastFeature]);}
this.feature=null;}}else if(this.lastFeature&&(previouslyIn||click)){this.triggerCallback(type,'out',[this.lastFeature]);}
return handled;},triggerCallback:function(type,mode,args){var key=this.EVENTMAP[type][mode];if(key){if(type=='click'&&this.up&&this.down){var dpx=Math.sqrt(Math.pow(this.up.x-this.down.x,2)+
Math.pow(this.up.y-this.down.y,2));if(dpx<=this.clickTolerance){this.callback(key,args);}
this.up=this.down=null;}else{this.callback(key,args);}}},activate:function(){var activated=false;if(OpenLayers.Handler.prototype.activate.apply(this,arguments)){this.moveLayerToTop();this.map.events.on({"removelayer":this.handleMapEvents,"changelayer":this.handleMapEvents,scope:this});activated=true;}
return activated;},deactivate:function(){var deactivated=false;if(OpenLayers.Handler.prototype.deactivate.apply(this,arguments)){this.moveLayerBack();this.feature=null;this.lastFeature=null;this.down=null;this.up=null;this.map.events.un({"removelayer":this.handleMapEvents,"changelayer":this.handleMapEvents,scope:this});deactivated=true;}
return deactivated;},handleMapEvents:function(evt){if(evt.type=="removelayer"||evt.property=="order"){this.moveLayerToTop();}},moveLayerToTop:function(){var index=Math.max(this.map.Z_INDEX_BASE['Feature']-1,this.layer.getZIndex())+1;this.layer.setZIndex(index);},moveLayerBack:function(){var index=this.layer.getZIndex()-1;if(index>=this.map.Z_INDEX_BASE['Feature']){this.layer.setZIndex(index);}else{this.map.setLayerZIndex(this.layer,this.map.getLayerIndex(this.layer));}},CLASS_NAME:"OpenLayers.Handler.Feature"});OpenLayers.Control.DragFeature=OpenLayers.Class(OpenLayers.Control,{geometryTypes:null,onStart:function(feature,pixel){},onDrag:function(feature,pixel){},onComplete:function(feature,pixel){},onEnter:function(feature){},onLeave:function(feature){},documentDrag:false,layer:null,feature:null,dragCallbacks:{},featureCallbacks:{},lastPixel:null,initialize:function(layer,options){OpenLayers.Control.prototype.initialize.apply(this,[options]);this.layer=layer;this.handlers={drag:new OpenLayers.Handler.Drag(this,OpenLayers.Util.extend({down:this.downFeature,move:this.moveFeature,up:this.upFeature,out:this.cancel,done:this.doneDragging},this.dragCallbacks),{documentDrag:this.documentDrag}),feature:new OpenLayers.Handler.Feature(this,this.layer,OpenLayers.Util.extend({click:this.clickFeature,clickout:this.clickoutFeature,over:this.overFeature,out:this.outFeature},this.featureCallbacks),{geometryTypes:this.geometryTypes})};},clickFeature:function(feature){if(this.handlers.feature.touch&&!this.over&&this.overFeature(feature)){this.handlers.drag.dragstart(this.handlers.feature.evt);this.handlers.drag.stopDown=false;}},clickoutFeature:function(feature){if(this.handlers.feature.touch&&this.over){this.outFeature(feature);this.handlers.drag.stopDown=true;}},destroy:function(){this.layer=null;OpenLayers.Control.prototype.destroy.apply(this,[]);},activate:function(){return(this.handlers.feature.activate()&&OpenLayers.Control.prototype.activate.apply(this,arguments));},deactivate:function(){this.handlers.drag.deactivate();this.handlers.feature.deactivate();this.feature=null;this.dragging=false;this.lastPixel=null;OpenLayers.Element.removeClass(this.map.viewPortDiv,this.displayClass+"Over");return OpenLayers.Control.prototype.deactivate.apply(this,arguments);},overFeature:function(feature){var activated=false;if(!this.handlers.drag.dragging){this.feature=feature;this.handlers.drag.activate();activated=true;this.over=true;OpenLayers.Element.addClass(this.map.viewPortDiv,this.displayClass+"Over");this.onEnter(feature);}else{if(this.feature.id==feature.id){this.over=true;}else{this.over=false;}}
return activated;},downFeature:function(pixel){this.lastPixel=pixel;this.onStart(this.feature,pixel);},moveFeature:function(pixel){var res=this.map.getResolution();this.feature.geometry.move(res*(pixel.x-this.lastPixel.x),res*(this.lastPixel.y-pixel.y));this.layer.drawFeature(this.feature);this.lastPixel=pixel;this.onDrag(this.feature,pixel);},upFeature:function(pixel){if(!this.over){this.handlers.drag.deactivate();}},doneDragging:function(pixel){this.onComplete(this.feature,pixel);},outFeature:function(feature){if(!this.handlers.drag.dragging){this.over=false;this.handlers.drag.deactivate();OpenLayers.Element.removeClass(this.map.viewPortDiv,this.displayClass+"Over");this.onLeave(feature);this.feature=null;}else{if(this.feature.id==feature.id){this.over=false;}}},cancel:function(){this.handlers.drag.deactivate();this.over=false;},setMap:function(map){this.handlers.drag.setMap(map);this.handlers.feature.setMap(map);OpenLayers.Control.prototype.setMap.apply(this,arguments);},CLASS_NAME:"OpenLayers.Control.DragFeature"});OpenLayers.Handler.Box=OpenLayers.Class(OpenLayers.Handler,{dragHandler:null,boxDivClassName:'olHandlerBoxZoomBox',boxOffsets:null,initialize:function(control,callbacks,options){OpenLayers.Handler.prototype.initialize.apply(this,arguments);this.dragHandler=new OpenLayers.Handler.Drag(this,{down:this.startBox,move:this.moveBox,out:this.removeBox,up:this.endBox},{keyMask:this.keyMask});},destroy:function(){OpenLayers.Handler.prototype.destroy.apply(this,arguments);if(this.dragHandler){this.dragHandler.destroy();this.dragHandler=null;}},setMap:function(map){OpenLayers.Handler.prototype.setMap.apply(this,arguments);if(this.dragHandler){this.dragHandler.setMap(map);}},startBox:function(xy){this.callback("start",[]);this.zoomBox=OpenLayers.Util.createDiv('zoomBox',{x:-9999,y:-9999});this.zoomBox.className=this.boxDivClassName;this.zoomBox.style.zIndex=this.map.Z_INDEX_BASE["Popup"]-1;this.map.viewPortDiv.appendChild(this.zoomBox);OpenLayers.Element.addClass(this.map.viewPortDiv,"olDrawBox");},moveBox:function(xy){var startX=this.dragHandler.start.x;var startY=this.dragHandler.start.y;var deltaX=Math.abs(startX-xy.x);var deltaY=Math.abs(startY-xy.y);var offset=this.getBoxOffsets();this.zoomBox.style.width=(deltaX+offset.width+1)+"px";this.zoomBox.style.height=(deltaY+offset.height+1)+"px";this.zoomBox.style.left=(xy.x<startX?startX-deltaX-offset.left:startX-offset.left)+"px";this.zoomBox.style.top=(xy.y<startY?startY-deltaY-offset.top:startY-offset.top)+"px";},endBox:function(end){var result;if(Math.abs(this.dragHandler.start.x-end.x)>5||Math.abs(this.dragHandler.start.y-end.y)>5){var start=this.dragHandler.start;var top=Math.min(start.y,end.y);var bottom=Math.max(start.y,end.y);var left=Math.min(start.x,end.x);var right=Math.max(start.x,end.x);result=new OpenLayers.Bounds(left,bottom,right,top);}else{result=this.dragHandler.start.clone();}
this.removeBox();this.callback("done",[result]);},removeBox:function(){this.map.viewPortDiv.removeChild(this.zoomBox);this.zoomBox=null;this.boxOffsets=null;OpenLayers.Element.removeClass(this.map.viewPortDiv,"olDrawBox");},activate:function(){if(OpenLayers.Handler.prototype.activate.apply(this,arguments)){this.dragHandler.activate();return true;}else{return false;}},deactivate:function(){if(OpenLayers.Handler.prototype.deactivate.apply(this,arguments)){if(this.dragHandler.deactivate()){if(this.zoomBox){this.removeBox();}}
return true;}else{return false;}},getBoxOffsets:function(){if(!this.boxOffsets){var testDiv=document.createElement("div");testDiv.style.position="absolute";testDiv.style.border="1px solid black";testDiv.style.width="3px";document.body.appendChild(testDiv);var w3cBoxModel=testDiv.clientWidth==3;document.body.removeChild(testDiv);var left=parseInt(OpenLayers.Element.getStyle(this.zoomBox,"border-left-width"));var right=parseInt(OpenLayers.Element.getStyle(this.zoomBox,"border-right-width"));var top=parseInt(OpenLayers.Element.getStyle(this.zoomBox,"border-top-width"));var bottom=parseInt(OpenLayers.Element.getStyle(this.zoomBox,"border-bottom-width"));this.boxOffsets={left:left,right:right,top:top,bottom:bottom,width:w3cBoxModel===false?left+right:0,height:w3cBoxModel===false?top+bottom:0};}
return this.boxOffsets;},CLASS_NAME:"OpenLayers.Handler.Box"});OpenLayers.Control.ZoomBox=OpenLayers.Class(OpenLayers.Control,{type:OpenLayers.Control.TYPE_TOOL,out:false,keyMask:null,alwaysZoom:false,zoomOnClick:true,draw:function(){this.handler=new OpenLayers.Handler.Box(this,{done:this.zoomBox},{keyMask:this.keyMask});},zoomBox:function(position){if(position instanceof OpenLayers.Bounds){var bounds,targetCenterPx=position.getCenterPixel();if(!this.out){var minXY=this.map.getLonLatFromPixel({x:position.left,y:position.bottom});var maxXY=this.map.getLonLatFromPixel({x:position.right,y:position.top});bounds=new OpenLayers.Bounds(minXY.lon,minXY.lat,maxXY.lon,maxXY.lat);}else{var pixWidth=position.right-position.left;var pixHeight=position.bottom-position.top;var zoomFactor=Math.min((this.map.size.h/pixHeight),(this.map.size.w/pixWidth));var extent=this.map.getExtent();var center=this.map.getLonLatFromPixel(targetCenterPx);var xmin=center.lon-(extent.getWidth()/2)*zoomFactor;var xmax=center.lon+(extent.getWidth()/2)*zoomFactor;var ymin=center.lat-(extent.getHeight()/2)*zoomFactor;var ymax=center.lat+(extent.getHeight()/2)*zoomFactor;bounds=new OpenLayers.Bounds(xmin,ymin,xmax,ymax);}
var lastZoom=this.map.getZoom(),size=this.map.getSize(),centerPx={x:size.w/2,y:size.h/2},zoom=this.map.getZoomForExtent(bounds),oldRes=this.map.getResolution(),newRes=this.map.getResolutionForZoom(zoom);if(oldRes==newRes){this.map.setCenter(this.map.getLonLatFromPixel(targetCenterPx));}else{var zoomOriginPx={x:(oldRes*targetCenterPx.x-newRes*centerPx.x)/(oldRes-newRes),y:(oldRes*targetCenterPx.y-newRes*centerPx.y)/(oldRes-newRes)};this.map.zoomTo(zoom,zoomOriginPx);}
if(lastZoom==this.map.getZoom()&&this.alwaysZoom==true){this.map.zoomTo(lastZoom+(this.out?-1:1));}}else if(this.zoomOnClick){if(!this.out){this.map.zoomTo(this.map.getZoom()+1,position);}else{this.map.zoomTo(this.map.getZoom()-1,position);}}},CLASS_NAME:"OpenLayers.Control.ZoomBox"});OpenLayers.Control.DragPan=OpenLayers.Class(OpenLayers.Control,{type:OpenLayers.Control.TYPE_TOOL,panned:false,interval:0,documentDrag:false,kinetic:null,enableKinetic:true,kineticInterval:10,draw:function(){if(this.enableKinetic&&OpenLayers.Kinetic){var config={interval:this.kineticInterval};if(typeof this.enableKinetic==="object"){config=OpenLayers.Util.extend(config,this.enableKinetic);}
this.kinetic=new OpenLayers.Kinetic(config);}
this.handler=new OpenLayers.Handler.Drag(this,{"move":this.panMap,"done":this.panMapDone,"down":this.panMapStart},{interval:this.interval,documentDrag:this.documentDrag});},panMapStart:function(){if(this.kinetic){this.kinetic.begin();}},panMap:function(xy){if(this.kinetic){this.kinetic.update(xy);}
this.panned=true;this.map.pan(this.handler.last.x-xy.x,this.handler.last.y-xy.y,{dragging:true,animate:false});},panMapDone:function(xy){if(this.panned){var res=null;if(this.kinetic){res=this.kinetic.end(xy);}
this.map.pan(this.handler.last.x-xy.x,this.handler.last.y-xy.y,{dragging:!!res,animate:false});if(res){var self=this;this.kinetic.move(res,function(x,y,end){self.map.pan(x,y,{dragging:!end,animate:false});});}
this.panned=false;}},CLASS_NAME:"OpenLayers.Control.DragPan"});OpenLayers.Handler.MouseWheel=OpenLayers.Class(OpenLayers.Handler,{wheelListener:null,interval:0,maxDelta:Number.POSITIVE_INFINITY,delta:0,cumulative:true,initialize:function(control,callbacks,options){OpenLayers.Handler.prototype.initialize.apply(this,arguments);this.wheelListener=OpenLayers.Function.bindAsEventListener(this.onWheelEvent,this);},destroy:function(){OpenLayers.Handler.prototype.destroy.apply(this,arguments);this.wheelListener=null;},onWheelEvent:function(e){if(!this.map||!this.checkModifiers(e)){return;}
var overScrollableDiv=false;var allowScroll=false;var overMapDiv=false;var elem=OpenLayers.Event.element(e);while((elem!=null)&&!overMapDiv&&!overScrollableDiv){if(!overScrollableDiv){try{var overflow;if(elem.currentStyle){overflow=elem.currentStyle["overflow"];}else{var style=document.defaultView.getComputedStyle(elem,null);overflow=style.getPropertyValue("overflow");}
overScrollableDiv=(overflow&&(overflow=="auto")||(overflow=="scroll"));}catch(err){}}
if(!allowScroll){allowScroll=OpenLayers.Element.hasClass(elem,'olScrollable');if(!allowScroll){for(var i=0,len=this.map.layers.length;i<len;i++){var layer=this.map.layers[i];if(elem==layer.div||elem==layer.pane){allowScroll=true;break;}}}}
overMapDiv=(elem==this.map.div);elem=elem.parentNode;}
if(!overScrollableDiv&&overMapDiv){if(allowScroll){var delta=0;if(e.wheelDelta){delta=e.wheelDelta;if(delta%160===0){delta=delta*0.75;}
delta=delta/120;}else if(e.detail){delta=-(e.detail/Math.abs(e.detail));}
this.delta+=delta;window.clearTimeout(this._timeoutId);if(this.interval&&Math.abs(this.delta)<this.maxDelta){var evt=OpenLayers.Util.extend({},e);this._timeoutId=window.setTimeout(OpenLayers.Function.bind(function(){this.wheelZoom(evt);},this),this.interval);}else{this.wheelZoom(e);}}
OpenLayers.Event.stop(e);}},wheelZoom:function(e){var delta=this.delta;this.delta=0;if(delta){e.xy=this.map.events.getMousePosition(e);if(delta<0){this.callback("down",[e,this.cumulative?Math.max(-this.maxDelta,delta):-1]);}else{this.callback("up",[e,this.cumulative?Math.min(this.maxDelta,delta):1]);}}},activate:function(evt){if(OpenLayers.Handler.prototype.activate.apply(this,arguments)){var wheelListener=this.wheelListener;OpenLayers.Event.observe(window,"DOMMouseScroll",wheelListener);OpenLayers.Event.observe(window,"mousewheel",wheelListener);OpenLayers.Event.observe(document,"mousewheel",wheelListener);return true;}else{return false;}},deactivate:function(evt){if(OpenLayers.Handler.prototype.deactivate.apply(this,arguments)){var wheelListener=this.wheelListener;OpenLayers.Event.stopObserving(window,"DOMMouseScroll",wheelListener);OpenLayers.Event.stopObserving(window,"mousewheel",wheelListener);OpenLayers.Event.stopObserving(document,"mousewheel",wheelListener);return true;}else{return false;}},CLASS_NAME:"OpenLayers.Handler.MouseWheel"});OpenLayers.Control.Navigation=OpenLayers.Class(OpenLayers.Control,{dragPan:null,dragPanOptions:null,pinchZoom:null,pinchZoomOptions:null,documentDrag:false,zoomBox:null,zoomBoxEnabled:true,zoomWheelEnabled:true,mouseWheelOptions:null,handleRightClicks:false,zoomBoxKeyMask:OpenLayers.Handler.MOD_SHIFT,autoActivate:true,initialize:function(options){this.handlers={};OpenLayers.Control.prototype.initialize.apply(this,arguments);},destroy:function(){this.deactivate();if(this.dragPan){this.dragPan.destroy();}
this.dragPan=null;if(this.zoomBox){this.zoomBox.destroy();}
this.zoomBox=null;if(this.pinchZoom){this.pinchZoom.destroy();}
this.pinchZoom=null;OpenLayers.Control.prototype.destroy.apply(this,arguments);},activate:function(){this.dragPan.activate();if(this.zoomWheelEnabled){this.handlers.wheel.activate();}
this.handlers.click.activate();if(this.zoomBoxEnabled){this.zoomBox.activate();}
if(this.pinchZoom){this.pinchZoom.activate();}
return OpenLayers.Control.prototype.activate.apply(this,arguments);},deactivate:function(){if(this.pinchZoom){this.pinchZoom.deactivate();}
this.zoomBox.deactivate();this.dragPan.deactivate();this.handlers.click.deactivate();this.handlers.wheel.deactivate();return OpenLayers.Control.prototype.deactivate.apply(this,arguments);},draw:function(){if(this.handleRightClicks){this.map.viewPortDiv.oncontextmenu=OpenLayers.Function.False;}
var clickCallbacks={'click':this.defaultClick,'dblclick':this.defaultDblClick,'dblrightclick':this.defaultDblRightClick};var clickOptions={'double':true,'stopDouble':true};this.handlers.click=new OpenLayers.Handler.Click(this,clickCallbacks,clickOptions);this.dragPan=new OpenLayers.Control.DragPan(OpenLayers.Util.extend({map:this.map,documentDrag:this.documentDrag},this.dragPanOptions));this.zoomBox=new OpenLayers.Control.ZoomBox({map:this.map,keyMask:this.zoomBoxKeyMask});this.dragPan.draw();this.zoomBox.draw();var wheelOptions=this.map.fractionalZoom?{}:{cumulative:false,interval:50,maxDelta:6};this.handlers.wheel=new OpenLayers.Handler.MouseWheel(this,{up:this.wheelUp,down:this.wheelDown},OpenLayers.Util.extend(wheelOptions,this.mouseWheelOptions));if(OpenLayers.Control.PinchZoom){this.pinchZoom=new OpenLayers.Control.PinchZoom(OpenLayers.Util.extend({map:this.map},this.pinchZoomOptions));}},defaultClick:function(evt){if(evt.lastTouches&&evt.lastTouches.length==2){this.map.zoomOut();}},defaultDblClick:function(evt){this.map.zoomTo(this.map.zoom+1,evt.xy);},defaultDblRightClick:function(evt){this.map.zoomTo(this.map.zoom-1,evt.xy);},wheelChange:function(evt,deltaZ){if(!this.map.fractionalZoom){deltaZ=Math.round(deltaZ);}
var currentZoom=this.map.getZoom(),newZoom=currentZoom+deltaZ;newZoom=Math.max(newZoom,0);newZoom=Math.min(newZoom,this.map.getNumZoomLevels());if(newZoom===currentZoom){return;}
this.map.zoomTo(newZoom,evt.xy);},wheelUp:function(evt,delta){this.wheelChange(evt,delta||1);},wheelDown:function(evt,delta){this.wheelChange(evt,delta||-1);},disableZoomBox:function(){this.zoomBoxEnabled=false;this.zoomBox.deactivate();},enableZoomBox:function(){this.zoomBoxEnabled=true;if(this.active){this.zoomBox.activate();}},disableZoomWheel:function(){this.zoomWheelEnabled=false;this.handlers.wheel.deactivate();},enableZoomWheel:function(){this.zoomWheelEnabled=true;if(this.active){this.handlers.wheel.activate();}},CLASS_NAME:"OpenLayers.Control.Navigation"});OpenLayers.Geometry.Point=OpenLayers.Class(OpenLayers.Geometry,{x:null,y:null,initialize:function(x,y){OpenLayers.Geometry.prototype.initialize.apply(this,arguments);this.x=parseFloat(x);this.y=parseFloat(y);},clone:function(obj){if(obj==null){obj=new OpenLayers.Geometry.Point(this.x,this.y);}
OpenLayers.Util.applyDefaults(obj,this);return obj;},calculateBounds:function(){this.bounds=new OpenLayers.Bounds(this.x,this.y,this.x,this.y);},distanceTo:function(geometry,options){var edge=!(options&&options.edge===false);var details=edge&&options&&options.details;var distance,x0,y0,x1,y1,result;if(geometry instanceof OpenLayers.Geometry.Point){x0=this.x;y0=this.y;x1=geometry.x;y1=geometry.y;distance=Math.sqrt(Math.pow(x0-x1,2)+Math.pow(y0-y1,2));result=!details?distance:{x0:x0,y0:y0,x1:x1,y1:y1,distance:distance};}else{result=geometry.distanceTo(this,options);if(details){result={x0:result.x1,y0:result.y1,x1:result.x0,y1:result.y0,distance:result.distance};}}
return result;},equals:function(geom){var equals=false;if(geom!=null){equals=((this.x==geom.x&&this.y==geom.y)||(isNaN(this.x)&&isNaN(this.y)&&isNaN(geom.x)&&isNaN(geom.y)));}
return equals;},toShortString:function(){return(this.x+", "+this.y);},move:function(x,y){this.x=this.x+x;this.y=this.y+y;this.clearBounds();},rotate:function(angle,origin){angle*=Math.PI/180;var radius=this.distanceTo(origin);var theta=angle+Math.atan2(this.y-origin.y,this.x-origin.x);this.x=origin.x+(radius*Math.cos(theta));this.y=origin.y+(radius*Math.sin(theta));this.clearBounds();},getCentroid:function(){return new OpenLayers.Geometry.Point(this.x,this.y);},resize:function(scale,origin,ratio){ratio=(ratio==undefined)?1:ratio;this.x=origin.x+(scale*ratio*(this.x-origin.x));this.y=origin.y+(scale*(this.y-origin.y));this.clearBounds();return this;},intersects:function(geometry){var intersect=false;if(geometry.CLASS_NAME=="OpenLayers.Geometry.Point"){intersect=this.equals(geometry);}else{intersect=geometry.intersects(this);}
return intersect;},transform:function(source,dest){if((source&&dest)){OpenLayers.Projection.transform(this,source,dest);this.bounds=null;}
return this;},getVertices:function(nodes){return[this];},CLASS_NAME:"OpenLayers.Geometry.Point"});OpenLayers.Handler.Point=OpenLayers.Class(OpenLayers.Handler,{point:null,layer:null,multi:false,citeCompliant:false,mouseDown:false,stoppedDown:null,lastDown:null,lastUp:null,persist:false,stopDown:false,stopUp:false,layerOptions:null,pixelTolerance:5,lastTouchPx:null,initialize:function(control,callbacks,options){if(!(options&&options.layerOptions&&options.layerOptions.styleMap)){this.style=OpenLayers.Util.extend(OpenLayers.Feature.Vector.style['default'],{});}
OpenLayers.Handler.prototype.initialize.apply(this,arguments);},activate:function(){if(!OpenLayers.Handler.prototype.activate.apply(this,arguments)){return false;}
var options=OpenLayers.Util.extend({displayInLayerSwitcher:false,calculateInRange:OpenLayers.Function.True,wrapDateLine:this.citeCompliant},this.layerOptions);this.layer=new OpenLayers.Layer.Vector(this.CLASS_NAME,options);this.map.addLayer(this.layer);return true;},createFeature:function(pixel){var lonlat=this.layer.getLonLatFromViewPortPx(pixel);var geometry=new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat);this.point=new OpenLayers.Feature.Vector(geometry);this.callback("create",[this.point.geometry,this.point]);this.point.geometry.clearBounds();this.layer.addFeatures([this.point],{silent:true});},deactivate:function(){if(!OpenLayers.Handler.prototype.deactivate.apply(this,arguments)){return false;}
this.cancel();if(this.layer.map!=null){this.destroyFeature(true);this.layer.destroy(false);}
this.layer=null;return true;},destroyFeature:function(force){if(this.layer&&(force||!this.persist)){this.layer.destroyFeatures();}
this.point=null;},destroyPersistedFeature:function(){var layer=this.layer;if(layer&&layer.features.length>1){this.layer.features[0].destroy();}},finalize:function(cancel){var key=cancel?"cancel":"done";this.mouseDown=false;this.lastDown=null;this.lastUp=null;this.lastTouchPx=null;this.callback(key,[this.geometryClone()]);this.destroyFeature(cancel);},cancel:function(){this.finalize(true);},click:function(evt){OpenLayers.Event.stop(evt);return false;},dblclick:function(evt){OpenLayers.Event.stop(evt);return false;},modifyFeature:function(pixel){if(!this.point){this.createFeature(pixel);}
var lonlat=this.layer.getLonLatFromViewPortPx(pixel);this.point.geometry.x=lonlat.lon;this.point.geometry.y=lonlat.lat;this.callback("modify",[this.point.geometry,this.point,false]);this.point.geometry.clearBounds();this.drawFeature();},drawFeature:function(){this.layer.drawFeature(this.point,this.style);},getGeometry:function(){var geometry=this.point&&this.point.geometry;if(geometry&&this.multi){geometry=new OpenLayers.Geometry.MultiPoint([geometry]);}
return geometry;},geometryClone:function(){var geom=this.getGeometry();return geom&&geom.clone();},mousedown:function(evt){return this.down(evt);},touchstart:function(evt){this.startTouch();this.lastTouchPx=evt.xy;return this.down(evt);},mousemove:function(evt){return this.move(evt);},touchmove:function(evt){this.lastTouchPx=evt.xy;return this.move(evt);},mouseup:function(evt){return this.up(evt);},touchend:function(evt){evt.xy=this.lastTouchPx;return this.up(evt);},down:function(evt){this.mouseDown=true;this.lastDown=evt.xy;if(!this.touch){this.modifyFeature(evt.xy);}
this.stoppedDown=this.stopDown;return!this.stopDown;},move:function(evt){if(!this.touch&&(!this.mouseDown||this.stoppedDown)){this.modifyFeature(evt.xy);}
return true;},up:function(evt){this.mouseDown=false;this.stoppedDown=this.stopDown;if(!this.checkModifiers(evt)){return true;}
if(this.lastUp&&this.lastUp.equals(evt.xy)){return true;}
if(this.lastDown&&this.passesTolerance(this.lastDown,evt.xy,this.pixelTolerance)){if(this.touch){this.modifyFeature(evt.xy);}
if(this.persist){this.destroyPersistedFeature();}
this.lastUp=evt.xy;this.finalize();return!this.stopUp;}else{return true;}},mouseout:function(evt){if(OpenLayers.Util.mouseLeft(evt,this.map.viewPortDiv)){this.stoppedDown=this.stopDown;this.mouseDown=false;}},passesTolerance:function(pixel1,pixel2,tolerance){var passes=true;if(tolerance!=null&&pixel1&&pixel2){var dist=pixel1.distanceTo(pixel2);if(dist>tolerance){passes=false;}}
return passes;},CLASS_NAME:"OpenLayers.Handler.Point"});OpenLayers.Renderer=OpenLayers.Class({container:null,root:null,extent:null,locked:false,size:null,resolution:null,map:null,featureDx:0,initialize:function(containerID,options){this.container=OpenLayers.Util.getElement(containerID);OpenLayers.Util.extend(this,options);},destroy:function(){this.container=null;this.extent=null;this.size=null;this.resolution=null;this.map=null;},supported:function(){return false;},setExtent:function(extent,resolutionChanged){this.extent=extent.clone();if(this.map.baseLayer&&this.map.baseLayer.wrapDateLine){var ratio=extent.getWidth()/this.map.getExtent().getWidth(),extent=extent.scale(1/ratio);this.extent=extent.wrapDateLine(this.map.getMaxExtent()).scale(ratio);}
if(resolutionChanged){this.resolution=null;}
return true;},setSize:function(size){this.size=size.clone();this.resolution=null;},getResolution:function(){this.resolution=this.resolution||this.map.getResolution();return this.resolution;},drawFeature:function(feature,style){if(style==null){style=feature.style;}
if(feature.geometry){var bounds=feature.geometry.getBounds();if(bounds){var worldBounds;if(this.map.baseLayer&&this.map.baseLayer.wrapDateLine){worldBounds=this.map.getMaxExtent();}
if(!bounds.intersectsBounds(this.extent,{worldBounds:worldBounds})){style={display:"none"};}else{this.calculateFeatureDx(bounds,worldBounds);}
var rendered=this.drawGeometry(feature.geometry,style,feature.id);if(style.display!="none"&&style.label&&rendered!==false){var location=feature.geometry.getCentroid();if(style.labelXOffset||style.labelYOffset){var xOffset=isNaN(style.labelXOffset)?0:style.labelXOffset;var yOffset=isNaN(style.labelYOffset)?0:style.labelYOffset;var res=this.getResolution();location.move(xOffset*res,yOffset*res);}
this.drawText(feature.id,style,location);}else{this.removeText(feature.id);}
return rendered;}}},calculateFeatureDx:function(bounds,worldBounds){this.featureDx=0;if(worldBounds){var worldWidth=worldBounds.getWidth(),rendererCenterX=(this.extent.left+this.extent.right)/2,featureCenterX=(bounds.left+bounds.right)/2,worldsAway=Math.round((featureCenterX-rendererCenterX)/worldWidth);this.featureDx=worldsAway*worldWidth;}},drawGeometry:function(geometry,style,featureId){},drawText:function(featureId,style,location){},removeText:function(featureId){},clear:function(){},getFeatureIdFromEvent:function(evt){},eraseFeatures:function(features){if(!(OpenLayers.Util.isArray(features))){features=[features];}
for(var i=0,len=features.length;i<len;++i){var feature=features[i];this.eraseGeometry(feature.geometry,feature.id);this.removeText(feature.id);}},eraseGeometry:function(geometry,featureId){},moveRoot:function(renderer){},getRenderLayerId:function(){return this.container.id;},applyDefaultSymbolizer:function(symbolizer){var result=OpenLayers.Util.extend({},OpenLayers.Renderer.defaultSymbolizer);if(symbolizer.stroke===false){delete result.strokeWidth;delete result.strokeColor;}
if(symbolizer.fill===false){delete result.fillColor;}
OpenLayers.Util.extend(result,symbolizer);return result;},CLASS_NAME:"OpenLayers.Renderer"});OpenLayers.Renderer.defaultSymbolizer={fillColor:"#000000",strokeColor:"#000000",strokeWidth:2,fillOpacity:1,strokeOpacity:1,pointRadius:0,labelAlign:'cm'};OpenLayers.Renderer.symbol={"star":[350,75,379,161,469,161,397,215,423,301,350,250,277,301,303,215,231,161,321,161,350,75],"cross":[4,0,6,0,6,4,10,4,10,6,6,6,6,10,4,10,4,6,0,6,0,4,4,4,4,0],"x":[0,0,25,0,50,35,75,0,100,0,65,50,100,100,75,100,50,65,25,100,0,100,35,50,0,0],"square":[0,0,0,1,1,1,1,0,0,0],"triangle":[0,10,10,10,5,0,0,10]};OpenLayers.StyleMap=OpenLayers.Class({styles:null,extendDefault:true,initialize:function(style,options){this.styles={"default":new OpenLayers.Style(OpenLayers.Feature.Vector.style["default"]),"select":new OpenLayers.Style(OpenLayers.Feature.Vector.style["select"]),"temporary":new OpenLayers.Style(OpenLayers.Feature.Vector.style["temporary"]),"delete":new OpenLayers.Style(OpenLayers.Feature.Vector.style["delete"])};if(style instanceof OpenLayers.Style){this.styles["default"]=style;this.styles["select"]=style;this.styles["temporary"]=style;this.styles["delete"]=style;}else if(typeof style=="object"){for(var key in style){if(style[key]instanceof OpenLayers.Style){this.styles[key]=style[key];}else if(typeof style[key]=="object"){this.styles[key]=new OpenLayers.Style(style[key]);}else{this.styles["default"]=new OpenLayers.Style(style);this.styles["select"]=new OpenLayers.Style(style);this.styles["temporary"]=new OpenLayers.Style(style);this.styles["delete"]=new OpenLayers.Style(style);break;}}}
OpenLayers.Util.extend(this,options);},destroy:function(){for(var key in this.styles){this.styles[key].destroy();}
this.styles=null;},createSymbolizer:function(feature,intent){if(!feature){feature=new OpenLayers.Feature.Vector();}
if(!this.styles[intent]){intent="default";}
feature.renderIntent=intent;var defaultSymbolizer={};if(this.extendDefault&&intent!="default"){defaultSymbolizer=this.styles["default"].createSymbolizer(feature);}
return OpenLayers.Util.extend(defaultSymbolizer,this.styles[intent].createSymbolizer(feature));},addUniqueValueRules:function(renderIntent,property,symbolizers,context){var rules=[];for(var value in symbolizers){rules.push(new OpenLayers.Rule({symbolizer:symbolizers[value],context:context,filter:new OpenLayers.Filter.Comparison({type:OpenLayers.Filter.Comparison.EQUAL_TO,property:property,value:value})}));}
this.styles[renderIntent].addRules(rules);},CLASS_NAME:"OpenLayers.StyleMap"});OpenLayers.Layer.Vector=OpenLayers.Class(OpenLayers.Layer,{isBaseLayer:false,isFixed:false,features:null,filter:null,selectedFeatures:null,unrenderedFeatures:null,reportError:true,style:null,styleMap:null,strategies:null,protocol:null,renderers:['SVG','VML','Canvas'],renderer:null,rendererOptions:null,geometryType:null,drawn:false,ratio:1,initialize:function(name,options){OpenLayers.Layer.prototype.initialize.apply(this,arguments);if(!this.renderer||!this.renderer.supported()){this.assignRenderer();}
if(!this.renderer||!this.renderer.supported()){this.renderer=null;this.displayError();}
if(!this.styleMap){this.styleMap=new OpenLayers.StyleMap();}
this.features=[];this.selectedFeatures=[];this.unrenderedFeatures={};if(this.strategies){for(var i=0,len=this.strategies.length;i<len;i++){this.strategies[i].setLayer(this);}}},destroy:function(){if(this.strategies){var strategy,i,len;for(i=0,len=this.strategies.length;i<len;i++){strategy=this.strategies[i];if(strategy.autoDestroy){strategy.destroy();}}
this.strategies=null;}
if(this.protocol){if(this.protocol.autoDestroy){this.protocol.destroy();}
this.protocol=null;}
this.destroyFeatures();this.features=null;this.selectedFeatures=null;this.unrenderedFeatures=null;if(this.renderer){this.renderer.destroy();}
this.renderer=null;this.geometryType=null;this.drawn=null;OpenLayers.Layer.prototype.destroy.apply(this,arguments);},clone:function(obj){if(obj==null){obj=new OpenLayers.Layer.Vector(this.name,this.getOptions());}
obj=OpenLayers.Layer.prototype.clone.apply(this,[obj]);var features=this.features;var len=features.length;var clonedFeatures=new Array(len);for(var i=0;i<len;++i){clonedFeatures[i]=features[i].clone();}
obj.features=clonedFeatures;return obj;},refresh:function(obj){if(this.calculateInRange()&&this.visibility){this.events.triggerEvent("refresh",obj);}},assignRenderer:function(){for(var i=0,len=this.renderers.length;i<len;i++){var rendererClass=this.renderers[i];var renderer=(typeof rendererClass=="function")?rendererClass:OpenLayers.Renderer[rendererClass];if(renderer&&renderer.prototype.supported()){this.renderer=new renderer(this.div,this.rendererOptions);break;}}},displayError:function(){if(this.reportError){OpenLayers.Console.userError(OpenLayers.i18n("browserNotSupported",{renderers:this.renderers.join('\n')}));}},setMap:function(map){OpenLayers.Layer.prototype.setMap.apply(this,arguments);if(!this.renderer){this.map.removeLayer(this);}else{this.renderer.map=this.map;var newSize=this.map.getSize();newSize.w=newSize.w*this.ratio;newSize.h=newSize.h*this.ratio;this.renderer.setSize(newSize);}},afterAdd:function(){if(this.strategies){var strategy,i,len;for(i=0,len=this.strategies.length;i<len;i++){strategy=this.strategies[i];if(strategy.autoActivate){strategy.activate();}}}},removeMap:function(map){this.drawn=false;if(this.strategies){var strategy,i,len;for(i=0,len=this.strategies.length;i<len;i++){strategy=this.strategies[i];if(strategy.autoActivate){strategy.deactivate();}}}},onMapResize:function(){OpenLayers.Layer.prototype.onMapResize.apply(this,arguments);var newSize=this.map.getSize();newSize.w=newSize.w*this.ratio;newSize.h=newSize.h*this.ratio;this.renderer.setSize(newSize);},moveTo:function(bounds,zoomChanged,dragging){OpenLayers.Layer.prototype.moveTo.apply(this,arguments);var coordSysUnchanged=true;if(!dragging){this.renderer.root.style.visibility='hidden';var viewSize=this.map.getSize(),viewWidth=viewSize.w,viewHeight=viewSize.h,offsetLeft=(viewWidth/2*this.ratio)-viewWidth/2,offsetTop=(viewHeight/2*this.ratio)-viewHeight/2;offsetLeft+=this.map.layerContainerOriginPx.x;offsetLeft=-Math.round(offsetLeft);offsetTop+=this.map.layerContainerOriginPx.y;offsetTop=-Math.round(offsetTop);this.div.style.left=offsetLeft+'px';this.div.style.top=offsetTop+'px';var extent=this.map.getExtent().scale(this.ratio);coordSysUnchanged=this.renderer.setExtent(extent,zoomChanged);this.renderer.root.style.visibility='visible';if(OpenLayers.IS_GECKO===true){this.div.scrollLeft=this.div.scrollLeft;}
if(!zoomChanged&&coordSysUnchanged){for(var i in this.unrenderedFeatures){var feature=this.unrenderedFeatures[i];this.drawFeature(feature);}}}
if(!this.drawn||zoomChanged||!coordSysUnchanged){this.drawn=true;var feature;for(var i=0,len=this.features.length;i<len;i++){this.renderer.locked=(i!==(len-1));feature=this.features[i];this.drawFeature(feature);}}},display:function(display){OpenLayers.Layer.prototype.display.apply(this,arguments);var currentDisplay=this.div.style.display;if(currentDisplay!=this.renderer.root.style.display){this.renderer.root.style.display=currentDisplay;}},addFeatures:function(features,options){if(!(OpenLayers.Util.isArray(features))){features=[features];}
var notify=!options||!options.silent;if(notify){var event={features:features};var ret=this.events.triggerEvent("beforefeaturesadded",event);if(ret===false){return;}
features=event.features;}
var featuresAdded=[];for(var i=0,len=features.length;i<len;i++){if(i!=(features.length-1)){this.renderer.locked=true;}else{this.renderer.locked=false;}
var feature=features[i];if(this.geometryType&&!(feature.geometry instanceof this.geometryType)){throw new TypeError('addFeatures: component should be an '+
this.geometryType.prototype.CLASS_NAME);}
feature.layer=this;if(!feature.style&&this.style){feature.style=OpenLayers.Util.extend({},this.style);}
if(notify){if(this.events.triggerEvent("beforefeatureadded",{feature:feature})===false){continue;}
this.preFeatureInsert(feature);}
featuresAdded.push(feature);this.features.push(feature);this.drawFeature(feature);if(notify){this.events.triggerEvent("featureadded",{feature:feature});this.onFeatureInsert(feature);}}
if(notify){this.events.triggerEvent("featuresadded",{features:featuresAdded});}},removeFeatures:function(features,options){if(!features||features.length===0){return;}
if(features===this.features){return this.removeAllFeatures(options);}
if(!(OpenLayers.Util.isArray(features))){features=[features];}
if(features===this.selectedFeatures){features=features.slice();}
var notify=!options||!options.silent;if(notify){this.events.triggerEvent("beforefeaturesremoved",{features:features});}
for(var i=features.length-1;i>=0;i--){if(i!=0&&features[i-1].geometry){this.renderer.locked=true;}else{this.renderer.locked=false;}
var feature=features[i];delete this.unrenderedFeatures[feature.id];if(notify){this.events.triggerEvent("beforefeatureremoved",{feature:feature});}
this.features=OpenLayers.Util.removeItem(this.features,feature);feature.layer=null;if(feature.geometry){this.renderer.eraseFeatures(feature);}
if(OpenLayers.Util.indexOf(this.selectedFeatures,feature)!=-1){OpenLayers.Util.removeItem(this.selectedFeatures,feature);}
if(notify){this.events.triggerEvent("featureremoved",{feature:feature});}}
if(notify){this.events.triggerEvent("featuresremoved",{features:features});}},removeAllFeatures:function(options){var notify=!options||!options.silent;var features=this.features;if(notify){this.events.triggerEvent("beforefeaturesremoved",{features:features});}
var feature;for(var i=features.length-1;i>=0;i--){feature=features[i];if(notify){this.events.triggerEvent("beforefeatureremoved",{feature:feature});}
feature.layer=null;if(notify){this.events.triggerEvent("featureremoved",{feature:feature});}}
this.renderer.clear();this.features=[];this.unrenderedFeatures={};this.selectedFeatures=[];if(notify){this.events.triggerEvent("featuresremoved",{features:features});}},destroyFeatures:function(features,options){var all=(features==undefined);if(all){features=this.features;}
if(features){this.removeFeatures(features,options);for(var i=features.length-1;i>=0;i--){features[i].destroy();}}},drawFeature:function(feature,style){if(!this.drawn){return;}
if(typeof style!="object"){if(!style&&feature.state===OpenLayers.State.DELETE){style="delete";}
var renderIntent=style||feature.renderIntent;style=feature.style||this.style;if(!style){style=this.styleMap.createSymbolizer(feature,renderIntent);}}
var drawn=this.renderer.drawFeature(feature,style);if(drawn===false||drawn===null){this.unrenderedFeatures[feature.id]=feature;}else{delete this.unrenderedFeatures[feature.id];}},eraseFeatures:function(features){this.renderer.eraseFeatures(features);},getFeatureFromEvent:function(evt){if(!this.renderer){throw new Error('getFeatureFromEvent called on layer with no '+'renderer. This usually means you destroyed a '+'layer, but not some handler which is associated '+'with it.');}
var feature=null;var featureId=this.renderer.getFeatureIdFromEvent(evt);if(featureId){if(typeof featureId==="string"){feature=this.getFeatureById(featureId);}else{feature=featureId;}}
return feature;},getFeatureBy:function(property,value){var feature=null;for(var i=0,len=this.features.length;i<len;++i){if(this.features[i][property]==value){feature=this.features[i];break;}}
return feature;},getFeatureById:function(featureId){return this.getFeatureBy('id',featureId);},getFeatureByFid:function(featureFid){return this.getFeatureBy('fid',featureFid);},getFeaturesByAttribute:function(attrName,attrValue){var i,feature,len=this.features.length,foundFeatures=[];for(i=0;i<len;i++){feature=this.features[i];if(feature&&feature.attributes){if(feature.attributes[attrName]===attrValue){foundFeatures.push(feature);}}}
return foundFeatures;},onFeatureInsert:function(feature){},preFeatureInsert:function(feature){},getDataExtent:function(){var maxExtent=null;var features=this.features;if(features&&(features.length>0)){var geometry=null;for(var i=0,len=features.length;i<len;i++){geometry=features[i].geometry;if(geometry){if(maxExtent===null){maxExtent=new OpenLayers.Bounds();}
maxExtent.extend(geometry.getBounds());}}}
return maxExtent;},CLASS_NAME:"OpenLayers.Layer.Vector"});OpenLayers.Layer.Vector.RootContainer=OpenLayers.Class(OpenLayers.Layer.Vector,{displayInLayerSwitcher:false,layers:null,display:function(){},getFeatureFromEvent:function(evt){var layers=this.layers;var feature;for(var i=0;i<layers.length;i++){feature=layers[i].getFeatureFromEvent(evt);if(feature){return feature;}}},setMap:function(map){OpenLayers.Layer.Vector.prototype.setMap.apply(this,arguments);this.collectRoots();map.events.register("changelayer",this,this.handleChangeLayer);},removeMap:function(map){map.events.unregister("changelayer",this,this.handleChangeLayer);this.resetRoots();OpenLayers.Layer.Vector.prototype.removeMap.apply(this,arguments);},collectRoots:function(){var layer;for(var i=0;i<this.map.layers.length;++i){layer=this.map.layers[i];if(OpenLayers.Util.indexOf(this.layers,layer)!=-1){layer.renderer.moveRoot(this.renderer);}}},resetRoots:function(){var layer;for(var i=0;i<this.layers.length;++i){layer=this.layers[i];if(this.renderer&&layer.renderer.getRenderLayerId()==this.id){this.renderer.moveRoot(layer.renderer);}}},handleChangeLayer:function(evt){var layer=evt.layer;if(evt.property=="order"&&OpenLayers.Util.indexOf(this.layers,layer)!=-1){this.resetRoots();this.collectRoots();}},CLASS_NAME:"OpenLayers.Layer.Vector.RootContainer"});OpenLayers.Handler.Pinch=OpenLayers.Class(OpenLayers.Handler,{started:false,stopDown:false,pinching:false,last:null,start:null,touchstart:function(evt){var propagate=true;this.pinching=false;if(OpenLayers.Event.isMultiTouch(evt)){this.started=true;this.last=this.start={distance:this.getDistance(evt.touches),delta:0,scale:1};this.callback("start",[evt,this.start]);propagate=!this.stopDown;}else if(this.started){return false;}else{this.started=false;this.start=null;this.last=null;}
OpenLayers.Event.preventDefault(evt);return propagate;},touchmove:function(evt){if(this.started&&OpenLayers.Event.isMultiTouch(evt)){this.pinching=true;var current=this.getPinchData(evt);this.callback("move",[evt,current]);this.last=current;OpenLayers.Event.stop(evt);}else if(this.started){return false;}
return true;},touchend:function(evt){if(this.started&&!OpenLayers.Event.isMultiTouch(evt)){this.started=false;this.pinching=false;this.callback("done",[evt,this.start,this.last]);this.start=null;this.last=null;return false;}
return true;},activate:function(){var activated=false;if(OpenLayers.Handler.prototype.activate.apply(this,arguments)){this.pinching=false;activated=true;}
return activated;},deactivate:function(){var deactivated=false;if(OpenLayers.Handler.prototype.deactivate.apply(this,arguments)){this.started=false;this.pinching=false;this.start=null;this.last=null;deactivated=true;}
return deactivated;},getDistance:function(touches){var t0=touches[0];var t1=touches[1];return Math.sqrt(Math.pow(t0.olClientX-t1.olClientX,2)+
Math.pow(t0.olClientY-t1.olClientY,2));},getPinchData:function(evt){var distance=this.getDistance(evt.touches);var scale=distance/this.start.distance;return{distance:distance,delta:this.last.distance-distance,scale:scale};},CLASS_NAME:"OpenLayers.Handler.Pinch"});OpenLayers.Control.PinchZoom=OpenLayers.Class(OpenLayers.Control,{type:OpenLayers.Control.TYPE_TOOL,pinchOrigin:null,currentCenter:null,autoActivate:true,preserveCenter:false,initialize:function(options){OpenLayers.Control.prototype.initialize.apply(this,arguments);this.handler=new OpenLayers.Handler.Pinch(this,{start:this.pinchStart,move:this.pinchMove,done:this.pinchDone},this.handlerOptions);},pinchStart:function(evt,pinchData){var xy=(this.preserveCenter)?this.map.getPixelFromLonLat(this.map.getCenter()):evt.xy;this.pinchOrigin=xy;this.currentCenter=xy;},pinchMove:function(evt,pinchData){var scale=pinchData.scale;var containerOrigin=this.map.layerContainerOriginPx;var pinchOrigin=this.pinchOrigin;var current=(this.preserveCenter)?this.map.getPixelFromLonLat(this.map.getCenter()):evt.xy;var dx=Math.round((containerOrigin.x+current.x-pinchOrigin.x)+(scale-1)*(containerOrigin.x-pinchOrigin.x));var dy=Math.round((containerOrigin.y+current.y-pinchOrigin.y)+(scale-1)*(containerOrigin.y-pinchOrigin.y));this.map.applyTransform(dx,dy,scale);this.currentCenter=current;},pinchDone:function(evt,start,last){this.map.applyTransform();var zoom=this.map.getZoomForResolution(this.map.getResolution()/last.scale,true);if(zoom!==this.map.getZoom()||!this.currentCenter.equals(this.pinchOrigin)){var resolution=this.map.getResolutionForZoom(zoom);var location=this.map.getLonLatFromPixel(this.pinchOrigin);var zoomPixel=this.currentCenter;var size=this.map.getSize();location.lon+=resolution*((size.w/2)-zoomPixel.x);location.lat-=resolution*((size.h/2)-zoomPixel.y);this.map.div.clientWidth=this.map.div.clientWidth;this.map.setCenter(location,zoom);}},CLASS_NAME:"OpenLayers.Control.PinchZoom"});OpenLayers.Control.TouchNavigation=OpenLayers.Class(OpenLayers.Control,{dragPan:null,dragPanOptions:null,pinchZoom:null,pinchZoomOptions:null,clickHandlerOptions:null,documentDrag:false,autoActivate:true,initialize:function(options){this.handlers={};OpenLayers.Control.prototype.initialize.apply(this,arguments);},destroy:function(){this.deactivate();if(this.dragPan){this.dragPan.destroy();}
this.dragPan=null;if(this.pinchZoom){this.pinchZoom.destroy();delete this.pinchZoom;}
OpenLayers.Control.prototype.destroy.apply(this,arguments);},activate:function(){if(OpenLayers.Control.prototype.activate.apply(this,arguments)){this.dragPan.activate();this.handlers.click.activate();this.pinchZoom.activate();return true;}
return false;},deactivate:function(){if(OpenLayers.Control.prototype.deactivate.apply(this,arguments)){this.dragPan.deactivate();this.handlers.click.deactivate();this.pinchZoom.deactivate();return true;}
return false;},draw:function(){var clickCallbacks={click:this.defaultClick,dblclick:this.defaultDblClick};var clickOptions=OpenLayers.Util.extend({"double":true,stopDouble:true,pixelTolerance:2},this.clickHandlerOptions);this.handlers.click=new OpenLayers.Handler.Click(this,clickCallbacks,clickOptions);this.dragPan=new OpenLayers.Control.DragPan(OpenLayers.Util.extend({map:this.map,documentDrag:this.documentDrag},this.dragPanOptions));this.dragPan.draw();this.pinchZoom=new OpenLayers.Control.PinchZoom(OpenLayers.Util.extend({map:this.map},this.pinchZoomOptions));},defaultClick:function(evt){if(evt.lastTouches&&evt.lastTouches.length==2){this.map.zoomOut();}},defaultDblClick:function(evt){this.map.zoomTo(this.map.zoom+1,evt.xy);},CLASS_NAME:"OpenLayers.Control.TouchNavigation"});OpenLayers.Layer.HTTPRequest=OpenLayers.Class(OpenLayers.Layer,{URL_HASH_FACTOR:(Math.sqrt(5)-1)/2,url:null,params:null,reproject:false,initialize:function(name,url,params,options){OpenLayers.Layer.prototype.initialize.apply(this,[name,options]);this.url=url;if(!this.params){this.params=OpenLayers.Util.extend({},params);}},destroy:function(){this.url=null;this.params=null;OpenLayers.Layer.prototype.destroy.apply(this,arguments);},clone:function(obj){if(obj==null){obj=new OpenLayers.Layer.HTTPRequest(this.name,this.url,this.params,this.getOptions());}
obj=OpenLayers.Layer.prototype.clone.apply(this,[obj]);return obj;},setUrl:function(newUrl){this.url=newUrl;},mergeNewParams:function(newParams){this.params=OpenLayers.Util.extend(this.params,newParams);var ret=this.redraw();if(this.map!=null){this.map.events.triggerEvent("changelayer",{layer:this,property:"params"});}
return ret;},redraw:function(force){if(force){this.events.triggerEvent('refresh');return this.mergeNewParams({"_olSalt":Math.random()});}else{return OpenLayers.Layer.prototype.redraw.apply(this,[]);}},selectUrl:function(paramString,urls){var product=1;for(var i=0,len=paramString.length;i<len;i++){product*=paramString.charCodeAt(i)*this.URL_HASH_FACTOR;product-=Math.floor(product);}
return urls[Math.floor(product*urls.length)];},getFullRequestString:function(newParams,altUrl){var url=altUrl||this.url;var allParams=OpenLayers.Util.extend({},this.params);allParams=OpenLayers.Util.extend(allParams,newParams);var paramsString=OpenLayers.Util.getParameterString(allParams);if(OpenLayers.Util.isArray(url)){url=this.selectUrl(paramsString,url);}
var urlParams=OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters(url));for(var key in allParams){if(key.toUpperCase()in urlParams){delete allParams[key];}}
paramsString=OpenLayers.Util.getParameterString(allParams);return OpenLayers.Util.urlAppend(url,paramsString);},CLASS_NAME:"OpenLayers.Layer.HTTPRequest"});OpenLayers.Tile=OpenLayers.Class({events:null,eventListeners:null,id:null,layer:null,url:null,bounds:null,size:null,position:null,isLoading:false,initialize:function(layer,position,bounds,url,size,options){this.layer=layer;this.position=position.clone();this.setBounds(bounds);this.url=url;if(size){this.size=size.clone();}
this.id=OpenLayers.Util.createUniqueID("Tile_");OpenLayers.Util.extend(this,options);this.events=new OpenLayers.Events(this);if(this.eventListeners instanceof Object){this.events.on(this.eventListeners);}},unload:function(){if(this.isLoading){this.isLoading=false;this.events.triggerEvent("unload");}},destroy:function(){this.layer=null;this.bounds=null;this.size=null;this.position=null;if(this.eventListeners){this.events.un(this.eventListeners);}
this.events.destroy();this.eventListeners=null;this.events=null;},draw:function(force){if(!force){this.clear();}
var draw=this.shouldDraw();if(draw&&!force&&this.events.triggerEvent("beforedraw")===false){draw=null;}
return draw;},shouldDraw:function(){var withinMaxExtent=false,maxExtent=this.layer.maxExtent;if(maxExtent){var map=this.layer.map;var worldBounds=map.baseLayer.wrapDateLine&&map.getMaxExtent();if(this.bounds.intersectsBounds(maxExtent,{inclusive:false,worldBounds:worldBounds})){withinMaxExtent=true;}}
return withinMaxExtent||this.layer.displayOutsideMaxExtent;},setBounds:function(bounds){bounds=bounds.clone();if(this.layer.map.baseLayer.wrapDateLine){var worldExtent=this.layer.map.getMaxExtent(),tolerance=this.layer.map.getResolution();bounds=bounds.wrapDateLine(worldExtent,{leftTolerance:tolerance,rightTolerance:tolerance});}
this.bounds=bounds;},moveTo:function(bounds,position,redraw){if(redraw==null){redraw=true;}
this.setBounds(bounds);this.position=position.clone();if(redraw){this.draw();}},clear:function(draw){},CLASS_NAME:"OpenLayers.Tile"});OpenLayers.Tile.Image=OpenLayers.Class(OpenLayers.Tile,{url:null,imgDiv:null,frame:null,imageReloadAttempts:null,layerAlphaHack:null,asyncRequestId:null,maxGetUrlLength:null,canvasContext:null,crossOriginKeyword:null,initialize:function(layer,position,bounds,url,size,options){OpenLayers.Tile.prototype.initialize.apply(this,arguments);this.url=url;this.layerAlphaHack=this.layer.alpha&&OpenLayers.Util.alphaHack();if(this.maxGetUrlLength!=null||this.layer.gutter||this.layerAlphaHack){this.frame=document.createElement("div");this.frame.style.position="absolute";this.frame.style.overflow="hidden";}
if(this.maxGetUrlLength!=null){OpenLayers.Util.extend(this,OpenLayers.Tile.Image.IFrame);}},destroy:function(){if(this.imgDiv){this.clear();this.imgDiv=null;this.frame=null;}
this.asyncRequestId=null;OpenLayers.Tile.prototype.destroy.apply(this,arguments);},draw:function(){var shouldDraw=OpenLayers.Tile.prototype.draw.apply(this,arguments);if(shouldDraw){if(this.layer!=this.layer.map.baseLayer&&this.layer.reproject){this.bounds=this.getBoundsFromBaseLayer(this.position);}
if(this.isLoading){this._loadEvent="reload";}else{this.isLoading=true;this._loadEvent="loadstart";}
this.renderTile();this.positionTile();}else if(shouldDraw===false){this.unload();}
return shouldDraw;},renderTile:function(){if(this.layer.async){var id=this.asyncRequestId=(this.asyncRequestId||0)+1;this.layer.getURLasync(this.bounds,function(url){if(id==this.asyncRequestId){this.url=url;this.initImage();}},this);}else{this.url=this.layer.getURL(this.bounds);this.initImage();}},positionTile:function(){var style=this.getTile().style,size=this.frame?this.size:this.layer.getImageSize(this.bounds),ratio=1;if(this.layer instanceof OpenLayers.Layer.Grid){ratio=this.layer.getServerResolution()/this.layer.map.getResolution();}
style.left=this.position.x+"px";style.top=this.position.y+"px";style.width=Math.round(ratio*size.w)+"px";style.height=Math.round(ratio*size.h)+"px";},clear:function(){OpenLayers.Tile.prototype.clear.apply(this,arguments);var img=this.imgDiv;if(img){var tile=this.getTile();if(tile.parentNode===this.layer.div){this.layer.div.removeChild(tile);}
this.setImgSrc();if(this.layerAlphaHack===true){img.style.filter="";}
OpenLayers.Element.removeClass(img,"olImageLoadError");}
this.canvasContext=null;},getImage:function(){if(!this.imgDiv){this.imgDiv=OpenLayers.Tile.Image.IMAGE.cloneNode(false);var style=this.imgDiv.style;if(this.frame){var left=0,top=0;if(this.layer.gutter){left=this.layer.gutter/this.layer.tileSize.w*100;top=this.layer.gutter/this.layer.tileSize.h*100;}
style.left=-left+"%";style.top=-top+"%";style.width=(2*left+100)+"%";style.height=(2*top+100)+"%";}
style.visibility="hidden";style.opacity=0;if(this.layer.opacity<1){style.filter='alpha(opacity='+
(this.layer.opacity*100)+')';}
style.position="absolute";if(this.layerAlphaHack){style.paddingTop=style.height;style.height="0";style.width="100%";}
if(this.frame){this.frame.appendChild(this.imgDiv);}}
return this.imgDiv;},setImage:function(img){this.imgDiv=img;},initImage:function(){if(!this.url&&!this.imgDiv){this.isLoading=false;return;}
this.events.triggerEvent('beforeload');this.layer.div.appendChild(this.getTile());this.events.triggerEvent(this._loadEvent);var img=this.getImage();var src=img.getAttribute('src')||'';if(this.url&&OpenLayers.Util.isEquivalentUrl(src,this.url)){this._loadTimeout=window.setTimeout(OpenLayers.Function.bind(this.onImageLoad,this),0);}else{this.stopLoading();if(this.crossOriginKeyword){img.removeAttribute("crossorigin");}
OpenLayers.Event.observe(img,"load",OpenLayers.Function.bind(this.onImageLoad,this));OpenLayers.Event.observe(img,"error",OpenLayers.Function.bind(this.onImageError,this));this.imageReloadAttempts=0;this.setImgSrc(this.url);}},setImgSrc:function(url){var img=this.imgDiv;if(url){img.style.visibility='hidden';img.style.opacity=0;if(this.crossOriginKeyword){if(url.substr(0,5)!=='data:'){img.setAttribute("crossorigin",this.crossOriginKeyword);}else{img.removeAttribute("crossorigin");}}
img.src=url;}else{this.stopLoading();this.imgDiv=null;if(img.parentNode){img.parentNode.removeChild(img);}}},getTile:function(){return this.frame?this.frame:this.getImage();},createBackBuffer:function(){if(!this.imgDiv||this.isLoading){return;}
var backBuffer;if(this.frame){backBuffer=this.frame.cloneNode(false);backBuffer.appendChild(this.imgDiv);}else{backBuffer=this.imgDiv;}
this.imgDiv=null;return backBuffer;},onImageLoad:function(){var img=this.imgDiv;this.stopLoading();img.style.visibility='inherit';img.style.opacity=this.layer.opacity;this.isLoading=false;this.canvasContext=null;this.events.triggerEvent("loadend");if(this.layerAlphaHack===true){img.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+
img.src+"', sizingMethod='scale')";}},onImageError:function(){var img=this.imgDiv;if(img.src!=null){this.imageReloadAttempts++;if(this.imageReloadAttempts<=OpenLayers.IMAGE_RELOAD_ATTEMPTS){this.setImgSrc(this.layer.getURL(this.bounds));}else{OpenLayers.Element.addClass(img,"olImageLoadError");this.events.triggerEvent("loaderror");this.onImageLoad();}}},stopLoading:function(){OpenLayers.Event.stopObservingElement(this.imgDiv);window.clearTimeout(this._loadTimeout);delete this._loadTimeout;},getCanvasContext:function(){if(OpenLayers.CANVAS_SUPPORTED&&this.imgDiv&&!this.isLoading){if(!this.canvasContext){var canvas=document.createElement("canvas");canvas.width=this.size.w;canvas.height=this.size.h;this.canvasContext=canvas.getContext("2d");this.canvasContext.drawImage(this.imgDiv,0,0);}
return this.canvasContext;}},CLASS_NAME:"OpenLayers.Tile.Image"});OpenLayers.Tile.Image.IMAGE=(function(){var img=new Image();img.className="olTileImage";img.galleryImg="no";return img;}());OpenLayers.Layer.Grid=OpenLayers.Class(OpenLayers.Layer.HTTPRequest,{tileSize:null,tileOriginCorner:"bl",tileOrigin:null,tileOptions:null,tileClass:OpenLayers.Tile.Image,grid:null,singleTile:false,ratio:1.5,buffer:0,transitionEffect:"resize",numLoadingTiles:0,serverResolutions:null,loading:false,backBuffer:null,gridResolution:null,backBufferResolution:null,backBufferLonLat:null,backBufferTimerId:null,removeBackBufferDelay:null,className:null,gridLayout:null,rowSign:null,transitionendEvents:['transitionend','webkitTransitionEnd','otransitionend','oTransitionEnd'],initialize:function(name,url,params,options){OpenLayers.Layer.HTTPRequest.prototype.initialize.apply(this,arguments);this.grid=[];this._removeBackBuffer=OpenLayers.Function.bind(this.removeBackBuffer,this);this.initProperties();this.rowSign=this.tileOriginCorner.substr(0,1)==="t"?1:-1;},initProperties:function(){if(this.options.removeBackBufferDelay===undefined){this.removeBackBufferDelay=this.singleTile?0:2500;}
if(this.options.className===undefined){this.className=this.singleTile?'olLayerGridSingleTile':'olLayerGrid';}},setMap:function(map){OpenLayers.Layer.HTTPRequest.prototype.setMap.call(this,map);OpenLayers.Element.addClass(this.div,this.className);},removeMap:function(map){this.removeBackBuffer();},destroy:function(){this.removeBackBuffer();this.clearGrid();this.grid=null;this.tileSize=null;OpenLayers.Layer.HTTPRequest.prototype.destroy.apply(this,arguments);},clearGrid:function(){if(this.grid){for(var iRow=0,len=this.grid.length;iRow<len;iRow++){var row=this.grid[iRow];for(var iCol=0,clen=row.length;iCol<clen;iCol++){var tile=row[iCol];this.destroyTile(tile);}}
this.grid=[];this.gridResolution=null;this.gridLayout=null;}},addOptions:function(newOptions,reinitialize){var singleTileChanged=newOptions.singleTile!==undefined&&newOptions.singleTile!==this.singleTile;OpenLayers.Layer.HTTPRequest.prototype.addOptions.apply(this,arguments);if(this.map&&singleTileChanged){this.initProperties();this.clearGrid();this.tileSize=this.options.tileSize;this.setTileSize();if(this.visibility){this.moveTo(null,true);}}},clone:function(obj){if(obj==null){obj=new OpenLayers.Layer.Grid(this.name,this.url,this.params,this.getOptions());}
obj=OpenLayers.Layer.HTTPRequest.prototype.clone.apply(this,[obj]);if(this.tileSize!=null){obj.tileSize=this.tileSize.clone();}
obj.grid=[];obj.gridResolution=null;obj.backBuffer=null;obj.backBufferTimerId=null;obj.loading=false;obj.numLoadingTiles=0;return obj;},moveTo:function(bounds,zoomChanged,dragging){OpenLayers.Layer.HTTPRequest.prototype.moveTo.apply(this,arguments);bounds=bounds||this.map.getExtent();if(bounds!=null){var forceReTile=!this.grid.length||zoomChanged;var tilesBounds=this.getTilesBounds();var resolution=this.map.getResolution();var serverResolution=this.getServerResolution(resolution);if(this.singleTile){if(forceReTile||(!dragging&&!tilesBounds.containsBounds(bounds))){if(zoomChanged&&this.transitionEffect!=='resize'){this.removeBackBuffer();}
if(!zoomChanged||this.transitionEffect==='resize'){this.applyBackBuffer(resolution);}
this.initSingleTile(bounds);}}else{forceReTile=forceReTile||!tilesBounds.intersectsBounds(bounds,{worldBounds:this.map.baseLayer.wrapDateLine&&this.map.getMaxExtent()});if(forceReTile){if(zoomChanged&&(this.transitionEffect==='resize'||this.gridResolution===resolution)){this.applyBackBuffer(resolution);}
this.initGriddedTiles(bounds);}else{this.moveGriddedTiles();}}}},getTileData:function(loc){var data=null,x=loc.lon,y=loc.lat,numRows=this.grid.length;if(this.map&&numRows){var res=this.map.getResolution(),tileWidth=this.tileSize.w,tileHeight=this.tileSize.h,bounds=this.grid[0][0].bounds,left=bounds.left,top=bounds.top;if(x<left){if(this.map.baseLayer.wrapDateLine){var worldWidth=this.map.getMaxExtent().getWidth();var worldsAway=Math.ceil((left-x)/worldWidth);x+=worldWidth*worldsAway;}}
var dtx=(x-left)/(res*tileWidth);var dty=(top-y)/(res*tileHeight);var col=Math.floor(dtx);var row=Math.floor(dty);if(row>=0&&row<numRows){var tile=this.grid[row][col];if(tile){data={tile:tile,i:Math.floor((dtx-col)*tileWidth),j:Math.floor((dty-row)*tileHeight)};}}}
return data;},destroyTile:function(tile){this.removeTileMonitoringHooks(tile);tile.destroy();},getServerResolution:function(resolution){var distance=Number.POSITIVE_INFINITY;resolution=resolution||this.map.getResolution();if(this.serverResolutions&&OpenLayers.Util.indexOf(this.serverResolutions,resolution)===-1){var i,newDistance,newResolution,serverResolution;for(i=this.serverResolutions.length-1;i>=0;i--){newResolution=this.serverResolutions[i];newDistance=Math.abs(newResolution-resolution);if(newDistance>distance){break;}
distance=newDistance;serverResolution=newResolution;}
resolution=serverResolution;}
return resolution;},getServerZoom:function(){var resolution=this.getServerResolution();return this.serverResolutions?OpenLayers.Util.indexOf(this.serverResolutions,resolution):this.map.getZoomForResolution(resolution)+(this.zoomOffset||0);},applyBackBuffer:function(resolution){if(this.backBufferTimerId!==null){this.removeBackBuffer();}
var backBuffer=this.backBuffer;if(!backBuffer){backBuffer=this.createBackBuffer();if(!backBuffer){return;}
if(resolution===this.gridResolution){this.div.insertBefore(backBuffer,this.div.firstChild);}else{this.map.baseLayer.div.parentNode.insertBefore(backBuffer,this.map.baseLayer.div);}
this.backBuffer=backBuffer;var topLeftTileBounds=this.grid[0][0].bounds;this.backBufferLonLat={lon:topLeftTileBounds.left,lat:topLeftTileBounds.top};this.backBufferResolution=this.gridResolution;}
var ratio=this.backBufferResolution/resolution;var tiles=backBuffer.childNodes,tile;for(var i=tiles.length-1;i>=0;--i){tile=tiles[i];tile.style.top=((ratio*tile._i*backBuffer._th)|0)+'px';tile.style.left=((ratio*tile._j*backBuffer._tw)|0)+'px';tile.style.width=Math.round(ratio*tile._w)+'px';tile.style.height=Math.round(ratio*tile._h)+'px';}
var position=this.getViewPortPxFromLonLat(this.backBufferLonLat,resolution);var leftOffset=this.map.layerContainerOriginPx.x;var topOffset=this.map.layerContainerOriginPx.y;backBuffer.style.left=Math.round(position.x-leftOffset)+'px';backBuffer.style.top=Math.round(position.y-topOffset)+'px';},createBackBuffer:function(){var backBuffer;if(this.grid.length>0){backBuffer=document.createElement('div');backBuffer.id=this.div.id+'_bb';backBuffer.className='olBackBuffer';backBuffer.style.position='absolute';var map=this.map;backBuffer.style.zIndex=this.transitionEffect==='resize'?this.getZIndex()-1:map.Z_INDEX_BASE.BaseLayer-
(map.getNumLayers()-map.getLayerIndex(this));for(var i=0,lenI=this.grid.length;i<lenI;i++){for(var j=0,lenJ=this.grid[i].length;j<lenJ;j++){var tile=this.grid[i][j],markup=this.grid[i][j].createBackBuffer();if(markup){markup._i=i;markup._j=j;markup._w=this.singleTile?this.getImageSize(tile.bounds).w:tile.size.w;markup._h=tile.size.h;markup.id=tile.id+'_bb';backBuffer.appendChild(markup);}}}
backBuffer._tw=this.tileSize.w;backBuffer._th=this.tileSize.h;}
return backBuffer;},removeBackBuffer:function(){if(this._transitionElement){for(var i=this.transitionendEvents.length-1;i>=0;--i){OpenLayers.Event.stopObserving(this._transitionElement,this.transitionendEvents[i],this._removeBackBuffer);}
delete this._transitionElement;}
if(this.backBuffer){if(this.backBuffer.parentNode){this.backBuffer.parentNode.removeChild(this.backBuffer);}
this.backBuffer=null;this.backBufferResolution=null;if(this.backBufferTimerId!==null){window.clearTimeout(this.backBufferTimerId);this.backBufferTimerId=null;}}},moveByPx:function(dx,dy){if(!this.singleTile){this.moveGriddedTiles();}},setTileSize:function(size){if(this.singleTile){size=this.map.getSize();size.h=parseInt(size.h*this.ratio,10);size.w=parseInt(size.w*this.ratio,10);}
OpenLayers.Layer.HTTPRequest.prototype.setTileSize.apply(this,[size]);},getTilesBounds:function(){var bounds=null;var length=this.grid.length;if(length){var bottomLeftTileBounds=this.grid[length-1][0].bounds,width=this.grid[0].length*bottomLeftTileBounds.getWidth(),height=this.grid.length*bottomLeftTileBounds.getHeight();bounds=new OpenLayers.Bounds(bottomLeftTileBounds.left,bottomLeftTileBounds.bottom,bottomLeftTileBounds.left+width,bottomLeftTileBounds.bottom+height);}
return bounds;},initSingleTile:function(bounds){this.events.triggerEvent("retile");var center=bounds.getCenterLonLat();var tileWidth=bounds.getWidth()*this.ratio;var tileHeight=bounds.getHeight()*this.ratio;var tileBounds=new OpenLayers.Bounds(center.lon-(tileWidth/2),center.lat-(tileHeight/2),center.lon+(tileWidth/2),center.lat+(tileHeight/2));this.gridResolution=this.getServerResolution();var maxExtent=this.maxExtent;if(maxExtent&&(!this.displayOutsideMaxExtent||(this.map.baseLayer.wrapDateLine&&this.maxExtent.equals(this.map.getMaxExtent())))){tileBounds.left=Math.max(tileBounds.left,maxExtent.left);tileBounds.right=Math.min(tileBounds.right,maxExtent.right);}
var px=this.map.getLayerPxFromLonLat({lon:tileBounds.left,lat:tileBounds.top});if(!this.grid.length){this.grid[0]=[];}
var tile=this.grid[0][0];if(!tile){tile=this.addTile(tileBounds,px);this.addTileMonitoringHooks(tile);tile.draw();this.grid[0][0]=tile;}else{tile.moveTo(tileBounds,px);}
this.removeExcessTiles(1,1);},calculateGridLayout:function(bounds,origin,resolution){var tilelon=resolution*this.tileSize.w;var tilelat=resolution*this.tileSize.h;var offsetlon=bounds.left-origin.lon;var tilecol=Math.floor(offsetlon/tilelon)-this.buffer;var rowSign=this.rowSign;var offsetlat=rowSign*(origin.lat-bounds.top+tilelat);var tilerow=Math[~rowSign?'floor':'ceil'](offsetlat/tilelat)-this.buffer*rowSign;return{tilelon:tilelon,tilelat:tilelat,startcol:tilecol,startrow:tilerow};},getImageSize:function(bounds){var tileSize=OpenLayers.Layer.HTTPRequest.prototype.getImageSize.apply(this,arguments);if(this.singleTile){tileSize=new OpenLayers.Size(Math.round(bounds.getWidth()/this.gridResolution),tileSize.h);}
return tileSize;},getTileOrigin:function(){var origin=this.tileOrigin;if(!origin){var extent=this.getMaxExtent();var edges=({"tl":["left","top"],"tr":["right","top"],"bl":["left","bottom"],"br":["right","bottom"]})[this.tileOriginCorner];origin=new OpenLayers.LonLat(extent[edges[0]],extent[edges[1]]);}
return origin;},getTileBoundsForGridIndex:function(row,col){var origin=this.getTileOrigin();var tileLayout=this.gridLayout;var tilelon=tileLayout.tilelon;var tilelat=tileLayout.tilelat;var startcol=tileLayout.startcol;var startrow=tileLayout.startrow;var rowSign=this.rowSign;return new OpenLayers.Bounds(origin.lon+(startcol+col)*tilelon,origin.lat-(startrow+row*rowSign)*tilelat*rowSign,origin.lon+(startcol+col+1)*tilelon,origin.lat-(startrow+(row-1)*rowSign)*tilelat*rowSign);},initGriddedTiles:function(bounds){this.events.triggerEvent("retile");var viewSize=this.map.getSize();var origin=this.getTileOrigin();var resolution=this.map.getResolution(),serverResolution=this.getServerResolution(),ratio=resolution/serverResolution,tileSize={w:this.tileSize.w/ratio,h:this.tileSize.h/ratio};var minRows=Math.ceil(viewSize.h/tileSize.h)+
2*this.buffer+1;var minCols=Math.ceil(viewSize.w/tileSize.w)+
2*this.buffer+1;var tileLayout=this.calculateGridLayout(bounds,origin,serverResolution);this.gridLayout=tileLayout;var tilelon=tileLayout.tilelon;var tilelat=tileLayout.tilelat;var layerContainerDivLeft=this.map.layerContainerOriginPx.x;var layerContainerDivTop=this.map.layerContainerOriginPx.y;var tileBounds=this.getTileBoundsForGridIndex(0,0);var startPx=this.map.getViewPortPxFromLonLat(new OpenLayers.LonLat(tileBounds.left,tileBounds.top));startPx.x=Math.round(startPx.x)-layerContainerDivLeft;startPx.y=Math.round(startPx.y)-layerContainerDivTop;var tileData=[],center=this.map.getCenter();var rowidx=0;do{var row=this.grid[rowidx];if(!row){row=[];this.grid.push(row);}
var colidx=0;do{tileBounds=this.getTileBoundsForGridIndex(rowidx,colidx);var px=startPx.clone();px.x=px.x+colidx*Math.round(tileSize.w);px.y=px.y+rowidx*Math.round(tileSize.h);var tile=row[colidx];if(!tile){tile=this.addTile(tileBounds,px);this.addTileMonitoringHooks(tile);row.push(tile);}else{tile.moveTo(tileBounds,px,false);}
var tileCenter=tileBounds.getCenterLonLat();tileData.push({tile:tile,distance:Math.pow(tileCenter.lon-center.lon,2)+
Math.pow(tileCenter.lat-center.lat,2)});colidx+=1;}while((tileBounds.right<=bounds.right+tilelon*this.buffer)||colidx<minCols);rowidx+=1;}while((tileBounds.bottom>=bounds.bottom-tilelat*this.buffer)||rowidx<minRows);this.removeExcessTiles(rowidx,colidx);var resolution=this.getServerResolution();this.gridResolution=resolution;tileData.sort(function(a,b){return a.distance-b.distance;});for(var i=0,ii=tileData.length;i<ii;++i){tileData[i].tile.draw();}},getMaxExtent:function(){return this.maxExtent;},addTile:function(bounds,position){var tile=new this.tileClass(this,position,bounds,null,this.tileSize,this.tileOptions);this.events.triggerEvent("addtile",{tile:tile});return tile;},addTileMonitoringHooks:function(tile){var replacingCls='olTileReplacing';tile.onLoadStart=function(){if(this.loading===false){this.loading=true;this.events.triggerEvent("loadstart");}
this.events.triggerEvent("tileloadstart",{tile:tile});this.numLoadingTiles++;if(!this.singleTile&&this.backBuffer&&this.gridResolution===this.backBufferResolution){OpenLayers.Element.addClass(tile.getTile(),replacingCls);}};tile.onLoadEnd=function(evt){this.numLoadingTiles--;var aborted=evt.type==='unload';this.events.triggerEvent("tileloaded",{tile:tile,aborted:aborted});if(!this.singleTile&&!aborted&&this.backBuffer&&this.gridResolution===this.backBufferResolution){var tileDiv=tile.getTile();if(OpenLayers.Element.getStyle(tileDiv,'display')==='none'){var bufferTile=document.getElementById(tile.id+'_bb');if(bufferTile){bufferTile.parentNode.removeChild(bufferTile);}}
OpenLayers.Element.removeClass(tileDiv,replacingCls);}
if(this.numLoadingTiles===0){if(this.backBuffer){if(this.backBuffer.childNodes.length===0){this.removeBackBuffer();}else{this._transitionElement=aborted?this.div.lastChild:tile.imgDiv;var transitionendEvents=this.transitionendEvents;for(var i=transitionendEvents.length-1;i>=0;--i){OpenLayers.Event.observe(this._transitionElement,transitionendEvents[i],this._removeBackBuffer);}
this.backBufferTimerId=window.setTimeout(this._removeBackBuffer,this.removeBackBufferDelay);}}
this.loading=false;this.events.triggerEvent("loadend");}};tile.onLoadError=function(){this.events.triggerEvent("tileerror",{tile:tile});};tile.events.on({"loadstart":tile.onLoadStart,"loadend":tile.onLoadEnd,"unload":tile.onLoadEnd,"loaderror":tile.onLoadError,scope:this});},removeTileMonitoringHooks:function(tile){tile.unload();tile.events.un({"loadstart":tile.onLoadStart,"loadend":tile.onLoadEnd,"unload":tile.onLoadEnd,"loaderror":tile.onLoadError,scope:this});},moveGriddedTiles:function(){var buffer=this.buffer+1;while(true){var tlTile=this.grid[0][0];var tlViewPort={x:tlTile.position.x+
this.map.layerContainerOriginPx.x,y:tlTile.position.y+
this.map.layerContainerOriginPx.y};var ratio=this.getServerResolution()/this.map.getResolution();var tileSize={w:Math.round(this.tileSize.w*ratio),h:Math.round(this.tileSize.h*ratio)};if(tlViewPort.x>-tileSize.w*(buffer-1)){this.shiftColumn(true,tileSize);}else if(tlViewPort.x<-tileSize.w*buffer){this.shiftColumn(false,tileSize);}else if(tlViewPort.y>-tileSize.h*(buffer-1)){this.shiftRow(true,tileSize);}else if(tlViewPort.y<-tileSize.h*buffer){this.shiftRow(false,tileSize);}else{break;}}},shiftRow:function(prepend,tileSize){var grid=this.grid;var rowIndex=prepend?0:(grid.length-1);var sign=prepend?-1:1;var rowSign=this.rowSign;var tileLayout=this.gridLayout;tileLayout.startrow+=sign*rowSign;var modelRow=grid[rowIndex];var row=grid[prepend?'pop':'shift']();for(var i=0,len=row.length;i<len;i++){var tile=row[i];var position=modelRow[i].position.clone();position.y+=tileSize.h*sign;tile.moveTo(this.getTileBoundsForGridIndex(rowIndex,i),position);}
grid[prepend?'unshift':'push'](row);},shiftColumn:function(prepend,tileSize){var grid=this.grid;var colIndex=prepend?0:(grid[0].length-1);var sign=prepend?-1:1;var tileLayout=this.gridLayout;tileLayout.startcol+=sign;for(var i=0,len=grid.length;i<len;i++){var row=grid[i];var position=row[colIndex].position.clone();var tile=row[prepend?'pop':'shift']();position.x+=tileSize.w*sign;tile.moveTo(this.getTileBoundsForGridIndex(i,colIndex),position);row[prepend?'unshift':'push'](tile);}},removeExcessTiles:function(rows,columns){var i,l;while(this.grid.length>rows){var row=this.grid.pop();for(i=0,l=row.length;i<l;i++){var tile=row[i];this.destroyTile(tile);}}
for(i=0,l=this.grid.length;i<l;i++){while(this.grid[i].length>columns){var row=this.grid[i];var tile=row.pop();this.destroyTile(tile);}}},onMapResize:function(){if(this.singleTile){this.clearGrid();this.setTileSize();}},getTileBounds:function(viewPortPx){var maxExtent=this.maxExtent;var resolution=this.getResolution();var tileMapWidth=resolution*this.tileSize.w;var tileMapHeight=resolution*this.tileSize.h;var mapPoint=this.getLonLatFromViewPortPx(viewPortPx);var tileLeft=maxExtent.left+(tileMapWidth*Math.floor((mapPoint.lon-
maxExtent.left)/tileMapWidth));var tileBottom=maxExtent.bottom+(tileMapHeight*Math.floor((mapPoint.lat-
maxExtent.bottom)/tileMapHeight));return new OpenLayers.Bounds(tileLeft,tileBottom,tileLeft+tileMapWidth,tileBottom+tileMapHeight);},CLASS_NAME:"OpenLayers.Layer.Grid"});OpenLayers.Layer.XYZ=OpenLayers.Class(OpenLayers.Layer.Grid,{isBaseLayer:true,sphericalMercator:false,zoomOffset:0,serverResolutions:null,initialize:function(name,url,options){if(options&&options.sphericalMercator||this.sphericalMercator){options=OpenLayers.Util.extend({projection:"EPSG:900913",numZoomLevels:this.serverResolutions?this.serverResolutions.length:19},options);}
OpenLayers.Layer.Grid.prototype.initialize.apply(this,[name||this.name,url||this.url,{},options]);},clone:function(obj){if(obj==null){obj=new OpenLayers.Layer.XYZ(this.name,this.url,this.getOptions());}
obj=OpenLayers.Layer.Grid.prototype.clone.apply(this,[obj]);return obj;},getURL:function(bounds){var xyz=this.getXYZ(bounds);var url=this.url;if(OpenLayers.Util.isArray(url)){var s=''+xyz.x+xyz.y+xyz.z;url=this.selectUrl(s,url);}
return OpenLayers.String.format(url,xyz);},getXYZ:function(bounds){var res=this.getServerResolution();var x=Math.round((bounds.left-this.tileOrigin.lon)/(res*this.tileSize.w));var y=Math.round((this.tileOrigin.lat-bounds.top)/(res*this.tileSize.h));var z=this.getServerZoom();if(this.wrapDateLine){var limit=Math.pow(2,z);x=((x%limit)+limit)%limit;}
return{'x':x,'y':y,'z':z};},setMap:function(map){OpenLayers.Layer.Grid.prototype.setMap.apply(this,arguments);if(!this.tileOrigin){this.tileOrigin=new OpenLayers.LonLat(this.maxExtent.left,this.maxExtent.top);}},CLASS_NAME:"OpenLayers.Layer.XYZ"});OpenLayers.Control.Geolocate=OpenLayers.Class(OpenLayers.Control,{geolocation:null,available:('geolocation'in navigator),bind:true,watch:false,geolocationOptions:null,destroy:function(){this.deactivate();OpenLayers.Control.prototype.destroy.apply(this,arguments);},activate:function(){if(this.available&&!this.geolocation){this.geolocation=navigator.geolocation;}
if(!this.geolocation){this.events.triggerEvent("locationuncapable");return false;}
if(OpenLayers.Control.prototype.activate.apply(this,arguments)){if(this.watch){this.watchId=this.geolocation.watchPosition(OpenLayers.Function.bind(this.geolocate,this),OpenLayers.Function.bind(this.failure,this),this.geolocationOptions);}else{this.getCurrentLocation();}
return true;}
return false;},deactivate:function(){if(this.active&&this.watchId!==null){this.geolocation.clearWatch(this.watchId);}
return OpenLayers.Control.prototype.deactivate.apply(this,arguments);},geolocate:function(position){var center=new OpenLayers.LonLat(position.coords.longitude,position.coords.latitude).transform(new OpenLayers.Projection("EPSG:4326"),this.map.getProjectionObject());if(this.bind){this.map.setCenter(center);}
this.events.triggerEvent("locationupdated",{position:position,point:new OpenLayers.Geometry.Point(center.lon,center.lat)});},getCurrentLocation:function(){if(!this.active||this.watch){return false;}
this.geolocation.getCurrentPosition(OpenLayers.Function.bind(this.geolocate,this),OpenLayers.Function.bind(this.failure,this),this.geolocationOptions);return true;},failure:function(error){this.events.triggerEvent("locationfailed",{error:error});},CLASS_NAME:"OpenLayers.Control.Geolocate"});OpenLayers.Layer.OSM=OpenLayers.Class(OpenLayers.Layer.XYZ,{name:"OpenStreetMap",url:['//a.tile.openstreetmap.org/${z}/${x}/${y}.png','//b.tile.openstreetmap.org/${z}/${x}/${y}.png','//c.tile.openstreetmap.org/${z}/${x}/${y}.png'],attribution:"&copy; <a href='//www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",sphericalMercator:true,wrapDateLine:true,tileOptions:null,initialize:function(name,url,options){OpenLayers.Layer.XYZ.prototype.initialize.apply(this,arguments);this.tileOptions=OpenLayers.Util.extend({crossOriginKeyword:'anonymous'},this.options&&this.options.tileOptions);},clone:function(obj){if(obj==null){obj=new OpenLayers.Layer.OSM(this.name,this.url,this.getOptions());}
obj=OpenLayers.Layer.XYZ.prototype.clone.apply(this,[obj]);return obj;},CLASS_NAME:"OpenLayers.Layer.OSM"});OpenLayers.Renderer.Canvas=OpenLayers.Class(OpenLayers.Renderer,{hitDetection:true,hitOverflow:0,canvas:null,features:null,pendingRedraw:false,cachedSymbolBounds:{},initialize:function(containerID,options){OpenLayers.Renderer.prototype.initialize.apply(this,arguments);this.root=document.createElement("canvas");this.container.appendChild(this.root);this.canvas=this.root.getContext("2d");this._clearRectId=OpenLayers.Util.createUniqueID();this.features={};if(this.hitDetection){this.hitCanvas=document.createElement("canvas");this.hitContext=this.hitCanvas.getContext("2d");}},setExtent:function(){OpenLayers.Renderer.prototype.setExtent.apply(this,arguments);return false;},eraseGeometry:function(geometry,featureId){this.eraseFeatures(this.features[featureId][0]);},supported:function(){return OpenLayers.CANVAS_SUPPORTED;},setSize:function(size){this.size=size.clone();var root=this.root;root.style.width=size.w+"px";root.style.height=size.h+"px";root.width=size.w;root.height=size.h;this.resolution=null;if(this.hitDetection){var hitCanvas=this.hitCanvas;hitCanvas.style.width=size.w+"px";hitCanvas.style.height=size.h+"px";hitCanvas.width=size.w;hitCanvas.height=size.h;}},drawFeature:function(feature,style){var rendered;if(feature.geometry){style=this.applyDefaultSymbolizer(style||feature.style);var bounds=feature.geometry.getBounds();var worldBounds;if(this.map.baseLayer&&this.map.baseLayer.wrapDateLine){worldBounds=this.map.getMaxExtent();}
var intersects=bounds&&bounds.intersectsBounds(this.extent,{worldBounds:worldBounds});rendered=(style.display!=="none")&&!!bounds&&intersects;if(rendered){this.features[feature.id]=[feature,style];}
else{delete(this.features[feature.id]);}
this.pendingRedraw=true;}
if(this.pendingRedraw&&!this.locked){this.redraw();this.pendingRedraw=false;}
return rendered;},drawGeometry:function(geometry,style,featureId){var className=geometry.CLASS_NAME;if((className=="OpenLayers.Geometry.Collection")||(className=="OpenLayers.Geometry.MultiPoint")||(className=="OpenLayers.Geometry.MultiLineString")||(className=="OpenLayers.Geometry.MultiPolygon")){var worldBounds=(this.map.baseLayer&&this.map.baseLayer.wrapDateLine)&&this.map.getMaxExtent();for(var i=0;i<geometry.components.length;i++){this.calculateFeatureDx(geometry.components[i].getBounds(),worldBounds);this.drawGeometry(geometry.components[i],style,featureId);}
return;}
switch(geometry.CLASS_NAME){case"OpenLayers.Geometry.Point":this.drawPoint(geometry,style,featureId);break;case"OpenLayers.Geometry.LineString":this.drawLineString(geometry,style,featureId);break;case"OpenLayers.Geometry.LinearRing":this.drawLinearRing(geometry,style,featureId);break;case"OpenLayers.Geometry.Polygon":this.drawPolygon(geometry,style,featureId);break;default:break;}},drawExternalGraphic:function(geometry,style,featureId){var img=new Image();var title=style.title||style.graphicTitle;if(title){img.title=title;}
var width=style.graphicWidth||style.graphicHeight;var height=style.graphicHeight||style.graphicWidth;width=width?width:style.pointRadius*2;height=height?height:style.pointRadius*2;var xOffset=(style.graphicXOffset!=undefined)?style.graphicXOffset:-(0.5*width);var yOffset=(style.graphicYOffset!=undefined)?style.graphicYOffset:-(0.5*height);var _clearRectId=this._clearRectId;var opacity=style.graphicOpacity||style.fillOpacity;var onLoad=function(){if(!this.features[featureId]||_clearRectId!==this._clearRectId){return;}
var pt=this.getLocalXY(geometry);var p0=pt[0];var p1=pt[1];if(!isNaN(p0)&&!isNaN(p1)){var x=(p0+xOffset)|0;var y=(p1+yOffset)|0;var canvas=this.canvas;canvas.globalAlpha=opacity;var factor=OpenLayers.Renderer.Canvas.drawImageScaleFactor||(OpenLayers.Renderer.Canvas.drawImageScaleFactor=/android 2.1/.test(navigator.userAgent.toLowerCase())?320/window.screen.width:1);canvas.drawImage(img,x*factor,y*factor,width*factor,height*factor);if(this.hitDetection){this.setHitContextStyle("fill",featureId);this.hitContext.fillRect(x,y,width,height);}}};img.onload=OpenLayers.Function.bind(onLoad,this);img.src=style.externalGraphic;if(img.complete){img.onload();img.onload=null;}},drawNamedSymbol:function(geometry,style,featureId){var x,y,cx,cy,i,symbolBounds,scaling,angle;var unscaledStrokeWidth;var deg2rad=Math.PI/180.0;var symbol=OpenLayers.Renderer.symbol[style.graphicName];if(!symbol){throw new Error(style.graphicName+' is not a valid symbol name');}
if(!symbol.length||symbol.length<2)return;var pt=this.getLocalXY(geometry);var p0=pt[0];var p1=pt[1];if(isNaN(p0)||isNaN(p1))return;this.canvas.lineCap="round";this.canvas.lineJoin="round";if(this.hitDetection){this.hitContext.lineCap="round";this.hitContext.lineJoin="round";}
if(style.graphicName in this.cachedSymbolBounds){symbolBounds=this.cachedSymbolBounds[style.graphicName];}else{symbolBounds=new OpenLayers.Bounds();for(i=0;i<symbol.length;i+=2){symbolBounds.extend(new OpenLayers.LonLat(symbol[i],symbol[i+1]));}
this.cachedSymbolBounds[style.graphicName]=symbolBounds;}
this.canvas.save();if(this.hitDetection){this.hitContext.save();}
this.canvas.translate(p0,p1);if(this.hitDetection){this.hitContext.translate(p0,p1);}
angle=deg2rad*style.rotation;if(!isNaN(angle)){this.canvas.rotate(angle);if(this.hitDetection){this.hitContext.rotate(angle);}}
scaling=2.0*style.pointRadius/Math.max(symbolBounds.getWidth(),symbolBounds.getHeight());this.canvas.scale(scaling,scaling);if(this.hitDetection){this.hitContext.scale(scaling,scaling);}
cx=symbolBounds.getCenterLonLat().lon;cy=symbolBounds.getCenterLonLat().lat;this.canvas.translate(-cx,-cy);if(this.hitDetection){this.hitContext.translate(-cx,-cy);}
unscaledStrokeWidth=style.strokeWidth;style.strokeWidth=unscaledStrokeWidth/scaling;if(style.fill!==false){this.setCanvasStyle("fill",style);this.canvas.beginPath();for(i=0;i<symbol.length;i=i+2){x=symbol[i];y=symbol[i+1];if(i==0)this.canvas.moveTo(x,y);this.canvas.lineTo(x,y);}
this.canvas.closePath();this.canvas.fill();if(this.hitDetection){this.setHitContextStyle("fill",featureId,style);this.hitContext.beginPath();for(i=0;i<symbol.length;i=i+2){x=symbol[i];y=symbol[i+1];if(i==0)this.canvas.moveTo(x,y);this.hitContext.lineTo(x,y);}
this.hitContext.closePath();this.hitContext.fill();}}
if(style.stroke!==false){this.setCanvasStyle("stroke",style);this.canvas.beginPath();for(i=0;i<symbol.length;i=i+2){x=symbol[i];y=symbol[i+1];if(i==0)this.canvas.moveTo(x,y);this.canvas.lineTo(x,y);}
this.canvas.closePath();this.canvas.stroke();if(this.hitDetection){this.setHitContextStyle("stroke",featureId,style,scaling);this.hitContext.beginPath();for(i=0;i<symbol.length;i=i+2){x=symbol[i];y=symbol[i+1];if(i==0)this.hitContext.moveTo(x,y);this.hitContext.lineTo(x,y);}
this.hitContext.closePath();this.hitContext.stroke();}}
style.strokeWidth=unscaledStrokeWidth;this.canvas.restore();if(this.hitDetection){this.hitContext.restore();}
this.setCanvasStyle("reset");},setCanvasStyle:function(type,style){if(type==="fill"){this.canvas.globalAlpha=style['fillOpacity'];this.canvas.fillStyle=style['fillColor'];}else if(type==="stroke"){this.canvas.globalAlpha=style['strokeOpacity'];this.canvas.strokeStyle=style['strokeColor'];this.canvas.lineWidth=style['strokeWidth'];}else{this.canvas.globalAlpha=0;this.canvas.lineWidth=1;}},featureIdToHex:function(featureId){var id=Number(featureId.split("_").pop())+1;if(id>=16777216){this.hitOverflow=id-16777215;id=id%16777216+1;}
var hex="000000"+id.toString(16);var len=hex.length;hex="#"+hex.substring(len-6,len);return hex;},setHitContextStyle:function(type,featureId,symbolizer,strokeScaling){var hex=this.featureIdToHex(featureId);if(type=="fill"){this.hitContext.globalAlpha=1.0;this.hitContext.fillStyle=hex;}else if(type=="stroke"){this.hitContext.globalAlpha=1.0;this.hitContext.strokeStyle=hex;if(typeof strokeScaling==="undefined"){this.hitContext.lineWidth=symbolizer.strokeWidth+2;}else{if(!isNaN(strokeScaling)){this.hitContext.lineWidth=symbolizer.strokeWidth+2.0/strokeScaling;}}}else{this.hitContext.globalAlpha=0;this.hitContext.lineWidth=1;}},drawPoint:function(geometry,style,featureId){if(style.graphic!==false){if(style.externalGraphic){this.drawExternalGraphic(geometry,style,featureId);}else if(style.graphicName&&(style.graphicName!="circle")){this.drawNamedSymbol(geometry,style,featureId);}else{var pt=this.getLocalXY(geometry);var p0=pt[0];var p1=pt[1];if(!isNaN(p0)&&!isNaN(p1)){var twoPi=Math.PI*2;var radius=style.pointRadius;if(style.fill!==false){this.setCanvasStyle("fill",style);this.canvas.beginPath();this.canvas.arc(p0,p1,radius,0,twoPi,true);this.canvas.fill();if(this.hitDetection){this.setHitContextStyle("fill",featureId,style);this.hitContext.beginPath();this.hitContext.arc(p0,p1,radius,0,twoPi,true);this.hitContext.fill();}}
if(style.stroke!==false){this.setCanvasStyle("stroke",style);this.canvas.beginPath();this.canvas.arc(p0,p1,radius,0,twoPi,true);this.canvas.stroke();if(this.hitDetection){this.setHitContextStyle("stroke",featureId,style);this.hitContext.beginPath();this.hitContext.arc(p0,p1,radius,0,twoPi,true);this.hitContext.stroke();}
this.setCanvasStyle("reset");}}}}},drawLineString:function(geometry,style,featureId){style=OpenLayers.Util.applyDefaults({fill:false},style);this.drawLinearRing(geometry,style,featureId);},drawLinearRing:function(geometry,style,featureId){if(style.fill!==false){this.setCanvasStyle("fill",style);this.renderPath(this.canvas,geometry,style,featureId,"fill");if(this.hitDetection){this.setHitContextStyle("fill",featureId,style);this.renderPath(this.hitContext,geometry,style,featureId,"fill");}}
if(style.stroke!==false){this.setCanvasStyle("stroke",style);this.renderPath(this.canvas,geometry,style,featureId,"stroke");if(this.hitDetection){this.setHitContextStyle("stroke",featureId,style);this.renderPath(this.hitContext,geometry,style,featureId,"stroke");}}
this.setCanvasStyle("reset");},renderPath:function(context,geometry,style,featureId,type){var components=geometry.components;var len=components.length;context.beginPath();var start=this.getLocalXY(components[0]);var x=start[0];var y=start[1];if(!isNaN(x)&&!isNaN(y)){context.moveTo(start[0],start[1]);for(var i=1;i<len;++i){var pt=this.getLocalXY(components[i]);context.lineTo(pt[0],pt[1]);}
if(type==="fill"){context.fill();}else{context.stroke();}}},drawPolygon:function(geometry,style,featureId){var components=geometry.components;var len=components.length;this.drawLinearRing(components[0],style,featureId);for(var i=1;i<len;++i){this.canvas.globalCompositeOperation="destination-out";if(this.hitDetection){this.hitContext.globalCompositeOperation="destination-out";}
this.drawLinearRing(components[i],OpenLayers.Util.applyDefaults({stroke:false,fillOpacity:1.0},style),featureId);this.canvas.globalCompositeOperation="source-over";if(this.hitDetection){this.hitContext.globalCompositeOperation="source-over";}
this.drawLinearRing(components[i],OpenLayers.Util.applyDefaults({fill:false},style),featureId);}},drawText:function(location,style){var pt=this.getLocalXY(location);this.setCanvasStyle("reset");this.canvas.fillStyle=style.fontColor;this.canvas.globalAlpha=style.fontOpacity||1.0;var fontStyle=[style.fontStyle?style.fontStyle:"normal","normal",style.fontWeight?style.fontWeight:"normal",style.fontSize?style.fontSize:"1em",style.fontFamily?style.fontFamily:"sans-serif"].join(" ");var labelRows=style.label.split('\n');var numRows=labelRows.length;if(this.canvas.fillText){this.canvas.font=fontStyle;this.canvas.textAlign=OpenLayers.Renderer.Canvas.LABEL_ALIGN[style.labelAlign[0]]||"center";this.canvas.textBaseline=OpenLayers.Renderer.Canvas.LABEL_ALIGN[style.labelAlign[1]]||"middle";var vfactor=OpenLayers.Renderer.Canvas.LABEL_FACTOR[style.labelAlign[1]];if(vfactor==null){vfactor=-.5;}
var lineHeight=this.canvas.measureText('Mg').height||this.canvas.measureText('xx').width;pt[1]+=lineHeight*vfactor*(numRows-1);for(var i=0;i<numRows;i++){if(style.labelOutlineWidth){this.canvas.save();this.canvas.globalAlpha=style.labelOutlineOpacity||style.fontOpacity||1.0;this.canvas.strokeStyle=style.labelOutlineColor;this.canvas.lineWidth=style.labelOutlineWidth;this.canvas.strokeText(labelRows[i],pt[0],pt[1]+(lineHeight*i)+1);this.canvas.restore();}
this.canvas.fillText(labelRows[i],pt[0],pt[1]+(lineHeight*i));}}else if(this.canvas.mozDrawText){this.canvas.mozTextStyle=fontStyle;var hfactor=OpenLayers.Renderer.Canvas.LABEL_FACTOR[style.labelAlign[0]];if(hfactor==null){hfactor=-.5;}
var vfactor=OpenLayers.Renderer.Canvas.LABEL_FACTOR[style.labelAlign[1]];if(vfactor==null){vfactor=-.5;}
var lineHeight=this.canvas.mozMeasureText('xx');pt[1]+=lineHeight*(1+(vfactor*numRows));for(var i=0;i<numRows;i++){var x=pt[0]+(hfactor*this.canvas.mozMeasureText(labelRows[i]));var y=pt[1]+(i*lineHeight);this.canvas.translate(x,y);this.canvas.mozDrawText(labelRows[i]);this.canvas.translate(-x,-y);}}
this.setCanvasStyle("reset");},getLocalXY:function(point){var resolution=this.getResolution();var extent=this.extent;var x=((point.x-this.featureDx)/resolution+(-extent.left/resolution));var y=((extent.top/resolution)-point.y/resolution);return[x,y];},clear:function(){this.clearCanvas();this.features={};},clearCanvas:function(){var height=this.root.height;var width=this.root.width;this.canvas.clearRect(0,0,width,height);this._clearRectId=OpenLayers.Util.createUniqueID();if(this.hitDetection){this.hitContext.clearRect(0,0,width,height);}},getFeatureIdFromEvent:function(evt){var featureId,feature;if(this.hitDetection&&this.root.style.display!=="none"){if(!this.map.dragging){var xy=evt.xy;var x=xy.x|0;var y=xy.y|0;var data=this.hitContext.getImageData(x,y,1,1).data;if(data[3]===255){var id=data[2]+(256*(data[1]+(256*data[0])));if(id){featureId="OpenLayers_Feature_Vector_"+(id-1+this.hitOverflow);try{feature=this.features[featureId][0];}catch(err){}}}}}
return feature;},eraseFeatures:function(features){if(!(OpenLayers.Util.isArray(features))){features=[features];}
for(var i=0;i<features.length;++i){delete this.features[features[i].id];}
this.redraw();},redraw:function(){if(!this.locked){this.clearCanvas();var labelMap=[];var feature,geometry,style;var worldBounds=(this.map.baseLayer&&this.map.baseLayer.wrapDateLine)&&this.map.getMaxExtent();for(var id in this.features){if(!this.features.hasOwnProperty(id)){continue;}
feature=this.features[id][0];geometry=feature.geometry;this.calculateFeatureDx(geometry.getBounds(),worldBounds);style=this.features[id][1];this.drawGeometry(geometry,style,feature.id);if(style.label){labelMap.push([feature,style]);}}
var item;for(var i=0,len=labelMap.length;i<len;++i){item=labelMap[i];this.drawText(item[0].geometry.getCentroid(),item[1]);}}},CLASS_NAME:"OpenLayers.Renderer.Canvas"});OpenLayers.Renderer.Canvas.LABEL_ALIGN={"l":"left","r":"right","t":"top","b":"bottom"};OpenLayers.Renderer.Canvas.LABEL_FACTOR={"l":0,"r":-1,"t":0,"b":-1};OpenLayers.Renderer.Canvas.drawImageScaleFactor=null;OpenLayers.ElementsIndexer=OpenLayers.Class({maxZIndex:null,order:null,indices:null,compare:null,initialize:function(yOrdering){this.compare=yOrdering?OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER_Y_ORDER:OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER_DRAWING_ORDER;this.clear();},insert:function(newNode){if(this.exists(newNode)){this.remove(newNode);}
var nodeId=newNode.id;this.determineZIndex(newNode);var leftIndex=-1;var rightIndex=this.order.length;var middle;while(rightIndex-leftIndex>1){middle=parseInt((leftIndex+rightIndex)/2);var placement=this.compare(this,newNode,OpenLayers.Util.getElement(this.order[middle]));if(placement>0){leftIndex=middle;}else{rightIndex=middle;}}
this.order.splice(rightIndex,0,nodeId);this.indices[nodeId]=this.getZIndex(newNode);return this.getNextElement(rightIndex);},remove:function(node){var nodeId=node.id;var arrayIndex=OpenLayers.Util.indexOf(this.order,nodeId);if(arrayIndex>=0){this.order.splice(arrayIndex,1);delete this.indices[nodeId];if(this.order.length>0){var lastId=this.order[this.order.length-1];this.maxZIndex=this.indices[lastId];}else{this.maxZIndex=0;}}},clear:function(){this.order=[];this.indices={};this.maxZIndex=0;},exists:function(node){return(this.indices[node.id]!=null);},getZIndex:function(node){return node._style.graphicZIndex;},determineZIndex:function(node){var zIndex=node._style.graphicZIndex;if(zIndex==null){zIndex=this.maxZIndex;node._style.graphicZIndex=zIndex;}else if(zIndex>this.maxZIndex){this.maxZIndex=zIndex;}},getNextElement:function(index){for(var nextIndex=index+1,nextElement=undefined;(nextIndex<this.order.length)&&(nextElement==undefined);nextIndex++){nextElement=OpenLayers.Util.getElement(this.order[nextIndex]);}
return nextElement||null;},CLASS_NAME:"OpenLayers.ElementsIndexer"});OpenLayers.ElementsIndexer.IndexingMethods={Z_ORDER:function(indexer,newNode,nextNode){var newZIndex=indexer.getZIndex(newNode);var returnVal=0;if(nextNode){var nextZIndex=indexer.getZIndex(nextNode);returnVal=newZIndex-nextZIndex;}
return returnVal;},Z_ORDER_DRAWING_ORDER:function(indexer,newNode,nextNode){var returnVal=OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER(indexer,newNode,nextNode);if(nextNode&&returnVal==0){returnVal=1;}
return returnVal;},Z_ORDER_Y_ORDER:function(indexer,newNode,nextNode){var returnVal=OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER(indexer,newNode,nextNode);if(nextNode&&returnVal===0){var result=nextNode._boundsBottom-newNode._boundsBottom;returnVal=(result===0)?1:result;}
return returnVal;}};OpenLayers.Renderer.Elements=OpenLayers.Class(OpenLayers.Renderer,{rendererRoot:null,root:null,vectorRoot:null,textRoot:null,xmlns:null,xOffset:0,indexer:null,BACKGROUND_ID_SUFFIX:"_background",LABEL_ID_SUFFIX:"_label",LABEL_OUTLINE_SUFFIX:"_outline",initialize:function(containerID,options){OpenLayers.Renderer.prototype.initialize.apply(this,arguments);this.rendererRoot=this.createRenderRoot();this.root=this.createRoot("_root");this.vectorRoot=this.createRoot("_vroot");this.textRoot=this.createRoot("_troot");this.root.appendChild(this.vectorRoot);this.root.appendChild(this.textRoot);this.rendererRoot.appendChild(this.root);this.container.appendChild(this.rendererRoot);if(options&&(options.zIndexing||options.yOrdering)){this.indexer=new OpenLayers.ElementsIndexer(options.yOrdering);}},destroy:function(){this.clear();this.rendererRoot=null;this.root=null;this.xmlns=null;OpenLayers.Renderer.prototype.destroy.apply(this,arguments);},clear:function(){var child;var root=this.vectorRoot;if(root){while(child=root.firstChild){root.removeChild(child);}}
root=this.textRoot;if(root){while(child=root.firstChild){root.removeChild(child);}}
if(this.indexer){this.indexer.clear();}},setExtent:function(extent,resolutionChanged){var coordSysUnchanged=OpenLayers.Renderer.prototype.setExtent.apply(this,arguments);var resolution=this.getResolution();if(this.map.baseLayer&&this.map.baseLayer.wrapDateLine){var rightOfDateLine,ratio=extent.getWidth()/this.map.getExtent().getWidth(),extent=extent.scale(1/ratio),world=this.map.getMaxExtent();if(world.right>extent.left&&world.right<extent.right){rightOfDateLine=true;}else if(world.left>extent.left&&world.left<extent.right){rightOfDateLine=false;}
if(rightOfDateLine!==this.rightOfDateLine||resolutionChanged){coordSysUnchanged=false;this.xOffset=rightOfDateLine===true?world.getWidth()/resolution:0;}
this.rightOfDateLine=rightOfDateLine;}
return coordSysUnchanged;},getNodeType:function(geometry,style){},drawGeometry:function(geometry,style,featureId){var className=geometry.CLASS_NAME;var rendered=true;if((className=="OpenLayers.Geometry.Collection")||(className=="OpenLayers.Geometry.MultiPoint")||(className=="OpenLayers.Geometry.MultiLineString")||(className=="OpenLayers.Geometry.MultiPolygon")){for(var i=0,len=geometry.components.length;i<len;i++){rendered=this.drawGeometry(geometry.components[i],style,featureId)&&rendered;}
return rendered;}
rendered=false;var removeBackground=false;if(style.display!="none"){if(style.backgroundGraphic){this.redrawBackgroundNode(geometry.id,geometry,style,featureId);}else{removeBackground=true;}
rendered=this.redrawNode(geometry.id,geometry,style,featureId);}
if(rendered==false){var node=document.getElementById(geometry.id);if(node){if(node._style.backgroundGraphic){removeBackground=true;}
node.parentNode.removeChild(node);}}
if(removeBackground){var node=document.getElementById(geometry.id+this.BACKGROUND_ID_SUFFIX);if(node){node.parentNode.removeChild(node);}}
return rendered;},redrawNode:function(id,geometry,style,featureId){style=this.applyDefaultSymbolizer(style);var node=this.nodeFactory(id,this.getNodeType(geometry,style));node._featureId=featureId;node._boundsBottom=geometry.getBounds().bottom;node._geometryClass=geometry.CLASS_NAME;node._style=style;var drawResult=this.drawGeometryNode(node,geometry,style);if(drawResult===false){return false;}
node=drawResult.node;if(this.indexer){var insert=this.indexer.insert(node);if(insert){this.vectorRoot.insertBefore(node,insert);}else{this.vectorRoot.appendChild(node);}}else{if(node.parentNode!==this.vectorRoot){this.vectorRoot.appendChild(node);}}
this.postDraw(node);return drawResult.complete;},redrawBackgroundNode:function(id,geometry,style,featureId){var backgroundStyle=OpenLayers.Util.extend({},style);backgroundStyle.externalGraphic=backgroundStyle.backgroundGraphic;backgroundStyle.graphicXOffset=backgroundStyle.backgroundXOffset;backgroundStyle.graphicYOffset=backgroundStyle.backgroundYOffset;backgroundStyle.graphicZIndex=backgroundStyle.backgroundGraphicZIndex;backgroundStyle.graphicWidth=backgroundStyle.backgroundWidth||backgroundStyle.graphicWidth;backgroundStyle.graphicHeight=backgroundStyle.backgroundHeight||backgroundStyle.graphicHeight;backgroundStyle.backgroundGraphic=null;backgroundStyle.backgroundXOffset=null;backgroundStyle.backgroundYOffset=null;backgroundStyle.backgroundGraphicZIndex=null;return this.redrawNode(id+this.BACKGROUND_ID_SUFFIX,geometry,backgroundStyle,null);},drawGeometryNode:function(node,geometry,style){style=style||node._style;var options={'isFilled':style.fill===undefined?true:style.fill,'isStroked':style.stroke===undefined?!!style.strokeWidth:style.stroke};var drawn;switch(geometry.CLASS_NAME){case"OpenLayers.Geometry.Point":if(style.graphic===false){options.isFilled=false;options.isStroked=false;}
drawn=this.drawPoint(node,geometry);break;case"OpenLayers.Geometry.LineString":options.isFilled=false;drawn=this.drawLineString(node,geometry);break;case"OpenLayers.Geometry.LinearRing":drawn=this.drawLinearRing(node,geometry);break;case"OpenLayers.Geometry.Polygon":drawn=this.drawPolygon(node,geometry);break;case"OpenLayers.Geometry.Rectangle":drawn=this.drawRectangle(node,geometry);break;default:break;}
node._options=options;if(drawn!=false){return{node:this.setStyle(node,style,options,geometry),complete:drawn};}else{return false;}},postDraw:function(node){},drawPoint:function(node,geometry){},drawLineString:function(node,geometry){},drawLinearRing:function(node,geometry){},drawPolygon:function(node,geometry){},drawRectangle:function(node,geometry){},drawCircle:function(node,geometry){},removeText:function(featureId){var label=document.getElementById(featureId+this.LABEL_ID_SUFFIX);if(label){this.textRoot.removeChild(label);}
var outline=document.getElementById(featureId+this.LABEL_OUTLINE_SUFFIX);if(outline){this.textRoot.removeChild(outline);}},getFeatureIdFromEvent:function(evt){var target=evt.target;var useElement=target&&target.correspondingUseElement;var node=useElement?useElement:(target||evt.srcElement);return node._featureId;},eraseGeometry:function(geometry,featureId){if((geometry.CLASS_NAME=="OpenLayers.Geometry.MultiPoint")||(geometry.CLASS_NAME=="OpenLayers.Geometry.MultiLineString")||(geometry.CLASS_NAME=="OpenLayers.Geometry.MultiPolygon")||(geometry.CLASS_NAME=="OpenLayers.Geometry.Collection")){for(var i=0,len=geometry.components.length;i<len;i++){this.eraseGeometry(geometry.components[i],featureId);}}else{var element=OpenLayers.Util.getElement(geometry.id);if(element&&element.parentNode){if(element.geometry){element.geometry.destroy();element.geometry=null;}
element.parentNode.removeChild(element);if(this.indexer){this.indexer.remove(element);}
if(element._style.backgroundGraphic){var backgroundId=geometry.id+this.BACKGROUND_ID_SUFFIX;var bElem=OpenLayers.Util.getElement(backgroundId);if(bElem&&bElem.parentNode){bElem.parentNode.removeChild(bElem);}}}}},nodeFactory:function(id,type){var node=OpenLayers.Util.getElement(id);if(node){if(!this.nodeTypeCompare(node,type)){node.parentNode.removeChild(node);node=this.nodeFactory(id,type);}}else{node=this.createNode(type,id);}
return node;},nodeTypeCompare:function(node,type){},createNode:function(type,id){},moveRoot:function(renderer){var root=this.root;if(renderer.root.parentNode==this.rendererRoot){root=renderer.root;}
root.parentNode.removeChild(root);renderer.rendererRoot.appendChild(root);},getRenderLayerId:function(){return this.root.parentNode.parentNode.id;},isComplexSymbol:function(graphicName){return(graphicName!="circle")&&!!graphicName;},CLASS_NAME:"OpenLayers.Renderer.Elements"});OpenLayers.Renderer.SVG=OpenLayers.Class(OpenLayers.Renderer.Elements,{xmlns:"http://www.w3.org/2000/svg",xlinkns:"http://www.w3.org/1999/xlink",MAX_PIXEL:15000,translationParameters:null,symbolMetrics:null,initialize:function(containerID){if(!this.supported()){return;}
OpenLayers.Renderer.Elements.prototype.initialize.apply(this,arguments);this.translationParameters={x:0,y:0};this.symbolMetrics={};},supported:function(){var svgFeature="http://www.w3.org/TR/SVG11/feature#";return(document.implementation&&(document.implementation.hasFeature("org.w3c.svg","1.0")||document.implementation.hasFeature(svgFeature+"SVG","1.1")||document.implementation.hasFeature(svgFeature+"BasicStructure","1.1")));},inValidRange:function(x,y,xyOnly){var left=x+(xyOnly?0:this.translationParameters.x);var top=y+(xyOnly?0:this.translationParameters.y);return(left>=-this.MAX_PIXEL&&left<=this.MAX_PIXEL&&top>=-this.MAX_PIXEL&&top<=this.MAX_PIXEL);},setExtent:function(extent,resolutionChanged){var coordSysUnchanged=OpenLayers.Renderer.Elements.prototype.setExtent.apply(this,arguments);var resolution=this.getResolution(),left=-extent.left/resolution,top=extent.top/resolution;if(resolutionChanged){this.left=left;this.top=top;var extentString="0 0 "+this.size.w+" "+this.size.h;this.rendererRoot.setAttributeNS(null,"viewBox",extentString);this.translate(this.xOffset,0);return true;}else{var inRange=this.translate(left-this.left+this.xOffset,top-this.top);if(!inRange){this.setExtent(extent,true);}
return coordSysUnchanged&&inRange;}},translate:function(x,y){if(!this.inValidRange(x,y,true)){return false;}else{var transformString="";if(x||y){transformString="translate("+x+","+y+")";}
this.root.setAttributeNS(null,"transform",transformString);this.translationParameters={x:x,y:y};return true;}},setSize:function(size){OpenLayers.Renderer.prototype.setSize.apply(this,arguments);this.rendererRoot.setAttributeNS(null,"width",this.size.w);this.rendererRoot.setAttributeNS(null,"height",this.size.h);},getNodeType:function(geometry,style){var nodeType=null;switch(geometry.CLASS_NAME){case"OpenLayers.Geometry.Point":if(style.externalGraphic){nodeType="image";}else if(this.isComplexSymbol(style.graphicName)){nodeType="svg";}else{nodeType="circle";}
break;case"OpenLayers.Geometry.Rectangle":nodeType="rect";break;case"OpenLayers.Geometry.LineString":nodeType="polyline";break;case"OpenLayers.Geometry.LinearRing":nodeType="polygon";break;case"OpenLayers.Geometry.Polygon":case"OpenLayers.Geometry.Curve":nodeType="path";break;default:break;}
return nodeType;},setStyle:function(node,style,options){style=style||node._style;options=options||node._options;var title=style.title||style.graphicTitle;if(title){node.setAttributeNS(null,"title",title);var titleNode=node.getElementsByTagName("title");if(titleNode.length>0){titleNode[0].firstChild.textContent=title;}else{var label=this.nodeFactory(null,"title");label.textContent=title;node.appendChild(label);}}
var r=parseFloat(node.getAttributeNS(null,"r"));var widthFactor=1;var pos;if(node._geometryClass=="OpenLayers.Geometry.Point"&&r){node.style.visibility="";if(style.graphic===false){node.style.visibility="hidden";}else if(style.externalGraphic){pos=this.getPosition(node);if(style.graphicWidth&&style.graphicHeight){node.setAttributeNS(null,"preserveAspectRatio","none");}
var width=style.graphicWidth||style.graphicHeight;var height=style.graphicHeight||style.graphicWidth;width=width?width:style.pointRadius*2;height=height?height:style.pointRadius*2;var xOffset=(style.graphicXOffset!=undefined)?style.graphicXOffset:-(0.5*width);var yOffset=(style.graphicYOffset!=undefined)?style.graphicYOffset:-(0.5*height);var opacity=style.graphicOpacity||style.fillOpacity;node.setAttributeNS(null,"x",(pos.x+xOffset).toFixed());node.setAttributeNS(null,"y",(pos.y+yOffset).toFixed());node.setAttributeNS(null,"width",width);node.setAttributeNS(null,"height",height);node.setAttributeNS(this.xlinkns,"xlink:href",style.externalGraphic);node.setAttributeNS(null,"style","opacity: "+opacity);node.onclick=OpenLayers.Event.preventDefault;}else if(this.isComplexSymbol(style.graphicName)){var offset=style.pointRadius*3;var size=offset*2;var src=this.importSymbol(style.graphicName);pos=this.getPosition(node);widthFactor=this.symbolMetrics[src.id][0]*3/size;var parent=node.parentNode;var nextSibling=node.nextSibling;if(parent){parent.removeChild(node);}
node.firstChild&&node.removeChild(node.firstChild);node.appendChild(src.firstChild.cloneNode(true));node.setAttributeNS(null,"viewBox",src.getAttributeNS(null,"viewBox"));node.setAttributeNS(null,"width",size);node.setAttributeNS(null,"height",size);node.setAttributeNS(null,"x",pos.x-offset);node.setAttributeNS(null,"y",pos.y-offset);if(nextSibling){parent.insertBefore(node,nextSibling);}else if(parent){parent.appendChild(node);}}else{node.setAttributeNS(null,"r",style.pointRadius);}
var rotation=style.rotation;if((rotation!==undefined||node._rotation!==undefined)&&pos){node._rotation=rotation;rotation|=0;if(node.nodeName!=="svg"){node.setAttributeNS(null,"transform","rotate("+rotation+" "+pos.x+" "+
pos.y+")");}else{var metrics=this.symbolMetrics[src.id];node.firstChild.setAttributeNS(null,"transform","rotate("
+rotation+" "
+metrics[1]+" "
+metrics[2]+")");}}}
if(options.isFilled){node.setAttributeNS(null,"fill",style.fillColor);node.setAttributeNS(null,"fill-opacity",style.fillOpacity);}else{node.setAttributeNS(null,"fill","none");}
if(options.isStroked){node.setAttributeNS(null,"stroke",style.strokeColor);node.setAttributeNS(null,"stroke-opacity",style.strokeOpacity);node.setAttributeNS(null,"stroke-width",style.strokeWidth*widthFactor);node.setAttributeNS(null,"stroke-linecap",style.strokeLinecap||"round");node.setAttributeNS(null,"stroke-linejoin","round");style.strokeDashstyle&&node.setAttributeNS(null,"stroke-dasharray",this.dashStyle(style,widthFactor));}else{node.setAttributeNS(null,"stroke","none");}
if(style.pointerEvents){node.setAttributeNS(null,"pointer-events",style.pointerEvents);}
if(style.cursor!=null){node.setAttributeNS(null,"cursor",style.cursor);}
return node;},dashStyle:function(style,widthFactor){var w=style.strokeWidth*widthFactor;var str=style.strokeDashstyle;switch(str){case'solid':return'none';case'dot':return[1,4*w].join();case'dash':return[4*w,4*w].join();case'dashdot':return[4*w,4*w,1,4*w].join();case'longdash':return[8*w,4*w].join();case'longdashdot':return[8*w,4*w,1,4*w].join();default:return OpenLayers.String.trim(str).replace(/\s+/g,",");}},createNode:function(type,id){var node=document.createElementNS(this.xmlns,type);if(id){node.setAttributeNS(null,"id",id);}
return node;},nodeTypeCompare:function(node,type){return(type==node.nodeName);},createRenderRoot:function(){var svg=this.nodeFactory(this.container.id+"_svgRoot","svg");svg.style.display="block";return svg;},createRoot:function(suffix){return this.nodeFactory(this.container.id+suffix,"g");},createDefs:function(){var defs=this.nodeFactory(this.container.id+"_defs","defs");this.rendererRoot.appendChild(defs);return defs;},drawPoint:function(node,geometry){return this.drawCircle(node,geometry,1);},drawCircle:function(node,geometry,radius){var resolution=this.getResolution();var x=((geometry.x-this.featureDx)/resolution+this.left);var y=(this.top-geometry.y/resolution);if(this.inValidRange(x,y)){node.setAttributeNS(null,"cx",x);node.setAttributeNS(null,"cy",y);node.setAttributeNS(null,"r",radius);return node;}else{return false;}},drawLineString:function(node,geometry){var componentsResult=this.getComponentsString(geometry.components);if(componentsResult.path){node.setAttributeNS(null,"points",componentsResult.path);return(componentsResult.complete?node:null);}else{return false;}},drawLinearRing:function(node,geometry){var componentsResult=this.getComponentsString(geometry.components);if(componentsResult.path){node.setAttributeNS(null,"points",componentsResult.path);return(componentsResult.complete?node:null);}else{return false;}},drawPolygon:function(node,geometry){var d="";var draw=true;var complete=true;var linearRingResult,path;for(var j=0,len=geometry.components.length;j<len;j++){d+=" M";linearRingResult=this.getComponentsString(geometry.components[j].components," ");path=linearRingResult.path;if(path){d+=" "+path;complete=linearRingResult.complete&&complete;}else{draw=false;}}
d+=" z";if(draw){node.setAttributeNS(null,"d",d);node.setAttributeNS(null,"fill-rule","evenodd");return complete?node:null;}else{return false;}},drawRectangle:function(node,geometry){var resolution=this.getResolution();var x=((geometry.x-this.featureDx)/resolution+this.left);var y=(this.top-geometry.y/resolution);if(this.inValidRange(x,y)){node.setAttributeNS(null,"x",x);node.setAttributeNS(null,"y",y);node.setAttributeNS(null,"width",geometry.width/resolution);node.setAttributeNS(null,"height",geometry.height/resolution);return node;}else{return false;}},drawText:function(featureId,style,location){var drawOutline=(!!style.labelOutlineWidth);if(drawOutline){var outlineStyle=OpenLayers.Util.extend({},style);outlineStyle.fontColor=outlineStyle.labelOutlineColor;outlineStyle.fontStrokeColor=outlineStyle.labelOutlineColor;outlineStyle.fontStrokeWidth=style.labelOutlineWidth;if(style.labelOutlineOpacity){outlineStyle.fontOpacity=style.labelOutlineOpacity;}
delete outlineStyle.labelOutlineWidth;this.drawText(featureId,outlineStyle,location);}
var resolution=this.getResolution();var x=((location.x-this.featureDx)/resolution+this.left);var y=(location.y/resolution-this.top);var suffix=(drawOutline)?this.LABEL_OUTLINE_SUFFIX:this.LABEL_ID_SUFFIX;var label=this.nodeFactory(featureId+suffix,"text");label.setAttributeNS(null,"x",x);label.setAttributeNS(null,"y",-y);if(style.fontColor){label.setAttributeNS(null,"fill",style.fontColor);}
if(style.fontStrokeColor){label.setAttributeNS(null,"stroke",style.fontStrokeColor);}
if(style.fontStrokeWidth){label.setAttributeNS(null,"stroke-width",style.fontStrokeWidth);}
if(style.fontOpacity){label.setAttributeNS(null,"opacity",style.fontOpacity);}
if(style.fontFamily){label.setAttributeNS(null,"font-family",style.fontFamily);}
if(style.fontSize){label.setAttributeNS(null,"font-size",style.fontSize);}
if(style.fontWeight){label.setAttributeNS(null,"font-weight",style.fontWeight);}
if(style.fontStyle){label.setAttributeNS(null,"font-style",style.fontStyle);}
if(style.labelSelect===true){label.setAttributeNS(null,"pointer-events","visible");label._featureId=featureId;}else{label.setAttributeNS(null,"pointer-events","none");}
var align=style.labelAlign||OpenLayers.Renderer.defaultSymbolizer.labelAlign;label.setAttributeNS(null,"text-anchor",OpenLayers.Renderer.SVG.LABEL_ALIGN[align[0]]||"middle");if(OpenLayers.IS_GECKO===true){label.setAttributeNS(null,"dominant-baseline",OpenLayers.Renderer.SVG.LABEL_ALIGN[align[1]]||"central");}
var labelRows=style.label.split('\n');var numRows=labelRows.length;while(label.childNodes.length>numRows){label.removeChild(label.lastChild);}
for(var i=0;i<numRows;i++){var tspan=this.nodeFactory(featureId+suffix+"_tspan_"+i,"tspan");if(style.labelSelect===true){tspan._featureId=featureId;tspan._geometry=location;tspan._geometryClass=location.CLASS_NAME;}
if(OpenLayers.IS_GECKO===false){tspan.setAttributeNS(null,"baseline-shift",OpenLayers.Renderer.SVG.LABEL_VSHIFT[align[1]]||"-35%");}
tspan.setAttribute("x",x);if(i==0){var vfactor=OpenLayers.Renderer.SVG.LABEL_VFACTOR[align[1]];if(vfactor==null){vfactor=-.5;}
tspan.setAttribute("dy",(vfactor*(numRows-1))+"em");}else{tspan.setAttribute("dy","1em");}
tspan.textContent=(labelRows[i]==='')?' ':labelRows[i];if(!tspan.parentNode){label.appendChild(tspan);}}
if(!label.parentNode){this.textRoot.appendChild(label);}},getComponentsString:function(components,separator){var renderCmp=[];var complete=true;var len=components.length;var strings=[];var str,component;for(var i=0;i<len;i++){component=components[i];renderCmp.push(component);str=this.getShortString(component);if(str){strings.push(str);}else{if(i>0){if(this.getShortString(components[i-1])){strings.push(this.clipLine(components[i],components[i-1]));}}
if(i<len-1){if(this.getShortString(components[i+1])){strings.push(this.clipLine(components[i],components[i+1]));}}
complete=false;}}
return{path:strings.join(separator||","),complete:complete};},clipLine:function(badComponent,goodComponent){if(goodComponent.equals(badComponent)){return"";}
var resolution=this.getResolution();var maxX=this.MAX_PIXEL-this.translationParameters.x;var maxY=this.MAX_PIXEL-this.translationParameters.y;var x1=(goodComponent.x-this.featureDx)/resolution+this.left;var y1=this.top-goodComponent.y/resolution;var x2=(badComponent.x-this.featureDx)/resolution+this.left;var y2=this.top-badComponent.y/resolution;var k;if(x2<-maxX||x2>maxX){k=(y2-y1)/(x2-x1);x2=x2<0?-maxX:maxX;y2=y1+(x2-x1)*k;}
if(y2<-maxY||y2>maxY){k=(x2-x1)/(y2-y1);y2=y2<0?-maxY:maxY;x2=x1+(y2-y1)*k;}
return x2+","+y2;},getShortString:function(point){var resolution=this.getResolution();var x=((point.x-this.featureDx)/resolution+this.left);var y=(this.top-point.y/resolution);if(this.inValidRange(x,y)){return x+","+y;}else{return false;}},getPosition:function(node){return({x:parseFloat(node.getAttributeNS(null,"cx")),y:parseFloat(node.getAttributeNS(null,"cy"))});},importSymbol:function(graphicName){if(!this.defs){this.defs=this.createDefs();}
var id=this.container.id+"-"+graphicName;var existing=document.getElementById(id);if(existing!=null){return existing;}
var symbol=OpenLayers.Renderer.symbol[graphicName];if(!symbol){throw new Error(graphicName+' is not a valid symbol name');}
var symbolNode=this.nodeFactory(id,"symbol");var node=this.nodeFactory(null,"polygon");symbolNode.appendChild(node);var symbolExtent=new OpenLayers.Bounds(Number.MAX_VALUE,Number.MAX_VALUE,0,0);var points=[];var x,y;for(var i=0;i<symbol.length;i=i+2){x=symbol[i];y=symbol[i+1];symbolExtent.left=Math.min(symbolExtent.left,x);symbolExtent.bottom=Math.min(symbolExtent.bottom,y);symbolExtent.right=Math.max(symbolExtent.right,x);symbolExtent.top=Math.max(symbolExtent.top,y);points.push(x,",",y);}
node.setAttributeNS(null,"points",points.join(" "));var width=symbolExtent.getWidth();var height=symbolExtent.getHeight();var viewBox=[symbolExtent.left-width,symbolExtent.bottom-height,width*3,height*3];symbolNode.setAttributeNS(null,"viewBox",viewBox.join(" "));this.symbolMetrics[id]=[Math.max(width,height),symbolExtent.getCenterLonLat().lon,symbolExtent.getCenterLonLat().lat];this.defs.appendChild(symbolNode);return symbolNode;},getFeatureIdFromEvent:function(evt){var featureId=OpenLayers.Renderer.Elements.prototype.getFeatureIdFromEvent.apply(this,arguments);if(!featureId){var target=evt.target;featureId=target.parentNode&&target!=this.rendererRoot?target.parentNode._featureId:undefined;}
return featureId;},CLASS_NAME:"OpenLayers.Renderer.SVG"});OpenLayers.Renderer.SVG.LABEL_ALIGN={"l":"start","r":"end","b":"bottom","t":"hanging"};OpenLayers.Renderer.SVG.LABEL_VSHIFT={"t":"-70%","b":"0"};OpenLayers.Renderer.SVG.LABEL_VFACTOR={"t":0,"b":-1};OpenLayers.Renderer.SVG.preventDefault=function(e){OpenLayers.Event.preventDefault(e);};OpenLayers.Control.DrawFeature=OpenLayers.Class(OpenLayers.Control,{layer:null,callbacks:null,multi:false,featureAdded:function(){},initialize:function(layer,handler,options){OpenLayers.Control.prototype.initialize.apply(this,[options]);this.callbacks=OpenLayers.Util.extend({done:this.drawFeature,modify:function(vertex,feature){this.layer.events.triggerEvent("sketchmodified",{vertex:vertex,feature:feature});},create:function(vertex,feature){this.layer.events.triggerEvent("sketchstarted",{vertex:vertex,feature:feature});}},this.callbacks);this.layer=layer;this.handlerOptions=this.handlerOptions||{};this.handlerOptions.layerOptions=OpenLayers.Util.applyDefaults(this.handlerOptions.layerOptions,{renderers:layer.renderers,rendererOptions:layer.rendererOptions});if(!("multi"in this.handlerOptions)){this.handlerOptions.multi=this.multi;}
var sketchStyle=this.layer.styleMap&&this.layer.styleMap.styles.temporary;if(sketchStyle){this.handlerOptions.layerOptions=OpenLayers.Util.applyDefaults(this.handlerOptions.layerOptions,{styleMap:new OpenLayers.StyleMap({"default":sketchStyle})});}
this.handler=new handler(this,this.callbacks,this.handlerOptions);},drawFeature:function(geometry){var feature=new OpenLayers.Feature.Vector(geometry);var proceed=this.layer.events.triggerEvent("sketchcomplete",{feature:feature});if(proceed!==false){feature.state=OpenLayers.State.INSERT;this.layer.addFeatures([feature]);this.featureAdded(feature);this.events.triggerEvent("featureadded",{feature:feature});}},insertXY:function(x,y){if(this.handler&&this.handler.line){this.handler.insertXY(x,y);}},insertDeltaXY:function(dx,dy){if(this.handler&&this.handler.line){this.handler.insertDeltaXY(dx,dy);}},insertDirectionLength:function(direction,length){if(this.handler&&this.handler.line){this.handler.insertDirectionLength(direction,length);}},insertDeflectionLength:function(deflection,length){if(this.handler&&this.handler.line){this.handler.insertDeflectionLength(deflection,length);}},undo:function(){return this.handler.undo&&this.handler.undo();},redo:function(){return this.handler.redo&&this.handler.redo();},finishSketch:function(){this.handler.finishGeometry();},cancel:function(){this.handler.cancel();},CLASS_NAME:"OpenLayers.Control.DrawFeature"});OpenLayers.Layer.Google.v3={DEFAULTS:{sphericalMercator:true,projection:"EPSG:900913"},animationEnabled:true,loadMapObject:function(){if(!this.type){this.type=google.maps.MapTypeId.ROADMAP;}
var mapObject;var cache=OpenLayers.Layer.Google.cache[this.map.id];if(cache){mapObject=cache.mapObject;++cache.count;}else{var center=this.map.getCenter();var container=document.createElement('div');container.className="olForeignContainer";container.style.width='100%';container.style.height='100%';mapObject=new google.maps.Map(container,{center:center?new google.maps.LatLng(center.lat,center.lon):new google.maps.LatLng(0,0),zoom:this.map.getZoom()||0,mapTypeId:this.type,disableDefaultUI:true,keyboardShortcuts:false,draggable:false,disableDoubleClickZoom:true,scrollwheel:false,streetViewControl:false,tilt:(this.useTiltImages?45:0)});var googleControl=document.createElement('div');googleControl.style.width='100%';googleControl.style.height='100%';mapObject.controls[google.maps.ControlPosition.TOP_LEFT].push(googleControl);cache={googleControl:googleControl,mapObject:mapObject,count:1};OpenLayers.Layer.Google.cache[this.map.id]=cache;}
this.mapObject=mapObject;this.setGMapVisibility(this.visibility);},onMapResize:function(){if(this.visibility){google.maps.event.trigger(this.mapObject,"resize");}},setGMapVisibility:function(visible){var cache=OpenLayers.Layer.Google.cache[this.map.id];var map=this.map;if(cache){var type=this.type;var layers=map.layers;var layer;for(var i=layers.length-1;i>=0;--i){layer=layers[i];if(layer instanceof OpenLayers.Layer.Google&&layer.visibility===true&&layer.inRange===true){type=layer.type;visible=true;break;}}
var container=this.mapObject.getDiv();if(visible===true){if(container.parentNode!==map.div){if(!cache.rendered){var me=this;google.maps.event.addListenerOnce(this.mapObject,'tilesloaded',function(){cache.rendered=true;me.setGMapVisibility(me.getVisibility());me.moveTo(me.map.getCenter());});}else{map.div.appendChild(container);cache.googleControl.appendChild(map.viewPortDiv);google.maps.event.trigger(this.mapObject,'resize');}}
this.mapObject.setMapTypeId(type);}else if(cache.googleControl.hasChildNodes()){map.div.appendChild(map.viewPortDiv);map.div.removeChild(container);}}},getMapContainer:function(){return this.mapObject.getDiv();},getMapObjectBoundsFromOLBounds:function(olBounds){var moBounds=null;if(olBounds!=null){var sw=this.sphericalMercator?this.inverseMercator(olBounds.bottom,olBounds.left):new OpenLayers.LonLat(olBounds.bottom,olBounds.left);var ne=this.sphericalMercator?this.inverseMercator(olBounds.top,olBounds.right):new OpenLayers.LonLat(olBounds.top,olBounds.right);moBounds=new google.maps.LatLngBounds(new google.maps.LatLng(sw.lat,sw.lon),new google.maps.LatLng(ne.lat,ne.lon));}
return moBounds;},getMapObjectLonLatFromMapObjectPixel:function(moPixel){var size=this.map.getSize();var lon=this.getLongitudeFromMapObjectLonLat(this.mapObject.center);var lat=this.getLatitudeFromMapObjectLonLat(this.mapObject.center);var res=this.map.getResolution();var delta_x=moPixel.x-(size.w/2);var delta_y=moPixel.y-(size.h/2);var lonlat=new OpenLayers.LonLat(lon+delta_x*res,lat-delta_y*res);if(this.wrapDateLine){lonlat=lonlat.wrapDateLine(this.maxExtent);}
return this.getMapObjectLonLatFromLonLat(lonlat.lon,lonlat.lat);},getMapObjectPixelFromMapObjectLonLat:function(moLonLat){var lon=this.getLongitudeFromMapObjectLonLat(moLonLat);var lat=this.getLatitudeFromMapObjectLonLat(moLonLat);var res=this.map.getResolution();var extent=this.map.getExtent();return this.getMapObjectPixelFromXY((1/res*(lon-extent.left)),(1/res*(extent.top-lat)));},setMapObjectCenter:function(center,zoom){if(this.animationEnabled===false&&zoom!=this.mapObject.zoom){var mapContainer=this.getMapContainer();google.maps.event.addListenerOnce(this.mapObject,"idle",function(){mapContainer.style.visibility="";});mapContainer.style.visibility="hidden";}
this.mapObject.setOptions({center:center,zoom:zoom});},getMapObjectZoomFromMapObjectBounds:function(moBounds){return this.mapObject.getBoundsZoomLevel(moBounds);},getMapObjectLonLatFromLonLat:function(lon,lat){var gLatLng;if(this.sphericalMercator){var lonlat=this.inverseMercator(lon,lat);gLatLng=new google.maps.LatLng(lonlat.lat,lonlat.lon);}else{gLatLng=new google.maps.LatLng(lat,lon);}
return gLatLng;},getMapObjectPixelFromXY:function(x,y){return new google.maps.Point(x,y);}};OpenLayers.Control.MousePosition=OpenLayers.Class(OpenLayers.Control,{autoActivate:true,element:null,prefix:'',separator:', ',suffix:'',numDigits:5,granularity:10,emptyString:null,lastXy:null,displayProjection:null,destroy:function(){this.deactivate();OpenLayers.Control.prototype.destroy.apply(this,arguments);},activate:function(){if(OpenLayers.Control.prototype.activate.apply(this,arguments)){this.map.events.register('mousemove',this,this.redraw);this.map.events.register('mouseout',this,this.reset);this.redraw();return true;}else{return false;}},deactivate:function(){if(OpenLayers.Control.prototype.deactivate.apply(this,arguments)){this.map.events.unregister('mousemove',this,this.redraw);this.map.events.unregister('mouseout',this,this.reset);this.element.innerHTML="";return true;}else{return false;}},draw:function(){OpenLayers.Control.prototype.draw.apply(this,arguments);if(!this.element){this.div.left="";this.div.top="";this.element=this.div;}
return this.div;},redraw:function(evt){var lonLat;if(evt==null){this.reset();return;}else{if(this.lastXy==null||Math.abs(evt.xy.x-this.lastXy.x)>this.granularity||Math.abs(evt.xy.y-this.lastXy.y)>this.granularity)
{this.lastXy=evt.xy;return;}
lonLat=this.map.getLonLatFromPixel(evt.xy);if(!lonLat){return;}
if(this.displayProjection){lonLat.transform(this.map.getProjectionObject(),this.displayProjection);}
this.lastXy=evt.xy;}
var newHtml=this.formatOutput(lonLat);if(newHtml!=this.element.innerHTML){this.element.innerHTML=newHtml;}},reset:function(evt){if(this.emptyString!=null){this.element.innerHTML=this.emptyString;}},formatOutput:function(lonLat){var digits=parseInt(this.numDigits);var newHtml=this.prefix+
lonLat.lon.toFixed(digits)+
this.separator+
lonLat.lat.toFixed(digits)+
this.suffix;return newHtml;},CLASS_NAME:"OpenLayers.Control.MousePosition"});OpenLayers.Geometry.Collection=OpenLayers.Class(OpenLayers.Geometry,{components:null,componentTypes:null,initialize:function(components){OpenLayers.Geometry.prototype.initialize.apply(this,arguments);this.components=[];if(components!=null){this.addComponents(components);}},destroy:function(){this.components.length=0;this.components=null;OpenLayers.Geometry.prototype.destroy.apply(this,arguments);},clone:function(){var Constructor=OpenLayers.Util.getConstructor(this.CLASS_NAME);var geometry=new Constructor();for(var i=0,len=this.components.length;i<len;i++){geometry.addComponent(this.components[i].clone());}
OpenLayers.Util.applyDefaults(geometry,this);return geometry;},getComponentsString:function(){var strings=[];for(var i=0,len=this.components.length;i<len;i++){strings.push(this.components[i].toShortString());}
return strings.join(",");},calculateBounds:function(){this.bounds=null;var bounds=new OpenLayers.Bounds();var components=this.components;if(components){for(var i=0,len=components.length;i<len;i++){bounds.extend(components[i].getBounds());}}
if(bounds.left!=null&&bounds.bottom!=null&&bounds.right!=null&&bounds.top!=null){this.setBounds(bounds);}},addComponents:function(components){if(!(OpenLayers.Util.isArray(components))){components=[components];}
for(var i=0,len=components.length;i<len;i++){this.addComponent(components[i]);}},addComponent:function(component,index){var added=false;if(component){if(this.componentTypes==null||(OpenLayers.Util.indexOf(this.componentTypes,component.CLASS_NAME)>-1)){if(index!=null&&(index<this.components.length)){var components1=this.components.slice(0,index);var components2=this.components.slice(index,this.components.length);components1.push(component);this.components=components1.concat(components2);}else{this.components.push(component);}
component.parent=this;this.clearBounds();added=true;}}
return added;},removeComponents:function(components){var removed=false;if(!(OpenLayers.Util.isArray(components))){components=[components];}
for(var i=components.length-1;i>=0;--i){removed=this.removeComponent(components[i])||removed;}
return removed;},removeComponent:function(component){OpenLayers.Util.removeItem(this.components,component);this.clearBounds();return true;},getLength:function(){var length=0.0;for(var i=0,len=this.components.length;i<len;i++){length+=this.components[i].getLength();}
return length;},getArea:function(){var area=0.0;for(var i=0,len=this.components.length;i<len;i++){area+=this.components[i].getArea();}
return area;},getGeodesicArea:function(projection){var area=0.0;for(var i=0,len=this.components.length;i<len;i++){area+=this.components[i].getGeodesicArea(projection);}
return area;},getCentroid:function(weighted){if(!weighted){return this.components.length&&this.components[0].getCentroid();}
var len=this.components.length;if(!len){return false;}
var areas=[];var centroids=[];var areaSum=0;var minArea=Number.MAX_VALUE;var component;for(var i=0;i<len;++i){component=this.components[i];var area=component.getArea();var centroid=component.getCentroid(true);if(isNaN(area)||isNaN(centroid.x)||isNaN(centroid.y)){continue;}
areas.push(area);areaSum+=area;minArea=(area<minArea&&area>0)?area:minArea;centroids.push(centroid);}
len=areas.length;if(areaSum===0){for(var i=0;i<len;++i){areas[i]=1;}
areaSum=areas.length;}else{for(var i=0;i<len;++i){areas[i]/=minArea;}
areaSum/=minArea;}
var xSum=0,ySum=0,centroid,area;for(var i=0;i<len;++i){centroid=centroids[i];area=areas[i];xSum+=centroid.x*area;ySum+=centroid.y*area;}
return new OpenLayers.Geometry.Point(xSum/areaSum,ySum/areaSum);},getGeodesicLength:function(projection){var length=0.0;for(var i=0,len=this.components.length;i<len;i++){length+=this.components[i].getGeodesicLength(projection);}
return length;},move:function(x,y){for(var i=0,len=this.components.length;i<len;i++){this.components[i].move(x,y);}},rotate:function(angle,origin){for(var i=0,len=this.components.length;i<len;++i){this.components[i].rotate(angle,origin);}},resize:function(scale,origin,ratio){for(var i=0;i<this.components.length;++i){this.components[i].resize(scale,origin,ratio);}
return this;},distanceTo:function(geometry,options){var edge=!(options&&options.edge===false);var details=edge&&options&&options.details;var result,best,distance;var min=Number.POSITIVE_INFINITY;for(var i=0,len=this.components.length;i<len;++i){result=this.components[i].distanceTo(geometry,options);distance=details?result.distance:result;if(distance<min){min=distance;best=result;if(min==0){break;}}}
return best;},equals:function(geometry){var equivalent=true;if(!geometry||!geometry.CLASS_NAME||(this.CLASS_NAME!=geometry.CLASS_NAME)){equivalent=false;}else if(!(OpenLayers.Util.isArray(geometry.components))||(geometry.components.length!=this.components.length)){equivalent=false;}else{for(var i=0,len=this.components.length;i<len;++i){if(!this.components[i].equals(geometry.components[i])){equivalent=false;break;}}}
return equivalent;},transform:function(source,dest){if(source&&dest){for(var i=0,len=this.components.length;i<len;i++){var component=this.components[i];component.transform(source,dest);}
this.bounds=null;}
return this;},intersects:function(geometry){var intersect=false;for(var i=0,len=this.components.length;i<len;++i){intersect=geometry.intersects(this.components[i]);if(intersect){break;}}
return intersect;},getVertices:function(nodes){var vertices=[];for(var i=0,len=this.components.length;i<len;++i){Array.prototype.push.apply(vertices,this.components[i].getVertices(nodes));}
return vertices;},CLASS_NAME:"OpenLayers.Geometry.Collection"});OpenLayers.Geometry.MultiPoint=OpenLayers.Class(OpenLayers.Geometry.Collection,{componentTypes:["OpenLayers.Geometry.Point"],addPoint:function(point,index){this.addComponent(point,index);},removePoint:function(point){this.removeComponent(point);},CLASS_NAME:"OpenLayers.Geometry.MultiPoint"});OpenLayers.Popup=OpenLayers.Class({events:null,id:"",lonlat:null,div:null,contentSize:null,size:null,contentHTML:null,backgroundColor:"",opacity:"",border:"",contentDiv:null,groupDiv:null,closeDiv:null,autoSize:false,minSize:null,maxSize:null,displayClass:"olPopup",contentDisplayClass:"olPopupContent",padding:0,disableFirefoxOverflowHack:false,fixPadding:function(){if(typeof this.padding=="number"){this.padding=new OpenLayers.Bounds(this.padding,this.padding,this.padding,this.padding);}},panMapIfOutOfView:false,keepInMap:false,closeOnMove:false,map:null,initialize:function(id,lonlat,contentSize,contentHTML,closeBox,closeBoxCallback){if(id==null){id=OpenLayers.Util.createUniqueID(this.CLASS_NAME+"_");}
this.id=id;this.lonlat=lonlat;this.contentSize=(contentSize!=null)?contentSize:new OpenLayers.Size(OpenLayers.Popup.WIDTH,OpenLayers.Popup.HEIGHT);if(contentHTML!=null){this.contentHTML=contentHTML;}
this.backgroundColor=OpenLayers.Popup.COLOR;this.opacity=OpenLayers.Popup.OPACITY;this.border=OpenLayers.Popup.BORDER;this.div=OpenLayers.Util.createDiv(this.id,null,null,null,null,null,"hidden");this.div.className=this.displayClass;var groupDivId=this.id+"_GroupDiv";this.groupDiv=OpenLayers.Util.createDiv(groupDivId,null,null,null,"relative",null,"hidden");var id=this.div.id+"_contentDiv";this.contentDiv=OpenLayers.Util.createDiv(id,null,this.contentSize.clone(),null,"relative");this.contentDiv.className=this.contentDisplayClass;this.groupDiv.appendChild(this.contentDiv);this.div.appendChild(this.groupDiv);if(closeBox){this.addCloseBox(closeBoxCallback);}
this.registerEvents();},destroy:function(){this.id=null;this.lonlat=null;this.size=null;this.contentHTML=null;this.backgroundColor=null;this.opacity=null;this.border=null;if(this.closeOnMove&&this.map){this.map.events.unregister("movestart",this,this.hide);}
this.events.destroy();this.events=null;if(this.closeDiv){OpenLayers.Event.stopObservingElement(this.closeDiv);this.groupDiv.removeChild(this.closeDiv);}
this.closeDiv=null;this.div.removeChild(this.groupDiv);this.groupDiv=null;if(this.map!=null){this.map.removePopup(this);}
this.map=null;this.div=null;this.autoSize=null;this.minSize=null;this.maxSize=null;this.padding=null;this.panMapIfOutOfView=null;},draw:function(px){if(px==null){if((this.lonlat!=null)&&(this.map!=null)){px=this.map.getLayerPxFromLonLat(this.lonlat);}}
if(this.closeOnMove){this.map.events.register("movestart",this,this.hide);}
if(!this.disableFirefoxOverflowHack&&OpenLayers.BROWSER_NAME=='firefox'){this.map.events.register("movestart",this,function(){var style=document.defaultView.getComputedStyle(this.contentDiv,null);var currentOverflow=style.getPropertyValue("overflow");if(currentOverflow!="hidden"){this.contentDiv._oldOverflow=currentOverflow;this.contentDiv.style.overflow="hidden";}});this.map.events.register("moveend",this,function(){var oldOverflow=this.contentDiv._oldOverflow;if(oldOverflow){this.contentDiv.style.overflow=oldOverflow;this.contentDiv._oldOverflow=null;}});}
this.moveTo(px);if(!this.autoSize&&!this.size){this.setSize(this.contentSize);}
this.setBackgroundColor();this.setOpacity();this.setBorder();this.setContentHTML();if(this.panMapIfOutOfView){this.panIntoView();}
return this.div;},updatePosition:function(){if((this.lonlat)&&(this.map)){var px=this.map.getLayerPxFromLonLat(this.lonlat);if(px){this.moveTo(px);}}},moveTo:function(px){if((px!=null)&&(this.div!=null)){this.div.style.left=px.x+"px";this.div.style.top=px.y+"px";}},visible:function(){return OpenLayers.Element.visible(this.div);},toggle:function(){if(this.visible()){this.hide();}else{this.show();}},show:function(){this.div.style.display='';if(this.panMapIfOutOfView){this.panIntoView();}},hide:function(){this.div.style.display='none';},setSize:function(contentSize){this.size=contentSize.clone();var contentDivPadding=this.getContentDivPadding();var wPadding=contentDivPadding.left+contentDivPadding.right;var hPadding=contentDivPadding.top+contentDivPadding.bottom;this.fixPadding();wPadding+=this.padding.left+this.padding.right;hPadding+=this.padding.top+this.padding.bottom;if(this.closeDiv){var closeDivWidth=parseInt(this.closeDiv.style.width);wPadding+=closeDivWidth+contentDivPadding.right;}
this.size.w+=wPadding;this.size.h+=hPadding;if(OpenLayers.BROWSER_NAME=="msie"){this.contentSize.w+=contentDivPadding.left+contentDivPadding.right;this.contentSize.h+=contentDivPadding.bottom+contentDivPadding.top;}
if(this.div!=null){this.div.style.width=this.size.w+"px";this.div.style.height=this.size.h+"px";}
if(this.contentDiv!=null){this.contentDiv.style.width=contentSize.w+"px";this.contentDiv.style.height=contentSize.h+"px";}},updateSize:function(){var preparedHTML="<div class='"+this.contentDisplayClass+"'>"+
this.contentDiv.innerHTML+"</div>";var containerElement=(this.map)?this.map.div:document.body;var realSize=OpenLayers.Util.getRenderedDimensions(preparedHTML,null,{displayClass:this.displayClass,containerElement:containerElement});var safeSize=this.getSafeContentSize(realSize);var newSize=null;if(safeSize.equals(realSize)){newSize=realSize;}else{var fixedSize={w:(safeSize.w<realSize.w)?safeSize.w:null,h:(safeSize.h<realSize.h)?safeSize.h:null};if(fixedSize.w&&fixedSize.h){newSize=safeSize;}else{var clippedSize=OpenLayers.Util.getRenderedDimensions(preparedHTML,fixedSize,{displayClass:this.contentDisplayClass,containerElement:containerElement});var currentOverflow=OpenLayers.Element.getStyle(this.contentDiv,"overflow");if((currentOverflow!="hidden")&&(clippedSize.equals(safeSize))){var scrollBar=OpenLayers.Util.getScrollbarWidth();if(fixedSize.w){clippedSize.h+=scrollBar;}else{clippedSize.w+=scrollBar;}}
newSize=this.getSafeContentSize(clippedSize);}}
this.setSize(newSize);},setBackgroundColor:function(color){if(color!=undefined){this.backgroundColor=color;}
if(this.div!=null){this.div.style.backgroundColor=this.backgroundColor;}},setOpacity:function(opacity){if(opacity!=undefined){this.opacity=opacity;}
if(this.div!=null){this.div.style.opacity=this.opacity;this.div.style.filter='alpha(opacity='+this.opacity*100+')';}},setBorder:function(border){if(border!=undefined){this.border=border;}
if(this.div!=null){this.div.style.border=this.border;}},setContentHTML:function(contentHTML){if(contentHTML!=null){this.contentHTML=contentHTML;}
if((this.contentDiv!=null)&&(this.contentHTML!=null)&&(this.contentHTML!=this.contentDiv.innerHTML)){this.contentDiv.innerHTML=this.contentHTML;if(this.autoSize){this.registerImageListeners();this.updateSize();}}},registerImageListeners:function(){var onImgLoad=function(){if(this.popup.id===null){return;}
this.popup.updateSize();if(this.popup.visible()&&this.popup.panMapIfOutOfView){this.popup.panIntoView();}
OpenLayers.Event.stopObserving(this.img,"load",this.img._onImgLoad);};var images=this.contentDiv.getElementsByTagName("img");for(var i=0,len=images.length;i<len;i++){var img=images[i];if(img.width==0||img.height==0){var context={'popup':this,'img':img};img._onImgLoad=OpenLayers.Function.bind(onImgLoad,context);OpenLayers.Event.observe(img,'load',img._onImgLoad);}}},getSafeContentSize:function(size){var safeContentSize=size.clone();var contentDivPadding=this.getContentDivPadding();var wPadding=contentDivPadding.left+contentDivPadding.right;var hPadding=contentDivPadding.top+contentDivPadding.bottom;this.fixPadding();wPadding+=this.padding.left+this.padding.right;hPadding+=this.padding.top+this.padding.bottom;if(this.closeDiv){var closeDivWidth=parseInt(this.closeDiv.style.width);wPadding+=closeDivWidth+contentDivPadding.right;}
if(this.minSize){safeContentSize.w=Math.max(safeContentSize.w,(this.minSize.w-wPadding));safeContentSize.h=Math.max(safeContentSize.h,(this.minSize.h-hPadding));}
if(this.maxSize){safeContentSize.w=Math.min(safeContentSize.w,(this.maxSize.w-wPadding));safeContentSize.h=Math.min(safeContentSize.h,(this.maxSize.h-hPadding));}
if(this.map&&this.map.size){var extraX=0,extraY=0;if(this.keepInMap&&!this.panMapIfOutOfView){var px=this.map.getPixelFromLonLat(this.lonlat);switch(this.relativePosition){case"tr":extraX=px.x;extraY=this.map.size.h-px.y;break;case"tl":extraX=this.map.size.w-px.x;extraY=this.map.size.h-px.y;break;case"bl":extraX=this.map.size.w-px.x;extraY=px.y;break;case"br":extraX=px.x;extraY=px.y;break;default:extraX=px.x;extraY=this.map.size.h-px.y;break;}}
var maxY=this.map.size.h-
this.map.paddingForPopups.top-
this.map.paddingForPopups.bottom-
hPadding-extraY;var maxX=this.map.size.w-
this.map.paddingForPopups.left-
this.map.paddingForPopups.right-
wPadding-extraX;safeContentSize.w=Math.min(safeContentSize.w,maxX);safeContentSize.h=Math.min(safeContentSize.h,maxY);}
return safeContentSize;},getContentDivPadding:function(){var contentDivPadding=this._contentDivPadding;if(!contentDivPadding){if(this.div.parentNode==null){this.div.style.display="none";document.body.appendChild(this.div);}
contentDivPadding=new OpenLayers.Bounds(OpenLayers.Element.getStyle(this.contentDiv,"padding-left"),OpenLayers.Element.getStyle(this.contentDiv,"padding-bottom"),OpenLayers.Element.getStyle(this.contentDiv,"padding-right"),OpenLayers.Element.getStyle(this.contentDiv,"padding-top"));this._contentDivPadding=contentDivPadding;if(this.div.parentNode==document.body){document.body.removeChild(this.div);this.div.style.display="";}}
return contentDivPadding;},addCloseBox:function(callback){this.closeDiv=OpenLayers.Util.createDiv(this.id+"_close",null,{w:17,h:17});this.closeDiv.className="olPopupCloseBox";var contentDivPadding=this.getContentDivPadding();this.closeDiv.style.right=contentDivPadding.right+"px";this.closeDiv.style.top=contentDivPadding.top+"px";this.groupDiv.appendChild(this.closeDiv);var closePopup=callback||function(e){this.hide();OpenLayers.Event.stop(e);};OpenLayers.Event.observe(this.closeDiv,"touchend",OpenLayers.Function.bindAsEventListener(closePopup,this));OpenLayers.Event.observe(this.closeDiv,"click",OpenLayers.Function.bindAsEventListener(closePopup,this));},panIntoView:function(){var mapSize=this.map.getSize();var origTL=this.map.getViewPortPxFromLayerPx(new OpenLayers.Pixel(parseInt(this.div.style.left),parseInt(this.div.style.top)));var newTL=origTL.clone();if(origTL.x<this.map.paddingForPopups.left){newTL.x=this.map.paddingForPopups.left;}else
if((origTL.x+this.size.w)>(mapSize.w-this.map.paddingForPopups.right)){newTL.x=mapSize.w-this.map.paddingForPopups.right-this.size.w;}
if(origTL.y<this.map.paddingForPopups.top){newTL.y=this.map.paddingForPopups.top;}else
if((origTL.y+this.size.h)>(mapSize.h-this.map.paddingForPopups.bottom)){newTL.y=mapSize.h-this.map.paddingForPopups.bottom-this.size.h;}
var dx=origTL.x-newTL.x;var dy=origTL.y-newTL.y;this.map.pan(dx,dy);},registerEvents:function(){this.events=new OpenLayers.Events(this,this.div,null,true);function onTouchstart(evt){OpenLayers.Event.stop(evt,true);}
this.events.on({"mousedown":this.onmousedown,"mousemove":this.onmousemove,"mouseup":this.onmouseup,"click":this.onclick,"mouseout":this.onmouseout,"dblclick":this.ondblclick,"touchstart":onTouchstart,scope:this});},onmousedown:function(evt){this.mousedown=true;OpenLayers.Event.stop(evt,true);},onmousemove:function(evt){if(this.mousedown){OpenLayers.Event.stop(evt,true);}},onmouseup:function(evt){if(this.mousedown){this.mousedown=false;OpenLayers.Event.stop(evt,true);}},onclick:function(evt){OpenLayers.Event.stop(evt,true);},onmouseout:function(evt){this.mousedown=false;},ondblclick:function(evt){OpenLayers.Event.stop(evt,true);},CLASS_NAME:"OpenLayers.Popup"});OpenLayers.Popup.WIDTH=200;OpenLayers.Popup.HEIGHT=200;OpenLayers.Popup.COLOR="white";OpenLayers.Popup.OPACITY=1;OpenLayers.Popup.BORDER="0px";OpenLayers.Control.SelectFeature=OpenLayers.Class(OpenLayers.Control,{multipleKey:null,toggleKey:null,multiple:false,clickout:true,toggle:false,hover:false,highlightOnly:false,box:false,onBeforeSelect:function(){},onSelect:function(){},onUnselect:function(){},scope:null,geometryTypes:null,layer:null,layers:null,callbacks:null,selectStyle:null,renderIntent:"select",handlers:null,initialize:function(layers,options){OpenLayers.Control.prototype.initialize.apply(this,[options]);if(this.scope===null){this.scope=this;}
this.initLayer(layers);var callbacks={click:this.clickFeature,clickout:this.clickoutFeature};if(this.hover){callbacks.over=this.overFeature;callbacks.out=this.outFeature;}
this.callbacks=OpenLayers.Util.extend(callbacks,this.callbacks);this.handlers={feature:new OpenLayers.Handler.Feature(this,this.layer,this.callbacks,{geometryTypes:this.geometryTypes})};if(this.box){this.handlers.box=new OpenLayers.Handler.Box(this,{done:this.selectBox},{boxDivClassName:"olHandlerBoxSelectFeature"});}},initLayer:function(layers){if(OpenLayers.Util.isArray(layers)){this.layers=layers;this.layer=new OpenLayers.Layer.Vector.RootContainer(this.id+"_container",{layers:layers});}else{this.layer=layers;}},destroy:function(){if(this.active&&this.layers){this.map.removeLayer(this.layer);}
OpenLayers.Control.prototype.destroy.apply(this,arguments);if(this.layers){this.layer.destroy();}},activate:function(){if(!this.active){if(this.layers){this.map.addLayer(this.layer);}
this.handlers.feature.activate();if(this.box&&this.handlers.box){this.handlers.box.activate();}}
return OpenLayers.Control.prototype.activate.apply(this,arguments);},deactivate:function(){if(this.active){this.handlers.feature.deactivate();if(this.handlers.box){this.handlers.box.deactivate();}
if(this.layers){this.map.removeLayer(this.layer);}}
return OpenLayers.Control.prototype.deactivate.apply(this,arguments);},unselectAll:function(options){var layers=this.layers||[this.layer],layer,feature,l,numExcept;for(l=0;l<layers.length;++l){layer=layers[l];numExcept=0;if(layer.selectedFeatures!=null){while(layer.selectedFeatures.length>numExcept){feature=layer.selectedFeatures[numExcept];if(!options||options.except!=feature){this.unselect(feature);}else{++numExcept;}}}}},clickFeature:function(feature){if(!this.hover){var selected=(OpenLayers.Util.indexOf(feature.layer.selectedFeatures,feature)>-1);if(selected){if(this.toggleSelect()){this.unselect(feature);}else if(!this.multipleSelect()){this.unselectAll({except:feature});}}else{if(!this.multipleSelect()){this.unselectAll({except:feature});}
this.select(feature);}}},multipleSelect:function(){return this.multiple||(this.handlers.feature.evt&&this.handlers.feature.evt[this.multipleKey]);},toggleSelect:function(){return this.toggle||(this.handlers.feature.evt&&this.handlers.feature.evt[this.toggleKey]);},clickoutFeature:function(feature){if(!this.hover&&this.clickout){this.unselectAll();}},overFeature:function(feature){var layer=feature.layer;if(this.hover){if(this.highlightOnly){this.highlight(feature);}else if(OpenLayers.Util.indexOf(layer.selectedFeatures,feature)==-1){this.select(feature);}}},outFeature:function(feature){if(this.hover){if(this.highlightOnly){if(feature._lastHighlighter==this.id){if(feature._prevHighlighter&&feature._prevHighlighter!=this.id){delete feature._lastHighlighter;var control=this.map.getControl(feature._prevHighlighter);if(control){control.highlight(feature);}}else{this.unhighlight(feature);}}}else{this.unselect(feature);}}},highlight:function(feature){var layer=feature.layer;var cont=this.events.triggerEvent("beforefeaturehighlighted",{feature:feature});if(cont!==false){feature._prevHighlighter=feature._lastHighlighter;feature._lastHighlighter=this.id;var style=this.selectStyle||this.renderIntent;layer.drawFeature(feature,style);this.events.triggerEvent("featurehighlighted",{feature:feature});}},unhighlight:function(feature){var layer=feature.layer;if(feature._prevHighlighter==undefined){delete feature._lastHighlighter;}else if(feature._prevHighlighter==this.id){delete feature._prevHighlighter;}else{feature._lastHighlighter=feature._prevHighlighter;delete feature._prevHighlighter;}
layer.drawFeature(feature,feature.style||feature.layer.style||"default");this.events.triggerEvent("featureunhighlighted",{feature:feature});},select:function(feature){var cont=this.onBeforeSelect.call(this.scope,feature);var layer=feature.layer;if(cont!==false){cont=layer.events.triggerEvent("beforefeatureselected",{feature:feature});if(cont!==false){layer.selectedFeatures.push(feature);this.highlight(feature);if(!this.handlers.feature.lastFeature){this.handlers.feature.lastFeature=layer.selectedFeatures[0];}
layer.events.triggerEvent("featureselected",{feature:feature});this.onSelect.call(this.scope,feature);}}},unselect:function(feature){var layer=feature.layer;this.unhighlight(feature);OpenLayers.Util.removeItem(layer.selectedFeatures,feature);layer.events.triggerEvent("featureunselected",{feature:feature});this.onUnselect.call(this.scope,feature);},selectBox:function(position){if(position instanceof OpenLayers.Bounds){var minXY=this.map.getLonLatFromPixel({x:position.left,y:position.bottom});var maxXY=this.map.getLonLatFromPixel({x:position.right,y:position.top});var bounds=new OpenLayers.Bounds(minXY.lon,minXY.lat,maxXY.lon,maxXY.lat);if(!this.multipleSelect()){this.unselectAll();}
var prevMultiple=this.multiple;this.multiple=true;var layers=this.layers||[this.layer];this.events.triggerEvent("boxselectionstart",{layers:layers});var layer;for(var l=0;l<layers.length;++l){layer=layers[l];for(var i=0,len=layer.features.length;i<len;++i){var feature=layer.features[i];if(!feature.getVisibility()){continue;}
if(this.geometryTypes==null||OpenLayers.Util.indexOf(this.geometryTypes,feature.geometry.CLASS_NAME)>-1){if(bounds.toGeometry().intersects(feature.geometry)){if(OpenLayers.Util.indexOf(layer.selectedFeatures,feature)==-1){this.select(feature);}}}}}
this.multiple=prevMultiple;this.events.triggerEvent("boxselectionend",{layers:layers});}},setMap:function(map){this.handlers.feature.setMap(map);if(this.box){this.handlers.box.setMap(map);}
OpenLayers.Control.prototype.setMap.apply(this,arguments);},setLayer:function(layers){var isActive=this.active;this.unselectAll();this.deactivate();if(this.layers){this.layer.destroy();this.layers=null;}
this.initLayer(layers);this.handlers.feature.layer=this.layer;if(isActive){this.activate();}},addLayer:function(layer){var isActive=this.active;this.deactivate();if(this.layers==null){if(this.layer!=null){this.layers=[this.layer];this.layers.push(layer);}else{this.layers=[layer];}}else{this.layers.push(layer);}
this.initLayer(this.layers);this.handlers.feature.layer=this.layer;if(isActive){this.activate();}},CLASS_NAME:"OpenLayers.Control.SelectFeature"});OpenLayers.Control.Zoom=OpenLayers.Class(OpenLayers.Control,{zoomInText:"+",zoomInId:"olZoomInLink",zoomOutText:"\u2212",zoomOutId:"olZoomOutLink",draw:function(){var div=OpenLayers.Control.prototype.draw.apply(this),links=this.getOrCreateLinks(div),zoomIn=links.zoomIn,zoomOut=links.zoomOut,eventsInstance=this.map.events;if(zoomOut.parentNode!==div){eventsInstance=this.events;eventsInstance.attachToElement(zoomOut.parentNode);}
eventsInstance.register("buttonclick",this,this.onZoomClick);this.zoomInLink=zoomIn;this.zoomOutLink=zoomOut;return div;},getOrCreateLinks:function(el){var zoomIn=document.getElementById(this.zoomInId),zoomOut=document.getElementById(this.zoomOutId);if(!zoomIn){zoomIn=document.createElement("a");zoomIn.href="#zoomIn";zoomIn.appendChild(document.createTextNode(this.zoomInText));zoomIn.className="olControlZoomIn";el.appendChild(zoomIn);}
OpenLayers.Element.addClass(zoomIn,"olButton");if(!zoomOut){zoomOut=document.createElement("a");zoomOut.href="#zoomOut";zoomOut.appendChild(document.createTextNode(this.zoomOutText));zoomOut.className="olControlZoomOut";el.appendChild(zoomOut);}
OpenLayers.Element.addClass(zoomOut,"olButton");return{zoomIn:zoomIn,zoomOut:zoomOut};},onZoomClick:function(evt){var button=evt.buttonElement;if(button===this.zoomInLink){this.map.zoomIn();}else if(button===this.zoomOutLink){this.map.zoomOut();}},destroy:function(){if(this.map){this.map.events.unregister("buttonclick",this,this.onZoomClick);}
delete this.zoomInLink;delete this.zoomOutLink;OpenLayers.Control.prototype.destroy.apply(this);},CLASS_NAME:"OpenLayers.Control.Zoom"});OpenLayers.Geometry.Curve=OpenLayers.Class(OpenLayers.Geometry.MultiPoint,{componentTypes:["OpenLayers.Geometry.Point"],getLength:function(){var length=0.0;if(this.components&&(this.components.length>1)){for(var i=1,len=this.components.length;i<len;i++){length+=this.components[i-1].distanceTo(this.components[i]);}}
return length;},getGeodesicLength:function(projection){var geom=this;if(projection){var gg=new OpenLayers.Projection("EPSG:4326");if(!gg.equals(projection)){geom=this.clone().transform(projection,gg);}}
var length=0.0;if(geom.components&&(geom.components.length>1)){var p1,p2;for(var i=1,len=geom.components.length;i<len;i++){p1=geom.components[i-1];p2=geom.components[i];length+=OpenLayers.Util.distVincenty({lon:p1.x,lat:p1.y},{lon:p2.x,lat:p2.y});}}
return length*1000;},CLASS_NAME:"OpenLayers.Geometry.Curve"});OpenLayers.Geometry.LineString=OpenLayers.Class(OpenLayers.Geometry.Curve,{removeComponent:function(point){var removed=this.components&&(this.components.length>2);if(removed){OpenLayers.Geometry.Collection.prototype.removeComponent.apply(this,arguments);}
return removed;},intersects:function(geometry){var intersect=false;var type=geometry.CLASS_NAME;if(type=="OpenLayers.Geometry.LineString"||type=="OpenLayers.Geometry.LinearRing"||type=="OpenLayers.Geometry.Point"){var segs1=this.getSortedSegments();var segs2;if(type=="OpenLayers.Geometry.Point"){segs2=[{x1:geometry.x,y1:geometry.y,x2:geometry.x,y2:geometry.y}];}else{segs2=geometry.getSortedSegments();}
var seg1,seg1x1,seg1x2,seg1y1,seg1y2,seg2,seg2y1,seg2y2;outer:for(var i=0,len=segs1.length;i<len;++i){seg1=segs1[i];seg1x1=seg1.x1;seg1x2=seg1.x2;seg1y1=seg1.y1;seg1y2=seg1.y2;inner:for(var j=0,jlen=segs2.length;j<jlen;++j){seg2=segs2[j];if(seg2.x1>seg1x2){break;}
if(seg2.x2<seg1x1){continue;}
seg2y1=seg2.y1;seg2y2=seg2.y2;if(Math.min(seg2y1,seg2y2)>Math.max(seg1y1,seg1y2)){continue;}
if(Math.max(seg2y1,seg2y2)<Math.min(seg1y1,seg1y2)){continue;}
if(OpenLayers.Geometry.segmentsIntersect(seg1,seg2)){intersect=true;break outer;}}}}else{intersect=geometry.intersects(this);}
return intersect;},getSortedSegments:function(){var numSeg=this.components.length-1;var segments=new Array(numSeg),point1,point2;for(var i=0;i<numSeg;++i){point1=this.components[i];point2=this.components[i+1];if(point1.x<point2.x){segments[i]={x1:point1.x,y1:point1.y,x2:point2.x,y2:point2.y};}else{segments[i]={x1:point2.x,y1:point2.y,x2:point1.x,y2:point1.y};}}
function byX1(seg1,seg2){return seg1.x1-seg2.x1;}
return segments.sort(byX1);},splitWithSegment:function(seg,options){var edge=!(options&&options.edge===false);var tolerance=options&&options.tolerance;var lines=[];var verts=this.getVertices();var points=[];var intersections=[];var split=false;var vert1,vert2,point;var node,vertex,target;var interOptions={point:true,tolerance:tolerance};var result=null;for(var i=0,stop=verts.length-2;i<=stop;++i){vert1=verts[i];points.push(vert1.clone());vert2=verts[i+1];target={x1:vert1.x,y1:vert1.y,x2:vert2.x,y2:vert2.y};point=OpenLayers.Geometry.segmentsIntersect(seg,target,interOptions);if(point instanceof OpenLayers.Geometry.Point){if((point.x===seg.x1&&point.y===seg.y1)||(point.x===seg.x2&&point.y===seg.y2)||point.equals(vert1)||point.equals(vert2)){vertex=true;}else{vertex=false;}
if(vertex||edge){if(!point.equals(intersections[intersections.length-1])){intersections.push(point.clone());}
if(i===0){if(point.equals(vert1)){continue;}}
if(point.equals(vert2)){continue;}
split=true;if(!point.equals(vert1)){points.push(point);}
lines.push(new OpenLayers.Geometry.LineString(points));points=[point.clone()];}}}
if(split){points.push(vert2.clone());lines.push(new OpenLayers.Geometry.LineString(points));}
if(intersections.length>0){var xDir=seg.x1<seg.x2?1:-1;var yDir=seg.y1<seg.y2?1:-1;result={lines:lines,points:intersections.sort(function(p1,p2){return(xDir*p1.x-xDir*p2.x)||(yDir*p1.y-yDir*p2.y);})};}
return result;},split:function(target,options){var results=null;var mutual=options&&options.mutual;var sourceSplit,targetSplit,sourceParts,targetParts;if(target instanceof OpenLayers.Geometry.LineString){var verts=this.getVertices();var vert1,vert2,seg,splits,lines,point;var points=[];sourceParts=[];for(var i=0,stop=verts.length-2;i<=stop;++i){vert1=verts[i];vert2=verts[i+1];seg={x1:vert1.x,y1:vert1.y,x2:vert2.x,y2:vert2.y};targetParts=targetParts||[target];if(mutual){points.push(vert1.clone());}
for(var j=0;j<targetParts.length;++j){splits=targetParts[j].splitWithSegment(seg,options);if(splits){lines=splits.lines;if(lines.length>0){lines.unshift(j,1);Array.prototype.splice.apply(targetParts,lines);j+=lines.length-2;}
if(mutual){for(var k=0,len=splits.points.length;k<len;++k){point=splits.points[k];if(!point.equals(vert1)){points.push(point);sourceParts.push(new OpenLayers.Geometry.LineString(points));if(point.equals(vert2)){points=[];}else{points=[point.clone()];}}}}}}}
if(mutual&&sourceParts.length>0&&points.length>0){points.push(vert2.clone());sourceParts.push(new OpenLayers.Geometry.LineString(points));}}else{results=target.splitWith(this,options);}
if(targetParts&&targetParts.length>1){targetSplit=true;}else{targetParts=[];}
if(sourceParts&&sourceParts.length>1){sourceSplit=true;}else{sourceParts=[];}
if(targetSplit||sourceSplit){if(mutual){results=[sourceParts,targetParts];}else{results=targetParts;}}
return results;},splitWith:function(geometry,options){return geometry.split(this,options);},getVertices:function(nodes){var vertices;if(nodes===true){vertices=[this.components[0],this.components[this.components.length-1]];}else if(nodes===false){vertices=this.components.slice(1,this.components.length-1);}else{vertices=this.components.slice();}
return vertices;},distanceTo:function(geometry,options){var edge=!(options&&options.edge===false);var details=edge&&options&&options.details;var result,best={};var min=Number.POSITIVE_INFINITY;if(geometry instanceof OpenLayers.Geometry.Point){var segs=this.getSortedSegments();var x=geometry.x;var y=geometry.y;var seg;for(var i=0,len=segs.length;i<len;++i){seg=segs[i];result=OpenLayers.Geometry.distanceToSegment(geometry,seg);if(result.distance<min){min=result.distance;if(details){best={distance:min,x0:result.x,y0:result.y,x1:x,y1:y,index:i,indexDistance:new OpenLayers.Geometry.Point(seg.x1,seg.y1).distanceTo(geometry)};}else{best=min;}
if(min===0){break;}}}}else if(geometry instanceof OpenLayers.Geometry.LineString){var segs0=this.getSortedSegments();var segs1=geometry.getSortedSegments();var seg0,seg1,intersection,x0,y0;var len1=segs1.length;var interOptions={point:true};outer:for(var i=0,len=segs0.length;i<len;++i){seg0=segs0[i];x0=seg0.x1;y0=seg0.y1;for(var j=0;j<len1;++j){seg1=segs1[j];intersection=OpenLayers.Geometry.segmentsIntersect(seg0,seg1,interOptions);if(intersection){min=0;best={distance:0,x0:intersection.x,y0:intersection.y,x1:intersection.x,y1:intersection.y};break outer;}else{result=OpenLayers.Geometry.distanceToSegment({x:x0,y:y0},seg1);if(result.distance<min){min=result.distance;best={distance:min,x0:x0,y0:y0,x1:result.x,y1:result.y};}}}}
if(!details){best=best.distance;}
if(min!==0){if(seg0){result=geometry.distanceTo(new OpenLayers.Geometry.Point(seg0.x2,seg0.y2),options);var dist=details?result.distance:result;if(dist<min){if(details){best={distance:min,x0:result.x1,y0:result.y1,x1:result.x0,y1:result.y0};}else{best=dist;}}}}}else{best=geometry.distanceTo(this,options);if(details){best={distance:best.distance,x0:best.x1,y0:best.y1,x1:best.x0,y1:best.y0};}}
return best;},simplify:function(tolerance){if(this&&this!==null){var points=this.getVertices();if(points.length<3){return this;}
var compareNumbers=function(a,b){return(a-b);};var douglasPeuckerReduction=function(points,firstPoint,lastPoint,tolerance){var maxDistance=0;var indexFarthest=0;for(var index=firstPoint,distance;index<lastPoint;index++){distance=perpendicularDistance(points[firstPoint],points[lastPoint],points[index]);if(distance>maxDistance){maxDistance=distance;indexFarthest=index;}}
if(maxDistance>tolerance&&indexFarthest!=firstPoint){pointIndexsToKeep.push(indexFarthest);douglasPeuckerReduction(points,firstPoint,indexFarthest,tolerance);douglasPeuckerReduction(points,indexFarthest,lastPoint,tolerance);}};var perpendicularDistance=function(point1,point2,point){var area=Math.abs(0.5*(point1.x*point2.y+point2.x*point.y+point.x*point1.y-point2.x*point1.y-point.x*point2.y-point1.x*point.y));var bottom=Math.sqrt(Math.pow(point1.x-point2.x,2)+Math.pow(point1.y-point2.y,2));var height=area/bottom*2;return height;};var firstPoint=0;var lastPoint=points.length-1;var pointIndexsToKeep=[];pointIndexsToKeep.push(firstPoint);pointIndexsToKeep.push(lastPoint);while(points[firstPoint].equals(points[lastPoint])){lastPoint--;pointIndexsToKeep.push(lastPoint);}
douglasPeuckerReduction(points,firstPoint,lastPoint,tolerance);var returnPoints=[];pointIndexsToKeep.sort(compareNumbers);for(var index=0;index<pointIndexsToKeep.length;index++){returnPoints.push(points[pointIndexsToKeep[index]]);}
return new OpenLayers.Geometry.LineString(returnPoints);}
else{return this;}},CLASS_NAME:"OpenLayers.Geometry.LineString"});OpenLayers.Geometry.LineString.geodesic=function(interpolate,transform,squaredTolerance){var components=[];var geoA=interpolate(0);var geoB=interpolate(1);var a=transform(geoA);var b=transform(geoB);var geoStack=[geoB,geoA];var stack=[b,a];var fractionStack=[1,0];var fractions={};var maxIterations=1e5;var geoM,m,fracA,fracB,fracM,key;while(--maxIterations>0&&fractionStack.length>0){fracA=fractionStack.pop();geoA=geoStack.pop();a=stack.pop();key=fracA.toString();if(!(key in fractions)){components.push(a);fractions[key]=true;}
fracB=fractionStack.pop();geoB=geoStack.pop();b=stack.pop();fracM=(fracA+fracB)/2;geoM=interpolate(fracM);m=transform(geoM);if(OpenLayers.Geometry.distanceSquaredToSegment(m,{x1:a.x,y1:a.y,x2:b.x,y2:b.y}).distance<squaredTolerance){components.push(b);key=fracB.toString();fractions[key]=true;}else{fractionStack.push(fracB,fracM,fracM,fracA);stack.push(b,m,m,a);geoStack.push(geoB,geoM,geoM,geoA);}}
return new OpenLayers.Geometry.LineString(components);};OpenLayers.Geometry.LineString.geodesicMeridian=function(lon,lat1,lat2,projection,squaredTolerance){var epsg4326Projection=new OpenLayers.Projection('EPSG:4326');return OpenLayers.Geometry.LineString.geodesic(function(frac){return new OpenLayers.Geometry.Point(lon,lat1+((lat2-lat1)*frac));},function(point){return point.transform(epsg4326Projection,projection);},squaredTolerance);};OpenLayers.Geometry.LineString.geodesicParallel=function(lat,lon1,lon2,projection,squaredTolerance){var epsg4326Projection=new OpenLayers.Projection('EPSG:4326');return OpenLayers.Geometry.LineString.geodesic(function(frac){return new OpenLayers.Geometry.Point(lon1+((lon2-lon1)*frac),lat);},function(point){return point.transform(epsg4326Projection,projection);},squaredTolerance);};OpenLayers.Handler.Path=OpenLayers.Class(OpenLayers.Handler.Point,{line:null,maxVertices:null,doubleTouchTolerance:20,freehand:false,freehandToggle:'shiftKey',timerId:null,redoStack:null,createFeature:function(pixel){var lonlat=this.layer.getLonLatFromViewPortPx(pixel);var geometry=new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat);this.point=new OpenLayers.Feature.Vector(geometry);this.line=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString([this.point.geometry]));this.callback("create",[this.point.geometry,this.getSketch()]);this.point.geometry.clearBounds();this.layer.addFeatures([this.line,this.point],{silent:true});},destroyFeature:function(force){OpenLayers.Handler.Point.prototype.destroyFeature.call(this,force);this.line=null;},destroyPersistedFeature:function(){var layer=this.layer;if(layer&&layer.features.length>2){this.layer.features[0].destroy();}},removePoint:function(){if(this.point){this.layer.removeFeatures([this.point]);}},addPoint:function(pixel){this.layer.removeFeatures([this.point]);var lonlat=this.layer.getLonLatFromViewPortPx(pixel);this.point=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(lonlat.lon,lonlat.lat));this.line.geometry.addComponent(this.point.geometry,this.line.geometry.components.length);this.layer.addFeatures([this.point]);this.callback("point",[this.point.geometry,this.getGeometry()]);this.callback("modify",[this.point.geometry,this.getSketch()]);this.drawFeature();delete this.redoStack;},insertXY:function(x,y){this.line.geometry.addComponent(new OpenLayers.Geometry.Point(x,y),this.getCurrentPointIndex());this.drawFeature();delete this.redoStack;},insertDeltaXY:function(dx,dy){var previousIndex=this.getCurrentPointIndex()-1;var p0=this.line.geometry.components[previousIndex];if(p0&&!isNaN(p0.x)&&!isNaN(p0.y)){this.insertXY(p0.x+dx,p0.y+dy);}},insertDirectionLength:function(direction,length){direction*=Math.PI/180;var dx=length*Math.cos(direction);var dy=length*Math.sin(direction);this.insertDeltaXY(dx,dy);},insertDeflectionLength:function(deflection,length){var previousIndex=this.getCurrentPointIndex()-1;if(previousIndex>0){var p1=this.line.geometry.components[previousIndex];var p0=this.line.geometry.components[previousIndex-1];var theta=Math.atan2(p1.y-p0.y,p1.x-p0.x);this.insertDirectionLength((theta*180/Math.PI)+deflection,length);}},getCurrentPointIndex:function(){return this.line.geometry.components.length-1;},undo:function(){var geometry=this.line.geometry;var components=geometry.components;var index=this.getCurrentPointIndex()-1;var target=components[index];var undone=geometry.removeComponent(target);if(undone){if(this.touch&&index>0){components=geometry.components;var lastpt=components[index-1];var curptidx=this.getCurrentPointIndex();var curpt=components[curptidx];curpt.x=lastpt.x;curpt.y=lastpt.y;}
if(!this.redoStack){this.redoStack=[];}
this.redoStack.push(target);this.drawFeature();}
return undone;},redo:function(){var target=this.redoStack&&this.redoStack.pop();if(target){this.line.geometry.addComponent(target,this.getCurrentPointIndex());this.drawFeature();}
return!!target;},freehandMode:function(evt){return(this.freehandToggle&&evt[this.freehandToggle])?!this.freehand:this.freehand;},modifyFeature:function(pixel,drawing){if(!this.line){this.createFeature(pixel);}
var lonlat=this.layer.getLonLatFromViewPortPx(pixel);this.point.geometry.x=lonlat.lon;this.point.geometry.y=lonlat.lat;this.callback("modify",[this.point.geometry,this.getSketch(),drawing]);this.point.geometry.clearBounds();this.drawFeature();},drawFeature:function(){this.layer.drawFeature(this.line,this.style);this.layer.drawFeature(this.point,this.style);},getSketch:function(){return this.line;},getGeometry:function(){var geometry=this.line&&this.line.geometry;if(geometry&&this.multi){geometry=new OpenLayers.Geometry.MultiLineString([geometry]);}
return geometry;},touchstart:function(evt){if(this.timerId&&this.passesTolerance(this.lastTouchPx,evt.xy,this.doubleTouchTolerance)){this.finishGeometry();window.clearTimeout(this.timerId);this.timerId=null;return false;}else{if(this.timerId){window.clearTimeout(this.timerId);this.timerId=null;}
this.timerId=window.setTimeout(OpenLayers.Function.bind(function(){this.timerId=null;},this),300);return OpenLayers.Handler.Point.prototype.touchstart.call(this,evt);}},down:function(evt){var stopDown=this.stopDown;if(this.freehandMode(evt)){stopDown=true;if(this.touch){this.modifyFeature(evt.xy,!!this.lastUp);OpenLayers.Event.stop(evt);}}
if(!this.touch&&(!this.lastDown||!this.passesTolerance(this.lastDown,evt.xy,this.pixelTolerance))){this.modifyFeature(evt.xy,!!this.lastUp);}
this.mouseDown=true;this.lastDown=evt.xy;this.stoppedDown=stopDown;return!stopDown;},move:function(evt){if(this.stoppedDown&&this.freehandMode(evt)){if(this.persist){this.destroyPersistedFeature();}
if(this.maxVertices&&this.line&&this.line.geometry.components.length===this.maxVertices){this.removePoint();this.finalize();}else{this.addPoint(evt.xy);}
return false;}
if(!this.touch&&(!this.mouseDown||this.stoppedDown)){this.modifyFeature(evt.xy,!!this.lastUp);}
return true;},up:function(evt){if(this.mouseDown&&(!this.lastUp||!this.lastUp.equals(evt.xy))){if(this.stoppedDown&&this.freehandMode(evt)){if(this.persist){this.destroyPersistedFeature();}
this.removePoint();this.finalize();}else{if(this.passesTolerance(this.lastDown,evt.xy,this.pixelTolerance)){if(this.touch){this.modifyFeature(evt.xy);}
if(this.lastUp==null&&this.persist){this.destroyPersistedFeature();}
this.addPoint(evt.xy);this.lastUp=evt.xy;if(this.line.geometry.components.length===this.maxVertices+1){this.finishGeometry();}}}}
this.stoppedDown=this.stopDown;this.mouseDown=false;return!this.stopUp;},finishGeometry:function(){var index=this.line.geometry.components.length-1;this.line.geometry.removeComponent(this.line.geometry.components[index]);this.removePoint();this.finalize();},dblclick:function(evt){if(!this.freehandMode(evt)){this.finishGeometry();}
return false;},CLASS_NAME:"OpenLayers.Handler.Path"});;(function(angular) {
	'use strict';

	/**
	 * @namespace ngMaps
	 */
	angular.module('ngMaps', [
		'ngMaps.factories',
		'ngMaps.services'
	]);

})(window.angular);
;(function(angular) {
	'use strict';

	/**
	 * @namespace factories
	 * @memberOf ngMaps
	 */
	angular.module('ngMaps.factories', []);

})(window.angular);
;(function(angular, OpenLayers, undefined) {
	'use strict';

	angular
		.module('ngMaps.factories')
		.factory('Map', MapFactory);

	/**
	 * @class
	 * @alias Map
	 * @type {Map}
	 * @memberOf ngMaps.factories
	 * @description Create a map instance
	 */
	function MapFactory (Maps) {

		/**
		 * Default options
		 *
		 * @var
		 * @type {Object}
		 * @private
		 */
		var _defaultOpts = {
			id: 'map',
			center: {
				lon: 0,
				lat: 0
			},
			zoom: 1,
			baselayers: {
				googleMaps: {
					numZoomLevels: 22,
					minZoomLevel: 0,
					maxZoomLevel: 21
				},
				googleMapsHybrid: {
					numZoomLevels: 22,
					minZoomLevel: 0,
					maxZoomLevel: 21
				},
				googleMapsNight: {
					numZoomLevels: 22,
					minZoomLevel: 0,
					maxZoomLevel: 21
				}
			},
			layers: {
				points: {
					title: 'Points'
				}
			},
			defaultControls: {
				mousePosition: {
					prefix: '',
					suffix: '',
					separator: '',
					numDigits: 5,
					emptyString: '',
					displayProjection: 'EPSG:4326'
				},
				navigation: {
					documentDrag: true,
					dragPanOptions: { enableKinetic: true },
					zoomWheelEnabled: true,
					handleRightClicks: false
				},
				geolocate: {
					bind: false,
					geolocationOption: {
						maximumAge: 0,
						timeout: 10000,
						enableHighAccuracy: true
					}
				},
				zoom: {},
			}
		};

		return {

			/**
			 * Map object
			 *
			 * @memberOf ngMaps.factories.Map
			 * @instance
			 * @private
			 * @type {OpenLayers.Map}
			 */
			 _map: null,

			/**
			 * Create a new map
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @param  {Object} opts Map options
			 * @return {Map}
			 */
			create: function(opts) {

				OpenLayers.Util.applyDefaults(opts, _defaultOpts);

				this._map = new OpenLayers.Map(opts.id, {
					theme: null,
					projection: 'EPSG:4326',
					displayProjection: 'EPSG:4326',
					controls: []
				});

				Maps.addBaseLayers(this._map, opts.baselayers);
				Maps.addLayers(this._map, opts.layers);

				Maps.addControls(this._map, opts.defaultControls);

				if(opts.hasOwnProperty('center'))
				{
					Maps.setCenter(this._map, opts.center, opts.zoom);
				}

				return angular.extend(opts, this);
			},

			/**
		   * Change the base layer
		   *
		   * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
		   * @param {Integer} Index of base layer. Options: default|hybrid|night
		   */
		  setBaseLayer: function(name) {
		    Maps.setBaseLayer(this._map, name);
		  },

			/**
			 * Set center of the map
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @param {Object} lonlat LonLat object
			 * @param {Integer} [zoom] Zoom level
			 */
			setCenter: function(lonlat, zoom) {
				Maps.setCenter(this._map, lonlat, zoom);
			},

			/**
			 * Get center of the map
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @return {Object} LonLat object
			 */
			getCenter: function() {
				return Maps.getCenter(this._map);
			},

			/**
			 * Get the max zoom level of the selected base layer
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @return {Integer} Zoom level
			 */
			getMaxZoomLevel: function() {
				return Maps.getMaxZoomLevel(this._map);
			},

			/**
			 * Get the zoom levels of the selected base layer
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @return {Array<Integer>} Array with zoom levels
			 */
			getZoomLevels: function() {
				return Maps.getZoomLevels(this._map);
			},

			/**
			 * Set zoom
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @param {Integer} zoom Zoom level
			 */
			setZoom: function(zoom) {
				Maps.setZoom(this._map, zoom);
			},

			/**
			 * Get zoom
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @return {Integer} Actual zoom level
			 */
			getZoom: function() {
				return Maps.getZoom(this._map);
			},

			/**
			 * Event of zoom change
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @return {Promise} Promise object
			 */
			onZoomChange: function(callback) {
				return Maps.onZoomChange(this._map, callback);
			},

			/**
			 * Use Geolocate to get position
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @param {Object} [opts] Geolocate options
			 * @return {Promise} Promise object
			 */
			getPosition: function(opts) {
				return Maps.getPosition(this._map, opts);
			},

			/**
			* Transform latlon object from projection to another
			*
			* @memberOf ngMaps.factories.Map
			* @function
			* @instance
			* @param {Object} lonlat LonLat object
			* @param {String} from From projection
			* @param {String} to To projection
			*
			* @return {Object} lonlat
			*/
			transform: function(lonlat, from, to) {
				return Maps.transform(lonlat, from, to);
			},

			/**
			 * Check if lonlat is in bounds
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @param {Object} lonlat LonLat object
			 * @param {Array(Number)} bounds Array with bounds [left, bottom, right, top]
			 *
			 * @return {Boolean}
			 */
			contains: function(lonlat, bounds) {
				return Maps.contains(lonlat, bounds);
			}

		};
	}

})(window.angular, OpenLayers);
;(function(angular) {
	'use strict';

	/**
	 * @namespace services
	 * @memberOf ngMaps
	 */
	angular.module('ngMaps.services', []);

})(window.angular);
;(function(angular, OpenLayers, undefined) {
	'use strict';

	angular
		.module('ngMaps.services')
		.service('Maps', MapsService);

	/**
	 * @class
	 * @alias Maps
	 * @type {Maps}
	 * @memberOf ngMaps.services
	 * @description Handle maps
	 */
	function MapsService ($q) {

		var baselayers = [];

		/**
		 * Add a base layer to the map
		 *
		 * @param {Map} map Map instance
		 * @param {String} type Base layer type
		 * @param {Object} opts Base layer options
		 */
		this.addBaseLayer = function(map, type, opts) {
			var baselayer;
			var styledType;
			var styledOptions;

			switch(type) {

				case 'googleMaps': {
					baselayer = new OpenLayers.Layer.Google('default', {
						numZoomLevels: opts.numZoomLevels,
						minZoomLevel: opts.minZoomLevel,
						maxZoomLevel: opts.maxZoomLevel
					});
				}
				break;

				case 'googleMapsHybrid': {
					baselayer = new OpenLayers.Layer.Google('hybrid', {
						type: google.maps.MapTypeId.HYBRID,
						numZoomLevels: opts.numZoomLevels,
						minZoomLevel: opts.minZoomLevel,
						maxZoomLevel: opts.maxZoomLevel
					});
				}
				break;

				case 'googleMapsNight': {
					baselayer = new OpenLayers.Layer.Google('night', {
						type: 'styled',
						numZoomLevels: opts.numZoomLevels,
						minZoomLevel: opts.minZoomLevel,
						maxZoomLevel: opts.maxZoomLevel
					});

					var styleNight = [{
		  			featureType: 'all',
						elementType: 'all',
						stylers: [
				      { "invert_lightness": true },
				      { "visibility": "on" },
				      { "hue": "#00bbff" },
				      { "saturation": 1 }
				    ]
				 	}];
					styledOptions = { name: 'Night Map' };
			  	styledType = new google.maps.StyledMapType(styleNight, styledOptions);
				}
				break;
			}

			map.addLayer(baselayer);

			if(styledType) {
				baselayer.mapObject.mapTypes.set('styled', styledType);
				baselayer.mapObject.setMapTypeId('styled');
			}
		};

		/**
		 * Add base layers to the map
		 * @param {Map} map        Map instance
		 * @param {Object} baselayers Baselayers
		 */
		this.addBaseLayers = function(map, baselayers) {
			for(var baselayer in baselayers) {
				this.addBaseLayer(map, baselayer, baselayers[baselayer]);
			}
		};

		/**
	   * Change the base layer
	   *
	   * @param {String} Type of the base layer. Options: default|hybrid|night
	   */
	  this.setBaseLayer = function(map, name) {
	  	var layer = map.getLayersByName(name)[0];
	  	if(layer) {
	    	map.setBaseLayer(layer);
	  	}
	  };

		/**
		 * Add a layer to the map
		 *
		 * @param {Map} map Map instance
		 * @param {Object} opts Layer options
		 */
		this.addLayer = function(map, opts) {
			var layer = new OpenLayers.Layer.Vector(opts.title);
			map.addLayer(layer);
		};

		/**
		 * Add layers to the map
		 *
		 * @param {Map} map Map instance
		 * @param {Object} layers Layers
		 */
		this.addLayers = function(map, layers) {
			for(var layer in layers) {
				this.addLayer(map, layers[layer]);
			}
		};

		/**
		 * Add a control to the map
		 *
		 * @param {Map} map Map instance
		 * @param {String} type Selected control
		 * @param {Object} opts Control options
		 */
		this.addControl = function(map, type, opts) {
			var control;
			opts = opts || {};

			switch(type) {

				case 'mousePosition': {
					control = new OpenLayers.Control.MousePosition(opts);
				}
				break;

				case 'navigation': {
					control = new OpenLayers.Control.Navigation(opts);
				}
				break;

				case 'zoom': {
					control = new OpenLayers.Control.Zoom(opts);
				}
				break;

				case 'geolocate': {
					control = new OpenLayers.Control.Geolocate(opts);
				}
				break;

				default: {
					alert('ngMaps: Control ' + type + ' not found.');
				}
				break;
			}

			map.addControl(control);
		};

		/**
		 * Add controls to the map
		 *
		 * @param {Map} map      Map instance
		 * @param {Object} controls Control options
		 */
		this.addControls = function(map, controls) {
			for(var control in controls) {
				this.addControl(map, control, controls[control]);
			}
		};

		/**
		 * Set the center of the map
		 *
		 * @param {Map} map Map instance
		 * @param {Object} lonlat LonLat object
		 * @param {Integer} [zoom] Zoom level
		 * @param {Object} [opts] Options
		 */
		this.setCenter = function(map, lonlat, zoom, opts) {
			opts = opts || {};

			OpenLayers.Util.applyDefaults(opts, {
				transformTo: 'EPSG:4326'
			});

			var point = new OpenLayers.LonLat(lonlat.lon, lonlat.lat);

			if(opts.hasOwnProperty('transformTo'))
			{
				point = point.transform(opts.transformTo, map.getProjection());
			}

			map.setCenter(point, zoom);
		};

		/**
		 * Get center of map
		 *
		 * @param {Map} map Map instance
		 * @return {Object} LonLat object
		 */
		this.getCenter = function(map, opts)
		{
			opts = opts || {};

			OpenLayers.Util.applyDefaults(opts, {
				transformTo: 'EPSG:4326'
			});

			var center = map.getCenter();
			if (opts.hasOwnProperty('transformTo')) {
				center = center.transform(map.getProjection(), opts.transformTo);
			}

			var lonlat = {
				lon: center.lon,
				lat: center.lat
			};

			return lonlat;
		};

		/**
		 * Get the max zoom level of the base layer
		 *
		 * @param  {Map} map Map instance
		 * @return {Integer}  The the number of max zoom level that can be displayed by the current base layer
		 */
		this.getMaxZoomLevel = function(map) {
			return map.getNumZoomLevels();
		};

		/**
		 * Get the all zoom levels of the base layer
		 *
		 * @param  {Max} map Max instance
		 * @return {Array} Array of zoom of can be displayed by the current base layer
		 */
		this.getZoomLevels = function(map) {
			var arr = [];
			var maxZoomLevel = map.getNumZoomLevels();
			for(var i = 1; i < maxZoomLevel; i++) {
				arr.push(i);
			}
			return arr;
		};

		/**
		 * Set zoom of the map
		 *
		 * @param {Map} map  Map instance
		 * @param {Integer} zoom Zoom level
		 */
		this.setZoom = function(map, zoom) {
			map.setCenter(null, zoom);
		};

		/**
		 * Get zoom of the map
		 *
		 * @param  {Map} map Map instance
		 * @return {Integer} Actual zoom level
		 */
		this.getZoom = function(map) {
			return map.getZoom();
		};

		/**
		 * Event of zoom change
		 *
		 * @param  {Map} map Map instance
		 * @param  {Function} callback Callback function
		 * @return {Promise} Promise object
		 */
		this.onZoomChange = function(map, callback) {
			map.events.register('zoomend', map, function(e) {
				var zoom = map.getZoom();
				callback(zoom);
			});
		};

		/**
		 * Use Geolocate to get position
		 *
		 * @param  {Map} map  Map instance
		 * @param  {Object}  [opts] Geolocate options
		 * @return {Promise} Promise object
		 */
		this.getPosition = function(map, opts) {
			opts = opts || { };

			OpenLayers.Util.applyDefaults(opts, {
				bind: true,
				transformTo: 'EPSG:4326',
				geolocationOption: {
					maximumAge: 0,
					timeout: 10000,
					enableHighAccuracy: true
				}
			});

			var control = new OpenLayers.Control.Geolocate(opts);
			var deferred = $q.defer();

			control.events.register('locationuncapable', map, function() {
				var msg = "Error\n\nThe device does not support Geolocation.";
				deferred.reject(msg);
			});

			control.events.register('locationfailed', map, function(e) {
				var msg;
				if(e.hasOwnProperty('error'))
  			{
  				msg = 'Position Error (Code ' + e.error.code + ")\n\n";
  				msg += e.error.message;
  			}
  			else
  			{
	      	msg = "Error\n\nFailed to get your position.";
  			}
				deferred.reject(msg);
			});

			control.events.register('locationupdated', map, function(e) {
				var point = e.point.transform(map.getProjection(), opts.transformTo);
				var lonlat = {
					lon: e.point.x,
					lat: e.point.y
				};

				deferred.resolve(lonlat);
			});

			map.addControl(control);

			control.activate();
			control.getCurrentLocation();

			return deferred.promise;
		};


		/**
		 * Transform latlon object from projection to another
		 *
		 * @param {Object} lonlat LonLat object
		 * @param {String} from From projection
		 * @param {String} to To projection
		 *
		 * @return {Object} lonlat
		 */
		this.transform = function(lonlat, from, to) {
			var dest = new OpenLayers.LonLat(lonlat.lon, lonlat.lat);
			dest = dest.transform(from, to);
			return { lon: dest.lon, lat: dest.lat };
		};

		/**
		 * Check if lonlat is in bounds
		 *
		 * @param {Object} lonlat LonLat object
		 * @param {Array(Number)} bounds Array with bounds [left, bottom, right, top]
		 *
		 * @return {Boolean}
		 */
		this.contains = function(lonlat, bounds) {
			if(bounds === undefined || bounds.length !== 4) return false;

			bounds = new OpenLayers.Bounds(bounds[0], bounds[1], bounds[2], bounds[3]);
			return bounds.containsLonLat(lonlat);
		};

	}

})(window.angular, OpenLayers);
