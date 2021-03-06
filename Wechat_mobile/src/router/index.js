import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Index',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "index" */ '../views/index/index.vue'),
		meta: {
			keepAlive: false,
			title: '微信授权'
		}
	},
	// {
	// 	path: '/entrance',
	// 	name: 'Entrance',
	// 	component: () => import( /* webpackChunkName: "entrance" */ '../views/entrance/index.vue'),
	// 	children: [{
	// 			path: '/home',
	// 			name: 'Entrance/Home',
	// 			component: () => import( /* webpackChunkName: "entrance" */ '../views/entrance/home.vue'),
	// 			meta: {
	// 				keepAlive: true,
	// 				title: '首页'
	// 			}
	// 		},
	// 		{
	// 			path: '/my',
	// 			name: 'Entrance/My',
	// 			component: () => import( /* webpackChunkName: "entrance" */ '../views/entrance/my.vue'),
	// 			meta: {
	// 				keepAlive: true,
	// 				title: '我的'
	// 			}
	// 		}
	// 	],
	// 	meta: {
	// 		keepAlive: false
	// 	}
	// },
	{
		path: '/entrance',
		name: 'Entrance',
		component: () => import( /* webpackChunkName: "entrance" */ '../views/entrance/entrance.vue'),
		meta: {
			keepAlive: false,
			title: '首页'
		}
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import( /* webpackChunkName: "register" */ '../views/register/index.vue'),
		meta: {
			keepAlive: false,
			title: '注册'
		}
	},
	{
		path: '/addCustomer',
		name: 'AddCustomer',
		component: () => import( /* webpackChunkName: "index" */ '../views/addCustomer.vue'),
		meta: {
			keepAlive: false,
			title: '添加顾客'
		}
	},
	{
		path: '/query',
		name: 'Query',
		component: () => import( /* webpackChunkName: "index" */ '../views/query.vue'),
		meta: {
			keepAlive: false,
			title: '业主查询'
		}
	},
	{
		path: '/message',
		name: 'Message',
		component: () => import( /* webpackChunkName: "index" */ '../views/message.vue'),
		meta: {
			keepAlive: false,
			title: '个人信息'
		}
	},
	{
		// 404 page must be placed at the end !!!
		path: '/404',
		name: '404',
		component: () => import( /* webpackChunkName: "404" */ '../views/errPage/404.vue')
	}, {
		path: '*',
		redirect: "404"
	}
]

const router = new VueRouter({
	routes
})

export default router
