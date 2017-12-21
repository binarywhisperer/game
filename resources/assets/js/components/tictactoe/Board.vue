<template>
    <svg class="the-grid" :height="size" :width="size">
        <rect v-for="i in range" :id="i" :x="(i % segments)* grid" :y="Math.floor(i / segments) * grid" :width="grid" :height="grid" fill="#fff" @click="rectClicked(i+2);"/>
        <line class="the-grid-line" v-for="l1 in segments - 1" :x1="grid * l1 - 2" y1="0" :x2="grid * l1 - 2" :y2="size - 2" stroke-width="5" stroke="black"/>
        <line class="the-grid-line" v-for="l2 in segments - 1" x1="0" :y1="grid * l2 - 2" :x2="size - 2" :y2="grid * l2 - 2" stroke-width="5" stroke="black"/>
        <circle v-for="edge in playerOneEdges" :cx="((edge[1]-2) % segments) * grid + (grid/2)" :cy="Math.floor((edge[1]-2) / segments) * grid  + (grid/2)" :r="grid/2" stroke="black" stroke-width="5" fill-opacity="0"/>
        <line v-for="edge in playerTwoEdges" :x1="(edge[1]-2) % segments * grid" :y1="Math.floor((edge[1]-2) / segments) * grid" :x2="(edge[1]-2) % segments * grid + grid" :y2="Math.floor((edge[1]-2) / segments) * grid + grid" stroke-width="5" stroke="black"/>
        <line v-for="edge in playerTwoEdges" :x1="(edge[1]-2) % segments * grid + grid" :y1="Math.floor((edge[1]-2) / segments) * grid" :x2="(edge[1]-2) % segments * grid" :y2="Math.floor((edge[1]-2) / segments) * grid + grid" stroke-width="5" stroke="black"/>
    </svg>
</template>

<script>
    export default {
        props:['segments','board'],
        data: function(){
                return {
                    range: _.range(0, (this.segments * this.segments), 1),
                    size: 300,
                    grid: 100,
                    offset:0
                }
            },
        methods:{
            rectClicked(id){
                GameEvent.fire('locationSelected', id);
            },
            setSize(){
                var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
                this.size = (x < y ? x : y) - 100;
                this.offset = (x - this.size)/2;
                this.grid = this.size / this.segments;
                document.getElementsByClassName('the-grid')[0].style.margin = "0 " + this.offset + 'px';
            }
        },
        computed:{
            playerOneEdges(){
                return _.filter(this.board.edges, function(edge) {
                                           return edge[0] == 0;
                                        });
            },
            playerTwoEdges(){
                return _.filter(this.board.edges, function(edge) {
                    return edge[0] == 1;
                });
            }
        },
        mounted() {
            console.log('SVG Board mounted.');
            console.log(board.edges);
            this.setSize();

            window.addEventListener('resize',  this.setSize);
        },
        beforeDestroy(){
            window.removeEventListener('resize', this.setSize);
        }
    }
</script>