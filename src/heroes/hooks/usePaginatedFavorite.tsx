import type { Hero } from "../types/hero.interface";

export const usePaginatedFavorite = (favorites: Hero[], favoriteCount: number, limit: number, page: number) => {

    // calculamos paginas necesarias para la paginacion
    const favoritePages = Math.ceil(favoriteCount / limit);

    // Obtenemos los heroes a mostrar en cada pagina basado en el limite de heroes por pagina y en la pagina actual
    const offset = (page - 1) * limit;
    const endIndex = offset + limit;
    const favoritesHeroesOnPage = favorites.slice(offset, endIndex);

    return {
        favoritePages,
        favoritesHeroesOnPage
    }
}

