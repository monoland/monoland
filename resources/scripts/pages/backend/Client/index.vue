<template>
    <div class="v-page__wrap">
        <v-header 
            :title="page.title" 
            :search-state="form.onFind" 
            v-model="searchText"
            @close="closeFinder"
        >
            <v-btn-simple :disabled="disabled.add" tips="tambah" icon="add" @click="openNewForm"></v-btn-simple>
            <!-- <v-btn-simple :disabled="disabled.link" tips="link" icon="folder"></v-btn-simple> -->
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
                                <td>{{ props.item.redirect }}</td>
                                <td v-html="props.item.lockicon"></td>
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
                            label="Nama Klien"
                            color="blue-grey"
                            v-model="record.name"
                        ></v-text-field>

                        <v-textarea v-if="form.onEdit"
                            label="Rahasia"
                            color="blue-grey"
                            v-model="record.secret"
                        ></v-textarea>

                        <v-select
                            :items="statuses"
                            label="Status"
                            color="blue-grey"
                            v-model="record.revoked"
                        ></v-select>

                        <v-text-field
                            label="Redirect"
                            color="blue-grey"
                            v-model="record.redirect"
                        ></v-text-field>
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
    name: 'page-client',

    mixins: [FormProvider],

    data:() => ({
        headers: [
            { text: 'Nama', value: 'name' },
            { text: 'Redirect', value: 'redirect' },
            { text: 'Revoke', value: 'revoked', sortable: false, align: 'center', class: 'icontag' },
            { text: 'Updated', value: 'updated_at', class: 'date-updated' }
        ],

        page: {
            icon: 'whatshot',
            title: 'OAuth Apps',
        },

        statuses: [
            { value: false, text: 'active' },
            { value: true, text: 'revoked' }
        ],

        dataUrl: '/api/client'
    }),

    methods: {
        newRecord: function() {
            this.record = {
                id: null,
                name: null,
                secret: null,
                revoked: null,
                redirect: null
            };
        }
    }
};
</script>