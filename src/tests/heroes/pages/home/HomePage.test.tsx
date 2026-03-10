import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";
import * as customHomePageHook from "@/heroes/hooks/useHomePage";
import { usePaginatedFavorite } from "@/heroes/hooks/usePaginatedFavorite";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock('@/heroes/hooks/usePaginatedHero')
vi.mock('@/heroes/hooks/usePaginatedFavorite')
vi.spyOn(customHomePageHook, 'useHomePage');

const mockUsePaginetedHero = vi.mocked(usePaginatedHero);
const mockUsePaginetedFavorites = vi.mocked(usePaginatedFavorite);

mockUsePaginetedHero.mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
} as unknown as ReturnType<typeof usePaginatedHero>);

mockUsePaginetedFavorites.mockReturnValue({
    favoritePages: 1,
    favoritesHeroesOnPage: []
})

// Mockeamos el contexto
const mockFavoriteContext = {
    favorites: [],
    favoriteCount: 0,
    isFavorite: vi.fn(),
    toggleFavorite: vi.fn()
};

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ['/']) => {

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <FavoriteHeroContext.Provider value={mockFavoriteContext}>
                    <HomePage />
                </FavoriteHeroContext.Provider>
            </QueryClientProvider>
        </MemoryRouter>
    )
}

describe('HomePage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    test('should render HomePage with default values', () => {
        const { container } = renderHomePage();
        expect(container).toMatchSnapshot();
    });

    test('should call usePaginetedHero with default values', () => {
        renderHomePage();

        expect(mockUsePaginetedHero).toHaveBeenCalled();
        expect(mockUsePaginetedHero).toHaveBeenCalledWith(1, 6, 'all');
        expect(mockUsePaginetedFavorites).toHaveBeenCalled();
        expect(mockUsePaginetedFavorites).toHaveBeenCalledWith([], 0, 6, 1);
    });

    test('should call hooks with default values', () => {
        renderHomePage();

        expect(mockUsePaginetedHero).toHaveBeenCalled();
        expect(mockUsePaginetedHero).toHaveBeenCalledWith(1, 6, 'all');
        expect(mockUsePaginetedFavorites).toHaveBeenCalled();
        expect(mockUsePaginetedFavorites).toHaveBeenCalledWith([], 0, 6, 1);
        expect(customHomePageHook.useHomePage).toHaveBeenCalled();
    });

    test('should call hooks with custom query params', () => {
        renderHomePage(['/?page=2&limit=10&category=villains']);
        expect(mockUsePaginetedHero).toHaveBeenCalledWith(2, 10, 'villains');
        expect(mockUsePaginetedFavorites).toHaveBeenCalledWith([], 0, 10, 2);
    });

    test('should call usePaginetedHero with default page and same limit on tab clicked', () => {
        renderHomePage(['/?tab=favorites&page=2&limit=10']);

        const [, , , villainsTab] = screen.getAllByRole('tab');

        fireEvent.click(villainsTab);

        expect(mockUsePaginetedHero).toHaveBeenCalledWith(1, 10, 'villain');
    });

    test('should render heroes pagination when tab selected is different from favorites', () => {
        renderHomePage(['/?tab=villains&page=2&limit=10']);

        const heroesPagination = screen.getByTestId('heroes-pagination');
        expect(heroesPagination).toBeDefined();
    });

    test('should render favorites pagination when tab selected is favorites', () => {
        renderHomePage(['/?tab=favorites&page=2&limit=10']);

        const heroesPagination = screen.getByTestId('favorites-pagination');
        expect(heroesPagination).toBeDefined();
    });
})