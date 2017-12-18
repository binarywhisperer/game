window._ = require('lodash');
window.Vue = require('vue');

let socket = io('http://192.168.10.10:3000');

const realtime = new Vue({
    el: '#realtime',
    data:{
        messages:[]
    },
    methods:{

    },
    mounted(){
        console.log(socket);

    }
});
