<template>
        <div class="gamer-level">
            <div class="gamer-label"><i class="fa fa-user"></i><div :style="playerColors">{{gamer.name}}</div></div>
            <div class="gamer-label"><i class="fa fa-diamond"></i><div>{{gamer.points}}</div></div>

        </div>
</template>
<script>
    export default {
        props:['gamer'],
        methods:{
        },
        computed:{
            playerColors: function(){
                return {
                    background: this.gamer.primaryColor,
                    borderColor: this.gamer.secondaryColor
                }
            }
        },
        mounted() {
            console.log(gamer.name);
        }
    }
</script>
