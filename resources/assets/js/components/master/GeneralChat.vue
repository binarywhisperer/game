<template>
        <div id="general-chat">
            <ul>
                <li v-for="message in messages">{{message}}</li>
            </ul>
            <form id="general-chatbox" v-on:submit.prevent="sendMessage">
                <div class="field has-addons">
                    <p class="control is-expanded">
                        <input class="input" type="text" name="message" placeholder="Be nice or GTFO">
                    </p>
                    <p class="control">
                        <button type="submit" class="button">
                            SEND
                        </button>
                    </p>
                </div>
            </form>
        </div>
</template>
<script>

    export default {
        data: function(){
                return {
                    messages: ['Start of messages']
                }
            },
        methods:{
             messageSent(message){
                    this.messages.push(message);
                },
                sendMessage(message){
                    axios.post('/messenger', {message: message.target.message.value}).then(response => {
                        message.target.message.value = "";
                     });
                }
        },
        mounted() {
            let vm = this;
            socket.on('general:App\\Events\\MessageSent', function(data){
                vm.messageSent(data.messageBody);
            });
        }
    }
</script>
