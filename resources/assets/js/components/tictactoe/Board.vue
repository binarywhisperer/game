<template>
<div class="board">
        <div class="gamers">
            <div class="gamer">{{users[0].name}}</div>
            <div class="gamer-vs">VS</div>
            <div class="gamer">{{users[1].name}}</div>
        </div>
           <div class="row">
                   <location :id="2"></location>
                   <location :id="3"></location>
                   <location :id="4"></location>
               </div>
           <div class="row">
                <location :id="5"></location>
                <location :id="6"></location>
                <location :id="7"></location>
           </div>
           <div class="row">
                <location :id="8"></location>
                <location :id="9"></location>
                <location :id="10"></location>
           </div>
        </div>
</template>

<script>
    export default {
        props:['users', 'board'],
        methods:{
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
