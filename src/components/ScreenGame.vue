<template>
    <div class="screen-game" ref="panel">
        <Snake/>
        <Comida v-if="game.startedGame"/>
        <Overlays/>
    </div>

</template>
<script setup>
import { computed, onMounted,ref, watch } from 'vue';
import Snake from './Snake.vue';
import Overlays from './Overlays.vue';
import { useGameStore } from '@/stores/game'
import Comida from './Comida.vue';

const panel = ref(null)

const game = useGameStore()
const LEN_TO_NEXTLEVEL = 50

onMounted(()=>{
    setPanelSize()
    window.addEventListener("resize",()=>{
        
        setPanelSize()
    })
})

function setPanelSize(){
    //revisar el tamaño de la pantalla, ese sera ewl tamaño del grid
    const width = Math.floor(panel.value.clientWidth/20);
    const height = Math.floor(panel.value.clientHeight/20);
    //console.log(game.grid)
    game.definePanelSize(width,height)
    game.score = 0
    game.lifes = 3
    game.level = 0
    //
    //console.log("resize----",width,height)
}

const longitudSnake = computed(()=>{
    return game.len
})

watch(longitudSnake,(nuevoValor)=>{
    if(nuevoValor>=LEN_TO_NEXTLEVEL){
        game.nextLevel()
    }
})
</script>

<style scoped>
.screen-game{
    position: relative;
    background-image: url('/pasto.webp');
    height: 100%;
    background-repeat: repeat;
    background-size: auto;
}

</style>