import { ref, watch, computed } from 'vue';
import type { Client } from '@/clients/interfaces/client';
import { useQuery, useMutation } from '@tanstack/vue-query';
import clientsApi from '@/api/clients-api';

const getClient = async( id: number ):Promise<Client> => {
    const { data } = await clientsApi.get(`/clients/${ id }`);
    return data;
}

const updateClient = async (client: Client): Promise<Client> => {
    const { data } = await clientsApi.patch<Client>(`/clients/${client.id}`, client);           // Definimos método de actualización del cliente
    //const queries = queryClient.getQueryCache().findAll(['clients?page='], { exact: false }); // Se podría hacer aquí un
    //queries.forEach( query => query.reset());                                                 // reseteo de la cache y un 
    //queries.forEach( query => query.fetch());                                                 // refetch de las peticiones y actualización de cache    
    return data                                                                                 // Pero no se hace para evitar inconsistencias entre datos mostrados y los de la bd
}


const useClient = (id: number) => {

    const client = ref<Client>();

    
    const { isLoading, data, isError } = useQuery(
        ['client', id],
        () => getClient( id ),
        { retry:false }
        );
        
    const clientMutation = useMutation(updateClient);                                         // UseMutation ejecuta el método de actualización
    
    watch( data, (newVal) => {
        if ( data.value )
            client.value = { ...newVal! }
    },{ immediate: true })

    return {
        isLoading,
        client,
        isError,
        clientMutation,
        //Method
        updateClient: clientMutation.mutate,
        isUpdating: computed( () => clientMutation.isLoading.value ),
        isUpdatingSuccess: computed( () => clientMutation.isSuccess.value ),
        isErrorUpdating: computed( () => clientMutation.isError.value ),
    }

}

export default useClient;

