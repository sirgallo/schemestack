import Vue from 'vue';
import VueRouter from 'vue-router';
import Analyze from '../views/Analyze.vue';
import Dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Analyze',
    component: Analyze,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  /*
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  */
];

const router = new VueRouter({
  routes,
});

export default router;
