<template>
    <div v-on:click="locationSelected" class="location" id="id">
        {{locationHasPlayer()}}
    </div>
</template>

<script>
    export default {
        props:['id'],
        methods:{
            locationHasPlayer(){
                return this.$root.hasPlayerEdge(this.id);
            },
            locationSelected(){
                GameEvent.fire('locationSelected', this.id);
            }
        },
        mounted() {
            console.log('Location mounted.')
        }
    }
</script>
