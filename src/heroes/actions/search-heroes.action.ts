import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";
import type { Options } from "../types/search-options.interface";

const BASE_URL = import.meta.env.VITE_API_URL;

export const searchHeroesActions = async (option: Options): Promise<Hero[]> => {
    const { data } = await heroApi.get<Hero[]>('/search', {
        params: option
    });

    return data.map(hero => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    }));
}