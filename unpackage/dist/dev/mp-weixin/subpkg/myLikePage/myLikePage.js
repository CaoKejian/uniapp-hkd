(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/myLikePage/myLikePage"],{177:function(e,t,n){"use strict";(function(e){var t=n(3);n(25),n(26);t(n(24));var i=t(n(178));wx.__webpack_require_UNI_MP_PLUGIN__=n,e(i.default)}).call(this,n(1)["createPage"])},178:function(e,t,n){"use strict";n.r(t);var i=n(179),r=n(181);for(var c in r)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(c);n(183);var a,o=n(43),u=Object(o["default"])(r["default"],i["render"],i["staticRenderFns"],!1,null,null,null,!1,i["components"],a);u.options.__file="subpkg/myLikePage/myLikePage.vue",t["default"]=u.exports},179:function(e,t,n){"use strict";n.r(t);var i=n(180);n.d(t,"render",(function(){return i["render"]})),n.d(t,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(t,"components",(function(){return i["components"]}))},180:function(e,t,n){"use strict";var i;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return a})),n.d(t,"recyclableRender",(function(){return c})),n.d(t,"components",(function(){return i}));var r=function(){var e=this,t=e.$createElement;e._self._c},c=!1,a=[];r._withStripped=!0},181:function(e,t,n){"use strict";n.r(t);var i=n(182),r=n.n(i);for(var c in i)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(c);t["default"]=r.a},182:function(e,t,n){"use strict";(function(e,i){var r=n(3);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=r(n(27)),a=r(n(29)),o=e.database(),u=(o.command,e.importObject("utilsObj",{customUI:!0})),l={data:function(){return{myLikeList:[]}},methods:{getData:function(){var e=this;i.showLoading({title:"正在加载"});var t=i.getStorageSync("name").name,n=o.collection("articlelike").where("user_id=='".concat(t,"'")).getTemp(),r=o.collection("article").field("_id,title,description,like_count,user_nicheng,user_touxiang,user_id,view_count,comment_count").getTemp();o.collection(n,r).orderBy("publish_date desc").get().then((function(t){console.log(t),e.myLikeList=t.result.data,i.hideLoading()}))},gotoDetail:function(e){i.navigateTo({url:"/subpkg/blogDetail/blogDetail?id="+e.article_id[0]._id})},clicklike:function(e,t,n){return(0,a.default)(c.default.mark((function e(){return c.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:i.showModal({title:"确认取消点赞吗",success:function(e){if(e.confirm){var r=t.user_id,c=t.article_id[0]._id;o.collection("articlelike").where("article_id=='".concat(c,"' &&user_id =='").concat(r,"'")).remove(),u.operation("article","like_count",c,-1),this.myLikeList.splice(n,1)}else e.cancel&&i.showToast({title:"用户取消操作",icon:"none"})}});case 1:case"end":return e.stop()}}),e)})))()}},onLoad:function(){i.getStorageSync("name").name,e.database();this.getData()},onShow:function(){var e=i.getStorageSync("name").name;e||i.navigateBack({})}};t.default=l}).call(this,n(26)["default"],n(1)["default"])},183:function(e,t,n){"use strict";n.r(t);var i=n(184),r=n.n(i);for(var c in i)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(c);t["default"]=r.a},184:function(e,t,n){}},[[177,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg/myLikePage/myLikePage.js.map