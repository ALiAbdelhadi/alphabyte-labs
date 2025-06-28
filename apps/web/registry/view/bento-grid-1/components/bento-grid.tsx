import Image from "next/image"

export default function BentoGrid() {
    return (
        <section className="w-full py-12 md:py-16">
            <div className="container px-4 md:px-6 max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[800px] md:h-[600px]">
                    <div className="relative md:row-span-2 rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20">
                        <Image
                            src="/blocks/case-studies-1/image-1.jpg"
                            alt="Modern component library development"
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/70 group-hover:via-black/30" />
                        <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/10" />
                        <div className="absolute bottom-6 left-6 transform transition-all duration-500 group-hover:translate-y-[-8px] group-hover:translate-x-2">
                            <h3 className="text-2xl font-bold text-white transition-all duration-300 group-hover:text-3xl group-hover:drop-shadow-lg">
                                shadcn/ui
                            </h3>
                            <p className="text-sm text-white/80 mt-1 opacity-0 transform translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                Building a Modern Component Library
                            </p>
                            <div className="w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-16 mt-2"></div>
                        </div>
                        <div className="absolute top-4 right-4 opacity-0 transform translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                            <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                                Read more
                            </div>
                        </div>
                    </div>
                    <div className="relative md:col-span-2 rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20 animation-delay-100">
                        <Image
                            src="/blocks/case-studies-1/image-2.jpg"
                            alt="Utility-first CSS framework"
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-[-0.5deg]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/70 group-hover:via-black/30" />
                        <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/10" />
                        <div className="absolute bottom-6 left-6 transform transition-all duration-500 group-hover:translate-y-[-8px] group-hover:translate-x-2">
                            <h3 className="text-2xl font-bold text-white transition-all duration-300 group-hover:text-3xl group-hover:drop-shadow-lg">
                                Tailwind CSS
                            </h3>
                            <p className="text-sm text-white/80 mt-1 opacity-0 transform translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                The Utility-First Revolution
                            </p>
                            <div className="w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-20 mt-2"></div>
                        </div>
                        <div className="absolute top-4 right-4 opacity-0 transform translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                            <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                                Read more
                            </div>
                        </div>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20 animation-delay-200">
                        <Image
                            src="/blocks/case-studies-1/image-3.jpg"
                            alt="Modern web framework architecture"
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/70 group-hover:via-black/30" />
                        <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/10" />
                        <div className="absolute bottom-6 left-6 transform transition-all duration-500 group-hover:translate-y-[-8px] group-hover:translate-x-2">
                            <h3 className="text-xl font-bold text-white transition-all duration-300 group-hover:text-2xl group-hover:drop-shadow-lg">
                                Astro
                            </h3>
                            <p className="text-sm text-white/80 mt-1 opacity-0 transform translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                The All-in-One Web Framework
                            </p>
                            <div className="w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-24 mt-2"></div>
                        </div>
                        <div className="absolute top-4 right-4 opacity-0 transform translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                            <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                                Read more
                            </div>
                        </div>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20 animation-delay-300">
                        <Image
                            src="/blocks/case-studies-1/image-4.jpg"
                            alt="React framework for production"
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-[-1deg]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/70 group-hover:via-black/30" />
                        <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/10" />
                        <div className="absolute bottom-6 left-6 transform transition-all duration-500 group-hover:translate-y-[-8px] group-hover:translate-x-2">
                            <h3 className="text-xl font-bold text-white transition-all duration-300 group-hover:text-2xl group-hover:drop-shadow-lg">
                                Next.js
                            </h3>
                            <p className="text-sm text-white/80 mt-1 opacity-0 transform translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                The React Framework
                            </p>
                            <div className="w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-20 mt-2"></div>
                        </div>
                        <div className="absolute top-4 right-4 opacity-0 transform translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                            <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                                Read more
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}