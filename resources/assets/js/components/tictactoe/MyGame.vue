<template>
    <div v-on:click="myGame" class="game">
        {{id}}TicTacToe {{users_count}}/2<i class="fa fa-user"></i> {{JSON.parse(board).length}}<i class="fa fa-clock"></i>
    </div>
</template>
<script>
    export default {
        props:['id','users_count','board'],
        methods:{
            myGame(){
               axios.get('tictactoe/' + this.id + '/json').then(response => {
                    console.log( this.$root.board.edges.dynamic);
                    this.$root.board.edges.dynamic =  Object.values(JSON.parse(response.data.board));
                                       console.log( this.$root.board.edges.dynamic);
                                  });
                               }
                           },
                           mounted() {
            console.log(this.board);
        }
    }
</script>
