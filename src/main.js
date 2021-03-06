// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/login.css';
import MyAxios from '@/plugins/myaxios';
import moment from 'moment';
import MyBreadcrumb from '@/components/MyBreadcrumb';
Vue.component(MyBreadcrumb.name, MyBreadcrumb);
Vue.config.productionTip = false;
Vue.use(MyAxios);
Vue.use(ElementUI);
Vue.filter('format', (value, formatstr) => {
  return moment(value).format(formatstr);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
