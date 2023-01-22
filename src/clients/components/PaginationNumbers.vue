<script setup lang="ts">
import { toRef, ref, watch } from 'vue';


interface Props {
    totalPages: number;
    currentPage: number;
}

interface Emits {
    //evento        //argumento     // No devuelve nada
    (e: 'pageChanged', page: number ): void;
}

const props = defineProps<Props>()
const totalPages = toRef( props, 'totalPages')
const currentPage = toRef( props, 'currentPage')

const totalPageNumbers = ref<number[]>([]); // Vacio
watch( totalPages, () => {                                                         // Cuando totalpages se establece,
    totalPageNumbers.value = [...new Array(totalPages.value)].map((v, i) => i + 1) // creamos un arreglo con posiciones vacias y le asignamos solo los índices
},{ immediate: true})

const emits = defineEmits<Emits>(); //  Se utiliza para definir los eventos que un componente puede emitir a su padre.

</script>

<template>
    <div>
        <!-- Cada vez que damos al boton se establece un nuevo valor del currentPage que impacta en nuestro composable 
            y este en nuestro store -->
        <button 
            :disabled="currentPage === 1"
            @click="emits( 'pageChanged', currentPage - 1)" 
        >Anterior</button>
        <button
            v-for="number of totalPageNumbers"
            :key="number"
            :class="{ active: currentPage === number}"
            @click="emits( 'pageChanged', number )"
        >{{ number }}</button>
        <button 
            :disabled="currentPage === totalPages"
            @click="emits( 'pageChanged', currentPage + 1)"
            >Siguiente</button>
    </div>
</template>

<style scoped>
div {
             margin-top: 10px;
    }

    button {
        background-color: transparent;
        border-radius:5px;
        border: 1px solid var( --color-border );
        color: var(--vt-c-text-dark-2);
        cursor: pointer;
        margin-right: 5px;
        padding: 10px;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
        transition: all 0.5s;

    }

    button:hover{
        background-color:  hsla(160, 100%, 37%, 0.2);
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    }

    button:disabled {
        cursor: not-allowed;
    }

    .active {
        background-color: hsla(160, 100%, 37%, 0.2);
    }
</style>