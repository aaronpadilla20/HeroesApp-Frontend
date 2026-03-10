import { use } from "react";

import { FavoriteHeroContext, FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { Hero } from "@/heroes/types/hero.interface";

const mockHero = {
    id: '1',
    name: 'batman',
    slug: 'batman',
    alias: 'Bruce Wayne',
    description: 'The Dark Knight',
    durability: 85,
    firstAppearance: 'Detective Comics #27',
    image: '/batman.png',
    intelligence: 95,
    powers: ['Martial Arts', 'Detective Skills'],
    speed: 70,
    status: 'Active',
    strength: 80,
    team: 'Justice League',
    universe: 'DC',
    category: 'Hero',
} as Hero

// Sobrescribimos el objeto global localStorage para mockearlo
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
})
// Fin de la sobrescritura de localStorage


// Creando componente que consume contexto para validar que el contexto funcione como se espera
const TestComponent = () => {

    const { favoriteCount, favorites, isFavorite, toggleFavorite } = use(FavoriteHeroContext)

    return (
        <div>
            <div data-testid="favorite-count">{favoriteCount}</div>
            <div data-testid='favorite-list'>
                {
                    favorites.map(hero => (
                        <div key={hero.id} data-testid={`hero-${hero.id}`}>
                            {hero.name}
                        </div>
                    ))
                }
            </div>

            <button data-testid='toggle-favorite' onClick={() => toggleFavorite(mockHero)}>
                Toogle Favorite
            </button>

            <div data-testid='is-favorite'>
                {isFavorite(mockHero).toString()}
            </div>
        </div>
    )
}

const renderContextTest = () => {

    return render(
        <FavoriteHeroProvider>
            <TestComponent />
        </FavoriteHeroProvider>
    )
}

describe('FavoriteHeroContext', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    })

    test('should initialize with default values', () => {
        renderContextTest();
        screen.debug()

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('favorite-list').children.length).toBe(0);
    })

    test('should add hero to favorites when toogleFavorite is called with new Hero', () => {
        renderContextTest();
        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);
        // screen.debug()

        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-1').textContent).toBe('batman');

        expect(localStorageMock.setItem).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            'favorites',
            '[{\"id\":\"1\",\"name\":\"batman\",\"slug\":\"batman\",\"alias\":\"Bruce Wayne\",\"description\":\"The Dark Knight\",\"durability\":85,\"firstAppearance\":\"Detective Comics #27\",\"image\":\"/batman.png\",\"intelligence\":95,\"powers\":[\"Martial Arts\",\"Detective Skills\"],\"speed\":70,\"status\":\"Active\",\"strength\":80,\"team\":\"Justice League\",\"universe\":\"DC\",\"category\":\"Hero\"}]'
        );

        // expect(localStorage.getItem('favorites')).toBe(
        //     '[{"id":"1","name":"batman","slug":"batman","alias":"Bruce Wayne","description":"The Dark Knight","durability":85,"firstAppearance":"Detective Comics #27","image":"/batman.png","intelligence":95,"powers":["Martial Arts","Detective Skills"],"speed":70,"status":"Active","strength":80,"team":"Justice League","universe":"DC","category":"Hero"}]'
        // )
    })

    test('should remove Hero from favorites when toggleFavorite is called', () => {
        localStorageMock.getItem.mockReturnValue(JSON.stringify([mockHero]));

        renderContextTest();

        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-1').textContent).toBe('batman');

        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);
        screen.debug();

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('is-favorite').textContent).toBe('false');
        expect(screen.queryByTestId('hero-1')).toBeNull();

        expect(localStorageMock.setItem).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', '[]');
    })
})