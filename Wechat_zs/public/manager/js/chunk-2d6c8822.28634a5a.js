(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d6c8822"],{"365c":function(t,e,n){"use strict";n.d(e,"i",(function(){return d})),n.d(e,"m",(function(){return m})),n.d(e,"a",(function(){return p})),n.d(e,"d",(function(){return g})),n.d(e,"f",(function(){return f})),n.d(e,"b",(function(){return h})),n.d(e,"c",(function(){return b})),n.d(e,"k",(function(){return C})),n.d(e,"l",(function(){return v})),n.d(e,"e",(function(){return w})),n.d(e,"g",(function(){return D})),n.d(e,"h",(function(){return L})),n.d(e,"j",(function(){return T}));n("caad"),n("0d03"),n("d3b7"),n("e25e"),n("2532");var a,r=n("bc3a"),o=n.n(r),i=n("4360"),u=n("5c96"),s=o.a.create({baseURL:"http://zsjustn.top",timeout:8e3});function c(t){if(!t)return 0;var e=i["a"].getters.num,n=(new Date).getTime()-t;return n=parseInt(n/1e3/60,10),console.log(n),Boolean(n>=e)}s.interceptors.request.use((function(t){console.log("config: ",t);var e=i["a"].getters.countdown;return c(e)||i["a"].commit("index/SET_COUNTDOWN"),a=u["Loading"].service({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),i["a"].getters.userInfo&&(t.headers["zsid"]=i["a"].getters.userInfo._id),t}),(function(t){return console.log(t),Promise.reject()})),s.interceptors.response.use((function(t){if(a.close(),200===t.status)return t.data;Promise.reject()}),(function(t){return console.log(t.response),a.close(),t.message.includes("timeout")?Promise.reject("请求超时, 请稍后重试"):Promise.reject(t)}));var l=s,d=function(t){return l({url:"/admin/login",method:"post",data:t})},m="http://zsjustn.top/admin/upload",p=function(t){return l({url:"/admin/addCustomer",method:"post",data:t})},g=function(t){return l({url:"/admin/getLoginLog",method:"get",params:t})},f=function(t){return l({url:"/admin/getOwnerList",method:"get",params:t})},h=function(t){return l({url:"/admin/deleteOwner",method:"post",data:t})},b=function(t){return l({url:"/api/deleteUser",method:"post",data:t})},C=function(t){return l({url:"/api/upDateUser",method:"post",data:t})},v=function(t){return l({url:"/admin/updateOwner",method:"post",data:t})},w=function(t){return l({url:"/admin/getOperationLog",method:"get",params:t})},D=function(t){return l({url:"/api/getUserList",method:"get",params:t})},L=function(t){return l({url:"/admin/getUserListByAdmin",method:"get",params:t})},T=function(t){return l({url:"/api/setAdmin",method:"post",data:t})}},"725c":function(t,e,n){"use strict";var a=n("fa64"),r=n.n(a);r.a},"8be5":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"table"},[n("div",{staticClass:"crumbs"},[n("el-breadcrumb",{attrs:{separator:"/"}},[n("el-breadcrumb-item",[n("i",{staticClass:"el-icon-lx-cascades"}),t._v(" 操作日志 ")])],1)],1),n("div",{staticClass:"container"},[n("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:t.tableData,border:""},on:{"selection-change":t.handleSelectionChange}},[n("el-table-column",{attrs:{align:"center",prop:"count",label:"序号",width:"50"}}),n("el-table-column",{attrs:{align:"center",prop:"userName",label:"用户",width:"220"}}),n("el-table-column",{attrs:{align:"center",prop:"landTime",label:"登陆时间",width:"220"}}),n("el-table-column",{attrs:{align:"center",prop:"landIp",label:"登陆IP",width:"220"}}),n("el-table-column",{attrs:{align:"center",prop:"operationText",label:"操作"}}),n("el-table-column",{attrs:{align:"center",prop:"permissions",label:"权限",width:"220"}})],1),n("div",{staticClass:"pagination"},[n("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.totalCount},on:{"current-change":t.handleCurrentChange}})],1)],1)])},r=[],o=n("365c"),i={name:"loginLog",data:function(){return{tableData:[],cur_page:1,multipleSelection:[],totalCount:0}},created:function(){this.getData()},activated:function(){this.getData()},computed:{},methods:{handleCurrentChange:function(t){this.cur_page=t,this.getData()},getData:function(){var t=this,e={pageNum:this.cur_page,pageSize:10};Object(o["e"])(e).then((function(e){if(1===e.Code){for(var n=e.Data,a=0;a<n.length;a++)n[a].count=10*(t.cur_page-1)+a+1,n[a].landTime=t.$utils.parseTime(n[a].landTime),n[a].permissions=1===n[a].permissions?" 管理员":"普通用户";t.tableData=n,t.totalCount=e.TotalCount}else t.$message.error(e.Message||"获取数据失败")}))["catch"]((function(e){t.$message.error(e||"获取数据失败")}))},handleSelectionChange:function(t){console.log(3),this.multipleSelection=t}}},u=i,s=(n("725c"),n("2877")),c=Object(s["a"])(u,a,r,!1,null,"4f22eb04",null);e["default"]=c.exports},fa64:function(t,e,n){}}]);