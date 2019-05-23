import Axios from 'axios';
import SecureLS from 'secure-ls';

class Authenticate
{
    constructor() {
        this.store = new SecureLS({
            encryptionSecret: process.env.MIX_ENCRYPT 
        });

        this.user = null;
    }

    getUser() {
        return this.store.get('user');
    }

    setUser(params) {
        this.store.set('user', params.data);
    }

    getMenus() {
        return this.store.get('menus');
    }

    theme() {
        return (this.store.get('user')).theme;
    }

    setMenus(params) {
        this.store.set('menus', params);
    }

    token() {
        return (document.head.querySelector('meta[name="csrf-token"]')).content;
    }

    signout() {
        this.store.remove('menus');
        this.store.remove('user');

        document.getElementById('signout').submit();
    }
}

export const AuthProvider = {
    install (Vue) {
        if (this.installed) { return; }

        this.installed = true;

        let $auth = new Authenticate();

        Object.defineProperty(Vue.prototype, '$auth', {
            get() {
                return $auth;
            }
        });

        Object.defineProperty(Vue.prototype, '$http', {
            get() {
                let headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                };

                headers =  Object.assign({
                    'X-CSRF-TOKEN': $auth.token()
                }, headers);

                return Axios.create({
                    headers
                });
            }
        });

        // define message
        let $message = {};

        Object.defineProperty(Vue.prototype, '$message', {
            get() {
                return $message;
            },

            set(newval) {
                $message = {
                    color: 'success',
                    text: newval,
                    state: true
                };

                this.$root.snackbar = $message;
            }
        });

        // define error
        let $error = {};

        Object.defineProperty(Vue.prototype, '$error', {
            get() {
                return $error;
            },

            set(newval) {
                if (newval.hasOwnProperty('response')) {
                    let { message, errors } = newval.response.data;
                    let status = newval.response.status;

                    if (status === 401) {
                        $auth.signout();
                    } else if (errors) {
                        $error = {
                            color: 'error',
                            text: message,
                            state: true
                        };

                        this.$root.snackbar = $error;
                    }
                } else if (newval.hasOwnProperty('message')) {
                    $error = {
                        color: 'error',
                        text: newval.message,
                        state: true
                    };

                    this.$root.snackbar = $error;
                }

                if (process.env.NODE_ENV === 'production') {
                    window.console.clear();
                }
            }
        });
    }
};