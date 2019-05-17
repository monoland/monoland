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
        this.store.set('user', params);
    }

    getMenus() {
        return this.store.get('menus');
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
    }
};