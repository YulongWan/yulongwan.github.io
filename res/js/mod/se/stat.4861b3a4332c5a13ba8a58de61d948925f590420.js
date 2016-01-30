/*! Copyright (c) ZUIKU.COM - Author: LIJUN - Email: zwlijun@gmail.com */
define(function(require,exports,module){require("mod/zepto/detect.4b894292b7c8f69604d74fb03c617e7dd3361e92");var a=require("mod/se/storage.68fee00462a8c845f140085fcf156a09a744f7d2"),b=require("mod/se/request.1352bd5b69b6d8a3f6c80e6a62b39695c0f336ee"),c=$.Util,d=(a.Session,a.Persistent),e={CLICK:{API:"${api}?pvId=${pvId}&uvId=${uvId}&sourceId=${sourceId}&sourceType=${sourceType}"},SHARE:{API:"${api}?pvId=${pvId}&uvId=${uvId}&sourceId=${sourceId}&sourceType=${sourceType}"},PV:{API:"${api}?pvId=${pvId}&uvId=${uvId}&sourceId=${sourceId}&sourceType=${sourceType}&networkType=${network}&fromType=${from}&osType=${os}&osVersion=${osv}&resolution=${screen}"}},f={"2g":"04","3g":"01","4g":"02",wifi:"03",unknown:"04"},g={timeline:"02",groupmessage:"03",singlemessage:"01",qq:"04",unknown:"05"},h={GUID:function(){var a=String((new Date).getTime()),b=String(0xfffffffffff*Math.random()),c=b.substring(0,b.indexOf(".")),d=b.substring(b.indexOf(".")+1);c.length>13?c=c.substr(0,13):c.length<13&&(c+=d.substr(0,13-c.length));for(var e=a+c,f=0,g="",h="",i=0;26>i;i+=2)f=Number(e.substr(i,2)),g=f.toString(16),g.length<2&&(g="0"+g),h+=g;return h},getPageId:function(){return h.GUID()},getUserId:function(){var a=d.get("st_uin");return a||(a=h.GUID(),d.set("st_uin",a,0)),a},setNetwork:function(a){h.network=a||"unknown"},getNetwork:function(){return h.network||"unknown"},getNetworkType:function(){var a=h.getNetwork();return f[a]||f.unknown},getFromType:function(){var a=b.getParameter("ZKTAG")+"",c=b.getParameter("from")+"",d="unknown";return d=g[a]||g[c]||g.unknown},getPlatform:function(){for(var a=[{alias:"ios",name:"iOS"},{alias:"android",name:"Android"},{alias:"wp",name:"WindowsPhone"},{alias:"osx",name:"OSX"},{alias:"win",name:"Windows"}],b=a.length,c="other",d="0",e=null,f=0;b>f;f++)if(e=a[f],!0===$.os[e.alias]){c=e.name,d=$.os.version;break}return{name:c,version:d}},getMetaData:function(a){var b=$('meta[name="'+a+'"]'),c=b.attr("content");return c},configure:function(){var a=h.getPageId(),b=h.getUserId(),c=h.getNetworkType(),d=h.getFromType(),e=h.getPlatform(),f=e.name,g=e.version,i=h.getMetaData("stat_click"),j=h.getMetaData("stat_share"),k=h.getMetaData("stat_pv"),l=h.getMetaData("stat_source_click"),m=h.getMetaData("stat_source_share"),n=h.getMetaData("stat_source_pv"),o=h.getMetaData("stat_source"),p=window.screen,q=p.width,r=p.height,s=q>r?r+"x"+q:q+"x"+r;return{pvId:a,uvId:b,network:c,from:d,os:f,osv:g,screen:s,clickAPI:i,shareAPI:j,pvAPI:k,clickSourceType:l,shareSourceType:m,pvSourceType:n,source:o}},send:function(a,b,d){var f=h.getMetaData("stat_open");if("1"!=f)return 0;var g=h.configure(),i="",j=a.toUpperCase(),k=$.extend(g,{api:g[a+"API"],sourceId:b||g.source,sourceType:d||g[a+"SourceType"]});j in e&&(i=e[j].API),i=c.formatData(i,k);var l=new Image;return l.src=i,1}};module.exports={setNetwork:h.setNetwork,send:h.send}});
