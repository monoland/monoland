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

                                    <v-select
                                        label="Warna Thema"
                                        :color="$root.theme"
                                        :items="colors"
                                        v-model="record.theme"
                                    ></v-select>
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
        },

        colors: [
            { value: 'red', text: 'Red'},
            { value: 'pink', text: 'Pink'},
            { value: 'purple', text: 'Purple'},
            { value: 'deep-purple', text: 'Deep Purple'},
            { value: 'indigo', text: 'Indigo'},
            { value: 'blue', text: 'Blue'},
            { value: 'light-blue', text: 'Light Blue'},
            { value: 'cyan', text: 'Cyan'},
            { value: 'teal', text: 'Teal'},
            { value: 'green', text: 'Green'},
            { value: 'light-green', text: 'Light Green'},
            { value: 'lime', text: 'Lemon'},
            { value: 'yellow', text: 'Yellow'},
            { value: 'amber', text: 'Amber'},
            { value: 'orange', text: 'Orange'},
            { value: 'deep-orange', text: 'Deep Orange'},
            { value: 'brown', text: 'Brown'},
            { value: 'blue-grey', text: 'Blue Grey'},
            { value: 'grey', text: 'Grey'},
        ]
    }),

    created() {
        this.record = this.$auth.getUser();
    },

    methods: {
        postUpdate: async function() {
            try {
                let {data: {data}} = await this.$http.put(
                    '/api/profile', this.record
                );
                
                this.$auth.setTheme(this.record.theme);
                this.$auth.putUser(this.record);
                this.$root.theme = this.record.theme;
                this.$message = 'update profile berhasil!';
            } catch (error) {
                this.$error = error;
            }
        },
    }
};
</script>
