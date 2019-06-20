<template>
    <v-dialog persistent :value="state" :max-width="width">
        <v-card class="mt-4 mx-auto elevation-9">
            <v-sheet class="v-card--sheet mx-auto" :color="theme" elevation="7" max-width="calc(100% - 48px)">
                <div class="v-sheet__wrap">
                    <div class="v-sheet__icon">
                        <v-icon :color="theme">lock</v-icon>
                    </div>
                    <div class="v-sheet__text">
                        <div class="title font-weight-light mb-2 white--text">Kunci/Buka data ini?</div>
                        <div class="caption font-weight-light white--text">Konfirmasi penguncian data.</div>
                    </div>
                </div>
            </v-sheet>

            <v-card-text class="v-card--offset pb-2">
                Mengunci data ini akan menghilangkan semua fungsi edit pada form. Anda dapat membatalkan ini dengan membuka kunci.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="theme" flat @click="onSubmit">{{ submitName }}</v-btn>
                <v-btn :color="theme" flat @click="onCancel">{{ cancelName }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'v-dialog-locked',

    props: {
        submitName: {
            type: String,
            default: 'lock'
        },

        cancelName: {
            type: String,
            default: 'cancel'
        },

        width: {
            type: String,
            default: '360px'
        },

        records: {
            type: Array,
            default:() => ([])
        },

        value: Boolean
    },

    data:() => ({
        state: false,
        theme: null
    }),

    created() {
        this.state = this.value;
        this.theme = this.$root.theme;
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
        },

        '$root.theme': function(newval) {
            this.theme = newval;
        }
    }
};
</script>