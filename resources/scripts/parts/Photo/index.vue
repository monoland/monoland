<template>
    <div class="v-photo">
        <div class="v-photo__wraper">
            <img :src="photourl" alt="photo">
        </div>

        <div class="v-photo__overlay" 
            :class="{ 'v-photo__hover': onHover }" 
            :id="uuid"
            @mouseover="mouseover" 
            @mouseleave="mouseleave"
            v-if="!basic"
        >
            <v-icon dark>camera_alt</v-icon>
        </div>
    </div>
</template>

<script>
import qq from 'fine-uploader/lib/core';
import shortid from 'shortid';

export default {
    name: 'v-photo',

    props: {
        placeholder: {
            type: String,
            default: '/images/photo-holder.png'
        },

        path: {
            type: String,
            default: '/images/small/'
        },

        basic: {
            type: Boolean,
            default: false
        },

        value: String
    },

    data:() => ({
        photourl: null,
        uuid: shortid.generate(),
        onHover: false
    }),

    created() {
        if (!this.value) {
            this.photourl = this.placeholder;
        } else {
            this.photourl = this.path + this.value;
        }
    },

    mounted() {
        let _this = this;

        new qq.FineUploaderBasic({
            button: document.getElementById(_this.uuid),

            request: {
                customHeaders: {
                    'X-CSRF-TOKEN': _this.$auth.token()
                },
                endpoint: '/api/media',
                filenameParam: 'fileName',
                inputName: 'fileUpload',
                uuidName: 'uuid',
                totalFileSizeName: 'totalFileSize'
            },

            chunking: {
                enabled: true,
                mandatory: true,
                paramNames: {
                    chunkSize: 'chunkSize',
                    partByteOffset: 'partByteOffset',
                    partIndex: 'partIndex',
                    totalParts: 'totalParts'
                },
                success: {
                    endpoint: '/api/media?completed=true'
                }
            },

            validation: {
                acceptFiles: 'image/png, image/jpeg',
                allowedExtensions: ['png', 'jpg', 'jpeg']
            },

            callbacks: {
                onUploadChunk: function(id, name, data) {
                    _this.uploaded = false;
                    _this.uplvalue = (parseInt(data.partIndex) + 1) / parseInt(data.totalParts) * 100;
                    
                    if (_this.uplvalue >= 100) {
                        _this.uploaded = true;
                    }
                },

                onComplete: function(id, name, response) {
                    if (!response.success) {
                        _this.$error = response.error;
                    } else {
                        _this.photourl = _this.path + response.fileinfo.path;
                        _this.$emit('input', response.fileinfo.path);
                    }
                }
            }
        });
    },

    methods: {
        mouseover: function() {
            this.onHover = true;
        },

        mouseleave: function() {
            this.onHover = false;
        }
    },

    watch: {
        value: function(newval) {
            if (newval) {
                this.photourl = this.path + newval;
            }
        },
    }
};
</script>
