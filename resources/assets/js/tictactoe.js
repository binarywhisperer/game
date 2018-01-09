

window.GameEvent = new class{
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

Vue.component('board', require('./components/tictactoe/Board.vue'));
Vue.component('description', require('./components/tictactoe/Description.vue'));
Vue.component('instance-selects', require('./components/tictactoe/Instance.vue'));
Vue.component('general-chat', require('./components/master/GeneralChat.vue'));


const game = new Vue({
    el: '#game',
    data:{
        currentInstance: {"id":0, "users":[{"id":"gamer"},{"id":0,"primaryColor":'#870000',"secondaryColor":'#190A05','name':'Local A.I.'}],"edges":[],"edges":[]},
        instances: instances,
        gamer: gamer,
    },
    methods: {
        createGame(){

        },
        hasPlayerEdge(vert){
            let edge = this.hasEdge(0,vert);
            if(edge != false){
                return true;
            }
            edge = this.hasEdge(1,vert);
            if(edge != false){
                return true;
            }
            return false;
        },
        addEdge(vert1, vert2){
            this.currentInstance.edges.unshift([vert1,vert2]);
        },
        hasEdge(vert1, vert2){
            let result = false;
            let edges = this.currentInstance.edges;
            _.forEach(edges, function(edge){
                if((edge[0] == vert1 && edge[1] == vert2) || (edge[0] == vert2 && edge[1] == vert1)){
                    result = edge;
                    return;
                }
            });
            return result;
        },
        locationSelected(location){
            console.log('this.currentInstance');
            console.log(this.currentInstance);
            if(this.currentInstance.id == 0){
                if(!this.hasPlayerEdge(location)){
                    this.addEdge(0, location);
                    let randomStrat = 2;
                    if(this.currentInstance.edges.length < 9){
                        do{
                            randomStrat = Math.floor(Math.random() * 8) + 2;
                        }while(this.hasPlayerEdge(randomStrat));
                        let vm = this;
                        setTimeout(function(){
                            vm.addEdge(1, randomStrat);
                        }, 100);

                    }
                }
            }else{
                axios.post('api/instance/' + this.currentInstance.id, {action: 'add', edge: [this.gamer.id,location] }).then(response => {

                });
            }
        },
        instanceUpdated(instance){
            console.log('intntnttn');
            console.log(instance);
            this.currentInstance.edges =  instance.edges;
        },
        instanceSelected(instance){
            this.currentInstance.id = instance.id;
            this.currentInstance.edges = JSON.parse(instance.edges);
            this.currentInstance.users = instance.users;
            window.scrollTo(0,0);
            document.getElementById('nav').className = 'animated bounceOutUp';
            setTimeout(function(){
                _.forEach(document.getElementsByClassName('board-load'), function(animation) {
                    animation.beginElement();
                });
            },400);
        }
    },
    created(){
        GameEvent.listen('locationSelected', (location) => this.locationSelected(location));
        GameEvent.listen('instanceSelected', (instance) => this.instanceSelected(instance));
        GameEvent.listen('instanceUpdated', (instance) => this.instanceUpdated(instance));
    },
    mounted(){

    }
});
