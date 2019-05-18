import Vue from 'vue';
import Vuetify from 'vuetify';
import { AuthProvider } from './mixins/AuthProvider';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(AuthProvider);

import * as Parts from './parts';
Object.keys(Parts).forEach((part) => {
    Vue.component(Parts[part].name, Parts[part]);
});

import Monoland from './pages/Monoland.vue';
import router from './routes/backend';

new Vue({
    router,
    render: h => h(Monoland)
}).$mount('#monoland');