<template>
    <div v-on:click="joinGame" class="game">
        {{id}}TicTacToe {{users_count}}/2<i class="fa fa-user"></i>
    </div>
</template>
<script>
    export default {
        props:['id','users_count'],
        methods:{
            joinGame(){
               axios.post('tictactoe/' + this.id + '/join').then(response => {console.log(response);})
            }
        },
        mounted() {
            console.log(this.id);
        }
    }
</script>
