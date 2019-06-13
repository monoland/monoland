<template>
    <v-card class="mt-4 mx-auto" :width="width">
        <v-sheet 
            class="v-card--sheet mx-auto" 
            :color="theme" elevation="7" 
            max-width="calc(100% - 48px)"
            style="padding: 16px"
        >
            <slot>&nbsp;</slot>
        </v-sheet>

        <v-card-text class="pt-0" style="margin-top: -16px">
            <h3 class="title">{{ title }}</h3>
            <p class="describe">{{ describe }}</p>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>history</v-icon>
            <span class="caption grey--text">last registration 26 minutes</span>
        </v-card-text>
    </v-card>
</template>

<script>
// calc(100% - 48px)
export default {
    name: 'v-widget-chart',

    props: {
        color: {
            type: String,
            default: function() {
                return this.$root.theme
            }
        },

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
        this.theme = this.color;
    }
};
</script>