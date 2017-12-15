Vue.component('gamer', require('./components/master/Gamer.vue'));

const nav = new Vue({
    el: '#nav',
    data:{
        login:true,
        gamer: gamer
    },
    methods: {

    },
    created(){
    },
    mounted(){
        console.log("Master is Mounted");
    }
});
