import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";

import { SearchControls } from "./ui/SearchControls";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useFilteredHero } from "@/heroes/hooks/useFilteredHero";
import { useCustonSearchParams } from "@/heroes/hooks/useCustomSearchParams";

const SearchPage = () => {
    const { name, selectedStrength: strength } = useCustonSearchParams();


    // Usar useQuery para lanzar la peticion http a search
    const { data: filteredHeroes } = useFilteredHero({ name, strength });
    const heroes = filteredHeroes ?? [];

    return (
        <>
            <CustomJumbotron
                title="Busqueda de Super Heroes"
                description="Descubre, explora y administra super heroes"
            />

            <CustomBreadCrumbs
                currentPage="Buscador de heroes"
            // breadCrumbs={[
            //     { label: 'Home', to: '/' },
            //     { label: 'Home2', to: '/' },
            //     { label: 'Home3', to: '/' },
            //     { label: 'Home4', to: '/' },
            //     { label: 'Home5', to: '/' },
            // ]}
            />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Filter and Search */}
            <SearchControls />

            <HeroGrid heroes={heroes} />
        </>
    )
}

export default SearchPage;


