<script setup lang="ts">
import { useCounterOptionsStore } from '@/store/counter-options';
import { storeToRefs } from 'pinia';
import CounterOptionsValue from '../components/CounterOptionsValue.vue';

    const counterStore = useCounterOptionsStore()
    const { count, squareCount } = storeToRefs(counterStore)
    const { increment, incrementBy } = counterStore;


</script>

<template>
    <div class="counterOptions">
        <h1>Pinia Options</h1>
        <h4>Counter 1 Page: {{ count }}</h4>
        <h4>Square Counter: {{ squareCount }}</h4>

        <br>
        <button @click="increment()">+1</button>
        <button @click="incrementBy(2)">+2</button>
        <button @click="incrementBy(5)">+5</button>
        <button @click="counterStore.$reset()">Reset</button>
    
        <br>
        <CounterOptionsValue />
    </div>
    
</template>


<style scoped>
    .counterOptions{
        display: flex;
        flex-direction: column;
    }

    button{
        margin-top: 10px;
        height: 25px;
        width: 50px;
        border-radius: 4px;
    }
</style>