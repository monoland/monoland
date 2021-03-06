<template>
    <div class="v-header">
        <div class="v-header__search" :class="{ 'v-header__search--active': searchActive }">
            <div class="v-search" :class="theme + ' lighten-5'">
                <input ref="input" :value="search" 
                    @input="bouncing" 
                    @focus="onFocus = true"
                    @blur="onFocus = false"
                    class="v-search__text" 
                    type="text" 
                    placeholder="Search Data"
                    :class="{ 'v-search__text--focus': onFocus }"
                >
                <v-btn class="v-btn--simple ml-3" :ripple="false" @click.native="closeSearch">
                    <v-icon color="grey darken-1">close</v-icon>
                </v-btn>
            </div>
        </div>

        <div class="v-header__content">
            <slot name="navigate">
                <v-btn class="ma-0" icon @click="$root.navdraw = !$root.navdraw">
                    <v-icon>menu</v-icon>
                </v-btn>
            </slot>

            <div class="v-header__title title font-weight-light ml-3">{{ title }}</div>

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
                    
                        <v-divider class="mt-2"></v-divider>

                        <v-list-tile :to="{ name: 'profile' }">
                            <v-list-tile-action><v-icon>perm_contact_calendar</v-icon></v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Profile</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile :to="{ name: 'password' }">
                            <v-list-tile-action><v-icon>lock</v-icon></v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Katasandi</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile :to="{ name: 'application' }">
                            <v-list-tile-action><v-icon>settings</v-icon></v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Setting</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-divider></v-divider>

                        <v-list-tile @click="signout">
                            <v-list-tile-action><v-icon>exit_to_app</v-icon></v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Keluar</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>

                    <form id="signout" action="/account/logout" method="POST" style="display: none;">
                        <input type="hidden" name="_token" v-model="token">
                    </form>
                </v-card>
            </v-menu>
        </div>
    </div>
</template>

<script>
import { debounce } from "debounce";

export default {
    name: 'v-header',

    props: {
        title: {
            type: String,
            default: 'Untitled'
        },

        searchState: {
            type: Boolean,
            default: false
        },

        value: {
            type: String,
            default: null
        }
    },

    data:() => ({
        search: null,
        searchActive: false,
        onFocus: false,
        token: null,
        theme: null,

        user: {
            email: undefined,
            name: undefined
        },
    }),

    created() {
        this.search = this.value;

        let utest = this.$auth.user;

        if (!utest || typeof utest.name === 'undefined' || typeof utest.email === 'undefined') {
            this.fetchUser();
        } else {
            this.user = utest;

            if (!this.$root.theme) {
                this.$root.theme = this.$auth.theme;
            } else {
                this.theme = this.$root.theme;
            }
        }
    },

    mounted() {
        this.token = this.$auth.serverMode ? this.$auth.csrf : this.$auth.token;
    },

    methods: {
        fetchUser: async function() {
            try {
                let user = await this.$http.get('/api/user');
                
                this.$auth.user = user.data.data;
                this.user = this.$auth.user;
                this.$root.user = this.$auth.user;
                this.$root.theme = this.$auth.theme;
            } catch (error) {
                this.$error = error;   
            }
        },

        signout: function() {
            this.$auth.signout();
        },

        bouncing: debounce(function(e) {
            this.search = e.target.value;
            this.$emit('input', this.search);
        }, 500),

        focus: function() {
            this.$refs.input.focus();
        },

        closeSearch: function() {
            this.search = null;
            this.searchActive = false;
            this.$emit('close');
        }
    },

    watch: {
        value: function(newval) {
            this.search = newval;
        },

        searchState: function(newval) {
            this.searchActive = newval;

            this.$nextTick(() => {
                this.$refs.input.focus();
            });
        },

        '$root.user': function(newval) {
            this.user = newval;
        },

        '$root.theme': function(newval){
            this.theme = newval;
        }
    }
};
</script>