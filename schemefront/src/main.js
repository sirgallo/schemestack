import Vue from 'vue';
import SmartTable from 'vuejs-smart-table';
import {
  BootstrapVue,
  IconsPlugin,
  ModalPlugin,
  DropdownPlugin,
  TablePlugin,
} from 'bootstrap-vue';
import Multiselect from 'vue-multiselect';
// import Chart from 'chart.js';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.component('multiselect', Multiselect);
// Vue.component(Chart);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ModalPlugin);
Vue.use(DropdownPlugin);
Vue.use(TablePlugin);
Vue.use(SmartTable);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
