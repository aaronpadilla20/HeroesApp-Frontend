import { useMemo } from "react";
import { useCustonSearchParams } from "./useCustomSearchParams";


export const useHomePage = () => {
    const { activeTab, page, limit, category, setSearchParams } = useCustonSearchParams();

    // Esto previene que un usuario pueda ingresar data mal intencionada en nuestro query param
    // ya que de esta manera estamos revisando que el query param tab contenga alguno de los valores
    // validos
    const selectedTab = useMemo(() => {
        const validTabs = ['all', 'favorites', 'heroes', 'villains'];
        return validTabs.includes(activeTab) ? activeTab : 'all'
    }, [activeTab])

    /* 
        Lo anterior hace de una manera mas optimizada lo que obtendriamos utilizando el siguiente codigo pero tambien mejorando una persistencia
        en el estado de la aplicacion, ya que si compartimos por ejemplo la URL la cual contenga el query param "tab" la aplicacion
        mantendra el estado basado en ese query param
    */

    // const [activeTab, setActiveTab] = useState<Tabs>('all');

    // useEffect(() => {
    //     getHeroesByPage().then(heroes => {
    //         console.log({ heroes });
    //     })
    // }, [])

    return {
        // Props
        selectedTab,
        page,
        limit,
        category,

        // Methods
        setSearchParams
    }
}

