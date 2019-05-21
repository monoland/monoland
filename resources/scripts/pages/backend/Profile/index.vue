<template>
    <div class="v-page__wrap">
        <v-header title="Profile"></v-header>

        <div class="v-page--body">
            <div class="v-page--body__content">
                <v-widget
                    title="Profil Pengguna" 
                    describe="Informasi pengguna aktif"
                    width="650px"
                >
                    <v-container class="px-0 pb-0 pt-2" grid-list-md>
                        <v-layout wrap>
                            <v-flex md12>
                                <v-text-field
                                    label="Nama Pengguna"
                                    color="blue-grey"
                                ></v-text-field>

                                <v-text-field
                                    label="Alamat Email"
                                    color="blue-grey"
                                ></v-text-field>

                                <v-text-field
                                    label="Warna Thema"
                                    color="blue-grey"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>

                    <template slot="actions">
                        <v-btn color="blue-grey" flat>update</v-btn>
                    </template>
                </v-widget>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'page-profile'
};
</script>
