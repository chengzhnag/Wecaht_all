(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-50633b7a"],{"159b":function(t,e,n){var a=n("da84"),i=n("fdbc"),r=n("17c2"),s=n("9112");for(var o in i){var c=a[o],l=c&&c.prototype;if(l&&l.forEach!==r)try{s(l,"forEach",r)}catch(u){l.forEach=r}}},"17c2":function(t,e,n){"use strict";var a=n("b727").forEach,i=n("a640"),r=n("ae40"),s=i("forEach"),o=r("forEach");t.exports=s&&o?[].forEach:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}},"187a":function(t,e,n){"use strict";var a=n("42d5"),i=n.n(a);i.a},"365c":function(t,e,n){"use strict";n.d(e,"k",(function(){return d})),n.d(e,"o",(function(){return f})),n.d(e,"a",(function(){return p})),n.d(e,"e",(function(){return h})),n.d(e,"g",(function(){return g})),n.d(e,"c",(function(){return m})),n.d(e,"d",(function(){return b})),n.d(e,"m",(function(){return v})),n.d(e,"n",(function(){return _})),n.d(e,"f",(function(){return w})),n.d(e,"h",(function(){return y})),n.d(e,"i",(function(){return x})),n.d(e,"j",(function(){return C})),n.d(e,"b",(function(){return k})),n.d(e,"l",(function(){return T}));n("caad"),n("0d03"),n("d3b7"),n("e25e"),n("2532");var a,i=n("bc3a"),r=n.n(i),s=n("4360"),o=n("5c96"),c=r.a.create({baseURL:"http://zsjustn.top",timeout:8e3});function l(t){if(!t)return 0;var e=s["a"].getters.num,n=(new Date).getTime()-t;return n=parseInt(n/1e3/60,10),console.log(n),Boolean(n>=e)}c.interceptors.request.use((function(t){console.log("config: ",t);var e=s["a"].getters.countdown;return l(e)||s["a"].commit("index/SET_COUNTDOWN"),a=o["Loading"].service({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),s["a"].getters.userInfo&&(t.headers["zsid"]=s["a"].getters.userInfo._id),t}),(function(t){return console.log(t),Promise.reject()})),c.interceptors.response.use((function(t){if(a.close(),200===t.status)return t.data;Promise.reject()}),(function(t){return console.log(t.response),a.close(),t.message.includes("timeout")?Promise.reject("请求超时, 请稍后重试"):Promise.reject(t)}));var u=c,d=function(t){return u({url:"/admin/login",method:"post",data:t})},f="http://zsjustn.top/admin/upload",p=function(t){return u({url:"/admin/addCustomer",method:"post",data:t})},h=function(t){return u({url:"/admin/getLoginLog",method:"get",params:t})},g=function(t){return u({url:"/admin/getOwnerList",method:"get",params:t})},m=function(t){return u({url:"/admin/deleteOwner",method:"post",data:t})},b=function(t){return u({url:"/api/deleteUser",method:"post",data:t})},v=function(t){return u({url:"/api/upDateUser",method:"post",data:t})},_=function(t){return u({url:"/admin/updateOwner",method:"post",data:t})},w=function(t){return u({url:"/admin/getOperationLog",method:"get",params:t})},y=function(t){return u({url:"/api/getUserList",method:"get",params:t})},x=function(t){return u({url:"/admin/getUserListByAdmin",method:"get",params:t})},C=function(t){return u({url:"/admin/getWaitAuditList",method:"get",params:t})},k=function(t){return u({url:"/admin/auditUserByAdmin",method:"post",data:t})},T=function(t){return u({url:"/api/setAdmin",method:"post",data:t})}},4160:function(t,e,n){"use strict";var a=n("23e7"),i=n("17c2");a({target:"Array",proto:!0,forced:[].forEach!=i},{forEach:i})},"42d5":function(t,e,n){},"764e":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"table"},[n("div",{staticClass:"crumbs"},[n("el-breadcrumb",{attrs:{separator:"/"}},[n("el-breadcrumb-item",[n("i",{staticClass:"el-icon-lx-cascades"}),t._v(" 用户审核 ")])],1)],1),n("div",{staticClass:"container"},[n("div",{staticClass:"handle-box"},[n("div",[n("el-input",{staticClass:"handle-input mr10",attrs:{placeholder:"输入查询内容: (姓名/手机号）",clearable:""},model:{value:t.select_word,callback:function(e){t.select_word=e},expression:"select_word"}}),n("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v("搜索")])],1),n("div",[t.multipleSelection.length?n("el-button",{attrs:{type:"primary",icon:"el-icon-check"},on:{click:t.batchPass}},[t._v("通过")]):t._e(),t.multipleSelection.length?n("el-button",{attrs:{type:"danger",icon:"el-icon-delete"},on:{click:t.batchRefuse}},[t._v("拒绝")]):t._e()],1)]),n("el-table",{ref:"multipleTable",staticClass:"table",attrs:{border:"",data:t.tableData,"tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[n("el-table-column",{attrs:{align:"center",type:"selection",width:"55"}}),n("el-table-column",{attrs:{align:"center",prop:"createTime",label:"创建日期",width:"150"}}),n("el-table-column",{attrs:{align:"center",prop:"nickname",label:"姓名"}}),n("el-table-column",{attrs:{align:"center",prop:"mobile",label:"手机号"}}),n("el-table-column",{attrs:{align:"center",prop:"sex",label:"性别"}}),n("el-table-column",{attrs:{align:"center",prop:"isAdmin",label:"是否管理员"}}),n("el-table-column",{attrs:{align:"center",prop:"auditText",label:"审核状态"}}),n("el-table-column",{attrs:{label:"操作",width:"200",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(n){return t.handlePass(e.$index,e.row)}}},[t._v("通过")]),n("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(n){return t.handleRefuse(e.$index,e.row)}}},[t._v("拒绝")])]}}])})],1),n("div",{staticClass:"pagination"},[n("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.totalCount},on:{"current-change":t.handleCurrentChange}})],1)],1),n("el-dialog",{attrs:{title:"提示",visible:t.delVisible,width:"300px",center:""},on:{"update:visible":function(e){t.delVisible=e}}},[n("div",{staticClass:"del-dialog-cnt"},[t._v("是否确定拒绝？")]),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.delVisible=!1}}},[t._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:t.refuseRow}},[t._v("确 定")])],1)]),n("el-dialog",{attrs:{title:"提示",visible:t.passVisible,width:"300px",center:""},on:{"update:visible":function(e){t.passVisible=e}}},[n("div",{staticClass:"del-dialog-cnt"},[t._v("是否确定通过？")]),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.passVisible=!1}}},[t._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:t.confirmRow}},[t._v("确 定")])],1)])],1)},i=[],r=(n("4160"),n("a15b"),n("ac1f"),n("5319"),n("159b"),n("365c")),s={name:"audituser",data:function(){return{tableData:[],cur_page:1,multipleSelection:[],select_word:"",del_list:[],delVisible:!1,passVisible:!1,idx:0,totalCount:0,sexTexts:["未知","女","男"],refuseType:"",passType:""}},created:function(){this.getData()},activated:function(){this.getData()},computed:{userInfo:function(){return this.$store.getters.userInfo||""}},methods:{handleCurrentChange:function(t){this.cur_page=t,this.getData()},getData:function(){var t=this,e={pageNum:this.cur_page,pageSize:10,keyword:this.select_word};Object(r["j"])(e).then((function(e){if(1===e.Code){for(var n=e.Data,a=0;a<n.length;a++)n[a].createTime=t.$utils.parseTime(n[a].createTime),n[a].sex=t.sexTexts[n[a].gender+1],n[a].isAdmin=n[a].status-1?"普通用户":"管理员",n[a].auditText=n[a].registerExamine?"待审核":"已拒绝";t.tableData=n,t.totalCount=e.TotalCount}else t.$message.error(e.Message||"获取数据失败")}))["catch"]((function(e){t.$message.error(e.message||"获取数据失败")}))},search:function(){this.select_word=this.select_word.replace(/\s/g,""),this.getData()},filterTag:function(t,e){return e.tag===t},handlePass:function(t,e){this.idx=t,this.passVisible=!0,this.passType="alone"},handleRefuse:function(t,e){this.idx=t,this.delVisible=!0,this.refuseType="alone"},handleSelectionChange:function(t){console.log(t),this.multipleSelection=t},refuseRow:function(){var t=this.tableData[this.idx]["_id"]||"";"batch"==this.refuseType&&(t=this.getSelectIds()),this.funcAudit(t,0)},funcAudit:function(t,e){var n=this,a={ids:t,status:e};Object(r["b"])(a).then((function(t){n.delVisible=!1,n.passVisible=!1,1===t.Code?(n.$message.success("审核(".concat(0==e?"拒绝":"通过",")成功")),n.getData()):n.$message.error(t.Message||"审核(".concat(0==e?"拒绝":"通过",")失败"))}))["catch"]((function(t){n.delVisible=!1,n.passVisible=!1,n.$message.error(t||"审核(".concat(0==e?"拒绝":"通过",")失败"))}))},getSelectIds:function(){var t=this.multipleSelection,e=[];return t.forEach((function(t){e.push(t["_id"])})),e.join(",")},batchRefuse:function(){this.refuseType="batch",this.delVisible=!0},batchPass:function(){this.passType="batch",this.passVisible=!0},confirmRow:function(){var t=this.tableData[this.idx]["_id"]||"";"batch"==this.passType&&(t=this.getSelectIds()),this.funcAudit(t,2)}}},o=s,c=(n("187a"),n("2877")),l=Object(c["a"])(o,a,i,!1,null,"12edaf10",null);e["default"]=l.exports},a15b:function(t,e,n){"use strict";var a=n("23e7"),i=n("44ad"),r=n("fc6a"),s=n("a640"),o=[].join,c=i!=Object,l=s("join",",");a({target:"Array",proto:!0,forced:c||!l},{join:function(t){return o.call(r(this),void 0===t?",":t)}})}}]);