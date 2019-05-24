<template>
    <v-app v-cloak>
        <v-navigation-drawer width="400" right app>
            <router-view :key="$route.path"></router-view>
        </v-navigation-drawer>

        <v-content>
            <v-container fill-height>
                <v-layout align-center justify-center>
                    <div class="message-box">
                        <div class="message-logo">
                            <div class="message-logo__wrap">
                                <img :src="logo" alt="logo">
                            </div>
                        </div>

                        <div class="message-text">
                            <div class="brand-text white--text title">Welcome to</div>
                            <div class="brand-name font-weight-thin display-3 white--text">{{ company }}</div>
                            <div class="brand-copy white--text text-xs-right">{{ slogan }}</div>
                        </div>
                    </div>
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
                this.logo = '/images/small/' + data.meta.avatar;
                this.company = data.meta.name;
                this.slogan = data.meta.slogan;
            } catch (error) {
                this.$error = error;
            }
        },
    }
};
</script>
