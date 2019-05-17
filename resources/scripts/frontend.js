import Vue from 'vue';
import Vuetify from 'vuetify';
import { AuthProvider } from './mixins/AuthProvider';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(AuthProvider);

import Monoland from './pages/Monoland.vue';
import router from './routes/frontend';

new Vue({
    router,
    render: h => h(Monoland)
}).$mount('#monoland');