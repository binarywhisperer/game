<template>
    <div v-on:click="myGame" class="game">
        {{id}}TicTacToe {{JSON.parse(board).length}}<i class="fa fa-clock-o"></i>
    </div>
</template>
<script>
    export default {
        props:['id','users_count','board'],
        methods:{
            myGame(){
               axios.get('tictactoe/' + this.id + '/json').then(response => {
                    this.$root.board.edges.dynamic =  Object.values(JSON.parse(response.data.board));
                    this.$root.users =  response.data.users;
                });
            }
        },
        mounted() {
            console.log(this.board);
        }
    }
</script>
