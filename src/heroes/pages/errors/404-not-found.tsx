import { Zap } from "lucide-react"
import { Link } from "react-router"

export const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="w-full border-b border-border bg-background/80 backdrop-blur-xl">
                <div className="flex h-16 items-center px-4 md:px-8 max-w-screen-2xl mx-auto">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="flex items-center justify-center size-9 rounded-lg bg-primary text-primary-foreground">
                            <Zap className="size-5" />
                        </div>
                        <span className="font-display text-2xl tracking-wide text-foreground">
                            Universo de SuperHeroes
                        </span>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="max-w-4xl w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                    {/* Image Section */}
                    <div className="relative w-full max-w-sm lg:max-w-md shrink-0">
                        <div className="relative aspect-square rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/5">
                            <img
                                src="/images/404-hero.jpeg"
                                alt="A lost superhero wandering in a destroyed city"
                                className="w-full h-full object-cover"
                                sizes="(max-width: 768px) 100vw, 400px"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />
                            {/* 404 badge on image */}
                            <div className="absolute bottom-4 left-4 right-4">
                                <span className="font-display text-8xl sm:text-9xl tracking-widest text-primary drop-shadow-lg leading-none">
                                    404
                                </span>
                            </div>
                        </div>
                        {/* Glow effect */}
                        <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl -z-10" />
                    </div>

                    {/* Text Section */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
                        <div className="flex flex-col gap-3">
                            <p className="text-2xl text-red-500 font-medium uppercase tracking-widest">
                                Mision Fallida
                            </p>
                            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide text-foreground text-balance">
                                Heroe no encontrado
                            </h1>
                            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md text-pretty">
                                Parece que este héroe ha desaparecido de nuestra base de datos.
                                Incluso los poderes más fuertes no pueden encontrar una página que no existe.
                            </p>
                        </div>

                        {/* Power stats as visual element */}
                        <div className="w-full max-w-xs flex flex-col gap-2">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Vida del super heroe</span>
                                <span>0%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                                <div className="h-full w-0 rounded-full bg-primary" />
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Rastreo del héroe</span>
                                <span>0%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                                <div className="h-full w-0 rounded-full bg-accent" />
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Footer accent line */}
            <div className="h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent" />
        </div>
    )
}
