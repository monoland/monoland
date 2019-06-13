<template>
    <v-card class="mt-4 mx-auto" :width="width">
        <div class="v-card__header icon">
            <v-sheet elevation="7" :color="theme">
                <slot>
                    <v-icon dark large>home</v-icon>
                </slot>
            </v-sheet>

            <p class="describe">{{ describe }}</p>
            <h3 class="title">{{ title }}</h3>
        </div>

        <v-card-text class="pt-0">
            <v-divider class="mt-1 mb-2"></v-divider>
            <v-icon class="mr-2" small>history</v-icon>
            <span class="caption grey--text">last registration 26 minutes</span>
        </v-card-text>
    </v-card>
</template>

<script>
// calc(100% - 48px)
export default {
    name: 'v-widget-icon',

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
