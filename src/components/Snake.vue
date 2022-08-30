<template>
    <div>
        <SnakePart v-for="n in longitud" :position="normalizedHistory[n - 1].p" :direction="normalizedHistory[n - 1].d"
            :idx="n" :key="n - 1" />


    </div>

</template>

<script setup>
import { onMounted, ref, computed, onUnmounted, watch } from 'vue'
import { useGameStore } from '@/stores/game'
import SnakePart from './SnakePart.vue';

const BASE_TIMER = 800


const game = useGameStore();



const longitud = computed(()=>{
    return game.len
})
const historia = ref([[...game.position],[game.position[0],game.position[1]-1]])
const direccionHistoria = ref([game.direction])

let run_interval = 0
const normalizedHistory = computed(() => {
    return Array.from(Array(longitud.value).keys()).map((idx) => {
        return {
            p: historia.value.length > idx ? historia.value[idx] : historia.value[historia.value.length - 1],
            d: direccionHistoria.value.length > idx ? direccionHistoria.value[idx] : direccionHistoria.value[direccionHistoria.value.length - 1]
        }
    })
})

onMounted(() => {
    //runsnake()
    
})

const startedGame = computed(()=>{
    return game.startedGame
})

watch(startedGame,(newValue)=>{
    if(newValue){
        setSnakeInGrid()
        runsnake()
    }else{
        resetSnake()
    }
    
})

function resetSnake(){
    stopsnake()
    setTimeout(()=>{
        historia.value = [[...game.position],[game.position[0],game.position[1]-1]]
        direccionHistoria.value = [game.direction]
        //setHstorySnake()
    },5)
    
    
}

const pausedGame = computed(()=>{
    return game.pause
})

watch(pausedGame,(newValue)=>{
    if(newValue && startedGame.value){
        stopsnake()
    }else if (!newValue && startedGame.value){
        runsnake()
        
    }
    
})

function runsnake() {
    let lapso = BASE_TIMER-(game.level*40)
    lapso = lapso <= 20 ? 25 : lapso
    run_interval = setInterval(() => {
        let dir = game.direction
        switch (dir) {
            case 'r':
                game.position[0]++
                break;
            case 'l':
                game.position[0]--
                break;
            case 't':
                game.position[1]--
                break;
            case 'b':
                game.position[1]++
                break;
        }
        //revisar que ese siguiente paso del avance no intersecta o el limite o la misa snake
        if(validNextPosition(game.position[0],game.position[1])){
            setHstorySnake()
        }
        
        //console.log(historia.value)
    }, lapso)
}

function setHstorySnake (){
    historia.value.unshift([...game.position])
    direccionHistoria.value.unshift(game.direction)
    setSnakeInGrid()
}

function stopsnake(){
    clearInterval(run_interval)
}

function validNextPosition(x,y){
    //verificar que no se salga del rango
    if( x >= game.panelSize[0] || x < 0 || y >= game.panelSize[1] || y < 0 ){
        game.fail = "Chocaste!!"
        game.lifes--
        stopsnake()
        return false
    }
    const row = game.grid[y]
    const charCode = row.charCodeAt(x)
    if(charCode === 35){
        game.fail = "Chocaste contigo mismo!!"
        game.lifes--
        stopsnake()

        return false
    }
    return true
}

function setSnakeInGrid(){
    //console.log(game.grid)
    normalizedHistory.value.forEach(pos =>{
        let str = game.grid[pos.p[1]].split("")
        str[pos.p[0]] = "#"
        game.grid[pos.p[1]] = str.join("")
    })
    //ir quitando de la historia la posicion que se acab de desocupar
    if(historia.value.length>game.len){
        //saconsole.log(historia.value[game.len])
        let str2 = game.grid[historia.value[game.len][1]].split("")
        str2[historia.value[game.len][0]] = " "
        game.grid[historia.value[game.len][1]] = str2.join("")
    }
    //console.log(game.grid.join("\n"))
}




onUnmounted(() => {
    stopsnake()
})

</script>