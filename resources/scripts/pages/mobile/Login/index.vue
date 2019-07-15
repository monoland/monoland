<template>
    <v-app v-cloak>
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12>
                        <!-- <v-form method="POST" action="/account/login"> -->
                        <v-card class="v-card__login mt-4 mx-auto">
                            <v-sheet class="v-card--sheet mx-auto" :color="theme" elevation="7" width="calc(100% - 32px)">
                                <div class="v-sheet__wrap">
                                    <div class="v-sheet__icon">
                                        <v-icon :color="theme" large>security</v-icon>
                                    </div>
                                    <div class="v-sheet__text">
                                        <div class="title font-weight-regular mb-2 white--text">Authentication</div>
                                        <div class="caption font-weight-regular white--text">user authentication form</div>
                                    </div>
                                </div>
                            </v-sheet>

                            <v-card-text class="v-card--offset pt-0 pb-1">
                                <v-text-field
                                    label="Pengguna"
                                    name="email"
                                    color="cyan"
                                    v-model="email"
                                    autocomplete="off"
                                    prepend-icon="mail_outline"
                                ></v-text-field>
                                
                                <v-text-field 
                                    label="Katasandi"
                                    name="password"
                                    color="cyan"
                                    v-model="password"
                                    :append-icon="hidden ? 'visibility_off' : 'visibility'"
                                    :type="hidden ? 'password' : 'text'"
                                    @click:append="hidden = !hidden"
                                    autocomplete="off"
                                    prepend-icon="lock_open"
                                ></v-text-field>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                                <v-btn color="cyan" flat @click="signin">masuk</v-btn>
                            </v-card-actions>
                        </v-card>
                        <!-- </v-form> -->
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>

        <v-footer class="transparent justify-center">
            <span class="caption text-uppercase grey--text">citraalam &copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: 'page-login',

    data:() => ({
        email: null,
        password: null,
        hidden: true,
        errors: {
            email: false,
            password: false,
        },
        hints: {
            email: null,
            password: null
        },
        theme: 'cyan'
    }),

    methods: {
        signin: async function() {
            try {
                let token = await this.$http.post('/oauth/token', {
                    grant_type: 'password',
                    client_id: this.$auth.siteKey,
                    client_secret: this.$auth.secretKey,
                    username: this.email,
                    password: this.password,
                    scope: '*'
                });
                
                this.$auth.token = token.data;

                let user = await this.$http.get('/api/user');
                
                this.$auth.user = user.data.data;

                this.$router.push({ name: 'dashboard' });
            } catch (error) {
                this.$error = error;
            }
        }
    }
}
</script>