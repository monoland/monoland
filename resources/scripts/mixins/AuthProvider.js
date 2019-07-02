import Axios from 'axios';
import * as CryptoJS from 'crypto-js';
import SecureStorage from 'secure-web-storage';

class Authenticate
{
    constructor() {
        let SECRET_KEY = process.env.MIX_ENCRYPT;

        this.store = new SecureStorage(localStorage, {
            hash: function hash(key) {
                key = CryptoJS.SHA256(key, SECRET_KEY);
        
                return key.toString();
            },
            encrypt: function encrypt(data) {
                data = CryptoJS.AES.encrypt(data, SECRET_KEY);
        
                data = data.toString();
        
                return data;
            },
            decrypt: function decrypt(data) {
                data = CryptoJS.AES.decrypt(data, SECRET_KEY);
        
                data = data.toString(CryptoJS.enc.Utf8);
        
                return data;
            }
        });

        this.user = null;
    }

    getUser() {
        return this.store.getItem('user');
    }

    setUser(params) {
        this.store.clear();
        this.store.setItem('user', params.data);
        this.store.setItem('theme', params.data.theme);
        this.store.setItem('authent', params.data.authent_name);
    }

    putUser(params) {
        this.store.setItem('user', params);
    }

    getMenus() {
        return this.store.getItem('menus');
    }

    authent() {
        return this.store.getItem('authent');
    }

    theme() {
        return this.store.getItem('theme');
    }

    setTheme(value) {
        this.store.setItem('theme', value);
    }

    setMenus(params) {
        this.store.setItem('menus', params);
    }

    token() {
        return (document.head.querySelector('meta[name="csrf-token"]')).content;
    }

    signout() {
        this.store.clear();
        
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
                    } else {
                        $error = {
                            color: 'error',
                            text: 'there is an error while data process on server.',
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
                } else {
                    $error = {
                        color: 'error',
                        text: 'there is an error while data process on server.',
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