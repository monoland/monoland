import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import * as backend from '@scripts/pages/backend';

export default new VueRouter({
    routes: [
        { path: '/', component: backend.Base, children: [
            { path: '', redirect: { name: 'dashboard' }},
            { path: 'application', name: 'application', component: backend.Application },
            { path: 'dashboard', name: 'dashboard', component: backend.Dashboard },
            { path: 'password', name: 'password', component: backend.Password },
            { path: 'profile', name: 'profile', component: backend.Profile },
            { path: 'user', name: 'user', component: backend.User },
            { path: '*', redirect: { name: 'dashboard' }},
        ]}
    ]
});