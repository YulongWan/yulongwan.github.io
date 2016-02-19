/**
******************************************************************
* css3 keyframes åŠ¨ç”»æ’ä»¶
* version: 0.4.1
* author: hcp0209@gmail.com  1132116470@qq.com
******************************************************************
*/
;(function($,undefined){
	var prefix = getPrefix(), //æµè§ˆå™¨å‰ç¼€
		animationendName = getAnimationendEvent(prefix); //åŠ¨ç”»ç»“æŸäº‹ä»¶å
	$.fn.anime = function(name,duration,ease,delay,iteration,direction,state,mode,cssValue,onComplete){
		var that = this,
			args = parseArgs(Array.prototype.slice.call(arguments,0)); //è§£æžå‡ºæ¥çš„å‚æ•°

		args.css = convertCSSValues(args.css); //è½¬æ¢ç‰¹æ®Šå±žæ€§

		this.each(function(){
			$(this).queue(function(){
				var currentAnimationName = args['css'][prefix+'animation-name']; //å½“å‰çš„åŠ¨ç”»å
				if(!$(this).data('registerAnimationEnd')){
					$(this).bind(animationendName,function(e){
						//æ ¹æ®åŠ¨ç”»åç§°è§¦å‘ä¸€ä¸ªè‡ªå®šä¹‰äº‹ä»¶
						var aniName = e.originalEvent.animationName;
						$(this).trigger('animationend:'+aniName,[e.originalEvent]);
						$(this).trigger('animationend:then:'+aniName);
					});
					$(this).data('registerAnimationEnd',1);
				}
				var customEventName = 'animationend:' + currentAnimationName;
				if(args['callback']){//éœ€è¦åŠ¨ç”»å®Œæˆæ—¶çš„å›žè°ƒ
					$(this).unbind(customEventName).bind(customEventName,args['callback']); //bindå‰å…ˆunbindä¸€æ¬¡ï¼Œä¿è¯åŒä¸€ä¸ªå…ƒç´ åŒä¸€ä¸ªåå­—çš„åŠ¨ç”»æ°¸è¿œåªæœ‰ä¸€ä¸ªå›žè°ƒå‡½æ•°
				}else{
					$(this).unbind(customEventName); //æ¸…é™¤ä¹‹å‰æ³¨å†Œçš„å›žè°ƒ
				}
				$(this).data('currentAnimationName',currentAnimationName) //å‚¨å­˜å½“å‰çš„åŠ¨ç”»åç§°
					   .css(prefix+'animation','none') //è¿™æ ·æ‰èƒ½èƒ½é‡å¤è°ƒç”¨åŒä¸€ä¸ªåŠ¨ç”»
					   .css(args['css'])
				       .dequeue();
			});
		});
		return this;
	}

	$.fn.then = function(){
		this.each(function(){
			$(this).queue(function(next){
				var currentAnimationName = $(this).data('currentAnimationName');
				if(currentAnimationName){
					var thenEvent = 'animationend:then:' + currentAnimationName;
					$(this).unbind(thenEvent).bind(thenEvent,next);
				}
			});
		});
		return this;
	}
	//ä¸æ”¯æŒåŠ¨ç”»
	if(prefix===null){
		$.fn.anime = function(){}
	}

	function parseArgs(args){//å‚æ•°è§£æž
		var cssValues = {},
			callback = null;
		if($.isPlainObject(args[0])){//ç¬¬ä¸€ä¸ªå‚æ•°æ˜¯å¯¹è±¡
			args[0] = $.keyframes(args[0]); //åŠ¨æ€ç”Ÿæˆå…³é”®å¸§åŠ¨ç”»
		}	
		cssValues[prefix+'animation-name'] = args[0];//ç¬¬ä¸€ä¸ªå‚æ•°å¿…é¡»æ˜¯animationName
		for(var i=1, len=args.length; i<len; i++){
			var arg = args[i];
			if(typeof arg === 'string' && /ms$|s$/.test(arg)){//ä¸ºdurationæˆ–delay
				!cssValues[prefix+'animation-duration'] ? cssValues[prefix+'animation-duration'] = arg : cssValues[prefix+'animation-delay'] = arg;
			}else if(typeof arg === 'string' && /^(linear|ease|ease\-in|ease\-out|ease\-in\-out|cubic\-bezier\(.+\))$/.test(arg)){//ç¼“åŠ¨ç±»åž‹
				cssValues[prefix+'animation-timing-function'] = arg;
			}else if(typeof arg === 'number' || /^\d+$/.test(arg) || arg==='infinite'){//å¾ªçŽ¯æ¬¡æ•°
				cssValues[prefix+'animation-iteration-count'] = arg + '';
			}else if(typeof arg === 'string' && /^(normal|alternate)$/.test(arg)){//æ–¹å‘
				cssValues[prefix+'animation-direction'] = arg;
			}else if(typeof arg === 'string' && /^(pause|runing)$/.test(arg)){//åŠ¨ç”»æ’­æ”¾çŠ¶æ€
				cssValues[prefix+'animation-play-state'] = arg;
			}else if(typeof arg === 'string' && /^(none|forwards|backwards|both)$/.test(arg)){ //åŠ¨ç”»ä¹‹å¤–çš„çŠ¶æ€
				cssValues[prefix+'animation-fill-mode'] = arg;
			}else if($.isPlainObject(arg)){//é¢å¤–csså‚æ•°
				$.extend(cssValues,arg);
			}else if($.isFunction(arg)){//åŠ¨ç”»å®Œæˆæ—¶çš„å›žè°ƒ
				callback = arg;
			}
		}
		return {
			css : cssValues,
			callback : callback
		}
	}


	function getPrefix(){
		var div = document.createElement('div');
			style = div.style;
		if('animation' in style) return '';
		var prefixs = ['Webkit','Moz','O','ms'];
		for(var i=0; i<prefixs.length; i++){
			if(prefixs[i]+'Animation' in style) return '-' + prefixs[i].toLowerCase() + '-';
		}
		return null;
	}

	function getAnimationendEvent(prefix){
		if(typeof prefix=='undefined') prefix = getPrefix();
		if(prefix==='') return 'animationend';
		var map = {
			'-webkit-' : 'webkitAnimationEnd',
			'-moz-' : 'animationend',
			'-ms-' : 'MSAnimationEnd',
			'-o-' : 'oanimationend'
		}
		return map[prefix];
	}


	/******å…³é”®å¸§æ“ä½œ***************************************************/
	var keyframesRules = {}; //å·²ç»ç”Ÿæˆçš„åŠ¨ç”»è§„åˆ™é›†åˆï¼Œé”®åä¸ºåŠ¨ç”»å
	var styleElem,styleSheet;
	$.keyframes = function(name,frames){
		if(typeof name == 'object'){
			frames = name;
			if(!frames.name) name = 'anime_animation' + setTimeout('0');
		}
		if(frames.name){ //è§„å®šäº†åç§°
			name = frames.name;
			delete frames.name;
		}
		if(frames.replace){ //æ˜¯å¦æ›¿æ¢å­˜åœ¨çš„åŠ¨ç”»,replaceä¸ºTRUEæ—¶æ›¿æ¢,é»˜è®¤ä¸ºä¸æ›¿æ¢
			var replace = true;
			delete frames.replace;
		}
		if(!styleElem) KeyframeInit();
		if(keyframesRules[name]){
			if(replace) replaceKeyframesRule(name, frames); //éœ€è¦æ›¿æ¢æ—¶æ‰æ›¿æ¢ï¼Œå¦åˆ™ä»€ä¹ˆéƒ½ä¸åš
		}
		else createKeyframesRule(name, frames);
		return name;
	}
	//ä¸æ”¯æŒåŠ¨ç”»
	if(prefix===null){
		$.keyframes = function(){}
	}

	//æ–°å»ºåŠ¨ç”»è§„åˆ™ï¼Œnameä¸ºåŠ¨ç”»åï¼Œframesä¸ºå¸§æ•°æ®å¯¹è±¡
	function createKeyframesRule(name,frames){
		var framesText = generateKeyframesText(frames);
		//http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleSheet
		var index = styleSheet.insertRule('@'+prefix+'keyframes ' + name + framesText, styleSheet.cssRules.length);
		keyframesRules[name] = styleSheet.cssRules[index];
	}

	//æ›¿æ¢å·²æœ‰çš„åŠ¨ç”»è§„åˆ™ï¼Œnameä¸ºåŠ¨ç”»åï¼Œframesä¸ºå¸§æ•°æ®å¯¹è±¡
	function replaceKeyframesRule(name,frames){
		var framesText = generateKeyframesText(frames);
		if(keyframesRules[name]){//åˆ é™¤å·²æœ‰çš„
			var cssRules = styleSheet.cssRules;
			for(var i=0, len=styleSheet.cssRules.length; i<len; i++){
				if(cssRules[i]===keyframesRules[name]){
					styleSheet.deleteRule(i);
					break;
				}
			}
		}

		var index = styleSheet.insertRule('@'+prefix+'keyframes ' + name + framesText, styleSheet.cssRules.length);
		keyframesRules[name] = styleSheet.cssRules[index];
	}

	//ä¿®æ”¹æŸä¸ªåŠ¨ç”»ä¸­æŸä¸€å¸§çš„è§„åˆ™,nameä¸ºåŠ¨ç”»åï¼ŒkeyTextä¸ºå¸§åï¼Œæ¯”å¦‚0%ï¼ŒbodyTextä¸ºcssæ–‡æœ¬,å¦‚{color:#fff}
	//TODO:ç›®å‰ä½¿ç”¨çš„appendRuleè¿™æ ·çš„æ–¹æ³•ä¼šè¿½åŠ åœ¨åŽŸæœ‰çš„åŽé¢ï¼Œä¸ç®¡å¸§åæ˜¯å¦å·²ç»å­˜åœ¨,è¦æ”¹è¿›çš„è¯å°±æ˜¯çœ‹çœ‹å¦‚æžœå·²ç»å­˜åœ¨çš„ï¼Œèƒ½ä¸èƒ½ç”¨cssTextå±žæ€§åŽ»æ›¿æ¢
	function modifyKeyframesRule(name,keyText,bodyText){
		if(!keyframesRules[name]) return false;
		var cssText = keyText + bodyText;
		//appendRuleå’ŒinsertRule: https://developer.mozilla.org/en-US/docs/Web/API/CSSKeyframesRule#Browser_compatibility
		if(keyframesRules[name].appendRule) keyframesRules[name].appendRule(cssText);
		else keyframesRules[name].insertRule(cssText);
	}

	//æ ¹æ®ä¼ å…¥çš„å¯¹è±¡ç”Ÿæˆkeyframeè¯­å¥
	//{
	//	'0%' : { width : 100px, height : 100px  },
	//	'100%' : { width : 0, height : 0 }
	//}
	function generateKeyframesText(frames){
		var framesText = '{';
		for(var k in frames){
			frames[k] = convertCSSValues(frames[k]); //è½¬æ¢ç‰¹æ®Šå±žæ€§
			var cssText = '{';
			for(var p in frames[k]){
				cssText += p + ':' + frames[k][p] + ';'
			}
			cssText += '}';
			framesText += k + cssText;
		}
		framesText += '}';
		//console.log(framesText);
		return framesText;
	}


	function KeyframeInit(){
		if(!styleElem){
			styleElem = document.createElement('style');
			styleElem.rel = 'stylesheet';
            styleElem.type = 'text/css';
			var head = document.head || document.getElementsByTagName('head')[0];
			head.appendChild(styleElem);
			styleSheet = styleElem.sheet;
		}
	}

	//æŠ½å‡ºtransformå±žæ€§
	var rTransformProp = /^(translate(?:3d)?|scale(?:3d)?|rotate(?:3d)?|skew)?([XYZxyz])?$/;
	//æŠ½å‡ºtransformå±žæ€§å€¼
	var rTransformValue = /\(?\s*([^\,\s\)]+)(?:\s*\,\s*([^\,\s\)]+))?(?:\s*\,\s*([^\,\s\)]+))?\s*\)?/;

	//è½¬æ¢æ•°æ®ä¸­çš„ç‰¹æ®Šå±žæ€§
	function convertCSSValues(obj){
		var transform = null;
		for(var p in obj){
			if(!obj.hasOwnProperty(p)) continue;
			var match = p.match(rTransformProp);
			if(match){
				if(!transform) transform = new Transform();
				var match2 = String(obj[p]).match(rTransformValue);
				transform.set(match[1],match[2],match2[1],match2[2],match2[3]);
				delete obj[p];
			}
		}
		if(transform) obj[prefix+'transform'] = transform.toString();
		return obj;
	}

	//ç”¨æ¥ç”Ÿæˆtransformçš„å¯¹è±¡
	function Transform(){

	}

	//è®¾ç½®transformå±žæ€§
	Transform.prototype.set = function(prop,axis,value1,value2,value3){
		if(!prop) prop = 'translate'; //å•ç‹¬çš„x,y,zè¡¨ç¤ºçš„æ˜¯translateå±žæ€§
		var is3d = /3d$/.test(prop); //æ˜¯å¦3då˜æ¢
		if(is3d) prop = prop.replace('3d','');
		if(prop==='rotate' && !is3d && !axis) this[prop] = this.unit(prop,value1); //å•ç‹¬å¤„ç†rotateå±žæ€§
		else if(axis) this[prop+axis.toUpperCase()] = this.unit(prop,value1); //æŒ‡å®šäº†å˜æ¢æ–¹å‘
		else{
			this[prop+'X'] = this.unit(prop,value1);
			this[prop+'Y'] = value2===undefined ? this.unit(prop,value1) : this.unit(prop,value2);
			if(is3d && prop!=='skew'){ //3då˜æ¢,skewæ²¡æœ‰3då˜æ¢
				if(value3!==undefined) this[prop+'Z'] = this.unit(prop,value3);
				else this[prop+'Z'] = this.unit(prop,value1);
			}
		}
	}

	//è‡ªåŠ¨è¡¥å…¨å•ä½
	Transform.prototype.unit = function(prop,value){
		if(prop.indexOf('scale')===0) value = parseFloat(value);
		else{
			if(/\d$/.test(value)) value += /^(?:rotate|skew)/.test(prop) ? 'deg' : 'px'; //æ²¡æœ‰å•ä½çš„è‡ªåŠ¨åŠ ä¸Šå•ä½
		}
		return value;
	}

	//è¿”å›žtransformå­—ç¬¦ä¸²
	Transform.prototype.toString = function(){
		var str = '';
		for(p in this){
			if(!this.hasOwnProperty(p) || p=='skewZ') continue; //skewæ²¡æœ‰3Då˜æ¢
			str += (str?' ':'') + p + '(' +this[p] + ')';
		}
		//console.log(str);
		return str;
	}

	//ä¾¦æµ‹æ˜¯å¦æ”¯æŒ3då˜æ¢
	function support3d(){
		return true;
	}

})(jQuery);
