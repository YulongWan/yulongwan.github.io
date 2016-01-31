/**
 **********************************************************************
 *author hcp0209@gmail.com
 **********************************************************************
*/ 
////////////////////////////////////////////////////////////////////////////////////////////////////////
var fullWidth = 640, //çª—å£å®½åº¦
	fullHeight = $(window).height();//çª—å£é«˜åº¦
var winRatio = fullWidth / fullHeight;

/***************************************/
$(document).swipe({
	swipeUp : function(){
		goto1(currentIndex+1,beforeCallback,afterCallback);
	},
	swipeDown : function(){
		goto1(currentIndex-1,beforeCallback,afterCallback);
	}
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
var currentIndex = 0;
var papers = $('.paper');
function goto1(index,beforeCallbak,afterCallback){
	if(index==currentIndex) return;
	if(index>papers.length-1) index = 0;
	else if(index<0) index = papers.length-1;
	var direction;
	if(index == papers.length-1 && currentIndex == 0) direction = 'up';
	else if(currentIndex == papers.length-1 && index == 0) direction = 'down';
	else if(index < currentIndex) direction = 'up';
	else if(index > currentIndex) direction = 'down';
	beforeCallback && beforeCallback(currentIndex); //åˆ‡æ¢å‰å›žè°ƒ
	papers.eq(index).css({
		zIndex : 100,
		y : direction == 'up' ? -fullHeight : fullHeight,
		opacity : 1
	}).transition({
		y : 0
	},400,'out',function(){
		currentIndex = index;
		$(this).addClass('active');
		afterCallback && afterCallback(currentIndex); //åˆ‡æ¢å®ŒæˆåŽå›žè°ƒ
	});
	papers.eq(currentIndex).css({
		zIndex : 99,
		transformOrigin : direction == 'up' ? '50% 100%' : '50% 0'
	}).transition({
		scale : 0.3,
		opacity : .5
	},400,'out',function(){
		$(this).removeClass('active');
		$(this).css({
			zIndex : 1,
			transformOrigin : '50% 50%',
			scale : 1,
			opacity : 0
		});
	});
}

/**èƒŒæ™¯å›¾å°ºå¯¸å¤„ç†***************************/
var bgImgSize = [[576,960],[576,958],[576,950],[576,955],[576,961],[576,954],[576,960],[576,950],[576,960],[576,958]];
for(var i=0; i<bgImgSize.length; i++){
	var bgRatio = bgImgSize[i][0] / bgImgSize[i][1];
	if(bgRatio>=winRatio){
		papers.eq(i).children('.bg').addClass('v'); //çºµå‘100%
	}else{
		papers.eq(i).children('.bg').addClass('h'); //æ¨ªå‘100%
	}
}


//////////////////////////////////////////////////////////////////////////
function beforeCallback(index){
	index = index + 1;
	animations['p'+index] && animations['p'+index](false); //åˆ‡æ¢å‰æ¸…é™¤å½“å‰åŠ¨ç”»
}
function afterCallback(index){
	index = index + 1;
	animations['p'+index] && animations['p'+index](); //æ‰§è¡ŒçŽ°ä»»åŠ¨ç”»
}

var keyframes = {}
keyframes.zoomIn = $.keyframes('zoomIn',{
	from : { scale:1.3 },
	to : { scale:1 }
});
keyframes.slideInTop = $.keyframes('slideInTop',{
	from : { y:-100, opacity:0 },
	to : { y:1, opacity:1 }
});
keyframes.slideInRight = $.keyframes('slideInRight',{
	from : { x:200, opacity:0 },
	to : { x:0, opacity:1 }
});
keyframes.slideInBottom = $.keyframes('slideInBottom',{
	from : { y:100, opacity:0 },
	to : { y:0, opacity:1 }
});
keyframes.slideInLeft = $.keyframes('slideInLeft',{
	from : { x:-200, opacity:0 },
	to : { x:0, opacity:1 }
});

var animations = {};
var show = {display:'block'};
animations.p1 = function(flag){
	if(flag===false){
		$('.p1 .ani').clearQueue().hide().anime('none');
		$('#arrow').clearQueue().hide();
		return;
	}
	$('.p1 .t1').delay(700).anime('slideInTop','2s','ease-out','both',show);
	$('#arrow').delay(3500).show(1);
}
animations.p2 = function(flag){
	if(flag===false){
		$('.p2 .bg').clearQueue().anime('none');
		$('.p2 .ani').clearQueue().hide().anime('none');
		$('#arrow').clearQueue().hide();
		return;
	}
	$('.p2 .bg').anime('zoomIn','8s','linear','both');
	$('.p2 .t1').delay(500).anime('slideInLeft','2s','ease-out','both',show);
	$('.p2 .t2').delay(500).anime('slideInRight','2s','ease-out','both',show);
	$('#arrow').delay(4000).show(1);
}
animations.p3 = function(flag){
	if(flag===false){
		$('.p3 .bg').clearQueue().anime('none');
		$('.p3 .ani').clearQueue().hide().anime('none');
		$('#arrow').clearQueue().hide();
		return;
	}
	$('.p3 .bg').anime('zoomIn','8s','linear','both');
	$('.p3 .t1').delay(500).anime('slideInTop','2s','ease-out','both',show);
	$('#arrow').delay(4000).show(1);
}
animations.p4 = function(flag){
	if(flag===false){
		$('.p4 .bg').clearQueue().anime('none');
		$('.p4 .ani').clearQueue().hide().anime('none');
		$('#arrow').clearQueue().hide();
		return;
	}
	$('.p4 .bg').anime('zoomIn','8s','linear','both');
	$('.p4 .t1').delay(500).anime('slideInLeft','2s','ease-out','both',show);
	$('#arrow').delay(4000).show(1);
}

animations.p5 = function(flag){
	if(flag===false){
		$('.p5 .bg').clearQueue().anime('none');
		$('.p5 .ani').clearQueue().hide().anime('none');
		$('#arrow').clearQueue().hide();
		return;
	}
	$('.p5 .bg').anime('zoomIn','8s','linear','both');
	$('.p5 .t1').delay(500).anime('slideInBottom','2s','ease-out','both',show);
	$('#arrow').delay(4000).show(1);
}

animations.p6 = function(flag){
	if(flag===false){
		$('.p6 .bg').clearQueue().anime('none');
		$('.p6 .ani').clearQueue().hide().anime('none');
		$('#arrow').clearQueue().hide();
		return;
	}
	$('.p6 .bg').anime('zoomIn','8s','linear','both');
	$('.p6 .t1').delay(500).anime('slideInLeft','2s','ease-out','both',show);
	$('#arrow').delay(4000).show(1);
}

animations.p7 = function(flag){
	if(flag===false){
		$('.p7 .bg').clearQueue().anime('none');
		$('.p7 .ani').clearQueue().hide().anime('none');
		$('#arrow').clearQueue().hide();
		return;
	}
	$('.p7 .bg').anime('zoomIn','8s','linear','both');
	$('.p7 .t1').delay(500).anime('slideInTop','2s','ease-out','both',show);
	$('#arrow').delay(4000).show(1);
}
animations.p8 = function(flag){
	if(flag===false){
		$('.p8 .bg').clearQueue().anime('none');
		$('.p8 .ani').clearQueue().hide().anime('none');
		$('#arrow').clearQueue().hide();
		return;
	}
	$('.p8 .bg').anime('zoomIn','8s','linear','both');
	$('.p8 .t1').delay(500).anime('slideInTop','2s','ease-out','both',show);
	$('#arrow').delay(4000).show(1);
}
animations.p9 = function(flag){
	if(flag===false){
		$('.p9 .bg').clearQueue().anime('none');
		$('.p9 .ani').clearQueue().hide().anime('none');
		$('#arrow').clearQueue().hide();
		return;
	}
	$('.p9 .bg').anime('zoomIn','8s','linear','both');
	$('.p9 .t1').delay(500).anime('slideInRight','2s','ease-out','both',show);
	$('#arrow').delay(4000).show(1);
}
animations.p10 = function(flag){
	if(flag===false){
		$('.p10 .bg').clearQueue().anime('none');
		$('.p10 .ani').clearQueue().hide().anime('none');
		$('#arrow').clearQueue().hide();
		return;
	}
	$('.p10 .bg').anime('zoomIn','8s','linear','both');
	$('.p10 .t1').delay(500).anime('slideInTop','2s','ease-out','both',show);
	$('#arrow').delay(4000).show(1);
}
animations.p11 = function(flag){
	if(flag===false){
		$('.p11 .ani').clearQueue().hide().anime('none');
		return;
	}
	$('.p11 .t1').delay(500).anime('slideInTop','1s','ease-out','both',show);
	$('.p11 .t2').delay(1000).anime('slideInTop','1s','ease-out','both',show);
	$('.p11 .t3').delay(1500).anime('slideInTop','1s','ease-out','both',show);
	$('.p11 .t4').delay(2000).anime('slideInTop','1s','ease-out','both',show);
}

animations.p1();


/******************************************/
$('.p15 .wxbtn').swipe({
	tap : function(){
		$('.p15 .wxbtn').hide();
		$('.p15 .bd').fadeIn(300);
	}
});
$('.p15 .bd').bind('touchmove mousemove',function(e){
	e.stopPropagation();
	e.preventDefault();
});
$('.p15 .bd').swipe({
	tap : function(){
		$('.p15 .bd').hide();
		$('.p15 .wxbtn').show();
	}
})

////éŸ³ä¹////////////////////////////////////////////////////////////////////////////////////////////////

var audio = new Audio();
audio.preload = 'auto';
audio.loop = true;
audio.src = 'images/1.mp3';
audio.addEventListener('play',function(){
	$('#music-btn').show();
});
audio.play(); //è¦æ³¨æ„æŸäº›çŽ¯å¢ƒæ˜¯ä¸èƒ½è‡ªåŠ¨æ’­æ”¾çš„,å¦‚iphone,ipad,chrome in androidç­‰
$('#music-btn').swipe({
	tap : function(){
			  toggleMusic();
		   }
});
function toggleMusic(flag){
	if(flag===false){
		audio.pause();
		$('#music-btn').addClass('off');
		return;
	}
	if($('#music-btn').hasClass('off')){
	  	audio.play();
		$('#music-btn').removeClass('off');
	}else{
	  	audio.pause();
		$('#music-btn').addClass('off');
	}
}

document.addEventListener('touchstart',beginMusic,false);
function beginMusic(){
	audio.play();
	document.removeEventListener('touchstart',beginMusic,false);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('touchmove',function(e){
	e.stopPropagation();
    e.preventDefault();
});
//////////////////////////////////////////////////////////////////////////////////////////////////////
var wxShare = {
	img_url : 'http://www.cntapp.com/lightapp/wedding/images/thumb.jpg',
	link : 'http://www.cntapp.com/lightapp/wedding/',
	title : 'å‘¨æ¹˜å¹³&æˆ´å©‰æ¸…å–œç»“è¿žç† ç››é‚€æ‚¨çš„åˆ°æ¥',
	desc : 'å‘¨æ¹˜å¹³&æˆ´å©‰æ¸…å–œç»“è¿žç† ç››é‚€æ‚¨çš„åˆ°æ¥'
}
function onBridgeReady(){
   WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        WeixinJSBridge.invoke('sendAppMessage', {
            "img_url": wxShare.img_url,
            "link": wxShare.link,
            "desc": wxShare.desc,
            "title": wxShare.title
        }, function(res) {
        	
        });
    });

    WeixinJSBridge.on('menu:share:timeline', function(argv) {
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url": wxShare.img_url,
            "link": wxShare.link,
            "desc": wxShare.desc,
            "title": wxShare.title
        }, function(res) {
        	
        });
   });
}

if(typeof WeixinJSBridge=='undefined'){
	document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
}else{
	onBridgeReady();
}
