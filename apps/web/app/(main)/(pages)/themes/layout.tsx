import Container from "@/components/Container";
import { ReactNode } from "react";

export default function ThemesLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Container>
                <section className="py-14 md:py-16 space-y-4">
                    <div className="space-y-3 max-w-3xl">
                        <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            Design Your Vision, Effortlessly.
                        </h1>
                        <p className="text-base md:text-lg lg:text-xl font-normal max-w-2xl text-foreground/80 leading-relaxed">
                            Build beautiful, consistent color themes for your applications
                            starting with a single primary color. Unleash your creativity and
                            fully customize every detail.
                        </p>
                    </div>
                </section>
                {children}
            </Container>
        </div>
    )
}