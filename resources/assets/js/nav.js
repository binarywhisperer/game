Vue.component('gamer', require('./components/master/Gamer.vue'));
Vue.component('schematics', require('./components/master/Schematics.vue'));

Vue.component('instance-selects', require('./components/tictactoe/Instance.vue'));

const nav = new Vue({
    el: '#nav',
    data:{
        login:true,
        gamer: gamer,
        schematics: schematics,
        findingGame: findingGame,
        instances: instances,
    },
    methods: {

    },
    created(){

    },
    mounted(){
        socket.on( gamer.id + ':App\\Events\\InstanceJoined', function(data){
           alert("New Joiner: " + data.joiner);
            this.findingGame = false;
        });
    }
});
