import Vue from 'vue'
import Router from 'vue-router'
import Hb from '@/components/Hb'
import HbList from '@/components/HbList'
import HbReg from '@/components/HbReg'
import Protocol from '@/components/Protocol'

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