<template>
    <div class="zona-controles-footer">
        <div class="controls" v-if="controls.showControls">
            <div class="directions">
                <div class="row1">
                    <button @click="game.setDirection('t')">
                        <Arrow/>
                    </button>
                </div>
                <div class="row2">
                    <button @click="game.setDirection('l')">
                        <Arrow direction="left"/>
                    </button>
                    <button @click="game.setDirection('r')">
                        <Arrow direction="right"/>
                    </button>
                </div>
                <div class="row3">
                    <button @click="game.setDirection('b')">
                        <Arrow direction="down"/>
                    </button>
                </div>


            </div>
            <div class="playpause">
                <button @click="spaceBarAction">spacebar (play/pause)</button>
            </div>
        </div>
        <div class="footer">
            <button @click="alternateControls" :disabled="game.startedGame">
                <GameButtonsIcon /> {{ controls.showControls ? 'Ocultar ' : 'Mostrar ' }} controles
            </button>
            <div class="creditos-desk">
                <span>Ver codigo en</span> <a href="https://github.com/migueldanto/vue3-pinnia-snake-game">github</a>
            </div>
            <div class="creditos-mobile">
                <a href="https://github.com/migueldanto/vue3-pinnia-snake-game">github</a>
            </div>
        </div>

    </div>

</template>

<script setup>
import GameButtonsIcon from './sprites/GameButtonsIcon.vue';
import { useControlsStore } from '@/stores/controls'
import { useGameStore } from '@/stores/game'
import Arrow from './sprites/Arrow.vue';
const controls = useControlsStore()
const game = useGameStore()


function alternateControls() {
    controls.showControls = !controls.showControls
    setTimeout(()=>{
        window.dispatchEvent(new Event('resize'));    
    },50)
    
}

function spaceBarAction() {
  if (game.fail !== '' && game.lifes > 0) {
    game.reset();
    game.resetGrid()
    setTimeout(() => {
      game.startOrPauseGame()
    }, 10)
    return
  }
  if (game.fail !== '' && game.lifes === 0) {
    game.reset();
    game.resetGrid()
    
    return
  }
  game.startOrPauseGame()
}
</script>

<style scoped>
.zona-controles-footer {
    display: flex;
    flex-direction: column;
    background-color: #e7e7e7;

}

.footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-family: 'Silkscreen', cursive;
    height: 30px;
    
    
    width: 100%;
}

.footer button {
    font-family: 'Silkscreen', cursive;
    color: black;
    font-size: 12px;
    border-bottom: 3px inset rgba(0, 0, 0, .5);
    border-left: 3px inset rgba(0, 0, 0, .5);
    border-right: 3px inset rgba(255, 255, 255, .5);
    border-top: 3px inset rgba(255, 255, 255, .5);
    box-sizing: border-box;
    background-color: #94B3FD;
    padding: 1px 2em;
    cursor: pointer;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 30px;

}
.footer button:disabled{
    background-color: gray;
}

.footer button svg {
    margin-right: 5px;
}

.footer .creditos-desk {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: block;
}

.footer .creditos-mobile {
    display: none;
}

@media only screen and (max-width: 768px) {
    .footer .creditos-desk {
        display: none;
    }

    .footer .creditos-mobile {
        display: block;
    }
}

.controls {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}

.controls .directions {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    
    
}

.controls .directions button,
.controls .playpause button {
    color: rgb(74, 74, 74);
    font-size: 12px;
    border-bottom: 5px inset rgba(0, 0, 0, .5);
    border-left: 5px inset rgba(0, 0, 0, .5);
    border-right: 5px inset rgba(255, 255, 255, .5);
    border-top: 5px inset rgba(255, 255, 255, .5);
    box-sizing: border-box;
    background-color: #94B3FD;
    height: 30px;
    width: 30px;
    padding: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.controls .directions button:hover,
.controls .playpause button:hover,
.controls .directions button:active,
.controls .playpause button:active{
    border-style: ridge;
    border-width: 5px;
    color: black;
    background-color: #b8ceff;
}

controls .directions .row2{
    display: flex;
    flex-direction: column;
}
.controls .directions .row2 button{
    margin: 0 15px;
}

.controls .playpause {
    flex-grow: 0;
    display: flex;
    justify-content: center;
}
.controls .playpause button{
    font-family: 'Silkscreen', cursive;
    width: auto;
    padding: 0 1em;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    
}

@media only screen and (max-width: 768px) {
    .controls .playpause button{
        
    }
}
</style>