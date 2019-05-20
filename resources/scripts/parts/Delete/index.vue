<template>
    <v-dialog persistent :value="state" :max-width="width">
        <v-card class="mt-4 mx-auto elevation-9">
            <v-sheet class="v-card--sheet mx-auto" color="deep-orange" elevation="7" max-width="calc(100% - 48px)">
                <div class="v-sheet__wrap">
                    <div class="v-sheet__icon">
                        <v-icon color="deep-orange">delete</v-icon>
                    </div>
                    <div class="v-sheet__text">
                        <div class="title font-weight-light mb-2 white--text">Hapus ({{ records.length }}) data?</div>
                        <div class="caption font-weight-light white--text">Konfirmasi penghapusan data.</div>
                    </div>
                </div>
            </v-sheet>

            <v-card-text class="v-card--offset pb-2">
                Menghapus data ini juga akan menghapus semua data yang terhubung dengan ini. Anda tidak dapat membatalkan ini.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-grey" flat @click="onSubmit">{{ submitName }}</v-btn>
                <v-btn color="blue-grey" flat @click="onCancel">{{ cancelName }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'v-dialog-delete',

    props: {
        submitName: {
            type: String,
            default: 'delete'
        },

        cancelName: {
            type: String,
            default: 'cancel'
        },

        width: {
            type: String,
            default: '330px'
        },

        records: {
            type: Array,
            default:() => ([])
        },

        value: Boolean
    },

    data:() => ({
        state: false
    }),

    created() {
        this.state = this.value;
    },

    methods: {
        onSubmit: function() {
            this.$emit(this.submitName);
        },

        onCancel: function() {
            this.$emit(this.cancelName);
        }
    },
    
    watch: {
        value: function(newval) {
            this.state = newval;
        }
    }
};
</script>
