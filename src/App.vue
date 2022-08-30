<script setup>
import { useGameStore } from '@/stores/game'
import { useControlsStore } from '@/stores/controls'
import { onMounted } from 'vue';
import ScreenGame from './components/ScreenGame.vue';
import Controles from './components/Controles.vue';

const game = useGameStore();


onMounted(() => {
  document.addEventListener('keydown', (e) => {
    let code = e.code
    //console.log(code, typeof code)
    switch (code) {
      case 'ArrowRight':
        game.setDirection('r')
        break;
      case 'ArrowLeft':
        game.setDirection('l')
        break;
      case 'ArrowUp':
        game.setDirection('t')
        break;
      case 'ArrowDown':
        game.setDirection('b')
        break;
      case 'Space':
        spaceBarAction()
    }
  })

  document.addEventListener('contextmenu', event => event.preventDefault());

})

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

const controls = useControlsStore()

</script>

<template>
  <div class="all-screen" :class="{ 'show-controls': controls.showControls }">
    <ScreenGame />
    <Controles />
  </div>

</template>


<style scoped>
.all-screen {
  width: 100vw;
  height: calc(100vh - 55px);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 30px;

}

.all-screen.show-controls {
  grid-template-rows: 1fr calc(30px + 100px);
}
</style>