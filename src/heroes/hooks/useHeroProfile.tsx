import { useQuery } from "@tanstack/react-query"
import { getHeroAction } from "../actions/get-hero.action"


export const useHeroProfile = (idSlug: string) => {
    return useQuery({
        queryKey: ['hero-profile-information', { idSlug }],
        queryFn: () => getHeroAction(idSlug),
        staleTime: 1000 * 60 * 5,
        retry: false
    })
}

