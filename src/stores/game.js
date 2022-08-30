import { defineStore } from 'pinia'

export const useGameStore = defineStore({
    id: 'game',
    state: () => ({
        len: 2,
        level:0,
        direction:'b',
        position:[1,1],
        panelSize:[0,0],
        grid:[],
        startedGame:false,
        pause:false,
        lifes:3,
        fail:"",
        score:0,
    }),
    getters: {
        
    },
    actions: {
        setDirection(d) {
            if(allowDirection(this.direction,d) && this.startedGame && !this.pause){
                this.direction = d
            }
        },
        reset(){
            this.startedGame=false
            this.pause = false
            this.direction = 'b'
            this.len = 2
            this.position=[1,1]
            this.fail=""
            
            //this.definePanelSize()
            
        },
        definePanelSize(w,h){
            this.panelSize =[w,h]
            const grid = []
            for (let i = 0; i < h; i++) {
                grid.push(" ".repeat(w))
            }
            this.grid = grid
            
            this.reset()
        },
        resetGrid(){
            const grid = []
            for (let i = 0; i < this.panelSize[1]; i++) {
                grid.push(" ".repeat(this.panelSize[0]))
            }
            this.grid = grid
        },
        startOrPauseGame(){
            if(this.startedGame){
                this.pause= !this.pause
                return
            }
            this.startedGame = true;
        },
        nextLevel(){
            this.level++
            this.reset()
            this.resetGrid()
        },
        
    }
})

function allowDirection(actual,next){
    const dictionary = {
        'l':'tb',
        'r':'tb',
        't':'lr',
        'b':'rl'
    }
    return dictionary[actual].includes(next)
}