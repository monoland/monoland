<template>
    <div class="v-page__wrap">
        <v-header title="Pengguna">
            <v-btn-simple :disabled="false" tips="tambah" icon="add" @click="form.onShow = true"></v-btn-simple>
            <v-btn-simple :disabled="true" tips="link" icon="folder"></v-btn-simple>
            <v-btn-simple :disabled="true" tips="edit" icon="edit"></v-btn-simple>
            <v-btn-simple :disabled="true" tips="hapus" icon="delete"></v-btn-simple>
            <v-btn-simple :disabled="false" tips="refresh" icon="refresh"></v-btn-simple>
            <v-btn-simple :disabled="false" tips="pencarian" icon="search"></v-btn-simple>
        </v-header>
        
        <div class="v-page--body">
            <div class="v-page--body__content">
                <v-widget title="Tabel Pengguna" describe="Daftar seluruh pengguna pada aplikasi">
                    <v-data-table v-model="selected"
                        :headers="headers"
                        :items="records"
                        :pagination.sync="tablePaging"
                        :total-items="table.totalRecords"
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
                                <td>{{ props.item.id }}</td>
                                <td>{{ props.item.name }}</td>
                                <td>{{ props.item.email }}</td>
                                <td>{{ props.item.authorization }}</td>
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

                <v-dialog-form title="Pengguna" describe="Form input/edit pengguna" v-model="form.onShow" @cancel="form.onShow = false">
                    <v-flex xs12>
                        <v-text-field
                            label="Nama Pengguna"
                            color="blue-grey"
                        ></v-text-field>

                        <v-text-field
                            label="Email Pengguna"
                            color="blue-grey"
                        ></v-text-field>

                        <v-select
                            :items="authorization"
                            label="Otentikasi"
                            color="blue-grey"
                        ></v-select>
                    </v-flex>
                </v-dialog-form>
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
            { text: 'Id', value: 'id' },
            { text: 'Name', value: 'name' },
            { text: 'Email', value: 'email' },
            { text: 'Otentikasi', value: 'authorization', class: 'date-updated' }
        ],

        authorization: [
            { text: 'Pemohon', value: 'submission' },
            { text: 'Penilai', value: 'evaluator' },
            { text: 'Penetap', value: 'approval' },
        ],

        dataUrl: '/api/users'
    })
};
</script>
