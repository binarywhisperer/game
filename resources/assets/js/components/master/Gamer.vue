<template>
    <div class="gamer-level">
        <div v-if="!editing" class="gamer-label" @click="editing = true"><i class="hover-hide fa fa-user"></i><i
                class="hover-only fa fa-gears"></i>
            <div :style="playerColors">{{gamer.name}}</div>
        </div>
        <div v-if="!editing" class="gamer-label"><i class="fa fa-btc"></i>
            <div>{{gamer.points}}</div>
        </div>
        <form class="editingForm" v-if="editing" @submit.prevent="editGamer($event)" action="">
            <i class="fa fa-window-close" @click="cancelEdit"></i>
            <div class="field">
                <div class="gamer-label"><i class="fa fa-gears"></i>
                    <div :style="playerColors"><input v-on:input="gamer.name = $event.target.value" class="input" name="name" :value="gamer.name" minlength="2" maxlength="13" type="text"
                                                    placeholder="User Name" required></div>
                </div>
            </div>
            <div class="field">
                <div class="control colorInput">
                    <div>Primary</div>
                    <input class="selectColor" v-on:input="gamer.primaryColor = $event.target.value" name="primaryColor" type="color" :value="gamer.primaryColor"
                           required>
                </div>
                <div class="control colorInput">
                    <div>Secondary</div>
                    <input class="selectColor"  v-on:input="gamer.secondaryColor = $event.target.value" name="secondaryColor" type="color" :value="gamer.secondaryColor"
                           required>
                </div>
            </div>
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" name="email" type="email" :value="gamer.email" placeholder="Email" required>
                    <span class="icon is-small is-left">
                                                        <i class="fa fa-envelope"></i>
                                                    </span>
                    <span class="icon is-small is-right">
                                                       <i class="fa fa-check"></i>
                                                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <button type="submit" class="button is-primary stretch">
                        Update Account
                    </button>
                </p>
            </div>

            <a class="btn btn-link" href="/logout">Log Out</a>
        </form>
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
    </div>
</template>
<script>
    export default {
        props: ['gamer','schematics'],
        data: function () {
            return {
                editing: false,
                originalGamer: Object.assign({}, gamer),
                originalSecondary: gamer.secondaryColor
            }
        },
        methods: {
            editGamer(event){
                let data = new FormData(event.target);
                axios.post('api/user/' + this.gamer.id, data).then(response => {
                    this.editing = false;
                });
            },
            cancelEdit(){
                this.gamer.email = this.originalGamer.email;
                this.gamer.name = this.originalGamer.name;
                this.gamer.primaryColor = this.originalGamer.primaryColor;
                this.gamer.secondaryColor = this.originalGamer.secondaryColor;
                this.editing = false;
            },
            findGame(e){
                axios.post('/instance', {schematic: e.target.schematic.value}).then(response => {
                    this.$root.findingGame = true;
                });
            }
        },
        computed: {
            playerColors: function () {
                return {
                    background: this.gamer.primaryColor,
                    borderColor: this.gamer.secondaryColor
                }
            }
        },
        mounted() {
            console.log(gamer);
        }
    }
</script>
