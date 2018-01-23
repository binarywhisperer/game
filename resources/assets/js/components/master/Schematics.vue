<template>
    <div class="schematic">
        <form @submit.prevent="findGame">
            <div class="field has-addons">
                <div class="control is-expanded">
                    <div class="select is-fullwidth">
                        <select name="schematic">
                            <option v-for="schematic in schematics" :value="schematic.id">{{schematic.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="control">
                    <button type="submit" class="button is-primary">Find Game</button>
                </div>
            </div>
        </form>
        <div class="findingGame" v-if="$root.findingGame">
            <p>Finding game...</p>
            <div class="loading-gif">
                <img src="img/pacman.gif"/>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:['schematics', 'gamer'],
        methods:{
            findGame(e){
                axios.post('api/instance', {gamer: gamer.id, schematic: e.target.schematic.value}).then(response => {
                    this.$root.findingGame = true;
                    console.log(response);
                });
            }
        }
    }
</script>
