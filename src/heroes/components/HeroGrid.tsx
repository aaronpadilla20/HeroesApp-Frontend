import { Progress } from "@/components/ui/progress"

import type { Hero } from "../types/hero.interface";
import { HeroGridCard } from "./HeroGridCard"
import { HeroGridCardContent } from "./HeroGridCardContent"


interface Props {
    heroes: Hero[];
}

export const HeroGrid = ({ heroes }: Props) => {


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {
                heroes.map((heroe) => (
                    <HeroGridCard
                        key={heroe.id}
                        hero={heroe}
                    >
                        <HeroGridCardContent
                            superHeroDescription={heroe.description}
                            strenghtLevel={
                                <Progress value={heroe.strength * 10} className="h-2" activeColor="bg-orange-500" />
                            }
                            smartLevel={
                                <Progress value={heroe.intelligence * 10} className="h-2" activeColor="bg-blue-500" />
                            }
                            speedLevel={
                                <Progress value={heroe.speed * 10} className="h-2" activeColor="bg-green-500" />
                            }
                            durabilityLevel={
                                <Progress value={heroe.durability * 10} className="h-2" activeColor="bg-red-500" />
                            }
                            powers={heroe.powers}
                            firstAppeared={+heroe.firstAppearance}
                        ></HeroGridCardContent>
                    </HeroGridCard>
                ))
            }
        </div>
    )
}

