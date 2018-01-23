

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

Vue.component('tictactoe-board', require('./components/tictactoe/Board.vue'));
Vue.component('tictactoe-description', require('./components/tictactoe/Description.vue'));

Vue.component('checkers-board', require('./components/checkers/Board.vue'));
Vue.component('checkers-description', require('./components/checkers/Description.vue'));

Vue.component('chess-board', require('./components/chess/Board.vue'));
Vue.component('chess-description', require('./components/chess/Description.vue'));

const game = new Vue({
    el: '#game',
    data:{
        currentInstance: {"id":0, "users":[{"id":"gamer"},{"id":0,"primaryColor":'#870000',"secondaryColor":'#190A05','name':'Local A.I.'}],"edges":[],"schematic":1},
        instances: instances,
        gamer: gamer,
    },
    methods: {
        instanceSelected(instance){
            this.currentInstance.id = instance.id;
            this.currentInstance.edges = JSON.parse(instance.edges);
            this.currentInstance.users = instance.users;
            this.currentInstance.schematic = instance.schematic;
            window.scrollTo(0,0);
            document.getElementById('nav').className = 'animated bounceOutUp';
            setTimeout(function(){
                _.forEach(document.getElementsByClassName('board-load'), function(animation) {
                    animation.beginElement();
                });
            },400);
            console.log("Current Instance:");
            console.log(this.currentInstance);
        },
        modalMessage(message){
            document.getElementById('modal').style.display = "block";
            document.getElementById('modalMessage').textContent = message;
        }, instanceWin(message){

        }
    },
    created(){
        GameEvent.listen('instanceSelected', (instance) => this.instanceSelected(instance));
        GameEvent.listen('modalMessage', (message) => this.modalMessage(message));
        GameEvent.listen('instanceWin', (message) => this.instanceWin(message));
    },
    mounted(){
    }
});
