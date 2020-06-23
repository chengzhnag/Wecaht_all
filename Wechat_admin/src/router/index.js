import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['@/components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children: [{
                    path: '/dashboard',
                    component: resolve => require(['@/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                /*自定义*/
                {
                    path: '/addmessage',
                    component: resolve => require(['@/page/addMessage.vue'], resolve),
                    meta: { title: '添加信息' }
                },
                {
                    path: '/loginlog',
                    component: resolve => require(['@/page/loginLog.vue'], resolve),
                    meta: { title: '登陆日志' }
                },
                {
                    path: '/operationlog',
                    component: resolve => require(['@/page/operationLog.vue'], resolve),
                    meta: { title: '操作日志' }
                },
                {
                    path: '/imagechange',
                    component: resolve => require(['@/page/imageChange.vue'], resolve),
                    meta: { title: '图片修改' }
                },
				{
				    path: '/alluserlist',
				    component: resolve => require(['@/page/allUserList.vue'], resolve),
				    meta: { title: '全部用户', permission: true }
				},
				{
				    path: '/audituser',
				    component: resolve => require(['@/page/auditUser.vue'], resolve),
				    meta: { title: '用户审核', permission: true }
				},
                {
                    path: '/dataquery',
                    component: resolve => require(['@/page/dataQuery.vue'], resolve),
                    meta: { title: '数据查询' }
                },
                /*结束*/
                {
                    path: '/form',
                    component: resolve => require(['@/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['@/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['@/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['@/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['@/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['@/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
                },
				{
				    // 增加管理员
				    path: '/addadmin',
				    component: resolve => require(['@/page/addAdmin.vue'], resolve),
				    meta: { title: '增加管理员', permission: true }
				},
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['@/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['@/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['@/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['@/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})