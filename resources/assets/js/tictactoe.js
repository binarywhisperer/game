
window.Vue = require('vue');

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
Vue.component('location', require('./components/tictactoe/Location.vue'));
Vue.component('join-game', require('./components/tictactoe/JoinGame.vue'));
Vue.component('my-game', require('./components/tictactoe/MyGame.vue'));

const game = new Vue({
    el: '#game',
    data:{
        board: board,
        myGames: myGames,
        availableGames: availableGames,
        users: users,
        gamer: gamer,
    },
    methods: {
        createGame(){
            axios.put('tictactoe').then(response => {
                console.log(response);
            });
        },
        hasPlayerEdge(vert){
            let edge = this.hasEdge(0,vert);
            if(edge != false){
                return this.board.vertices.players[edge[0]];
            }
            edge = this.hasEdge(1,vert);
            if(edge != false){
                return this.board.vertices.players[edge[0]]
            }
            return '';
        },
        addEdge(vert1, vert2){
            this.board.edges.dynamic.unshift([vert1,vert2]);
        },
        hasEdge(vert1, vert2){
            let result = false;
            let edges = this.board.edges.constant.concat(this.board.edges.dynamic);
            _.forEach(edges, function(edge){
                if((edge[0] == vert1 && edge[1] == vert2) || (edge[0] == vert2 && edge[1] == vert1)){
                    result = edge;
                    return;
                }
            });
            return result;
        },
        locationSelected(location){
            this.addEdge(this.board.edges.dynamic.length % 2,location);
        }
    },
    created(){
        GameEvent.listen('locationSelected', (location) => this.locationSelected(location));
    },
    mounted(){
        console.log(this.board);
    }
});
