import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import * as backend from '@scripts/desktop/backend';
import * as apps from '@scripts/desktop/apps';

export default new VueRouter({
    routes: [
        { path: '/', component: backend.Base, children: [
            // backend
            { path: '', redirect: { name: 'dashboard' }},
            { path: 'application', name: 'application', component: backend.Application },
            { path: 'client', name: 'client', component: backend.Client },
            { path: 'password', name: 'password', component: backend.Password },
            { path: 'profile', name: 'profile', component: backend.Profile },
            { path: 'user', name: 'user', component: backend.User },

            // application
            { path: 'dashboard', name: 'dashboard', component: apps.Dashboard },

            // fallback
            { path: '*', redirect: { name: 'dashboard' }},
        ]}
    ]
});