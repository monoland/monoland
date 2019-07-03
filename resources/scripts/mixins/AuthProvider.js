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
        this.mode = 'server-side';
        this.sitekey = null;
        this.secretKey = null;
    }

    get user() {
        return this.store.getItem('user');
    }

    set user(response) {
        if (!response) return;

        this.store.clear();
        this.store.setItem('user', response.data);
        this.store.setItem('theme', response.data.theme);
        this.store.setItem('authent', response.data.authent_name);
    }

    get authent() {
        return this.store.getItem('authent');
    }

    get check() {
        return !!this.store.getItem('access_token') && !this.expired;
    }

    get theme() {
        return this.store.getItem('theme');
    }

    set theme(theme) {
        if (!theme) return;

        this.store.setItem('theme', theme);
    }

    get menus() {
        return this.store.getItem('menus');
    }

    set menus(menus) {
        if (!menus) return;

        this.store.setItem('menus', menus);
    }

    get serverMode() {
        return this.mode === 'server-side';
    }

    set token(response) {
        if (!response) return;

        this.store.setItem('access_token', response.access_token);
        this.store.setItem('expires_in', response.expires_in);
        this.store.setItem('refresh_token', response.refresh_token);
        this.store.setItem('token_type', response.token_type);
        this.store.setItem('token_create', Date.now());
    }

    get token() {
        return this.store.getItem('token_type') + ' ' + this.store.getItem('access_token');
    }

    get csrf() {
        return (document.head.querySelector('meta[name="csrf-token"]')).content;
    }

    get expired() {
        let minute = parseInt((Date.now() - parseInt(this.store.getItem('token_create'))) / 1000);
        let expire = parseInt(this.store.getItem('expires_in'));

        return minute >= expire;
    }

    updateUser(user) {
        this.store.setItem('user', user);
    }

    signout() {
        this.store.clear();
        
        if (this.mode === 'server-side') {
            document.getElementById('signout').submit();
        }
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

                if ($auth.mode === 'server-side') {
                    headers =  Object.assign({
                        'X-CSRF-TOKEN': $auth.csrf
                    }, headers);
                } else {
                    headers =  Object.assign({
                        'Authorization': $auth.token
                    }, headers);
                }
                
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