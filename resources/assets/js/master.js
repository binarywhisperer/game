window.socket = io(socketUrl);
window.Vue = require('vue');
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}
window._ = require('lodash');
window.moment = require('moment');

require('./nav');


Vue.component('instance-selects', require('./components/tictactoe/Instance.vue'));
Vue.component('general-chat', require('./components/master/GeneralChat.vue'));

window.Event = new class{
    constructor(){
        this.vue = new Vue();
    }
    fire(event, data = null){
        this.vue.$emit(event, data);
    }
    listen(event, callback){
        this.vue.$on(event, callback);
    }
};
