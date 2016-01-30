/*! Copyright (c) ZUIKU.COM - Author: LIJUN - Email: zwlijun@gmail.com */
define(function(require,exports,module){var a=$.Util=require("mod/se/util.f9a416ff84aa85b8ba737234874f8969ce70e034"),b=require("mod/sa/stackblur.48ff4b0e2618fafc40fee2c07a7e44a852a7b602"),c=function(a){this.stage=a,this.context=a.getContext("2d")};c.prototype={drawImage:function(b,c,d,e,f,g){var h=this.stage,i=this.context,j=b,k=d||0,l=e||0,m=f||h.width,n=g||h.height,o=new Image,p=this;o.onload=function(){i.clearRect(k,l,h.width,h.height),i.drawImage(o,k,l,m,n),a.execAfterMergerHandler(c,[h,i,p.readImageData(k,l,m,n),k,l,m,n])},o.onerror=function(){a.execAfterMergerHandler(c,[h,i,null,k,l,m,n])},o.src=j},readImageData:function(a,b,c,d){var e=this.stage,f=this.context,g=a||0,h=b||0,i=c||e.width,j=d||e.height;return f.getImageData(g,h,i,j)},writeImageData:function(a,b,c){var d=(this.stage,this.context),e=b||0,f=c||0;d.putImageData(a,e,f)},stage2image:function(){var a=new Image;return a.src=this.stage.toDataURL("image/png"),a},pixel:function(b,c,d,e,f){var g=this.stage,h=this.context,i=c||0,j=d||0,k=e||g.width,l=f||g.height,m=this.readImageData(i,j,k,l);a.execAfterMergerHandler(b,[g,h,m,i,j,k,l])},grayscale:function(a,b,c,d,e){for(var f=c.data,g=0,h=0,i=0,j=0;j<f.length;j+=4)g=f[j],h=f[j+1],i=f[j+2],f[j]=f[j+1]=f[j+2]=(g+h+i)/3;this.writeImageData(c,d,e)},sepia:function(a,b,c,d,e){for(var f=c.data,g=0,h=0,i=0,j=0;j<f.length;j+=4)g=f[j],h=f[j+1],i=f[j+2],f[j]=.393*g+.769*h+.189*i,f[j+1]=.349*g+.686*h+.168*i,f[j+2]=.272*g+.534*h+.131*i;this.writeImageData(c,d,e)},red:function(a,b,c,d,e){for(var f=c.data,g=0,h=0,i=0,j=0;j<f.length;j+=4)g=f[j],h=f[j+1],i=f[j+2],f[j]=(g+h+i)/3,f[j+1]=f[j+2]=0;this.writeImageData(c,d,e)},green:function(a,b,c,d,e){for(var f=c.data,g=0,h=0,i=0,j=0;j<f.length;j+=4)g=f[j],h=f[j+1],i=f[j+2],f[j+1]=(g+h+i)/3,f[j]=f[j+2]=0;this.writeImageData(c,d,e)},blue:function(a,b,c,d,e){for(var f=c.data,g=0,h=0,i=0,j=0;j<f.length;j+=4)g=f[j],h=f[j+1],i=f[j+2],f[j+2]=(g+h+i)/3,f[j]=f[j+1]=0;this.writeImageData(c,d,e)},rgba:function(a,b,c,d,e,f,g,h,i,j,k){for(var l=c.data,m=0,n=0,o=0,p=0,q=0;q<l.length;q+=4)m=l[q],n=l[q+1],o=l[q+2],p=l[q+3],l[q]=m+h,l[q+1]=n+i,l[q+2]=o+j,l[q+3]=p+k;this.writeImageData(c,d,e)},rgb:function(a,b,c,d,e,f,g,h,i,j){this.rgba(a,b,c,d,e,f,g,h,i,j,0)},brightness:function(a,b,c,d,e,f,g,h){this.rgb(a,b,c,d,e,f,g,h,h,h)},invert:function(a,b,c,d,e){for(var f=c.data,g=0,h=0,i=0,j=0;j<f.length;j+=4)g=f[j],h=f[j+1],i=f[j+2],f[j]=255-g,f[j+1]=255-h,f[j+2]=255-i;this.writeImageData(c,d,e)},blur:function(a,c,d,e,f,g,h,i,j){i>0&&(d=!0===j?b.getRGBAData(d,g,h,i):b.getRGBData(d,g,h,i)),this.writeImageData(d,e,f)}},module.exports=c});
