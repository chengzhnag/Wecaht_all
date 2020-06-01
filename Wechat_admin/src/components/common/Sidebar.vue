<template>
	<div class="sidebar">
		<el-menu
			class="sidebar-el-menu"
			:default-active="onRoutes"
			@select="onSelect"
			:collapse="collapse"
			background-color="#324157"
			text-color="#bfcbd9"
			active-text-color="#20a0ff"
			unique-opened
			router
		>
			<template v-for="item in items">
				<template v-if="item.subs">
					<el-submenu :index="item.index" :key="item.index">
						<template slot="title">
							<i :class="item.icon"></i>
							<span slot="title">{{ item.title }}</span>
						</template>
						<template v-for="subItem in item.subs">
							<el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
								<template slot="title">
									{{ subItem.title }}
								</template>
								<el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{ threeItem.title }}</el-menu-item>
							</el-submenu>
							<el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
						</template>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index" :key="item.index">
						<i :class="item.icon"></i>
						<span slot="title">{{ item.title }}</span>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>
<script>
import bus from '@/components/common/bus';
export default {
	data() {
		return {
			collapse: false,
			items: [
				{
					icon: 'el-icon-lx-home',
					index: 'dashboard',
					title: '系统首页'
				},
				{
					icon: 'el-icon-document-add',
					index: 'addmessage',
					title: '添加信息'
				},
				{
					icon: 'el-icon-s-order',
					index: 'loginlog',
					title: '登陆日志'
				},
				{
					icon: 'el-icon-tickets',
					index: 'operationlog',
					title: '操作日志'
				},
				{
					icon: 'el-icon-edit-outline',
					index: 'imagechange',
					title: '图片修改'
				},
				{
					icon: 'el-icon-search',
					index: 'dataquery',
					title: '数据查询'
				},
				{
					icon: 'el-icon-s-platform',
					index: 'addadmin',
					title: '增加管理员'
				}
			]
		};
	},
	computed: {
		onRoutes() {
			return this.$route.path.replace('/', '');
		},
		userInfo() {
			return this.$store.getters.userInfo;
		}
	},
	created() {
		// 通过 Event Bus 进行组件间通信，来折叠侧边栏
		bus.$on('collapse', msg => {
			this.collapse = msg;
		});
		if (this.userInfo && this.userInfo['status'] == 2) {
			this.items = this.items.filter(item => {
				return item.index != 'addadmin';
			});
		}
	},
	methods: {
		onSelect(index, path) {
			console.log(index);
			if (this.$route.path.indexOf(index) == -1) {
				this.$store.commit('index/SET_EDITORDATA', null);
			}
		}
	}
};
</script>
<style scoped>
.sidebar {
	display: block;
	position: absolute;
	left: 0;
	top: 70px;
	bottom: 0;
	overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
	width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
	width: 250px;
}

.sidebar > ul {
	height: 100%;
}
</style>
