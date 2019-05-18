<template>
    <div class="v-page__wrap">
        <v-header title="Pengguna">
            <v-btn-simple :disabled="false" tips="tambah" icon="add"></v-btn-simple>
            <v-btn-simple :disabled="true" tips="link" icon="folder"></v-btn-simple>
            <v-btn-simple :disabled="true" tips="edit" icon="edit"></v-btn-simple>
            <v-btn-simple :disabled="true" tips="hapus" icon="delete"></v-btn-simple>
            <v-btn-simple :disabled="false" tips="refresh" icon="refresh"></v-btn-simple>
            <v-btn-simple :disabled="false" tips="pencarian" icon="search"></v-btn-simple>
        </v-header>
        
        <div class="v-page--body">
            <div class="v-page--body__content">
                <v-card class="mt-4 mx-auto">
                    <v-sheet class="v-card--sheet mx-auto" color="blue-grey" elevation="9" max-width="calc(100% - 32px)">
                        <v-card-text>
                        <div class="title font-weight-light mb-2 white--text">User Registrations</div>
                        <div class="caption font-weight-light white--text">Last Campaign Performance</div>
                        </v-card-text>
                    </v-sheet>

                    <v-card-text class="v-card--offset py-0">
                        <v-data-table v-model="selected"
                            :headers="headers"
                            :items="records"
                            :pagination.sync="tablePaging"
                            :total-items="table.totalRecords"
                            :rows-per-page-items="table.page"
                            select-all
                        >
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
                                    <td>{{ props.item.district }}</td>
                                    <td>{{ props.item.summary }}</td>
                                </tr>
                            </template>
                            <!-- end fill -->

                            <template slot="no-data">
                                <div class="v-datatable__message">
                                    <v-icon>sms_failed</v-icon>
                                    <div class="v-datatable__text">{{ table.emptyMessage }}</div>
                                </div>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
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
            { text: 'Kecamatan', value: 'district' },
            { text: 'Jumlah', value: 'summary', class: 'date-updated' }
        ]
    })
};
</script>
