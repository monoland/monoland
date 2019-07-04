<template>
    <div class="v-page__wrap">
        <v-header 
            :title="page.title" 
            :search-state="form.onFind" 
            v-model="searchText"
            @close="closeFinder"
        >
            <!-- <v-btn icon class="ma-0" slot="navigate" @click="backToSegment"><v-icon>arrow_back</v-icon></v-btn> -->

            <v-btn-simple :disabled="disabled.add" tips="tambah" icon="add" @click="openNewForm"></v-btn-simple>
            <v-btn-simple :disabled="disabled.edit" tips="edit" icon="edit" @click="openUpdate"></v-btn-simple>
            <v-btn-simple :disabled="disabled.delete" tips="hapus" icon="delete" @click="openDelete"></v-btn-simple>
            <v-btn-simple :disabled="disabled.refresh" tips="refresh" icon="refresh" @click="refresh"></v-btn-simple>
            <v-btn-simple :disabled="disabled.find" tips="pencarian" icon="search" @click="openFind"></v-btn-simple>
        </v-header>
        
        <div class="v-page--body">
            <div class="v-page--body__content">
                <!-- table -->
                <v-widget :title="'Tabel ' + page.title" :describe="'daftar seluruh ' + page.title.toLowerCase() + ' yang tersedia'">
                    <v-data-table v-model="selected"
                        :headers="headers"
                        :items="records"
                        :pagination.sync="tablePaging"
                        :total-items="table.totalItems"
                        :rows-per-page-items="table.page"
                        :loading="table.loader"
                        select-all
                    >
                        <!-- table progress -->
                        <v-progress-linear slot="progress" color="teal" height="1" indeterminate></v-progress-linear>
                        
                        <!-- table fill -->
                        <template slot="items" slot-scope="props">
                            <tr :active="props.selected" @click="props.selected = !props.selected">
                                <td>
                                    <v-checkbox
                                        :input-value="props.selected"
                                        primary hide-details
                                    ></v-checkbox>
                                </td>
                                <td>{{ props.item.name }}</td>
                                <td>{{ props.item.email }}</td>
                                <td>{{ props.item.authent_name }}</td>
                                <td>{{ props.item.updated_at }}</td>
                            </tr>
                        </template>
                        
                        <!-- table empty -->
                        <template slot="no-data">
                            <div class="v-datatable__message">
                                <v-icon>sms_failed</v-icon>
                                <div class="v-datatable__text">{{ table.emptyMessage }}</div>
                            </div>
                        </template>
                    </v-data-table>
                </v-widget>

                <!-- form -->
                <v-dialog-form 
                    :icon="page.icon"
                    :title="page.title" 
                    :describe="'Form tambah/ubah ' + page.title.toLowerCase()" 
                    v-model="form.onShow" 
                    @cancel="closeForm"
                    @submit="submitForm"
                >
                    <v-flex xs12>
                        <v-text-field
                            label="Nama Pengguna"
                            :color="$root.theme"
                            v-model="record.name"
                        ></v-text-field>

                        <v-text-field
                            label="Email Pengguna"
                            :color="$root.theme"
                            v-model="record.email"
                        ></v-text-field>

                        <v-select
                            :items="authorizations"
                            label="Otentikasi"
                            :color="$root.theme"
                            v-model="record.authent_id"
                        ></v-select>
                    </v-flex>
                </v-dialog-form>

                <!-- delete -->
                <v-dialog-delete 
                    @cancel="closeDelete" 
                    @delete="postDelete"
                    :records="selected"
                    v-model="form.onDelete"
                ></v-dialog-delete>
            </div>
        </div>
    </div>
</template>

<script>
import { FormProvider } from '@scripts/mixins/FormProvider';

export default {
    name: 'page-user',

    mixins: [FormProvider],

    data:() => ({
        headers: [
            { text: 'Name', value: 'name' },
            { text: 'Email', value: 'email' },
            { text: 'Otentikasi', value: 'authorization' },
            { text: 'Updated', value: 'updated_at', class: 'date-updated' }
        ],

        page: {
            icon: 'people',
            title: 'Pengguna',
        },

        authorizations: [],

        dataUrl: '/api/users'
    }),

    created() {
        this.fetchCombo('/api/authent/combo', (result) => {
            this.authorizations = result;
        });
    },

    methods: {
        newRecord: function() {
            this.record = {
                id: null,
                name: null,
                email: null,
                authent_id: null
            };
        }
    }
};
</script>