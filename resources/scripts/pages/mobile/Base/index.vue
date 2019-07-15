<template>
    <v-app v-cloak>
        <v-content>
            <div class="v-mobile">
                <div class="v-mobile__wrap">
                    <transition name="animatecss" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                        <router-view :key="$route.path"></router-view>
                    </transition>
                </div>
            </div>

            <v-bottom-nav
                :active.sync="navigate"
                :value="true"
                absolute
                color="transparent"
            >
                <v-btn color="cyan" flat value="dashboard">
                    <span>Beranda</span>
                    <v-icon>home</v-icon>
                </v-btn>

                <v-btn color="cyan" flat value="">
                    <span>Pelanggan</span>
                    <v-icon>layers</v-icon>
                </v-btn>

                <v-btn color="cyan" flat value="">
                    <span>Reservasi</span>
                    <v-icon>event_seat</v-icon>
                </v-btn>

                <v-btn color="cyan" flat value="account">
                    <span>Akun</span>
                    <v-icon>perm_identity</v-icon>
                </v-btn>
            </v-bottom-nav>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'page-base',

    data:() => ({
        navigate: 'dashboard'
    }),

    watch: {
        navigate: function(newval) {
            this.$router.push({ name: newval });
        }
    }
}
</script>

