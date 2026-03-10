
import { Heart, Trophy, Users, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { HeroStatCard } from "./HeroStatCard"

import { useHeroSummary } from "../hooks/useHeroSummary"
import { use } from "react"
import { FavoriteHeroContext } from "../context/FavoriteHeroContext"


export const HeroStats = () => {

    const { data: summary } = useHeroSummary();
    const { favoriteCount } = use(FavoriteHeroContext);

    // const percentageFavorite = useMemo(() => {
    //     const percentage = favoriteCount / summary?.totalHeroes
    // }, [favoriteCount, summary?.totalHeroes])

    if (!summary) {
        return <div>Loading...</div>
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {/* 
                Una parte importante de React es reutilizar componentes a continuacion se muestra la diferencia
                entre utilizar multiples componentes que se podrian reutilizar vs la reutilizacion de un componente
                customizado el cual puede ser parametrizado facilmente (HeroStatCard)
            */}


            {/* <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Characters</CardTitle>

                </CardHeader>
                <CardContent>

                </CardContent>
            </Card> */}

            {/* <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Favorites</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-600">3</div>
                    <p className="text-xs text-muted-foreground">18.8% of total</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Strongest</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-lg font-bold">Superman</div>
                    <p className="text-xs text-muted-foreground">Strength: 10/10</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Smartest</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-lg font-bold">Batman</div>
                    <p className="text-xs text-muted-foreground">Intelligence: 10/10</p>
                </CardContent>
            </Card> */}

            <HeroStatCard
                title="Total de personajes"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
                <div className="flex gap-1 mt-2">
                    <Badge variant="secondary" className="text-xs">
                        {summary?.heroCount} Heroes
                    </Badge>
                    <Badge variant="destructive" className="text-xs">
                        {summary?.villainCount} Villanos
                    </Badge>
                </div>
            </HeroStatCard>

            <HeroStatCard
                title="Favoritos"
                icon={<Heart className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-2xl font-bold text-red-600" data-testid='favorite-count'>{favoriteCount}</div>
                <p className="text-xs text-muted-foreground" data-testid='favorite-percentage'>{((favoriteCount / summary.totalHeroes) * 100).toFixed(2)}% del total</p>
            </HeroStatCard>

            <HeroStatCard
                title="El mas fuerte"
                icon={<Zap className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-lg font-bold">{summary?.strongestHero.alias}</div>
                <p className="text-xs text-muted-foreground">Fuerza: {summary?.strongestHero.strength}</p>
            </HeroStatCard>

            <HeroStatCard
                title="El mas inteligente"
                icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
            >
                <div className="text-lg font-bold">{summary?.smartestHero.alias}</div>
                <p className="text-xs text-muted-foreground">Inteligencia: {summary?.smartestHero.intelligence}</p>
            </HeroStatCard>
        </div>
    )
}
