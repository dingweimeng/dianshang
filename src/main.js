import Vue from 'vue'
import App from './App.vue'
import router from './router'
// ui 组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入axios
import axios from 'axios';

// 配置请求路径的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

Vue.prototype.$http = axios



// 导入全局样式 
import '@/assets/css/global.css'
Vue.config.productionTip = false

new Vue({
    router,
    render: function(h) { return h(App) }
}).$mount('#app')