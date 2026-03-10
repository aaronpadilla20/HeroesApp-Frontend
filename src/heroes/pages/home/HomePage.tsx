// Importaciones de terceros
// import { useState } from "react"

// Importaciones propias del proyecto
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"
import { useHomePage } from "@/heroes/hooks/useHomePage"
import { use } from "react"
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext"
import { usePaginatedFavorite } from "@/heroes/hooks/usePaginatedFavorite"

// CSS

// type Tabs = 'all' | 'favorites' | 'heroes' | 'villains'

export const HomePage = () => {

    // Destructuramos el hook customizado para evitar tener logica pesada en nuestro componente
    const { selectedTab, page, limit, category, setSearchParams } = useHomePage();

    // Nota: Cuando la funcion que esta dentro del useQuery utiliza argumentos esos argumentos deben de ser parte del queryKey prop
    // Utilizamos TanStack Query para realizar la peticion HTTP a traves del metodo getHeroesByPageAction()
    // const { data: heroesResponse } = useQuery({ // La "data" es el producto exitoso (resultado exitoso) de la peticion http
    //     queryKey: ['heroes', { page, limit }], // Reserva espacio en memoria con el resultado de la peticion es como el identificador
    //     queryFn: () => getHeroesByPageAction(+page, +limit), // Funcion que se dispara en este caso la peticion http get al backend heroes
    //     staleTime: 1000 * 60 * 5  // Indica cuanto tiempo TimeStack va a considerar el resultado de la peticion como vigente (en este caso 5 min) lo cual indica que durante 5 min no se disparara otra peticion similar a esta.
    // });

    /* 
    
    Cuando se utiliza una misma peticion en multiples lugares de la aplicacion lo mejor es evitar duplicar el codigo y en lugar de eso
    mejor creamos un envoltorio que utilice la peticion como se muestra en el bloque de codigo posterior a este (wrapper section).

     const { data: summary } = useQuery({
         queryKey: ['summary-information'],
         queryFn: getSummaryAction,
         staleTime: 1000 * 60 * 5
     });
    */

    // Wrapper Section
    const { data: summary } = useHeroSummary();
    const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);

    // Utilizamos el contexto para poder utilizar la cantidad de favoritos almacenado en el state favoriteCount el cual es controlado mediante el context FavoriteHeroContext
    const { favorites, favoriteCount } = use(FavoriteHeroContext);

    // Utilizamos el custom hook para paginar los favoritos
    const { favoritePages, favoritesHeroesOnPage, } = usePaginatedFavorite(favorites, favoriteCount, +limit, +page);

    return (
        <>
            <>
                {/* Header */}
                <CustomJumbotron
                    title="Universo de Superheroes"
                    description="Descubre, explora y administra tus superhoes favoritos"
                />

                <CustomBreadCrumbs currentPage="Super Heroes" />

                {/* Stats Dashboard */}
                <HeroStats />

                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger
                            value="all"
                            onClick={() => setSearchParams(prev => {
                                prev.set('tab', 'all')
                                prev.set('category', 'all')
                                prev.set('page', '1')
                                return prev;
                            })}
                        >
                            All Characters ({summary?.totalHeroes})
                        </TabsTrigger>
                        <TabsTrigger
                            value="favorites"
                            className="flex items-center gap-2"
                            onClick={() => setSearchParams(prev => {
                                prev.set('tab', 'favorites')
                                prev.set('category', 'favorites')
                                prev.set('page', '1')
                                return prev;
                            })}
                        >
                            Favorites ({favoriteCount})
                        </TabsTrigger>
                        <TabsTrigger
                            value="heroes"
                            onClick={() => setSearchParams(prev => {
                                prev.set('tab', 'heroes')
                                prev.set('category', 'hero')
                                prev.set('page', '1')
                                return prev;
                            })}
                        >
                            Heroes ({summary?.heroCount})
                        </TabsTrigger>
                        <TabsTrigger
                            value="villains"
                            onClick={() => setSearchParams(prev => {
                                prev.set('tab', 'villains')
                                prev.set('category', 'villain')
                                prev.set('page', '1')
                                return prev;
                            })}
                        >
                            Villains ({summary?.villainCount})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value="favorites">
                        {/* Todos los favoritos */}
                        <HeroGrid heroes={favoritesHeroesOnPage} />
                    </TabsContent>
                    <TabsContent value="heroes">
                        {/* Todos los heroes */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value="villains">
                        {/* Todos los villanos */}
                        <h3>Villanos</h3>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                </Tabs>

                {/* Pagination */}
                {
                    selectedTab !== 'favorites' ? (
                        <CustomPagination
                            totalPages={heroesResponse?.pages ?? 1}
                            dataTestId='heroes-pagination'
                        />
                    ) : (
                        <CustomPagination
                            totalPages={favoritePages}
                            dataTestId='favorites-pagination'
                        />
                    )
                }
            </>
        </>
    )
}
