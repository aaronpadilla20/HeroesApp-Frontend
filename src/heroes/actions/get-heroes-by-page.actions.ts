import { heroApi } from "../api/hero.api"
import type { HeroesResponse } from "../types/get-heroes.response";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async (
    page: number,
    limit: number = 6,
    category: string = 'all'
): Promise<HeroesResponse> => {
    if (isNaN(page)) {
        page = 1;
    }

    if (isNaN(limit)) {
        limit = 6;
    }

    // Obtenemos la respuesta de la API pero formatado con el formato que necesitamos para nuestra APP la cual esta definida en la interface HeroesResponse
    const { data } = await heroApi.get<HeroesResponse>('/', {
        params: {
            limit: limit,
            offset: (page - 1) * limit,
            category: category
        }
    })

    // Debido a que el arreglo de heroes que viene por defecto desde la API no nos otorga la ruta de imagenes correctamente
    // nosotros formateamos cada uno de los objetos heroe para que el key de image tenga la ruta correcta y pueda ser renderizada en nuestra app.
    const heroes = data.heroes.map((hero) => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`,
    }))

    // En lugar de regresar la respuesta tal cual la obtenemos durante la peticion get nosotros sobreescribimos la key de heroes para que la ruta 
    // de la imagen se muestre correctamente en lugar de que la que obtenemos por defecto durante la peticion.
    return {
        ...data,
        heroes: heroes
    };
}