<template>
    <v-app v-cloak>
        <v-content>
            <v-container fill-height>
                <v-layout align-center justify-center wrap>
                    <v-flex xs12>
                        <div class="message-box mb-3">
                            <div class="message-logo" :style="'height: '+ height +'; width: ' + width + ';'">
                                <div class="message-logo__wrap">
                                    <img :src="logo" alt="logo">
                                </div>
                            </div>

                            <div class="message-text">
                                <div class="brand-name font-weight-thin mt-2 display-2">{{ company }}</div>
                            </div>
                        </div>

                        <router-view :key="$route.path"></router-view>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>

        <v-snackbar
            v-model="snackbar"
            color="error"

        >
            {{ message }}
            <v-btn dark flat @click="snackbar = false">Tutup</v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
export default {
    name: 'page-base',

    data:() => ({
        snackbar: false,
        message: null,
        logo: null,
        height: 0,
        width: 0,
        company: null,
        slogan: null
    }),

    created() {
        this.fetch('/api/company');
    },

    mounted() {
        if (window.errors) {
            if (window.errors.hasOwnProperty('email')) {
                this.message = window.errors.email[0];
            } else {
                this.message = window.errors.password[0];
            }

            this.snackbar = true;
        }   
    },

    methods: {
        fetch: async function(url, params) {
            try {
                let { data: {data}} = await this.$http.get(url);
                if (data.meta.avatar) {
                    this.logo = '/images/original/' + data.meta.avatar;
                } else {
                    this.logo = '/images/logos-holder.png';
                }
                this.company = data.meta.name;
                this.slogan = data.meta.slogan;
                this.height = data.meta.height;
                this.width = data.meta.width;
            } catch (error) {
                this.$error = error;
            }
        },
    }
};
</script>