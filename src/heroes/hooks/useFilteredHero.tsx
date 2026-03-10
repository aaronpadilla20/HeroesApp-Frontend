import { useQuery } from "@tanstack/react-query"
import { searchHeroesActions } from "../actions/search-heroes.action"
import type { Options } from "../types/search-options.interface"
import type { Hero } from "../types/hero.interface"

export const useFilteredHero = (options: Options) => {
    // En caso de que options NO tenga ninguna opcion valida entonces la peticion no se realiza
    const hasAtLeastOne = Object.values(options).some(
        value => value !== undefined && value !== ''
    );

    return useQuery<Hero[]>({
        queryKey: ['filter-heroes', { options }],
        queryFn: () => searchHeroesActions(options),
        staleTime: 1000 * 60 * 5,
        enabled: hasAtLeastOne
    })
}

