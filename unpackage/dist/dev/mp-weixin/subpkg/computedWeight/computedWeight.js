(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/computedWeight/computedWeight"],{240:function(e,t,i){"use strict";(function(e){var t=i(3);i(25),i(26);t(i(24));var n=t(i(241));wx.__webpack_require_UNI_MP_PLUGIN__=i,e(n.default)}).call(this,i(1)["createPage"])},241:function(e,t,i){"use strict";i.r(t);var n=i(242),r=i(244);for(var s in r)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return r[e]}))}(s);i(246);var o,c=i(43),a=Object(c["default"])(r["default"],n["render"],n["staticRenderFns"],!1,null,null,null,!1,n["components"],o);a.options.__file="subpkg/computedWeight/computedWeight.vue",t["default"]=a.exports},242:function(e,t,i){"use strict";i.r(t);var n=i(243);i.d(t,"render",(function(){return n["render"]})),i.d(t,"staticRenderFns",(function(){return n["staticRenderFns"]})),i.d(t,"recyclableRender",(function(){return n["recyclableRender"]})),i.d(t,"components",(function(){return n["components"]}))},243:function(e,t,i){"use strict";var n;i.r(t),i.d(t,"render",(function(){return r})),i.d(t,"staticRenderFns",(function(){return o})),i.d(t,"recyclableRender",(function(){return s})),i.d(t,"components",(function(){return n}));try{n={tColorPicker:function(){return i.e("components/t-color-picker/t-color-picker").then(i.bind(null,453))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,t=e.$createElement;e._self._c},s=!1,o=[];r._withStripped=!0},244:function(e,t,i){"use strict";i.r(t);var n=i(245),r=i.n(n);for(var s in n)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(s);t["default"]=r.a},245:function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(){i.e("components/jp-charts/index").then(function(){return resolve(i(304))}.bind(null,i)).catch(i.oe)},r=function(){i.e("components/t-color-picker/t-color-picker").then(function(){return resolve(i(453))}.bind(null,i)).catch(i.oe)},s={components:{jpCharts:n,tColorPicker:r},data:function(){return{isShowWrite:!0,writeKg:"",one:"",array:[20,30,40,50,60,70,80,90,100],array1:[50,60,70,80,90,100,110],arrIndex1:"",arrIndex2:"",index:0,index2:0,title:"自定义",newItem:[{keyw:"0",value:"100"}],oldItem:{keyw:"",value:""},newItemIndex:0,keyw1:"",value1:"",setTrue:0,color:{r:255,g:0,b:0,a:.6},color2:{r:255,g:0,b:0,a:.6},color3:{r:255,g:0,b:0,a:.6},Charts:{Y:{value:"value",showY:!0,size:20,units:""},X:{value:"keyw",showX:!0,size:20,units:""},keyId:"keyw",radius:20,list:[],items:{},selectColor:{color1:"#ffeb99",color2:"#edc00c",color3:"#34ffa0"},width:750,height:500,x_width:80,proportion:70,showZ:!0,canClick:!0,scrollLeft:0},list:[{keyw:"1",value:67},{keyw:"2",value:79},{keyw:"3",value:90},{keyw:"4",value:69},{keyw:"5",value:79},{keyw:"6",value:64},{keyw:"7",value:67},{keyw:"8",value:79},{keyw:"9",value:64},{keyw:"10",value:67},{keyw:"11",value:79},{keyw:"12",value:64},{keyw:"13",value:67},{keyw:"14",value:79},{keyw:"15",value:64},{keyw:"次数",value:""}],items:{keyw:"0",value:100}}},methods:{remove:function(){var t=this;e.showModal({title:"确认删除吗",content:"提示：这将会删除你记录的数据，请备份",success:function(i){i.confirm&&(e.removeStorageSync("weightArr"),t.fresh())}})},localstorage:function(){e.setStorageSync("weightArr",this.newItem)},clickSelect:function(){this.isShowWrite=!this.isShowWrite,this.title=this.isShowWrite?"自定义":"保存返回"},kg:function(t){this.newItem=e.getStorageSync("weightArr"),this.newItemIndex=this.newItem.length,this.value1=this.writeKg,this.keyw1=this.newItem.length},write1:function(){""!=this.writeKg?(this.newItem=e.getStorageSync("weightArr"),this.oldItem.keyw=this.keyw1,this.oldItem.value=Number(this.value1),this.newItem.splice(this.newItemIndex,0,this.oldItem),this.localstorage(),this.writeKg="",this.list=e.getStorageSync("weightArr"),this.setTrue&&(this.list[0].value=this.setTrue)):e.showToast({title:"输入不能为空",icon:"none"})},write2:function(){""!=this.one?(this.setTrue=Number(this.one),e.setStorageSync("setTrue",this.setTrue),this.list=e.getStorageSync("weightArr"),this.setTrue&&(this.list[0].value=this.setTrue),this.one=""):e.showToast({title:"输入不能为空",icon:"none"})},picker1:function(e){this.arrIndex1=e.detail.value,this.Charts.proportion=this.array[this.arrIndex1],this.index=this.arrIndex1},picker2:function(e){this.arrIndex2=e.detail.value,this.Charts.x_width=this.array1[this.arrIndex2],this.index2=this.arrIndex2},value:function(){this.Charts.Y.showY=!this.Charts.Y.showY},x:function(){this.Charts.X.showX=!this.Charts.X.showX},z:function(){this.Charts.showZ=!this.Charts.showZ},fresh:function(){this.list=e.getStorageSync("weightArr"),this.setTrue&&(this.list[0].value=this.setTrue)},open:function(e){this.$refs.colorPicker.open()},open2:function(e){this.$refs.colorPicker2.open()},open3:function(e){this.$refs.colorPicker3.open()},confirm:function(e){var t=JSON.stringify(e);this.Charts.selectColor.color1=JSON.parse(t).hex,this.fresh()},confirm2:function(e){var t=JSON.stringify(e);this.Charts.selectColor.color2=JSON.parse(t).hex,this.fresh()},confirm3:function(e){var t=JSON.stringify(e);this.Charts.selectColor.color3=JSON.parse(t).hex,this.fresh()}},onLoad:function(){var t=e.getStorageSync("name").name;if(t){if(t){this.list=e.getStorageSync("weightArr"),console.log(this.list.length),console.log(this.list),0==!this.list.length?this.list.push({keyw:"次数",value:""}):(this.list=[{keyw:"理想值",value:""}],this.newItem=this.list,this.localstorage());var i=e.getStorageSync("setTrue");i&&(this.setTrue=i),this.setTrue&&(this.list[0].value=this.setTrue,e.setStorageSync("setTrue",this.list[0].value))}}else this.setTrue&&(this.list[0].value=this.setTrue)}};t.default=s}).call(this,i(1)["default"])},246:function(e,t,i){"use strict";i.r(t);var n=i(247),r=i.n(n);for(var s in n)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(s);t["default"]=r.a},247:function(e,t,i){}},[[240,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg/computedWeight/computedWeight.js.map