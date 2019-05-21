<template>
    <div class="v-header">
        <div class="v-header__search" :class="{ 'v-header__search--active': searchActive }">
            <div class="v-search">
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
            <v-btn class="ma-0" icon>
                <v-icon>menu</v-icon>
            </v-btn>

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

        user: {
            email: 'undefined email',
            name: 'undefined name'
        },
    }),

    created() {
        this.search = this.value;
    },

    mounted() {
        this.token = this.$auth.token();

        this.user = this.$auth.getUser();

        if (!this.user) {
            this.fetchUser();
        }
    },

    methods: {
        fetchUser: async function() {
            try {
                let user = await this.$http.get('/api/user');
                this.$auth.setUser(user.data);    
                this.user = this.$auth.getUser();
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
        }
    }
};
</script>
