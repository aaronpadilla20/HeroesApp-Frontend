import type { Hero } from "./hero.interface";

// Especifica el formato que debe de tener la respuesta de la API
export interface HeroesResponse {
    total: number;
    pages: number;
    heroes: Hero[];
}


