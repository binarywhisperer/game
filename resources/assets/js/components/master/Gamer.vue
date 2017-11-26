<template>
    <div class="gamer">{{me.name}} - {{me.points}}</div>
</template>
<script>
    export default {
        props:['gamer'],
        data: function(){
            return {
                me: gamer,
            }
        },
        methods:{
        },
        mounted() {
            console.log(gamer.name);
        }
    }
</script>
