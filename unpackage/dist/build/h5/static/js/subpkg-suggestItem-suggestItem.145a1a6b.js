(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["subpkg-suggestItem-suggestItem"],{1033:function(t,a,e){"use strict";e.r(a);var i=e("bf77"),n=e.n(i);for(var o in i)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return i[t]}))}(o);a["default"]=n.a},"4ae8":function(t,a,e){var i=e("cfb6");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=e("4f06").default;n("75c90fbd",i,!0,{sourceMap:!1,shadowMode:!1})},"742f":function(t,a,e){"use strict";e.d(a,"b",(function(){return i})),e.d(a,"c",(function(){return n})),e.d(a,"a",(function(){}));var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"wrapper"},t._l(t.arr,(function(a,i){return e("v-uni-view",{key:i,staticClass:"body"},[e("v-uni-view",{staticClass:"title"},[t._v(t._s(a.major))]),e("v-uni-view",{staticClass:"fenlei"},t._l(t.tedian,(function(a,i){return e("v-uni-text",{key:i},[t._v(t._s(a))])})),1),e("v-uni-view",{staticClass:"about"},[e("v-uni-text",[t._v("学科门类："+t._s(a.menllei))]),e("v-uni-text",[t._v("一级学科："+t._s(a.about))])],1),e("v-uni-view",{staticClass:"jieshao"},[e("v-uni-text",{staticClass:"jieshao-title"},[t._v("专业介绍")]),e("hr"),e("v-uni-view",{staticClass:"jieshao-content"},[t._v(t._s(a.jieshao))])],1),e("v-uni-view",{staticClass:"jieshao"},[e("v-uni-text",{staticClass:"jieshao-title"},[t._v("发展前景")]),e("hr"),e("v-uni-view",{staticClass:"kaoyan a"},[t._v("考研方向："+t._s(a.kaoyan))]),e("v-uni-view",{staticClass:"jiuye a"},[t._v("就业方向："+t._s(a.jiuye))])],1)],1)})),1)},n=[]},8168:function(t,a,e){"use strict";var i=e("4ae8"),n=e.n(i);n.a},bf77:function(t,a,e){"use strict";(function(t){e("7a82"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,e("a9e3");var i={data:function(){return{arr:[],index:"",tedian:[]}},onLoad:function(a){var e=this;t.database().collection("major").where({id:Number(a.id)}).get().then((function(t){e.arr=t.result.data,e.tedian=t.result.data[0].tedian,console.log(e.tedian)}))}};a.default=i}).call(this,e("a9ff")["default"])},cfb6:function(t,a,e){var i=e("24fb");a=i(!1),a.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.dian[data-v-44ff208b]{font-size:30px;text-align:center}.wrapper[data-v-44ff208b]{width:100%;background-color:#fffae5;height:100vh}.wrapper .body[data-v-44ff208b]{padding-top:20px;padding-left:15px}.wrapper .body .title[data-v-44ff208b]{font-size:30px;letter-spacing:1px}.wrapper .body .fenlei[data-v-44ff208b]{margin-top:40px}.wrapper .body .fenlei uni-text[data-v-44ff208b]{padding:3px 10px;border:2px solid #eec82a;border-radius:%?30?%;margin-right:10px;color:#eec82a;background-color:#fff}.wrapper .body .about[data-v-44ff208b]{margin-top:40px;display:flex;font-size:16px;flex-direction:column}.wrapper .body .jieshao[data-v-44ff208b]{width:95%;margin-top:60px;background-color:#fff;display:flex;flex-direction:column;border-radius:15px}.wrapper .body .jieshao .jieshao-title[data-v-44ff208b]{text-align:center;color:#706e6b;font-size:16px;height:%?80?%;line-height:%?80?%}.wrapper .body .jieshao hr[data-v-44ff208b]{background-color:#d8d8d8}.wrapper .body .jieshao .jieshao-content[data-v-44ff208b]{padding:20px;text-indent:30px}.wrapper .body .jieshao .a[data-v-44ff208b]{padding:20px 20px 0 20px;display:flex;align-items:flex-start}.wrapper .body .jieshao .jiuye[data-v-44ff208b]{padding-bottom:20px}',""]),t.exports=a},d3e7:function(t,a,e){"use strict";e.r(a);var i=e("742f"),n=e("1033");for(var o in n)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return n[t]}))}(o);e("8168");var r=e("f0c5"),s=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"44ff208b",null,!1,i["a"],void 0);a["default"]=s.exports}}]);