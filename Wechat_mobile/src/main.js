import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss' // global css
import storage from "./utils/localstorage";
import 'amfe-flexible/index.js';


import { Lazyload, Toast, Icon, Search, Empty, Dialog, Cell, CellGroup, Form, Field, Button, Tabbar, TabbarItem, Swipe, SwipeItem, Tag, Uploader } from 'vant';

Vue.use(Lazyload, {
  lazyComponent: true,
  preLoad: 1.3,
  loading: require('@/assets/image/default-img.png'),
  attempt: 2
});
Vue.use(Toast);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tag);
Vue.use(Uploader);
Vue.use(Dialog);
Vue.use(Search);
Vue.use(Empty);

Vue.prototype.$storage = storage;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
