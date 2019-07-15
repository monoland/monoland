<template>
    <v-card class="v-card--withtool" height="100%" flat color="transparent">
        <v-toolbar fixed flat>
            <v-toolbar-title>Akun Saya</v-toolbar-title>
        </v-toolbar>

        <v-card-text class="pa-0">
            <v-container fluid grid-list-xs>
                <v-layout wrap>
                    <v-flex xs12>
                        <div class="subheading">{{ user.email }}</div>
                    </v-flex>
                    <v-flex xs12>
                        <div class="caption">{{ user.name }}</div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>

        <v-card-text class="pa-0">
            <v-container fluid grid-list-xs>
                <v-layout align-center justify-center>
                    <v-btn color="cyan" dark @click="signout">signout</v-btn>
                </v-layout>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'page-account',

    data:() => ({
        user: null
    }),

    created() {
        this.user = this.$auth.user;
    },

    methods: {
        signout: function() {
            this.$auth.signout();
            this.$router.push({ path: '/' });
        }
    }
}
</script>