import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/users/User';
import Rights from '@/views/roles/Rights';
import Roles from '@/views/roles/Roles';
import Category from '@/views/goods/Category';
import Catelist from '@/views/goods/Catelist';
import Goodsadd from '@/views/goods/Goodsadd';
import Orderslist from '@/views/orders/List';
import Reports from '@/views/reports/Index';
import { Message } from 'element-ui';
Vue.use(Router);

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        { name: 'users', path: '/users', component: Users },
        { name: 'rights', path: '/rights', component: Rights },
        { name: 'roles', path: '/roles', component: Roles },
        { name: 'category', path: '/categories', component: Category },
        { name: 'catelist', path: '/goods', component: Catelist },
        { name: 'goodsadd', path: '/goods/add', component: Goodsadd },
        { name: 'orderslist', path: '/orders', component: Orderslist },
        { name: 'report', path: '/reports', component: Reports }
      ]
    }
  ]
});
// 路由的前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to, from);
  // 判断当前访问的路由是否是login，如果是login直接next
  if (to.name === 'login') {
    next();
  } else {
    // 判断有没有token
    const token = sessionStorage.getItem('token');
    if (!token) {
      // 跳转到登录页面
      router.push({ name: 'login' });
      // 提示
      Message.warning('请先登录');
      return;
    }
    next();
  }
});
export default router;
