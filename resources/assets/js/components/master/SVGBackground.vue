<template>
        <svg :height="height" :width="width" class="ghost" id="svg-arrows">
                <linearGradient id='g' x2='1' y2='1'>
                  <stop stop-color='#bdfff3'/>
                  <stop offset='100%' stop-color='#4ac29a'/>
                </linearGradient>
                <rect width='100%' height='100%' fill='url(#g)'/>
                							<polyline class="polyline" :test="arrow" fill="none" stroke="#fff" stroke-width="6" v-for="arrow in arrows">
                                <animate attributeName="points" :dur="arrow[0] + 's'"
                                  :from="pointsFrom(arrow)"
                                    :to="pointsTo(arrow)"
                                    restart="whenNotActive"
                                     repeatCount="indefinite"
                                />
                                <animate attributeName="opacity" :dur="'6s'"
                                  :from="1"
                                    :to="0"
                                     repeatCount="indefinite"
                                />
                </polyline>
        </svg>
</template>
<script>
    export default {
        props:['width','instances','frequency'],
        data:function(){
            return {
                size: 50,
                offset: 15,
                freq: this.frequency,
                height: this.instances.length * 64
            }
        },
        methods: {
                    pointsFrom(arrows) {
                       	return (0 - arrows[3] * this.offset - arrows[1]) + "," + arrows[2] + " " + (this.size - arrows[3] * this.offset - arrows[1]) + "," + (arrows[2] + this.size) + " " + (0 - arrows[3] * this.offset - arrows[1]) + "," + (arrows[2] + this.size * 2);
                    },
                    pointsTo(arrows) {
                       	return (this.width - arrows[3] * this.offset) + "," + arrows[2] + " " + (this.width + this.size - arrows[3] * this.offset) + "," + (arrows[2] + this.size) + " " + (this.width - arrows[3] * this.offset) + "," + (arrows[2] + this.size * 2);
                    },rando(min,max){
                     	return Math.floor(Math.random() * (max - min + 1)) + min;
                    }
                },
        computed:{
            arrows(){
                      	let arrowSet = [];
                        for(var i = 0; i<= this.freq; i++){
                        	let speed = this.rando(1,15) * .2 + .3;
                          let offsetX = this.rando(1,100)/100 * this.size - this.size * 2;
                          let offsetY = this.rando(0,100)/100 * this.height;
                          let length = this.rando(1,10);
                          for(var j = 0; j<=length; j++){
            								arrowSet.push([speed,offsetX,offsetY,j]);
                          }
                        }
                        return arrowSet;
                      }
        },
        mounted() {
               	let vm = this;
                      setInterval(function(){
                      	vm.freq += Math.pow(-1,vm.freq%1);
                      }, 6000);
        }
    }
</script>
