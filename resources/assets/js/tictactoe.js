

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
Vue.component('svg-arrows', require('./components/master/SVGBackground.vue'));


const game = new Vue({
    el: '#game',
    data:{
        currentInstance: {"users":[{"id":"gamer"},{"id":0,"primaryColor":'#870000',"secondaryColor":'#190A05','name':'Local A.I.'}],"edges":[]},
        instances: instances,
        gamer: gamer,
    },
    methods: {
        createGame(){

        },
        hasPlayerEdge(vert){
            let edge = this.hasEdge(0,vert);
            if(edge != false){
                return this.currentInstance.vertices.players[edge[0]];
            }
            edge = this.hasEdge(1,vert);
            if(edge != false){
                return this.currentInstance.vertices.players[edge[0]]
            }
            return '';
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
            this.addEdge(this.currentInstance.edges.length % 2,location);
        },
        instanceSelected(instance){
            this.currentInstance.edges = JSON.parse(instance.edges);
            this.currentInstance.users = instance.users;
            window.scrollTo(0,0);
            _.forEach(document.getElementsByClassName('board-load'), function(animation) {
                animation.beginElement();
            });
        }
    },
    created(){
        GameEvent.listen('locationSelected', (location) => this.locationSelected(location));
        GameEvent.listen('instanceSelected', (instance) => this.instanceSelected(instance));
    },
    mounted(){
        console.log("Tic Tac Toe Board Loaded:");
        console.log(this.currentInstance);
    }
});
