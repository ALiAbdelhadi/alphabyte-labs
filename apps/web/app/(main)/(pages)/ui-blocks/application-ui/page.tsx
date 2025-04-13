import React from "react"

import Container from "@/components/Container"

const ApplicationUiPage = () => {
    return (
        <div className="min-h-[81.6vh] py-10 md:py-14">
            <Container>
                <section className="space-y-3">
                    <div>
                        <span className="text-sm lg:text-lg uppercase text-primary tracking-wide">
                            UI BLOCKS
                        </span>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r w-fit from-[#0898f4] from-[0%] via-[#f34d7a] via-[70%] to-[#f95032]">
                            Application UI{" "}
                        </h1>
                    </div>
                    <p className="text-base md:text-lg lg:text-xl font-normal max-w-2xl text-foreground opacity-80 ">
                        Design intuitive and structured web application interfaces. Get essential components for clear form layouts, interactive data tables, accessible modal dialogs, sidebars, headers, and more, enabling seamless user workflows and consistent design across your app.
                    </p>
                </section>
            </Container>
        </div>
    )
}

export default ApplicationUiPage
