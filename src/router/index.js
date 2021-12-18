import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Longin.vue'
import Home from '@/components/Home.vue'
// import Welcome from '@/components/Welcome.vue'
// import Users from '@/components/users/Users.vue'
import Rights from '@/components/power/Rights.vue'
import Roles from '@/components/power/Roles.vue'
import Cate from '@/components/goods/Cate.vue'
import Params from '@/components/goods/Params.vue'
import Goods from '@/components/goods/Goods.vue'
import Order from '@/components/order/Order.vue'
import Report from '@/components/report/Report.vue'
// 字典维护家族================================================= 
// 药品分类
import Classify from '@/components/maintain/classify.vue'
// 药品用法
import Usage from '@/components/maintain/usage.vue'
// 药品剂型
import Dosage from '@/components/maintain/dosage.vue'
// 包装单位
import Packing from '@/components/maintain/packing.vue'
// 入库类型
import Storage from '@/components/maintain/storage.vue'
// 出库类型
import Delivery from '@/components/maintain/delivery.vue'
// 统计模块家族===================================================
// 入库统计
import Ruku from '@/components/tongji/ruku.vue'
// 出库统计
import Chuku from '@/components/tongji/chuku.vue'
// 进销存统计
import Purchase from '@/components/tongji/purchase.vue'
// 药品销售排行
import Ranking from '@/components/tongji/ranking.vue'
// 药品销售明细
import Detail from '@/components/tongji/detail.vue'
// 药品管理 drug
import Drug from '@/components/drug/Drug.vue'
// 诊所管理 clinic
import Clinic from '@/components/clinic/Clinic.vue'
// 机构管理
import Jigou from '@/components/jigou/Jigou.vue'
// 个人设置
import Setting from '@/components/setting/Setting.vue'
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
        children: [{
                path: '/Welcome',
                component: () =>
                    import ('@/components/Welcome.vue')
            },
            {
                path: '/users',
                component: () =>
                    import ('@/components/users/Users.vue')
            },
            {
                path: '/rights',
                component: () =>
                    import ('@/components/power/Rights.vue')
            },
            {
                path: '/roles',
                component: () =>
                    import ('@/components/power/Roles.vue')
            },
            {
                path: '/categories',
                component: () =>
                    import ('@/components/goods/Cate.vue')
            },
            {
                path: '/params',
                component: () =>
                    import ('@/components/goods/Params.vue')
            },
            {
                path: '/goods',
                component: () =>
                    import ('@/components/goods/Goods.vue')
            },
            {
                path: '/orders',
                component: () =>
                    import ('@/components/order/Order.vue')
            },
            {
                path: '/reports',
                component: () =>
                    import ('@/components/report/Report.vue')
            },
            {
                path: '/classify',
                component: () =>
                    import ('@/components/maintain/classify.vue')
            },
            {
                path: '/usage',
                component: () =>
                    import ('@/components/maintain/usage.vue')
            },
            {
                path: '/dosage',
                component: () =>
                    import ('@/components/maintain/dosage.vue')
            },
            {
                path: '/packing',
                component: () =>
                    import ('@/components/maintain/packing.vue')
            },
            {
                path: '/storage',
                component: () =>
                    import ('@/components/maintain/storage.vue')
            },
            {
                path: '/delivery',
                component: () =>
                    import ('@/components/maintain/delivery.vue')
            },
            {
                path: '/ruku',
                component: () =>
                    import ('@/components/tongji/ruku.vue')
            },
            {
                path: '/chuku',
                component: () =>
                    import ('@/components/tongji/chuku.vue')
            },
            {
                path: '/purchase',
                component: () =>
                    import ('@/components/tongji/purchase.vue')
            },
            {
                path: '/ranking',
                component: () =>
                    import ('@/components/tongji/ranking.vue')
            },
            {
                path: '/detail',
                component: () =>
                    import ('@/components/tongji/detail.vue')
            },
            {
                path: '/drug',
                component: () =>
                    import ('@/components/drug/Drug.vue')
            },
            {
                path: '/clinic',
                component: () =>
                    import ('@/components/clinic/Clinic.vue')
            },
            {
                path: '/jigou',
                component: () =>
                    import ('@/components/jigou/Jigou.vue')
            },
            {
                path: '/setting',
                component: () =>
                    import ('@/components/setting/Setting.vue')
            }
        ]
    }
]

const router = new VueRouter({
        routes
    })
    // 路由前置守卫
router.beforeEach((to, from, next) => {
    if (to.path !== '/login') {
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