<template>
    <div class="v-page__wrap">
        <v-header title="Katasandi"></v-header>

        <div class="v-page--body">
            <div class="v-page--body__content">
                <v-card class="v-card__profile mx-auto" width="450px">
                    <v-sheet class="v-card__profile--image mx-auto" elevation="7" max-width="130px">
                        <v-photo basic
                            v-model="record.avatar"
                        ></v-photo>
                    </v-sheet>

                    <v-card-text class="v-card__profile--offset pt-0 pb-1">
                        <v-container class="px-0 pb-0 pt-2" grid-list-md>
                            <v-layout wrap>
                                <v-flex md12>
                                    <v-text-field 
                                        label="Katasandi Lama"
                                        :color="$root.theme"
                                        v-model="user.old_password"
                                        :append-icon="hidden1 ? 'visibility_off' : 'visibility'"
                                        :type="hidden1 ? 'password' : 'text'"
                                        @click:append="hidden1 = !hidden1"
                                    ></v-text-field>

                                    <v-text-field 
                                        label="Katasandi Baru"
                                        :color="$root.theme"
                                        v-model="user.password"
                                        :append-icon="hidden2 ? 'visibility_off' : 'visibility'"
                                        :type="hidden2 ? 'password' : 'text'"
                                        @click:append="hidden2 = !hidden2"
                                    ></v-text-field>

                                    <v-text-field 
                                        label="Konfirmasi Sandi"
                                        :color="$root.theme"
                                        v-model="user.password_confirmation"
                                        :append-icon="hidden3 ? 'visibility_off' : 'visibility'"
                                        :type="hidden3 ? 'password' : 'text'"
                                        @click:append="hidden3 = !hidden3"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :color="$root.theme" flat @click="postUpdate">update</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'page-password',

    data:() => ({
        record: {
            avatar: null
        },

        user: {
            old_password: null,
            password: null,
            password_confirmation: null
        },

        hidden1: true,
        hidden2: true,
        hidden3: true
    }),

    created() {
        this.record = this.$root.user;
    },

    methods: {
        postUpdate: async function() {
            try {
                let {data: {data}} = await this.$http.put(
                    '/api/password', this.user
                );

                this.$message = 'update password berhasil!';
            } catch (error) {
                this.$error = error;
            }
        },
    },

    watch: {
        '$root.user': function(newval) {
            this.record = newval;
        }
    }
};
</script>