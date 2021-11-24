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
    //  通过axios请求拦截器添加 token 保证拥有数据权限
axios.interceptors.request.use(config => {
    // console.log(config);
    // 通过 token赋值给 请求头 通过 config.headers
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})


// 把axios 赋值到 Vue身上 能this.$http 出来
Vue.prototype.$http = axios



// 导入全局样式 
import '@/assets/css/global.css'
Vue.config.productionTip = false

new Vue({
    router,
    render: function(h) { return h(App) }
}).$mount('#app')