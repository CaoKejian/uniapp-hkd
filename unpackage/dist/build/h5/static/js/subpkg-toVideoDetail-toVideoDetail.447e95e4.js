(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["subpkg-toVideoDetail-toVideoDetail"],{"023f":function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var n={uniSwipeActionItem:i("6464").default,uniIcons:i("7e7d").default,uniDateformat:i("d5fe").default,uniEasyinput:i("d55f").default},o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"wrapper"},[i("v-uni-view",{staticClass:"dai"},[t.isShowSu?i("v-uni-text",{staticClass:"text"},[t._v("待完成："+t._s(t.weiItemArr.length))]):t._e(),t._l(t.weiItemArr,(function(e,n){return i("v-uni-view",{key:e.index,staticClass:"wei-item"},[i("uni-swipe-action-item",{attrs:{"right-options":t.options,"auto-close":t.autoClose},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClick.apply(void 0,arguments)},change:function(i){arguments[0]=i=t.$handleEvent(i),t.swipeChange(i,e,n)}}},[i("v-uni-view",{staticClass:"item"},[i("v-uni-checkbox",{on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.check(e,n)}}}),e.isImportant?i("uni-icons",{attrs:{color:"#ffbe5b",type:"star-filled",size:"20"}}):t._e(),i("v-uni-view",{staticClass:"itemName"},[t._v(t._s(e.name))]),i("uni-dateformat",{attrs:{date:e.fabuDate,threshold:[6e4,2592e6]}})],1)],1)],1)}))],2),i("v-uni-view",{staticClass:"yi"},[t.isShowSu?i("v-uni-text",{staticClass:"text"},[t._v("已完成："+t._s(t.yiItemArr.length))]):t._e(),t._l(t.yiItemArr,(function(e,n){return i("v-uni-view",{key:e.index,staticClass:"wei-item"},[i("uni-swipe-action-item",{attrs:{"right-options":t.options,"auto-close":t.autoClose},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClick1.apply(void 0,arguments)},change:function(e){arguments[0]=e=t.$handleEvent(e),t.swipeChange(e,n)}}},[i("v-uni-view",{staticClass:"item"},[i("v-uni-checkbox",{attrs:{checked:"false"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.check1(e,n)}}}),e.isImportant?i("uni-icons",{attrs:{color:"#ffbe5b",type:"star-filled",size:"20"}}):t._e(),i("v-uni-view",{staticClass:"itemName"},[t._v(t._s(e.name))]),i("uni-dateformat",{attrs:{date:e.fabuDate,threshold:[6e4,2592e6]}})],1)],1)],1)}))],2),i("v-uni-view",{staticClass:"wrapper1"},[i("uni-easyinput",{ref:"uipt",attrs:{suffixIcon:"paperplane",placeholder:t.placeholder},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.goComment.apply(void 0,arguments)},iconClick:function(e){arguments[0]=e=t.$handleEvent(e),t.goComment.apply(void 0,arguments)}},model:{value:t.replyContent,callback:function(e){t.replyContent=e},expression:"replyContent"}})],1)],1)},a=[]},"0ce5":function(t,e,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(i("3f7b")),a={mounted:function(t,e,i){this.state={}},methods:{showWatch:function(t,e,i,n){o.default.showWatch(t,e,i,n,this)},touchstart:function(t,e){o.default.touchstart(t,e,this)},touchmove:function(t,e){o.default.touchmove(t,e,this)},touchend:function(t,e){o.default.touchend(t,e,this)}}};e.default=a},1045:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"UniSection",emits:["click"],props:{type:{type:String,default:""},title:{type:String,required:!0,default:""},titleFontSize:{type:String,default:"14px"},titleColor:{type:String,default:"#333"},subTitle:{type:String,default:""},subTitleFontSize:{type:String,default:"12px"},subTitleColor:{type:String,default:"#999"},padding:{type:[Boolean,String],default:!1}},computed:{_padding:function(){return"string"===typeof this.padding?this.padding:this.padding?"10px":""}},watch:{title:function(t){uni.report&&""!==t&&uni.report("title",t)}},methods:{onClick:function(){this.$emit("click")}}};e.default=n},1963:function(t,e,i){"use strict";i.r(e);var n=i("1045"),o=i.n(n);for(var a in n)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},"1b09":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.uni-swipe[data-v-4fc4ab3c]{position:relative;overflow:hidden}.uni-swipe_box[data-v-4fc4ab3c]{display:flex;flex-shrink:0;position:relative}.uni-swipe_text--center[data-v-4fc4ab3c]{width:100%;cursor:grab}.uni-swipe_button-group[data-v-4fc4ab3c]{box-sizing:border-box;display:flex;flex-direction:row;position:absolute;top:0;bottom:0;cursor:pointer}.button-group--left[data-v-4fc4ab3c]{left:0;-webkit-transform:translateX(-100%);transform:translateX(-100%)}.button-group--right[data-v-4fc4ab3c]{right:0;-webkit-transform:translateX(100%);transform:translateX(100%)}.uni-swipe_button[data-v-4fc4ab3c]{display:flex;flex-direction:row;justify-content:center;align-items:center;padding:0 20px}.uni-swipe_button-text[data-v-4fc4ab3c]{flex-shrink:0;font-size:14px}.ani[data-v-4fc4ab3c]{transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;transition-duration:.3s;transition-timing-function:cubic-bezier(.165,.84,.44,1)}',""]),t.exports=e},"1e94":function(t,e,i){"use strict";i.r(e);var n=i("8287"),o=i.n(n);for(var a in n)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},"28a5":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.uni-section[data-v-fdacfb74]{background-color:#fffae5}.uni-section .uni-section-header__decoration[data-v-f7ca1098][data-v-fdacfb74]{margin-right:6px;background-color:#f4ffbe}.wrapper[data-v-fdacfb74]{width:100%;height:100vh;background-color:#fffae5}.wrapper .item-f[data-v-fdacfb74]{width:100%}.wrapper .item-f .video[data-v-fdacfb74]{width:100%}.wrapper .item-f .info[data-v-fdacfb74]{padding:%?20?% %?30?%;display:flex;justify-content:space-between}',""]),t.exports=e},"3bb1":function(t,e,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("a9e3"),i("d3b7"),i("159b"),i("a434");var o=n(i("8f0b")),a=n(i("c826")),s=n(i("f70c")),r={mixins:[o.default,a.default,s.default],emits:["click","change"],props:{show:{type:String,default:"none"},disabled:{type:Boolean,default:!1},autoClose:{type:Boolean,default:!0},threshold:{type:Number,default:20},leftOptions:{type:Array,default:function(){return[]}},rightOptions:{type:Array,default:function(){return[]}}},destroyed:function(){this.__isUnmounted||this.uninstall()},methods:{uninstall:function(){var t=this;this.swipeaction&&this.swipeaction.children.forEach((function(e,i){e===t&&t.swipeaction.children.splice(i,1)}))},getSwipeAction:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"uniSwipeAction",e=this.$parent,i=e.$options.name;while(i!==t){if(e=e.$parent,!e)return!1;i=e.$options.name}return e}}};e.default=r},"3e3c":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-section"},[i("v-uni-view",{staticClass:"uni-section-header",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClick.apply(void 0,arguments)}}},[t.type?i("v-uni-view",{staticClass:"uni-section-header__decoration",class:t.type}):t._t("decoration"),i("v-uni-view",{staticClass:"uni-section-header__content"},[i("v-uni-text",{staticClass:"uni-section__content-title",class:{distraction:!t.subTitle},style:{"font-size":t.titleFontSize,color:t.titleColor}},[t._v(t._s(t.title))]),t.subTitle?i("v-uni-text",{staticClass:"uni-section-header__content-sub",style:{"font-size":t.subTitleFontSize,color:t.subTitleColor}},[t._v(t._s(t.subTitle))]):t._e()],1),i("v-uni-view",{staticClass:"uni-section-header__slot-right"},[t._t("right")],2)],2),i("v-uni-view",{staticClass:"uni-section-content",style:{padding:t._padding}},[t._t("default")],2)],1)},o=[]},"3f7b":function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={showWatch:function(t,e,i,n,o){var a=o.state,s=i.$el||i.$vm&&i.$vm.$el;s&&(this.getDom(n,i,o),t&&"none"!==t?this.openState(t,n,i,o):(a.left&&this.openState("none",n,i,o),this.resetTouchStatus(n,o)))},touchstart:function(t,e,i){var n=t.instance,o=n.getDataset().disabled,a=i.state;this.getDom(n,e,i),o=this.getDisabledType(o),o||(n.requestAnimationFrame((function(){n.removeClass("ani"),e.callMethod("closeSwipe")})),a.x=a.left||0,this.stopTouchStart(t,e,i))},touchmove:function(t,e,i){var n=t.instance;if(n){var o=n.getDataset().disabled,a=i.state;if(o=this.getDisabledType(o),!o&&(this.stopTouchMove(t,i),"horizontal"===a.direction)){t.preventDefault&&t.preventDefault();var s=a.x+a.deltaX;this.move(s,n,e,i)}}},touchend:function(t,e,i){var n=t.instance,o=n.getDataset().disabled,a=i.state;o=this.getDisabledType(o),o||this.moveDirection(a.left,n,e,i)},move:function(t,e,i,n){t=t||0;var o=n.state,a=o.leftWidth,s=o.rightWidth;o.left=this.range(t,-s,a),e.requestAnimationFrame((function(){e.setStyle({transform:"translateX("+o.left+"px)","-webkit-transform":"translateX("+o.left+"px)"})}))},getDom:function(t,e,i){var n=i.state,o=e.$el||e.$vm&&e.$vm.$el,a=o.querySelector(".button-group--left"),s=o.querySelector(".button-group--right");n.leftWidth=a.offsetWidth||0,n.rightWidth=s.offsetWidth||0,n.threshold=t.getDataset().threshold},getDisabledType:function(t){return("string"===typeof t?JSON.parse(t):t)||!1},range:function(t,e,i){return Math.min(Math.max(t,e),i)},moveDirection:function(t,e,i,n){var o=n.state,a=o.threshold,s=(o.position,o.isopen||"none"),r=o.leftWidth,c=o.rightWidth;0!==o.deltaX?"none"===s&&c>0&&-t>a||"none"!==s&&c>0&&c+t<a?this.openState("right",e,i,n):"none"===s&&r>0&&t>a||"none"!==s&&r>0&&r-t<a?this.openState("left",e,i,n):this.openState("none",e,i,n):this.openState("none",e,i,n)},openState:function(t,e,i,n){var o=this,a=n.state,s=a.leftWidth,r=a.rightWidth,c="";switch(a.isopen=a.isopen?a.isopen:"none",t){case"left":c=s;break;case"right":c=-r;break;default:c=0}a.isopen!==t&&(a.throttle=!0,i.callMethod("change",{open:t})),a.isopen=t,e.requestAnimationFrame((function(){e.addClass("ani"),o.move(c,e,i,n)}))},getDirection:function(t,e){return t>e&&t>10?"horizontal":e>t&&e>10?"vertical":""},resetTouchStatus:function(t,e){var i=e.state;i.direction="",i.deltaX=0,i.deltaY=0,i.offsetX=0,i.offsetY=0},stopTouchStart:function(t,e,i){var n=t.instance,o=i.state;this.resetTouchStatus(n,i);var a=t.touches[0];o.startX=a.clientX,o.startY=a.clientY},stopTouchMove:function(t,e){t.instance;var i=e.state,n=t.touches[0];i.deltaX=n.clientX-i.startX,i.deltaY=n.clientY-i.startY,i.offsetY=Math.abs(i.deltaY),i.offsetX=Math.abs(i.deltaX),i.direction=i.direction||this.getDirection(i.offsetX,i.offsetY)}};e.default=n},"4fc6":function(t,e,i){var n=i("28a5");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("5918f77a",n,!0,{sourceMap:!1,shadowMode:!1})},6464:function(t,e,i){"use strict";i.r(e);var n=i("8949"),o=i("ec64");for(var a in o)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(a);var s=i("b59f");for(var a in s)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(a);i("b7d5");var r=i("f0c5"),c=i("a40a");o["default"].__module="renderswipe";var u=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,"4fc4ab3c",null,!1,n["a"],o["default"]);"function"===typeof c["a"]&&Object(c["a"])(u),e["default"]=u.exports},"696c":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.uni-section[data-v-170e1ad5]{background-color:#fff}.uni-section .uni-section-header[data-v-170e1ad5]{position:relative;display:flex;flex-direction:row;align-items:center;padding:12px 10px;font-weight:400}.uni-section .uni-section-header__decoration[data-v-170e1ad5]{margin-right:6px;background-color:#9e6d38}.uni-section .uni-section-header__decoration.line[data-v-170e1ad5]{width:4px;height:12px;border-radius:10px}.uni-section .uni-section-header__decoration.circle[data-v-170e1ad5]{width:8px;height:8px;border-top-right-radius:50px;border-top-left-radius:50px;border-bottom-left-radius:50px;border-bottom-right-radius:50px}.uni-section .uni-section-header__decoration.square[data-v-170e1ad5]{width:8px;height:8px}.uni-section .uni-section-header__content[data-v-170e1ad5]{display:flex;flex-direction:column;flex:1;color:#333}.uni-section .uni-section-header__content .distraction[data-v-170e1ad5]{flex-direction:row;align-items:center}.uni-section .uni-section-header__content-sub[data-v-170e1ad5]{margin-top:2px}.uni-section .uni-section-header__slot-right[data-v-170e1ad5]{font-size:14px}.uni-section .uni-section-content[data-v-170e1ad5]{font-size:14px}',""]),t.exports=e},"6a11":function(t,e,i){var n=i("1b09");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("3cb246d6",n,!0,{sourceMap:!1,shadowMode:!1})},"738a":function(t,e,i){"use strict";var n=i("f42c"),o=i.n(n);o.a},"73a5":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */uni-text[data-v-1fb57334]{color:#3574ff}.text[data-v-1fb57334]{display:block;padding:%?40?% %?58?%}.wrapper1[data-v-1fb57334]{width:100%;background:#fff;padding:%?20?% %?30?%;box-sizing:border-box;position:fixed;bottom:0;left:0;z-index:100}.wrapper[data-v-1fb57334]{width:100%;height:calc(100vh - 47px);background-color:#fffae5}.wrapper .dai .wei-item[data-v-1fb57334]{margin-bottom:%?20?%}.wrapper .dai .wei-item .uni-swipe[data-v-1fb57334]{width:85%;height:auto;background-color:#fff;margin:0 auto;border-radius:%?15?%}.wrapper .dai .wei-item .uni-swipe .item[data-v-1fb57334]{display:flex;justify-content:space-between;border-radius:%?15?%;align-items:center;height:auto;min-height:%?80?%;padding:%?10?% %?20?%}.wrapper .dai .wei-item .uni-swipe .item .itemName[data-v-1fb57334]{letter-spacing:1px;margin-left:%?10?%;flex:1;margin-right:%?10?%;max-width:70%;word-break:break-all;word-wrap:break-word}.wrapper .yi .wei-item[data-v-1fb57334]{margin-bottom:%?20?%}.wrapper .yi .wei-item .uni-swipe[data-v-1fb57334]{width:85%;background-color:#fff;margin:0 auto;border-radius:%?15?%}.wrapper .yi .wei-item .uni-swipe .item[data-v-1fb57334]{display:flex;border-radius:%?15?%;align-items:center;height:%?80?%;padding:0 %?20?%}.wrapper .yi .wei-item .uni-swipe .item .itemName[data-v-1fb57334]{letter-spacing:1px;flex:1;margin-left:%?10?%;text-decoration:line-through;color:#cecece}',""]),t.exports=e},8287:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("a434"),i("14d9"),i("d3b7"),i("159b"),i("3c65"),i("99af");var n={props:{isShowSu:{type:Boolean,default:function(){return!0}},isshowMseeage:{type:Boolean,default:function(){return!1}}},data:function(){return{placeholder:"新增一项待办吧~",autoClose:!1,isImportant:!1,replyContent:"",options:[{text:"重要",style:{backgroundColor:"#ffbe5b",marginLeft:"10"}},{text:"删除",style:{backgroundColor:"#dd524d"}}],fabuDate:"",selectItem:[],selectItemIndex:"",obj:{},weiItemArr:[{name:"这是一条测试事项，右滑删除",fabuDate:"2023-01-15 18:26:21",checked:!1,isImportant:!1}],yiItemArr:[{name:"这是一条测试事项，右滑删除",fabuDate:"2023-01-15 18:26:21",checked:!0,isImportant:!1}],inputobj:{name:"",fabuDate:"",checked:!1,isImportant:!1}}},methods:{check:function(t,e){this.weiItemArr.splice(e,1),this.yiItemArr.push(t),console.log(t,e),this.localStorage()},check1:function(t,e){this.yiItemArr.splice(e,1),this.weiItemArr.push(t),this.localStorage()},onClick:function(t){var e=this;console.log(t),"重要"==t.content.text?(this.selectItem.isImportant=!this.selectItem.isImportant,this.weiItemArr.forEach((function(t,i){if(t==e.selectItem)return e.obj=t,void e.weiItemArr.splice(i,1)})),this.weiItemArr.unshift(this.obj),this.localStorage()):"删除"==t.content.text&&(console.log("删除了"),this.weiItemArr.splice(this.selectItemIndex,1),this.localStorage())},onClick1:function(t){var e=this;console.log(t),"重要"==t.content.text?(this.selectItem.isImportant=!this.selectItem.isImportant,this.yiItemArr.forEach((function(t,i){if(t==e.selectItem)return e.obj=t,void e.yiItemArr.splice(i,1)})),this.yiItemArr.unshift(this.obj),this.localStorage()):"删除"==t.content.text&&(console.log("删除了"),this.yiItemArr.splice(this.selectItemIndex,1),this.localStorage())},swipeChange:function(t,e,i){this.selectItem=e,this.selectItemIndex=i},localStorage:function(){uni.setStorageSync("weiItemArr",this.weiItemArr),uni.setStorageSync("yiItemArr",this.yiItemArr)},goComment:function(){var t=(new Date).getTime();this.happenTimeFun(t),""!=this.replyContent?(this.inputobj.name=this.replyContent,this.inputobj.fabuDate=this.fabuDate,console.log(this.inputobj),this.weiItemArr.splice(0,0,this.inputobj),console.log(this.weiItemArr),this.replyContent=[],this.localStorage()):uni.showToast({title:"输入不能为空哦！",icon:"none"})},happenTimeFun:function(t){var e=new Date(t),i=e.getFullYear(),n=e.getMonth()+1;n=n<10?"0"+n:n;var o=e.getDate();o=o<10?"0"+o:o;var a=e.getHours();a=a<10?"0"+a:a;var s=e.getMinutes();s=s<10?"0"+s:s;var r=e.getSeconds();return r=r<10?"0"+r:r,this.fabuDate="".concat(i,"-").concat(n,"-").concat(o," ").concat(a,":").concat(s,":").concat(r),i+"-"+n+"-"+o+" "+a+":"+s+":"+r}},created:function(){this.isshowMseeage&&(this.placeholder="添加一个快递单号吧~~"),this.weiItemArr=uni.getStorageSync("weiItemArr",this.weiItemArr),this.yiItemArr=uni.getStorageSync("yiItemArr",this.yiItemArr),this.weiItemArr==[]&&this.yiItemArr==[]&&(this.localStorage(),this.weiItemArr=[{name:"这是一条测试事项，右滑删除",fabuDate:"2023-01-15 18:26:21",checked:!1,isImportant:!1}],this.yiItemArr=[{name:"这是一条测试事项，右滑删除",fabuDate:"2023-01-15 18:26:21",checked:!0,isImportant:!1}],console.log(123))}};e.default=n},"83ba":function(t,e,i){"use strict";(function(t){i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=t.importObject("utilsObj",{customUI:!0}),o={data:function(){return{videoId:"",videoItem:"",isshowMseeage:!0,isShowSu:!1,isshowInput:!1}},methods:{loadeddata:function(){uni.showLoading({title:"正在加载"})},getData:function(){var e=this;t.database().collection("videoClass").where("_id=='".concat(this.videoId,"'")).get().then((function(t){console.log(t),e.videoItem=t.result.data}))},readUpdata:function(){n.operation("videoClass","view_coun",this.videoId,2).then((function(t){console.log("修改成功",t)}))}},onLoad:function(t){this.videoId=t.id,this.readUpdata(),this.getData(),this.videoItem||(this.isshowInput=!1),t.even&&(console.log(123123),this.isshowInput=!0)}};e.default=o}).call(this,i("a9ff")["default"])},8949:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"uni-swipe"},[i("v-uni-view",{wxsProps:{"change:prop":"is_show"},staticClass:"uni-swipe_box",attrs:{"change:prop":t.renderswipe.showWatch,prop:t.is_show,"data-threshold":t.threshold,"data-disabled":t.disabled+""},on:{touchstart:function(e){e=t.$handleWxsEvent(e),t.renderswipe.touchstart(e,t.$getComponentDescriptor())},touchmove:function(e){e=t.$handleWxsEvent(e),t.renderswipe.touchmove(e,t.$getComponentDescriptor())},touchend:function(e){e=t.$handleWxsEvent(e),t.renderswipe.touchend(e,t.$getComponentDescriptor())}}},[i("v-uni-view",{staticClass:"uni-swipe_button-group button-group--left"},[t._t("left",t._l(t.leftOptions,(function(e,n){return i("v-uni-view",{key:n,staticClass:"uni-swipe_button button-hock",style:{backgroundColor:e.style&&e.style.backgroundColor?e.style.backgroundColor:"#C7C6CD"},on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.appTouchStart.apply(void 0,arguments)},touchend:function(i){arguments[0]=i=t.$handleEvent(i),t.appTouchEnd(i,n,e,"left")},click:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.onClickForPC(n,e,"left")}}},[i("v-uni-text",{staticClass:"uni-swipe_button-text",style:{color:e.style&&e.style.color?e.style.color:"#FFFFFF",fontSize:e.style&&e.style.fontSize?e.style.fontSize:"16px"}},[t._v(t._s(e.text))])],1)})))],2),i("v-uni-view",{staticClass:"uni-swipe_text--center"},[t._t("default")],2),i("v-uni-view",{staticClass:"uni-swipe_button-group button-group--right"},[t._t("right",t._l(t.rightOptions,(function(e,n){return i("v-uni-view",{key:n,staticClass:"uni-swipe_button button-hock",style:{backgroundColor:e.style&&e.style.backgroundColor?e.style.backgroundColor:"#C7C6CD"},on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.appTouchStart.apply(void 0,arguments)},touchend:function(i){arguments[0]=i=t.$handleEvent(i),t.appTouchEnd(i,n,e,"right")},click:function(i){i.stopPropagation(),arguments[0]=i=t.$handleEvent(i),t.onClickForPC(n,e,"right")}}},[i("v-uni-text",{staticClass:"uni-swipe_button-text",style:{color:e.style&&e.style.color?e.style.color:"#FFFFFF",fontSize:e.style&&e.style.fontSize?e.style.fontSize:"16px"}},[t._v(t._s(e.text))])],1)})))],2)],1)],1)},o=[]},"8f0b":function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("14d9");var n,o,a=i("dbf7");o=(0,a.isPC)(),n={data:function(){return{is_show:"none"}},watch:{show:function(t){this.is_show=this.show}},created:function(){this.swipeaction=this.getSwipeAction(),void 0!==this.swipeaction.children&&this.swipeaction.children.push(this)},mounted:function(){this.is_show=this.show},methods:{closeSwipe:function(t){this.autoClose&&this.swipeaction.closeOther(this)},change:function(t){this.$emit("change",t.open),this.is_show!==t.open&&(this.is_show=t.open)},appTouchStart:function(t){if(!o){var e=t.changedTouches[0].clientX;this.clientX=e,this.timestamp=(new Date).getTime()}},appTouchEnd:function(t,e,i,n){if(!o){var a=t.changedTouches[0].clientX,s=Math.abs(this.clientX-a),r=(new Date).getTime()-this.timestamp;s<40&&r<300&&this.$emit("click",{content:i,index:e,position:n})}},onClickForPC:function(t,e,i){o&&this.$emit("click",{content:e,index:t,position:i})}}};var s=n;e.default=s},"96c1":function(t,e,i){"use strict";i.r(e);var n=i("83ba"),o=i.n(n);for(var a in n)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},"9edb":function(t,e,i){var n=i("696c");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("1187b038",n,!0,{sourceMap:!1,shadowMode:!1})},a40a:function(t,e,i){"use strict";e["a"]=function(t){(t.options.wxs||(t.options.wxs={}))["wxsswipe"]=function(t){var e=!1;function i(t,i){var n=t.instance,o=n.getDataset().disabled,a=n.getState();s(n,i),o=("string"===typeof o?JSON.parse(o):o)||!1,o||(n.requestAnimationFrame((function(){n.removeClass("ani"),i.callMethod("closeSwipe")})),a.x=a.left||0,function(t){var i=t.instance,n=i.getState();c(i);var o=t.touches[0];e&&u()&&(o=t);n.startX=o.clientX,n.startY=o.clientY}(t))}function n(t,i){var n=t.instance,o=n.getDataset().disabled,s=n.getState();o=("string"===typeof o?JSON.parse(o):o)||!1,o||(function(t){var i=t.instance,n=i.getState(),o=t.touches[0];e&&u()&&(o=t);n.deltaX=o.clientX-n.startX,n.deltaY=o.clientY-n.startY,n.offsetY=Math.abs(n.deltaY),n.offsetX=Math.abs(n.deltaX),n.direction=n.direction||function(t,e){if(t>e&&t>10)return"horizontal";if(e>t&&e>10)return"vertical";return""}(n.offsetX,n.offsetY)}(t),"horizontal"===s.direction&&(t.preventDefault&&t.preventDefault(),a(s.x+s.deltaX,n,i)))}function o(t,e){var i=t.instance,n=i.getDataset().disabled,o=i.getState();n=("string"===typeof n?JSON.parse(n):n)||!1,n||function(t,e,i){var n=e.getState(),o=n.threshold,a=(n.position,n.isopen||"none"),s=n.leftWidth,c=n.rightWidth;if(0===n.deltaX)return void r("none",e,i);r("none"===a&&c>0&&-t>o||"none"!==a&&c>0&&c+t<o?"right":"none"===a&&s>0&&t>o||"none"!==a&&s>0&&s-t<o?"left":"none",e,i)}(o.left,i,e)}function a(t,e,i){t=t||0;var n=e.getState(),o=n.leftWidth,a=n.rightWidth;n.left=function(t,e,i){return Math.min(Math.max(t,e),i)}(t,-a,o),e.requestAnimationFrame((function(){e.setStyle({transform:"translateX("+n.left+"px)","-webkit-transform":"translateX("+n.left+"px)"})}))}function s(t,e){var i,n,o=t.getState(),a=e.selectComponent(".button-group--left"),s=e.selectComponent(".button-group--right");i=a.getBoundingClientRect(),n=s.getBoundingClientRect(),o.leftWidth=i.width||0,o.rightWidth=n.width||0,o.threshold=t.getDataset().threshold}function r(t,e,i){var n=e.getState(),o=n.leftWidth,s=n.rightWidth,r="";switch(n.isopen=n.isopen?n.isopen:"none",t){case"left":r=o;break;case"right":r=-s;break;default:r=0}n.isopen!==t&&(n.throttle=!0,i.callMethod("change",{open:t})),n.isopen=t,e.requestAnimationFrame((function(){e.addClass("ani"),a(r,e)}))}function c(t){var e=t.getState();e.direction="",e.deltaX=0,e.deltaY=0,e.offsetX=0,e.offsetY=0}function u(){for(var t=navigator.userAgent,e=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],i=!0,n=0;n<e.length-1;n++)if(t.indexOf(e[n])>0){i=!1;break}return i}"object"===typeof window&&(e=!0);var l=!1;return t.exports={showWatch:function(t,e,i,n){var o=n.getState();s(n,i),t&&"none"!==t?r(t,n,i):(o.left&&r("none",n,i),c(n))},touchstart:i,touchmove:n,touchend:o,mousedown:function(t,n){e&&u()&&(i(t,n),l=!0)},mousemove:function(t,i){e&&u()&&l&&n(t,i)},mouseup:function(t,i){e&&u()&&(o(t,i),l=!1)},mouseleave:function(t,i){e&&u()&&(l=!1)}},t.exports}({exports:{}})}},a53f:function(t,e,i){"use strict";var n=i("9edb"),o=i.n(n);o.a},ab79:function(t,e,i){"use strict";i.r(e);var n=i("3e3c"),o=i("1963");for(var a in o)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("a53f");var s=i("f0c5"),r=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"170e1ad5",null,!1,n["a"],void 0);e["default"]=r.exports},b3fa:function(t,e,i){"use strict";i.r(e);var n=i("023f"),o=i("1e94");for(var a in o)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("738a");var s=i("f0c5"),r=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"1fb57334",null,!1,n["a"],void 0);e["default"]=r.exports},b59f:function(t,e,i){"use strict";i.r(e);var n=i("3bb1"),o=i.n(n);for(var a in n)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},b7d5:function(t,e,i){"use strict";var n=i("6a11"),o=i.n(n);o.a},c826:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={};e.default=n},d659:function(t,e,i){"use strict";var n=i("4fc6"),o=i.n(n);o.a},dbf7:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.isPC=function(){for(var t=navigator.userAgent,e=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],i=!0,n=0;n<e.length-1;n++)if(t.indexOf(e[n])>0){i=!1;break}return i},i("c975")},e535:function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var n={uniSection:i("ab79").default,uniDateformat:i("d5fe").default,myIssus:i("b3fa").default},o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"wrapper"},[t._l(t.videoItem,(function(e,n){return i("v-uni-view",{key:n,staticClass:"item-f"},[i("uni-section",{staticClass:"mb-10",attrs:{title:e.title,"sub-title":e.from,type:"line"}}),i("v-uni-video",{staticClass:"video",attrs:{src:e.address,poster:e.img,"show-mute-btn":"true","custom-cache":"false"},on:{loadeddata:function(e){arguments[0]=e=t.$handleEvent(e),t.loadeddata.apply(void 0,arguments)}}}),i("v-uni-view",{staticClass:"info"},[i("v-uni-text",[t._v("发布时间："),i("uni-dateformat",{attrs:{date:e.publishData,format:"MM月dd hh:mm",threshold:[6e4,2592e6]}})],1),i("v-uni-text",[t._v("观看量："+t._s(e.view_coun))])],1)],1)})),t.isshowInput?i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.videoItem.length,expression:"videoItem.length"}]},[i("my-issus",{attrs:{isshowMseeage:t.isshowMseeage,isShowSu:t.isShowSu}})],1):t._e()],2)},a=[]},ec64:function(t,e,i){"use strict";i.r(e);var n=i("0ce5"),o=i.n(n);for(var a in n)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},f42c:function(t,e,i){var n=i("73a5");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("1022b28b",n,!0,{sourceMap:!1,shadowMode:!1})},f70c:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={};e.default=n},ff51:function(t,e,i){"use strict";i.r(e);var n=i("e535"),o=i("96c1");for(var a in o)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("d659");var s=i("f0c5"),r=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"fdacfb74",null,!1,n["a"],void 0);e["default"]=r.exports}}]);