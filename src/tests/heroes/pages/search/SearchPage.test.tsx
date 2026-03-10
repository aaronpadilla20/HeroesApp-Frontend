import { searchHeroesActions } from "@/heroes/actions/search-heroes.action";
import SearchPage from "@/heroes/pages/search/SearchPage";
import { SearchControls } from "@/heroes/pages/search/ui/SearchControls";
import type { Hero } from "@/heroes/types/hero.interface";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";

SearchControls

// Mock de funcion
vi.mock('@/heroes/actions/search-heroes.action')
const mockSearchHeroesAction = vi.mocked(searchHeroesActions);

// Mock de componente
vi.mock('@/components/custom/CustomJumbotron', () => ({
    CustomJumbotron: () => <div data-testid='custom-jumbotron'></div>
}));

vi.mock('@/heroes/components/HeroGrid', () => ({
    HeroGrid: ({ heroes }: { heroes: Hero[] }) => (
        <div data-testid='hero-grid'>
            {
                heroes.map(heroe => (
                    <div
                        key={heroe.id}
                    >
                        {heroe.name}
                    </div>
                ))
            }
        </div>)
}))

vi.mock('@/heroes/pages/search/ui/SearchControls', () => ({
    SearchControls: () => <div data-testid='search-controls'></div>
}))

const queryClient = new QueryClient();

const renderSearchPage = (initialEntries: string[] = ['/']) => {

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <SearchPage />
            </QueryClientProvider>
        </MemoryRouter>
    )
}


describe('SearchPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    test('should render SearchPage with default values', () => {
        const { container } = renderSearchPage();
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            "name": "",
            "strength": 0
        });

        expect(container).toMatchSnapshot();
    });

    test('should call search action with name parameter', () => {
        renderSearchPage(['/search?name=superman']);
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            "name": "superman",
            "strength": 0
        });
    });

    test('should call search action with strength parameter', () => {
        renderSearchPage(['/search?strength=8']);
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            "name": "",
            "strength": 8
        });
    })

    test('should call search action with strength and name parameters', () => {
        renderSearchPage(['/search?strength=8&name=batman']);
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({
            "name": "batman",
            "strength": 8
        });
    });

    test('should render HeroGrid with search results', async () => {
        const mockHeroes = [
            { id: '1', name: 'Clark Kent' } as unknown as Hero,
            { id: '1', name: 'Bruce Wayne' } as unknown as Hero,
        ]

        mockSearchHeroesAction.mockResolvedValue(mockHeroes);

        renderSearchPage();

        await waitFor(() => {
            expect(screen.getByText('Clark Kent')).toBeDefined();
            expect(screen.getByText('Bruce Wayne')).toBeDefined();
        })
    });
})