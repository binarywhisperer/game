window._ = require('lodash');
window.axios = require('axios');
window.moment = require('moment');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.Vue = require('vue');

window.socket = io('http://192.168.10.10:3000');

require('./nav');

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
