<template>
    <v-dialog fullscreen hide-overlay :value="state" transition="dialog-bottom-transition">
        <v-card flat :class="theme + ' lighten-5'">
            <v-toolbar :color="theme + ' lighten-4'" extended flat>
                <v-btn icon @click="onCancel">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-layout row pb-2>
                <v-flex :xs8="!small" :offset-xs2="!small" :xs6="small" :offset-xs3="small">
                    <v-card class="mx-auto">
                        <v-sheet class="v-card--sheet mx-auto" :color="theme" elevation="7" width="calc(100% - 48px)">
                            <div class="v-sheet__wrap">
                                <div class="v-sheet__icon">
                                    <v-icon :color="theme">{{ icon }}</v-icon>
                                </div>
                                <div class="v-sheet__text">
                                    <div class="title font-weight-light mb-2 white--text">{{ title }}</div>
                                    <div class="caption font-weight-light white--text">{{ describe }}</div>
                                </div>
                            </div>
                        </v-sheet>

                        <v-card-text class="v-card--offset pt-0 pb-1">
                            <v-container class="px-0 pb-0 pt-2" grid-list-lg>
                                <v-layout wrap>
                                    <slot></slot>
                                </v-layout>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn :color="theme" flat @click="onSubmit">{{ submitName }}</v-btn>
                            <v-btn :color="theme" flat @click="onCancel">{{ cancelName }}</v-btn>
                        </v-card-actions>
                     </v-card>
                </v-flex>
            </v-layout>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'v-dialog-screen',

    props: {
        title: {
            type: String,
            default: 'Untitled'
        },

        describe: {
            type: String,
            default: 'here is describe for this widget'
        },

        icon: {
            type: String,
            default: 'dashboard'
        },

        submitName: {
            type: String,
            default: 'submit'
        },

        cancelName: {
            type: String,
            default: 'cancel'
        },

        small: {
            type: Boolean,
            default: false
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

        '$root.theme': function(newval){
            this.theme = newval;
        }
    }
};
</script>