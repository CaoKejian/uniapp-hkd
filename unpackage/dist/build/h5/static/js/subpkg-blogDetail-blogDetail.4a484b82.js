(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["subpkg-blogDetail-blogDetail"],{"1a80":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.rich-text img[data-v-a3dd7bae]{max-width:100%}.detail[data-v-a3dd7bae]{background:#f8f8f8;min-height:calc(100vh - var(--window-top))}.detail .container[data-v-a3dd7bae]{padding:%?30?%;background:#fff}.detail .container .title[data-v-a3dd7bae]{font-size:%?46?%;color:#333;line-height:1.4em;font-weight:600}.detail .container .userinfo[data-v-a3dd7bae]{padding:%?20?% 0 %?50?%;display:flex;align-items:center}.detail .container .userinfo .avatar[data-v-a3dd7bae]{width:%?60?%;height:%?60?%;padding-right:%?15?%}.detail .container .userinfo .avatar uni-image[data-v-a3dd7bae]{width:100%;height:100%;border-radius:50%}.detail .container .userinfo .text[data-v-a3dd7bae]{font-size:%?28?%;color:#555}.detail .container .userinfo .text .small[data-v-a3dd7bae]{font-size:%?20?%;color:#999}.detail .container .content[data-v-a3dd7bae]{width:100%}.detail .container .content uni-rich-text img[data-v-a3dd7bae]{max-width:100%!important}.detail .container .content .rich-text img[data-v-a3dd7bae]{max-width:100%}.detail .container .like[data-v-a3dd7bae]{display:flex;flex-direction:column;align-items:center;padding:%?80?% %?50?% %?50?%}.detail .container .like .btn[data-v-a3dd7bae]{width:%?260?%;height:%?120?%;background:#e4e4e4;border-radius:%?100?%;color:#fff;display:flex;justify-content:center;align-items:center;flex-direction:column;font-size:%?28?%}.detail .container .like .btn .iconfont[data-v-a3dd7bae]{font-size:%?50?%}.detail .container .like .btn.active[data-v-a3dd7bae]{background:#0199fe}.detail .container .like .text[data-v-a3dd7bae]{font-size:%?26?%;color:#666}.detail .container .like .text .num[data-v-a3dd7bae]{color:#0199fe}.detail .container .like .text .spot[data-v-a3dd7bae]{padding:0 %?10?%}.detail .container .like .users[data-v-a3dd7bae]{display:flex;justify-content:center;padding:%?30?% 0}.detail .container .like .users uni-image[data-v-a3dd7bae]{width:%?50?%;height:%?50?%;border-radius:50%;border:3px solid #fff;margin-left:%?-20?%}.detail .comment[data-v-a3dd7bae]{padding:%?30?%;padding-bottom:%?120?%}',""]),t.exports=e},3596:function(t,e,i){"use strict";i.r(e);var a=i("a82b"),n=i("f880");for(var r in n)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("dbea");var o=i("f0c5"),c=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"a3dd7bae",null,!1,a["a"],void 0);e["default"]=c.exports},"36a5":function(t,e,i){"use strict";(function(t){i("7a82");var a=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("c7eb")),r=a(i("2909")),o=a(i("1da1")),c=a(i("5530"));i("ac1f"),i("5319"),i("3c65"),i("c740"),i("a434"),i("99af"),i("d81d"),i("d3b7"),i("159b"),i("26e9");var l=t.database(),d=t.importObject("utilsObj",{customUI:!0}),s={data:function(){return{artid:"",loadingstatus:!0,detailObj:"",user_id:"",user_nicheng:"",user_touxaing:"",pushPicurls:"",pushTitle:"",likeUserArr:[],isComment:!0,commentObj:{article_id:"",comment_type:0},commentList:[],commentinfo:[],uniloading:"more"}},filters:{formatRichText:function(t){var e=t.replace(/<img[^>]*>/gi,(function(t,e){return t=t.replace(/style="[^"]+"/gi,"").replace(/style='[^']+'/gi,""),t=t.replace(/width="[^"]+"/gi,"").replace(/width='[^']+'/gi,""),t=t.replace(/height="[^"]+"/gi,"").replace(/height='[^']+'/gi,""),t}));return e=e.replace(/style="[^"]+"/gi,(function(t,e){return t=t.replace(/width:[^;]+;/gi,"max-width:100%;").replace(/width:[^;]+;/gi,"max-width:100%;"),t})),e=e.replace(/<br[^>]*\/>/gi,""),e=e.replace(/\<img/gi,'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"'),e}},methods:{error:function(){uni.showToast({title:"参数有误",icon:"none"}),setTimeout((function(){uni.reLaunch({url:"/pages/interlocution/interlocution"})}),800)},commentEnv:function(t){this.commentList.unshift((0,c.default)((0,c.default)({},this.commentObj),t))},removeEnv:function(t){var e=this.commentList.findIndex((function(e){return e._id==t.id}));this.commentList.splice(e,1)},getComment:function(){var t=this;return(0,o.default)((0,n.default)().mark((function e(){var i,a,o,c;return(0,n.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l.collection("articleComment").where("article_id=='".concat(t.artid,"' && comment_type==0")).orderBy("comment_date desc").skip(t.commentList.length).limit(5).get();case 2:return i=e.sent,t.commentList,a=[].concat((0,r.default)(t.commentList),(0,r.default)(i.result.data)),0==i.result.data.length&&(t.uniloading="noMore"),o=a.map((function(t){return t._id})),e.next=9,l.collection("articleComment").where({reply_comment_id:l.command.in(o)}).groupBy("reply_comment_id").groupField("count(*) as totalReply").get();case 9:c=e.sent,a.forEach((function(t){var e=c.result.data.findIndex((function(e){return e.reply_comment_id==t._id}));e>-1&&(t.totalReply=c.result.data[e].totalReply)})),t.commentList=a,console.log(t.commentList),uni.hideLoading();case 14:case"end":return e.stop()}}),e)})))()},getData:function(){var t=this,e=l.collection("articlelike").where("user_id=='".concat(this.user_id,"'")).getTemp(),i=l.collection("article").where('_id=="'.concat(this.artid,'"')).getTemp();l.collection(i,e).get({getOne:!0}).then((function(e){console.log("文章title",e.result.data.picurls),t.pushPicurls=e.result.data.picurls,t.pushTitle=e.result.data.title;var i=!1;t.user_id&&(i=!!e.result.data._id.articlelike.length),e.result.data.isLike=i,t.detailObj=e.result.data,t.loadingstatus=!1,uni.setNavigationBarTitle({title:t.detailObj.title})}))},readUpdata:function(){d.operation("article","view_count",this.artid,2).then((function(t){}))},getLikeUser:function(){var t=this,e=l.collection("articlelike").where("article_id == '".concat(this.artid,"'")).getTemp(),i=l.collection("article").field("_id,user_touxiang").getTemp();l.collection(e,i).orderBy("publish_date desc").limit(5).get().then((function(e){e.result.data=e.result.data.reverse(),t.likeUserArr=e.result.data}))},clickLike:function(){var t=this;return(0,o.default)((0,n.default)().mark((function e(){var i,a;return(0,n.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.user_id){e.next=3;break}return uni.showModal({title:"是否前往登录",success:function(t){t.confirm&&uni.navigateTo({url:"/subpkg/signin/signin"})}}),e.abrupt("return");case 3:if(i=Date.now(),!(i-t.likeTime<2e3)){e.next=7;break}return uni.showToast({title:"您的操作太频繁了",icon:"none"}),e.abrupt("return");case 7:return t.likeTime=i,t.detailObj.isLike?t.detailObj.like_count--:t.detailObj.like_count++,t.detailObj.isLike=!t.detailObj.isLike,e.next=12,l.collection("articlelike").where("article_id=='".concat(t.artid,"' &&user_id =='").concat(t.user_id,"'")).count();case 12:a=e.sent,a.result.total?(l.collection("articlelike").where("article_id=='".concat(t.artid,"' &&user_id =='").concat(t.user_id,"'")).remove(),d.operation("article","like_count",t.artid,-1)):(l.collection("articlelike").add({article_id:t.artid,user_id:t.user_id,user_nicheng:t.user_nicheng,user_touxiang:t.user_touxiang,articleTitle:t.detailObj.title,articlePic:t.detailObj.picurls}),d.operation("article","like_count",t.artid,1));case 14:case"end":return e.stop()}}),e)})))()}},onReachBottom:function(){this.uniloading="loading",uni.showLoading({title:"评论正在加载"}),this.getComment()},onLoad:function(e){var i=this;e.id?(this.user_id=uni.getStorageSync("name").name,this.user_nicheng=uni.getStorageSync("name").nicheng,this.user_touxiang=uni.getStorageSync("name").headerUrl,t.database().collection("userinfo").where('name=="'.concat(this.user_id,'"')).field("touxiang").get().then((function(t){i.user_touxaing=t.result.data[0].touxiang})),this.artid=e.id,this.commentObj.article_id=e.id,this.getComment(),this.getData(),this.readUpdata(),this.getLikeUser()):this.error()}};e.default=s}).call(this,i("a9ff")["default"])},8320:function(t,e,i){var a=i("1a80");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("3f34f6f2",a,!0,{sourceMap:!1,shadowMode:!1})},a82b:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return a}));var a={uniLoadMore:i("ff53").default,uniDateformat:i("d5fe").default,myCommentItem:i("dbf9").default,myComment:i("c469").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"detail"},[i("v-uni-view",{staticClass:"container"},[t.loadingstatus?i("v-uni-view",[i("uni-load-more",{attrs:{status:"loading",iconType:"auto"}})],1):i("v-uni-view",[i("v-uni-view",{staticClass:"title"},[t._v(t._s(t.detailObj.title))]),i("v-uni-view",{staticClass:"userinfo"},[i("v-uni-view",{staticClass:"avatar"},[i("v-uni-image",{attrs:{src:t.detailObj.user_touxiang?t.detailObj.user_touxiang:"../../static/touxiang.png",mode:"aspectFill"}})],1),i("v-uni-view",{staticClass:"text"},[i("v-uni-view",{staticClass:"name"},[t._v(t._s(t.detailObj.user_nicheng||t.detailObj.user_id))]),i("v-uni-view",{staticClass:"small"},[i("uni-dateformat",{attrs:{date:t.detailObj.publish_date,format:"yyyy年MM月dd hh:mm:ss"}}),t._v("前 · 发布于"+t._s(t.detailObj.province))],1)],1)],1),i("v-uni-view",{staticClass:"content"},[i("v-uni-rich-text",{staticClass:"rich-text",attrs:{nodes:t._f("formatRichText")(t.detailObj.content)}})],1),i("v-uni-view",{staticClass:"like"},[i("v-uni-view",{staticClass:"btn",class:t.detailObj.isLike?"active":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickLike.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"iconfont icon-good-fill"}),i("v-uni-text",[t._v(t._s(t.detailObj.like_count?t.detailObj.like_count:""))])],1),i("v-uni-view",{staticClass:"users"},[t._l(t.likeUserArr,(function(e){return[e.user_touxiang?i("v-uni-image",{attrs:{src:e.user_touxiang,mode:"aspectFill"}}):t._e()]}))],2),i("v-uni-view",{staticClass:"text"},[i("v-uni-text",{staticClass:"num"},[t._v(t._s(t.detailObj.view_count))]),t._v("人看过")],1)],1)],1)],1),i("v-uni-view",{staticClass:"comment"},[t.commentList.length?t._e():i("v-uni-view",{staticClass:"zanwu"},[t._v("暂无评论")]),t.commentList.length?i("v-uni-view",{staticClass:"content"},[t._l(t.commentList,(function(e){return i("v-uni-view",{key:e.id,staticClass:"item"},[i("my-commentItem",{attrs:{item:e,commentObj:t.commentObj},on:{removeEnv:function(e){arguments[0]=e=t.$handleEvent(e),t.removeEnv.apply(void 0,arguments)}}})],1)})),i("uni-load-more",{attrs:{status:t.uniloading}})],2):t._e()],1),i("my-comment",{attrs:{commentObj:t.commentObj,pushPicurls:t.pushPicurls,pushTitle:t.pushTitle},on:{commentEnv:function(e){arguments[0]=e=t.$handleEvent(e),t.commentEnv.apply(void 0,arguments)}}})],1)},r=[]},dbea:function(t,e,i){"use strict";var a=i("8320"),n=i.n(a);n.a},f880:function(t,e,i){"use strict";i.r(e);var a=i("36a5"),n=i.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a}}]);