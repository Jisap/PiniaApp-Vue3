
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import LoadingModal from '../../shared/components/LoadingModal.vue'
import useClient from '../composables/useClient';
import { watch } from 'vue';

//const queryClient = useQueryClient();                                                     // Cliente de useQuery para manejo de cache 
const route = useRoute();   // Info sobre la url
const router = useRouter(); // Info sobre las rutas de la app

const { 
    client,
    isLoading, 
    isError, 
    clientMutation, 
    updateClient,
    isUpdating,
    isUpdatingSuccess,
    isErrorUpdating
} = useClient( +route.params.id);                                                           // Info sobre un cliente

watch( clientMutation.isSuccess, () => {                                                    // Si la mutación fue bien, reseteo de la misma.
    setTimeout(() => {                                                                      // Es decir reseteo del rdo, y sus datos obtenidos
        clientMutation.reset();                                                             // Con esto se puede volver a usar.
    },2000)
});

watch( isError, () => { 
    if( isError.value ) 
        router.replace('/clients')
} )

</script>

<template>
    <h3 v-if="isUpdating">Guardando...</h3>
    <h3 v-if="isUpdatingSuccess">Guardado</h3>
    
    <LoadingModal v-if="isLoading"/>
    
    <div
        class="clienteId"
        v-if="client"
    > 
        <h1>{{ client.name }}</h1>
        <form @submit.prevent="updateClient(client!)">
            <input
                type="text"
                placeholder="Nombre"
                v-model="client.name"
            />
            <br>
            <input
                type="text"
                placeholder="Dirección"
                v-model="client.address"
            />
            <br>

            <button 
                :disabled="isUpdating"
                type="submit">Guardar</button>
        </form>
    </div>

    <code>
        {{ client }}
    </code>

</template>

<style scoped>
input {
        width: 100%;
        height: 50px;
        font-size: 20px;
        padding: 5px 10px;
        margin-bottom: 10px;
        background-color: var(--vt-c-black-soft);
        color: var(--vt-c-text-dark-2);
        border: none;
        border-bottom: 2px solid var(--vt-c-text-dark-2);
        outline: none;
    }
    button{
        margin-bottom: 20px;
        margin-top: 20px;
        font-size: 15px;
        
        min-width: 130px;
        height: 40px;
        color: var(--vt-c-text-dark-2);
        padding: 5px 10px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        display: inline-block;
        outline: none;
        border-radius: 5px;
        border: none;
        background-size: 120% auto;
        background-image: linear-gradient(315deg, #bdc3c7 0%, #15643f 75%);
    }
        
    button:hover {
        background-position: right center;
    }
    
    button:active {
            top: 2px;
    }
    .clienteId{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    h3 {
        color: hsla(160, 100%, 37%, 1)
    }
</style>