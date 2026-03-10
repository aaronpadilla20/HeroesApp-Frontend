import { RouterProvider } from "react-router"
import { appRouter } from "./router/app.router"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FavoriteHeroProvider } from "./heroes/context/FavoriteHeroContext"

const queryClient = new QueryClient()

export const HeroesApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <FavoriteHeroProvider>
                {/* Componente para activar el sistema de rutas */}
                <RouterProvider router={appRouter} />
                {/* El componente siguiente es para debuguear las peticiones http de TanStack */}
                <ReactQueryDevtools initialIsOpen={false} />
            </FavoriteHeroProvider>
        </QueryClientProvider>
    )
}

