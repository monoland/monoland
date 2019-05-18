<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn class="v-btn--simple" v-on="on" @click="onClick" v-show="!disabled">
                <v-icon color="grey darken-1">{{ icon }}</v-icon>
            </v-btn>
        </template>
        
        <span>{{ tips }}</span>
    </v-tooltip>
</template>

<script>
export default {
    name: 'v-btn-simple',

    props: {
        icon: {
            type: String,
            default: 'add'
        },

        tips: {
            type: String,
            default: 'tooltip'
        },

        disabled: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        onClick: function() {
            this.$emit('click');
        }
    }
};
</script>
