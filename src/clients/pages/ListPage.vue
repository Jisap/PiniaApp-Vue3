<script setup lang="ts">
import ClientList from "@/clients/components/ClientList.vue"
import PaginationNumbers from "../components/PaginationNumbers.vue";
import useClients from '../composables/useClients';
import LoadingModal from '../../shared/components/LoadingModal.vue'

const { isLoading, clients, currentPage, totalPages, getPage } = useClients();

</script>

<template>
    <div>
        <h1>Listado de clientes</h1>

        <!-- Client List -->
        <ClientList :clients="clients"/>
        
        <!-- Pagination Numbers -->
        <PaginationNumbers 
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-changed="getPage" 
        />
        <!-- LisPage recibe el evento "page-changed" con el valor numérico emitido por "PaginationNumbers"-->
        <!-- Ese valor se aplica a getPage, método del composable que establece el currentPage, y esto dispara de nuevo la petición -->

        <!-- Loading Modal -->
        <LoadingModal v-if="isLoading"/>

    </div>
</template>

<style scoped>
   

</style>