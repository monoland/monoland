<template>
    <div class="monoland" :class="{ 'monoland--loaded': !fontLoaded }">
        <router-view v-if="fontLoaded"></router-view>
    </div>
</template>

<script>
import WebFontLoader from 'webfontloader';

export default {
    name: 'monoland-base',

    data:() => ({
        fontLoaded: false,
    }),

    mounted() {
        WebFontLoader.load({
            custom: {
                families: ['Roboto', 'Nunito', 'Material Icons'],
                urls: ['/fonts/webfont.css']
            },
            active: this.setFontLoaded
        })
    },

    methods: {
        setFontLoaded: function() {
            setTimeout(() => {
                this.fontLoaded = true;
            }, 500);
        }
    }
};
</script>
