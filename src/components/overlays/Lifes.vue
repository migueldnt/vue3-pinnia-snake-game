<template>

    <div class="lifes-indicator">
        <div class="score">
           {{game.score}}
        </div>
        <div class="level">
           <div>
                nivel {{game.level + 1}}
           </div> 
           <div class="progress" :style="{'--progress':progressLevel+'%'}"></div>
        </div>
        <div class="hearts">
            <Heart v-for="n in game['lifes']"/>
        </div>
        
    </div>
</template>

<script setup>
import { useGameStore } from '@/stores/game'
import { computed } from 'vue';
import Heart from '../sprites/Heart.vue';

const LEN_TO_NEXTLEVEL = 50

const game = useGameStore()

const progressLevel = computed(()=>{
    return (game.len/LEN_TO_NEXTLEVEL)*100
})
</script>

<style scoped>
    .lifes-indicator{
        position: absolute;
        top: .5rem;
        right: .5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-family: 'Silkscreen', cursive;
    }
    .score{
        font-weight: bold;
    }
    .level{
        display: flex;
        flex-direction: column;
    }
    .level>.progress{
        height: 4px;
        width: 100%;
        background-color: white;
        position: relative;
        margin-bottom: 3px;
    }
    .level>.progress::after{
        content: '';
        top: 0;
        left: 0;
        height: 4px;
        width: var(--progress);
        background-color: black;
        position: absolute;
    }
    .hearts{
        display: flex;

    }
    .hearts>svg{
        margin: 2px;
    }
</style>