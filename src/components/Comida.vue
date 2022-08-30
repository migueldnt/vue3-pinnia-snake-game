<template>

    <div >
        <component 
        class="comida" 
        v-for="(comida,i) in comidas" 
        :is="componentes[comida['c']]" 
        :style="{top:(comida.p[1]*20)+'px',left:(comida.p[0]*20)+'px'}"
        :key="i"/>
        
    </div>




</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import Pizza from './sprites/Pizza.vue';
import Apple from './sprites/Apple.vue';
import Candy from './sprites/Candy.vue';
import Orange from './sprites/Orange.vue';
import Sandwich from './sprites/Sandwich.vue';
import Strawberry from './sprites/Strawberry.vue';

import { useGameStore } from '@/stores/game'

const game = useGameStore()

const componentes =[Pizza,Apple,Candy,Orange,Sandwich,Strawberry]

const comidas = ref([])
let timerId = 0
onMounted(()=>{
    //empezar a randomizar la comida...
    generateTimer()
})

onUnmounted(()=>{
    clearTimeout(timerId)
})

function generateTimer(){
    const time = generateRandomTime()
    
    timerId = setTimeout(()=>{
        const idxComponent = generateRandomIndexComida();
        const position = generateRandomPosition()
        comidas.value.push({p:position,c:idxComponent})
        generateTimer()
    },time)
}

function generateRandomTime(){
    const segundosBase = 10; //  segundos minimos se debe esperar para lanzar un nuevo comida
    const segundosVariables = game.level!==0 ? (10 - (game.level/2)) :10
    let tiempo = (segundosBase + (Math.round(Math.random()*segundosVariables))) *1000
    return tiempo < 1000 ? 1000: tiempo
}

function generateRandomIndexComida(){
    return Math.floor(Math.random()*componentes.length)
}

function generateRandomPosition(){
    const [x,y] = game.panelSize
    //console.log(x,y)
    const randomx= Math.floor(Math.random() * x)
    const randomy= Math.floor(Math.random() * y)
    return [randomx,randomy]
}

const positionSnakeHead=computed(()=>{
    return game.position
})


watch(positionSnakeHead,(newValue)=>{
    //verificar entre la lista de comidas de aqui, si alguna coincide con la posicion, pues aumentar el len del snake y borrar la comida de aqui
    const idx = comidas.value.findIndex(comida=>{
        return comida.p[0] === newValue[0] && comida.p[1] === newValue[1]
    })
    
    if(idx > -1){
        game.len ++
        game.score = game.score+10
        comidas.value.splice(idx,1)
    }
},{deep:true})

</script>


<style scoped>
    .comida{
        width: 30px;
        height: 30px;
        margin: -5px auto auto -5px;
        position: absolute;
    }
</style>