<template>
    <div class="v-page__wrap">
        <v-header title="Katasandi"></v-header>

        <div class="v-page--body">
            <div class="v-page--body__content">
                <v-card class="v-card__profile mx-auto" width="450px">
                    <v-sheet class="v-card__profile--image mx-auto" elevation="7" max-width="130px">
                        pict
                    </v-sheet>

                    <v-card-text class="v-card__profile--offset pt-0 pb-1">
                        <v-container class="px-0 pb-0 pt-2" grid-list-md>
                            <v-layout wrap>
                                <v-flex md12>
                                    <v-text-field
                                        label="Katasandi Lama"
                                        color="blue-grey"
                                    ></v-text-field>

                                    <v-text-field
                                        label="Katasandi Baru"
                                        color="blue-grey"
                                    ></v-text-field>

                                    <v-text-field
                                        label="Konfirmasi Sandi"
                                        color="blue-grey"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-grey" flat>update</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'page-password'
};
</script>
