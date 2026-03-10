import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from '@testing-library/react'
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import type { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getSummaryAction } from "@/heroes/actions/get-summary.action";
import type { SummaryInformationResponse } from "@/heroes/types/summary-information.response";

vi.mock("@/heroes/actions/get-summary.action", () => ({
    getSummaryAction: vi.fn()
}));

const mockGetSummaryAction = vi.mocked(getSummaryAction);

// Se necesita crear este wrapper debido a que como estamos probando una respuesta de otro hook el cual viene de TanStan Query
// el hook de TanStan Query requiere el componente QueryClientProvider para funcionar de cierta manera estamos haciendo un mock 
// del hook pero cuando usas React Testing Library con renderHook, el hook se ejecuta aislado, sin el árbol de providers de tu app
const tanStackCustomProvider = () => {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    })

    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}


describe('useHeroSummary', () => {
    test('should return the initial state (isLoading)', () => {
        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider()
        });

        expect(result.current.isLoading).toBeTruthy();
        expect(result.current.isError).toBeFalsy();
        expect(result.current.data).toBeUndefined();
    })

    test('should return success state with data when API call succeds', async () => {
        const mockSummaryData = {
            totalHeroes: 10,
            strongestHero: {
                id: '1',
                name: 'superman'
            },
            smartestHero: {
                id: '2',
                name: 'batman'
            },
            heroCount: 18,
            villainCount: 7
        } as SummaryInformationResponse

        mockGetSummaryAction.mockResolvedValue(mockSummaryData);

        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.isError).toBeFalsy();
        expect(mockGetSummaryAction).toHaveBeenCalled();
    })

    test('should return error state when API call fails', async () => {
        const mockError = new Error('Failed to fetch summary');
        mockGetSummaryAction.mockRejectedValue(mockError);

        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanStackCustomProvider()
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error).toBeDefined();
        expect(result.current.isLoading).toBeFalsy();
        expect(mockGetSummaryAction).toHaveBeenCalled();
        expect(result.current.error?.message).toBe('Failed to fetch summary');
    })
})