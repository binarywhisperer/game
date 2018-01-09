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
        updateInstance(index, instance){
            Vue.set(this.instances, index, instance);
        }
    },
    created(){

    },
    mounted(){
        let vm = this;
        socket.on( gamer.id + ':App\\Events\\InstanceJoined', function(data){
            alert("New Joiner: " + data.joiner);
            this.findingGame = false;
        });
        socket.on( gamer.id + ':App\\Events\\InstanceUpdated', function(data){
            console.log("socket InstanceUpdated");
            _.each(vm.instances, function(instance, index){
                console.log(instance.id + "  <>  "  + data.edges.instance_id);
                if(instance.id == data.edges.instance_id){
                    instance.edges = data.edges.edges;
                    vm.updateInstance(index,instance);
                }
            });
            GameEvent.fire('instanceUpdated', data.edges);
            console.log("vm.instances");
            console.log(vm.instances);
        });
    }
});
