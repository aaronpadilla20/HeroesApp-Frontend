import { Badge } from "@/components/ui/badge"
import { Zap, Brain, Gauge, Shield } from "lucide-react"
import type { JSX } from "react";

interface Props {
    superHeroDescription: string;
    strenghtLevel: JSX.Element;
    smartLevel: JSX.Element;
    speedLevel: JSX.Element;
    durabilityLevel: JSX.Element;
    powers: string[];
    firstAppeared: number;
}


export const HeroGridCardContent = (props: Props) => {
    const { superHeroDescription, strenghtLevel, smartLevel, speedLevel, durabilityLevel, powers, firstAppeared } = props;


    return (
        <>
            <p className="text-sm text-gray-600 line-clamp-2">
                {superHeroDescription}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-orange-500" />
                        <span className="text-xs font-medium">Fuerza</span>
                    </div>
                    {strenghtLevel}
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <Brain className="h-3 w-3 text-blue-500" />
                        <span className="text-xs font-medium">Inteligencia</span>
                    </div>
                    {smartLevel}
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <Gauge className="h-3 w-3 text-green-500" />
                        <span className="text-xs font-medium">Velocidad</span>
                    </div>
                    {speedLevel}
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3 text-purple-500" />
                        <span className="text-xs font-medium">Durabilidad</span>
                    </div>
                    {durabilityLevel}
                </div>
            </div>

            {/* Powers */}
            <div className="space-y-2">
                <h4 className="font-medium text-sm">Powers:</h4>
                <div className="flex flex-wrap gap-1">
                    {/* 
                    {powers.map((power) => (
                        <Badge
                            key={power}
                            variant="outline"
                            className="text-xs"
                        >
                            {power}
                        </Badge>
                    ))} */

                        powers.slice(0, 3).map((power) => (
                            <Badge
                                key={power}
                                variant="outline"
                                className="text-xs"
                            >
                                {power}
                            </Badge>
                        ))
                    }

                    {
                        powers.length > 3 && (
                            <Badge
                                variant="outline"
                                className="text-xs"
                            >
                                +{powers.length - 3} mas
                            </Badge>
                        )
                    }
                </div>
            </div>

            <div className="text-xs text-gray-500 pt-2 border-t">First appeared: {firstAppeared}</div>
        </>
    )
}
