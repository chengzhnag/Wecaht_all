(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["entrance"],{"0039":function(t,a,n){"use strict";var e=n("34b2"),s=n.n(e);s.a},"34b2":function(t,a,n){},"4ca9":function(t,a,n){},"6cee":function(t,a,n){"use strict";var e=n("843b"),s=n.n(e);s.a},"7c22":function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"my-box"},[n("div",{staticClass:"personal"},[n("div",{staticClass:"top"},[n("img",{attrs:{src:"http://f.zsjustn.top/save/2.jpg",alt:""},on:{click:t.goToPersonal}}),n("span",[t._v("张三")])]),n("div",{staticClass:"bottom"},t._l(t.texts,(function(a,e){return n("div",{key:e,staticClass:"like"},[n("span",{staticClass:"key"},[t._v(t._s(a))]),n("span",{staticClass:"value"},[t._v(t._s(e+8))])])})),0)]),n("div",{staticClass:"content"},[n("van-cell-group",[n("van-cell",{attrs:{title:"我的签到",icon:"edit","is-link":""}})],1),n("van-cell-group",[n("van-cell",{attrs:{title:"我的提醒",icon:"chat-o","is-link":""}}),n("van-cell",{attrs:{title:"我的收藏",icon:"star-o","is-link":""}})],1),n("van-cell-group",[n("van-cell",{attrs:{title:"用户组",icon:"manager-o","is-link":""}}),n("van-cell",{attrs:{title:"注册时间",icon:"calender-o","is-link":""}})],1)],1)])},s=[],i={data:function(){return{texts:["好友数","回复数","主题数","积分"]}},mounted:function(){},methods:{goToPersonal:function(){}}},c=i,o=(n("c0c1"),n("2877")),r=Object(o["a"])(c,e,s,!1,null,"06a61874",null);a["default"]=r.exports},"843b":function(t,a,n){},b0c0:function(t,a,n){var e=n("83ab"),s=n("9bf2").f,i=Function.prototype,c=i.toString,o=/^\s*function ([^ (]*)/,r="name";e&&!(r in i)&&s(i,r,{configurable:!0,get:function(){try{return c.call(this).match(o)[1]}catch(t){return""}}})},bc1e:function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"home-box"},[n("div",{staticClass:"swipe-box"},[n("van-swipe",{staticClass:"my-swipe",attrs:{autoplay:3e3,"indicator-color":"white"}},t._l(t.images,(function(t,a){return n("van-swipe-item",{key:a},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t,expression:"image"}]})])})),1)],1),n("div",{staticClass:"tag-box"},[n("van-tag",{attrs:{plain:""}},[t._v("去添加")]),n("van-tag",{attrs:{plain:""}},[t._v("张三")]),n("van-tag",{attrs:{plain:""}},[t._v("精品原创")]),n("van-tag",{attrs:{plain:""}},[t._v("资源教程")]),n("van-tag",{attrs:{plain:""}},[t._v("影音")])],1),n("div",{staticClass:"content"},t._l(4,(function(a,e){return n("div",{key:e,staticClass:"item"},[n("div",{staticClass:"top"},[t._m(0,!0),n("div",{staticClass:"right"},[n("div",{staticClass:"t"},[t._v("[开箱]坚果Pro3开箱照小赛")]),n("div",{staticClass:"b"},[t._m(1,!0),n("div",{staticClass:"len"},[n("van-icon",{attrs:{name:"eye",color:"#999"}}),t._v(" 142214 "),n("span",{staticStyle:{margin:"0 5px"}}),n("van-icon",{attrs:{name:"chat",color:"#999"}}),t._v(" 456 ")],1)])])]),t._m(2,!0)])})),0)])},s=[function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"left"},[n("img",{attrs:{src:"http://f.zsjustn.top/save/2.jpg",alt:""}})])},function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"mes"},[t._v(" 坚果手机 "),n("span",{staticStyle:{margin:"0 6px"}}),t._v(" 2019-11-19 12:55 ")])},function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"bottom"},[n("img",{attrs:{src:"http://f.zsjustn.top/save/2.jpg",alt:""}})])}],i={data:function(){return{images:["http://f.zsjustn.top/save/4.jpg","http://f.zsjustn.top/save/3.jpg"]}},mounted:function(){},methods:{}},c=i,o=(n("6cee"),n("2877")),r=Object(o["a"])(c,e,s,!1,null,"a3bdd358",null);a["default"]=r.exports},c0c1:function(t,a,n){"use strict";var e=n("4ca9"),s=n.n(e);s.a},ef67:function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"entrance-box"},[n("div",{staticClass:"content"},[n("keep-alive",[n("router-view")],1)],1),n("van-tabbar",{attrs:{"safe-area-inset-bottom":"",placeholder:""},on:{change:t.changeTab},model:{value:t.active,callback:function(a){t.active=a},expression:"active"}},[n("van-tabbar-item",{attrs:{icon:"home-o"}},[t._v("首页")]),n("van-tabbar-item",{attrs:{icon:"manager-o"}},[t._v("我的")])],1)],1)},s=[],i=(n("b0c0"),n("ac1f"),n("5319"),{data:function(){return{active:0}},watch:{$route:function(t,a){console.log("to: ",t),console.log("from: ",a)}},mounted:function(){console.log(this.$route);var t=this.$route.name;this.active="Entrance/My"==t?1:0},methods:{changeTab:function(t){console.log(t);var a="Entrance/Home";t&&(a="Entrance/My"),this.$router.replace({name:a})}}}),c=i,o=(n("0039"),n("2877")),r=Object(o["a"])(c,e,s,!1,null,"2b88748c",null);a["default"]=r.exports}}]);