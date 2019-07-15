<template>
    <v-app class="backend" v-cloak>
        <v-navigation-drawer width="240" fixed app v-model="$root.navdraw">
            <v-list class="v-list--navdraw">
                <template v-for="(menu, index) in menus">
                    <v-list-tile :active-class="theme + ' white--text'" :to="menu.to" v-if="menu.type === 'item'">
                        <v-list-tile-action><v-icon>{{ menu.icon }}</v-icon></v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ menu.text }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-divider :class="menu.class" v-else-if="menu.type === 'divider'"></v-divider>

                    <v-subheader 
                        class="text-uppercase" 
                        :class="menu.class" 
                        v-else-if="menu.type === 'subheader'"
                    >{{ menu.text }}</v-subheader>
                    
                    <v-list-group :prepend-icon="menu.icon" v-else>
                        <v-list-tile slot="activator">
                            <v-list-tile-title>{{ menu.text }}</v-list-tile-title>    
                        </v-list-tile>

                        <template v-for="(item, index) in menu.items">
                            <v-list-tile :to="item.to">
                                <v-list-tile-action>
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-tile-action>
                                
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-list-group>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-content :class="theme + ' lighten-5'">
            <div class="v-page">
                <transition name="animatecss" :enter-active-class="transEnter" :leave-active-class="transLeave">
                    <router-view :key="$route.path"></router-view>
                </transition>

                <div class="v-page--foot">
                    <div class="v-page--foot__line"></div>
                    <div class="v-page--foot__content">
                        <v-spacer></v-spacer>
                        <div class="copyright font-weight-thin">&copy <strong>Monoland 2019</strong>, made with passion</div>
                    </div>
                </div>
            </div>
        </v-content>

        <v-snackbar
            v-model="$root.snackbar.state"
            :color="$root.snackbar.color"

        >
            {{ $root.snackbar.text }}
            <v-btn dark flat @click="$root.snackbar.state = false">Tutup</v-btn>
        </v-snackbar>
    </v-app>
</template>

<script>
export default {
    name: 'page-base',

    data:() => ({
        menus: {},
        theme: null,
        transEnter: 'animated fadeIn',
        transLeave: 'animated fadeOut'
    }),

    beforeRouteUpdate(to, from, next) {
        const toDepth = to.path.split('/').length;
        const fmDepth = from.path.split('/').length;

        if (toDepth > fmDepth) {
            this.transEnter = 'animated slideInLeft';
            this.transLeave = 'animated fadeOut';
        }

        if (toDepth < fmDepth) {
            this.transEnter = 'animated slideInLeft';
            this.transLeave = 'animated fadeOutLeft';
        }

        if (toDepth === fmDepth) {
            this.transEnter = 'animated fadeIn';
            this.transLeave = 'animated fadeOut';
        }

        next();
    },

    created() {
        this.theme = this.$root.theme;
    },

    mounted() {
        this.token = this.$auth.serverMode ? this.$auth.csrf : this.$auth.token;

        this.menus = this.$auth.menus;

        if (!this.menus) this.fetchMenus();
    },

    methods: {
        fetchMenus: async function() {
            try {
                let menus = await this.$http.get('/api/menus');
                this.menus = menus.data;
                this.$auth.menus = menus.data;
            } catch (error) {
                this.$error = error;
            }
        }
    },

    watch: {
        '$root.theme': function(newval) {
            this.theme = newval;
        }
    }
};
</script>