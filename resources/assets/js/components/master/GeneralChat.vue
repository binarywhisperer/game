<template>
        <div id="general-chat">
            <h2>General Chat</h2>
            <ul>
                <li>{{time}}</li>
                <li v-for="message in messages"><div :style="{background:message.primary,borderColor:message.secondary}">{{message.name}}</div>{{message.message}}</li>
            </ul>
            <form id="general-chatbox" v-on:submit.prevent="sendMessage">
                <div class="field has-addons">
                    <p class="control is-expanded">
                        <input class="input" type="text" autocomplete="off" name="message" placeholder="Be nice or GTFO">
                    </p>
                    <p class="control">
                        <button type="submit" class="button is-primary">
                            SEND
                        </button>
                    </p>
                </div>
            </form>
        </div>
</template>
<script>

    export default {
        props:['gamer'],
        data: function(){
                return {
                    time: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    messages: []
                }
            },
        methods:{
             messageSent(message){
                    this.messages.unshift(message);
                },
                sendMessage(message){
                    axios.post('api/messenger', {gamer: gamer.id, message: message.target.message.value}).then(response => {
                        message.target.message.value = "";
                     });
                }
        },
        mounted() {
            let vm = this;
            socket.on('general:App\\Events\\MessageSent', function(data){
                vm.messageSent(data.message);
            });
        }
    }
</script>
