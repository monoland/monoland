<template>
    <v-dialog persistent :value="state" :max-width="width">
        <v-card class="mt-4 mx-auto elevation-9">
            <v-sheet class="v-card--sheet mx-auto" color="blue-grey" elevation="7" max-width="calc(100% - 48px)">
                <v-card-text>
                <div class="title font-weight-light mb-2 white--text">{{ title }}</div>
                <div class="caption font-weight-light white--text">{{ describe }}</div>
                </v-card-text>
            </v-sheet>

            <v-card-text class="v-card--offset pt-0 pb-1">
                <v-container class="px-0 pb-0 pt-2" grid-list-md>
                    <v-layout wrap>
                        <slot></slot>
                    </v-layout>
                </v-container>
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
    name: 'v-dialog-form',

    props: {
        title: {
            type: String,
            default: 'Untitled'
        },

        describe: {
            type: String,
            default: 'here is describe for this widget'
        },

        width: {
            type: String,
            default: '600px'
        },

        submitName: {
            type: String,
            default: 'submit'
        },

        cancelName: {
            type: String,
            default: 'cancel'
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
