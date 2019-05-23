<template>
    <v-card class="mt-4 mx-auto" :width="width">
        <v-sheet class="v-card--sheet mx-auto" :color="theme" elevation="7" max-width="calc(100% - 48px)">
            <v-card-text>
            <div class="title font-weight-light mb-2 white--text">{{ title }}</div>
            <div class="caption font-weight-light white--text">{{ describe }}</div>
            </v-card-text>
        </v-sheet>

        <v-card-text class="v-card--offset pt-0 pb-1">
            <slot></slot>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <slot name="actions"></slot>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'v-widget',

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
            default: '100%'
        }
    },

    data:() => ({
        theme: null
    }),

    created() {
        this.theme =  this.$root.theme;
    },

    watch: {
        '$root.theme': function(newval) {
            this.theme = newval;
        }
    }
};
</script>
