<template>
    <v-card class="v-card--withtool" height="100%" flat color="transparent">
        <v-toolbar fixed flat>
            <v-toolbar-title>Beranda</v-toolbar-title>
        </v-toolbar>

        <v-card-text class="pa-0">
            <!--  -->
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'page-dashboard',

    data:() => ({
        // 
    }),
    
    created() {
        this.fetchInfo();
    },

    methods: {
        fetchInfo: async function() {
            // let { data } = await this.$http.get('/api/dashboard');
        },
    }
}
</script>
