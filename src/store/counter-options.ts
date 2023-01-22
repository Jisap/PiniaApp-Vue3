import { defineStore } from "pinia"


interface CounterOptionsState{
    count: number;
    lastChanged?:Date;
}

export const useCounterOptionsStore = defineStore('counterOptions', {
    
    state: () => ({ 
        count: 0, 
        lastChange: undefined, 
    } as CounterOptionsState ),
    getters: {
        squareCount: (state) => state.count * 2,
    },
    actions: {
        incrementBy( value: number) {
            this.count += value;
            this.lastChanged = new Date()
        },
        increment(){
            this.incrementBy(1)
        }
    },
})