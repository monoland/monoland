<template>
    <div class="v-page__wrap">
        <v-header title="Aplikasi"></v-header>

        <div class="v-page--body">
            <div class="v-page--body__content">
                <v-card class="v-card__profile mx-auto" width="450px">
                    <v-sheet class="v-card__profile--image mx-auto" elevation="7" max-width="130px">
                        <v-photo
                            placeholder="/images/logos-holder.png"
                            v-model="record.meta.avatar"
                        ></v-photo>
                    </v-sheet>

                    <v-card-text class="v-card__profile--offset pt-0 pb-1">
                        <v-container class="px-0 pb-0 pt-2" grid-list-md>
                            <v-layout wrap>
                                <v-flex md12>
                                    <v-text-field
                                        label="Nama Perusahaan"
                                        :color="$root.theme"
                                        v-model="record.meta.name"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex md12>
                                    <v-textarea
                                        label="Slogan"
                                        :color="$root.theme"
                                        v-model="record.meta.slogan"
                                    ></v-textarea>
                                </v-flex>

                                <v-flex md6>
                                    <v-text-field
                                        label="Tinggi Logo"
                                        :color="$root.theme"
                                        v-model="record.meta.height"
                                    ></v-text-field>
                                </v-flex>

                                <v-flex md6>
                                    <v-text-field
                                        label="Lebar Logo"
                                        :color="$root.theme"
                                        v-model="record.meta.width"
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
    name: 'page-company',

    data:() => ({
        record: {
            id: 'company',
            meta: {
                avatar: null
            }
        }
    }),

    created() {
        this.fetch('/api/setting/company');
    },

    methods: {
        fetch: async function(url, params) {
            try {
                let { data: {data}} = await this.$http.get(url);
                this.record = data;
            } catch (error) {
                this.$error = error;
            }
        },

        postUpdate: async function() {
            try {
                let {data: {data}} = await this.$http.put(
                    '/api/setting/company', this.record
                );

                this.record = data;
                this.$message = 'proses update berhasil!';
            } catch (error) {
                this.$error = error;
            }
        },
    }
};
</script>