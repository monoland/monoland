<template>
    <v-form method="POST" action="/account/login">
        <v-card class="v-card__login" flat>
            <input type="hidden" name="_token" v-model="token">
            
            <v-card-text>
                <v-text-field
                    label="Pengguna"
                    name="email"
                    color="cyan"
                    v-model="email"
                    autocomplete="off"
                    prepend-icon="mail_outline"
                ></v-text-field>
                
                <v-text-field 
                    label="Katasandi"
                    name="password"
                    color="cyan"
                    v-model="password"
                    :append-icon="hidden ? 'visibility_off' : 'visibility'"
                    :type="hidden ? 'password' : 'text'"
                    @click:append="hidden = !hidden"
                    prepend-icon="lock_open"
                ></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="cyan" type="submit" flat>masuk</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
export default {
    name: 'page-login',

    data:() => ({
        email: null,
        password: null,
        hidden: true,
        token: null,
        errors: {
            email: false,
            password: false,
        },
        hints: {
            email: null,
            password: null
        }
    }),

    mounted() {
        this.token = this.$auth.serverMode ? this.$auth.csrf : this.$auth.token;
    }
};
</script>