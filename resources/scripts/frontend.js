import Vue from 'vue';
import Vuetify from 'vuetify';
import { AuthProvider } from './mixins/AuthProvider';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(AuthProvider);

import Apps from './pages/Apps.vue';
import router from './routes/frontend';

new Vue({
    router,
    data:() => ({
        navdraw: true
    }),
    render: h => h(Apps)
}).$mount('#monoland');