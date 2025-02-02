import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;

new Vue({
  el: '#app',
  render: h => h(App),
}).$mount('#app')
