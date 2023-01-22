<script setup lang="ts">
import { useCounterSetupStore } from '@/store/counter-setup';

const counter = useCounterSetupStore();
</script>

<template>
    <div class="counterValue">
        <h1>El valor es: {{ counter.count }}</h1>
        <h4>Último cambio: {{ counter.lastChanged }}</h4>
    </div>
</template>

<style scoped>
    .counterValue{
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>