let socket = io('http://192.168.10.10:3000');

Vue.component('gamer', require('./components/master/Gamer.vue'));
Vue.component('schematics', require('./components/master/Schematics.vue'));

const nav = new Vue({
    el: '#nav',
    data:{
        login:true,
        gamer: gamer,
        schematics: schematics

    },
    methods: {

    },
    created(){
    },
    mounted(){

        socket.on( gamer.id + ':App\\Events\\InstanceJoined', function(data){
           alert("New Joiner: " + data.joiner);
        });
    }
});
