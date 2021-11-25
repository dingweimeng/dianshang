import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Longin.vue'
import Home from '@/components/Home.vue'
import Welocome from '@/components/Welcome.vue'
import Users from '@/components/users/Users.vue'
import Rights from '@/components/power/Rights.vue'
import Roles from '@/components/power/Roles.vue'
Vue.use(VueRouter)

const routes = [
    // 重定向
    { path: '/', redirect: '/login' },
    // 路由规则
    { path: '/login', component: Login },
    {
        path: '/home',
        component: Home,
        redirect: '/Welcome',
        children: [
            { path: '/Welcome', component: Welocome },
            { path: '/users', component: Users },
            { path: '/rights', component: Rights },
            { path: '/roles', component: Roles }
        ]
    }
]

const router = new VueRouter({
        routes
    })
    // 路由前置守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/home') {
        const token = sessionStorage.getItem('token')
        if (!token) {
            next('/login')

        } else {
            next()
        }

    } else {
        next()
    }
    // 如果去的登录页面 直接放行
    // if (to.path === '/login') return next()
})

export default router