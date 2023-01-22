import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Client } from '@/clients/interfaces/client';

export const useClientsStore = defineStore('clients', () => {

    const currentPage = ref<number>(1)
    const totalPages = ref<number>(5)
    const clients = ref<Client[]>([])

    return {
        // State propierties
        currentPage,
        totalPages,
        clients,

        // Getters

        // Actions
        setClients( newClients: Client[]){  // Recibe los clientes de la bd
            clients.value = newClients;     // y se aplican a la ref reactiva del store
        },
        
        setPage( page: number ){                    // Establece el valor del currentPage en el store    
            if( currentPage.value === page) return  // Si la página que se se pasa a la función es la actual no devuelve nada
            if( page <= 0 ) return                  // Tampoco se devuelve nada si la páina actual = 0

            currentPage.value = page;   // Si los valores son diferentes se aplica el nuevo valor a la ref reactiva.
        }

    }
})


