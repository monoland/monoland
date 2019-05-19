<template>
    <div class="v-header">
        <div class="v-header__content">
            <v-btn class="ma-0" icon>
                <v-icon>menu</v-icon>
            </v-btn>

            <div class="v-header__title title font-weight-light ml-2">{{ title }}</div>

            <v-spacer></v-spacer>
            
            <slot></slot>
            
            <v-menu bottom left 
                :close-on-content-click="false"
            >
                <template v-slot:activator="{ on }">
                    <v-btn class="ml-3 mr-0" v-on="on" :ripple="false" icon>
                        <v-icon color="grey darken-1">person</v-icon>
                    </v-btn>
                </template>

                <v-card class="v-card__account">
                    <v-list>
                        <v-list-tile avatar>
                            <v-list-tile-avatar>
                                <v-icon large>account_circle</v-icon>
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title>{{ user.name }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat @click="signout">signout</v-btn>

                        <form id="signout" action="/account/logout" method="POST" style="display: none;">
                            <input type="hidden" name="_token" v-model="token">
                        </form>
                    </v-card-actions>
                </v-card>
            </v-menu>
        </div>
    </div>
</template>


<script>
export default {
    name: 'v-header',

    props: {
        title: {
            type: String,
            default: 'Untitled'
        }
    },

    data:() => ({
        token: null,

        user: {
            email: 'undefined email',
            name: 'undefined name'
        },
    }),

    mounted() {
        this.token = this.$auth.token();


        this.user = this.$auth.getUser();

        if (!this.user) {
            this.fetchUser();
        }
    },

    methods: {
        fetchUser: async function() {
            let user = await this.$http.get('/api/user');
            this.user = user.data;
            this.$auth.setUser(user.data);
        },

        signout: function() {
            this.$auth.signout();
        }
    }
};
</script>