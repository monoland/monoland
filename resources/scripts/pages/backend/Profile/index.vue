<template>
    <div class="v-page__wrap">
        <v-header title="Profile"></v-header>

        <div class="v-page--body">
            <div class="v-page--body__content">
                <v-card class="v-card__profile mx-auto" width="450px">
                    <v-sheet class="v-card__profile--image mx-auto" elevation="7" max-width="130px">
                        <v-photo
                            v-model="record.avatar"
                        ></v-photo>
                    </v-sheet>

                    <v-card-text class="v-card__profile--offset pt-0 pb-1">
                        <v-container class="px-0 pb-0 pt-2" grid-list-md>
                            <v-layout wrap>
                                <v-flex md12>
                                    <v-text-field
                                        label="Nama Pengguna"
                                        :color="$root.theme"
                                        v-model="record.name"
                                    ></v-text-field>

                                    <v-text-field
                                        label="Alamat Email"
                                        :color="$root.theme"
                                        v-model="record.email"
                                    ></v-text-field>

                                    <v-text-field
                                        label="Warna Thema"
                                        :color="$root.theme"
                                        v-model="record.theme"
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
    name: 'page-profile',

    data:() => ({
        record: {
            avatar: null,
            name: null,
            email: null,
            theme: null
        }
    }),

    created() {
        this.record = this.$root.user;
    },

    methods: {
        postUpdate: async function() {
            try {
                let {data: {data}} = await this.$http.put(
                    '/api/profile', this.record
                );

                this.$message = 'update profile berhasil!';
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
