/*! Copyright (c) ZUIKU.COM - Author: LIJUN - Email: zwlijun@gmail.com */
define(function(require,exports,module){var a=require("mod/sa/paintbrush/basebrush.40f79e75ea52867e42b6a2128aed8172cfa5a082"),b=$.Listener,c=function(c){var d=this.brush=new a(c);this.setted=!1,this.listener=new b({onstart:null,ondrawing:null,onend:null}),d.bind(),d.setLineWidth(5),d.setLineJoin("round"),d.setLineCap("round"),d.setShadowBlur(10),d.setShadowColor("#000"),d.set("start",{callback:function(a,b){var c=b.context,d=b.getPointerPosition(a);b.isDrawing=!0,!1===this.setted&&(c.strokeStyle=b.getBrushStyle(StyleTypes.COLOR),c.lineWidth=b.lineWidth,c.lineJoin=b.lineJoin,c.lineCap=b.lineCap,c.shadowBlur=b.shadowBlur,c.shadowColor=b.shadowColor,this.setted=!0),c.moveTo(d.x,d.y),this.exec("start",[a,b])},context:this}),d.set("end",{callback:function(a,b){b.isDrawing=!1,this.exec("end",[a,b])},context:this}),d.set("drawing",{callback:function(a,b){var c=b.context,d=b.getPointerPosition(a);b.isDrawing&&(c.lineTo(d.x,d.y),c.stroke()),this.exec("drawing",[a,b])},context:this})};c.prototype={exec:function(a,b){return this.listener.exec(a,b)},set:function(a,b){this.listener.set(a,b)},remove:function(a){this.listener.remove(a)},get:function(a){return this.listener.get(a)},clear:function(){this.listener.clear()}};var d={createPaintBrush:function(a){var b=new c(a);return b}};module.exports=d});
