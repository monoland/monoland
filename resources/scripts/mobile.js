import Vue from 'vue';
import Vuetify from 'vuetify';
import { MobiProvider } from './mixins/MobiProvider';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(MobiProvider);

import Apps from './pages/Apps.vue';
import router from './routes/mobile';

new Vue({
    router,
    data:() => ({
        navdrawer: true
    }),
    render: h => h(Apps)
}).$mount('#monoland');