import { ArrowRight, Box, LayoutGrid, Library } from "lucide-react"

export default function FeatureShowcase() {
    return (
        <div className="py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <p className="text-pink-500 mb-2">Key highlights</p>
                    <h2 className="text-5xl font-bold">Why Toast only?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-zinc-800 p-8 rounded-md">
                        <div className="text-pink-500 mb-4">
                            <LayoutGrid size={24} />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Pixel Perfect Layout</h3>
                        <p className="text-muted-foreground mb-8">
                            All the sections are perfectly designed with pixel perfect grids and layouts. Everything you see is
                            responsive for all devices.
                        </p>
                        <div className="flex items-center text-muted-foreground hover:text-pink-500 transition-colors cursor-pointer group">
                            <span className="mr-2">Learn more</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                    <div className="border border-zinc-800 p-8 rounded-md">
                        <div className="text-pink-500 mb-4">
                            <Box size={24} />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Editable Components</h3>
                        <p className="text-muted-foreground mb-8">
                            With the help of Framer variables, everything is under you control. Just click the component and start
                            changing everything but not anything.
                        </p>
                        <div className="flex items-center text-pink-500 hover:text-pink-400 transition-colors cursor-pointer group">
                            <span className="mr-2">Learn more</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                    <div className="border border-zinc-800 p-8 rounded-md">
                        <div className="text-pink-500 mb-4">
                            <Library size={24} />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">Scalable Library</h3>
                        <p className="text-muted-foreground mb-8">
                            Since each component is custom made, you can easily scale you library with new components, icons, colors,
                            etc.
                        </p>
                        <div className="flex items-center text-muted-foreground hover:text-pink-500 transition-colors cursor-pointer group">
                            <span className="mr-2">Learn more</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
