import Vue from 'vue';
import Vuetify from 'vuetify';
import { AuthProvider } from './mixins/AuthProvider';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(AuthProvider);

import Deskland from './desktop/Deskland.vue';
import router from './routes/desktop/frontend';

new Vue({
    router,
    render: h => h(Deskland)
}).$mount('#monoland');