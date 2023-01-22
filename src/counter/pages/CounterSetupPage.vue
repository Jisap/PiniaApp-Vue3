<script setup lang="ts">
import { useCounterSetupStore } from '@/store/counter-setup';
import { storeToRefs } from 'pinia';
import CounterSetupValue from '../components/CounterSetupValue.vue';

const counterStore = useCounterSetupStore()
const { count, squareCount } = storeToRefs(counterStore)
const { increment, incrementBy } = counterStore;


</script>

<template>
    <div class="counterSetup">
        <h1>Pinia Setup</h1>
        <h4>Counter setup: {{ count }}</h4>
        <h4>Square Counter: {{ squareCount }}</h4>

        <br>
        <button @click="increment()">+1</button>
        <button @click="incrementBy(2)">+2</button>
        <button @click="incrementBy(5)">+5</button>
        <button @click="counterStore.$reset()">Reset</button>

        <br>
        <CounterSetupValue />
    </div>

</template>


<style scoped>
.counterSetup {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center
}

button {
    margin-top: 10px;
    height: 25px;
    width: 50px;
    border-radius: 4px;
}
</style>