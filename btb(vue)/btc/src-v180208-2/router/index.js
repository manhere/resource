import Vue from 'vue'
import Router from 'vue-router'
import Hb from '@/components/Hb'
import HbList from '@/components/HbList'
import HbReg from '@/components/HbReg'
import Protocol from '@/components/Protocol'
import HbInfo from '@/components/HbInfo'
import HbReceive from '@/components/HbReceive'

Vue.use(Router)

const routes = [{
        path: '/',
        name: 'hb',
        meta: {
            title: '领红包'
        },
        component: Hb
    },
    {
        path: '/list',
        name: 'list',
        meta: {
            title: '红包详情'
        },
        component: HbList
    },
    {
        path: '/reg',
        name: 'reg',
        meta: {
            title: '注册'
        },
        component: HbReg
    },
    {
        path: '/prot',
        name: 'prot',
        meta: {
            title: '用户协议'
        },
        component: Protocol
    },
    {
        path: '/info',
        name: 'info',
        meta: {
            title: '比特宝红包'
        },
        component: HbInfo
    },
    {
        path: '/gives',
        name: 'gives',
        meta: {
            title: '比特宝红包'
        },
        component: HbReceive
    }
];
const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router;