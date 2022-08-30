<template>
    <div class="overlays">
        <Lifes/>
        <div class="text-and-button" v-if="!game.startedGame">
            <p>Nivel {{game.level + 1}}</p>
            <button class="play" @click="empezarJuego">Jugar</button>
            <p class="puntuacion" v-if="game.score>0">Puntuacion {{game.score}}</p>
        </div>

        <div class="text-and-button" v-if="game.startedGame && game.pause">
            <p>Juego Pausado</p>
            
            <button class="play" @click="empezarJuego">Continuar</button>
            <p class="puntuacion" v-if="game.score>0">Puntuacion {{game.score}}</p>
        </div>

        <div class="text-and-button" v-if="game.fail!==''">
            <p>{{game.lifes>0?'Te quedan '+game.lifes+' vidas': 'Game over'}}</p>
            <button class="play" @click="resetOrStartGame">{{game.lifes>0?'OK':'Inicio'}}</button>
            <p class="puntuacion" v-if="game.score>0">Puntuacion {{game.score}}</p>
        </div>

        
    </div>

</template>

<script setup>
import { useGameStore } from '@/stores/game'
import Lifes from './overlays/Lifes.vue';


const game = useGameStore()

function empezarJuego(){
    game.startOrPauseGame()
}

function resetOrStartGame(){
    if(game.lifes>0){
        game.reset();
        game.resetGrid()
        setTimeout(()=>{
            game.startOrPauseGame()
        },10)
    }else{
        game.reset();
        game.resetGrid()
    }
    
    
    //game.startOrPauseGame()
}

</script>


<style scoped>
    .overlays{
        position: relative;
        height: 100%;
        width: 100%;
        
        z-index: 101;
    }

    .text-and-button{
        font-family: 'Silkscreen', cursive;
        font-size: 22px;
        color: white;
        
        position: absolute;
        top: 30vh;
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .text-and-button>button{
        font-family: 'Silkscreen', cursive;
        color:black;
        font-size: 1.1em;
        border-bottom: 6px inset rgba(0,0,0,.5);
        border-left: 6px inset rgba(0,0,0,.5);
        border-right: 6px inset rgba(255,255,255,.5);
        border-top: 6px inset rgba(255,255,255,.5);
        box-sizing: border-box;
        background-color: #94B3FD;
        padding: 3px 1em;
        cursor: pointer;
    }

    .puntuacion{
        background-color: rgba(0, 0, 0, 0.424);
        
        padding: .5em 2em;
    }
    
</style>