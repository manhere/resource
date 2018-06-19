import Vue from 'vue'
import Router from 'vue-router'
import NotFind from '@/components/NotFound'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Main from '@/pages/Main'
import VipsList from '@/pages/vips/VipsList'
import VipsDetail from '@/pages/vips/VipsDetail'
import UserLog from '@/pages/vips/UserLog'
import SquareList from '@/pages/square/SquareList'
import SquareAdd from '@/pages/square/SquareAdd'
import SquareDetail from '@/pages/square/SquareDetail'
import RedBagList from '@/pages/redbag/RedbagList'
import RedBagDetail from '@/pages/redbag/RedbagDetail'
import ChargeList from '@/pages/charge/ChargeList'
import CashList from '@/pages/cash/CashList'

Vue.use(Router)

const routes = [{
        path: '*',
        name: '404',
        component: NotFind
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/main',
        name: 'main',
        component: Home,
        redirect: 'main/info',
        children: [{
                path: 'info',
                meta: {
                    id:-1
                },
                component: Main
            }
        ]
    },
    {
        path: '/vips',
        name: 'vips',
        component: Home,
        redirect: 'vips/list',
        children: [{
                path: 'list',
                meta: {
                    id:0
                },
                component: VipsList
            },
            {
                path: 'detail',
                meta: {
                    id:0
                },
                component: VipsDetail
            },
            {
                path: 'userlog',
                meta: {
                    id:0
                },
                component: UserLog
            }
        ]
    },
    {
        path: '/redbag',
        name: 'redbag',
        component: Home,
        redirect: 'redbag/list',
        children: [{
            path: 'list',
            meta: {
                id:1
            },
            component: RedBagList
        },
        {
            path: 'detail',
            meta: {
                id:1
            },
            component: RedBagDetail
        }
      ]
    },
    {
        path: '/charge',
        name: 'charge',
        component: Home,
        redirect: 'charge/list',
        children: [{
            path: 'list',
            meta:{
                id:2
            },
            component: ChargeList
        }]
    },
    {
        path: '/cash',
        name: 'cash',
        component: Home,
        redirect: 'cash/list',
        children: [{
            path: 'list',
            meta:{
                id:3
            },
            component: CashList
        }]
    },
    {
        path: '/square',
        name: 'square',
        component: Home,
        redirect: 'square/list',
        children: [{
                path: 'list',
                meta: {
                    id:4
                },
                component: SquareList
            },
            {
                path: 'add',
                meta: {
                    id:4
                },
                component: SquareAdd
            },
            {
                path: 'detail',
                meta: {
                    id:4
                },
                component: SquareDetail
            }
        ]
    },
];

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        if(sessionStorage.username){
          next()
        }else{
          next({path: '/login'})
        }
    }
})

export default router
