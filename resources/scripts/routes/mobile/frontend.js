import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import * as frontend from '@scripts/mobile/frontend';

export default new VueRouter({
    routes: [
        { path: '/', component: frontend.Base, children: [
            { path: '', redirect: { name: 'login' }},
            { path: 'signin', name: 'login', component: frontend.Login },
            { path: '*', redirect: { name: 'login' }},
        ]}
    ]
});