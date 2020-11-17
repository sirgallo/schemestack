import Vue from 'vue';
import VueRouter from 'vue-router';
import Analyze from '../views/Analyze.vue';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Analyze',
    component: Analyze,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      // const user = JSON.parse(localStorage.getItem('user'));
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next();
    } else {
      next();
    }
  }
});

export default router;
