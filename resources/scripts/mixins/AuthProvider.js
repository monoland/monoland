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
                            type: 'error',
                            text: message,
                            show: true
                        };

                        this.$root.message = $error;
                    }
                } else if (newval.hasOwnProperty('message')) {
                    $error = {
                        type: 'error',
                        text: newval.message,
                        show: true
                    };

                    this.$root.message = $error;
                }

                if (process.env.NODE_ENV === 'production') {
                    window.console.clear();
                }
            }
        });
    }
};