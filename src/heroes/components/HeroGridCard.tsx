import { use, type PropsWithChildren } from "react"
import { Heart, Eye } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

import { FavoriteHeroContext } from "../context/FavoriteHeroContext"
import type { Hero } from "../types/hero.interface"
import { useNavigate } from "react-router"

interface Props extends PropsWithChildren {
    hero: Hero;
}

export const HeroGridCard = (props: Props) => {
    const navigate = useNavigate();

    const { children, hero } = props;
    const { status, universe, alias: superHeroName, name: realName, category, team, image, slug } = hero;

    const { isFavorite, toggleFavorite } = use(FavoriteHeroContext);

    const handleClick = (slug: string) => {
        navigate(`/heroes/${slug}`)
    }

    return (
        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-linear-to-br from-white to-gray-50">
            <div className="relative h-64">
                <img
                    src={image}
                    alt={superHeroName}
                    className="object-cover transition-all duration-500 group-hover:scale-110 absolute -top-7.5 w-full h-102.5"
                    onClick={() => handleClick(slug)}
                />

                {/* Status indicator */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700">
                        {status}
                    </Badge>
                </div>

                {/* Universe badge */}
                {
                    (universe === 'DC') ?
                        (
                            <Badge className="absolute top-3 right-3 text-xs bg-blue-600 text-white">{universe}</Badge>
                        ) :
                        (
                            <Badge className="absolute top-3 right-3 text-xs bg-red-600 text-white">{universe}</Badge>
                        )
                }

                {/* Favorite button */}
                <Button
                    size="sm"
                    variant="ghost"
                    className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
                    onClick={() => toggleFavorite(hero)}
                >
                    <Heart className={`h-4 w-4 ${isFavorite(hero) ? 'fill-red-500 text-red-500' : 'text-gray-500'
                        }`} />
                </Button>

                {/* View details button */}
                <Button
                    size="sm"
                    variant="ghost"
                    className="absolute bottom-3 left-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Eye className="h-4 w-4 text-gray-600" />
                </Button>
            </div>

            <CardHeader className="py-3 z-10 bg-gray-100/50 backdrop-blur-sm relative top-1 group-hover:top-2.5 transition-all duration-300">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="font-bold text-lg leading-tight">{superHeroName}</h3>
                        <p className="text-sm text-gray-600">{realName}</p>
                    </div>
                    <Badge className="text-xs bg-green-100 text-green-800 border-green-200">{category}</Badge>
                </div>
                <Badge variant="outline" className="w-fit text-xs">
                    {team}
                </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
                {children}
            </CardContent>
        </Card>
    )
}
