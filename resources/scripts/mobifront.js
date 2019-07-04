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

import Mobiland from './mobile/Mobiland.vue';
import router from './routes/mobile/frontend';

new Vue({
    router,
    data:() => ({
        theme: null,
        user: {
            email: undefined,
            name: undefined
        },
        snackbar: {
            state: false,
            color: null,
            text: null
        }
    }),
    render: h => h(Mobiland)
}).$mount('#monoland');