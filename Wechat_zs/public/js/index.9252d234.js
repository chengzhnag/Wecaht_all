(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["index"],{"0b4d":function(e,a,t){"use strict";t.r(a);var s,r,l=t("2877"),n={},i=Object(l["a"])(n,s,r,!1,null,null,null);a["default"]=i.exports},1068:function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"query-box"},[t("van-search",{attrs:{"show-action":"",placeholder:"请输入业主手机号搜索"},on:{search:e.onSearch},scopedSlots:e._u([{key:"action",fn:function(){return[t("div",{on:{click:e.onSearch}},[e._v("搜索")])]},proxy:!0}]),model:{value:e.value,callback:function(a){e.value=a},expression:"value"}}),e.isNotData?e._e():t("div",{staticClass:"content"},[t("van-cell-group",{attrs:{title:"基础数据"}},[t("van-field",{attrs:{disabled:"",center:"",size:"large",name:"业主姓名",label:"业主姓名",placeholder:"请输入业主姓名"},model:{value:e.params.customerName,callback:function(a){e.$set(e.params,"customerName",a)},expression:"params.customerName"}}),t("van-field",{attrs:{disabled:"",center:"",size:"large",name:"业主电话",label:"业主电话",placeholder:"请输入业主电话"},model:{value:e.params.customerMobil,callback:function(a){e.$set(e.params,"customerMobil",a)},expression:"params.customerMobil"}}),t("van-field",{attrs:{disabled:"",center:"",size:"large",name:"业主地址",label:"业主地址",placeholder:"请输入业主地址"},model:{value:e.params.customerAdress,callback:function(a){e.$set(e.params,"customerAdress",a)},expression:"params.customerAdress"}}),t("div",{staticClass:"gap"}),t("van-field",{attrs:{disabled:"",center:"",size:"large",name:"水工姓名",label:"水工姓名",placeholder:"请输入水工姓名"},model:{value:e.params.hydraulicName,callback:function(a){e.$set(e.params,"hydraulicName",a)},expression:"params.hydraulicName"}}),t("van-field",{attrs:{disabled:"",center:"",size:"large",name:"水工电话",label:"水工电话",placeholder:"请输入水工电话"},model:{value:e.params.hydraulicMobil,callback:function(a){e.$set(e.params,"hydraulicMobil",a)},expression:"params.hydraulicMobil"}}),t("van-field",{attrs:{disabled:"",center:"",size:"large",name:"质保卡号",label:"质保卡号",placeholder:"请输入质保卡号"},model:{value:e.params.qualityAssuranceNum,callback:function(a){e.$set(e.params,"qualityAssuranceNum",a)},expression:"params.qualityAssuranceNum"}}),t("van-field",{attrs:{disabled:"",center:"",size:"large",name:"水工积分",label:"水工积分",placeholder:"请输入水工积分"},model:{value:e.params.hydraulicIntegral,callback:function(a){e.$set(e.params,"hydraulicIntegral",a)},expression:"params.hydraulicIntegral"}}),t("div",{staticClass:"gap"}),e.params.dealers?t("van-field",{attrs:{center:"",disabled:"",size:"large",name:"经销商",label:"经销商",placeholder:"请输入经销商"},model:{value:e.params.dealers,callback:function(a){e.$set(e.params,"dealers",a)},expression:"params.dealers"}}):e._e(),t("van-field",{attrs:{center:"",disabled:"",size:"large",name:"上传时间",label:"上传时间"},model:{value:e.params.createTime,callback:function(a){e.$set(e.params,"createTime",a)},expression:"params.createTime"}}),t("van-field",{attrs:{center:"",disabled:"",size:"large",name:"操作账号",label:"操作账号"},model:{value:e.params.operatingAccount,callback:function(a){e.$set(e.params,"operatingAccount",a)},expression:"params.operatingAccount"}})],1),t("van-cell-group",{attrs:{title:"图片数据"}},[t("van-field",{attrs:{name:"uploader","input-align":"left"},scopedSlots:e._u([{key:"input",fn:function(){return[t("van-uploader",{attrs:{deletable:!1,"show-upload":!1,disabled:""},model:{value:e.fileList,callback:function(a){e.fileList=a},expression:"fileList"}})]},proxy:!0}],null,!1,1756659345)})],1)],1),e.isNotData?t("van-empty",{attrs:{description:"暂无数据"}}):e._e()],1)},r=[],l=(t("4160"),t("159b"),t("365c")),n=t("61f7"),i=(t("99af"),t("a630"),t("c975"),t("a15b"),t("baa5"),t("d81d"),t("fb6a"),t("45fc"),t("a9e3"),t("b64b"),t("d3b7"),t("4d63"),t("ac1f"),t("25f0"),t("6062"),t("3ca3"),t("466d"),t("4d90"),t("5319"),t("1276"),t("ddb0"),t("2909"),t("53ca"));function c(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"{y}-{m}-{d}";if(0===arguments.length)return null;var t,s=a||"{y}-{m}-{d} {h}:{i}:{s}";"object"===Object(i["a"])(e)?t=e:("string"===typeof e&&/^[0-9]+$/.test(e)&&(e=parseInt(e)),"number"===typeof e&&10===e.toString().length&&(e*=1e3),t=new Date(e));var r={y:t.getFullYear(),m:t.getMonth()+1,d:t.getDate(),h:t.getHours(),i:t.getMinutes(),s:t.getSeconds(),a:t.getDay()},l=s.replace(/{([ymdhisa])+}/g,(function(e,a){var t=r[a];return"a"===a?["日","一","二","三","四","五","六"][t]:t.toString().padStart(2,"0")}));return l}(function(){document.addEventListener})(),function(){document.removeEventListener}();var o={data:function(){return{}},filters:{},computed:{},methods:{onBack:function(){this.$router.back()},filterImg:function(e){var a=/(http|https)/.test(e),t="/";return!a&&e&&(/data:image\/([^;]+).*/.test(e)||(e=0==e.indexOf("public")?t+e.replace("public",""):t+e)),e}}},u={mixins:[o],data:function(){return{value:"",params:{customerName:"",customerMobil:"",customerAdress:"",hydraulicName:"",hydraulicMobil:"",qualityAssuranceNum:"",hydraulicIntegral:"",createrId:"",createTime:"",dealers:"",operatingAccount:"",uploadPhotos:[]},isNotData:!0}},computed:{userInfo:function(){return this.$store.getters.userInfo},fileList:function(){var e=this,a=[];return this.params.uploadPhotos.forEach((function(t){a.push({url:e.filterImg(t.path)})})),a}},mounted:function(){},methods:{onSearch:function(){var e=this;Object(n["b"])(this.value)?Object(l["c"])({mobile:this.value}).then((function(a){a.Code?(a.Data.createTime=c(a.Data.createTime,"{y}-{m}-{d} {h}:{i}"),e.params=a.Data,e.$toast("查询成功"),e.isNotData=!1):(e.isNotData=!0,e.$toast(a.Message||"查询失败"))})).catch((function(a){e.isNotData=!0,e.$toast(a.message||"查询失败")})):this.$toast("输入的手机号格式错误")}}},d=u,m=(t("f079"),t("2877")),p=Object(m["a"])(d,s,r,!1,null,"0eb62ab5",null);a["default"]=p.exports},"2c45":function(e,a,t){"use strict";var s=t("4343"),r=t.n(s);r.a},3331:function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"add-box"},[t("van-form",{attrs:{"show-error-message":!1},on:{submit:e.onSubmit,failed:e.onFailed}},[t("div",{staticClass:"content"},[t("van-cell-group",{attrs:{title:"信息录入"}},[t("van-field",{attrs:{clearable:"",center:"",size:"large",required:"",name:"业主姓名",label:"业主姓名",placeholder:"请输入业主姓名",rules:[{required:!0,message:"请填写业主姓名"}]},model:{value:e.params.customerName,callback:function(a){e.$set(e.params,"customerName",a)},expression:"params.customerName"}}),t("van-field",{attrs:{clearable:"",center:"",size:"large",required:"",name:"业主电话",label:"业主电话",placeholder:"请输入业主电话",rules:e.phoneRules},model:{value:e.params.customerMobil,callback:function(a){e.$set(e.params,"customerMobil",a)},expression:"params.customerMobil"}}),t("van-field",{attrs:{clearable:"",center:"",size:"large",required:"",name:"业主地址",label:"业主地址",placeholder:"请输入业主地址",rules:[{required:!0,message:"请填写业主地址"}]},model:{value:e.params.customerAdress,callback:function(a){e.$set(e.params,"customerAdress",a)},expression:"params.customerAdress"}}),t("div",{staticClass:"gap"}),t("van-field",{attrs:{clearable:"",center:"",size:"large",required:"",name:"水工姓名",label:"水工姓名",placeholder:"请输入水工姓名",rules:[{required:!0,message:"请填写水工姓名"}]},model:{value:e.params.hydraulicName,callback:function(a){e.$set(e.params,"hydraulicName",a)},expression:"params.hydraulicName"}}),t("van-field",{attrs:{clearable:"",center:"",size:"large",required:"",name:"水工电话",label:"水工电话",placeholder:"请输入水工电话",rules:e.phoneRules},model:{value:e.params.hydraulicMobil,callback:function(a){e.$set(e.params,"hydraulicMobil",a)},expression:"params.hydraulicMobil"}}),t("van-field",{attrs:{clearable:"",center:"",size:"large",required:"",name:"质保卡号",label:"质保卡号",placeholder:"请输入质保卡号",rules:[{required:!0,message:"请填写质保卡号"}]},model:{value:e.params.qualityAssuranceNum,callback:function(a){e.$set(e.params,"qualityAssuranceNum",a)},expression:"params.qualityAssuranceNum"}}),t("van-field",{attrs:{clearable:"",center:"",size:"large",required:"",name:"水工积分",label:"水工积分",placeholder:"请输入水工积分",rules:[{required:!0,message:"请填写水工积分"}]},model:{value:e.params.hydraulicIntegral,callback:function(a){e.$set(e.params,"hydraulicIntegral",a)},expression:"params.hydraulicIntegral"}}),t("div",{staticClass:"gap"}),t("van-field",{attrs:{center:"",clearable:"",size:"large",name:"经销商",label:"经销商",placeholder:"请输入经销商"},model:{value:e.params.dealers,callback:function(a){e.$set(e.params,"dealers",a)},expression:"params.dealers"}}),t("van-field",{attrs:{center:"",disabled:"",size:"large",name:"上传时间",label:"上传时间"},model:{value:e.params.createTime,callback:function(a){e.$set(e.params,"createTime",a)},expression:"params.createTime"}}),t("van-field",{attrs:{center:"",disabled:"",size:"large",name:"操作账号",label:"操作账号"},model:{value:e.params.operatingAccount,callback:function(a){e.$set(e.params,"operatingAccount",a)},expression:"params.operatingAccount"}})],1),t("van-cell-group",{attrs:{title:"上传图片"}},[t("van-field",{attrs:{name:"uploader","input-align":"left",rules:[{required:!0,message:"请上传图片"}]},scopedSlots:e._u([{key:"input",fn:function(){return[t("van-uploader",{attrs:{name:"myfile","after-read":e.afterRead,multiple:""},on:{delete:e.deleteImg},model:{value:e.fileList,callback:function(a){e.fileList=a},expression:"fileList"}})]},proxy:!0}])})],1)],1),t("div",{staticClass:"btn-box"},[t("van-button",{attrs:{block:"",type:"info","native-type":"submit"}},[e._v("提交")])],1)])],1)},r=[],l=(t("99af"),t("4160"),t("a434"),t("159b"),t("5a0c")),n=t.n(l),i=t("365c"),c=t("61f7"),o={data:function(){return this.phoneRules=[{required:!0,message:"请输入手机号"},{validator:c["b"],message:"手机号格式错误！"}],{params:{customerName:"",customerMobil:"",customerAdress:"",hydraulicName:"",hydraulicMobil:"",qualityAssuranceNum:"",hydraulicIntegral:"",createrId:"",createTime:"",dealers:"",operatingAccount:"",uploadPhotos:[]},fileList:[]}},computed:{userInfo:function(){return this.$store.getters.userInfo}},mounted:function(){this.init()},methods:{init:function(){this.params.createTime=n()().format("YYYY-MM-DD HH:mm"),this.params.createrId=this.userInfo._id,this.params.operatingAccount=this.userInfo.nickname||"**"},onFailed:function(e){console.log("failed",e);var a="";e.errors.forEach((function(e){a+=e.message+"\n"})),this.$toast(a)},onSubmit:function(e){var a=this;console.log("submit",e),Object(i["a"])(this.params).then((function(e){e.Code?a.$dialog.alert({title:"提示",message:"添加业主".concat(a.params.customerName,"成功")}).then((function(){a.$router.back()})):a.$toast.fail(e.Message||"添加业主失败")})).catch((function(e){a.$toast(e.message||"添加业主失败")}))},afterRead:function(e){console.log(e);var a=new FormData;e.length?e.forEach((function(e){a.append("myfile",e.file)})):a.append("myfile",e.file),this.funcUpload(a,e.length)},funcUpload:function(e,a){var t=this;Object(i["b"])(e).then((function(e){e.Code?(t.params.uploadPhotos=t.params.uploadPhotos.concat(e.Data),console.log(t.params.uploadPhotos)):(t.fileList.splice(t.fileList.length-a),t.$toast.fail(e.Message||"上传失败"))})).catch((function(e){console.log(e),t.fileList.splice(t.fileList.length-a),t.$toast(e.message||"上传失败")}))},deleteImg:function(e,a){var t=a.index;this.params.uploadPhotos.splice(t,1)}}},u=o,d=(t("2c45"),t("2877")),m=Object(d["a"])(u,s,r,!1,null,"368fe84e",null);a["default"]=m.exports},"37f9":function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"box"},[e._v(e._s(e.showText))])},r=[],l=(t("ca00"),{data:function(){return{showText:"正在获取微信授权..."}},mounted:function(){console.log("production"),this.funcGetToken()},methods:{funcGetToken:function(){var e=this;this.$store.dispatch("index/getUserInfoByToken").then((function(a){console.log(a);var t=a.registerExamine;switch(t){case 0:e.showText="注册申请已被拒绝, 请联系管理员";break;case 1:e.showText="注册申请正在审核中, 请耐心等待";break;case 2:e.$router.push({name:"Entrance"});break;default:e.showText="注册申请正在审核中, 请耐心等待";break}})).catch((function(a){console.log(a),e.$router.push({path:"/register"})}))}}}),n=l,i=(t("c3f6"),t("2877")),c=Object(i["a"])(n,s,r,!1,null,"735c91fe",null);a["default"]=c.exports},4343:function(e,a,t){},"4e55":function(e,a,t){},"61f7":function(e,a,t){"use strict";t.d(a,"a",(function(){return l})),t.d(a,"b",(function(){return n}));t("d3b7"),t("ac1f"),t("25f0"),t("5319"),t("1276");var s=t("8d81"),r=t.n(s);function l(e){return e="zs-"+e,r()(r()(e))}function n(e){var a=/^((1)[1-9]{1}[0-9]{1}\d{8})$/;return""!=e&&!!a.test(e)}},c3f6:function(e,a,t){"use strict";var s=t("d065"),r=t.n(s);r.a},d065:function(e,a,t){},f079:function(e,a,t){"use strict";var s=t("4e55"),r=t.n(s);r.a}}]);