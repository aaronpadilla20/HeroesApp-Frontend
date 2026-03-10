import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.actions";


export const usePaginatedHero = (page: number, limit: number, category = 'all') => {
    return useQuery({ // La "data" es el producto exitoso (resultado exitoso) de la peticion http
        queryKey: ['heroes', { page, limit, category }], // Reserva espacio en memoria con el resultado de la peticion es como el identificador
        queryFn: () => getHeroesByPageAction(page, limit, category), // Funcion que se dispara en este caso la peticion http get al backend heroes
        staleTime: 1000 * 60 * 5  // Indica cuanto tiempo TimeStack va a considerar el resultado de la peticion como vigente (en este caso 5 min) lo cual indica que durante 5 min no se disparara otra peticion similar a esta.
    });
}


