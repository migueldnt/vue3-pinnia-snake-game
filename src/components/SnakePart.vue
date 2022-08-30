<template>
    <div class="snake-part" :style="{'left':(position[0]*20)+'px',top:(position[1]*20)+'px',zIndex:100-idx}" :class="direction">
    <HeadSnake v-if="idx===1" :class="'nth-'+idx"/>
    </div>
</template>

<script setup>
import HeadSnake from "./sprites/Head.vue"
const props = defineProps({
    position:Array,
    direction:String,
    idx:Number
})

</script>

<style scoped>
.snake-part{
    width: 20px;
    height: 20px;
    background-color: #82C35F;
    position: absolute;
    
    
}

.snake-part.r{
    transform: rotate(-90deg);
}
.snake-part.l{
    transform: rotate(90deg);
}

.snake-part.t{
    transform: rotate(180deg);
}
.snake-part:first-of-type{
    transition: top .1s, left .1s, border-radius .1s;
}

.snake-part:last-of-type{
    border-top-left-radius: 20%;
    border-top-right-radius: 20%;
    
}

.snake-part svg{
    height: 30px;
    margin: 0 auto auto -5px;
}

.snake-part:nth-child(n+2){
    border: 1px solid black;
}
.snake-part:nth-child(even){
    background-color: yellow;
    
}

.snake-part.b+.snake-part.r{
    border-bottom-right-radius: 50%;
}

.snake-part.l+.snake-part.b{
    border-bottom-right-radius: 50%;
}

.snake-part.t+.snake-part.l{
    border-bottom-right-radius: 50%;
}
.snake-part.r+.snake-part.t{
    border-bottom-right-radius: 50%;
}

.snake-part.r+.snake-part.b{
    border-bottom-left-radius: 50%;
}
.snake-part.t+.snake-part.r{
    border-bottom-left-radius: 50%;
}
.snake-part.l+.snake-part.t{
    border-bottom-left-radius: 50%;
}

.snake-part.b+.snake-part.l{
    border-bottom-left-radius: 50%;
}
</style>