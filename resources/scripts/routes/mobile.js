import Vue from 'vue';
import VueRouter from 'vue-router';
import { Auth } from '@scripts/mixins/MobiProvider';

Vue.use(VueRouter);

import * as mobile from '@scripts/pages/mobile';

let router = new VueRouter({
    routes: [
        { path: '/', name: 'login', component: mobile.Login },

        { path: 'backend', component: mobile.Base, meta: { auth: true }, children: [
            { path: '', redirect: { name: 'dashboard' }},
            { path: 'account', name: 'account', component: mobile.Account },
            { path: 'dashboard', name: 'dashboard', component: mobile.Dashboard },
        ]},

        { path: '*', redirect: { name: 'login' }},
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        if (!Auth.check) {
            next({ name: 'login' });
        } else {
            next();
        }
    } else {
        if (to.name === 'login' && Auth.check) {
            next({ name: 'dashboard' });
        } else {
            next();
        }
    }
});

export default router;