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
            vm.findingGame = false;
            alert(data.message);
            location.reload();
        });
        socket.on( gamer.id + ':App\\Events\\InstanceUpdated', function(data){
            console.log("socket InstanceUpdated");
            let instanceId;
            _.each(vm.instances, function(instance, index){
                if(instance.id == data.edges.instance_id){
                    instance.edges = JSON.parse(data.edges.edges);
                    vm.updateInstance(index,instance);
                    instanceId = index;
                }
            });
            GameEvent.fire('instanceUpdated', vm.instances[instanceId]);
        });
        socket.on( gamer.id + ':App\\Events\\InstanceWin', function(data){
            GameEvent.fire('instanceWin', data);
        });
    }
});
