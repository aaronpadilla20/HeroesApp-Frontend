import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { SuperheroProfile } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { lazy } from "react";
import { createHashRouter, Navigate } from "react-router";
// import { SearchPage } from "@/heroes/pages/search/SearchPage";

/*
Para evitar realizar una importacion tan compleja para preparla para un lazy load hay que hacer que el componente que se exporta
desde la ruta que esta importando este lazy load sea exportada por defecto.

const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage').then(module => ({ default: module.SearchPage })));

Una vez dicho componente es exportando por defecto nosotros podemos utilizar la importacion de una manera mas simple
como se presenta a continuacion
*/

const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'))


// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
    // La siguiente manera renderizara el Layout como base sin embargo si queremos
    // que un componente que utilice el layout sea renderizado lo tenemos que especificar
    // dentro del arreglo que tenemos en la key children
    {
        path: '/',
        element: <HeroesLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'heroes/:idSlug',
                element: <SuperheroProfile />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: '*',
                element: <Navigate to='/' />
            }

        ]
    },

    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />
            },
        ]
    }
])