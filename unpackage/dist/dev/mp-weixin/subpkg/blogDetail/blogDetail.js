(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/blogDetail/blogDetail"],{153:function(e,t,n){"use strict";(function(e){var t=n(3);n(25),n(26);t(n(24));var i=t(n(154));wx.__webpack_require_UNI_MP_PLUGIN__=n,e(i.default)}).call(this,n(1)["createPage"])},154:function(e,t,n){"use strict";n.r(t);var i=n(155),r=n(157);for(var o in r)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(o);n(159);var a,c=n(43),l=Object(c["default"])(r["default"],i["render"],i["staticRenderFns"],!1,null,null,null,!1,i["components"],a);l.options.__file="subpkg/blogDetail/blogDetail.vue",t["default"]=l.exports},155:function(e,t,n){"use strict";n.r(t);var i=n(156);n.d(t,"render",(function(){return i["render"]})),n.d(t,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(t,"components",(function(){return i["components"]}))},156:function(e,t,n){"use strict";var i;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return a})),n.d(t,"recyclableRender",(function(){return o})),n.d(t,"components",(function(){return i}));try{i={uniLoadMore:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more")]).then(n.bind(null,375))},uniDateformat:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat")]).then(n.bind(null,393))},myCommentItem:function(){return n.e("components/my-commentItem/my-commentItem").then(n.bind(null,399))},myComment:function(){return Promise.all([n.e("common/vendor"),n.e("components/my-comment/my-comment")]).then(n.bind(null,406))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,t=e.$createElement,n=(e._self._c,e.loadingstatus?null:e._f("formatRichText")(e.detailObj.content));e.$mp.data=Object.assign({},{$root:{f0:n}})},o=!1,a=[];r._withStripped=!0},157:function(e,t,n){"use strict";n.r(t);var i=n(158),r=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=r.a},158:function(e,t,n){"use strict";(function(e,i){var r=n(3);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(27)),a=r(n(17)),c=r(n(29)),l=r(n(10));function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){(0,l.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d=e.database(),m=e.importObject("utilsObj",{customUI:!0}),f={data:function(){return{artid:"",loadingstatus:!0,detailObj:"",user_id:"",user_nicheng:"",user_touxaing:"",pushPicurls:"",pushTitle:"",likeUserArr:[],isComment:!0,commentObj:{article_id:"",comment_type:0},commentList:[],commentinfo:[],uniloading:"more"}},filters:{formatRichText:function(e){var t=e.replace(/<img[^>]*>/gi,(function(e,t){return e=e.replace(/style="[^"]+"/gi,"").replace(/style='[^']+'/gi,""),e=e.replace(/width="[^"]+"/gi,"").replace(/width='[^']+'/gi,""),e=e.replace(/height="[^"]+"/gi,"").replace(/height='[^']+'/gi,""),e}));return t=t.replace(/style="[^"]+"/gi,(function(e,t){return e=e.replace(/width:[^;]+;/gi,"max-width:100%;").replace(/width:[^;]+;/gi,"max-width:100%;"),e})),t=t.replace(/<br[^>]*\/>/gi,""),t=t.replace(/\<img/gi,'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"'),t}},methods:{error:function(){i.showToast({title:"参数有误",icon:"none"}),setTimeout((function(){i.reLaunch({url:"/pages/interlocution/interlocution"})}),800)},commentEnv:function(e){this.commentList.unshift(s(s({},this.commentObj),e))},removeEnv:function(e){var t=this.commentList.findIndex((function(t){return t._id==e.id}));this.commentList.splice(t,1)},getComment:function(){var e=this;return(0,c.default)(o.default.mark((function t(){var n,r,c,l;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,d.collection("articleComment").where("article_id=='".concat(e.artid,"' && comment_type==0")).orderBy("comment_date desc").skip(e.commentList.length).limit(5).get();case 2:return n=t.sent,e.commentList,r=[].concat((0,a.default)(e.commentList),(0,a.default)(n.result.data)),0==n.result.data.length&&(e.uniloading="noMore"),c=r.map((function(e){return e._id})),t.next=9,d.collection("articleComment").where({reply_comment_id:d.command.in(c)}).groupBy("reply_comment_id").groupField("count(*) as totalReply").get();case 9:l=t.sent,r.forEach((function(e){var t=l.result.data.findIndex((function(t){return t.reply_comment_id==e._id}));t>-1&&(e.totalReply=l.result.data[t].totalReply)})),e.commentList=r,console.log(e.commentList),i.hideLoading();case 14:case"end":return t.stop()}}),t)})))()},getData:function(){var e=this,t=d.collection("articlelike").where("user_id=='".concat(this.user_id,"'")).getTemp(),n=d.collection("article").where('_id=="'.concat(this.artid,'"')).getTemp();d.collection(n,t).get({getOne:!0}).then((function(t){console.log("文章title",t.result.data.picurls),e.pushPicurls=t.result.data.picurls,e.pushTitle=t.result.data.title;var n=!1;e.user_id&&(n=!!t.result.data._id.articlelike.length),t.result.data.isLike=n,e.detailObj=t.result.data,e.loadingstatus=!1,i.setNavigationBarTitle({title:e.detailObj.title})}))},readUpdata:function(){m.operation("article","view_count",this.artid,2).then((function(e){}))},getLikeUser:function(){var e=this,t=d.collection("articlelike").where("article_id == '".concat(this.artid,"'")).getTemp(),n=d.collection("article").field("_id,user_touxiang").getTemp();d.collection(t,n).orderBy("publish_date desc").limit(5).get().then((function(t){t.result.data=t.result.data.reverse(),e.likeUserArr=t.result.data}))},clickLike:function(){var e=this;return(0,c.default)(o.default.mark((function t(){var n,r;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.user_id){t.next=3;break}return i.showModal({title:"是否前往登录",success:function(e){e.confirm&&i.navigateTo({url:"/subpkg/signin/signin"})}}),t.abrupt("return");case 3:if(n=Date.now(),!(n-e.likeTime<2e3)){t.next=7;break}return i.showToast({title:"您的操作太频繁了",icon:"none"}),t.abrupt("return");case 7:return e.likeTime=n,e.detailObj.isLike?e.detailObj.like_count--:e.detailObj.like_count++,e.detailObj.isLike=!e.detailObj.isLike,t.next=12,d.collection("articlelike").where("article_id=='".concat(e.artid,"' &&user_id =='").concat(e.user_id,"'")).count();case 12:r=t.sent,r.result.total?(d.collection("articlelike").where("article_id=='".concat(e.artid,"' &&user_id =='").concat(e.user_id,"'")).remove(),m.operation("article","like_count",e.artid,-1)):(d.collection("articlelike").add({article_id:e.artid,user_id:e.user_id,user_nicheng:e.user_nicheng,user_touxiang:e.user_touxiang,articleTitle:e.detailObj.title,articlePic:e.detailObj.picurls}),m.operation("article","like_count",e.artid,1));case 14:case"end":return t.stop()}}),t)})))()}},onReachBottom:function(){this.uniloading="loading",i.showLoading({title:"评论正在加载"}),this.getComment()},onLoad:function(t){var n=this;t.id?(this.user_id=i.getStorageSync("name").name,this.user_nicheng=i.getStorageSync("name").nicheng,this.user_touxiang=i.getStorageSync("name").headerUrl,e.database().collection("userinfo").where('name=="'.concat(this.user_id,'"')).field("touxiang").get().then((function(e){n.user_touxaing=e.result.data[0].touxiang})),this.artid=t.id,this.commentObj.article_id=t.id,this.getComment(),this.getData(),this.readUpdata(),this.getLikeUser()):this.error()}};t.default=f}).call(this,n(26)["default"],n(1)["default"])},159:function(e,t,n){"use strict";n.r(t);var i=n(160),r=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=r.a},160:function(e,t,n){}},[[153,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg/blogDetail/blogDetail.js.map