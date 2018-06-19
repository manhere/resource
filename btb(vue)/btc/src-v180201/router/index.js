import Vue from 'vue'
import Router from 'vue-router'
import Hb from '@/components/Hb'
import HbList from '@/components/HbList'
import HbReg from '@/components/HbReg'
import Protocol from '@/components/Protocol'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'hb',
            component: Hb
        },
        {
            path: '/list',
            name: 'hblist',
            component: HbList
        },
        {
            path: '/reg',
            name: 'hbreg',
            component: HbReg
        },
        {
            path: '/prot',
            name: 'protocol',
            component: Protocol
        }
    ]
})