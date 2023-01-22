import clientsApi from "@/api/clients-api"
import type { Client } from "../interfaces/client"
import { useQuery } from "@tanstack/vue-query"
import { useClientsStore } from "@/store/clients";
import { storeToRefs } from "pinia";
import { watch, computed } from 'vue';



const getClients = async( page: number ):Promise<Client[]> => { 

    await new Promise( resolve => {
        setTimeout(() => resolve(true), 1500 )
    });

    const { data } = await clientsApi.get<Client[]>(`/clients?_page=${ page }`);
    return data;
}

const useClients = () => {

    const store = useClientsStore();                                        // Store de Pinia
    const { currentPage, clients, totalPages } = storeToRefs( store )       // Objeto reactivo del store

    const { isLoading, data } = useQuery(
        ['clients?page=', currentPage],
        () => getClients( currentPage.value ), // (2º) Obtenemos los clientes según página
    );

    watch( data, clients => {               // Si la data cambia, obtendremos unos clientes (3º)
        if( clients )                       // Si estos clientes son no undefined
            store.setClients( clients )     // los añadimos al store
    })                                      // No se hace en el onSuccess del useQuery por si se establece un tiempo de demora para otros cáclculos

    return {
        // Properties
        isLoading,
        clients,
        currentPage,
        totalPages,   
    
        // Methods
        getPage( page: number ){
            store.setPage(page) // Establece el valor del currentPage en el store (1º)
        },

        // // Getters
        // totalPageNumbers:computed(
        //     () => [...new Array(totalPages.value)].map((v, i) => i + 1 ) // Creamos un arreglo con posiciones vacias y le asignamos solo los índices
        // ),
    }
}

export default useClients