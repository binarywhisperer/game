<template>
    <svg class="the-grid" :height="size + 85" :width="size">
        <rect v-for="i in range" :id="i" :x="(i % segments)* grid" :y="Math.floor(i / segments) * grid" :width="grid" :height="grid" fill="#fff" @click="rectClicked(i+2);"/>
        <line class="the-grid-line" v-for="l1 in segments - 1" :x1="grid * l1 - 2" y1="0" :x2="grid * l1 - 2" :y2="size - 2" stroke-width="5" stroke="black"/>
        <line class="the-grid-line" v-for="l2 in segments - 1" x1="0" :y1="grid * l2 - 2" :x2="size - 2" :y2="grid * l2 - 2" stroke-width="5" stroke="black"/>
        <circle v-for="edge in playerCircleEdges" :cx="((edge[1]-2) % segments) * grid + (grid/2)" :cy="Math.floor((edge[1]-2) / segments) * grid  + (grid/2)" :r="grid/2 - 3" :stroke="playerOPrimary" stroke-width="5" fill-opacity="0"/>
        <line v-for="edge in playerExEdges" :x1="(edge[1]-2) % segments * grid + 3" :y1="Math.floor((edge[1]-2) / segments) * grid  + 3" :x2="(edge[1]-2) % segments * grid + grid - 3" :y2="Math.floor((edge[1]-2) / segments) * grid + grid - 5" stroke-width="5" :stroke="playerXPrimary"/>
        <line v-for="edge in playerExEdges" :x1="(edge[1]-2) % segments * grid + grid - 3" :y1="Math.floor((edge[1]-2) / segments) * grid + 3" :x2="(edge[1]-2) % segments * grid + 3" :y2="Math.floor((edge[1]-2) / segments) * grid + grid - 3" stroke-width="5" :stroke="playerXPrimary"/>

        <rect :x="5" :y="size + 5" :width="grid * 1.25 - 10" :height="50" :fill="playerXPrimary" stroke-width="5" :stroke="playerXSecondary" rx="4" ry="4">
            <animate  class="board-load" attributeName="y" dur=".75s"
                                      :from="0"
                                        :to="size + 5"
                                    />
        </rect>
        <rect :x="8" :y="size + 8" :width="grid * 1.25 - 16" :height="44" fill="none" stroke-width="3" stroke="rgba(0,0,0,.5)" rx="4" ry="4">
            <animate  class="board-load" attributeName="y" dur=".75s"
                                                  :from="0"
                                                  :to="size + 8"
                                                />
        </rect>
        <text :x="5 + 10" :y="size + 40"
                      style="stroke: #000;
                      font-size: 24px;
                      font-weight:700;
                      fill: #fff;">{{playerXName}}
                      <animate  class="board-load" attributeName="y" dur=".75s"
                        :from="0"
                        :to="size + 40"/>
                  </text>

        <text :x="5 + grid * 1.40" :y="size + 40"
                              style="stroke: #000;
                              font-size: 32px;
                              font-weight:700;
                              fill: #fff;">VS
                          </text>

        <rect :x="5 + grid * 1.75" :y="size + 5" :width="grid * 1.25 - 10" :height="50" :fill="playerOPrimary" stroke-width="5" :stroke="playerOSecondary" rx="4" ry="4">
            <animate  class="board-load" attributeName="y" dur=".75s"
                :from="0"
                :to="size + 5"/>
        </rect>
        <rect :x="8 + grid * 1.75" :y="size + 8" :width="grid * 1.25 - 16" :height="44" fill="none" stroke-width="3" stroke="rgba(0,0,0,.5)" rx="4" ry="4">
            <animate  class="board-load" attributeName="y" dur=".75s"
                :from="0"
                :to="size + 8"/>
        </rect>
        <text :x="5 + grid * 1.75 + 10" :y="size + 40"
                      style="stroke: #000;
                      font-size: 24px;
                      font-weight:700;
                      fill: #fff;">{{playerOName}}
                      <animate  class="board-load" attributeName="y" dur=".75s"
                        :from="0"
                        :to="size + 40"/>
                  </text>
    </svg>
</template>

<script>
    export default {
        props:['segments','instance','gamer'],
        data: function(){
                return {
                    range: _.range(0, (this.segments * this.segments), 1),
                    size: 300,
                    grid: 100,
                    offset:0,
                    localInstance: this.instance
                }
            },
        methods:{
            rectClicked(id){
                GameEvent.fire('locationSelected', id);
            },
            setSize(){
                var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
                this.size = (x < y ? x : y) - 125;
                this.offset = (x - this.size)/2;
                this.grid = this.size / this.segments;
                document.getElementsByClassName('the-grid')[0].style.margin = "0 " + this.offset + 'px';
            },
            instanceUpdated(instance){
                console.log('instanceUpdated');
                console.log(this.localInstance);
                this.localInstance.edges = instance.edges;
                console.log(this.localInstance);
            }
        },
        computed:{
             playerXName(){ return (this.localInstance.users[0].id == 'gamer' ? this.gamer.name : this.localInstance.users[0].name)},
             playerOName(){ return (this.localInstance.users[1].id == 'gamer' ? this.gamer.name : this.localInstance.users[1].name)},
             playerXPrimary(){ return (this.localInstance.users[0].id == 'gamer' ? this.gamer.primaryColor : this.localInstance.users[0].primaryColor)},
             playerXSecondary(){ return (this.localInstance.users[0].id == 'gamer' ? this.gamer.secondaryColor : this.localInstance.users[0].secondaryColor)},
             playerOPrimary(){ return (this.localInstance.users[1].id == 'gamer' ? this.gamer.primaryColor : this.localInstance.users[1].primaryColor)},
             playerOSecondary(){ return (this.localInstance.users[1].id == 'gamer' ? this.gamer.secondaryColor : this.localInstance.users[1].secondaryColor)},
             playerExEdges(){
                return _.filter(this.localInstance.edges, function(edge) {
                    return edge[0] == 0;
                });
             },
             playerCircleEdges(){
                return _.filter(this.localInstance.edges, function(edge) {
                    return edge[0] == 1;
                });
             }
        },
        mounted() {
            this.setSize();
            window.addEventListener('resize',  this.setSize);
        },
        created(){
            GameEvent.listen('instanceUpdated', (instance) => this.instanceUpdated(instance));
        },
        beforeDestroy(){
            window.removeEventListener('resize', this.setSize);
        }
    }
</script>