<template>
        <div class="schematic">
            <form @submit.prevent="findGame">
                <select name="schematic">
                    <option v-for="schematic in schematics" :value="schematic.id">{{schematic.name}}</option>
                </select>
                <button type="submit">Find Game</button>

            </form>
        </div>
</template>
<script>
    export default {
        props:['schematics'],
        methods:{
            findGame(e){
                axios.post('/instance', {schematic: e.target.schematic.value}).then(response => {
                    console.log(response);
                });
            }
        }
    }
</script>
